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
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '8px 16px',
        // background: '#f9f9f9',
        padding: '1rem',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        marginBottom: '1rem',
        alignItems: 'center',
      }}
    >
      <div style={{ fontWeight: 'bold', fontSize: '1.1rem', gridColumn: '1 / -1' }}>
        {job.title} @ {job.company}
      </div>

      <div style={{ fontWeight: '600' }}>Salary:</div>
      <div>💰 £{job.salary.toLocaleString()}</div>

      <div style={{ fontWeight: '600' }}>Date Applied:</div>
      <div>{job.date_applied}</div>

      <div style={{ fontWeight: '600' }}>Status:</div>
      <div>{job.status}</div>

      <div style={{ fontWeight: '600' }}>Link:</div>
      <div>
        <a href={job.link} target="_blank" rel="noopener noreferrer" style={{ color: '#0077cc' }}>
          View Job
        </a>
      </div>
      <div>
        <button style={{ color: '#0077cc' }} onClick={() => handleDelete(job.id)}>Delete</button>
      </div>
      <div>
        <button onClick={() => navigate(`/update/${job.id}`)}>Update</button>
      </div>
    </div>
  );
}
