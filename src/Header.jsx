 import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout, profilecomplete } from './storeredux/Auth';
import { toggleTheme } from './storeredux/Theme';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.login);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const onpremium = useSelector((state) => state.auth.premium);

  useEffect(() => {
    const email = localStorage.getItem('currentUserEmail');
    const complete = localStorage.getItem(`${email}isProfileComplete`) === 'true';
    const darkStored = localStorage.getItem('dark') === 'true';

    if (complete) {
      dispatch(profilecomplete());
    }

    if (darkStored && !isDarkMode) {
      dispatch(toggleTheme());
    } else if (!darkStored && isDarkMode) {
      dispatch(toggleTheme());
    }
  }, [dispatch, isDarkMode]);

  const handleSelect = (e) => {
    const value = e.target.value;
    if (value === 'verify') {
      navigate('/verifyemail');
    } else if (value === 'logout') {
      dispatch(logout());
      const email = localStorage.getItem('currentUserEmail');
      localStorage.removeItem('token');
      if (email) {
        localStorage.removeItem(`${email}isProfileComplete`);
        localStorage.removeItem('currentUserEmail');
      }
      localStorage.removeItem('dark');
      navigate('/login');
    }
  };

  const handleToggleTheme = () => {
    const newTheme = !isDarkMode;
    localStorage.setItem('dark', newTheme.toString());
    dispatch(toggleTheme());
  };

  const email = localStorage.getItem('currentUserEmail');
  const complete = localStorage.getItem(`${email}isProfileComplete`) === 'true';

  return (
    <header className="py-5 px-6 shadow-md bg-gradient-to-r from-black via-red-800 to-black text-white relative">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-wide uppercase text-yellow-300 drop-shadow">
          Xpense Tracker
        </h1>

        <nav className="flex items-center gap-6">
          <ul className="flex flex-wrap gap-5 items-center text-sm font-medium">
            <li><Link to="/" className="hover:underline hover:text-yellow-300">Home</Link></li>

            {isLoggedIn && !complete && (
              <li>
                <Link
                  to="/complete-profile"
                  className="text-red-300 underline hover:text-yellow-300 font-semibold"
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

            {onpremium && (
              <li>
                <button
                  onClick={handleToggleTheme}
                  className="bg-white text-black px-3 py-1 rounded hover:bg-gray-300 transition"
                >
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
