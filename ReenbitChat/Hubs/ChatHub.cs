using Azure;
using Azure.AI.TextAnalytics;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using ReenbitChat.Data;
using ReenbitChat.Models;

namespace ReenbitChat.Hubs
{
    /// <summary>
    /// SignalR Hub for handling real-time chat messages with sentiment analysis.
    /// </summary>
    public class ChatHub : Hub
    {
        private readonly AppDbContext _context;
        private readonly TextAnalyticsClient _textAnalyticsClient;

        public ChatHub(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            var endpoint = new Uri(configuration["LanguageService:Endpoint"]!);
            var apiKey = new AzureKeyCredential(configuration["LanguageService:ApiKey"]!);
            _textAnalyticsClient = new TextAnalyticsClient(endpoint, apiKey);
        }

        public override async Task OnConnectedAsync()
        {
            var messages = await _context.ChatMessages
                .OrderBy(m => m.Timestamp)
                .Take(50)
                .ToListAsync();

            foreach (var message in messages)
            {
                await Clients.Caller.SendAsync("ReceiveMessage", message.User, message.Message, message.Timestamp, message.Sentiment);
            }

            await base.OnConnectedAsync();
        }

        public async Task SendMessage(string user, string message)
        {
            // Аналізуємо тональність повідомлення
            var sentiment = "Neutral";
            try
            {
                var response = await _textAnalyticsClient.AnalyzeSentimentAsync(message);
                sentiment = response.Value.Sentiment.ToString();
            }
            catch { }

            var chatMessage = new ChatMessage
            {
                User = user,
                Message = message,
                Timestamp = DateTime.UtcNow,
                Sentiment = sentiment
            };

            _context.ChatMessages.Add(chatMessage);
            await _context.SaveChangesAsync();

            await Clients.All.SendAsync("ReceiveMessage", user, message, chatMessage.Timestamp, sentiment);
        }
    }
}