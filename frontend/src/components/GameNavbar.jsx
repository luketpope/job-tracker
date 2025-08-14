import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useEffect, useState } from "react";

export default function GameNavbar({ xp = 120, level = 5, maxXP = 200 }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const xpPercent = Math.min(100, (xp / maxXP) * 100);

  const [profilePic, setProfilePic] = useState(null);
  const defaultPic = "/background.png"; // Default image
  
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:8000/me", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        if (data.profile_picture) {
          console.log(data.profile_picture)
          setProfilePic(`http://localhost:8000/profile-pictures/${data.profile_picture}`);
        } else {
          setProfilePic(null); // No picture set
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.reload();
    navigate('/login');
  }

  return (
    <nav className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 shadow-lg border-b-4
      bg-white border-emerald-600
      dark:bg-gradient-to-r dark:from-emerald-900 dark:to-emerald-700 dark:border-emerald-500
    ">
      {/* Title + Level */}
      <div className="flex items-center gap-3 min-w-[150px]">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide font-mono text-emerald-700 dark:text-emerald-400">
          JobTracker
        </h1>
        {isLoggedIn && (
          <div className="px-2 py-1 rounded-md font-mono text-sm bg-emerald-600 text-white dark:text-gray-100">
            Lv. {level}
          </div>
        )}
      </div>

      {/* Center Nav Links */}
      <div className="flex flex-wrap justify-center gap-4 font-mono text-base sm:text-lg">
        {isLoggedIn
          ? ['Dashboard', 'Create Job'].map((text) => (
              <Link
                key={text}
                to={text === 'Dashboard' ? '/' : '/create'}
                className="relative text-emerald-700 hover:text-emerald-900 transition-all duration-300
                  after:absolute after:-bottom-1 after:left-0 after:h-1 after:w-full after:origin-bottom-left
                  after:transition-transform after:scale-x-0 after:bg-emerald-600
                  hover:after:scale-x-100
                  dark:text-emerald-300 dark:hover:text-emerald-50 dark:after:bg-emerald-400"
              >
                {text}
              </Link>
            ))
          : ['Login', 'Signup'].map((text) => (
              <Link
                key={text}
                to={text.toLowerCase()}
                className="relative text-emerald-700 hover:text-emerald-900 transition-all duration-300
                  after:absolute after:-bottom-1 after:left-0 after:h-1 after:w-full after:origin-bottom-left
                  after:transition-transform after:scale-x-0 after:bg-emerald-600
                  hover:after:scale-x-100
                  dark:text-emerald-300 dark:hover:text-emerald-50 dark:after:bg-emerald-400"
              >
                {text}
              </Link>
            ))}
      </div>

      {/* Right Side: Profile, XP, Theme, Logout */}
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
        {isLoggedIn && (
          <>
            {/* XP Line */}
            <div className="flex flex-col items-end text-right">
              <span className="text-xs font-mono text-emerald-700 dark:text-emerald-200">
                XP: {xp} / {maxXP}
              </span>
              {/* <div className="w-28 h-2 rounded-full overflow-hidden border-2 bg-emerald-100 border-emerald-600 dark:bg-emerald-900 dark:border-emerald-500">
                <div className="h-full bg-emerald-600 dark:bg-emerald-400 transition-all duration-500" style={{ width: `${xpPercent}%` }} />
              </div> */}
            </div>

            {/* Profile Image */}
            <Link to="/profile" className="relative inline-block w-12 h-12">
            {/* Background Circle */}
            <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="16"
                stroke="#ddd"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="18"
                cy="18"
                r="16"
                stroke="#10B981" // Emerald
                strokeWidth="4"
                fill="none"
                strokeDasharray="100"
                strokeDashoffset={100 - (xp / maxXP) * 100}
                strokeLinecap="round"
                transform="rotate(-90 18 18)"
              />
            </svg>

            {/* Profile Image */}
            <img
              src={profilePic || defaultPic}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover border-2 border-transparent"
            />
          </Link>
          </>
        )}

        <ThemeToggle />

        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md transition dark:bg-red-600 dark:hover:bg-red-700"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
