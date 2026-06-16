import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand Column */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-2xl">✈</span>
            <span className="font-bold text-lg text-gray-900">Voyara</span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            AI-powered travel planning with community-driven itineraries.
          </p>
        </div>

        {/* Explore Links */}
        <div>
          <h4 className="text-gray-900 font-semibold text-sm uppercase tracking-wider mb-5">Explore</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/community" className="text-gray-600 hover:text-gray-900 transition-all">
                Community Trips
              </Link>
            </li>
            <li>
              <Link to="/create-trip" className="text-gray-600 hover:text-gray-900 transition-all">
                Plan a Trip
              </Link>
            </li>
            <li>
              <Link to="/saved-trips" className="text-gray-600 hover:text-gray-900 transition-all">
                Saved Trips
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-gray-900 font-semibold text-sm uppercase tracking-wider mb-5">Company</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-all">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-all">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-all">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-gray-900 font-semibold text-sm uppercase tracking-wider mb-5">Stay Updated</h4>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 border-t border-gray-200 pt-8">
        <p className="text-gray-600 text-sm text-center">© 2026 Voyara. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
