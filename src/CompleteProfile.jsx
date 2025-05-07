import React, { useRef } from 'react';
import axios from 'axios';

const CompleteProfile = () => {
  const nameRef = useRef();
  const photoRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const photoUrl = photoRef.current.value;
    const token = localStorage.getItem('token');

    axios.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBQpct1qT0MDpAT_0gdkHSqA1tRr9oFHgk',
      {
        idToken: token,
        displayName: name,
        photoUrl: photoUrl,
        returnSecureToken: true
      }
    )
    .then((res) => {
      localStorage.setItem('token', res.data.idToken);
      localStorage.setItem('profileComplete', 'true');
      alert("Profile updated successfully!");
    })
    .catch((err) => {
      console.error(err);
      alert("Profile update failed.");
    });
  };

  return (
    <div>
      <h2>Complete Profile</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" ref={nameRef} required /><br />
        <input type="text" placeholder="Profile Photo URL" ref={photoRef} required /><br />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default CompleteProfile;
