import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOutUser } from "../redux/features/authSlice";

import {
  IoHeartOutline,
  IoCartOutline,
  IoSearchOutline,
  IoMenu,
  IoClose,
} from "react-icons/io5";

const NavigationMenuDemo = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  // Get cart and wishlist stats from Redux
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const wishlistItemsCount = useSelector(
    (state) => state.wishlist.items.length,
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(
        `/search-results?query=${encodeURIComponent(searchQuery.trim())}`,
      );
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 group-hover:text-red-500 transition-colors duration-200 uppercase">
            ShopKaro
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex space-x-8 font-medium">
          <Link
            to="/"
            className={`text-sm transition-colors duration-200 pb-1 border-b-2 hover:text-red-500 ${
              isActive("/")
                ? "border-red-500 text-red-500 font-semibold"
                : "border-transparent text-slate-600"
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`text-sm transition-colors duration-200 pb-1 border-b-2 hover:text-red-500 ${
              isActive("/about")
                ? "border-red-500 text-red-500 font-semibold"
                : "border-transparent text-slate-600"
            }`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`text-sm transition-colors duration-200 pb-1 border-b-2 hover:text-red-500 ${
              isActive("/contact")
                ? "border-red-500 text-red-500 font-semibold"
                : "border-transparent text-slate-600"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Search & Actions */}
        <div className="flex items-center gap-4 lg:gap-6">
          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center relative bg-slate-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-red-400 focus-within:ring-opacity-50 rounded-full px-4 py-2 w-64 transition-all duration-200"
          >
            <input
              type="text"
              placeholder="What are you looking for?"
              className="bg-transparent text-xs w-full focus:outline-none text-slate-700 placeholder-slate-400"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button
              type="submit"
              className="text-slate-500 hover:text-red-500 transition-colors duration-200"
            >
              <IoSearchOutline className="w-4 h-4" />
            </button>
          </form>

          {/* Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Icon for Mobile */}
            <button
              onClick={() => {
                const searchMobile = document.getElementById(
                  "search-mobile-container",
                );
                if (searchMobile) searchMobile.classList.toggle("hidden");
              }}
              className="md:hidden p-1.5 text-slate-700 hover:text-red-500 transition-colors duration-150"
              aria-label="Search"
            >
              <IoSearchOutline className="w-6 h-6" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="p-1.5 text-slate-700 hover:text-red-500 hover:bg-slate-50 rounded-full relative transition-all duration-150"
            >
              <IoHeartOutline className="w-6 h-6" />

              {wishlistItemsCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1 -translate-y-1 bg-red-500 rounded-full">
                  {wishlistItemsCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="p-1.5 text-slate-700 hover:text-red-500 hover:bg-slate-50 rounded-full relative transition-all duration-150"
            >
              <IoCartOutline className="w-6 h-6" />

              {cartQuantity > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1 -translate-y-1 bg-red-500 rounded-full">
                  {cartQuantity}
                </span>
              )}
            </Link>

            {/* Mobile Menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-1.5 text-slate-700 hover:text-red-500 transition-colors duration-150"
            >
              {menuOpen ? (
                <IoClose className="w-6 h-6" />
              ) : (
                <IoMenu className="w-6 h-6" />
              )}
            </button>
            {user ? (
              <>
                <div className="border-t pt-3 mt-3">
                  <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-lg">
                    {user?.email?.[0]?.toUpperCase()}
                  </div>

                  <button
                    onClick={async () => {
                      await dispatch(signOutUser());
                      navigate("/");
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 px-3 rounded-md text-sm font-medium text-red-500 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/signin"
                onClick={() => setMenuOpen(false)}
                className="hidden md:block px-5 py-2 rounded-lg bg-slate-900 text-white hover:bg-red-500 transition"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Real-time Search Input container for Mobile */}
      <div
        id="search-mobile-container"
        className="hidden md:hidden px-4 pb-4 border-b border-slate-100 bg-white"
      >
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center relative bg-slate-100 rounded-full px-4 py-2.5"
        >
          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent text-sm w-full focus:outline-none text-slate-700 placeholder-slate-400"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit" className="text-slate-500">
            <IoSearchOutline className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* Mobile Slide-down Navigation Panel */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-3 shadow-inner">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className={`block py-2 px-3 rounded-md text-sm font-medium ${
              isActive("/")
                ? "bg-red-50 text-red-500"
                : "text-slate-700 hover:bg-slate-50"
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className={`block py-2 px-3 rounded-md text-sm font-medium ${
              isActive("/about")
                ? "bg-red-50 text-red-500"
                : "text-slate-700 hover:bg-slate-50"
            }`}
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className={`block py-2 px-3 rounded-md text-sm font-medium ${
              isActive("/contact")
                ? "bg-red-50 text-red-500"
                : "text-slate-700 hover:bg-slate-50"
            }`}
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
};

export default NavigationMenuDemo;
