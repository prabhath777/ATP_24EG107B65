import React from "react";
import { Navigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import { loading as loadingStyle, pageWrapper } from "../../common";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { token, role, loading } = useAuthStore();

  if (loading) {
    return (
      <div className={pageWrapper}>
        <div className={loadingStyle}>Loading user session...</div>
      </div>
    );
  }

  if (!token) {
    // Redirect to login if there is no session token
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    // If the role does not match, redirect to the appropriate home/dashboard
    return role === "ORG" ? (
      <Navigate to="/org-dashboard" replace />
    ) : (
      <Navigate to="/dashboard" replace />
    );
  }

  return children;
};

export default ProtectedRoute;
