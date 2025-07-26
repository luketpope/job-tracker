// src/components/JobCard.jsx
export default function JobCard({ job }) {
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
    </div>
  );
}
