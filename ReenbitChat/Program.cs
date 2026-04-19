using Microsoft.EntityFrameworkCore;
using ReenbitChat.Data;
using ReenbitChat.Hubs;

namespace ReenbitChat
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();

            builder.Services.AddSignalR()
                .AddAzureSignalR(builder.Configuration.GetConnectionString("AzureSignalR")!);

            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

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
            app.UseStaticFiles();
            app.MapControllers();
            app.MapHub<ChatHub>("/chatHub");

            app.Run();
        }
    }
}