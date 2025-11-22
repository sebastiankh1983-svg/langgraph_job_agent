# Job Search Agent - Deployment Guide

## 🚀 Deployment Setup

### 1. Backend Deployment (Railway)

#### Schritt 1: Repository erstellen
```bash
# Initialisiere Git (wenn noch nicht geschehen)
cd backend
git init
git add .
git commit -m "Initial commit: LangGraph Job Search Agent Backend"
```

#### Schritt 2: Railway Setup
1. Gehe zu [railway.app](https://railway.app)
2. Klicke auf "New Project"
3. Wähle "Deploy from GitHub repo"
4. Wähle dein Backend Repository
5. Railway erkennt automatisch Node.js

#### Schritt 3: Environment Variables in Railway setzen
Gehe zu Project → Variables und füge hinzu:
```
OPENAI_API_KEY=sk-your-key-here
TAVILY_API_KEY=tvly-your-key-here
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=your-project-id
APPWRITE_DATABASE_ID=your-database-id
APPWRITE_COLLECTION_ID=your-collection-id
APPWRITE_API_KEY=your-api-key
PORT=3001
NODE_ENV=production
```

#### Schritt 4: Deploy
- Railway deployed automatisch nach jedem Push
- Deine Backend URL: `https://your-app.railway.app`

---

### 2. Frontend Deployment (Vercel)

#### Schritt 1: Repository erstellen
```bash
cd frontend
git init
git add .
git commit -m "Initial commit: Job Search Agent Frontend"
```

#### Schritt 2: Vercel Setup
1. Gehe zu [vercel.com](https://vercel.com)
2. Klicke auf "Add New Project"
3. Importiere dein Frontend Repository
4. Vercel erkennt automatisch Vite

#### Schritt 3: Build Settings (automatisch erkannt)
```
Framework: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

#### Schritt 4: Environment Variables in Vercel setzen
Settings → Environment Variables:
```
VITE_API_URL=https://your-backend.railway.app
```

#### Schritt 5: vercel.json anpassen
Öffne `frontend/vercel.json` und ersetze:
```json
"destination": "https://your-backend-url.railway.app/api/:path*"
```
mit deiner Railway Backend URL.

#### Schritt 6: Deploy
- Vercel deployed automatisch nach jedem Push
- Deine Frontend URL: `https://your-app.vercel.app`

---

### 3. Appwrite Setup

#### Schritt 1: Projekt erstellen
1. Gehe zu [cloud.appwrite.io](https://cloud.appwrite.io)
2. Erstelle ein neues Projekt
3. Notiere die Project ID

#### Schritt 2: Database erstellen
1. Gehe zu Databases → Create Database
2. Notiere die Database ID

#### Schritt 3: Collection erstellen
1. Erstelle neue Collection: "jobs"
2. Notiere die Collection ID
3. Füge folgende Attribute hinzu:

| Attribute | Type | Size | Required |
|-----------|------|------|----------|
| title | String | 255 | Yes |
| company | String | 255 | Yes |
| description | String | 5000 | Yes |
| url | String | 500 | Yes |
| source | String | 255 | Yes |
| userFeedback | String | 1000 | No |
| savedAt | String | 50 | Yes |

#### Schritt 4: Permissions setzen
- Create: Any
- Read: Any
- Update: Any
- Delete: Any

#### Schritt 5: API Key erstellen
1. Settings → API Keys
2. Erstelle neuen Key mit Server-Permissions
3. Notiere den API Key

---

## 📋 Deployment Checklist

### Backend (Railway)
- [ ] Git Repository erstellt
- [ ] Railway Projekt erstellt
- [ ] Environment Variables gesetzt
- [ ] Backend deployed und läuft
- [ ] API Health Check: `https://your-backend.railway.app/api/health`

### Frontend (Vercel)
- [ ] Git Repository erstellt
- [ ] Vercel Projekt erstellt
- [ ] Backend URL in vercel.json eingetragen
- [ ] Frontend deployed und läuft
- [ ] Website erreichbar: `https://your-app.vercel.app`

### Appwrite
- [ ] Projekt erstellt
- [ ] Database erstellt
- [ ] Collection "jobs" erstellt
- [ ] Alle Attribute konfiguriert
- [ ] API Key erstellt
- [ ] Credentials in Railway gesetzt

---

## 🧪 Testing nach Deployment

### 1. Backend Test
```bash
curl https://your-backend.railway.app/api/health
```
Erwartete Antwort:
```json
{
  "status": "ok",
  "timestamp": "2025-01-22T...",
  "sessions": 0
}
```

### 2. Frontend Test
1. Öffne `https://your-app.vercel.app`
2. Suche nach Jobs: "React Developer Berlin"
3. Wähle einen Job aus
4. Gib Feedback
5. Prüfe in Appwrite ob Job gespeichert wurde

---

## 🔧 Troubleshooting

### Backend startet nicht
- Prüfe Railway Logs: Project → Deployments → Logs
- Prüfe Environment Variables
- Node Version: 20+ erforderlich

### Frontend kann Backend nicht erreichen
- Prüfe vercel.json: Backend URL korrekt?
- Prüfe Railway: CORS aktiviert?
- Prüfe Browser Console für Fehler

### Jobs werden nicht gespeichert
- Prüfe Appwrite Credentials in Railway
- Prüfe Appwrite Collection Schema
- Prüfe Appwrite Permissions

---

## 🔄 Continuous Deployment

### Automatisches Deployment
Beide Plattformen deployen automatisch bei Git Push:

```bash
# Backend updaten
cd backend
git add .
git commit -m "Update: ..."
git push origin main
# Railway deployed automatisch

# Frontend updaten
cd frontend
git add .
git commit -m "Update: ..."
git push origin main
# Vercel deployed automatisch
```

---

## 📊 Monitoring

### Railway
- Logs: Project → Deployments → Logs
- Metrics: Project → Metrics
- Kosten: Free Tier: $5 credit/month

### Vercel
- Logs: Project → Deployments → [Deployment] → Logs
- Analytics: Project → Analytics
- Kosten: Free Tier: Unlimitiert (mit Limits)

### Appwrite
- Console: cloud.appwrite.io
- Logs: Project → Logs
- Kosten: Free Tier bis 75K requests/month

---

## 💰 Kosten-Übersicht

| Service | Free Tier | Kosten |
|---------|-----------|--------|
| Railway | $5/Monat | $0.000463/GB-hr |
| Vercel | Unlimitiert* | Pro: $20/Monat |
| Appwrite | 75K requests | Pro: $15/Monat |
| OpenAI | - | ~$0.002/request |
| Tavily | 1000 searches | $1/1000 searches |

*Mit Limits: 100GB Bandwidth, 6000 Build Minutes

**Geschätzte monatliche Kosten (100 User):**
- Railway: $5 (Free Tier)
- Vercel: $0 (Free Tier)
- Appwrite: $0 (Free Tier)
- OpenAI: ~$20
- Tavily: ~$5
- **Total: ~$30/Monat**

---

## 🎓 Portfolio-Optimierung

### GitHub README optimieren
Füge hinzu:
- Live Demo Link: `https://your-app.vercel.app`
- Tech Stack Badges
- Screenshots
- Architecture Diagram

### LinkedIn Post
```
🚀 Neues Projekt: AI-Powered Job Search Agent

✨ Features:
- LangGraph v1.0 für Stateful Workflows
- Human-in-the-Loop mit GPT-4
- React + TypeScript Frontend
- Deployed auf Railway & Vercel

🔗 Live Demo: https://your-app.vercel.app
📂 GitHub: https://github.com/your-username/job-search-agent

#AI #LangChain #React #TypeScript #WebDevelopment
```

---

Erstellt von **Sebastian** 💻✨
# Railway Deployment Configuration
# Backend wird automatisch erkannt und deployed

# Build Command (automatisch erkannt)
# npm install

# Start Command
npm start

# Environment Variables (in Railway Dashboard setzen):
# OPENAI_API_KEY=sk-...
# TAVILY_API_KEY=tvly-...
# APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
# APPWRITE_PROJECT_ID=...
# APPWRITE_DATABASE_ID=...
# APPWRITE_COLLECTION_ID=...
# APPWRITE_API_KEY=...
# PORT=3001
# NODE_ENV=production

