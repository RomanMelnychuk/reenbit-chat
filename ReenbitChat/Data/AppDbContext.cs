using Microsoft.EntityFrameworkCore;
using ReenbitChat.Models;

namespace ReenbitChat.Data
{
    /// <summary>
    /// Entity Framework Core database context for the chat application.
    /// </summary>
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<ChatMessage> ChatMessages { get; set; }
    }
}