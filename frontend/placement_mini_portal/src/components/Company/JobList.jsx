import React from 'react';

export default function JobList({ jobs, onEdit, onDelete }) {
  return (
    <div className="job-list">
      <h2>Your Job Postings</h2>
      
      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <div className="jobs-grid">
          {jobs.map(job => (
            <div key={job.id} className="job-card">
              <h3>{job.title}</h3>
              <p><strong>Company:</strong> {job.companyName}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salaryPackage}</p>
              <p><strong>Applications:</strong> {job.applications?.length || 0}</p>
              
              <div className="job-actions">
                <button onClick={() => onEdit(job)}>Edit</button>
                <button 
                  onClick={() => onDelete(job.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}