/**
 * Save Feedback Node - Speichert Job mit User-Feedback
 */
import { saveJobToAppwrite } from "../services/appwriteService.js";

export async function saveFeedbackNode(state) {
  console.log("💾 Save Feedback Node - Speichere Job...");

  try {
    const jobDetails = state.jobDetails;
    const userFeedback = state.userFeedback;

    if (!jobDetails) {
      throw new Error("Keine Job-Details vorhanden");
    }

    // Speichere in Appwrite
    const result = await saveJobToAppwrite({
      ...jobDetails,
      userFeedback: userFeedback
    });

    if (!result.success) {
      throw new Error(result.error || "Speichern fehlgeschlagen");
    }

    console.log("✅ Job gespeichert");

    return {
      currentStep: "completed",
      waitingForUser: false,
      messages: [
        {
          role: "assistant",
          content: `Super! Der Job wurde erfolgreich gespeichert. Du kannst jetzt nach weiteren Jobs suchen oder die gespeicherten Jobs ansehen.`,
          timestamp: new Date().toISOString()
        }
      ]
    };
  } catch (error) {
    console.error("❌ Save Feedback Node Error:", error);

    return {
      currentStep: "error",
      waitingForUser: false,
      error: error.message,
      messages: [
        {
          role: "assistant",
          content: `Fehler beim Speichern: ${error.message}`,
          timestamp: new Date().toISOString()
        }
      ]
    };
  }
}

