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
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-emerald-600">JobTracker</h1>
        <Link to="/" className="text-gray-700 hover:text-emerald-600 transition">Home</Link>
        <Link to="/create" className="text-gray-700 hover:text-emerald-600 transition">Create Job</Link>
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
