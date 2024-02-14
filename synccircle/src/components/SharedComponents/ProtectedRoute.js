import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { IndexContext } from '../../context/IndexContext';

const ProtectedRoute = ({ children }) => {
  const { googleUser } = useContext(IndexContext);

  if (!googleUser) {
    // Redirect them to the landing page if not signed in
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;

