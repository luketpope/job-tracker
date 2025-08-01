// src/components/JobList.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JobCard from './JobCard';
import GameJobCard from './GameJobCard';
import JobFilters from './JobFilters';

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ status: '', company: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams();
    if (filters.status) query.append('status', filters.status);
    if (filters.company) query.append('company', filters.company);

    const token = localStorage.getItem('token');
      fetch(`http://localhost:8000/jobs?${query.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error('Error fetching jobs:', err));
  }, [filters]);

  // Function for deleting job listings
  const onDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;

    const response = await fetch(`http://localhost:8000/jobs/${id}`, {
      method: 'DELETE',
    });

    if (response.status === 204) {
      navigate(0);
    } else {
      const error = await response.json();
      alert('Failed to delete job: ' + (error.detail || 'Unknown error'));
    }
  };

  return (
  <div className="px-4">
    <JobFilters filters={filters} setFilters={setFilters} />

    {jobs.length === 0 ? (
      <p className="text-center text-gray-600 dark:text-gray-400">
        No jobs found.
      </p>
    ) : (
      <div
        className="
          flex flex-wrap gap-4 justify-center
          bg-gray-50 dark:bg-gray-900
          p-4 rounded-lg
          shadow-md dark:shadow-lg
          transition-colors duration-300
        "
      >
        {jobs.map((job) => (
          <GameJobCard key={job.id} job={job} onDelete={onDelete} />
        ))}
      </div>
    )}
  </div>
);

}
