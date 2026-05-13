import { NavLink, Outlet, useNavigate } from "react-router";
import { useAuth } from "../components/store/authStore";

import {
  pageWrapper,
  divider,
  mutedText,
  primaryBtn,
} from "../styles/common";

function AuthorProfile() {
  const currentUser = useAuth((state) => state.currentUser);

  const logout = useAuth((state) => state.logout);

  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();

    navigate("/login");
  };

  return (
    <section className="py-16">
      <div className={pageWrapper}>
        {/* PROFILE HEADER */}
        <div className="border border-[#dddddd] rounded-[12px] bg-white p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* LEFT */}
          <div className="flex items-center gap-5">
            {/* Avatar */}
            {currentUser?.profileImageUrl ? (
              <img
                src={currentUser.profileImageUrl}
                alt="profile"
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#181d26] text-white flex items-center justify-center text-xl font-medium">
                {currentUser?.firstName
                  ?.charAt(0)
                  .toUpperCase()}
              </div>
            )}

            {/* User Info */}
            <div className="flex flex-col gap-1">
              <p className="text-[13px] uppercase tracking-[0.16em] text-[#41454d]">
                Author Dashboard
              </p>

              <h1 className="text-[32px] leading-tight tracking-tight font-normal text-[#181d26]">
                Welcome back, {currentUser?.firstName}
              </h1>

              <p className={mutedText}>
                Manage articles, publish new stories, and
                maintain your editorial content.
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <button
              onClick={onLogout}
              className="bg-[#aa2d00] text-white text-[14px] font-medium px-6 py-3 rounded-xl"
            >
              Logout
            </button>
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="mt-10 flex flex-wrap items-center gap-3 border-b border-[#dddddd] pb-5">
          <NavLink
            to="articles"
            className={({ isActive }) =>
              isActive
                ? "bg-[#181d26] text-white px-5 py-3 rounded-xl text-[14px] font-medium"
                : "border border-[#dddddd] text-[#181d26] px-5 py-3 rounded-xl text-[14px] font-medium bg-white"
            }
          >
            Articles
          </NavLink>

          <NavLink
            to="write-article"
            className={({ isActive }) =>
              isActive
                ? "bg-[#181d26] text-white px-5 py-3 rounded-xl text-[14px] font-medium"
                : "border border-[#dddddd] text-[#181d26] px-5 py-3 rounded-xl text-[14px] font-medium bg-white"
            }
          >
            Write Article
          </NavLink>
        </div>

        <div className={divider} />

        {/* CONTENT */}
        <div className="pt-4">
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default AuthorProfile;