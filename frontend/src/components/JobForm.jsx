// src/components/JobList.jsx

import { useState } from 'react';

const defaultForm = {
  title: '',
  company: '',
  salary: '',
  link: '',
  status: 'Pending',
  date_applied: '',
};

const statusOptions = ['Pending', 'Interview', 'Rejected', 'Offer'];

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
      <input
        name="title"
        type="text"
        placeholder="Job Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <input
        name="company"
        type="text"
        placeholder="Company"
        value={formData.company}
        onChange={handleChange}
        required
      />
      <input
        name="salary"
        type="number"
        placeholder="Salary"
        value={formData.salary}
        onChange={handleChange}
        required
      />
      <input
        name="link"
        type="url"
        placeholder="Job Link"
        value={formData.link}
        onChange={handleChange}
        required
      />
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        required
      >
        {statusOptions.map((status) => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>
      <input
        name="date_applied"
        type="date"
        value={formData.date_applied}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Job</button>
    </form>
  );
}
