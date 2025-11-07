import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    age: "",
    about: "",
    skill: "",
  });
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => form.append(key, value));
      if (photo) form.append("photo", photo);

      await axios.post(BASE_URL+"/signup", form, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/login");
    } catch (err) {
  const backendMessage = err.response?.data?.message;

  if (backendMessage) {
    // Show the backend error directly if available
    setError(backendMessage);
  } else if (err.response?.status === 400) {
    // Generic fallback if no specific message
    setError("All fields are required. Please fill in valid details.");
  } else {
    // Handle any other unknown or network error
    setError("Signup failed. Please try again.");
  }
}
finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card bg-neutral text-neutral-content w-96 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl mb-2">Signup</h2>

          {/* Photo Upload */}
          <label htmlFor="photo-upload" className="cursor-pointer mb-3">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={
                    preview ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="Profile Preview"
                />
              </div>
            </div>
          </label>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
      

          <p className="text-xs text-gray-400 mb-3">
            Click image to upload photo
          </p>

          {/* Form Fields */}
          <div className="flex gap-2 w-full">
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="input input-bordered w-1/2"
              required
            />
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="input input-bordered w-1/2"
              required
            />
          </div>

          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
            className="input input-bordered w-full mt-2"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
            className="input input-bordered w-full mt-2"
            required
          />

          <div className="flex gap-2 w-full mt-2">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="select select-bordered w-1/2"
              required
            >
              <option value="male">Male</option>
             <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input
              type="number"
              name="age"
              value={formData.age}
              placeholder="Age"
              onChange={handleChange}
              className="input input-bordered w-1/2"
              required
            />
          </div>

          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            placeholder="About you"
            className="textarea textarea-bordered w-full mt-2"
            rows={2}
          />

          <input
            name="skill"
            value={formData.skill}
            onChange={handleChange}
            placeholder="Skills (e.g. React, Node)"
            className="input input-bordered w-full mt-2"
          />

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="card-actions w-full mt-4">
            <button
              className="btn btn-primary w-full"
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Signup"}
            </button>
          </div>

          <p className="text-sm mt-2 text-gray-400">
            Already have an account?{" "}
            <span
              className="text-blue-400 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
