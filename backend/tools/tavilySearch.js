/**
 * Tavily Search Tool für Job-Suche
 */
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";

export function createTavilyTool() {
  return new TavilySearchResults({
    maxResults: 5,
    apiKey: process.env.TAVILY_API_KEY,
    description: "Search the web for job listings and career opportunities"
  });
}

/**
 * Formatiert Tavily Suchergebnisse zu strukturierten Job-Objekten
 */
export function formatJobResults(results) {
  if (!results || !Array.isArray(results)) {
    return [];
  }

  return results.map((result, index) => ({
    id: index + 1,
    title: extractJobTitle(result.title),
    company: extractCompany(result.title),
    description: result.content,
    url: result.url,
    source: new URL(result.url).hostname
  }));
}

function extractJobTitle(title) {
  // Versuche Job-Titel zu extrahieren (vor " - " oder " at ")
  const match = title.match(/^(.+?)(?:\s-\s|\sat\s)/);
  return match ? match[1].trim() : title;
}

function extractCompany(title) {
  // Versuche Firmennamen zu extrahieren (nach " - " oder " at ")
  const match = title.match(/(?:\s-\s|\sat\s)(.+?)(?:\s\||$)/);
  return match ? match[1].trim() : "Unknown Company";
}

