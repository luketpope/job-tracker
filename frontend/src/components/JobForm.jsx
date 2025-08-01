const statusOptions = ['Pending', 'Interview', 'Rejected', 'Offer'];

// XP values same as your job card
function getXP(status) {
  switch (status) {
    case 'Pending': return 10;
    case 'Interview': return 25;
    case 'Offer': return 50;
    case 'Rejected': return 0;
    default: return 0;
  }
}

export default function JobForm({ formData, onChange, onSubmit, isEditing = false, setFormData, calculateTotalXP, calculateLevel, calculateLeftoverXP, maxXP, jobs }) {
  const currentXP = getXP(formData.status);
  const totalXP = calculateTotalXP(jobs);
  const newXP = totalXP + currentXP;
  console.log(totalXP + currentXP);
  const level = calculateLevel(newXP);
  const leftoverXP = calculateLeftoverXP(newXP, level);
  const xpPercent = Math.min(100, (leftoverXP / maxXP) * 100);

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-md mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl border-4 border-emerald-400 dark:border-emerald-600"
    >
      {/* XP and Level Display */}
      <div className="mb-6 p-4 rounded-md bg-emerald-50 dark:bg-emerald-900 border border-emerald-300 dark:border-emerald-700 select-none">
        <div className="flex justify-between items-center mb-1 font-mono text-sm text-emerald-700 dark:text-emerald-300 font-semibold">
          <span>XP for status "{formData.status || 'None'}":</span>
          <span>{currentXP} XP</span>
        </div>
        <br/>
        <div className="flex justify-between items-center mb-1 font-mono text-sm text-emerald-700 dark:text-emerald-300 font-semibold">
          Projected XP:
        </div>
        <div className="w-full h-4 bg-emerald-200 dark:bg-emerald-800 rounded-full overflow-hidden border border-emerald-300 dark:border-emerald-700 shadow-inner">
          <div
            className="h-full bg-emerald-400 dark:bg-emerald-500 transition-all duration-500"
            style={{ width: `${xpPercent}%` }}
          />
        </div>
        <div className="mt-2 text-right font-mono font-semibold text-emerald-600 dark:text-emerald-400">
          Level {level}
        </div>
      </div>

      {/* Form Fields */}
      <label className="block mb-4">
        <span className="text-gray-700 dark:text-gray-200 font-medium mb-1 block">Job Title</span>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={onChange}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
          placeholder="Enter job title"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700 dark:text-gray-200 font-medium mb-1 block">Company</span>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={onChange}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
          placeholder="Enter company name"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700 dark:text-gray-200 font-medium mb-1 block">Salary (£)</span>
        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={onChange}
          required
          min="0"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
          placeholder="Enter salary"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700 dark:text-gray-200 font-medium mb-1 block">Job Link</span>
        <input
          type="url"
          name="link"
          value={formData.link}
          onChange={onChange}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
          placeholder="https://example.com/job-posting"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700 dark:text-gray-200 font-medium mb-1 block">Status</span>
        <select
          name="status"
          value={formData.status}
          onChange={onChange}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
        >
          <option value="" disabled hidden>Select status</option>
          {statusOptions.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </label>

      <label className="block mb-6">
        <span className="text-gray-700 dark:text-gray-200 font-medium mb-1 block">Date Applied</span>
        <input
          type="date"
          name="date_applied"
          value={formData.date_applied}
          onChange={onChange}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
        />
      </label>

      <button
        type="submit"
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-md shadow-md transition"
      >
        {isEditing ? 'Save Changes' : 'Add Job'}
      </button>

      <br /><br />

      <button
        type="button"
        onClick={() =>
          setFormData({
            title: 'DevOps',
            company: 'BAE Systems',
            salary: 30000,
            link: 'https://jobsearch.baesystems.com/job/devops-engineer-120493',
            status: 'Interview',
            date_applied: new Date().toISOString().split('T')[0],
          })
        }
        className="w-full bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-black dark:text-white font-semibold py-2 rounded-md transition"
      >
        Fill with Dummy Data
      </button>
    </form>
  );
}
