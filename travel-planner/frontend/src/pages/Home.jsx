import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, ChevronLeft, ChevronRight, ArrowRight, Star, Users, Heart, Globe
} from "lucide-react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const carouselDestinations = [
  {
    city: "Paris",
    country: "France",
    theme: "Romantic",
    headline: "DISCOVER",
    destination: "PARIS",
    tagline: "LIKE NEVER BEFORE",
    description: "Wander through historic cobblestone alleys, admire masterpiece art, enjoy café culture, and cruise along the Seine under the golden glow of the Eiffel Tower.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1920&q=80",
  },
  {
    city: "Lapland",
    country: "Finland",
    theme: "Snow & Northern Lights",
    headline: "DISCOVER",
    destination: "FINLAND",
    tagline: "LIKE NEVER BEFORE",
    description: "Stay in luxury glass igloos beneath the dancing Aurora Borealis, embark on husky safaris through snow pine forests.",
    image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1920&q=80",
  },
  {
    city: "Kyoto",
    country: "Japan",
    theme: "Traditional & Scenic",
    headline: "EXPERIENCE",
    destination: "KYOTO",
    tagline: "THE MAGIC OF",
    description: "Walk through majestic towering bamboo groves, experience tea ceremonies in geisha districts, and admire golden pavilions.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1920&q=80",
  },
  {
    city: "Switzerland",
    country: "Europe",
    theme: "Alpine Mountains",
    headline: "EXPLORE",
    destination: "SWITZERLAND",
    tagline: "THE ALPS",
    description: "Board scenic red trains climbing snow-capped peaks, cruise emerald alpine lakes, and stay in wooden chalets.",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1920&q=80",
  },
  {
    city: "Bali",
    country: "Indonesia",
    theme: "Tropical Escape",
    headline: "EMBRACE",
    destination: "BALI",
    tagline: "THE PARADISE",
    description: "Rejuvenate in jungle infinity pools overlooking tiered rice terraces, surf golden sandy beaches.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1920&q=80",
  },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoSlideTimer = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const startAutoSlide = () => {
    stopAutoSlide();
    autoSlideTimer.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselDestinations.length);
    }, 6000);
  };

  const stopAutoSlide = () => {
    if (autoSlideTimer.current) {
      clearInterval(autoSlideTimer.current);
    }
  };

  const handleNextSlide = () => {
    stopAutoSlide();
    setCurrentSlide((prev) => (prev + 1) % carouselDestinations.length);
    startAutoSlide();
  };

  const handlePrevSlide = () => {
    stopAutoSlide();
    setCurrentSlide((prev) => (prev - 1 + carouselDestinations.length) % carouselDestinations.length);
    startAutoSlide();
  };

  const trendingDestinations = [
    { name: "Paris", country: "France", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80", score: "9.8" },
    { name: "Bali", country: "Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80", score: "9.6" },
    { name: "Switzerland", country: "Europe", image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=400&q=80", score: "9.7" },
    { name: "Tokyo", country: "Japan", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80", score: "9.9" },
    { name: "Dubai", country: "UAE", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=80", score: "9.4" },
    { name: "Iceland", country: "Atlantic", image: "https://images.unsplash.com/photo-1504893524553-ac55fce698be?auto=format&fit=crop&w=400&q=80", score: "9.5" }
  ];

  return (
    <div className="bg-black text-white min-h-screen font-sans relative overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image Carousel */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${carouselDestinations[currentSlide].image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-6 w-full z-10 flex flex-col items-center lg:items-start lg:text-left text-center">
          <div className="lg:max-w-2xl">
            <span className="text-amber-500 font-bold tracking-[0.3em] text-xs uppercase mb-6 inline-flex items-center gap-2 bg-amber-500/10 px-4 py-2 rounded-full border border-amber-500/20">
              <Sparkles className="h-3 w-3 animate-pulse" />
              {carouselDestinations[currentSlide].theme}
            </span>

            {/* Headline */}
            <div className="mb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -80, opacity: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-2">
                    <span className="block text-white/90">{carouselDestinations[currentSlide].headline}</span>
                    <span className="block bg-gradient-to-r from-amber-400 via-amber-500 to-rose-500 bg-clip-text text-transparent">
                      {carouselDestinations[currentSlide].destination}
                    </span>
                  </h1>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-lg md:text-xl mb-12 leading-relaxed font-light">
              {carouselDestinations[currentSlide].description}
            </p>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/create-trip")}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-bold text-lg shadow-lg shadow-rose-500/30 transition-all cursor-pointer"
            >
              <span>Start Planning Your Trip</span>
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </div>
        </div>

        {/* Carousel Controls */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {carouselDestinations.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                idx === currentSlide ? "bg-amber-500 w-8" : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Trending Destinations */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">Trending Destinations</h2>
          <p className="text-gray-400 text-lg">Discover the most popular travel spots right now</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingDestinations.map((dest, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8 }}
              className="rounded-2xl overflow-hidden group cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold mb-1">{dest.name}</h3>
                  <p className="text-gray-300 text-sm mb-3">{dest.country}</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                    <span className="text-amber-500 font-bold">{dest.score}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-amber-500/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-center">Why Choose Us</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Globe className="h-12 w-12" />, title: "AI-Powered", desc: "Smart algorithms create personalized itineraries" },
              { icon: <Users className="h-12 w-12" />, title: "Community Driven", desc: "Learn from millions of real traveler experiences" },
              { icon: <Heart className="h-12 w-12" />, title: "Budget Friendly", desc: "Plans tailored to your budget and travel style" }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all"
              >
                <div className="text-amber-500 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-gradient-to-r from-amber-500/10 to-rose-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Explore?</h2>
          <p className="text-gray-300 text-xl mb-8">Let AI create your perfect travel itinerary in seconds</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/create-trip")}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-bold text-lg shadow-lg shadow-rose-500/30 transition-all cursor-pointer"
          >
            <span>Create Your Trip Now</span>
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
