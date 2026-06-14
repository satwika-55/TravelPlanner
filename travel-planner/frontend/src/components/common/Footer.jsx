import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Github, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-800/60 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
        {/* Brand Column */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center shadow-lg shadow-rose-500/20">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
              Roam<span className="text-amber-500">AI</span>
            </span>
          </div>
          <p className="text-neutral-400 text-sm leading-relaxed mb-6 max-w-sm">
            Experience personalized travel planning powered by advanced AI. Discover iconic locations, save custom itineraries, and share your adventures with a global travel community.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-amber-500 hover:text-white transition-all">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-amber-500 hover:text-white transition-all">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-amber-500 hover:text-white transition-all">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-amber-500 hover:text-white transition-all">
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Explore Links */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Explore</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/explore" className="hover:text-amber-400 transition-all">Destinations</Link>
            </li>
            <li>
              <Link to="/community" className="hover:text-amber-400 transition-all">Community Feed</Link>
            </li>
            <li>
              <Link to="/my-trips" className="hover:text-amber-400 transition-all">AI Trip Planner</Link>
            </li>
            <li>
              <Link to="/saved-trips" className="hover:text-amber-400 transition-all">Saved Itineraries</Link>
            </li>
          </ul>
        </div>

        {/* Resources Links */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Resources</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#" className="hover:text-amber-400 transition-all">Travel Blog</a>
            </li>
            <li>
              <a href="#" className="hover:text-amber-400 transition-all">Safety Tips</a>
            </li>
            <li>
              <a href="#" className="hover:text-amber-400 transition-all">FAQs</a>
            </li>
            <li>
              <a href="#" className="hover:text-amber-400 transition-all">Partnerships</a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Newsletter</h4>
          <p className="text-sm mb-4">Subscribe for curated itineraries, local insights, and new updates.</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-all"
            />
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 font-medium text-sm transition-all active:scale-95"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <p>© {new Date().getFullYear()} RoamAI Inc. All rights reserved.</p>
        <p className="flex items-center gap-1.5">
          Made with <Heart className="h-3 w-3 text-rose-500 fill-rose-500" /> for travelers worldwide
        </p>
      </div>
    </footer>
  );
};

export default Footer;
