import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import CreateJob from './pages/CreateJob.jsx';
import UpdateJob from './pages/UpdateJob.jsx';

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
    <Router>
      <nav style={{
        position: 'sticky', // or 'fixed' if you want it always visible
        top: 0,
        width: '100%',
        // background: '#eee',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        zIndex: 1000,
      }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/create">Create Job</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateJob />} />
        <Route path="/update/:id" element={<UpdateJob />} />
      </Routes>
    </Router>
  )
}

export default App
