using Microsoft.EntityFrameworkCore;
using ReenbitChat.Data;
using ReenbitChat.Hubs;

namespace ReenbitChat
{
    /// <summary>
    /// Application entry point. Configures services and middleware pipeline.
    /// </summary>
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();

            // SignalR with Azure SignalR Service for scalable real-time connections
            builder.Services.AddSignalR()
                .AddAzureSignalR(builder.Configuration.GetConnectionString("AzureSignalR")!);

            // Entity Framework Core with Azure SQL Database
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            // CORS policy — allows frontend origins to connect (including localhost for development)
            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials()
                        .WithOrigins(
                            "http://localhost:3000",
                            "http://localhost:5173",
                            "https://reenbit-chat-app-bgdpdrgzbhg3angb.westeurope-01.azurewebsites.net"
                        );
                });
            });

            var app = builder.Build();

            app.UseCors();
            app.UseHttpsRedirection();
            app.UseAuthorization();

            // Serves the built React frontend from wwwroot/
            app.UseStaticFiles();
            app.MapControllers();

            // Maps the SignalR hub to /chatHub endpoint
            app.MapHub<ChatHub>("/chatHub");

            app.Run();
        }
    }
}