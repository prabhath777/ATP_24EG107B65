// Calm whitespace-first SaaS design language
// No gradients. No heavy shadows. Typography + spacing drive hierarchy.

// ─────────────────────────────────────────────────────
// Layout
// ─────────────────────────────────────────────────────
export const pageBackground = "bg-white min-h-screen text-[#333840]";

export const pageWrapper =
  "max-w-[1280px] mx-auto px-6 lg:px-12 py-24";

export const section = "py-24";

export const narrowWrapper =
  "max-w-3xl mx-auto px-6";

// ─────────────────────────────────────────────────────
// Typography
// ─────────────────────────────────────────────────────
export const pageTitleClass =
  "text-[40px] leading-[1.2] tracking-tight font-normal text-[#181d26]";

export const heroTitleClass =
  "text-5xl md:text-6xl leading-[1.05] tracking-tight font-normal text-[#181d26] max-w-4xl";

export const headingClass =
  "text-[32px] leading-[1.2] tracking-tight font-normal text-[#181d26]";

export const subHeadingClass =
  "text-[20px] leading-[1.5] font-normal text-[#181d26]";

export const bodyText =
  "text-[14px] leading-[1.7] text-[#333840]";

export const mutedText =
  "text-[14px] leading-[1.6] text-[#41454d]";

export const captionText =
  "text-[13px] font-medium tracking-wide text-[#41454d]";

export const linkClass =
  "text-[#1b61c9] transition-colors active:text-[#1a3866]";

// ─────────────────────────────────────────────────────
// Buttons
// ─────────────────────────────────────────────────────
export const primaryBtn =
  "bg-[#181d26] text-white text-[16px] font-medium px-6 py-4 rounded-xl active:bg-[#0d1218] transition-colors inline-flex items-center justify-center";

export const secondaryBtn =
  "bg-white border border-[#dddddd] text-[#181d26] text-[16px] font-medium px-6 py-4 rounded-xl inline-flex items-center justify-center";

export const ghostBtn =
  "text-[#1b61c9] text-[14px] font-medium";

export const pricingPillBtn =
  "bg-white border border-[#dddddd] text-[#181d26] text-[16px] font-medium px-6 py-3 rounded-full inline-flex items-center justify-center";

// ─────────────────────────────────────────────────────
// Navbar
// ─────────────────────────────────────────────────────
export const navbarClass =
  "h-16 sticky top-0 z-50 bg-white border-b border-[#dddddd]";

export const navContainerClass =
  "max-w-[1280px] mx-auto h-full px-6 lg:px-12 flex items-center justify-between";

export const navBrandClass =
  "text-[16px] font-medium tracking-tight text-[#181d26]";

export const navLinksClass =
  "hidden md:flex items-center gap-8";

export const navLinkClass =
  "text-[14px] text-[#333840] transition-colors active:text-[#181d26]";

export const navLinkActiveClass =
  "text-[14px] text-[#181d26] font-medium";

// ─────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────
export const heroSection =
  "py-28 bg-white";

export const heroContent =
  "max-w-4xl flex flex-col gap-8";

export const heroButtonRow =
  "flex flex-wrap items-center gap-4 pt-2";

// ─────────────────────────────────────────────────────
// Cards
// ─────────────────────────────────────────────────────
export const cardClass =
  "bg-white border border-[#dddddd] rounded-[12px] p-8";

export const softCard =
  "bg-[#f8fafc] rounded-[12px] p-8";

export const demoGridCard =
  "rounded-[10px] p-6 bg-white border border-[#dddddd]";

export const creamCard =
  "bg-[#f5e9d4] rounded-[10px] p-6";

export const coralCard =
  "bg-[#aa2d00] text-white rounded-[12px] p-12";

export const forestCard =
  "bg-[#0a2e0e] text-white rounded-[12px] p-12";

export const darkCard =
  "bg-[#181d26] text-white rounded-[12px] p-12";

export const ctaBand =
  "bg-[#e0e2e6] rounded-[12px] p-12";

// ─────────────────────────────────────────────────────
// Article / Blog
// ─────────────────────────────────────────────────────
export const articleGrid =
  "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";

export const articleCardClass =
  "bg-white rounded-[10px] border border-[#dddddd] overflow-hidden";

export const articleImage =
  "aspect-video w-full object-cover";

export const articleContentWrapper =
  "p-5 flex flex-col gap-3";

export const articleCategory =
  "text-[11px] uppercase tracking-[0.16em] font-medium text-[#41454d]";

