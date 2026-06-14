import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getMyRequestsApi, createRequestApi, cancelRequestApi } from "../services/requestApi";
import RequestCard from "../components/RequestCard";
import {
  pageBackground,
  pageWrapper,
  statsGrid,
  statsCard,
  statsLabel,
  statsValue,
  gridTwo,
  formCard,
  formTitle,
  formGroup,
  label as labelStyle,
  input as inputStyle,
  select as selectStyle,
  submitBtn,
  tableWrapper,
  table as tableStyle,
  tableHead,
  tableHeadCell,
  tableCell,
  divider,
  pendingBadge,
  acceptedBadge,
  completedBadge,
  cancelledBadge,
} from "../../common";

const bloodGroupOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const urgencyOptions = ["Low", "Medium", "High", "Critical"];

const UserDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    patientName: "",
    bloodGroup: "",
    unitsRequired: "",
    hospitalName: "",
    contactNumber: "",
    urgencyLevel: "Medium",
    address: "",
    district: "",
    state: "",
  });

  const fetchRequests = async () => {
    try {
      const data = await getMyRequestsApi();
      setRequests(data.payload || []);
    } catch (err) {
      console.error("Failed to load requests", err);
      setError("Could not load your blood requests. Please refresh.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "unitsRequired" ? (value ? Number(value) : "") : value,
    }));
  };

  const handleCreateRequest = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    const {
      patientName,
      bloodGroup,
      unitsRequired,
      hospitalName,
      contactNumber,
      urgencyLevel,
      district,
      state,
    } = formData;

    if (
      !patientName ||
      !bloodGroup ||
      !unitsRequired ||
      !hospitalName ||
      !contactNumber ||
      !urgencyLevel ||
      !district ||
      !state
    ) {
      setError("Please fill in all required fields (indicated by *)");
      setSubmitting(false);
      return;
    }

    try {
      await createRequestApi(formData);
      setSuccess("Blood request created successfully!");
      setFormData({
        patientName: "",
        bloodGroup: "",
        unitsRequired: "",
        hospitalName: "",
        contactNumber: "",
        urgencyLevel: "Medium",
        address: "",
        district: "",
        state: "",
      });
      fetchRequests();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to create request. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelRequest = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this request?")) return;
    try {
      await cancelRequestApi(id);
      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: "Cancelled" } : r))
      );
    } catch (err) {
      console.error("Failed to cancel request", err);
      alert(err.response?.data?.message || "Failed to cancel request.");
    }
  };

  // Compute Stats
  const total = requests.length;
  const pending = requests.filter((r) => r.status === "Pending").length;
  const accepted = requests.filter((r) => r.status === "Accepted").length;
  const completed = requests.filter((r) => r.status === "Completed").length;

  const getStatusBadge = (statusVal) => {
    switch (statusVal) {
      case "Pending":
        return <span className={pendingBadge}>Pending</span>;
      case "Accepted":
        return <span className={acceptedBadge}>Accepted</span>;
      case "Completed":
        return <span className={completedBadge}>Completed</span>;
      case "Cancelled":
        return <span className={cancelledBadge}>Cancelled</span>;
      default:
        return <span className="px-2 py-0.5 text-xs font-semibold rounded bg-gray-100 text-gray-800">{statusVal}</span>;
    }
  };

  return (
    <div className={pageBackground}>
      <Navbar />

      <div className={pageWrapper}>
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-[#111827]">User Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track your emergency blood requests</p>
        </div>

        {/* Stats Cards */}
        <div className={`${statsGrid} mb-10`}>
          <div className={statsCard}>
            <p className={statsLabel}>Total Requests</p>
            <p className={statsValue}>{total}</p>
          </div>
          <div className={statsCard}>
            <p className={statsLabel}>Pending Requests</p>
            <p className={statsValue}>{pending}</p>
          </div>
          <div className={statsCard}>
            <p className={statsLabel}>Accepted Requests</p>
            <p className={statsValue}>{accepted}</p>
          </div>
          <div className={statsCard}>
            <p className={statsLabel}>Completed Requests</p>
            <p className={statsValue}>{completed}</p>
          </div>
        </div>

        <div className={gridTwo}>
          {/* Create Request Column */}
          <div>
            <div className={formCard}>
              <h2 className={`${formTitle} mb-6`}>🚨 Request Emergency Blood</h2>

              {error && (
                <div className="mb-5 p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl">
                  ⚠️ {error}
                </div>
              )}

              {success && (
                <div className="mb-5 p-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl">
                  ✅ {success}
                </div>
              )}

              <form onSubmit={handleCreateRequest} className="flex flex-col gap-4">
                <div className={formGroup}>
                  <label className={labelStyle}>Patient Name *</label>
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    placeholder="Enter patient full name"
                    className={inputStyle}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className={formGroup}>
                    <label className={labelStyle}>Blood Group *</label>
                    <select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleInputChange}
                      className={selectStyle}
                      required
                    >
                      <option value="">Select</option>
                      {bloodGroupOptions.map((bg) => (
                        <option key={bg} value={bg}>
                          {bg}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={formGroup}>
                    <label className={labelStyle}>Units Required *</label>
                    <input
                      type="number"
                      name="unitsRequired"
                      value={formData.unitsRequired}
                      onChange={handleInputChange}
                      placeholder="Units"
                      min="1"
                      className={inputStyle}
                      required
                    />
                  </div>
                </div>

                <div className={formGroup}>
                  <label className={labelStyle}>Hospital Name *</label>
                  <input
                    type="text"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleInputChange}
                    placeholder="Hospital Name & Branch"
                    className={inputStyle}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className={formGroup}>
                    <label className={labelStyle}>Contact Number *</label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      placeholder="Phone number"
                      className={inputStyle}
                      required
                    />
                  </div>

                  <div className={formGroup}>
                    <label className={labelStyle}>Urgency Level *</label>
                    <select
                      name="urgencyLevel"
                      value={formData.urgencyLevel}
                      onChange={handleInputChange}
                      className={selectStyle}
                      required
                    >
                      {urgencyOptions.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={`${divider} my-1`}></div>

                <div className={formGroup}>
                  <label className={labelStyle}>Hospital Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Building, Road, Area"
                    className={inputStyle}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className={formGroup}>
                    <label className={labelStyle}>District *</label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
                      placeholder="State"
                      className={inputStyle}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className={`${submitBtn} mt-2 cursor-pointer disabled:opacity-50`}
                >
                  {submitting ? "Submitting Request..." : "Submit Blood Request"}
                </button>
              </form>
            </div>
          </div>

          {/* My Requests Column */}
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-[#111827] flex items-center justify-between">
              <span>📋 My Requests Logs</span>
              <button
                onClick={fetchRequests}
                className="text-xs text-red-700 font-medium hover:underline bg-transparent border-0 cursor-pointer"
              >
                🔄 Refresh
              </button>
            </h2>

            {loading ? (
              <div className="text-center py-12 text-gray-500 animate-pulse">
                Loading requests...
              </div>
            ) : requests.length === 0 ? (
              <div className="text-center py-16 text-gray-500 bg-gray-50 border border-dashed rounded-2xl p-6">
                You have not submitted any blood requests yet.
              </div>
            ) : (
              <div className="flex flex-col gap-4 max-h-[850px] overflow-y-auto pr-1">
                {requests.map((req) => (
                  <RequestCard
                    key={req._id}
                    request={req}
                    role="USER"
                    onCancel={handleCancelRequest}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
