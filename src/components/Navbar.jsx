import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className="bg-gray-50">
      <header className="py-4 md:py-6">
        <div className="container px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">

              <div className="bg-orange-500 text-purple-500 text-xl font-bold rounded-full">
                TickDone
              </div>

            </div>
            {/* Mobile Menu Button */}
            <div className="flex lg:hidden">
              <button
                type="button"
                className="text-gray-900"
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
              >
                {expanded ? (
                  <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex lg:ml-16 lg:items-center lg:justify-center lg:space-x-10 xl:space-x-16">
              <Link to="/dashboard" className="text-base font-medium text-gray-900 transition-all duration-200 rounded hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                Dashboard
              </Link>
              <Link to="/About" className="text-base font-medium text-gray-900 transition-all duration-200 rounded hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                About us
              </Link>
              <Link to="/Contact" className="text-base font-medium text-gray-900 transition-all duration-200 rounded hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                Contact us
              </Link>
              <Link to="/Article" className="text-base font-medium text-gray-900 transition-all duration-200 rounded hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                Articles
              </Link>
            </div>

            {/* Search Bar and Profile Picture */}
            <div className="hidden lg:ml-auto lg:flex lg:items-center lg:space-x-4">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-gray-900 focus:outline-none"
              />
              <Link to="/profile"><img src="https://www.w3schools.com/howto/img_avatar.png" className="w-10 h-10 rounded-full border text-gray-500 cursor-pointer hover:text-blue-600 transition" /></Link>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <nav className={`${expanded ? "block" : "hidden"} lg:hidden`}>
            <div className="px-1 py-8">
              <div className="grid gap-y-7">
                <Link to="/dashboard" className="text-base font-medium text-gray-900 transition-all duration-200 rounded hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                  Dashboard
                </Link>
                <Link to="/aboutus" className="text-base font-medium text-gray-900 transition-all duration-200 rounded hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                  About us
                </Link>
                <Link to="/contactus" className="text-base font-medium text-gray-900 transition-all duration-200 rounded hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                  Contact us
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Navbar;