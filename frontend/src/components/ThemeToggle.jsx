import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  // Initialize state from localStorage or fallback to current document class
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) return saved === 'true';
    }
    // fallback: check if 'dark' class is on document element
    return document.documentElement.classList.contains('dark');
  });

  // Whenever isDark changes, update <html> class and localStorage
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input 
          type="checkbox"
          checked={isDark}
          onChange={toggleTheme}
          className="sr-only"
        />
        <div
          className={`block w-14 h-8 rounded-full transition-colors duration-300 ${
            isDark ? 'bg-gray-900' : 'bg-gray-50'
          }`}
        ></div>
        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ${
          isDark ? 'translate-x-6' : ''
        }`}></div>
      </div>
    </label>
  );
}
