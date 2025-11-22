# LangGraph Job Agent 🤖

<div align="center">

![Job Search Agent](https://img.shields.io/badge/AI-Agent-blueviolet?style=for-the-badge)
![LangGraph](https://img.shields.io/badge/LangGraph-v0.2.19-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js)

**Ein intelligenter Job-Search Agent mit Stateful Workflows und Human-in-the-Loop**

[🚀 Live Demo](https://your-app.vercel.app) | [📖 Dokumentation](./DEPLOYMENT_GUIDE.md) | [🎥 Video Demo](#)

</div>

---

## ✨ Features

- 🤖 **Stateful AI Agent** - Nutzt LangGraph für komplexe Workflows
- 🔄 **Human-in-the-Loop** - Agent wartet auf User-Eingaben
- 🧠 **GPT-4 Integration** - Generiert intelligente Job-Summaries
- 🔍 **Tavily Search** - Sucht Jobs im Web
- 💾 **Appwrite Database** - Speichert ausgewählte Jobs
- ⚡ **Real-time State Management** - Persistenter Agent-State
- 🎨 **Modernes UI** - Responsive Design mit Glassmorphism
- 📱 **Mobile-Ready** - Funktioniert perfekt auf allen Geräten

---

## 🏗️ Architektur

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (React)                     │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ SearchForm  │  │  JobCard     │  │  JobDetails  │       │
│  └─────────────┘  └──────────────┘  └──────────────┘       │
└────────────────────────────┬────────────────────────────────┘
                             │ HTTP/REST API
┌────────────────────────────┴────────────────────────────────┐
│                    Backend (Node.js + Express)               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              LangGraph Workflow                       │  │
│  │                                                       │  │
│  │  START → Search → [WAIT] → Process → [WAIT] → Save  │  │
│  │           ↓                  ↓                  ↓    │  │
│  │        Tavily             GPT-4            Appwrite  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Tech Stack

### Backend
- **LangGraph** - Stateful Agent Framework
- **LangChain.js** - AI Orchestration
- **Express** - Web Server
- **OpenAI GPT-4** - AI Model
- **Tavily** - Web Search API
- **Appwrite** - Backend-as-a-Service

### Frontend
- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Axios** - HTTP Client

### Deployment
- **Railway** - Backend Hosting
- **Vercel** - Frontend Hosting
- **Appwrite Cloud** - Database

---

## 📦 Installation & Setup

### Voraussetzungen
- Node.js 20+
- npm 10+
- Git

### 1. Repository klonen
```bash
git clone https://github.com/sebastiankh1983-svg/langgraph_job_agent.git
cd langgraph_job_agent
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# .env mit deinen API Keys ausfüllen
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Öffne Browser
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`

---

## 🔑 Benötigte API Keys

1. **OpenAI API Key** - [platform.openai.com](https://platform.openai.com/api-keys)
2. **Tavily API Key** - [tavily.com](https://app.tavily.com/)
3. **Appwrite Credentials** - [cloud.appwrite.io](https://cloud.appwrite.io)

---

## 📸 Screenshots

### Job Suche
![Search](./docs/screenshots/search.png)

### Job Auswahl
![Results](./docs/screenshots/results.png)

### AI Summary
![Details](./docs/screenshots/details.png)

---

## 🎯 Use Cases

- ✅ **Job Hunting** - Finde und speichere interessante Jobs
- ✅ **Portfolio Projekt** - Zeige moderne AI-Skills
- ✅ **Learning Project** - Lerne LangGraph & AI Agents
- ✅ **Customizable** - Erweitere für andere Use Cases

---

## 📚 Dokumentation

- [Deployment Guide](./DEPLOYMENT_GUIDE.md) - Ausführliche Deployment-Anleitung
- [Setup Instructions](./SETUP_INSTRUCTIONS.md) - Lokale Setup-Anleitung
- [Quick Start](./QUICK_START.md) - Schnellstart-Befehle

---

## 🤝 Contributing

Contributions sind willkommen! Bitte erstelle einen Pull Request.

1. Fork das Projekt
2. Erstelle einen Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit deine Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Push zum Branch (`git push origin feature/AmazingFeature`)
5. Öffne einen Pull Request

---

## 📝 License

Dieses Projekt ist unter der MIT License lizenziert.

---

## 👤 Autor

**Sebastian**

- GitHub: [@sebastiankh1983-svg](https://github.com/sebastiankh1983-svg)
- Repository: [langgraph_job_agent](https://github.com/sebastiankh1983-svg/langgraph_job_agent)

---

## 🙏 Acknowledgments

- LangChain Team für das großartige Framework
- OpenAI für GPT-4
- Tavily für die Search API
- Appwrite Team

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/sebastiankh1983-svg/langgraph_job_agent?style=social)
![GitHub forks](https://img.shields.io/github/forks/sebastiankh1983-svg/langgraph_job_agent?style=social)
![GitHub issues](https://img.shields.io/github/issues/sebastiankh1983-svg/langgraph_job_agent)
![GitHub license](https://img.shields.io/github/license/sebastiankh1983-svg/langgraph_job_agent)

---

<div align="center">

**Made with ❤️ and ☕ by Sebastian**

⭐ Star this repo if you find it helpful!

</div>
