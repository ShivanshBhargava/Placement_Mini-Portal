import React, { useState, useEffect } from 'react';
import JobForm from './JobForm';
import JobList from './JobList';
import './CompanyDashboard.css';

export default function CompanyDashboard() {
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/jobs', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleJobCreated = () => {
    fetchJobs();
    setShowForm(false);
    setEditingJob(null);
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  const handleDelete = async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5001/api/jobs/${jobId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchJobs();
    } catch (error) {
      console.error('Failed to delete job:', error);
    }
  };

  return (
    <div className="company-dashboard">
      <h1>Company Dashboard</h1>
      
      <div className="dashboard-actions">
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Create New Job'}
        </button>
      </div>

      {showForm && (
        <JobForm 
          job={editingJob} 
          onJobCreated={handleJobCreated}
          onCancel={() => {
            setShowForm(false);
            setEditingJob(null);
          }}
        />
      )}

      <JobList 
        jobs={jobs} 
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}