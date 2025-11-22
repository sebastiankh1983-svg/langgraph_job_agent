/**
 * Process Selection Node - Verarbeitet User-Auswahl
 */
import { ChatOpenAI } from "@langchain/openai";

export async function processSelectionNode(state) {
  console.log("📋 Process Selection Node - Verarbeite Auswahl...");

  try {
    const selectedJob = state.selectedJobs[0];

    if (!selectedJob) {
      throw new Error("Kein Job ausgewählt");
    }

    // GPT-4 generiert Job-Summary
    const model = new ChatOpenAI({
      modelName: "gpt-4",
      temperature: 0.7,
      apiKey: process.env.OPENAI_API_KEY
    });

    const prompt = `
Analysiere diesen Job und erstelle eine prägnante Zusammenfassung:

Job-Titel: ${selectedJob.title}
Firma: ${selectedJob.company}
Beschreibung: ${selectedJob.description}

Erstelle eine Zusammenfassung mit:
1. Kernaufgaben (2-3 Bullet Points)
2. Wichtigste Anforderungen
3. Einschätzung: Warum könnte dieser Job interessant sein?

Halte es kurz und präzise (max. 150 Wörter).
    `;

    const response = await model.invoke(prompt);
    const summary = response.content;

    console.log("✅ Job-Summary generiert");

    return {
      jobDetails: {
        ...selectedJob,
        aiSummary: summary
      },
      currentStep: "awaiting_feedback",
      waitingForUser: true,
      messages: [
        {
          role: "assistant",
          content: `Hier ist eine Zusammenfassung des Jobs:\n\n${summary}\n\nMöchtest du diesen Job speichern? Gib mir dein Feedback!`,
          timestamp: new Date().toISOString()
        }
      ]
    };
  } catch (error) {
    console.error("❌ Process Selection Node Error:", error);

    return {
      currentStep: "error",
      waitingForUser: false,
      error: error.message,
      messages: [
        {
          role: "assistant",
          content: `Fehler bei der Verarbeitung: ${error.message}`,
          timestamp: new Date().toISOString()
        }
      ]
    };
  }
}

