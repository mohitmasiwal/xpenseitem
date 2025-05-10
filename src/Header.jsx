 import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from './storeredux/Auth';
import { toggleTheme } from './storeredux/Theme';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const isLoggedIn = useSelector((state) => state.auth.login);
  const isProfileComplete = useSelector((state) => state.auth.isProfileComplete);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const onpremium = useSelector((state) => state.auth.premium);
  
  console.log( "ckmnnd ",isProfileComplete,"hhh");
  
  const handleSelect = (e) => {
    const value = e.target.value;
    if (value === 'verify') {
      navigate('/verifyemail');
    } else if (value === 'logout') {
      dispatch(logout());
      localStorage.removeItem('token');
      localStorage.removeItem('uid');
      localStorage.removeItem('profileComplete');
      navigate('/login');
    }
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <header className="py-5 px-6 shadow-md bg-gradient-to-r from-black via-red-800 to-black text-white relative z-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-wide uppercase text-yellow-300 drop-shadow-lg">
          Xpense tracker
        </h1>

        <nav className="flex items-center gap-6">
          <ul className="flex flex-wrap gap-5 items-center text-sm font-medium">
            <li><Link to="/" className="hover:underline hover:text-yellow-300 transition">Home</Link></li>
            
            {isLoggedIn && !isProfileComplete && (
              <li>
                <Link
                  to="/complete-profile"
                  className="text-red-300 underline hover:text-yellow-300 font-semibold transition"
                >
                  Complete Profile
                </Link>
              </li>
            )}
   
            {isLoggedIn && (
              <li>
                <select
                  defaultValue="default"
                  onChange={handleSelect}
                  className="bg-gray-100 text-black px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  <option value="default" disabled>Profile</option>
                  <option value="verify">Verify Email</option>
                  <option value="logout">Logout</option>
                </select>
              </li>
            )}

            {!isLoggedIn && (
              <li>
                <Link to="/login" className="hover:underline hover:text-yellow-300 transition">
                  Login
                </Link>
              </li>
            )}

            <li>{ onpremium && (
              <button
                onClick={handleToggleTheme}
                className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
