import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Calendar, Trash2, Copy, RefreshCw, Share2, Compass, ArrowLeft } from "lucide-react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { toast } from "sonner";

const MyTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulated short delay to show beautiful skeletons
    setTimeout(() => {
      const storedTrips = localStorage.getItem("my-trips");
      if (storedTrips) {
        setTrips(JSON.parse(storedTrips));
      }
      setLoading(false);
    }, 800);
  }, []);

  const saveTrips = (updatedTrips) => {
    setTrips(updatedTrips);
    localStorage.setItem("my-trips", JSON.stringify(updatedTrips));
  };

  const handleDelete = (tripId, e) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = trips.filter((t) => t.id !== tripId);
    saveTrips(updated);
    toast.success("Trip deleted successfully");
  };

  const handleDuplicate = (trip, e) => {
    e.preventDefault();
    e.stopPropagation();
    const duplicated = {
      ...trip,
      id: Date.now().toString(),
      userselection: {
        ...trip.userselection
      },
      tripdata: {
        ...trip.tripdata
      },
      createdAt: new Date().toISOString()
    };
    const updated = [duplicated, ...trips];
    saveTrips(updated);
    toast.success("Trip duplicated successfully!");
  };

  const handleRegenerate = (trip, e) => {
    e.preventDefault();
    e.stopPropagation();
    // Prefill home page and scroll to generator
    navigate("/", {
      state: {
        prefilledLocation: trip.userselection.location,
        prefilledDays: trip.userselection.days,
        prefilledBudget: trip.userselection.budget,
        prefilledTraveler: trip.userselection.traveler,
        prefilledStyle: trip.userselection.style
      }
    });
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const handleShare = (tripId, e) => {
    e.preventDefault();
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/view-trip/${tripId}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Public link copied to clipboard!");
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
          <span className="text-amber-500 font-bold uppercase tracking-widest text-xs">Your Adventure History</span>
          <h1 className="text-3xl md:text-5xl font-black mt-2 tracking-tight">My Trips</h1>
          <p className="text-neutral-400 mt-2">Manage your generated travel itineraries, duplicate options, or start a new plan.</p>
        </div>

        {/* Trips Grid / Skeletons / Empty state */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 w-full bg-neutral-900 border border-neutral-800 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : trips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trips.map((trip) => {
              // Custom fallback images for popular destinations if they don't have images
              let imageUrl = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80"; // default fallback
              const loc = trip.userselection?.location?.toLowerCase() || "";
              if (loc.includes("paris")) imageUrl = "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80";
              else if (loc.includes("finland") || loc.includes("lapland")) imageUrl = "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=600&q=80";
              else if (loc.includes("kyoto") || loc.includes("japan")) imageUrl = "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80";
              else if (loc.includes("swiss") || loc.includes("switzerland")) imageUrl = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80";
              else if (loc.includes("dubai")) imageUrl = "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80";
              else if (loc.includes("bali")) imageUrl = "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80";
              else if (loc.includes("delhi") || loc.includes("india")) imageUrl = "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=80";
              else if (loc.includes("rio") || loc.includes("brazil")) imageUrl = "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=600&q=80";

              return (
                <Link
                  to={`/view-trip/${trip.id}`}
                  key={trip.id}
                  className="bg-neutral-900/30 border border-neutral-800/60 rounded-3xl overflow-hidden hover:border-neutral-700 transition-all flex flex-col h-full shadow-lg"
                >
                  <div className="h-52 relative overflow-hidden">
                    <img src={imageUrl} alt={trip.userselection?.location} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/10 flex items-center gap-1 text-white">
                      <Calendar className="h-3.5 w-3.5 text-amber-500" />
                      {trip.userselection?.days} Days
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-white mb-2 leading-snug hover:text-amber-400 transition-all truncate">
                        Trip to {trip.userselection?.location || "Unknown"}
                      </h3>
                      <p className="text-xs text-neutral-500 flex items-center gap-1 mb-4">
                        <MapPin className="h-3.5 w-3.5 text-amber-500" />
                        {trip.userselection?.location || "Unknown"}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-neutral-900 mt-auto flex flex-col gap-4">
                      <div className="flex justify-between items-center text-xs text-neutral-450">
                        <span>Companion: <b>{trip.userselection?.traveler || "Couple"}</b></span>
                        <span>Budget: <b className="text-amber-500">{trip.userselection?.budget || "Moderate"}</b></span>
                      </div>

                      {/* CRUD Buttons */}
                      <div className="flex gap-2">
                        {/* Share */}
                        <button
                          onClick={(e) => handleShare(trip.id, e)}
                          className="flex-grow py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                          title="Copy Share Link"
                        >
                          <Share2 className="h-3.5 w-3.5" /> Share
                        </button>

                        {/* Regenerate */}
                        <button
                          onClick={(e) => handleRegenerate(trip, e)}
                          className="p-2 bg-neutral-900 border border-neutral-800 text-amber-500 hover:bg-amber-500/10 hover:border-amber-500/30 rounded-xl transition-all cursor-pointer"
                          title="Regenerate Itinerary"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </button>

                        {/* Duplicate */}
                        <button
                          onClick={(e) => handleDuplicate(trip, e)}
                          className="p-2 bg-neutral-900 border border-neutral-800 text-blue-400 hover:bg-blue-400/10 hover:border-blue-400/30 rounded-xl transition-all cursor-pointer"
                          title="Duplicate Plan"
                        >
                          <Copy className="h-4 w-4" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={(e) => handleDelete(trip.id, e)}
                          className="p-2 bg-neutral-900 border border-neutral-800 text-rose-500 hover:bg-rose-500/10 hover:border-rose-500/30 rounded-xl transition-all cursor-pointer"
                          title="Delete Plan"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center text-neutral-500 flex flex-col items-center justify-center bg-neutral-900/10 border border-neutral-850 rounded-3xl p-8 max-w-xl mx-auto">
            <Compass className="h-12 w-12 text-neutral-700 mb-3 animate-bounce" />
            <p className="font-bold text-lg text-white">No itineraries generated yet</p>
            <p className="text-sm text-neutral-600 mt-1 mb-6">Start entering preferences on the home page to build your custom trip plan.</p>
            <Link
              to="/"
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 font-semibold text-sm transition-all shadow-lg active:scale-95"
            >
              Start Planning Now
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MyTrips;
