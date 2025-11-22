import axios from 'axios';
import { ApiResponse } from '../types';

// Verwende Environment Variable für Backend URL (Vercel) oder Fallback auf lokalen Proxy
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const api = {
  /**
   * Starte Job-Suche
   */
  async searchJobs(query: string, userId?: string): Promise<ApiResponse> {
    const response = await axios.post<ApiResponse>(`${API_BASE_URL}/search`, {
      query,
      userId
    });
    return response.data;
  },

  /**
   * Wähle Job aus
   */
  async selectJob(jobId: number, threadId: string): Promise<ApiResponse> {
    const response = await axios.post<ApiResponse>(`${API_BASE_URL}/select`, {
      jobId,
      threadId
    });
    return response.data;
  },

  /**
   * Gib Feedback
   */
  async submitFeedback(feedback: string, threadId: string): Promise<ApiResponse> {
    const response = await axios.post<ApiResponse>(`${API_BASE_URL}/feedback`, {
      feedback,
      threadId
    });
    return response.data;
  },

  /**
   * Hole gespeicherte Jobs
   */
  async getSavedJobs(): Promise<any> {
    const response = await axios.get(`${API_BASE_URL}/saved-jobs`);
    return response.data;
  }
};
