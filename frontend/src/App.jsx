import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import CreateJob from './pages/CreateJob.jsx';
import UpdateJob from './pages/UpdateJob.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
// import Navbar from './components/NavBar.jsx';
import GameNavbar from './components/GameNavbar.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';

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
  const [jobs, setJobs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [totalXP, setTotalXP] = useState(0);

  const fetchJobs = () => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8000/jobs', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => setJobs(data))
      .catch(err => console.error('Error fetching jobs:', err));
  };

  const fetchUserXP = async () => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8000/me/xp', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => setTotalXP(data.xp))
      .catch(err => console.error('Error fetching xp:', err))
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    fetchJobs();
    fetchUserXP();
  }, [isLoggedIn]);

  const level = calculateLevel(totalXP);
  const leftoverXP = calculateLeftoverXP(totalXP, level);
  // console.log(totalXP);
  // console.log(level);
  // console.log(leftoverXP);

  return (
    <Router>

      <GameNavbar xp={leftoverXP} level={level} maxXP={XPPerLevel} />
      {/* <Navbar /> */}

      <Routes>
        {isLoggedIn ? (
          <>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={
            <CreateJob 
              jobs={jobs}
              totalXP={totalXP}
              calculateLevel={calculateLevel}
              calculateLeftoverXP={calculateLeftoverXP}
              maxXP={XPPerLevel}
            />
          } />
          <Route path="/update/:id" element={
            <UpdateJob 
              jobs={jobs}
              totalXP={totalXP}
              calculateLevel={calculateLevel}
              calculateLeftoverXP={calculateLeftoverXP}
              maxXP={XPPerLevel}
            />
          } />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Login />} />
          </>
        )}
        {/* <Route path="/" element={<Home />} />
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
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} /> */}
      </Routes>
    </Router>
  )
}

export default App
