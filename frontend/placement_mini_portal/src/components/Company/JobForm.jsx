import React, { useState, useEffect } from 'react';

export default function JobForm({ job, onJobCreated, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eligibility: '',
    location: '',
    salaryPackage: '',
    role: '',
    applicationStart: '',
    applicationEnd: ''
  });

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || '',
        description: job.description || '',
        eligibility: job.eligibility || '',
        location: job.location || '',
        salaryPackage: job.salaryPackage || '',
        role: job.role || '',
        applicationStart: job.applicationStart ? job.applicationStart.slice(0, 16) : '',
        applicationEnd: job.applicationEnd ? job.applicationEnd.slice(0, 16) : ''
      });
    }
  }, [job]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const url = job 
        ? `http://localhost:5001/api/jobs/${job.id}`
        : 'http://localhost:5001/api/jobs';
      
      const method = job ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        onJobCreated();
        setFormData({
          title: '',
          description: '',
          eligibility: '',
          location: '',
          salaryPackage: '',
          role: '',
          applicationStart: '',
          applicationEnd: ''
        });
      }
    } catch (error) {
      console.error('Failed to save job:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="job-form">
      <h2>{job ? 'Edit Job' : 'Create New Job'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>Eligibility</label>
          <input
            type="text"
            name="eligibility"
            value={formData.eligibility}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Salary Package</label>
          <input
            type="text"
            name="salaryPackage"
            value={formData.salaryPackage}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="submit">{job ? 'Update' : 'Create'} Job</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}