export const articleTitle =
  "text-[18px] leading-[1.4] font-medium text-[#181d26]";

export const articleExcerpt =
  "text-[14px] leading-[1.7] text-[#333840]";

export const articleMeta =
  "text-[13px] text-[#41454d]";

export const articleBody =
  "text-[15px] leading-[1.9] text-[#333840]";

// ─────────────────────────────────────────────────────
// Article Page
// ─────────────────────────────────────────────────────
export const articlePageWrapper =
  "max-w-3xl mx-auto px-6 py-24";

export const articleHeader =
  "flex flex-col gap-6 mb-12";

export const articleMainTitle =
  "text-[48px] leading-[1.1] tracking-tight font-normal text-[#181d26]";

export const articleAuthorRow =
  "flex items-center justify-between py-4 border-y border-[#dddddd] text-[14px] text-[#41454d]";

export const authorInfo =
  "flex items-center gap-3 text-[#181d26] font-medium";

export const articleContent =
  "text-[16px] leading-[1.95] text-[#333840] whitespace-pre-line mt-10";

export const articleFooter =
  "border-t border-[#dddddd] mt-16 pt-6 text-[14px] text-[#41454d]";

export const articleActions =
  "flex items-center gap-4 mt-8";

export const editBtn =
  "bg-[#181d26] text-white text-[14px] font-medium px-5 py-3 rounded-xl";

export const deleteBtn =
  "bg-[#aa2d00] text-white text-[14px] font-medium px-5 py-3 rounded-xl";

// ─────────────────────────────────────────────────────
// Status Badges
// ─────────────────────────────────────────────────────
export const articleStatusActive =
  "absolute top-4 right-4 text-[11px] font-medium px-3 py-1 rounded-full bg-[#39bf45]/15 text-[#006400]";

export const articleStatusDeleted =
  "absolute top-4 right-4 text-[11px] font-medium px-3 py-1 rounded-full bg-[#aa2d00]/15 text-[#aa2d00]";

// ─────────────────────────────────────────────────────
// Forms
// ─────────────────────────────────────────────────────
export const formCard =
  "bg-[#f8fafc] rounded-[12px] p-10 border border-[#dddddd] max-w-4xl mx-auto";

export const formTitle =
  "text-[32px] leading-[1.2] tracking-tight font-normal text-[#181d26] mb-8";

export const formGroup =
  "flex flex-col gap-2 mb-5";

export const labelClass =
  "text-[14px] font-medium text-[#181d26]";

export const inputClass =
  "w-full h-11 rounded-[6px] border border-[#dddddd] bg-white px-4 text-[14px] text-[#181d26] placeholder:text-[#41454d] focus:outline-none focus:border-[#458fff]";

export const submitBtn =
  "w-full bg-[#181d26] text-white text-[16px] font-medium py-4 rounded-xl active:bg-[#0d1218]";

// ─────────────────────────────────────────────────────
// Feedback States
// ─────────────────────────────────────────────────────
export const errorClass =
  "bg-[#aa2d00]/10 border border-[#aa2d00]/20 text-[#aa2d00] rounded-[10px] px-4 py-3 text-[14px]";

export const successClass =
  "bg-[#39bf45]/10 border border-[#39bf45]/20 text-[#006400] rounded-[10px] px-4 py-3 text-[14px]";

export const loadingClass =
  "text-center text-[14px] text-[#41454d] py-12 animate-pulse";

export const emptyStateClass =
  "text-center text-[14px] text-[#41454d] py-20";

// ─────────────────────────────────────────────────────
// Comments
// ─────────────────────────────────────────────────────
export const commentsWrapper =
  "mt-16 flex flex-col gap-6";

export const commentCard =
  "bg-[#f8fafc] rounded-[10px] border border-[#dddddd] p-6";

export const commentHeader =
  "flex items-center justify-between mb-3";

export const commentUser =
  "text-[14px] font-medium text-[#181d26]";

export const commentTime =
  "text-[13px] text-[#41454d]";

export const commentText =
  "text-[14px] leading-[1.8] text-[#333840]";

export const avatar =
  "w-10 h-10 rounded-full bg-[#181d26] text-white flex items-center justify-center text-[14px] font-medium";

export const commentUserRow =
  "flex items-center gap-3";

// ─────────────────────────────────────────────────────
// Utility
// ─────────────────────────────────────────────────────
export const divider =
  "border-t border-[#dddddd] my-12";

export const logoStrip =
  "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-70";

export const sectionIntro =
  "max-w-2xl flex flex-col gap-4 mb-14";