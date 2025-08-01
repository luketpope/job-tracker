// src/components/JobFilters.jsx

export default function JobFilters({ filters, setFilters }) {
  const handleChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="py-2 flex flex-wrap gap-4 mb-1 justify-center">
      <input
        type="text"
        name="company"
        placeholder="Filter by company"
        value={filters.company}
        onChange={handleChange}
        className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 
                  focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition
                  dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />

      <select
        name="status"
        value={filters.status}
        onChange={handleChange}
        className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 
                  focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition
                  dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option value="">All Statuses</option>
        <option value="Pending">Pending</option>
        <option value="Interview">Interview</option>
        <option value="Rejected">Rejected</option>
        <option value="Offer">Offer</option>
      </select>

      <button
        onClick={() => setFilters({ status: '', company: '' })}
        className="text-sm text-blue-600 hover:underline dark:text-blue-400"
      >
        Reset Filters
      </button>
    </div>
  );

}
