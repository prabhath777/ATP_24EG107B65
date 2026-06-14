import  { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../store/authStore";
import { getPendingRequestsApi, acceptRequestApi, completeRequestApi } from "../services/requestApi";
import { updateStockApi, updateOrgProfileApi } from "../services/orgApi";
import { getMeApi } from "../services/authApi";
import RequestCard from "../components/RequestCard";
import {
  pageBackground,
  pageWrapper,
  statsGrid,
  statsCard,
  statsLabel,
  statsValue,
  gridTwo,
  gridThree,
  formCard,
  formTitle,
  formGroup,
  label as labelStyle,
  input as inputStyle,
  select as selectStyle,
  submitBtn,
  divider,
  card as cardStyle,
  
} from "../../common";

const bloodGroupMap = {
  A_POS: "A+",
  A_NEG: "A-",
  B_POS: "B+",
  B_NEG: "B-",
  AB_POS: "AB+",
  AB_NEG: "AB-",
  O_POS: "O+",
  O_NEG: "O-",
};

const OrgDashboard = () => {
  const { user, setUser, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState("dashboard"); // 'dashboard', 'inventory', 'requests', 'profile'
  
  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [stockForm, setStockForm] = useState({
    A_POS: 0,
    A_NEG: 0,
    B_POS: 0,
    B_NEG: 0,
    AB_POS: 0,
    AB_NEG: 0,
    O_POS: 0,
    O_NEG: 0,
  });

  const [profileForm, setProfileForm] = useState({
    orgName: "",
    phone: "",
    pocName: "",
    pocPhone: "",
    type: "",
    address: "",
    district: "",
    state: "",
    pincode: "",
  });

  const [stockMsg, setStockMsg] = useState("");
  const [profileMsg, setProfileMsg] = useState("");
  const [submittingStock, setSubmittingStock] = useState(false);
  const [submittingProfile, setSubmittingProfile] = useState(false);

  const fetchRequests = async () => {
    try {
      setLoadingRequests(true);
      const data = await getPendingRequestsApi();
      setRequests(data.payload || []);
    } catch (err) {
      console.error("Failed to fetch requests", err);
    } finally {
      setLoadingRequests(false);
    }
  };

  const fetchLatestOrgData = async () => {
    try {
      const data = await getMeApi();
      if (data.payload) {
        setUser(data.payload);
      }
    } catch (err) {
      console.error("Failed to load org profile details", err);
    }
  };

  useEffect(() => {
    if (user) {
      // Prepopulate stock
      if (user.stock) {
        setStockForm({
          A_POS: user.stock.A_POS || 0,
          A_NEG: user.stock.A_NEG || 0,
          B_POS: user.stock.B_POS || 0,
          B_NEG: user.stock.B_NEG || 0,
          AB_POS: user.stock.AB_POS || 0,
          AB_NEG: user.stock.AB_NEG || 0,
          O_POS: user.stock.O_POS || 0,
          O_NEG: user.stock.O_NEG || 0,
        });
      }
      
      // Prepopulate profile
      setProfileForm({
        orgName: user.orgName || "",
        phone: user.phone || "",
        pocName: user.pocName || "",
        pocPhone: user.pocPhone || "",
        type: user.type || "",
        address: user.address || "",
        district: user.district || "",
        state: user.state || "",
        pincode: user.pincode || "",
      });
    }
    fetchRequests();
  }, [user]);

  // Inventory Update
  const handleStockChange = (e) => {
    const { name, value } = e.target;
    setStockForm((prev) => ({
      ...prev,
      [name]: value === "" ? 0 : Math.max(0, parseInt(value, 10)),
    }));
  };

  const handleStockSubmit = async (e) => {
    e.preventDefault();
    setStockMsg("");
    setSubmittingStock(true);
    try {
      const data = await updateStockApi(stockForm);
      setStockMsg("✅ Inventory updated successfully!");
      // Update local user context
      setUser({
        ...user,
        stock: data.payload,
      });
    } catch (err) {
      console.error(err);
      setStockMsg("❌ Failed to update inventory.");
    } finally {
      setSubmittingStock(false);
    }
  };

  // Profile Update
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileMsg("");
    setSubmittingProfile(true);
    try {
      const data = await updateOrgProfileApi(profileForm);
      setProfileMsg("✅ Profile updated successfully!");
      setUser(data.payload);
    } catch (err) {
      console.error(err);
      setProfileMsg("❌ Failed to update profile.");
    } finally {
      setSubmittingProfile(false);
    }
  };

  // Request Actions
  const handleAcceptRequest = async (id) => {
    try {
      await acceptRequestApi(id);
      setRequests((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, status: "Accepted", acceptedBy: user._id } : r
        )
      );
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to accept request.");
    }
  };

  const handleCompleteRequest = async (id) => {
    try {
      await completeRequestApi(id);
      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: "Completed" } : r))
      );
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to complete request.");
    }
  };

  // Statistics
  const pendingRequests = requests.filter(
    (r) => r.status === "Pending" && r.district === user?.district
  );
  
  const acceptedRequests = requests.filter(
    (r) => r.status === "Accepted" && r.acceptedBy === user?._id
  );

  const completedRequests = requests.filter(
    (r) => r.status === "Completed" && r.acceptedBy === user?._id
  );

  return (
    <div className={pageBackground}>
      <Navbar />

      <div className={`${pageWrapper} flex flex-col md:flex-row gap-8`}>
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex flex-col gap-2 bg-[#f9fafb] border border-[#e5e7eb] rounded-2xl p-4 self-start">
          <div className="px-3 py-2.5 mb-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Navigation
            </h3>
            <p className="text-sm font-semibold text-gray-800 mt-1 truncate">
              {user?.orgName}
            </p>
          </div>

          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-all cursor-pointer ${
              activeTab === "dashboard"
                ? "bg-[#b91c1c] text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            📊 Dashboard
          </button>

          <button
            onClick={() => setActiveTab("inventory")}
            className={`w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-all cursor-pointer ${
              activeTab === "inventory"
                ? "bg-[#b91c1c] text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            🩸 Inventory
          </button>

          <button
            onClick={() => setActiveTab("requests")}
            className={`w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-all cursor-pointer ${
              activeTab === "requests"
                ? "bg-[#b91c1c] text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            🚨 Requests
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-all cursor-pointer ${
              activeTab === "profile"
                ? "bg-[#b91c1c] text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            👤 Profile
          </button>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1">
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === "dashboard" && (
            <div className="flex flex-col gap-8">
              <div>
                <h1 className="text-3xl font-semibold text-[#111827]">Organization Overview</h1>
                <p className="text-sm text-gray-500 mt-1">Live status of stock counts and district requests</p>
              </div>

              {/* Stats Grid */}
              <div className={statsGrid}>
                <div className={statsCard}>
                  <p className={statsLabel}>Pending Requests (District)</p>
                  <p className={statsValue}>{pendingRequests.length}</p>
                </div>
                <div className={statsCard}>
                  <p className={statsLabel}>My Accepted Requests</p>
                  <p className={statsValue}>{acceptedRequests.length}</p>
                </div>
                <div className={statsCard}>
                  <p className={statsLabel}>My Completed Requests</p>
                  <p className={statsValue}>{completedRequests.length}</p>
                </div>
                <div className={statsCard}>
                  <p className={statsLabel}>Total Stock Units</p>
                  <p className={statsValue}>
                    {user?.stock
                      ? Object.values(user.stock).reduce((s, v) => s + (v || 0), 0)
                      : 0}
                  </p>
                </div>
              </div>

              <div className={`${divider} my-2`}></div>

              <div className={gridTwo}>
                <div className={cardStyle}>
                  <h3 className="text-md font-semibold text-[#111827] mb-3">📍 Blood Center Info</h3>
                  <div className="text-sm text-gray-600 flex flex-col gap-2">
                    <p><strong>District:</strong> {user?.district}</p>
                    <p><strong>State:</strong> {user?.state}</p>
                    <p><strong>Pincode:</strong> {user?.pincode}</p>
                    <p><strong>Address:</strong> {user?.address}</p>
                    <p><strong>Center Phone:</strong> {user?.phone}</p>
                  </div>
                </div>

                <div className={cardStyle}>
                  <h3 className="text-md font-semibold text-[#111827] mb-3">👤 Point of Contact</h3>
                  <div className="text-sm text-gray-600 flex flex-col gap-2">
                    <p><strong>Name:</strong> {user?.pocName}</p>
                    <p><strong>Phone:</strong> {user?.pocPhone}</p>
                    <p><strong>Email Address:</strong> {user?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INVENTORY MANAGEMENT */}
          {activeTab === "inventory" && (
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-3xl font-semibold text-[#111827]">Manage Blood Stock</h1>
                <p className="text-sm text-gray-500 mt-1">Specify current available bags/units for each blood group</p>
              </div>

              <div className={formCard}>
                <h2 className={`${formTitle} mb-6`}>Update Inventory Quantities</h2>

                {stockMsg && (
                  <div className={`mb-6 p-4 text-sm rounded-xl border ${
                    stockMsg.startsWith("✅")
                      ? "text-green-700 bg-green-50 border-green-200"
                      : "text-red-700 bg-red-50 border-red-200"
                  }`}>
                    {stockMsg}
                  </div>
                )}

                <form onSubmit={handleStockSubmit} className="flex flex-col gap-6">
                  <div className={gridThree}>
                    {Object.entries(bloodGroupMap).map(([key, label]) => (
                      <div key={key} className={formGroup}>
                        <label className={labelStyle}>Blood Group {label}</label>
                        <input
                          type="number"
                          name={key}
                          value={stockForm[key]}
                          onChange={handleStockChange}
                          min="0"
                          placeholder="Units"
                          className={inputStyle}
                        />
                      </div>
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={submittingStock}
                    className={`${submitBtn} max-w-xs cursor-pointer disabled:opacity-50`}
                  >
                    {submittingStock ? "Saving..." : "Update Inventory"}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 3: REQUEST MANAGEMENT */}
          {activeTab === "requests" && (
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-semibold text-[#111827]">Process Blood Requests</h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Accept and fulfill emergency blood requests within <strong>{user?.district}</strong> district
                  </p>
                </div>
                <button
                  onClick={fetchRequests}
                  className="px-4 py-2 border border-gray-200 hover:bg-gray-50 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  🔄 Reload
                </button>
              </div>

              {loadingRequests ? (
                <div className="text-center py-12 text-gray-500 animate-pulse">
                  Loading requests from database...
                </div>
              ) : (
                <div className="flex flex-col gap-10">
                  {/* Subsection: Pending Requests */}
                  <div>
                    <h2 className="text-lg font-semibold text-[#111827] mb-4 flex items-center gap-2">
                      <span>📌 District Requests Pending Fulfill ({pendingRequests.length})</span>
                    </h2>
                    {pendingRequests.length === 0 ? (
                      <div className="text-center py-10 text-gray-400 bg-gray-50 border border-dashed rounded-2xl">
                        No pending blood requests in your district.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {pendingRequests.map((req) => (
                          <RequestCard
                            key={req._id}
                            request={req}
                            role="ORG"
                            orgId={user?._id}
                            onAccept={handleAcceptRequest}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className={divider}></div>

                  {/* Subsection: Handled Requests */}
                  <div>
                    <h2 className="text-lg font-semibold text-[#111827] mb-4">
                      💼 My Handled Requests (Accepted & Completed)
                    </h2>
                    {acceptedRequests.length === 0 && completedRequests.length === 0 ? (
                      <div className="text-center py-10 text-gray-400 bg-gray-50 border border-dashed rounded-2xl">
                        You have not accepted or completed any requests yet.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[...acceptedRequests, ...completedRequests].map((req) => (
                          <RequestCard
                            key={req._id}
                            request={req}
                            role="ORG"
                            orgId={user?._id}
                            onComplete={handleCompleteRequest}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: PROFILE EDITING */}
          {activeTab === "profile" && (
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-3xl font-semibold text-[#111827]">Organization Profile</h1>
                <p className="text-sm text-gray-500 mt-1">Update organizational details and contact information</p>
              </div>

              <div className={formCard}>
                <h2 className={`${formTitle} mb-6`}>Edit Profile Details</h2>

                {profileMsg && (
                  <div className={`mb-6 p-4 text-sm rounded-xl border ${
                    profileMsg.startsWith("✅")
                      ? "text-green-700 bg-green-50 border-green-200"
                      : "text-red-700 bg-red-50 border-red-200"
                  }`}>
                    {profileMsg}
                  </div>
                )}

                <form onSubmit={handleProfileSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={formGroup}>
                      <label className={labelStyle}>Organization Name *</label>
                      <input
                        type="text"
                        name="orgName"
                        value={profileForm.orgName}
                        onChange={handleProfileChange}
                        className={inputStyle}
                        required
                      />
                    </div>

                    <div className={formGroup}>
                      <label className={labelStyle}>Organization Type *</label>
                      <select
                        name="type"
                        value={profileForm.type}
                        onChange={handleProfileChange}
                        className={selectStyle}
                        required
                      >
                        <option value="Hospital">Hospital</option>
                        <option value="Blood Bank">Blood Bank</option>
                        <option value="NGO">NGO</option>
                        <option value="Trust">Trust</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={formGroup}>
                      <label className={labelStyle}>Center Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={profileForm.phone}
                        onChange={handleProfileChange}
                        className={inputStyle}
                        required
                      />
                    </div>

                    <div className={formGroup}>
                      <label className={labelStyle}>Center Email (Read Only)</label>
                      <input
                        type="email"
                        value={user?.email || ""}
                        className={`${inputStyle} bg-gray-50 text-gray-500 cursor-not-allowed`}
                        disabled
                      />
                    </div>
                  </div>

                  <div className={`${divider} my-1`}></div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={formGroup}>
                      <label className={labelStyle}>Point of Contact Name *</label>
                      <input
                        type="text"
                        name="pocName"
                        value={profileForm.pocName}
                        onChange={handleProfileChange}
                        className={inputStyle}
                        required
                      />
                    </div>

                    <div className={formGroup}>
                      <label className={labelStyle}>Point of Contact Phone *</label>
                      <input
                        type="tel"
                        name="pocPhone"
                        value={profileForm.pocPhone}
                        onChange={handleProfileChange}
                        className={inputStyle}
                        required
                      />
                    </div>
                  </div>

                  <div className={`${divider} my-1`}></div>

                  <div className={formGroup}>
                    <label className={labelStyle}>Street Address</label>
                    <input
                      type="text"
                      name="address"
                      value={profileForm.address}
                      onChange={handleProfileChange}
                      className={inputStyle}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className={formGroup}>
                      <label className={labelStyle}>District *</label>
                      <input
                        type="text"
                        name="district"
                        value={profileForm.district}
                        onChange={handleProfileChange}
                        className={inputStyle}
                        required
                      />
                    </div>

                    <div className={formGroup}>
                      <label className={labelStyle}>State *</label>
                      <input
                        type="text"
                        name="state"
                        value={profileForm.state}
                        onChange={handleProfileChange}
                        className={inputStyle}
                        required
                      />
                    </div>

                    <div className={formGroup}>
                      <label className={labelStyle}>Pincode</label>
                      <input
                        type="text"
                        name="pincode"
                        value={profileForm.pincode}
                        onChange={handleProfileChange}
                        className={inputStyle}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submittingProfile}
                    className={`${submitBtn} max-w-xs mt-3 cursor-pointer disabled:opacity-50`}
                  >
                    {submittingProfile ? "Saving Profile..." : "Save Profile"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default OrgDashboard;
