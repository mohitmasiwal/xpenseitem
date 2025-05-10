 import React, { useRef } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const CompleteProfile = () => {
  const nameRef = useRef();
  const photoRef = useRef();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const photoUrl = photoRef.current.value;
    const token = localStorage.getItem('token');

    axios
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBQpct1qT0MDpAT_0gdkHSqA1tRr9oFHgk',
        {
          idToken: token,
          displayName: name,
          photoUrl: photoUrl,
          returnSecureToken: true,
        }
      )
      .then((res) => {
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('profileComplete', 'true');
        alert('Profile updated successfully!');
        dispatch(profilecomplete());
      })
      .catch((err) => {
        console.error(err);
        alert('Profile update failed.');
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Complete Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-semibold text-gray-600">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              ref={nameRef}
              required
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="photoUrl" className="text-sm font-semibold text-gray-600">Profile Photo URL</label>
            <input
              type="text"
              placeholder="Enter your profile photo URL"
              ref={photoRef}
              required
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
