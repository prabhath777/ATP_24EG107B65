import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { registerUserApi } from "../services/authApi";
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

const bloodGroupOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const RegisterUser = () => {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    age: "",
    bloodGroup: "",
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
      [name]: name === "age" ? (value ? Number(value) : "") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    // Validation
    const { name, phone, password, age, bloodGroup, district, state } = formData;
    if (!name || !phone || !password || !age || !bloodGroup || !district || !state) {
      setError("Please fill in all required fields (indicated by *)");
      setSubmitting(false);
      return;
    }

    try {
      await registerUserApi(formData);
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed. Try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className={pageBackground}>
      <Navbar />

      <div className={`${narrowWrapper} py-12`}>
        <div className={formCard}>
          <h2 className={`${formTitle} mb-6 text-center`}>Register as a Blood Requester / Donor</h2>

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
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={formGroup}>
                <label className={labelStyle}>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={inputStyle}
                  required
                />
              </div>

              <div className={formGroup}>
                <label className={labelStyle}>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  className={inputStyle}
                  required
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <label className={labelStyle}>Age *</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Age"
                  min="1"
                  max="120"
                  className={inputStyle}
                  required
                />
              </div>

              <div className={formGroup}>
                <label className={labelStyle}>Blood Group *</label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className={selectStyle}
                  required
                >
                  <option value="">Select Group</option>
                  {bloodGroupOptions.map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={`${divider} my-2`}></div>

            {/* Row 3 - Address */}
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

            {/* Row 4 */}
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
              {submitting ? "Registering..." : "Register Account"}
            </button>

            <div className={`${divider} my-1`}></div>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
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

export default RegisterUser;
