// src/components/JobForm.jsx

const statusOptions = ['Pending', 'Interview', 'Rejected', 'Offer'];

export default function JobForm({ formData, onChange, onSubmit, isEditing = false, setFormData }) {
  
  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: '15px', maxWidth: '400px', margin: 'auto' }}>
      <input
        name="title"
        type="text"
        placeholder="Job Title"
        value={formData.title}
        onChange={onChange}
        required
      />
      <input
        name="company"
        type="text"
        placeholder="Company"
        value={formData.company}
        onChange={onChange}
        required
      />
      <input
        name="salary"
        type="number"
        placeholder="Salary"
        value={formData.salary}
        onChange={onChange}
        required
      />
      <input
        name="link"
        type="url"
        placeholder="Job Link"
        value={formData.link}
        onChange={onChange}
        required
      />
      <select
        name="status"
        value={formData.status}
        onChange={onChange}
        required
      >
        {statusOptions.map((status) => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>
      <input
        name="date_applied"
        type="date"
        placeholder="Date Applied"
        value={formData.date_applied}
        onChange={onChange}
        required
      />
      <button type="submit">{isEditing ? 'Save Changes' : 'Add Job'}</button>
      <button
        type="button"
        onClick={() =>
          setFormData({
            title: 'Frontend Developer',
            company: 'OpenAI',
            salary: 65000,
            link: 'https://careers.openai.com',
            status: 'Interview',
            date_applied: new Date().toISOString().split('T')[0], // Today's date
          })
        }
      >
        Fill with Dummy Data
      </button>
    </form>
  );
}
