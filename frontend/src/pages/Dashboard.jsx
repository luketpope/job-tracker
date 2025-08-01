// src/pages/Dashboard.jsx

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JobList from '../components/JobList.jsx';

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchJobs = () => {
    fetch('http://localhost:8000/jobs', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        if (res.status === 401) {
          navigate('/login');
          return null;
        }
        return res.json();
      })
      .then(data => { 
        if (data) setJobs(data);
      })
      .catch(err => console.error('Error fetching jobs:', err));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
    } else {
      fetchJobs();
    }
  }, [navigate]);

  return (
    <>
      {isLoggedIn ? (
        <>
        <div className="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
          <JobList jobs={jobs} />
        </div>
        </>
      ) : (
        <>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Not currently logged in. To access the features of this website, please signup and login.
        </p>
        </>
      )}
    </>
  );
}
