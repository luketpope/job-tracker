import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

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
        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
          isDark ? 'translate-x-6' : ''
        }`}></div>
      </div>
    </label>
  );
}
