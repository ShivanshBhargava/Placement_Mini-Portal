import React, { useState, useEffect } from 'react';
import { get, post, API_BASE, buildUrl } from '../../config/api';

export default function JobListings() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    company: '',
    location: '',
    minSalary: '',
    maxSalary: ''
  });

  const fetchJobs = async () => {
    try {
      console.log('Fetching jobs from:', buildUrl('/api/student/jobs'));
      const data = await get('/api/student/jobs');
      console.log('Jobs data:', data);
      setJobs(data);
      setFilteredJobs(data);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyForJob = async (jobId) => {
    try {
      try {
        await post(`/api/student/jobs/${jobId}/apply`);
        alert('Application submitted successfully!');
        fetchJobs(); // Refresh jobs to update application status
      } catch (err) {
        alert(err.message || 'Failed to apply');
      }
    } catch (error) {
      console.error('Failed to apply:', error);
      alert('Failed to apply for job');
    }
  };

  const applyFilters = () => {
    let filtered = jobs.filter(job => {
      const matchesCompany = !filters.company ||
        job.companyName.toLowerCase().includes(filters.company.toLowerCase());

      const matchesLocation = !filters.location ||
        job.location?.toLowerCase().includes(filters.location.toLowerCase());

      const salary = job.salaryPackage ? parseFloat(job.salaryPackage.replace(/[^\d.]/g, '')) : 0;
      const matchesMinSalary = !filters.minSalary || salary >= parseFloat(filters.minSalary);
      const matchesMaxSalary = !filters.maxSalary || salary <= parseFloat(filters.maxSalary);

      return matchesCompany && matchesLocation && matchesMinSalary && matchesMaxSalary;
    });
    setFilteredJobs(filtered);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({ company: '', location: '', minSalary: '', maxSalary: '' });
    setFilteredJobs(jobs);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, jobs]);

  if (loading) return <div>Loading jobs...</div>;

  return (
    <div className="job-listings">
      <h2>Available Job Opportunities</h2>

      <div className="filters-section">
        <h3>Filter Jobs</h3>
        <div className="filters-grid">
          <div className="filter-group">
            <label>Company</label>
            <input
              type="text"
              placeholder="Search by company"
              value={filters.company}
              onChange={(e) => handleFilterChange('company', e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Location</label>
            <input
              type="text"
              placeholder="Search by location"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Min Salary (LPA)</label>
            <input
              type="number"
              placeholder="Min salary"
              value={filters.minSalary}
              onChange={(e) => handleFilterChange('minSalary', e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Max Salary (LPA)</label>
            <input
              type="number"
              placeholder="Max salary"
              value={filters.maxSalary}
              onChange={(e) => handleFilterChange('maxSalary', e.target.value)}
            />
          </div>

          <div className="filter-actions">
            <button onClick={clearFilters} className="clear-btn">
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <p>{jobs.length === 0 ? 'No jobs available at the moment.' : 'No jobs match your filters.'}</p>
      ) : (
        <div className="jobs-grid">
          {filteredJobs.map(job => (
            <div key={job.id} className="job-card">
              <h3>{job.title}</h3>
              <p><strong>Company:</strong> {job.companyName}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salaryPackage}</p>
              <p><strong>Eligibility:</strong> {job.eligibility}</p>
              {job.description && (
                <p><strong>Description:</strong> {job.description}</p>
              )}

              <div className="job-actions">
                {job.applications.length > 0 ? (
                  <span className="applied-status">
                    Applied - Status: {job.applications[0].status}
                  </span>
                ) : (
                  <button
                    onClick={() => applyForJob(job.id)}
                    className="apply-btn"
                  >
                    Apply Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}