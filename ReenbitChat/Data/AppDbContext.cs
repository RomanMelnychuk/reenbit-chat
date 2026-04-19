using Microsoft.EntityFrameworkCore;
using ReenbitChat.Models;

namespace ReenbitChat.Data
{
    /// <summary>
    /// Entity Framework Core database context for the chat application.
    /// Manages connection to Azure SQL Database.
    /// </summary>
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        /// <summary>
        /// Represents the ChatMessages table in the database.
        /// Stores all chat messages with their sentiment analysis results.
        /// </summary>
        public DbSet<ChatMessage> ChatMessages { get; set; }
    }
}