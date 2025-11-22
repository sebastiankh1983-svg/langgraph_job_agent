import React, { useState } from 'react';
import { JobDetails as JobDetailsType } from '../types';
import './JobDetails.css';

interface JobDetailsProps {
  jobDetails: JobDetailsType;
  onSubmitFeedback: (feedback: string) => void;
  loading: boolean;
}

const JobDetails: React.FC<JobDetailsProps> = ({ jobDetails, onSubmitFeedback, loading }) => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback.trim()) {
      onSubmitFeedback(feedback);
    }
  };

  return (
    <div className="job-details">
      <div className="job-details-header">
        <h2>{jobDetails.title}</h2>
        <span className="company-badge">{jobDetails.company}</span>
      </div>

      <div className="ai-summary">
        <h3>🤖 AI Analyse</h3>
        <div className="summary-content">
          {jobDetails.aiSummary}
        </div>
      </div>

      <div className="job-link">
        <a href={jobDetails.url} target="_blank" rel="noopener noreferrer">
          🔗 Job-Posting öffnen
        </a>
      </div>

      <form className="feedback-form" onSubmit={handleSubmit}>
        <h3>💬 Dein Feedback</h3>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Was denkst du über diesen Job? (z.B. 'Sehr interessant', 'Passt perfekt', etc.)"
          rows={4}
          disabled={loading}
        />
        <button type="submit" disabled={loading || !feedback.trim()}>
          {loading ? '💾 Speichere...' : '💾 Speichern'}
        </button>
      </form>
    </div>
  );
};

export default JobDetails;

