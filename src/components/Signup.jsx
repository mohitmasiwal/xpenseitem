import React, { useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
 

  const handleSignup = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const signupData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    axios
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBQpct1qT0MDpAT_0gdkHSqA1tRr9oFHgk',
        signupData
      )
      .then((res) => {
        console.log("Signup successful:", "token", res.data.idToken);
       
        
        alert("Signup successful!");
         
      })
      .catch((err) => {
        console.error("Signup failed:", err);
        alert("Signup failed!");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form onSubmit={handleSignup} className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Signup</h2>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            ref={emailRef}
            required
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            ref={passwordRef}
            required
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Signup
        </button>

        <p className="text-sm text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
        <p className="text-sm text-center">
          reset pass?{' '}
          <Link to="/forgot" className="text-blue-600 hover:underline">
            now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
