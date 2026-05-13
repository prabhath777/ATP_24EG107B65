import { useEffect, useState } from "react";
import axios from "../api/axiosInstance.js";
import { useNavigate } from "react-router";
import { useAuth } from "../components/store/authStore.js";

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
  articleStatusActive,
  articleStatusDeleted,
} from "../styles/common";

function AuthorArticles() {
  const navigate = useNavigate();

  const user = useAuth((state) => state.currentUser);

  const [articles, setArticles] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const getAuthorArticles = async () => {
      try {
        setLoading(true);

        const res = await axios.get('/author-api/articles');

        if (res.status === 200) {
          setArticles(res.data.payload);
        }
      } catch (err) {
        console.log(err);

        setError(
          err.response?.data?.error ||
            "Failed to fetch articles"
        );
      } finally {
        setLoading(false);
      }
    };

    getAuthorArticles();
  }, [user]);

  const openArticle = (article) => {
    navigate(`/article/${article._id}`, {
      state: article,
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      dateStyle: "medium",
      timeZone: "Asia/Kolkata",
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

  // ERROR
  if (error) {
    return (
      <div className={errorClass}>
        {error}
      </div>
    );
  }

  // EMPTY
  if (articles.length === 0) {
    return (
      <div className="py-24">
        <div className="max-w-2xl">
          <h2 className={headingClass}>
            No articles published yet
          </h2>

          <p className={`${mutedText} mt-4`}>
            Start writing and publish your first article
            to build your publication archive.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section>
      {/* HEADER */}
      <div className={sectionIntro}>
        <h1 className={headingClass}>
          Published Articles
        </h1>

        <p className={mutedText}>
          Manage active stories, archived content, and
          editorial publications from your dashboard.
        </p>
      </div>

      {/* GRID */}
      <div className={articleGrid}>
        {articles.map((article) => (
          <article
            key={article._id}
            className={`${articleCardClass} relative overflow-hidden flex flex-col`}
          >
            {/* Thumbnail */}
            <div className="aspect-video bg-[#f5e9d4]" />

            {/* Status Badge */}
            <span
              className={
                article.isArticleActive
                  ? articleStatusActive
                  : articleStatusDeleted
              }
            >
              {article.isArticleActive
                ? "ACTIVE"
                : "ARCHIVED"}
            </span>

            {/* Content */}
            <div
              className={`${articleContentWrapper} flex flex-col flex-1`}
            >
              <div className="flex flex-col gap-3">
                <p className={articleCategory}>
                  {article.category}
                </p>

                <h2 className={articleTitle}>
                  {article.title}
                </h2>

                <p className={articleExcerpt}>
                  {article.content.slice(0, 120)}...
                </p>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-5 border-t border-[#dddddd] flex items-center justify-between">
                <p className={articleMeta}>
                  {formatDate(article.dateOfCreation)}
                </p>

                <button
                  onClick={() => openArticle(article)}
                  className={primaryBtn}
                >
                  Read
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default AuthorArticles;