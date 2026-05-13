import React from "react";

import {
  pageBackground,
  pageWrapper,
  heroSection,
  heroContent,
  heroTitleClass,
  bodyText,
  heroButtonRow,
  primaryBtn,
  secondaryBtn,
  section,
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
  coralCard,
  darkCard,
  creamCard,
  logoStrip,
} from "../styles/common";

function Home() {
  const featuredArticles = [
    {
      category: "Artificial Intelligence",
      title: "Why Small AI Teams Are Moving Faster Than Big Companies",
      excerpt:
        "Modern tooling and open-source models are changing how startups build intelligent systems.",
      author: "Admin",
      date: "May 2026",
    },
    {
      category: "Web Development",
      title: "The Shift From Monoliths To Modular Frontend Systems",
      excerpt:
        "Component-driven architecture is becoming the foundation of scalable frontend engineering.",
      author: "Editorial",
      date: "May 2026",
    },
    {
      category: "Cloud",
      title: "Understanding Event-Driven Backend Architecture",
      excerpt:
        "Why asynchronous systems are becoming essential for modern scalable applications.",
      author: "Tech Desk",
      date: "May 2026",
    },
  ];

  return (
    <main className={pageBackground}>
      {/* HERO */}
      <section className={heroSection}>
        <div className={pageWrapper}>
          <div className={heroContent}>
            <p className="text-sm uppercase tracking-[0.18em] text-[#41454d] font-medium">
              Modern Tech Publication
            </p>

            <h1 className={heroTitleClass}>
              Insights, ideas, and analysis from the world of technology.
            </h1>

            <p className={`${bodyText} max-w-2xl text-[16px]`}>
              Explore articles on artificial intelligence, cloud computing,
              software engineering, startups, product systems, and the future
              of digital technology.
            </p>

            <div className={heroButtonRow}>
              <button className={primaryBtn}>Read Articles</button>

              <button className={secondaryBtn}>
                Explore Categories
              </button>
            </div>
          </div>
        </div>
      </section>

    
     

     

    
    </main>
  );
}

export default Home;