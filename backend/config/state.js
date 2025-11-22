/**
 * LangGraph State Annotation
 * Definiert die Struktur des Agent State
 */
import { Annotation } from "@langchain/langgraph";

export const StateAnnotation = Annotation.Root({
  // Chat-Verlauf
  messages: Annotation({
    reducer: (prev, curr) => [...prev, ...curr],
    default: () => []
  }),

  // Gefundene Jobs aus Tavily Search
  searchResults: Annotation({
    reducer: (prev, curr) => curr,
    default: () => []
  }),

  // Vom User ausgewählte Jobs
  selectedJobs: Annotation({
    reducer: (prev, curr) => curr,
    default: () => []
  }),

  // Job-Details
  jobDetails: Annotation({
    reducer: (prev, curr) => curr,
    default: () => null
  }),

  // User-Feedback
  userFeedback: Annotation({
    reducer: (prev, curr) => curr,
    default: () => null
  }),

  // Aktueller Workflow-Schritt
  currentStep: Annotation({
    reducer: (prev, curr) => curr,
    default: () => "idle"
  }),

  // Wartet Agent auf User-Input?
  waitingForUser: Annotation({
    reducer: (prev, curr) => curr,
    default: () => false
  }),

  // Error-Handling
  error: Annotation({
    reducer: (prev, curr) => curr,
    default: () => null
  })
});

