import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bookmark } from "lucide-react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { toast } from "sonner";
import { getSavedTrips } from "../services/api.js";

const SavedTrips = () => {
  const [savedTrips, setSavedTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSavedTrips();
  }, []);

  const fetchSavedTrips = async () => {
    try {
      const userString = localStorage.getItem("user");
      if (!userString) {
        setLoading(false);
        return;
      }

      const user = JSON.parse(userString);
      const trips = await getSavedTrips(user.email);
      setSavedTrips(trips || []);
    } catch (error) {
      console.error("Error fetching saved trips:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen font-sans">
      <Header />

      {/* Page Header */}
      <div className="border-b border-gray-200 bg-gray-50 pt-28 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-2">Saved Trips</h1>
          <p className="text-gray-600 text-lg">Your curated collection of dream destinations and upcoming adventures.</p>
        </div>
      </div>

      {/* Content */}
      <div className="min-h-[50vh] max-w-7xl mx-auto px-6 py-12 flex items-center justify-center">
        {loading ? (
          <p className="text-gray-600">Loading saved trips...</p>
        ) : savedTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {savedTrips.map((trip) => (
              <div key={trip.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
                <img
                  src={`https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80`}
                  alt={trip.userselection?.location}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">Trip to {trip.userselection?.location}</h3>
                  <p className="text-sm text-gray-600 mb-4">{trip.userselection?.days} days • {trip.userselection?.budget} budget</p>
                  <Link
                    to={`/view-trip/${trip.id}`}
                    className="inline-block px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-all"
                  >
                    View Trip
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Bookmark className="h-16 w-16 text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No saved trips yet</h3>
            <p className="text-gray-600 mb-8">Explore the community and save itineraries that inspire your next journey.</p>
            <button
              onClick={() => navigate("/community")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all"
            >
              Browse Trips
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SavedTrips;
