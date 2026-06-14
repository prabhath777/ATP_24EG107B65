
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import {
  navbar as navbarStyle,
  navbarContainer,
  brand as brandStyle,
  navLinks as navLinksStyle,
  navLink as navLinkStyle,
  secondaryBtn,
  primaryBtn,
  
} from "../../common";

const Navbar = () => {
  const { user, role, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className={navbarStyle}>
      <div className={navbarContainer}>
        {/* Brand */}
        <Link to="/" className={brandStyle}>
         RapidBlood
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-4">
          <div className={navLinksStyle}>
            <Link to="/" className={navLinkStyle}>
              Home
            </Link>
            {role === "USER" && (
              <Link to="/dashboard" className={navLinkStyle}>
                User Dashboard
              </Link>
            )}
            {role === "ORG" && (
              <Link to="/org-dashboard" className={navLinkStyle}>
                Org Dashboard
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                  Hi, {user.name || user.orgName}
                </span>
                <button
                  onClick={handleLogout}
                  className={`${secondaryBtn} py-1.5 px-4 text-xs cursor-pointer`}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`${secondaryBtn} py-1.5 px-4 text-xs`}
                >
                  Login
                </Link>
                <div className="relative group">
                  <button
                    className={`${primaryBtn} py-1.5 px-4 text-xs flex items-center gap-1 cursor-pointer`}
                  >
                    Register
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-150 z-50">
                    <Link
                      to="/register-user"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 rounded-t-xl"
                    >
                      As Regular User
                    </Link>
                    <Link
                      to="/register-org"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 rounded-b-xl"
                    >
                      As Organization
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
