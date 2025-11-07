import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user);

  // Prevent early redirect while Redux is still initializing
  if (user === undefined) {
    return null; // or <Loader />
  }

  if (!user?._id) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

