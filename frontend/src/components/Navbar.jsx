import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
    <nav className="bg-white dark:bg-gray-800 shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">JobTracker</h1>
      <div className="flex gap-4 items-center">
        <Link
        to="/"
        className="text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
        >
        Home
        </Link>
        <Link
        to="/create"
        className="text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
        >
        Create Job
        </Link>
        <ThemeToggle />
      </div>
    </nav>
}