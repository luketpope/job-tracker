// src/pages/Home.jsx

import { useEffect, useState } from 'react';
import JobList from '../components/JobList.jsx';

export default function Home() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = () => {
    fetch('http://localhost:8000/jobs')
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error('Error fetching jobs:', err));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      <JobList jobs={jobs} />
    </div>
  );
}
