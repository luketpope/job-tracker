import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Signup failed");
      }

      alert("Signup successful! Please log in.");
      navigate('/login')
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-emerald-600 dark:text-emerald-400">
        Sign Up
      </h2>
      <form onSubmit={handleSignup} className="flex flex-col gap-4 max-w-sm mx-auto">
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-4 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMsg && <p className="text-red-500 text-sm mb-4">{errorMsg}</p>}
        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-md transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
