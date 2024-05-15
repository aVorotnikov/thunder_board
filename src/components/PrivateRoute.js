// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from "react"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({ children }) => {
  let isLoggedIn = localStorage.getItem('loggedIn');
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute