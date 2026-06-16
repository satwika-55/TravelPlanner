import React, { useState, useEffect } from "react";
import { Heart, MessageCircle, Bookmark, MapPin, Calendar } from "lucide-react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { getAllTrips } from "../services/api.js";
import { toast } from "sonner";

const initialCommunityFeed = [
  {
    id: "trip-paris-101",
    title: "Lisbon streets, Pastéis de Nata, and sunset views",
    location: "Lisbon, Portugal",
    days: 4,
    budget: "€650",
    creator: "maria_travels",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&q=80",
    likes: 1200,
    comments: 48,
    saved: false,
  },
  {
    id: "trip-bali-202",
    title: "Alpine lakes, hiking trails, and slow train rides",
    location: "Swiss Alps, Europe",
    days: 7,
    budget: "$1.2k",
    creator: "alex_hikes",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80",
    likes: 843,
    comments: 22,
    saved: false,
  },
  {
    id: "trip-kyoto-303",
    title: "Tokyo neon lights, hidden ramen spots, and temples",
    location: "Tokyo, Japan",
    days: 5,
    budget: "¥120k",
    creator: "kenji_jp",
    image: "https://images.unsplash.com/photo-1583508915901-b5f84c1dcde1?w=600&q=80",
    likes: 2100,
    comments: 115,
    saved: false,
  },
  {
    id: "trip-cinque-404",
    title: "Cinque Terre coastal hike and seafood pasta",
    location: "Cinque Terre, Italy",
    days: 3,
    budget: "€850",
    creator: "bella_vita",
    image: "https://images.unsplash.com/photo-1516483638261-f4dafaf0092e?w=600&q=80",
    likes: 1500,
    comments: 64,
    saved: false,
  },
  {
    id: "trip-bali-505",
    title: "Bali rice terraces, yoga retreats, and quiet beaches",
    location: "Bali, Indonesia",
    days: 6,
    budget: "$700",
    creator: "zen_traveler",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&q=80",
    likes: 920,
    comments: 34,
    saved: false,
  },
  {
    id: "trip-safari-606",
    title: "Serengeti wildlife safari and glamping experience",
    location: "Serengeti, Tanzania",
    days: 8,
    budget: "$3.5k",
    creator: "wild_steve",
    image: "https://images.unsplash.com/photo-1525159226136-242fae18f620?w=600&q=80",
    likes: 3400,
    comments: 201,
    saved: false,
  },
];

const Community = () => {
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const filters = ["All", "Adventure", "Budget", "Luxury", "Solo", "Couple", "Family", "Cultural"];

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await getAllTrips(1, 20);
      if (response?.trips && response.trips.length > 0) {
        setTrips(response.trips);
        setFilteredTrips(response.trips);
      } else {
        const localFeed = localStorage.getItem("community-trips");
        if (localFeed) {
          const data = JSON.parse(localFeed);
          setTrips(data);
          setFilteredTrips(data);
        } else {
          localStorage.setItem("community-trips", JSON.stringify(initialCommunityFeed));
          setTrips(initialCommunityFeed);
          setFilteredTrips(initialCommunityFeed);
        }
      }
    } catch (error) {
      console.log("Using local data");
      const localFeed = localStorage.getItem("community-trips");
      if (localFeed) {
        const data = JSON.parse(localFeed);
        setTrips(data);
        setFilteredTrips(data);
      } else {
        setTrips(initialCommunityFeed);
        setFilteredTrips(initialCommunityFeed);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTrip = (tripId) => {
    const updated = trips.map((trip) => {
      if (trip.id === tripId) {
        return { ...trip, saved: !trip.saved };
      }
      return trip;
    });
    setTrips(updated);
    setFilteredTrips(updated);
    localStorage.setItem("community-trips", JSON.stringify(updated));
    toast.success("Trip saved!");
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen font-sans">
      <Header />

      {/* Page Header */}
      <div className="border-b border-gray-200 bg-gray-50 pt-28 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-2">Explore Community Trips</h1>
          <p className="text-gray-600 text-lg">Discover itineraries crafted by real travelers, and save your favorites.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filter Bar */}
        <div className="flex gap-3 mb-12 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-all whitespace-nowrap ${
                selectedFilter === filter
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Trip Cards Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-gray-600">Loading trips...</p>
          </div>
        ) : filteredTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredTrips.map((trip) => (
              <div key={trip.id} className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img src={trip.image} alt={trip.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {trip.days} Days
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col h-full">
                  <h3 className="font-bold text-lg mb-3 line-clamp-2">{trip.title}</h3>

                  <div className="text-sm text-gray-600 mb-4 space-y-1">
                    <p className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      {trip.location}
                    </p>
                    <p className="text-xs">
                      by <span className="font-medium">@{trip.creator}</span>
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="pt-4 border-t border-gray-200 mt-auto flex justify-between items-center text-sm">
                    <div className="flex gap-4">
                      <button className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition-all">
                        <Heart className="h-4 w-4" />
                        <span className="text-xs">{(trip.likes / 1000).toFixed(1)}k</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-600 hover:text-blue-500 transition-all">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-xs">{trip.comments}</span>
                      </button>
                    </div>
                    <button
                      onClick={() => handleSaveTrip(trip.id)}
                      className={`transition-all ${
                        trip.saved ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                      }`}
                    >
                      <Bookmark className="h-4 w-4" fill={trip.saved ? "currentColor" : "none"} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No trips found</p>
          </div>
        )}

        {/* Load More Button */}
        <div className="text-center">
          <button className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium transition-all">
            Load More Trips
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Community;