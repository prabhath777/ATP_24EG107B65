import { useAuth } from "../components/store/authStore.js";
import { useNavigate } from "react-router";

import axios from "axios";
import { useEffect, useState } from "react";

import {
  pageWrapper,
  sectionIntro,
  headingClass,
  mutedText,
  articleGrid,
  articleCardClass,
  articleContentWrapper,
  articleCategory,
  articleTitle,
  articleExcerpt,
  articleMeta,
  primaryBtn,
  loadingClass,
  errorClass,
  emptyStateClass,
} from "../styles/common.js";

function UserProfile() {
  const logout = useAuth((state) => state.logout);

  const currentUser = useAuth(
    (state) => state.currentUser
  );

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          "http://localhost:4000/user-api/articles",
          {
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          setArticles(res.data.payload);
        }
      } catch (err) {
        setError(
          err.response?.data?.error ||
            "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, []);

  const formatDateIST = (date) => {
    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
      }
    );
  };

  const onLogout = async () => {
    await logout();

    navigate("/login");
  };

  const navigateToArticleByID = (articleObj) => {
    navigate(`/article/${articleObj._id}`, {
      state: articleObj,
    });
  };

  // LOADING
  if (loading) {
    return (
      <div className={loadingClass}>
        Loading articles...
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className={pageWrapper}>
        {/* ERROR */}
        {error && (
          <div className={errorClass}>
            {error}
          </div>
        )}

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
                Reader Dashboard
              </p>

              <h1 className="text-[32px] leading-tight tracking-tight font-normal text-[#181d26]">
                Welcome back, {currentUser?.firstName}
              </h1>

              <p className={mutedText}>
                Explore the latest articles and updates
                from the publication.
              </p>
            </div>
          </div>

          {/* LOGOUT */}
          <button
            onClick={onLogout}
            className="bg-[#aa2d00] text-white text-[14px] font-medium px-6 py-3 rounded-xl"
          >
            Logout
          </button>
        </div>

        {/* ARTICLES */}
        <section className="mt-16">
          <div className={sectionIntro}>
            <h2 className={headingClass}>
              Latest Articles
            </h2>

            <p className={mutedText}>
              Browse recently published stories,
              engineering insights, and technology
              discussions.
            </p>
          </div>

          {/* EMPTY */}
          {articles.length === 0 ? (
            <div className={emptyStateClass}>
              No articles available yet
            </div>
          ) : (
            <div className={articleGrid}>
              {articles.map((articleObj) => (
                <article
                  key={articleObj._id}
                  className={`${articleCardClass} overflow-hidden flex flex-col`}
                >
                  {/* Thumbnail */}
                  <div className="aspect-video bg-[#f5e9d4]" />

                  {/* Content */}
                  <div
                    className={`${articleContentWrapper} flex flex-col flex-1`}
                  >
                    <div className="flex flex-col gap-3">
                      <p className={articleCategory}>
                        {articleObj.category}
                      </p>

                      <h2 className={articleTitle}>
                        {articleObj.title}
                      </h2>

                      <p className={articleExcerpt}>
                        {articleObj.content.slice(
                          0,
                          120
                        )}
                        ...
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 pt-5 border-t border-[#dddddd] flex items-center justify-between">
                      <p className={articleMeta}>
                        {formatDateIST(
                          articleObj.createdAt
                        )}
                      </p>

                      <button
                        onClick={() =>
                          navigateToArticleByID(
                            articleObj
                          )
                        }
                        className={primaryBtn}
                      >
                        Read
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </section>
  );
}

export default UserProfile;