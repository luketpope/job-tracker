// src/pages/UpdateJob.jsx

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JobForm from '../components/JobForm';

export default function UpdateJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/jobs/${id}`)
      .then(res => res.json())
      .then(data => setFormData(data))
      .catch(err => console.error('Error fetching job:', err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:8000/jobs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      navigate('/');
    } else {
      const error = await response.json();
      alert('Error: ' + error.detail);
    }
  };

  return formData ? (
    <JobForm
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isEditing={true}
    />
  ) : (
    <p>Loading...</p>
  );
}
