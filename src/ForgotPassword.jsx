import React, { useRef, useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const emailRef = useRef();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    setLoading(true);
    setMessage("");

    try {
      await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBQpct1qT0MDpAT_0gdkHSqA1tRr9oFHgk',
        {
          requestType: 'PASSWORD_RESET',
          email: email,
        }
      );
      setMessage("Password reset email sent! Check your inbox.");
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>
      <form onSubmit={handleResetPassword} className="flex flex-col gap-4 w-80">
        <input
          type="email"
          placeholder="Enter your email"
          ref={emailRef}
          required
          className="border px-4 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Sending reset link...' : 'Send Reset Link'}
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
