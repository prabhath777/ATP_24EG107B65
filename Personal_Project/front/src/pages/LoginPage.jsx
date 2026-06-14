import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../store/authStore";
import {
  pageBackground,
  narrowWrapper,
  formCard,
  formTitle,
  formGroup,
  label as labelStyle,
  input as inputStyle,
  submitBtn,
  primaryBtn,
  secondaryBtn,
  divider,
} from "../../common";

const LoginPage = () => {
  const { loginUser, loginOrg } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState("user"); // 'user' or 'org'
  
  // User login form state
  const [userPhone, setUserPhone] = useState("");
  const [userPassword, setUserPassword] = useState("");

  // Org login form state
  const [orgEmail, setOrgEmail] = useState("");
  const [orgPassword, setOrgPassword] = useState("");

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const from = location.state?.redirectTo || null;

  const handleUserLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    if (!userPhone || !userPassword) {
      setError("Please fill in all fields");
      setSubmitting(false);
      return;
    }

    const res = await loginUser(userPhone, userPassword);
    if (res.success) {
      navigate(from || "/dashboard");
    } else {
      setError(res.message);
    }
    setSubmitting(false);
  };

  const handleOrgLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    if (!orgEmail || !orgPassword) {
      setError("Please fill in all fields");
      setSubmitting(false);
      return;
    }

    const res = await loginOrg(orgEmail, orgPassword);
    if (res.success) {
      navigate(from || "/org-dashboard");
    } else {
      setError(res.message);
    }
    setSubmitting(false);
  };

  return (
    <div className={pageBackground}>
      <Navbar />

      <div className={`${narrowWrapper} py-16`}>
        {/* Tab Toggle Header */}
        <div className="flex bg-gray-100 p-1.5 rounded-2xl mb-8">
          <button
            type="button"
            onClick={() => {
              setActiveTab("user");
              setError("");
            }}
            className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all cursor-pointer ${
              activeTab === "user"
                ? "bg-white text-red-700 shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            👤 User Login
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("org");
              setError("");
            }}
            className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all cursor-pointer ${
              activeTab === "org"
                ? "bg-white text-red-700 shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            🏢 Organization Login
          </button>
        </div>

        {/* Login Card */}
        <div className={formCard}>
          <h2 className={`${formTitle} mb-6 text-center`}>
            {activeTab === "user" ? "User Account Login" : "Organization Portal"}
          </h2>

          {error && (
            <div className="mb-6 p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl">
              ⚠️ {error}
            </div>
          )}

          {activeTab === "user" ? (
            /* USER FORM */
            <form onSubmit={handleUserLogin} className="flex flex-col gap-6">
              <div className={formGroup}>
                <label className={labelStyle}>Phone Number</label>
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className={inputStyle}
                  required
                />
              </div>

              <div className={formGroup}>
                <label className={labelStyle}>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  className={inputStyle}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={`${submitBtn} mt-2 cursor-pointer disabled:opacity-50`}
              >
                {submitting ? "Logging in..." : "Login"}
              </button>

              <div className={`${divider} my-2`}></div>

              <p className="text-center text-sm text-gray-500">
                New to Emergency Blood Locator?{" "}
                <Link to="/register-user" className="text-red-700 font-semibold hover:underline">
                  Register as User
                </Link>
              </p>
            </form>
          ) : (
            /* ORG FORM */
            <form onSubmit={handleOrgLogin} className="flex flex-col gap-6">
              <div className={formGroup}>
                <label className={labelStyle}>Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. info@bloodbank.org"
                  value={orgEmail}
                  onChange={(e) => setOrgEmail(e.target.value)}
                  className={inputStyle}
                  required
                />
              </div>

              <div className={formGroup}>
                <label className={labelStyle}>Password</label>
                <input
                  type="password"
                  placeholder="Enter your organization password"
                  value={orgPassword}
                  onChange={(e) => setOrgPassword(e.target.value)}
                  className={inputStyle}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={`${submitBtn} mt-2 cursor-pointer disabled:opacity-50`}
              >
                {submitting ? "Logging in..." : "Login"}
              </button>

              <div className={`${divider} my-2`}></div>

              <p className="text-center text-sm text-gray-500">
                Registering a blood center?{" "}
                <Link to="/register-org" className="text-red-700 font-semibold hover:underline">
                  Register Organization
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
