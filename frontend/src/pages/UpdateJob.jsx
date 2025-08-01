import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JobForm from '../components/JobForm';

export default function UpdateJob({ jobs, calculateTotalXP, calculateLevel, calculateLeftoverXP, maxXP }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  // Prevent the job being updated from double counting in XP
  const jobsExcludingCurrent = jobs.filter(job => job.id !== formData?.id);

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
      window.location.reload();
    } else {
      const error = await response.json();
      alert('Error: ' + error.detail);
    }
  };

  return formData ? (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen">
      <JobForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isEditing={true}
        setFormData={setFormData}
        calculateTotalXP={calculateTotalXP}
        calculateLevel={calculateLevel}
        calculateLeftoverXP={calculateLeftoverXP}
        maxXP={maxXP}
        jobs={jobsExcludingCurrent}
      />
    </div>
  ) : (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen flex items-center justify-center">
      <p className="text-lg font-mono animate-pulse">Loading job data...</p>
    </div>
  );
}
