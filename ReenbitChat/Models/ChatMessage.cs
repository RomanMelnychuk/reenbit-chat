namespace ReenbitChat.Models
{
    /// <summary>
    /// Represents a chat message entity stored in the database.
    /// </summary>
    public class ChatMessage
    {
        public int Id { get; set; }
        public string User { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public string Sentiment { get; set; } = string.Empty;
    }
}