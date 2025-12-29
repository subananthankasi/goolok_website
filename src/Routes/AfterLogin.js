import React from 'react';
import { Navigate } from 'react-router-dom';

const AfterLogin = ({ element: Component }) => {
  const isAuthenticated = localStorage.getItem('zxcvbnm@#');
   return isAuthenticated ? <Component /> : <Navigate to="/" />;
};

export default AfterLogin;
