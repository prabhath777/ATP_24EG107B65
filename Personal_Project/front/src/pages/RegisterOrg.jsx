import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { registerOrgApi } from "../services/authApi";
import {
  pageBackground,
  narrowWrapper,
  formCard,
  formTitle,
  formGroup,
  label as labelStyle,
  input as inputStyle,
  select as selectStyle,
  submitBtn,
  divider,
} from "../../common";

const orgTypeOptions = ["Hospital", "Blood Bank", "NGO", "Trust"];

const RegisterOrg = () => {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    orgName: "",
    email: "",
    password: "",
    phone: "",
    pocName: "",
    pocPhone: "",
    type: "",
    address: "",
    district: "",
    state: "",
    pincode: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    // Validation
    const {
      orgName,
      email,
      password,
      phone,
      pocName,
      pocPhone,
      type,
      district,
      state,
    } = formData;

    if (
      !orgName ||
      !email ||
      !password ||
      !phone ||
      !pocName ||
      !pocPhone ||
      !type ||
      !district ||
      !state
    ) {
      setError("Please fill in all required fields (indicated by *)");
      setSubmitting(false);
      return;
    }

    try {
      await registerOrgApi(formData);
      setSuccess("Organization registered successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Organization registration failed. Try again."
      );
      setSubmitting(false);
    }
  };

  return (
    <div className={pageBackground}>
      <Navbar />

      <div className={`${narrowWrapper} py-12`}>
        <div className={formCard}>
          <h2 className={`${formTitle} mb-6 text-center`}>
            Register a Blood Center / Organization
          </h2>

          {error && (
            <div className="mb-6 p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl">
              ⚠️ {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl">
              ✅ {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Section: Org Info */}
            <h3 className="text-md font-semibold text-gray-700 mt-2">
              🏢 Organization Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={formGroup}>
                <label className={labelStyle}>Organization Name *</label>
                <input
                  type="text"
                  name="orgName"
                  value={formData.orgName}
                  onChange={handleChange}
                  placeholder="e.g. City Blood Center"
                  className={inputStyle}
                  required
                />
              </div>

              <div className={formGroup}>
                <label className={labelStyle}>Organization Type *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={selectStyle}
                  required
                >
                  <option value="">Select Type</option>
                  {orgTypeOptions.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={formGroup}>
                <label className={labelStyle}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. info@center.org"
                  className={inputStyle}
                  required
                />
              </div>

              <div className={formGroup}>
                <label className={labelStyle}>Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min 6 characters"
                  className={inputStyle}
                  required
                />
              </div>

              <div className={formGroup}>
                <label className={labelStyle}>Center Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Landline or mobile"
                  className={inputStyle}
                  required
                />
              </div>
            </div>

            <div className={`${divider} my-1`}></div>

            {/* Section: POC Info */}
            <h3 className="text-md font-semibold text-gray-700">
              👤 Point of Contact (POC) Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={formGroup}>
                <label className={labelStyle}>POC Full Name *</label>
                <input
                  type="text"
                  name="pocName"
                  value={formData.pocName}
                  onChange={handleChange}
                  placeholder="e.g. Dr. John Doe"
                  className={inputStyle}
                  required
                />
              </div>

              <div className={formGroup}>
                <label className={labelStyle}>POC Phone Number *</label>
                <input
                  type="tel"
                  name="pocPhone"
                  value={formData.pocPhone}
                  onChange={handleChange}
                  placeholder="POC mobile number"
                  className={inputStyle}
                  required
                />
              </div>
            </div>

            <div className={`${divider} my-1`}></div>

            {/* Section: Address */}
            <h3 className="text-md font-semibold text-gray-700">
              📍 Location Details
            </h3>

            <div className={formGroup}>
              <label className={labelStyle}>Street Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Building, Street, Area"
                className={inputStyle}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={formGroup}>
                <label className={labelStyle}>District *</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  placeholder="District"
                  className={inputStyle}
                  required
                />
              </div>

              <div className={formGroup}>
                <label className={labelStyle}>State *</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  className={inputStyle}
                  required
                />
              </div>

              <div className={formGroup}>
                <label className={labelStyle}>Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="6-digit ZIP code"
                  className={inputStyle}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`${submitBtn} mt-4 cursor-pointer disabled:opacity-50`}
            >
              {submitting ? "Registering Center..." : "Register Organization"}
            </button>

            <div className={`${divider} my-1`}></div>

            <p className="text-center text-sm text-gray-500">
              Already registered as a center?{" "}
              <Link to="/login" className="text-red-700 font-semibold hover:underline">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterOrg;
