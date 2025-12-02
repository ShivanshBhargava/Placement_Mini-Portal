import React, { useState, useEffect } from 'react';

export default function ApplicationStatus() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/student/applications', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return '#ffc107';
      case 'SHORTLISTED': return '#17a2b8';
      case 'SELECTED': return '#28a745';
      case 'REJECTED': return '#dc3545';
      default: return '#6c757d';
    }
  };

  if (loading) return <div>Loading applications...</div>;

  return (
    <div className="application-status">
      <h2>My Applications</h2>
      
      {applications.length === 0 ? (
        <p>You haven't applied to any jobs yet.</p>
      ) : (
        <div className="applications-list">
          {applications.map(application => (
            <div key={application.id} className="application-card">
              <h3>{application.job.title}</h3>
              <p><strong>Company:</strong> {application.job.postedBy.companyName}</p>
              <p><strong>Location:</strong> {application.job.location}</p>
              <p><strong>Applied On:</strong> {new Date(application.appliedAt).toLocaleDateString()}</p>
              
              <div className="status-badge">
                <span 
                  className="status"
                  style={{ 
                    backgroundColor: getStatusColor(application.status),
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}
                >
                  {application.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}