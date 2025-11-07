import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post(`${BASE_URL}/forgot-password`, { email });
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Error sending reset link.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card bg-neutral text-neutral-content w-96">
        <div className="card-body text-center">
          <h2 className="card-title text-2xl mb-4">Forgot Password</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full mb-4 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="btn btn-primary w-full">Send Reset Link</button>
          </form>

          {message && <p className="text-green-400 mt-3">{message}</p>}
          {error && <p className="text-red-400 mt-3">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
