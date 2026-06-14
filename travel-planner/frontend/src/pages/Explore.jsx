import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Star, Compass, ArrowLeft, Search, Filter } from "lucide-react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const exploreDestinations = [
  { name: "Paris", country: "France", category: "Cities", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80", score: "9.8", budget: "$$$", season: "Spring", desc: "The ultimate cultural capital, famous for landmarks like the Eiffel Tower and rich gastronomic experiences." },
  { name: "Bali", country: "Indonesia", category: "Beaches", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80", score: "9.6", budget: "$", season: "Dry Season (April - Oct)", desc: "A tropical oasis featuring sandy beaches, stunning volcanic cliffs, Hindu temples, and surfing." },
  { name: "Switzerland", country: "Europe", category: "Mountains", image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80", score: "9.7", budget: "$$$$", season: "Winter/Summer", desc: "Famed for its breathtaking Alpine valleys, snowy slopes, and pristine lakes perfect for hiking or skiing." },
  { name: "Iceland", country: "Atlantic", category: "Nature", image: "https://images.unsplash.com/photo-1504893524553-ac55fce698be?auto=format&fit=crop&w=600&q=80", score: "9.5", budget: "$$$", season: "Winter (Northern Lights)", desc: "A land of fire and ice, boasting volcanoes, geothermal hot springs, glaciers, and black sand beaches." },
  { name: "Tokyo", country: "Japan", category: "Cities", image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80", score: "9.9", budget: "$$$", season: "Autumn/Spring", desc: "A neon-lit mega-metropolis blending futuristic technologies with ancient shrines and cherry blossoms." },
  { name: "Dubai", country: "UAE", category: "Luxury", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80", score: "9.4", budget: "$$$$", season: "Winter (Nov - March)", desc: "A futuristic skyline in the Arabian desert, featuring luxury hotels, indoor ski parks, and sand dunes." },
  { name: "Lapland", country: "Finland", category: "Snow Escapes", image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=600&q=80", score: "9.6", budget: "$$$", season: "Winter (Dec - March)", desc: "Experience sleigh rides, view the northern lights, and sleep under glass igloos in a snowy fairy tale." },
  { name: "Kyoto", country: "Japan", category: "Cities", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80", score: "9.8", budget: "$$$", season: "Spring (Cherry Blossoms)", desc: "Japan's ancient imperial capital featuring grand temple gardens, geisha quarters, and wooden shrines." },
  { name: "Rio de Janeiro", country: "Brazil", category: "Nature", image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=600&q=80", score: "9.4", budget: "$$", season: "Summer (Dec - March)", desc: "Vibrant beach cultures, Christ the Redeemer, lush tropical mountains, and carnival beats." },
  { name: "Queenstown", country: "New Zealand", category: "Adventure", image: "https://images.unsplash.com/photo-1589871189143-a1410c611ff2?auto=format&fit=crop&w=600&q=80", score: "9.6", budget: "$$$", season: "Summer/Winter", desc: "The global adventure capital offering bungee jumping, skydiving, jet boating, and fjord tours." },
  { name: "Machu Picchu", country: "Peru", category: "Backpacking", image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=600&q=80", score: "9.7", budget: "$$", season: "Dry Season (May - Sep)", desc: "Ancient 15th-century Inca citadel built high on mountain ridges, a backpacker bucket-list hike." }
];

const categories = ["All", "Beaches", "Mountains", "Cities", "Snow Escapes", "Nature", "Backpacking", "Adventure", "Luxury"];

const Explore = () => {
  const [selectedCat, setSelectedCat] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredDestinations = exploreDestinations.filter((dest) => {
    const matchesCat = selectedCat === "All" || dest.category === selectedCat;
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dest.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handlePlanTrip = (destName) => {
    // Navigate back to home page with destination search trigger
    navigate("/", { state: { prefilledLocation: destName } });
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <Header />

      <main className="pt-28 pb-20 max-w-7xl mx-auto px-6">
        {/* Intro */}
        <div className="mb-10 text-left">
          <Link to="/" className="flex items-center gap-1 text-sm text-neutral-500 hover:text-amber-500 mb-4 transition-all">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <span className="text-amber-500 font-bold uppercase tracking-widest text-xs">Discovery Hub</span>
          <h1 className="text-3xl md:text-5xl font-black mt-2 tracking-tight">Explore the World</h1>
          <p className="text-neutral-400 mt-2">Find trending cities, snowy mountains, tropical islands, and adventure paths.</p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-neutral-500" />
            <input
              type="text"
              placeholder="Search destination or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-all"
            />
          </div>

          {/* Category scrolling list on mobile, grid on desktop */}
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                  selectedCat === cat
                    ? "bg-amber-500 text-neutral-950"
                    : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Destination Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.length > 0 ? (
            filteredDestinations.map((dest, idx) => (
              <div key={idx} className="bg-neutral-900/40 border border-neutral-850 rounded-2xl overflow-hidden hover:border-amber-500/25 transition-all flex flex-col h-full">
                <div className="h-56 relative overflow-hidden">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-all hover:scale-105 duration-300" />
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-xs font-bold flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                    {dest.score}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/10 text-amber-400">
                    {dest.category}
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-xl text-white mb-1">{dest.name}</h3>
                    <p className="text-xs text-neutral-500 flex items-center gap-1 mb-4">
                      <MapPin className="h-3.5 w-3.5 text-amber-500" /> {dest.country}
                    </p>
                    <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                      {dest.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-850 mt-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-neutral-400">
                    <div className="flex flex-col gap-1">
                      <span>Avg Budget: <b className="text-white">{dest.budget}</b></span>
                      <span>Best Time: <b className="text-white">{dest.season}</b></span>
                    </div>
                    <button
                      onClick={() => handlePlanTrip(dest.name)}
                      className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold transition-all active:scale-95 flex items-center gap-1"
                    >
                      Plan Trip <Compass className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-neutral-500 flex flex-col items-center justify-center">
              <Compass className="h-12 w-12 text-neutral-600 mb-3 animate-bounce" />
              <p className="font-bold text-lg">No destinations found matching your filters.</p>
              <p className="text-sm text-neutral-600">Try modifying your search text or select "All" categories.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Explore;
