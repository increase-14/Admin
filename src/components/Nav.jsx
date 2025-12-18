import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-amber-400">WorldBooks</h1>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-lg font-medium transition-colors ${
                    isActive
                      ? "bg-purple-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`
                }
              >
                Profile
              </NavLink>

              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-lg font-medium transition-colors ${
                    isActive
                      ? "bg-purple-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`
                }
              >
                Kutubxonalar
              </NavLink>

              <NavLink
                to="/book"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-lg font-medium transition-colors ${
                    isActive
                      ? "bg-purple-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`
                }
              >
                Kitoblar
              </NavLink>

              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-lg font-medium transition-colors ${
                    isActive
                      ? "bg-purple-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`
                }
              >
                Kirish
              </NavLink>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 focus:outline-none"
              aria-label="Menu"
            >
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                  isActive
                    ? "bg-purple-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              Bosh sahifa
            </NavLink>

            <NavLink
              to="/lab"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                  isActive
                    ? "bg-purple-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              Kutubxonalar
            </NavLink>

            <NavLink
              to="/profile"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                  isActive
                    ? "bg-purple-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              Profil
            </NavLink>

            <NavLink
              to="/login"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                  isActive
                    ? "bg-purple-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              Kirish
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
