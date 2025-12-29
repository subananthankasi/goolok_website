import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ element: Component }) => {
  const isAuthenticated = localStorage.getItem('zxcvbnm@#');
  return <Component />
};

export default PublicRoute;
