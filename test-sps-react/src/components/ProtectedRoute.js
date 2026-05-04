import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/AuthService";

function ProtectedRoute({ children }) {
  if (!AuthService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
