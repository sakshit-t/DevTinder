import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/reset-password/${token}`, {
        password,
      });
      setMessage(res.data.message);
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Error resetting password.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card bg-neutral text-neutral-content w-96">
        <div className="card-body text-center">
          <h2 className="card-title text-2xl mb-4">Reset Password</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="New password"
              className="input input-bordered w-full mb-3 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm password"
              className="input input-bordered w-full mb-4 text-black"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button className="btn btn-primary w-full">Reset Password</button>
          </form>

          {message && <p className="text-green-400 mt-3">{message}</p>}
          {error && <p className="text-red-400 mt-3">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
