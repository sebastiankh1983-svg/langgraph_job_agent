# Quick Start Commands

## Local Development

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your API keys
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## Deployment

### Railway (Backend)
```bash
# 1. Push to GitHub
cd backend
git init
git add .
git commit -m "Initial commit: LangGraph Job Search Agent Backend"
git remote add origin https://github.com/sebastiankh1983-svg/langgraph_job_agent.git
git push -u origin main

# 2. Connect to Railway
# - Go to railway.app
# - New Project → Deploy from GitHub
# - Select repository: sebastiankh1983-svg/langgraph_job_agent
# - Set environment variables
```

### Vercel (Frontend)
```bash
# 1. Update vercel.json with Railway URL
# 2. Push to GitHub (Frontend muss im selben Repo sein oder eigenes Repo)

# Option A: Monorepo (Backend + Frontend zusammen)
# - Railway deployed aus /backend Ordner
# - Vercel deployed aus /frontend Ordner

# Option B: Separates Frontend Repo erstellen
cd frontend
git init
git add .
git commit -m "Initial commit: Job Search Agent Frontend"
git remote add origin https://github.com/sebastiankh1983-svg/langgraph_job_agent_frontend.git
git push -u origin main

# 3. Connect to Vercel
# - Go to vercel.com
# - Add New Project
# - Import repository: sebastiankh1983-svg/langgraph_job_agent
# - Root Directory: frontend (bei Monorepo)
# - Set VITE_API_URL environment variable
```

---

## Environment Variables

### Backend (.env)
```env
OPENAI_API_KEY=sk-...
TAVILY_API_KEY=tvly-...
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=...
APPWRITE_DATABASE_ID=...
APPWRITE_COLLECTION_ID=...
APPWRITE_API_KEY=...
PORT=3001
NODE_ENV=production
```

### Frontend (.env.production)
```env
VITE_API_URL=https://your-backend.railway.app/api
```

---

## Testing

### Local
```bash
# Backend: http://localhost:3001
curl http://localhost:3001/api/health

# Frontend: http://localhost:3000
```

### Production
```bash
# Backend
curl https://your-backend.railway.app/api/health

# Frontend
# Open: https://your-app.vercel.app
```

---

## Repository Structure

Da du ein Monorepo nutzt (`langgraph_job_agent`):
```
langgraph_job_agent/
├── backend/          # Railway deployed diesen Ordner
├── frontend/         # Vercel deployed diesen Ordner
├── DEPLOYMENT_GUIDE.md
├── DEPLOYMENT_CHECKLIST.md
├── QUICK_START.md
└── README.md
```

---

## Useful Commands

### Check Logs
```bash
# Railway
railway logs

# Vercel
vercel logs
```

### Redeploy
```bash
# Just push to main branch
git push origin main
```

### Local Build Test
```bash
# Frontend
npm run build
npm run preview

# Backend
npm start
```
