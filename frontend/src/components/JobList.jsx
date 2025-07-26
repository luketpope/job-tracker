// src/components/JobList.jsx

import JobCard from './JobCard.jsx';

export default function JobList({ jobs }) {
  if (!jobs.length) return <p>No jobs yet.</p>;

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}