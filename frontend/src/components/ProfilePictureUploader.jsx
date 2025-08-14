// src/components/ProfilePictureUploader.jsx

import { useState } from "react";

function ProfilePictureUploader({ token }) {
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handleChange = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreviewURL(URL.createObjectURL(image));
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:8000/me/profile-picture", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      alert("Profile picture uploaded!");
    } else {
      alert("Upload failed");
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleChange} />
      {previewURL && <img src={previewURL} alt="Preview" className="h-24 w-24 rounded-full" />}
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
