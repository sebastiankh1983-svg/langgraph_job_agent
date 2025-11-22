import React, { useState } from 'react';
import { AgentState } from './types';
import { api } from './services/api';
import SearchForm from './components/SearchForm';
import MessageList from './components/MessageList';
import JobCard from './components/JobCard';
import JobDetails from './components/JobDetails';
import './App.css';

function App() {
  const [state, setState] = useState<AgentState | null>(null);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.searchJobs(query);

      if (response.success && response.state) {
        setState(response.state);
        setThreadId(response.threadId || null);
      } else {
        setError(response.error || 'Suche fehlgeschlagen');
      }
    } catch (err: any) {
      setError(err.message || 'Netzwerkfehler');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectJob = async (jobId: number) => {
    if (!threadId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await api.selectJob(jobId, threadId);

      if (response.success && response.state) {
        setState(response.state);
      } else {
        setError(response.error || 'Auswahl fehlgeschlagen');
      }
    } catch (err: any) {
      setError(err.message || 'Netzwerkfehler');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitFeedback = async (feedback: string) => {
    if (!threadId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await api.submitFeedback(feedback, threadId);

      if (response.success && response.state) {
        setState(response.state);
      } else {
        setError(response.error || 'Feedback fehlgeschlagen');
      }
    } catch (err: any) {
      setError(err.message || 'Netzwerkfehler');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setState(null);
    setThreadId(null);
    setError(null);
  };

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>🤖 Job Search Agent</h1>
          <p className="subtitle">Powered by LangGraph v1.0 + GPT-4</p>
        </header>

        <SearchForm onSearch={handleSearch} loading={loading} />

        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}

        {state && state.messages && (
          <MessageList messages={state.messages} />
        )}

        {state && state.currentStep === 'awaiting_selection' && state.searchResults.length > 0 && (
          <div className="results-section">
            <h2>📋 Gefundene Jobs ({state.searchResults.length})</h2>
            <div className="job-grid">
              {state.searchResults.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onSelect={handleSelectJob}
                  disabled={loading}
                />
              ))}
            </div>
          </div>
        )}

        {state && state.currentStep === 'awaiting_feedback' && state.jobDetails && (
          <div className="details-section">
            <JobDetails
              jobDetails={state.jobDetails}
              onSubmitFeedback={handleSubmitFeedback}
              loading={loading}
            />
          </div>
        )}

        {state && state.currentStep === 'completed' && (
          <div className="success-message">
            <div className="success-content">
              <span className="success-icon">✅</span>
              <div>
                <h3>Job erfolgreich gespeichert!</h3>
                <p>Du kannst jetzt nach weiteren Jobs suchen.</p>
              </div>
              <button onClick={handleReset} className="reset-button">
                Neue Suche starten
              </button>
            </div>
          </div>
        )}

        {loading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p>Agent arbeitet...</p>
          </div>
        )}
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-tech">
            <span>LangGraph</span>
            <span>React</span>
            <span>TypeScript</span>
            <span>GPT-4</span>
            <span>Node.js</span>
          </div>
          <div className="footer-credit">
            Erstellt von <span className="footer-name">Sebastian</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
