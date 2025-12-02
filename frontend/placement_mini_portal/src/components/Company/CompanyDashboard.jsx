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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs`, {
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
    if (!confirm('Are you sure you want to delete this job?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      console.log('Deleting job ID:', jobId);
      console.log('Token:', token);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs/${jobId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      console.log('Delete response status:', response.status);

      if (response.ok) {
        // Remove job from state immediately
        setJobs(jobs.filter(job => job.id !== jobId));
        alert('Job deleted successfully!');
      } else {
        const error = await response.json();
        console.error('Delete error response:', error);
        alert(error.error || 'Failed to delete job');
      }
    } catch (error) {
      console.error('Delete request failed:', error);
      alert('Failed to delete job');
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