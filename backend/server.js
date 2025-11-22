/**
 * Express Server für LangGraph Job Search Agent
 */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createJobSearchGraph, invokeAgent } from "./graph/jobSearchGraph.js";
import { initAppwrite, getSavedJobs } from "./services/appwriteService.js";

// Environment Variables laden
dotenv.config();

// Server initialisieren
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Appwrite initialisieren
initAppwrite();

// LangGraph Agent erstellen
const jobSearchGraph = createJobSearchGraph();

// Session Storage (In Production: Redis/Database nutzen)
const sessions = new Map();

/**
 * POST /api/search - Starte Job-Suche
 */
app.post("/api/search", async (req, res) => {
  try {
    const { query, userId } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query ist erforderlich" });
    }

    const threadId = userId || `user-${Date.now()}`;

    console.log(`🚀 Starte Suche für User: ${threadId}`);

    // Initial State
    const input = {
      messages: [
        {
          role: "user",
          content: query,
          timestamp: new Date().toISOString()
        }
      ],
      currentStep: "searching"
    };

    // Invoke Agent
    const result = await invokeAgent(jobSearchGraph, input, threadId);

    // Session speichern
    sessions.set(threadId, result);

    res.json({
      success: true,
      threadId: threadId,
      state: result
    });
  } catch (error) {
    console.error("❌ Search Error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/select - User wählt Job aus
 */
app.post("/api/select", async (req, res) => {
  try {
    const { jobId, threadId } = req.body;

    if (!jobId || !threadId) {
      return res.status(400).json({ error: "jobId und threadId erforderlich" });
    }

    console.log(`📌 User ${threadId} wählt Job ${jobId}`);

    // Hole aktuelle Session
    const currentState = sessions.get(threadId);

    if (!currentState) {
      return res.status(404).json({ error: "Session nicht gefunden" });
    }

    // Finde ausgewählten Job
    const selectedJob = currentState.searchResults.find(job => job.id === jobId);

    if (!selectedJob) {
      return res.status(404).json({ error: "Job nicht gefunden" });
    }

    // Update State
    const input = {
      ...currentState,
      selectedJobs: [selectedJob],
      waitingForUser: false,
      currentStep: "processing_selection"
    };

    // Invoke Agent
    const result = await invokeAgent(jobSearchGraph, input, threadId);

    // Session updaten
    sessions.set(threadId, result);

    res.json({
      success: true,
      state: result
    });
  } catch (error) {
    console.error("❌ Select Error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/feedback - User gibt Feedback
 */
app.post("/api/feedback", async (req, res) => {
  try {
    const { feedback, threadId } = req.body;

    if (!feedback || !threadId) {
      return res.status(400).json({ error: "feedback und threadId erforderlich" });
    }

    console.log(`💬 User ${threadId} gibt Feedback`);

    // Hole aktuelle Session
    const currentState = sessions.get(threadId);

    if (!currentState) {
      return res.status(404).json({ error: "Session nicht gefunden" });
    }

    // Update State
    const input = {
      ...currentState,
      userFeedback: feedback,
      waitingForUser: false,
      currentStep: "saving_feedback"
    };

    // Invoke Agent
    const result = await invokeAgent(jobSearchGraph, input, threadId);

    // Session updaten
    sessions.set(threadId, result);

    res.json({
      success: true,
      state: result
    });
  } catch (error) {
    console.error("❌ Feedback Error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/saved-jobs - Hole gespeicherte Jobs
 */
app.get("/api/saved-jobs", async (req, res) => {
  try {
    const result = await getSavedJobs();

    res.json({
      success: result.success,
      jobs: result.jobs
    });
  } catch (error) {
    console.error("❌ Get Saved Jobs Error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/health - Health Check
 */
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    sessions: sessions.size
  });
});

// Server starten
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  🤖 Job Search Agent Backend Started  ║
║  Port: ${PORT}                          ║
║  Environment: ${process.env.NODE_ENV || 'development'}              ║
╚════════════════════════════════════════╝
  `);
});
