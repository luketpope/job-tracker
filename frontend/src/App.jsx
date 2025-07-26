import { useEffect, useState } from 'react'
import './App.css'
import JobForm from './components/JobForm'
import JobList from './components/JobList'

function App() {
  const [jobs, setJobs] = useState([])

  const fetchJobs = () => {
    fetch('http://localhost:8000/jobs')
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error('Error fetching backend:', err));
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="App">
      <h1>Job Tracker</h1>
      <JobForm onSuccess={fetchJobs} />
      <h2 style={{ marginTop: '2rem' }}>Jobs</h2>
      <JobList jobs={jobs} />
    </div>
  )
}

export default App
