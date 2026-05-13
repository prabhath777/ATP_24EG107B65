import React from "react";

function Footer() {
  return (
    <footer className="border-t border-[#dddddd] bg-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <h2 className="text-[18px] font-medium text-[#181d26] tracking-tight">
              TechBlog
            </h2>

            <p className="text-[14px] leading-[1.7] text-[#41454d] max-w-xs">
              Editorial insights on software engineering, artificial
              intelligence, cloud infrastructure, and modern technology.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[14px] font-medium text-[#181d26]">
              Navigation
            </h3>

            <a href="#" className="text-[14px] text-[#41454d]">
              Home
            </a>

            <a href="#" className="text-[14px] text-[#41454d]">
              Articles
            </a>

            <a href="#" className="text-[14px] text-[#41454d]">
              Categories
            </a>

            <a href="#" className="text-[14px] text-[#41454d]">
              About
            </a>
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[14px] font-medium text-[#181d26]">
              Topics
            </h3>

            <a href="#" className="text-[14px] text-[#41454d]">
              Artificial Intelligence
            </a>

            <a href="#" className="text-[14px] text-[#41454d]">
              Web Development
            </a>

            <a href="#" className="text-[14px] text-[#41454d]">
              Cloud Computing
            </a>

            <a href="#" className="text-[14px] text-[#41454d]">
              Startups
            </a>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[14px] font-medium text-[#181d26]">
              Stay Updated
            </h3>

            <p className="text-[14px] leading-[1.7] text-[#41454d]">
              Get the latest articles and technology insights delivered weekly.
            </p>

            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="w-full h-11 rounded-[6px] border border-[#dddddd] px-4 text-[14px] text-[#181d26] focus:outline-none"
              />

              <button className="bg-[#181d26] text-white px-5 rounded-xl text-[14px] font-medium">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#dddddd] mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-[#41454d]">
            © 2026 TechBlog. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a href="#" className="text-[13px] text-[#41454d]">
              Privacy
            </a>

            <a href="#" className="text-[13px] text-[#41454d]">
              Terms
            </a>

            <a href="#" className="text-[13px] text-[#41454d]">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;