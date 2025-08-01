import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import CreateJob from './pages/CreateJob.jsx';
import UpdateJob from './pages/UpdateJob.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
// import Navbar from './components/NavBar.jsx';
import GameNavbar from './components/GameNavbar.jsx';

// XP values for each stage
const statusXP = {
  Pending: 10,
  Interview: 25,
  Offer: 50,
  Rejected: 0,
};

// XP per level
const XPPerLevel = 200;

const calculateTotalXP = (jobs) => {
  return jobs.reduce((total, job) => {
    const xpMap = { Pending: 10, Interview: 25, Offer: 50, Rejected: 0 };
    return total + (xpMap[job.status] || 0);
  }, 0);
}

const calculateLevel = (xp) => Math.floor(xp / XPPerLevel) + 1;

const calculateLeftoverXP = (xp, level) => xp - ((level - 1) * XPPerLevel);

function App() {
  const [jobs, setJobs] = useState([])

  const fetchJobs = () => {
    fetch('http://localhost:8000/jobs')
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error('Error fetching backend:', err));
  }

  const totalXP = calculateTotalXP(jobs);
  const level = calculateLevel(totalXP);
  const leftoverXP = calculateLeftoverXP(totalXP, level);
  // console.log(totalXP);
  // console.log(level);
  // console.log(leftoverXP);

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <Router>
      <GameNavbar xp={leftoverXP} level={level} maxXP={XPPerLevel} />
      {/* <Navbar /> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={
          <CreateJob 
            jobs={jobs}
            calculateTotalXP={calculateTotalXP}
            calculateLevel={calculateLevel}
            calculateLeftoverXP={calculateLeftoverXP}
            maxXP={XPPerLevel}
          />
        } />
        <Route path="/update/:id" element={
          <UpdateJob 
            jobs={jobs}
            calculateTotalXP={calculateTotalXP}
            calculateLevel={calculateLevel}
            calculateLeftoverXP={calculateLeftoverXP}
            maxXP={XPPerLevel}
          />
        } />
      </Routes>
    </Router>
  )
}

export default App
