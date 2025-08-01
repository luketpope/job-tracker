import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function GameNavbar({ xp = 120, level = 5, maxXP = 200 }) {
  const xpPercent = Math.min(100, (xp / maxXP) * 100);

  return (
    <nav className="shadow-lg px-6 py-4 flex justify-between items-center border-b-4
      bg-white border-emerald-600
      dark:bg-gradient-to-r dark:from-emerald-900 dark:to-emerald-700 dark:border-emerald-500
    ">
      {/* Left side: Title + Player Level Badge */}
      <div className="flex items-center gap-3 select-none">
        <h1 className="text-3xl font-extrabold tracking-wide font-mono drop-shadow-sm
          text-emerald-700
          dark:text-emerald-400
        ">
          JobTracker
        </h1>
        <div className="px-2 py-1 rounded-md font-mono text-sm drop-shadow-md select-none
          bg-emerald-600 text-white
          dark:bg-emerald-600 dark:text-gray-100
        ">
          Lv. {level}
        </div>
      </div>

      {/* Middle: Nav Links */}
      <div className="flex gap-6 font-mono text-lg">
        {['Dashboard', 'Create Job'].map((text) => (
          <Link
            key={text}
            to={text === 'Home' ? '/' : '/create'}
            className="relative text-emerald-700 hover:text-emerald-900 transition-all duration-300
              after:absolute after:-bottom-1 after:left-0 after:h-1 after:w-full after:origin-bottom-left
              after:transition-transform after:scale-x-0 after:bg-emerald-600
              hover:after:scale-x-100
              dark:text-emerald-300 dark:hover:text-emerald-50 dark:after:bg-emerald-400
            "
          >
            {text}
          </Link>
        ))}
      </div>

      {/* Right side: XP bar + Theme Toggle */}
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-end mr-4 select-none">
          <span className="text-xs font-mono tracking-wide
            text-emerald-700
            dark:text-emerald-200
          ">
            XP: {xp} / {maxXP}
          </span>
          <div className="w-32 h-3 rounded-full overflow-hidden border-2 shadow-inner
            bg-emerald-100 border-emerald-600
            dark:bg-emerald-900 dark:border-emerald-500
          ">
            <div
              className="h-full transition-all duration-500
                bg-emerald-600
                dark:bg-emerald-400
              "
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </div>

        <ThemeToggle />
      </div>
    </nav>
  );
}
