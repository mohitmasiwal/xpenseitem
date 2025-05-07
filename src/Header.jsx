import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from './storeredux/Auth';
import { toggleTheme } from './storeredux/Theme';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const isLoggedIn = useSelector((state) => state.auth.login);
  const isProfileComplete = useSelector((state) => state.auth.isProfileComplete);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const handleSelect = (e) => {
    const value = e.target.value;
    if (value === 'verify') {
      navigate('/verifyemail');
    } else if (value === 'logout') {
      dispatch(logout());
      localStorage.removeItem('token');
      localStorage.removeItem('profileComplete');
      navigate('/login');
    }
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  

  return (
    <header className="py-5 px-6 shadow-md bg-gradient-to-r from-black via-red-800 to-black text-white relative">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-wide uppercase text-yellow-300 drop-shadow">
         Xpense tracker
        </h1>

        <nav className="flex items-center gap-6">
          <ul className="flex flex-wrap gap-5 items-center text-sm font-medium">
            <li><Link to="/" className="hover:underline hover:text-yellow-300">Home</Link></li>
            <li><Link to="/about" className="hover:underline hover:text-yellow-300">About</Link></li>
            <li><Link to="/shopping" className="hover:underline hover:text-yellow-300">Shop</Link></li>
            

            {isLoggedIn && !isProfileComplete && (
              <li>
                <Link
                  to="/complete-profile"
                  className="text-red-300 underline hover:text-yellow-300 font-semibold"
                >
                  Complete Profile
                </Link>
              </li>
            )}

            {isLoggedIn && isProfileComplete && (
              <li>
                <select
                  defaultValue="default"
                  onChange={handleSelect}
                  className="bg-gray-100 text-black px-2 py-1 rounded shadow-sm"
                >
                  <option value="default" disabled>Profile</option>
                  <option value="verify">Verify Email</option>
                  <option value="logout">Logout</option>
                </select>
              </li>
            )}

            {!isLoggedIn && (
              <li>
                <Link to="/login" className="hover:underline hover:text-yellow-300">Login</Link>
              </li>
            )}

            <li>
              <button
                onClick={handleToggleTheme}
                className="bg-white text-black px-3 py-1 rounded hover:bg-gray-300 transition"
              >
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </li>
 
          </ul>
        </nav>
      </div>

      {/* Chat Box */}
      {showChat && (
        <div className="absolute right-6 top-24 w-72 bg-white text-black shadow-lg rounded p-3 z-50">
          <div className="h-60 overflow-y-auto mb-3 border-b border-gray-300 pb-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 ${msg.from === 'user' ? 'text-right' : 'text-left text-blue-600'}`}
              >
                <div className="inline-block px-3 py-1 rounded bg-gray-100">{msg.text}</div>
              </div>
            ))}
          </div>
         
        </div>
      )}
    </header>
  );
};

export default Header;
