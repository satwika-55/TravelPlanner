import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Compass, Calendar, MapPin, Star, ArrowLeft, RefreshCw, Trash2 } from "lucide-react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { toast } from "sonner";

const SavedTrips = () => {
  const [savedTrips, setSavedTrips] = useState([]);
  const [userEmail, setUserEmail] = useState("demo@roamai.com");
  const navigate = useNavigate();

  useEffect(() => {
    // Load logged in user
    const userString = localStorage.getItem("user");
    let email = "demo@roamai.com";
    if (userString) {
      email = JSON.parse(userString).email;
      setUserEmail(email);
    }

    // Load saved trips from community feed
    const localFeed = localStorage.getItem("community-trips");
    if (localFeed) {
      const allTrips = JSON.parse(localFeed);
      const filtered = allTrips.filter((t) => (t.savedBy || []).includes(email));
      setSavedTrips(filtered);
    }
  }, []);

  const handleUnsave = (tripId) => {
    // Remove from community feed savedBy list
    const localFeed = localStorage.getItem("community-trips");
    if (localFeed) {
      const allTrips = JSON.parse(localFeed);
      const updated = allTrips.map((t) => {
        if (t.id === tripId) {
          const savedBy = (t.savedBy || []).filter((e) => e !== userEmail);
          return { ...t, savedBy };
        }
        return t;
      });
      localStorage.setItem("community-trips", JSON.stringify(updated));
      
      // Update local state
      const filtered = updated.filter((t) => (t.savedBy || []).includes(userEmail));
      setSavedTrips(filtered);
      toast.success("Itinerary removed from Saved Trips");
    }
  };

  const handleReuse = (locationName) => {
    // Prefill home page search and scroll to planning
    navigate("/", { state: { prefilledLocation: locationName } });
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <Header />

      <main className="pt-28 pb-20 max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="mb-10 text-left">
          <Link to="/" className="flex items-center gap-1 text-sm text-neutral-500 hover:text-amber-500 mb-4 transition-all">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <span className="text-amber-500 font-bold uppercase tracking-widest text-xs">My Collections</span>
          <h1 className="text-3xl md:text-5xl font-black mt-2 tracking-tight">Saved Trips</h1>
          <p className="text-neutral-400 mt-2">Access your saved itineraries, clone them, or regenerate custom plans.</p>
        </div>

        {/* Saved List Grid */}
        {savedTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedTrips.map((trip) => (
              <div
                key={trip.id}
                className="bg-neutral-900/30 border border-neutral-800/60 rounded-3xl overflow-hidden hover:border-neutral-700 transition-all flex flex-col h-full shadow-lg"
              >
                <div className="h-52 relative overflow-hidden">
                  <img src={trip.image} alt={trip.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/10 flex items-center gap-1 text-white">
                    <Calendar className="h-3.5 w-3.5 text-amber-500" />
                    {trip.days} Days
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-white mb-2 leading-snug hover:text-amber-400 transition-all line-clamp-2">
                      <Link to={`/view-trip/${trip.id}`}>{trip.title}</Link>
                    </h3>
                    <p className="text-xs text-neutral-500 flex items-center gap-1 mb-6">
                      <MapPin className="h-3.5 w-3.5 text-amber-500" />
                      {trip.location}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-900 mt-auto flex flex-col gap-4">
                    <div className="flex justify-between items-center text-xs text-neutral-450">
                      <span>Companion: <b>{trip.traveler || "Couple"}</b></span>
                      <span>Budget: <b className="text-amber-500">{trip.budget}</b></span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReuse(trip.location)}
                        className="flex-grow py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <RefreshCw className="h-3.5 w-3.5" /> Reuse Plan
                      </button>

                      <button
                        onClick={() => handleUnsave(trip.id)}
                        className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-rose-500 hover:bg-rose-500/10 hover:border-rose-500/30 transition-all cursor-pointer"
                        title="Remove Bookmark"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-neutral-500 flex flex-col items-center justify-center bg-neutral-900/10 border border-neutral-850 rounded-3xl p-8 max-w-xl mx-auto">
            <Heart className="h-12 w-12 text-neutral-700 mb-3 animate-pulse" />
            <p className="font-bold text-lg text-white">No saved itineraries yet</p>
            <p className="text-sm text-neutral-600 mt-1 mb-6">Browse the public feed to find and bookmark trips planned by others.</p>
            <Link
              to="/community"
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 font-semibold text-sm transition-all shadow-lg active:scale-95"
            >
              Explore Community Feed
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SavedTrips;
