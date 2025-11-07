import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';                                                  
import { useNavigate } from 'react-router-dom';
import{ BASE_URL } from '../utils/constants';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('khushi.yadav@wes.co.in');
  const [password, setPassword] = useState('Khushi@123');
  const [error, setError] = useState('');
   const dispatch = useDispatch();
   const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault(); // prevents page refresh
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      //console.log("Axios response.data:", res.data);
      dispatch(addUser(res.data));
      return navigate("/feed");
    } catch (err) {
      setError(err.res?.data?.message || 'Login failed. Please try again.');
      console.error(err.res || err.message);
    }
  }; 

  return (
    <div className="flex min-h-screen">
      {/* LEFT SIDE: Image + Overlay */}
      <div className="hidden md:flex w-1/2 relative">
        {/* Background Image */}
        <img
          src="src/assets/profiledev.png" // <-- replace with your image path
          alt="DevTinder"
          className="w-full h-full object-cover"
        />

        {/* Overlay content */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-10">
          <h1 className="text-5xl font-bold mb-4">DevTinder </h1>
          <p className="text-lg max-w-md opacity-90">
            Find, connect, and collaborate with talented developers around the world.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Login Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-base-200">
        <div className="card bg-neutral text-neutral-content w-96 shadow-2xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-3xl mb-4 text-white">Login</h2>

            <form className="w-full" onSubmit={handleLogin}>
              <input
                type="email"
                value={email}
                placeholder="Email"
                className="input input-bordered w-full mb-3 text-white"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                value={password}
                placeholder="Password"
                className="input input-bordered w-full mb-4 text-white"
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {error && (
                <p className="text-red-400 text-sm text-left w-full mb-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="btn btn-primary w-full mb-2 hover:bg-indigo-700"
              >
                Login
              </button>
            </form>

            <div className="flex justify-between w-full mt-2 text-sm">
              <button
                className="text-blue-400 hover:underline"
                onClick={() => navigate("/signup")}
              >
                Don’t have an account? Sign up
              </button>

              {/* <button
                className="text-gray-400 hover:underline"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;