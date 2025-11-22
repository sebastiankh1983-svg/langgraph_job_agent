import React from 'react';
import { Job } from '../types';
import './JobCard.css';

interface JobCardProps {
  job: Job;
  onSelect: (jobId: number) => void;
  disabled?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, onSelect, disabled }) => {
  return (
    <div className="job-card">
      <div className="job-card-header">
        <h3 className="job-title">{job.title}</h3>
        <span className="job-company">{job.company}</span>
      </div>

      <p className="job-description">
        {job.description.substring(0, 150)}...
      </p>

      <div className="job-card-footer">
        <span className="job-source">📍 {job.source}</span>
        <button
          className="job-select-button"
          onClick={() => onSelect(job.id)}
          disabled={disabled}
        >
          Details anzeigen
        </button>
      </div>
    </div>
  );
};

export default JobCard;

