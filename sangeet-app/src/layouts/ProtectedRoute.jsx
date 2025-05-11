import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";

const ProtectedRoute = ({ requiredRole }) => {
  const { user } = useUser();

  // If the user role matches the required role, allow access
  if (user?.role === requiredRole) {
    return <Outlet />;
  }

  // Redirect to the login page or a "Not Authorized" page if access is denied
  return <Navigate to="/LoginPage" replace />;
};

export default ProtectedRoute;