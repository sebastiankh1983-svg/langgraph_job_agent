# Setup Instructions - Job Search Agent

## ⚡ Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
```

Erstelle `.env` Datei im `backend/` Ordner:

```env
OPENAI_API_KEY=sk-your-key-here
TAVILY_API_KEY=tvly-your-key-here
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=your_project_id
APPWRITE_DATABASE_ID=your_database_id
APPWRITE_COLLECTION_ID=your_collection_id
APPWRITE_API_KEY=your_api_key
PORT=3001
```

Starte Backend:
```bash
npm start
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 3. Test

Öffne: http://localhost:3000

---

## 🔑 API Keys erhalten

### OpenAI API Key
1. Gehe zu: https://platform.openai.com/api-keys
2. "Create new secret key"
3. Kopiere Key → `.env` als `OPENAI_API_KEY`

### Tavily API Key
1. Gehe zu: https://app.tavily.com/
2. Sign Up (kostenlos)
3. Kopiere API Key → `.env` als `TAVILY_API_KEY`

### Appwrite Setup
1. Gehe zu: https://cloud.appwrite.io/
2. Erstelle neues Projekt
3. Erstelle Database
4. Erstelle Collection mit Schema:
   - title (String, 255)
   - company (String, 255)
   - description (String, 5000)
   - url (String, 500)
   - source (String, 255)
   - userFeedback (String, 1000)
   - savedAt (String, 50)
5. Erstelle API Key (Settings → API Keys)
6. Kopiere alle IDs → `.env`

---

## 🧪 Testing

1. Backend läuft auf `localhost:3001`
2. Frontend läuft auf `localhost:3000`
3. Teste Suche: "React Developer Berlin"
4. Wähle Job aus
5. Gib Feedback
6. Prüfe Appwrite ob Job gespeichert wurde

---

## 🐛 Troubleshooting

### Backend startet nicht
- Node Version checken: `node -v` (sollte 20+ sein)
- `.env` Datei existiert?
- Alle API Keys korrekt?

### Frontend startet nicht
- Dependencies installiert? `npm install`
- Port 3000 frei?

### Agent findet keine Jobs
- Tavily API Key korrekt?
- Internet-Verbindung ok?

### Jobs werden nicht gespeichert
- Appwrite Credentials korrekt?
- Collection erstellt mit richtigem Schema?

---

## 📞 Support

Bei Fragen: Siehe `README.md` für Details!
# Job Search Agent - LangGraph v1.0

Ein **stateful AI Agent** für Job-Suche mit **Human-in-the-Loop** Features, gebaut mit LangGraph.js v1.0, React und TypeScript.

## 🎯 Features

- ✅ **Job-Suche** mit Tavily Search API
- ✅ **State Management** - Agent merkt sich Kontext
- ✅ **Human-in-the-Loop** - Agent wartet auf User-Eingaben
- ✅ **AI-Summary** mit GPT-4
- ✅ **Job-Speicherung** in Appwrite
- ✅ **Saubere Trennung** Frontend/Backend

## 📁 Projektstruktur

```
Agent_Helper_Bot/
├── backend/                    # Node.js + Express + LangGraph
│   ├── config/
│   │   └── state.js           # State Annotation (LangGraph)
│   ├── nodes/
│   │   ├── searchNode.js      # Job-Suche Node
│   │   ├── processSelectionNode.js  # Verarbeitung Node
│   │   └── saveFeedbackNode.js      # Speichern Node
│   ├── graph/
│   │   └── jobSearchGraph.js  # LangGraph Workflow
│   ├── tools/
│   │   └── tavilySearch.js    # Tavily Tool
│   ├── services/
│   │   └── appwriteService.js # Appwrite Integration
│   ├── server.js              # Express Server
│   ├── package.json
│   └── .env.example
│
└── frontend/                   # React + TypeScript + Vite
    ├── src/
    │   ├── components/
    │   │   ├── SearchForm.tsx
    │   │   ├── JobCard.tsx
    │   │   ├── JobDetails.tsx
    │   │   └── MessageList.tsx
    │   ├── services/
    │   │   └── api.ts         # API Client
    │   ├── types.ts           # TypeScript Definitionen
    │   ├── App.tsx
    │   ├── App.css
    │   ├── main.tsx
    │   └── index.css
    ├── index.html
    ├── vite.config.ts
    ├── tsconfig.json
    └── package.json
```

## 🚀 Setup & Installation

### Voraussetzungen

- Node.js 20+ und npm
- OpenAI API Key
- Tavily API Key
- Appwrite Account

### Backend Setup

