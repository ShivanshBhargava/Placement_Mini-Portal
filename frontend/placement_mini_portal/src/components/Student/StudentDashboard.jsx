import React, { useState } from 'react';
import JobListings from './JobListings';
import ApplicationStatus from './ApplicationStatus';
import './StudentDashboard.css';

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('jobs');

  return (
    <div className="student-dashboard">
      <h1>Student Dashboard</h1>
      
      <div className="dashboard-tabs">
        <button 
          className={activeTab === 'jobs' ? 'active' : ''}
          onClick={() => setActiveTab('jobs')}
        >
          Available Jobs
        </button>
        <button 
          className={activeTab === 'applications' ? 'active' : ''}
          onClick={() => setActiveTab('applications')}
        >
          My Applications
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'jobs' && <JobListings />}
        {activeTab === 'applications' && <ApplicationStatus />}
      </div>
    </div>
  );
}