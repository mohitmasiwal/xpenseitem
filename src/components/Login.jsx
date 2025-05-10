 import React, { useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../storeredux/Auth';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    const loginData = {
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    };

    axios
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBQpct1qT0MDpAT_0gdkHSqA1tRr9oFHgk',
        loginData
      )
      .then((res) => {
        console.log(res.data.localId);
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('uid', res.data.localId);
        dispatch(login({ token: res.data.idToken, isProfileComplete: false }));

        navigate('/');
        alert('Login successful!');
      })
      .catch((err) => {
        console.error(err);
        alert('Login failed! Please check your email or password.');
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form onSubmit={handleLogin} className="w-full max-w-sm p-8 bg-white rounded-lg shadow-xl space-y-6">
        <h2 className="text-3xl font-bold text-center text-blue-600">Login</h2>

        {/* Email Input */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            ref={emailRef}
            required
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="Enter your email"
          />
        </div>

        {/* Password Input */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            ref={passwordRef}
            required
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="Enter your password"
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300"
        >
          Login
        </button>

        {/* Sign Up Link */}
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
