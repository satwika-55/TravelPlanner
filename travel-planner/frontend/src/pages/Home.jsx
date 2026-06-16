import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Sparkles, Users, ArrowRight, Heart, MessageCircle, Bookmark } from "lucide-react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const Home = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState({});

  const destinations = [
    { name: "Kyoto, Japan", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80", price: "$1,200" },
    { name: "Road Trips", image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80", price: "$400" },
    { name: "Serengeti", image: "https://images.unsplash.com/photo-1525159226136-242fae18f620?w=600&q=80", price: "$2,500" },
    { name: "Swiss Alps", image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&q=80", price: "$1,800" },
    { name: "Cinque Terre", image: "https://images.unsplash.com/photo-1516483638261-f4dafaf0092e?w=600&q=80", price: "$1,400" },
    { name: "Bali", image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&q=80", price: "$900" },
  ];

  const trendingTrips = [
    {
      title: "Lisbon streets, Pastéis de Nata, and sunset views",
      author: "@maria_travels",
      price: "€650",
      days: "4 days",
      image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&q=80",
      likes: "1.2k",
      comments: "48"
    },
    {
      title: "Alpine lakes, hiking trails, and slow train rides",
      author: "@alex_hikes",
      price: "$1.2k",
      days: "7 days",
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80",
      likes: "843",
      comments: "22"
    },
    {
      title: "Tokyo neon lights, hidden ramen spots, and temples",
      author: "@kenji_jp",
      price: "¥120k",
      days: "5 days",
      image: "https://images.unsplash.com/photo-1583508915901-b5f84c1dcde1?w=600&q=80",
      likes: "2.1k",
      comments: "115"
    },
  ];

  const steps = [
    { icon: "🗺️", title: "1. Choose a Destination", desc: "Pick any place on Earth. Or let us surprise you with trending spots based on your style." },
    { icon: "✨", title: "2. AI Crafts Your Itinerary", desc: "Our intelligent engine builds a personalized day-by-day plan tailored to your budget and pace." },
    { icon: "👥", title: "3. Share & Explore", desc: "Publish your trips to the community, discover hidden gems, and save ideas for the future." },
  ];

  const masonryItems = [
    "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=80",
    "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=600&q=80",
    "https://images.unsplash.com/photo-1513635269975-59693e0cd8ce?w=600&q=80",
    "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80",
    "https://images.unsplash.com/photo-1533050487297-09b450131914?w=600&q=80",
    "https://images.unsplash.com/photo-1502602861254-8c7c917036fb?w=600&q=80",
  ];

  return (
    <div className="bg-white text-gray-900 min-h-screen font-sans">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center text-center overflow-hidden pt-20">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1499678329028-101435549a4e?w=1920&q=80"
        >
          <source src="https://cdn.coverr.co/videos/coverr-surfing-through-the-ocean-waves-4264/1080p/mp4/file.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/25 to-black/55 z-10" />

        <div className="relative z-20 max-w-2xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Discover Places That Move You</h1>
          <p className="text-xl text-white/90 mb-8">Plan trips with AI. Get inspired by real travelers. Go anywhere.</p>
          <button
            onClick={() => navigate("/create-trip")}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all"
          >
            Start Planning <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-4">Popular Destinations</h2>
          <p className="text-gray-600 text-lg">Explore the most breathtaking locations currently trending among Voyara travelers.</p>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 auto-rows-[250px]">
          {destinations.map((dest, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl overflow-hidden cursor-pointer group ${
                idx === 0 ? "col-span-2 row-span-2" : idx === 3 ? "col-span-2" : ""
              }`}
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-2xl font-bold">{dest.name}</h3>
                  <span className="text-sm text-white/80">from {dest.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 text-lg">Your next journey is just a few clicks away. Here is how Voyara makes travel planning effortless.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl mb-4">{step.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wanderlust Gallery */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-4">Wanderlust Gallery</h2>
          <p className="text-gray-600 text-lg">Get lost in moments captured around the globe.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {masonryItems.map((img, idx) => (
            <div key={idx} className="rounded-2xl overflow-hidden group cursor-pointer h-64">
              <img
                src={img}
                alt={`Gallery ${idx}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Trending in Community */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-4">Trending in the Community</h2>
            <p className="text-gray-600 text-lg">See what others are planning and get inspired for your next getaway.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {trendingTrips.map((trip, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img src={trip.image} alt={trip.title} className="w-full h-56 object-cover" />
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{trip.title}</h3>
                  <div className="text-sm text-gray-600 mb-4 flex items-center gap-2">
                    <span>{trip.author}</span> • <span>{trip.price}</span> • <span>{trip.days}</span>
                  </div>
                  <div className="flex gap-4 pt-4 border-t border-gray-200">
                    <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-500 transition-all">
                      <Heart className="h-4 w-4" /> {trip.likes}
                    </button>
                    <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-500 transition-all">
                      <MessageCircle className="h-4 w-4" /> {trip.comments}
                    </button>
                    <button className="ml-auto text-gray-600 hover:text-blue-500 transition-all">
                      <Bookmark className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate("/community")}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all"
            >
              View All Trips <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="bg-blue-600 text-white rounded-2xl p-16 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to plan your next adventure?</h2>
          <button
            onClick={() => navigate("/create-trip")}
            className="px-8 py-3 rounded-lg bg-white hover:bg-gray-100 text-blue-600 font-semibold transition-all"
          >
            Get Started Free
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;