export interface Job {
  id: number;
  title: string;
  company: string;
  description: string;
  url: string;
  source: string;
}

export interface JobDetails extends Job {
  aiSummary: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface AgentState {
  messages: Message[];
  searchResults: Job[];
  selectedJobs: Job[];
  jobDetails: JobDetails | null;
  userFeedback: string | null;
  currentStep: string;
  waitingForUser: boolean;
  error: string | null;
}

export interface ApiResponse {
  success: boolean;
  threadId?: string;
  state?: AgentState;
  error?: string;
}

