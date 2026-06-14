import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut, Compass, Heart, Map, Users, Info, Home } from "lucide-react";
import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (tokenInfo) => fetchUserProfile(tokenInfo),
    onError: (error) => console.log("Login Failed:", error),
  });

  const fetchUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setUser(resp.data);
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Explore", path: "/explore", icon: Compass },
    { name: "Community", path: "/community", icon: Users },
    { name: "Saved Trips", path: "/saved-trips", icon: Heart },
    { name: "My Trips", path: "/my-trips", icon: Map },
    { name: "About", path: "/about", icon: Info },
  ];

  const isHome = location.pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/60 backdrop-blur-md border-b border-white/10 py-3 shadow-lg"
          : isHome
          ? "bg-transparent py-5"
          : "bg-black/40 backdrop-blur-sm border-b border-white/5 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center shadow-lg shadow-rose-500/20">
            <span className="text-white font-bold text-xl">R</span>
          </div>
          <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Roam<span className="text-amber-500">AI</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-1.5 text-sm font-medium transition-all hover:text-white ${
                  isActive
                    ? "text-amber-400 font-semibold"
                    : "text-gray-300"
                }`}
              >
                <Icon className="h-4 w-4 opacity-70" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Auth CTAs / Profile */}
        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img
                  src={user.picture}
                  alt={user.name}
                  className="h-9 w-9 rounded-full border-2 border-amber-500/50 object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="text-white text-sm font-medium hidden xl:inline">
                  {user.name.split(" ")[0]}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg bg-white/5 text-gray-300 hover:bg-rose-500/10 hover:text-rose-400 border border-white/10 transition-all flex items-center gap-1.5 text-xs font-medium"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => login()}
                className="text-sm font-medium text-gray-300 hover:text-white transition-all"
              >
                Sign In
              </button>
              <button
                onClick={() => login()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white text-sm font-medium transition-all shadow-lg hover:shadow-rose-500/20 active:scale-95"
              >
                Get Started
              </button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center gap-4">
          {user && (
            <img
              src={user.picture}
              alt={user.name}
              className="h-8 w-8 rounded-full border border-amber-500/50"
              referrerPolicy="no-referrer"
            />
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-white p-2 rounded-lg bg-white/5 border border-white/10"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-b border-white/10 py-6 px-6 shadow-2xl flex flex-col gap-6 animate-fadeIn">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 text-lg font-medium py-2 border-b border-white/5 transition-all ${
                    isActive ? "text-amber-400" : "text-gray-300"
                  }`}
                >
                  <Icon className="h-5 w-5 opacity-70" />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-center font-medium transition-all flex items-center justify-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    login();
                    setIsOpen(false);
                  }}
                  className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-center font-medium border border-white/10 transition-all"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    login();
                    setIsOpen(false);
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 text-white text-center font-medium transition-all shadow-lg"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
