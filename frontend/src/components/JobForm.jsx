// src/components/JobForm.jsx

const statusOptions = ['Pending', 'Interview', 'Rejected', 'Offer'];

export default function JobForm({ formData, onChange, onSubmit, isEditing = false, setFormData }) {
  
  return (
    <form 
      onSubmit={onSubmit} 
      className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
    >
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
