import React, { useState } from 'react';
import axios from 'axios';

const VerifyEmail = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleVerifyEmail = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("User not logged in or token missing.");
      return;
    }

    axios.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBQpct1qT0MDpAT_0gdkHSqA1tRr9oFHgk',
      {
        requestType: "VERIFY_EMAIL",
        idToken: token,
      }
    )
    .then((res) => {
      console.log("Email verification sent:", res.data);
      setMessage("Verification email sent. Check your inbox.");
      setError('');
    })
    .catch((err) => {
      console.error(err);
       
    });
  };

  return (
    <div className="p-4 border max-w-md mx-auto mt-10 text-center shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Email Verification</h2>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        onClick={handleVerifyEmail}
      >
        Verify Email
      </button>
      {message && <p className="text-green-600 mt-4">{message}</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
};

export default VerifyEmail;
