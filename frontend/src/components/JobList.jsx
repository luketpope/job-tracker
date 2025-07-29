// src/components/JobList.jsx
import { useEffect, useState } from 'react';
import JobCard from './JobCard';
import JobFilters from './JobFilters';

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ status: '', company: '' });

  useEffect(() => {
    const query = new URLSearchParams();
    if (filters.status) query.append('status', filters.status);
    if (filters.company) query.append('company', filters.company);

    fetch(`http://localhost:8000/jobs?${query.toString()}`)
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error('Error fetching jobs:', err));
  }, [filters]);

  return (
    <div className="px-4">
      <JobFilters filters={filters} setFilters={setFilters} />
      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
