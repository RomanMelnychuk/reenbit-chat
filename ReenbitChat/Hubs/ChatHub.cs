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
    /// Manages WebSocket connections via Azure SignalR Service.
    /// </summary>
    public class ChatHub : Hub
    {
        private readonly AppDbContext _context;
        private readonly TextAnalyticsClient _textAnalyticsClient;

        /// <summary>
        /// Initializes ChatHub with database context and Azure AI Language client.
        /// </summary>
        public ChatHub(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            var endpoint = new Uri(configuration["LanguageService:Endpoint"]!);
            var apiKey = new AzureKeyCredential(configuration["LanguageService:ApiKey"]!);
            _textAnalyticsClient = new TextAnalyticsClient(endpoint, apiKey);
        }

        /// <summary>
        /// Sends the last 50 messages from the database to the newly connected client.
        /// </summary>
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

        /// <summary>
        /// Receives a message from a client, performs sentiment analysis,
        /// saves it to the database, and broadcasts it to all connected clients.
        /// </summary>
        /// <param name="user">The username of the sender.</param>
        /// <param name="message">The message content.</param>
        public async Task SendMessage(string user, string message)
        {
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