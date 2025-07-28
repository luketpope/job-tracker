const updateJob = async (id, updatedJob) => {
  try {
    const response = await fetch(`http://localhost:8000/jobs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedJob),
    });

    if (response.ok) {
      fetchJobs();
    } else {
      const error = await response.json();
      alert('Update error: ' + error.detail);
    }
  } catch (err) {
    console.error('Update failed:', err);
  }
};
