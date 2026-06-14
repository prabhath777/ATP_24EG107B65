
import { Routes, Route, Navigate } from "react-router";

// Pages
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterUser from "../pages/RegisterUser";
import RegisterOrg from "../pages/RegisterOrg";
import UserDashboard from "../pages/UserDashboard";
import OrgDashboard from "../pages/OrgDashboard";

// Route Guard
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register-user" element={<RegisterUser />} />
      <Route path="/register-org" element={<RegisterOrg />} />

      {/* Protected User Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRole="USER">
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected Organization Routes */}
      <Route
        path="/org-dashboard"
        element={
          <ProtectedRoute allowedRole="ORG">
            <OrgDashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
