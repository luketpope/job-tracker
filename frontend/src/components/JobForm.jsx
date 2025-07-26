// src/components/JobList.jsx

import { useState } from 'react';

const defaultForm = {
  title: '',
  company: '',
  salary: '',
  link: '',
  status: '',
  date_applied: '',
};

export default function JobForm({ onSuccess }) {
  const [formData, setFormData] = useState(defaultForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Job added!');
        setFormData(defaultForm);
        onSuccess();
      } else {
        const error = await response.json();
        alert('Error: ' + error.detail);
      }
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px', maxWidth: '400px', margin: 'auto' }}>
      {Object.keys(defaultForm).map((key) => (
        <input
          key={key}
          name={key}
          type={key === 'salary' ? 'number' : 'text'}
          placeholder={key.replace(/^\w/, (c) => c.toUpperCase()).replace('_', ' ')}
          value={formData[key]}
          onChange={handleChange}
          required
        />
      ))}
      <button type="submit">Add Job</button>
    </form>
  );
}
