// src/pages/CreateJob.jsx

import JobForm from '../components/JobForm';
import { useNavigate } from 'react-router-dom';

export default function CreateJob() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/'); // Redirect to home after successful submission
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Create Job</h1>
      <JobForm onSuccess={handleSuccess} />
    </div>
  );
}
