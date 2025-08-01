// src/pages/CreateJob.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JobForm from '../components/JobForm';

const defaultForm = {
  title: '',
  company: '',
  salary: '',
  link: '',
  status: 'Pending',
  date_applied: '',
};

export default function CreateJob({ jobs, calculateTotalXP, calculateLevel, calculateLeftoverXP, maxXP }) {
  const [formData, setFormData] = useState(defaultForm);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setFormData(defaultForm);
      navigate('/');
      window.location.reload();
    } else {
      const error = await response.json();
      alert('Error: ' + error.detail);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen">
      <JobForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        setFormData={setFormData}
        calculateTotalXP={calculateTotalXP}
        calculateLevel={calculateLevel}
        calculateLeftoverXP={calculateLeftoverXP}
        maxXP={maxXP}
        jobs={jobs}
      />
    </div>
  );
}

