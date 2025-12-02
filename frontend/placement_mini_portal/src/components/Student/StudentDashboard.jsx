import React, { useState } from 'react';
import JobListings from './JobListings';
import ApplicationStatus from './ApplicationStatus';
import StudentProfile from './StudentProfile';
import './StudentDashboard.css';

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="student-dashboard">
      <h1>Student Dashboard</h1>
      
      <div className="dashboard-tabs">
        <button 
          className={activeTab === 'profile' ? 'active' : ''}
          onClick={() => setActiveTab('profile')}
        >
          My Profile
        </button>
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
        {activeTab === 'profile' && <StudentProfile />}
        {activeTab === 'jobs' && <JobListings />}
        {activeTab === 'applications' && <ApplicationStatus />}
      </div>
    </div>
  );
}