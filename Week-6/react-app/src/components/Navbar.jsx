function Navbar(){
  return (
    <nav className="sticky top-0 z-50">
      <div className="mx-auto mt-3 left-0 right-0 max-w-5xl flex items-center gap-4 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md">

        {/* Logo */}
        <span className="text-white font-semibold">
          Prodctzzz
        </span>

        {/* Tabs */}
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm text-white hover:bg-white/20 rounded-full">
            Pages
          </button>
          <button className="px-3 py-1 text-sm text-white hover:bg-white/20 rounded-full">
            Account
          </button>
          <button className="px-3 py-1 text-sm text-white hover:bg-white/20 rounded-full">
            Blocks
          </button>
          <button className="px-3 py-1 text-sm text-white hover:bg-white/20 rounded-full">
            Docs
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;