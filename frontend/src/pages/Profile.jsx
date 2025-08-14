// src/pages/Profile.jsx
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Profile({ token, jobs, xp = 120, level = 5, maxXP = 200 }) {
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [profileURL, setProfileURL] = useState(null);
  const navigate = useNavigate();

  // User info
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("http://localhost:8000/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.profile_picture) {
        setProfileURL(`http://localhost:8000/profile-pictures/${data.profile_picture}`);
      }
      if (data.username) setUsername(data.username);
      if (data.email) setEmail(data.email);
    };
    fetchProfile();
  }, [token]);

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
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (response.ok) {
      alert("Profile picture uploaded!");
      setProfileURL(previewURL);
      setFile(null);
      setPreviewURL(null);
      navigate(0);
    } else {
      alert("Upload failed");
    }
  };

  const handleUpdateUsername = async () => {
    const response = await fetch("http://localhost:8000/me/change-username", {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    if (response.ok) {
      alert("Profile updated!");
    } else {
      alert("Update failed");
    }
  };

  const handleChangePassword = async () => {
    if (!password || !newPassword) {
      alert("Please fill in both fields");
      return;
    }

    const response = await fetch("http://localhost:8000/me/change-password", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ old_password: password, new_password: newPassword }),
    });

    if (response.ok) {
      alert("Password changed successfully!");
      setPassword("");
      setNewPassword("");
    } else {
      alert("Password change failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-xl shadow-md space-y-6">
      <h1 className="text-2xl font-bold text-center">Your Profile</h1>

      {/* Current profile picture */}
      <div className="flex justify-center">
        <img
          src={profileURL || "/background.png"}
          alt="Current Profile"
          className="h-28 w-28 rounded-full border-2 border-emerald-600 dark:border-emerald-400 object-cover"
        />
      </div>

      {/* Drag-and-drop / file input */}
      <div className="flex flex-col items-center">
        <label
          htmlFor="fileInput"
          className="w-full flex flex-col items-center px-4 py-6 bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {previewURL ? (
            <img src={previewURL} alt="Preview" className="h-28 w-28 rounded-full mb-2 object-cover" />
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Drag & drop an image here or click to select
            </p>
          )}
          <input id="fileInput" type="file" accept="image/*" className="hidden" onChange={handleChange} />
        </label>

        {file && (
          <button
            onClick={handleUpload}
            className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-700 dark:bg-emerald-400 dark:text-gray-900 dark:hover:bg-emerald-500 transition"
          >
            Upload
          </button>
        )}
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold text-center">Level {level}</h2>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mt-2">
          <div
            className="bg-emerald-500 h-4 rounded-full transition-all"
            style={{
              width: `${((xp || 0) / (maxXP || 1000)) * 100}%`,
            }}
          />
        </div>

        <p className="text-sm text-center mt-1 text-gray-600 dark:text-gray-300">
          {xp} / {maxXP} XP
        </p>
      </div>

      {/* Update username */}
      <div className="space-y-4 mt-4">
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <button
          onClick={handleUpdateUsername}
          className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 dark:bg-emerald-400 dark:text-gray-900 dark:hover:bg-emerald-500 transition"
        >
          Update Username
        </button>
      </div>

      {/* Change password */}
      <div className="space-y-4 mt-6">
        <h2 className="text-lg font-bold">Change Password</h2>
        <div>
          <label className="block text-sm font-medium mb-1">Current Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <button
          onClick={handleChangePassword}
          className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 dark:bg-emerald-400 dark:text-gray-900 dark:hover:bg-emerald-500 transition"
        >
          Change Password
        </button>
      </div>
    </div>
  );
}
