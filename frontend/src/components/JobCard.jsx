// src/components/JobCard.jsx
import { useParams, useNavigate } from 'react-router-dom';


export default function JobCard({ job }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;

    const response = await fetch(`http://localhost:8000/jobs/${id}`, {
      method: 'DELETE',
    });

    if (response.status === 204) {
      navigate(0);
    } else {
      const error = await response.json();
      alert('Failed to delete job: ' + (error.detail || 'Unknown error'));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md pb-1 mb-6 max-w-xl mx-auto hover:shadow-lg transition-shadow duration-300">
      <div className="text-2xl font-semibold text-emerald-700 mb-2 bg-gray-200 p-2 rounded">
        {job.title} @ {job.company}
      </div>

      <div className="text-gray-600 mb-4">
        <p><span className="font-semibold">Salary:</span> £{job.salary.toLocaleString()}</p>
        <p><span className="font-semibold">Date Applied:</span> {job.date_applied}</p>
        <p><span className="font-semibold">Status:</span> 
          <span 
            className={`ml-2 px-2 py-1 rounded-full text-sm font-semibold ${
              job.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
              job.status === 'Interview' ? 'bg-blue-100 text-blue-800' :
              job.status === 'Offer' ? 'bg-green-100 text-green-800' :
              'bg-red-100 text-red-800'
            }`}
          >
        {job.status}
      </span>
    </p>
        <div>
          <a href={job.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-emerald-600 hover:text-emerald-800 underline font-medium"
          >
            View Job
          </a>
        </div>
        <button 
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition" 
          onClick={() => handleDelete(job.id)}>
            Delete
        </button>
        <button 
          className="bg-emerald-600 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg transition" 
          onClick={() => navigate(`/update/${job.id}`)}>
            Update
        </button>
      </div>
    </div>
  );
}
