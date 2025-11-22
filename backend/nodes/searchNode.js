/**
 * Search Node - Sucht Jobs mit Tavily
 */
import { createTavilyTool, formatJobResults } from "../tools/tavilySearch.js";

export async function searchNode(state) {
  console.log("🔍 Search Node - Suche Jobs...");

  try {
    // Hole letzte User-Message
    const lastMessage = state.messages[state.messages.length - 1];
    const query = lastMessage.content;

    // Tavily Search ausführen
    const tavilyTool = createTavilyTool();
    const results = await tavilyTool.invoke(query);

    // Parse JSON results
    const parsedResults = JSON.parse(results);
    const formattedJobs = formatJobResults(parsedResults);

    console.log(`✅ ${formattedJobs.length} Jobs gefunden`);

    return {
      searchResults: formattedJobs,
      currentStep: "awaiting_selection",
      waitingForUser: true,
      messages: [
        {
          role: "assistant",
          content: `Ich habe ${formattedJobs.length} Jobs gefunden. Bitte wähle einen Job aus, um mehr Details zu sehen.`,
          timestamp: new Date().toISOString()
        }
      ]
    };
  } catch (error) {
    console.error("❌ Search Node Error:", error);

    return {
      currentStep: "error",
      waitingForUser: false,
      error: error.message,
      messages: [
        {
          role: "assistant",
          content: `Fehler bei der Job-Suche: ${error.message}`,
          timestamp: new Date().toISOString()
        }
      ]
    };
  }
}