```bash
# In backend/ Ordner wechseln
cd backend

# Dependencies installieren
npm install

# .env Datei erstellen (aus .env.example kopieren)
copy .env.example .env

# .env Datei ausfüllen mit deinen API Keys:
# - OPENAI_API_KEY
# - TAVILY_API_KEY
# - APPWRITE_* Credentials

# Server starten
npm start
```

Server läuft auf: `http://localhost:3001`

### Frontend Setup

```bash
# In frontend/ Ordner wechseln
cd frontend

# Dependencies installieren
npm install

# Development Server starten
npm run dev
```

Frontend läuft auf: `http://localhost:3000`

## 🔧 Konfiguration

### Backend (.env)

```env
OPENAI_API_KEY=sk-...
TAVILY_API_KEY=tvly-...
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=your_project_id
APPWRITE_DATABASE_ID=your_database_id
APPWRITE_COLLECTION_ID=your_collection_id
APPWRITE_API_KEY=your_api_key
PORT=3001
```

### Appwrite Collection Schema

Erstelle eine Collection mit folgenden Attributen:

- `title` (String, 255)
- `company` (String, 255)
- `description` (String, 5000)
- `url` (String, 500)
- `source` (String, 255)
- `userFeedback` (String, 1000)
- `savedAt` (String, 50)

## 📚 Technologien

### Backend
- **LangGraph.js v1.0.2** - Stateful Agent Framework
- **LangChain.js** - AI Orchestration
- **Express** - Web Server
- **OpenAI GPT-4** - AI Model
- **Tavily** - Web Search
- **Appwrite** - Database

### Frontend
- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Axios** - HTTP Client

## 🎓 LangGraph Konzepte

### State Management
Der Agent hat einen persistenten State der über den gesamten Workflow erhalten bleibt:

```javascript
{
  messages: [],           // Chat-Verlauf
  searchResults: [],      // Gefundene Jobs
  selectedJobs: [],       // User-Auswahl
  jobDetails: null,       // Job-Details mit AI-Summary
  currentStep: "idle",    // Workflow-Status
  waitingForUser: false   // Human-in-the-Loop
}
```

### Graph Workflow

```
START → search → waiting_for_selection → process_selection 
          ↓                                      ↓
        [USER WÄHLT JOB]              waiting_for_feedback
                                              ↓
                                    [USER GIBT FEEDBACK]
                                              ↓
                                      save_feedback → END
```

### Nodes (Aktionen)

1. **searchNode** - Sucht Jobs mit Tavily
2. **processSelectionNode** - Generiert AI-Summary mit GPT-4
3. **saveFeedbackNode** - Speichert Job in Appwrite

## 🔄 API Endpoints

### POST `/api/search`
Starte Job-Suche
```json
{
  "query": "React Developer Berlin",
  "userId": "optional-user-id"
}
```

### POST `/api/select`
Wähle Job aus
```json
{
  "jobId": 1,
  "threadId": "user-123"
}
```

### POST `/api/feedback`
Gib Feedback
```json
{
  "feedback": "Sehr interessant!",
  "threadId": "user-123"
}
```

### GET `/api/saved-jobs`
Hole gespeicherte Jobs

## 🧪 Testing

1. Starte Backend und Frontend
2. Öffne `http://localhost:3000`
3. Suche: "React Developer Berlin"
4. Wähle einen Job aus
5. Gib Feedback
6. Job wird gespeichert!

## 📝 Wichtige Hinweise

- **State Persistence**: Nutzt `MemorySaver` (In Production: Redis nutzen!)
- **Error Handling**: Alle Nodes haben try-catch
- **Thread IDs**: Für User-Sessions (wie Cookies)
- **Human-in-the-Loop**: Agent wartet an definierten Punkten

## 🚀 Deployment

### Backend (Railway)
```bash
# Railway CLI installieren
npm install -g railway

# In backend/ Ordner
railway login
railway init
railway up
```

### Frontend (Vercel)
```bash
# Vercel CLI installieren
npm install -g vercel

# In frontend/ Ordner
vercel
```

## 📖 Ressourcen

- [LangGraph Docs](https://langchain-ai.github.io/langgraphjs/)
- [LangChain.js Docs](https://js.langchain.com/)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Tavily API Docs](https://docs.tavily.com/)

## 🎯 Nächste Schritte

1. ✅ Projekt erfolgreich aufgesetzt
2. ⬜ API Keys konfigurieren
3. ⬜ Backend starten
4. ⬜ Frontend starten
5. ⬜ Erste Job-Suche testen

---

**Built with ❤️ using LangGraph v1.0**

