import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Header from './Header';
import CompleteProfile from './CompleteProfile';
import './index.css';
import VerifyEmail from './VerifyEmail';
import ForgotPassword from './ForgotPassword';
import Home from './components/Home';
import { useDispatch, useSelector } from 'react-redux';
 
import { login } from './storeredux/Auth';
import About from './components/About';
import Shoping from './Shoping';

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.login);
  

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
     

    if (storedToken   !== null) {
      dispatch(login({ token: storedToken  }));
    }
    
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/verifyemail" element={<VerifyEmail />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/about" element={<About/>} />
        <Route path="/shopping" element={<Shoping/>} />
        {isLoggedIn ? (
          <Route path="/" element={<Home/>} />
        ) : (
          <Route path="/" element={<Login />} />
        )}
      </Routes>
    </div>
  );
};

export default App;
