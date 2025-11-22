/**
 * Appwrite Service für Job-Speicherung
 */
import { Client, Databases, ID } from "node-appwrite";

let client;
let databases;

export function initAppwrite() {
  client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  databases = new Databases(client);
}

/**
 * Speichert ausgewählten Job in Appwrite
 */
export async function saveJobToAppwrite(jobData) {
  try {
    const document = await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_COLLECTION_ID,
      ID.unique(),
      {
        title: jobData.title,
        company: jobData.company,
        description: jobData.description,
        url: jobData.url,
        source: jobData.source,
        userFeedback: jobData.userFeedback || "",
        savedAt: new Date().toISOString()
      }
    );

    return {
      success: true,
      documentId: document.$id,
      message: "Job erfolgreich gespeichert"
    };
  } catch (error) {
    console.error("Appwrite Error:", error);
    return {
      success: false,
      error: error.message,
      message: "Fehler beim Speichern"
    };
  }
}

/**
 * Holt alle gespeicherten Jobs
 */
export async function getSavedJobs() {
  try {
    const response = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_COLLECTION_ID
    );

    return {
      success: true,
      jobs: response.documents
    };
  } catch (error) {
    console.error("Appwrite Error:", error);
    return {
      success: false,
      error: error.message,
      jobs: []
    };
  }
}

