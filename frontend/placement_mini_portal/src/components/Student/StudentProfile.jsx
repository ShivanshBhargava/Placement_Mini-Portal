import React, { useState, useEffect } from 'react';
import './StudentProfile.css';

export default function StudentProfile() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    branch: '',
    college: '',
    university: '',
    passingYear: '',
    cgpa: '',
    percentage: '',
    bio: '',
    goals: '',
    resumeUrl: '',
    resumeName: '',
    profileImage: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/student/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        // Set image preview from saved profile data
        if (data.profileImage) {
          setImagePreview(data.profileImage);
        }
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveProfileImage = async (imageData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      const response = await fetch('http://localhost:5001/api/student/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ profileImage: imageData })
      });
      
      if (response.ok) {
        console.log('Profile image saved successfully');
      }
    } catch (error) {
      console.error('Failed to save profile image:', error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Resize image to max 300x300
            const maxSize = 300;
            let { width, height } = img;
            
            if (width > height) {
              if (width > maxSize) {
                height = (height * maxSize) / width;
                width = maxSize;
              }
            } else {
              if (height > maxSize) {
                width = (width * maxSize) / height;
                height = maxSize;
              }
            }
            
            canvas.width = width;
            canvas.height = height;
            
            ctx.drawImage(img, 0, 0, width, height);
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
            
            setImagePreview(compressedBase64);
            setProfile(prev => {
              const updatedProfile = {
                ...prev,
                profileImage: compressedBase64
              };
              // Auto-save the image
              saveProfileImage(compressedBase64);
              return updatedProfile;
            });
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select a valid image file (JPG/PNG)');
      }
    }
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (allowedTypes.includes(file.type)) {
        
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64 = e.target.result;
          setProfile(prev => ({
            ...prev,
            resumeUrl: base64,
            resumeName: file.name
          }));
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select a PDF or image file (JPG/PNG)');
      }
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert('Please login again');
        return;
      }
      
      console.log('Saving profile:', profile);
      
      // Send all profile fields including image
      const profileData = {
        name: profile.name,
        branch: profile.branch,
        college: profile.college,
        university: profile.university,
        passingYear: profile.passingYear,
        cgpa: profile.cgpa,
        percentage: profile.percentage,
        bio: profile.bio,
        goals: profile.goals,
        resumeUrl: profile.resumeUrl,
        resumeName: profile.resumeName,
        profileImage: profile.profileImage
      };
      
      const response = await fetch('http://localhost:5001/api/student/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });

      console.log('Response status:', response.status);
      
      if (response.ok) {
        const result = await response.json();
        alert('Profile saved successfully!');
        setEditing(false); // Switch to view mode
        // Update profile state with saved data
        if (result.student) {
          setProfile(prev => ({
            ...prev,
            ...result.student
          }));
        }
      } else {
        const errorText = await response.text();
        console.error('Server error:', errorText);
        alert('Server error: ' + errorText);
      }
    } catch (error) {
      console.error('Network error:', error);
      // Fallback - save to localStorage temporarily
      localStorage.setItem('studentProfile', JSON.stringify(profile));
      alert('Saved locally! Please try again when server is available.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading">Loading profile...</div>;

  return (
    <div className="student-profile">
      <div className="profile-header">
        <div className="profile-title">
          <h2>My Profile</h2>
          <button 
            onClick={() => setEditing(!editing)}
            className="edit-toggle-btn"
          >
            {editing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
      </div>

      <div className="profile-content">
        {/* Profile Image Section */}
        <div className="profile-image-section">
          <div className="image-upload-container">
            <div className="profile-image-preview">
              {imagePreview ? (
                <img src={imagePreview} alt="Profile" className="profile-image" />
              ) : (
                <div className="placeholder-image">
                  <span>No Image</span>
                </div>
              )}
            </div>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input"
            />
            <label htmlFor="profileImage" className="upload-btn">
              {imagePreview ? 'Change Photo' : 'Upload Photo'}
            </label>
          </div>
        </div>

        {/* Basic Information */}
        <div className="profile-section">
          <h3>Basic Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={profile.name || ''}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                readOnly={!editing}
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={profile.email || ''}
                onChange={handleInputChange}
                placeholder="Enter your email"
                disabled
              />
            </div>
            <div className="form-group">
              <label>Branch/Course</label>
              <input
                type="text"
                name="branch"
                value={profile.branch || ''}
                onChange={handleInputChange}
                placeholder="e.g., B.Tech - CSE"
                readOnly={!editing}
              />
            </div>
            <div className="form-group">
              <label>College Name</label>
              <input
                type="text"
                name="college"
                value={profile.college || ''}
                onChange={handleInputChange}
                placeholder="Enter your college name"
                readOnly={!editing}
              />
            </div>
            <div className="form-group">
              <label>University Name</label>
              <input
                type="text"
                name="university"
                value={profile.university || ''}
                onChange={handleInputChange}
                placeholder="Enter your university name"
                readOnly={!editing}
              />
            </div>
            <div className="form-group">
              <label>Passing Year</label>
              <input
                type="number"
                name="passingYear"
                value={profile.passingYear || ''}
                onChange={handleInputChange}
                placeholder="e.g., 2024"
                readOnly={!editing}
              />
            </div>
            <div className="form-group">
              <label>CGPA</label>
              <input
                type="number"
                step="0.01"
                name="cgpa"
                value={profile.cgpa || ''}
                onChange={handleInputChange}
                placeholder="e.g., 8.5"
                readOnly={!editing}
              />
            </div>
            <div className="form-group">
              <label>Percentage</label>
              <input
                type="number"
                step="0.01"
                name="percentage"
                value={profile.percentage || ''}
                onChange={handleInputChange}
                placeholder="e.g., 85.5"
                readOnly={!editing}
              />
            </div>
          </div>
        </div>

        {/* Resume Upload */}
        <div className="profile-section">
          <h3>Resume</h3>
          <div className="resume-upload">
            {editing && (
              <>
                <input
                  type="file"
                  id="resume"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleResumeUpload}
                  className="file-input"
                />
                <label htmlFor="resume" className="upload-btn">
                  {profile.resumeName ? 'Update Resume' : 'Upload Resume'}
                </label>
              </>
            )}
            {profile.resumeName && (
              <div className="file-info">
                <span className="file-name">📄 {profile.resumeName}</span>
                {profile.resumeUrl && (
                  <a 
                    href={profile.resumeUrl} 
                    download={profile.resumeName}
                    className="download-link"
                  >
                    Download
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Personal Section */}
        <div className="profile-section">
          <h3>Personal Information</h3>
          <div className="form-group">
            <label>Bio</label>
            <textarea
              name="bio"
              value={profile.bio || ''}
              onChange={handleInputChange}
              placeholder="Write a short introduction about yourself..."
              rows="4"
              readOnly={!editing}
            />
          </div>
          <div className="form-group">
            <label>Career Goals</label>
            <textarea
              name="goals"
              value={profile.goals || ''}
              onChange={handleInputChange}
              placeholder="Describe your career goals and aspirations..."
              rows="4"
              readOnly={!editing}
            />
          </div>
        </div>

        {/* Save Button - Only show in edit mode */}
        {editing && (
          <div className="profile-actions">
            <button 
              onClick={handleSave} 
              disabled={saving}
              className="save-btn"
            >
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}