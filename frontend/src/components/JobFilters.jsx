// src/components/JobFilters.jsx

export default function JobFilters({ filters, setFilters }) {
  const handleChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="py-4 flex flex-wrap gap-4 mb-4 justify-center bg-emerald-50 dark:bg-gray-800 rounded-xl shadow-inner max-w-4xl mx-auto px-4">
      <h2 className="w-full text-center text-lg font-bold text-emerald-700 dark:text-emerald-300 mb-2">
        Search for Quests
      </h2>

      <input
        type="text"
        name="company"
        placeholder="Filter by Company"
        value={filters.company}
        onChange={handleChange}
        className="px-4 py-2 border border-emerald-300 dark:border-emerald-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white
                  focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition w-64 shadow-sm"
      />

      <select
        name="status"
        value={filters.status}
        onChange={handleChange}
        className="px-4 py-2 border border-emerald-300 dark:border-emerald-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white
                  focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition w-52 shadow-sm"
      >
        <option value="">All Quest Statuses</option>
        <option value="Pending">Awaiting Fate (Pending)</option>
        <option value="Interview">Trial of Wisdom (Interview)</option>
        <option value="Offer">Treasure Secured (Offer)</option>
        <option value="Rejected">Quest Failed (Rejected)</option>
      </select>

      <button
        onClick={() => setFilters({ status: '', company: '' })}
        className="text-sm px-3 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-800 dark:text-blue-300 dark:hover:bg-blue-700 rounded-md transition font-medium shadow-sm"
      >
        🔄 Reset Search
      </button>
    </div>
  );

}
