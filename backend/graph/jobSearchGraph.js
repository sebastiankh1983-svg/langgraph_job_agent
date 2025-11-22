/**
 * LangGraph Job Search Agent
 * Stateful Agent mit Human-in-the-Loop
 */
import { StateGraph, END, START } from "@langchain/langgraph";
import { MemorySaver } from "@langchain/langgraph";
import { StateAnnotation } from "../config/state.js";
import { searchNode } from "../nodes/searchNode.js";
import { processSelectionNode } from "../nodes/processSelectionNode.js";
import { saveFeedbackNode } from "../nodes/saveFeedbackNode.js";

/**
 * Routing Logic - Entscheidet welcher Node als nächstes kommt
 */
function routeAfterSearch(state) {
  if (state.error) {
    return END;
  }
  // Nach Search: Immer zu END (warte auf User-Input)
  return END;
}

function routeAfterSelection(state) {
  if (state.error) {
    return END;
  }
  // Nach Selection: Immer zu END (warte auf User-Feedback)
  return END;
}

function routeAfterFeedback(state) {
  // Nach Feedback: Immer zu END (fertig)
  return END;
}

/**
 * Erstellt den Job Search Graph
 */
export function createJobSearchGraph() {
  // Checkpointer für State Persistence
  const checkpointer = new MemorySaver();

  // Graph initialisieren
  const workflow = new StateGraph(StateAnnotation);

  // Nodes hinzufügen
  workflow.addNode("search", searchNode);
  workflow.addNode("process_selection", processSelectionNode);
  workflow.addNode("save_feedback", saveFeedbackNode);

  // Edges definieren - START basierend auf currentStep
  workflow.addConditionalEdges(START, (state) => {
    // Entscheide basierend auf currentStep welcher Node gestartet wird
    if (state.currentStep === "searching") {
      return "search";
    }
    if (state.currentStep === "processing_selection") {
      return "process_selection";
    }
    if (state.currentStep === "saving_feedback") {
      return "save_feedback";
    }
    // Default: search
    return "search";
  }, {
    search: "search",
    process_selection: "process_selection",
    save_feedback: "save_feedback"
  });

  // Jeder Node führt zu END (warte auf nächsten User-Input)
  workflow.addConditionalEdges("search", routeAfterSearch);
  workflow.addConditionalEdges("process_selection", routeAfterSelection);
  workflow.addConditionalEdges("save_feedback", routeAfterFeedback);

  // Kompiliere Graph mit Checkpointer
  const app = workflow.compile({ checkpointer });

  return app;
}

/**
 * Invoke Agent mit Thread ID für Persistence
 */
export async function invokeAgent(graph, input, threadId) {
  const config = {
    configurable:
    {
      thread_id: threadId
    }
  };

  const result = await graph.invoke(input, config);
  return result;
}
