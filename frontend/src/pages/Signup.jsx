import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateUsername = (username) => {
    const errors = [];
    if (username.length < 3) errors.push("Username must be at least 3 characters");
    if (username.length > 20) errors.push("Username cannot exceed 20 characters");
    if (!/^[a-zA-Z0-9_]+$/.test(username)) errors.push("Username can only contain letters, numbers, and underscores");
    return errors;
  };

  const validatePassword = (password) => { 
    const errors = []; 
    if (password.length < 8) errors.push("Password must be at least 8 characters"); 
    if (!/[A-Z]/.test(password)) errors.push("Password must include an uppercase letter"); 
    if (!/[0-9]/.test(password)) errors.push("Password must include a number"); 
    if (!/[!@#$%^&*]/.test(password)) errors.push("Password must include a special character"); 
    return errors; 
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const usernameErrors = validateUsername(username);
    const passwordErrors = validatePassword(password);

    const allErrors = [...usernameErrors, ...passwordErrors];

    if (allErrors.length > 0) {
      setErrorMsg(allErrors);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      setLoading(false);

      if (!res.ok) {
        const err = await res.json();
        // FastAPI sends detail as an array of errors for validation issues
        setErrorMsg(Array.isArray(err.detail) ? err.detail : [err.detail]);
        return { success: false };
      }

      navigate('/login');
    } catch (err) {
      console.error(err);
      setErrorMsg("Server error. Please try again later.");
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
          onChange={(e) => {
            setUsername(e.target.value);
            setErrorMsg(""); // Clear previous error messages when user types
          }}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMsg("");
          }}
        />
        {errorMsg.length > 0 && (
          <div className="text-red-600 dark:text-red-400 text-sm mb-4 animate-fade-shake">
            {errorMsg.map((msg, i) => (
              <p key={i} className="mb-1">
                {msg}
              </p>
            ))}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-md transition"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
