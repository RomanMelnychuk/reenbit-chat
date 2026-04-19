namespace ReenbitChat.Models
{
    /// <summary>
    /// Represents a chat message entity stored in the Azure SQL Database.
    /// </summary>
    public class ChatMessage
    {
        /// <summary>Unique identifier for the message.</summary>
        public int Id { get; set; }

        /// <summary>Username of the message sender.</summary>
        public string User { get; set; } = string.Empty;

        /// <summary>Content of the chat message.</summary>
        public string Message { get; set; } = string.Empty;

        /// <summary>UTC timestamp when the message was sent.</summary>
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;

        /// <summary>Sentiment result from Azure AI Language: Positive, Negative, Neutral, or Mixed.</summary>
        public string Sentiment { get; set; } = string.Empty;
    }
}