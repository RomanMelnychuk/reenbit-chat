# Reenbit Chat

A real-time chat application with sentiment analysis built with ASP.NET Core, React, and Azure.

## 🚀 Live Demo

[https://reenbit-chat-app-bgdpdrgzbhg3angb.westeurope-01.azurewebsites.net/index.html](https://reenbit-chat-app-bgdpdrgzbhg3angb.westeurope-01.azurewebsites.net/index.html)

## 🛠️ Tech Stack

**Backend:**
- ASP.NET Core (.NET 10)
- SignalR + Azure SignalR Service
- Entity Framework Core
- Azure SQL Database
- Azure AI Language (Sentiment Analysis)

**Frontend:**
- React 18 + Vite
- @microsoft/signalr

**Cloud:**
- Azure Web App
- Azure SignalR Service
- Azure SQL Database
- Azure AI Language

## ✨ Features

- Real-time messaging via Azure SignalR Service
- Sentiment analysis on every message (Positive 😊 / Negative 😤 / Neutral 😐 / Mixed 🤔)
- Color-coded messages based on sentiment
- Chat history stored in Azure SQL Database
- Responsive UI — works on desktop and mobile
- Messages displayed left/right based on username

## 🏗️ Project Structure

```
ReenbitChat/              # ASP.NET Core backend
├── Hubs/ChatHub.cs       # SignalR Hub
├── Models/ChatMessage.cs # Message model
├── Data/AppDbContext.cs  # EF Core context
├── wwwroot/              # Built React frontend
└── Program.cs            # App configuration

reenbit-chat-client/      # React + Vite frontend
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── MessageList.jsx
│   │   ├── MessageItem.jsx
│   │   └── MessageInput.jsx
│   └── App.jsx
└── vite.config.js
```

## 🚀 Getting Started

### Prerequisites
- .NET 10 SDK
- Node.js 18+
- Azure account

### Run locally

**Backend:**
```bash
cd ReenbitChat
dotnet run
```

**Frontend:**
```bash
cd reenbit-chat-client
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 📝 Environment Variables

Add to `ReenbitChat/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "YOUR_AZURE_SQL_CONNECTION_STRING",
    "AzureSignalR": "YOUR_AZURE_SIGNALR_CONNECTION_STRING"
  },
  "LanguageService": {
    "Endpoint": "YOUR_AZURE_LANGUAGE_ENDPOINT",
    "ApiKey": "YOUR_AZURE_LANGUAGE_API_KEY"
  }
}
```
