import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import StockCard from "../components/StockCard";
import CenterCard from "../components/CenterCard";
import { getPublicStockApi } from "../services/orgApi";
import { useAuthStore } from "../store/authStore";
import {
  pageBackground,
  pageWrapper,
  heroSection,
  heroContent,
  heroTitle,
  heroActions,
  sectionTitle,
  bodyText,
  mutedText,
  primaryBtn,
  secondaryBtn,
  gridTwo,
  softCard,
  select,
  divider,
} from "../../common";

const bloodGroupOptions = [
  { value: "A_POS", label: "A+" },
  { value: "A_NEG", label: "A-" },
  { value: "B_POS", label: "B+" },
  { value: "B_NEG", label: "B-" },
  { value: "AB_POS", label: "AB+" },
  { value: "AB_NEG", label: "AB-" },
  { value: "O_POS", label: "O+" },
  { value: "O_NEG", label: "O-" },
];

const LandingPage = () => {
  const { token, role } = useAuthStore();
  const navigate = useNavigate();
  
  const [organizations, setOrganizations] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const data = await getPublicStockApi();
        setOrganizations(data.payload || []);
        
        // Extract unique districts
        const uniqueDistricts = Array.from(
          new Set(
            (data.payload || [])
              .map((org) => org.district)
              .filter(Boolean)
          )
        ).sort();
        setDistricts(uniqueDistricts);
      } catch (err) {
        console.error("Failed to load blood stocks", err);
        setError("Could not load blood center information. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchStock();
  }, []);

  // Filter organizations based on selections
  const filteredOrgs = organizations.filter((org) => {
    const matchesDistrict = selectedDistrict
      ? org.district?.toLowerCase() === selectedDistrict.toLowerCase()
      : true;

    const matchesGroup = selectedGroup
      ? (org.stock?.[selectedGroup] || 0) > 0
      : true;

    return matchesDistrict && matchesGroup;
  });

  const handleRequestBloodCTA = () => {
    if (token) {
      if (role === "USER") {
        navigate("/dashboard");
      } else {
        navigate("/org-dashboard");
      }
    } else {
      navigate("/login", { state: { redirectTo: "/dashboard" } });
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={pageBackground}>
      <Navbar />

      <div className={pageWrapper}>
        {/* Hero Section */}
        <header className={heroSection}>
          <div className={heroContent}>
            <h1 className={heroTitle}>
              Find Blood Fast.
            </h1>
            <p className={`${bodyText} text-lg max-w-2xl`}>
              Locate nearby blood centers and check live available blood stock instantly. Create blood requests and let verified centers fulfill them.
            </p>
            <div className={heroActions}>
              <button
                onClick={() => scrollToSection("stock-section")}
                className={`${primaryBtn} cursor-pointer`}
              >
                View Blood Stock
              </button>
              <button
                onClick={handleRequestBloodCTA}
                className={`${secondaryBtn} cursor-pointer`}
              >
                Request Blood
              </button>
            </div>
          </div>
        </header>

        <div className={`${divider} my-6`}></div>

        {/* Search & Filters */}
        <section className="py-8">
          <div className={softCard}>
            <h2 className="text-lg font-medium text-[#111827] mb-4">
              Search & Filter Blood Inventory
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Filter by District</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className={select}
                >
                  <option value="">All Districts</option>
                  {districts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Filter by Blood Group</label>
                <select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  className={select}
                >
                  <option value="">Any Blood Group</option>
                  {bloodGroupOptions.map((g) => (
                    <option key={g.value} value={g.value}>
                      {g.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Stock List Section */}
        <section id="stock-section" className="py-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className={sectionTitle}>Available Blood Stock</h2>
            <span className="text-sm text-gray-500">
              Showing {filteredOrgs.length} centers
            </span>
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-500 animate-pulse">
              Loading blood stock data...
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-600 font-medium bg-red-50 rounded-xl border border-red-100">
              {error}
            </div>
          ) : filteredOrgs.length === 0 ? (
            <div className="text-center py-16 text-gray-500 bg-gray-50 border border-dashed rounded-xl">
              No centers found matching the selected filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredOrgs.map((org) => (
                <StockCard key={org._id} org={org} />
              ))}
            </div>
          )}
        </section>

        <div className={`${divider} my-6`}></div>

        {/* Blood Centers Section */}
        <section className="py-12">
          <h2 className={`${sectionTitle} mb-6`}>Registered Blood Centers</h2>
          
          {loading ? (
            <div className="text-center py-12 text-gray-500 animate-pulse">
              Loading blood centers...
            </div>
          ) : filteredOrgs.length === 0 ? (
            <div className="text-center py-16 text-gray-500 bg-gray-50 border border-dashed rounded-xl">
              No centers registered or matching filters.
            </div>
          ) : (
            <div className={gridTwo}>
              {filteredOrgs.map((org) => (
                <CenterCard key={org._id} org={org} />
              ))}
            </div>
          )}
        </section>

        {/* Call to Action Section */}
        <section className="my-16 bg-[#b91c1c] rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Need Blood Urgently?</h2>
            <p className="text-red-100 max-w-lg">
              Create a direct blood request details like patient name, hospital, and units needed. Verified local organizations will respond as soon as possible.
            </p>
          </div>
          <div>
            <button
              onClick={handleRequestBloodCTA}
              className="bg-white text-[#b91c1c] hover:bg-red-50 transition-colors px-8 py-4 rounded-xl text-md font-semibold cursor-pointer shadow-sm"
            >
              Request Blood Now
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
