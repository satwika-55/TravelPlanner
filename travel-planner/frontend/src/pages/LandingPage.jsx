import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass, Heart, Users, Calendar, DollarSign, Star, MessageSquare,
  Share2, ChevronLeft, ChevronRight, CheckCircle2, ChevronDown,
  ArrowRight, ShieldCheck, Sparkles, MapPin, Smile, Globe, Plane
} from "lucide-react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { chatSession } from "../service/AIModal";
import { AI_PROMT } from "../constants/options";
import { toast } from "sonner";

// Hero Destinations
const carouselDestinations = [
  {
    city: "Paris",
    country: "France",
    theme: "Romantic",
    title: "Discover Paris Like Never Before",
    subtitle: "The City of Light & Love",
    description: "Wander through historic cobblestone alleys, admire masterpiece art, enjoy café culture, and cruise along the Seine under the golden glow of the Eiffel Tower.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1920&q=80",
    stats: { rating: "4.9", countries: "120+", trips: "50K+", destinations: "10K+" }
  },
  {
    city: "Lapland",
    country: "Finland",
    theme: "Snow & Northern Lights",
    title: "Experience The Magic Of Finland",
    subtitle: "Wonders of the Arctic Circle",
    description: "Stay in luxury glass igloos beneath the dancing Aurora Borealis, embark on husky safaris through snow pine forests, and experience the pristine Finnish wilderness.",
    image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1920&q=80"
  },
  {
    city: "Kyoto",
    country: "Japan",
    theme: "Traditional & Scenic",
    title: "Witness The Serenity Of Kyoto",
    subtitle: "Legacy of Temples & Gardens",
    description: "Walk through majestic towering bamboo groves, experience tea ceremonies in geisha districts, and admire golden pavilions reflecting on tranquil waters.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1920&q=80"
  },
  {
    city: "Switzerland",
    country: "Europe",
    theme: "Alpine Mountains",
    title: "Explore Alpine Valleys",
    subtitle: "Peak of Natural Splendor",
    description: "Board scenic red trains climbing snow-capped peaks, cruise emerald alpine lakes, and stay in wooden chalets surrounded by wildflowers and ringing bells.",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1920&q=80"
  },
  {
    city: "Dubai",
    country: "UAE",
    theme: "Luxury & Innovation",
    title: "Indulge In The Grandeur Of Dubai",
    subtitle: "Oasis of Modern Marvels",
    description: "Scale the sky-high Burj Khalifa, shop in futuristic mega-malls, cruise in private yachts, and race across golden desert dunes on a luxury sunset safari.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80"
  },
  {
    city: "Bali",
    country: "Indonesia",
    theme: "Tropical Escape",
    title: "Embrace The Healing Charm of Bali",
    subtitle: "Island of Peace & Temples",
    description: "Rejuvenate in jungle infinity pools overlooking tiered rice terraces, surf golden sandy beaches, and explore thousands of majestic cliffside stone shrines.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1920&q=80"
  },
  {
    city: "Delhi",
    country: "India",
    theme: "Cultural & Historical",
    title: "Experience Cultural Heritage",
    subtitle: "Epicenter of Empires & Spices",
    description: "Explore massive sandstone forts, wander old bazaar lanes aromatic with cardamoms, and marvel at marble domes honoring ancient Mughal legacies.",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1920&q=80"
  },
  {
    city: "Rio de Janeiro",
    country: "Brazil",
    theme: "Tropical & Rainforest",
    title: "Embrace The Pulse Of Rio",
    subtitle: "Where Mountain Meets Ocean",
    description: "Ride cable cars up Sugarloaf Mountain, feel the rhythms of samba along Copacabana Beach, and stand beneath the open arms of Christ the Redeemer.",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1920&q=80"
  }
];

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [place, setPlace] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [budget, setBudget] = useState("Moderate");
  const [traveler, setTraveler] = useState("Couple");
  const [days, setDays] = useState(5);
  const [travelStyle, setTravelStyle] = useState("Romantic");
  
  const [generating, setGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const generationTimer = useRef(null);
  const autoSlideTimer = useRef(null);

  const navigate = useNavigate();

  // Auto slide effect
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

  const selectSlide = (index) => {
    stopAutoSlide();
    setCurrentSlide(index);
    startAutoSlide();
  };

  // Place Suggestions Autocomplete
  const fetchSuggestions = async (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    setSuggestionsLoading(true);
    try {
      const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY || "free";
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${apiKey}`
      );
      const data = await response.json();
      setSuggestions(data.features || []);
    } catch (error) {
      console.error("Error fetching place suggestions:", error);
    }
    setSuggestionsLoading(false);
  };

  const handlePlaceChange = (e) => {
    const val = e.target.value;
    setPlace(val);
    fetchSuggestions(val);
  };

  const selectSuggestion = (formattedName) => {
    setPlace(formattedName);
    setSuggestions([]);
  };

  // Simulated Generation Steps
  const generationSteps = [
    "Consulting RoamAI recommendation engine...",
    "Curating customized hotels matching your budget...",
    "Structuring day-by-day sightseeing activities...",
    "Selecting dining spots and ticket pricing...",
    "Finalizing route maps and travel durations..."
  ];

  const handleGenerateTrip = async () => {
    if (!place.trim()) {
      toast.error("Please enter a destination to start planning.");
      return;
    }
    if (days < 1 || days > 15) {
      toast.error("Please select a trip duration between 1 and 15 days.");
      return;
    }

    setGenerating(true);
    setGenerationStep(0);

    // Increment loader steps
    let step = 0;
    generationTimer.current = setInterval(() => {
      step += 1;
      if (step < generationSteps.length) {
        setGenerationStep(step);
      } else {
        clearInterval(generationTimer.current);
      }
    }, 1100);

    try {
      // Save current user selection in local variables
      const selection = {
        location: place,
        days: days,
        budget: budget,
        traveler: traveler,
        style: travelStyle
      };

      const finalPrompt = AI_PROMT
        .replace("{location}", place)
        .replace("{days}", days)
        .replace("{traveler}", traveler)
        .replace("{budget}", budget);

      const hasApiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
      let tripdataJSON = "";

      if (hasApiKey) {
        // Run real Gemini API
        const result = await chatSession.sendMessage(finalPrompt);
        tripdataJSON = result?.response?.text();
      } else {
        // Simulated premium response fallback
        await new Promise((resolve) => setTimeout(resolve, 5500));
        
        // Let's create a beautiful preset mock itinerary matching their inputs
        const mockResponse = {
          hotels: [
            {
              HotelName: `Grand Plaza Resort ${place}`,
              "Hotel address": `101 Prime Blvd, ${place}`,
              Price: budget === "Cheap" ? "$45/night" : budget === "Moderate" ? "$150/night" : "$450/night",
              rating: "4.8",
              descriptions: "A magnificent retreat offering modern rooms, exceptional hospitality, and an oasis swimming pool."
            },
            {
              HotelName: `The Boulevard Inn ${place}`,
              "Hotel address": `500 Central Avenue, ${place}`,
              Price: budget === "Cheap" ? "$30/night" : budget === "Moderate" ? "$110/night" : "$320/night",
              rating: "4.6",
              descriptions: "A charming boutique hotel situated close to popular shopping plazas and local historical highlights."
            }
          ],
          itinerary: {}
        };

        // Populate itinerary based on requested days
        for (let i = 1; i <= days; i++) {
          mockResponse.itinerary[`day${i}`] = {
            placeName: i === 1 ? `Historic Square & City Center` : i === 2 ? `Main Art Museum & Local Gardens` : i === 3 ? `Scenic Viewpoint Peak` : `Charming Neighborhood Walk`,
            "Place Details": `Spend the day exploring the beautiful highlights of ${place}. Experience the native culture, authentic food stalls, and purchase local handicrafts.`,
            rating: (4.5 + Math.random() * 0.5).toFixed(1),
            "ticket Pricing": budget === "Cheap" ? "Free" : "€15 - €30",
            timeToVisit: i % 2 === 0 ? "10:00 AM - 2:00 PM" : "3:00 PM - 7:00 PM"
          };
        }

        tripdataJSON = JSON.stringify(mockResponse);
      }

      // Store in localStorage
      const user = JSON.parse(localStorage.getItem("user")) || { email: "demo@roamai.com", name: "Guest Traveler" };
      const docid = Date.now().toString();
      const newTrip = {
        userselection: selection,
        tripdata: JSON.parse(tripdataJSON),
        userEmail: user?.email || "demo@roamai.com",
        id: docid,
        createdAt: new Date().toISOString()
      };

      // Add to local my-trips array
      const existingTrips = JSON.parse(localStorage.getItem("my-trips")) || [];
      existingTrips.unshift(newTrip);
      localStorage.setItem("my-trips", JSON.stringify(existingTrips));

      // Also publish to simulated community feed
      const communityTrips = JSON.parse(localStorage.getItem("community-trips")) || [];
      communityTrips.unshift({
        ...newTrip,
        likes: 12,
        dislikes: 0,
        likedBy: [],
        dislikedBy: [],
        comments: [],
        savedBy: [],
        creator: user
      });
      localStorage.setItem("community-trips", JSON.stringify(communityTrips));

      setGenerating(false);
      navigate(`/view-trip/${docid}`);
      toast.success("Itinerary generated successfully!");
    } catch (error) {
      clearInterval(generationTimer.current);
      setGenerating(false);
      console.error("Failed to generate trip:", error);
      toast.error("Failed to generate trip. Please try again.");
    }
  };

  // Budget Options
  const budgetOptions = [
    { title: "Cheap", icon: "💸", desc: "Budget friendly" },
    { title: "Moderate", icon: "💵", desc: "Mid range balance" },
    { title: "Expensive", icon: "💎", desc: "Luxury indulgence" }
  ];

  // Traveler Options
  const travelerOptions = [
    { title: "Just Me", icon: "🧍🏾‍♂️", desc: "Solo explorer" },
    { title: "Couple", icon: "❤️", desc: "Romantic duo" },
    { title: "Family", icon: "🏠", desc: "Group adventure" },
    { title: "Friends", icon: "👯‍♂️", desc: "Exploration squad" }
  ];

  // Travel Styles
  const travelStyles = ["Romantic", "Adventure", "Cultural", "Luxury", "Nature", "Backpacking", "Beach", "Snow"];

  // FAQS
  const faqData = [
    {
      q: "How does the RoamAI Trip Planner generate itineraries?",
      a: "Our system combines your preferences (destination, budget, travel style, duration, and companion) with generative AI models to construct a custom-tailored plan mapping top hotel ratings, ticket pricing, and optimized routes."
    },
    {
      q: "Can I customize the generated itineraries afterwards?",
      a: "Yes! Once generated, you can save, duplicate, edit, or regenerate specific days and places in your itinerary to perfectly suit your schedules."
    },
    {
      q: "Is there a limit on how many days I can plan?",
      a: "Currently, our planner supports generating highly-detailed itineraries for trips spanning 1 to 15 days, which ensures optimized recommendations."
    },
    {
      q: "Can I share my itineraries with friends?",
      a: "Absolutely. Every itinerary includes a dedicated share button that copies a public link to your plan, allowing anyone to view or duplicate it for their own trips."
    }
  ];

  const [activeFaq, setActiveFaq] = useState(null);

  // Trending Destinations list
  const trendingDestinations = [
    { name: "Paris", country: "France", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80", score: "9.8", budget: "$$$", season: "Spring" },
    { name: "Bali", country: "Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80", score: "9.6", budget: "$", season: "Dry Season" },
    { name: "Switzerland", country: "Europe", image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=400&q=80", score: "9.7", budget: "$$$$", season: "Winter/Summer" },
    { name: "Iceland", country: "Atlantic", image: "https://images.unsplash.com/photo-1504893524553-ac55fce698be?auto=format&fit=crop&w=400&q=80", score: "9.5", budget: "$$$", season: "Winter" },
    { name: "Tokyo", country: "Japan", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80", score: "9.9", budget: "$$$", season: "Autumn/Spring" },
    { name: "Dubai", country: "UAE", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=80", score: "9.4", budget: "$$$$", season: "Winter" }
  ];

  // Travel Categories list
  const travelCategories = [
    { title: "Beaches", emoji: "🏖️", count: "1,200+ spots" },
    { title: "Mountains", emoji: "🏔️", count: "850+ routes" },
    { title: "Cities", emoji: "🌆", count: "1,500+ guides" },
    { title: "Snow Escapes", emoji: "❄️", count: "340+ chalets" },
    { title: "Nature", emoji: "🌿", count: "920+ reserves" },
    { title: "Backpacking", emoji: "🎒", count: "1,100+ itineraries" },
    { title: "Adventure", emoji: "🎉", count: "650+ trails" },
    { title: "Luxury", emoji: "💎", count: "480+ getaways" }
  ];

  // Testimonials list
  const testimonials = [
    { name: "Sarah Jenkins", role: "Solo Backpacker", quote: "RoamAI planned my 10-day trip to Japan flawlessly. It suggested temples in Kyoto I had never found in guidebooks!", rating: 5, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" },
    { name: "David & Emma", role: "Honeymooners", quote: "The Romantic Paris itinerary was perfect. The hotel matches fit our budget, and the daily activity routes saved us hours.", rating: 5, avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80" },
    { name: "Marcus Thorne", role: "Adventure Guide", quote: "Super clean layout, and the AI output actually matches practical travel timings. Highly recommended startup platform.", rating: 5, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" }
  ];

  // Mock community trips preview (3 items)
  const mockCommunityPreviews = [
    {
      title: "Romantic Week in the Heart of Paris",
      location: "Paris, France",
      budget: "Expensive",
      days: 7,
      creator: { name: "Aria Smith", picture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" },
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80",
      likes: 142,
      commentsCount: 28,
      date: "June 12, 2026"
    },
    {
      title: "Snowboarding and Igloo Retreat in Lapland",
      location: "Lapland, Finland",
      budget: "Moderate",
      days: 5,
      creator: { name: "Lukas Weber", picture: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80" },
      image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=600&q=80",
      likes: 98,
      commentsCount: 14,
      date: "June 10, 2026"
    },
    {
      title: "Adventure and Shrines in Historic Kyoto",
      location: "Kyoto, Japan",
      budget: "Moderate",
      days: 6,
      creator: { name: "Yuki Tanaka", picture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" },
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80",
      likes: 235,
      commentsCount: 45,
      date: "June 08, 2026"
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen font-sans relative overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image Carousel with Framer Motion */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${carouselDestinations[currentSlide].image})` }}
            >
              {/* Overlay gradients for premium dark look and readablity */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Hero Content (Flex layout: Left Side Content, Right Side Floating Glass Card) */}
        <div className="max-w-7xl mx-auto px-6 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-12">
          
          {/* Left Side: Destination Info */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <span className="text-amber-500 font-bold tracking-widest text-xs uppercase mb-3 inline-flex items-center gap-1.5 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 w-fit">
              <Sparkles className="h-3 w-3 animate-pulse" />
              {carouselDestinations[currentSlide].theme}
            </span>

            {/* Title Slides */}
            <div className="h-44 md:h-52 flex flex-col justify-end overflow-hidden mb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -60, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
                    {carouselDestinations[currentSlide].title.split(" ").slice(0, -2).join(" ")}
                    <br />
                    <span className="text-amber-400 font-black">
                      {carouselDestinations[currentSlide].title.split(" ").slice(-2).join(" ")}
                    </span>
                  </h1>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-base md:text-lg mb-8 max-w-xl leading-relaxed">
              {carouselDestinations[currentSlide].description}
            </p>

            {/* Travel Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/10 max-w-xl">
              <div>
                <h3 className="text-white font-extrabold text-2xl tracking-tight">⭐ 4.9</h3>
                <p className="text-gray-400 text-xs mt-1 uppercase tracking-wider">Avg Rating</p>
              </div>
              <div>
                <h3 className="text-white font-extrabold text-2xl tracking-tight">🌍 120+</h3>
                <p className="text-gray-400 text-xs mt-1 uppercase tracking-wider">Countries</p>
              </div>
              <div>
                <h3 className="text-white font-extrabold text-2xl tracking-tight">✈️ 50k+</h3>
                <p className="text-gray-400 text-xs mt-1 uppercase tracking-wider">Trips Planned</p>
              </div>
              <div>
                <h3 className="text-white font-extrabold text-2xl tracking-tight">🏨 10k+</h3>
                <p className="text-gray-400 text-xs mt-1 uppercase tracking-wider">Destinations</p>
              </div>
            </div>
          </div>

          {/* Right Side: Floating Glass Card AI Trip Generator */}
          <div className="lg:col-span-5">
            <div className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/50 relative overflow-hidden">
              {/* Blur backdrop glowing orb */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-amber-500/20 rounded-full blur-2xl" />

              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Compass className="text-amber-500 h-5 w-5" />
                AI Trip Planner
              </h2>

              <div className="space-y-5">
                {/* Destination Suggestion Input */}
                <div className="relative">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                    Destination
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Type to search e.g. Paris..."
                      value={place}
                      onChange={handlePlaceChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-all text-sm"
                    />
                  </div>
                  {suggestionsLoading && (
                    <div className="absolute right-3 top-9 text-xs text-gray-400">Searching...</div>
                  )}
                  {suggestions.length > 0 && (
                    <ul className="absolute left-0 right-0 z-30 mt-2 bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl max-h-56 overflow-y-auto">
                      {suggestions.map((item) => (
                        <li
                          key={item.properties.place_id}
                          onClick={() => selectSuggestion(item.properties.formatted)}
                          className="px-4 py-3 hover:bg-neutral-800 cursor-pointer text-sm flex items-center gap-2 border-b border-neutral-800/40"
                        >
                          <MapPin className="h-3.5 w-3.5 text-amber-500" />
                          <span>{item.properties.formatted}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Duration Days */}
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                    Trip Duration (Days)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="1"
                      max="15"
                      value={days}
                      onChange={(e) => setDays(parseInt(e.target.value) || 1)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500 transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Budget Selection (Interactive chips) */}
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                    Budget Options
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {budgetOptions.map((item) => (
                      <button
                        key={item.title}
                        type="button"
                        onClick={() => setBudget(item.title)}
                        className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all ${
                          budget === item.title
                            ? "bg-amber-500/20 border-amber-500 text-amber-400"
                            : "bg-white/5 border-white/5 text-gray-400 hover:border-white/20"
                        }`}
                      >
                        <span className="text-xl mb-1">{item.icon}</span>
                        <span className="text-[11px] font-bold">{item.title}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Travelers Options */}
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                    Who is traveling?
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {travelerOptions.map((item) => (
                      <button
                        key={item.title}
                        type="button"
                        onClick={() => setTraveler(item.title)}
                        className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all ${
                          traveler === item.title
                            ? "bg-amber-500/20 border-amber-500 text-amber-400"
                            : "bg-white/5 border-white/5 text-gray-400 hover:border-white/20"
                        }`}
                      >
                        <span className="text-base mb-0.5">{item.icon}</span>
                        <span className="text-[9px] font-bold truncate w-full">{item.title}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Travel Style */}
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                    Travel Style
                  </label>
                  <select
                    value={travelStyle}
                    onChange={(e) => setTravelStyle(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500 transition-all text-sm appearance-none cursor-pointer"
                  >
                    {travelStyles.map((style) => (
                      <option key={style} value={style} className="bg-neutral-900 text-white">
                        {style}
                      </option>
                    ))}
                  </select>
                </div>

                {/* CTAs */}
                <div className="pt-2 space-y-3">
                  <button
                    onClick={handleGenerateTrip}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-bold text-sm tracking-wide shadow-lg shadow-rose-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="h-4 w-4" />
                    Generate My Trip
                  </button>

                  <Link
                    to="/community"
                    className="w-full py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Explore Community Trips
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Carousel Slide Navigation Controls (manual arrows and dots) */}
        <div className="absolute bottom-8 left-6 right-6 z-10 flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto gap-4">
          {/* Dots Indicator */}
          <div className="flex gap-2">
            {carouselDestinations.map((_, idx) => (
              <button
                key={idx}
                onClick={() => selectSlide(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? "w-8 bg-amber-500" : "w-2.5 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* Manual Arrows Navigation */}
          <div className="flex gap-3">
            <button
              onClick={handlePrevSlide}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-all active:scale-90"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNextSlide}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-all active:scale-90"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Trending Destinations Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div>
            <span className="text-amber-500 font-bold uppercase tracking-widest text-xs">Trending Now</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 tracking-tight">Trending Destinations</h2>
          </div>
          <Link to="/explore" className="text-sm font-semibold text-amber-500 hover:text-amber-400 flex items-center gap-1.5 transition-all">
            See all places <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Horizontal Scroll list */}
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
          {trendingDestinations.map((dest, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -6 }}
              className="min-w-[280px] md:min-w-[320px] bg-neutral-900/40 border border-neutral-800/60 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all flex-shrink-0"
            >
              <div className="h-48 overflow-hidden relative">
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-all duration-500 hover:scale-110" />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-xs font-bold flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                  {dest.score}
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-white">{dest.name}</h3>
                    <p className="text-gray-400 text-xs flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3 text-amber-500" />
                      {dest.country}
                    </p>
                  </div>
                  <span className="text-xs bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-bold">
                    {dest.budget}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-5 pt-4 border-t border-neutral-800/60 text-xs text-gray-400">
                  <span>Best Season: <b>{dest.season}</b></span>
                  <button
                    onClick={() => { setPlace(dest.name); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="text-amber-500 hover:underline font-semibold"
                  >
                    Plan Trip
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Travel Categories Section */}
      <section className="py-20 bg-neutral-950 border-y border-neutral-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-amber-500 font-bold uppercase tracking-widest text-xs">Styles & Moods</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 tracking-tight">Travel Categories</h2>
            <p className="text-neutral-400 mt-3">Select a travel style and let our AI recommendations customize the locations and routes perfectly matching your mood.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {travelCategories.map((cat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03, borderColor: "rgba(245, 158, 11, 0.3)" }}
                className="bg-neutral-900 border border-neutral-800/80 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all active:scale-95"
                onClick={() => { setTravelStyle(cat.title); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              >
                <span className="text-4xl mb-4">{cat.emoji}</span>
                <h3 className="font-bold text-white text-base">{cat.title}</h3>
                <span className="text-xs text-neutral-500 mt-1">{cat.count}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Preview Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-4">
          <div>
            <span className="text-amber-500 font-bold uppercase tracking-widest text-xs">Shared Journeys</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 tracking-tight">Community Verified Trips</h2>
            <p className="text-neutral-400 mt-2">Get inspired by real itineraries planned by travelers around the world.</p>
          </div>
          <Link to="/community" className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold text-sm transition-all cursor-pointer">
            View Community Feed
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockCommunityPreviews.map((trip, idx) => (
            <div key={idx} className="bg-neutral-900/20 border border-neutral-800/60 rounded-3xl overflow-hidden hover:border-neutral-700 transition-all flex flex-col h-full">
              <div className="h-56 relative overflow-hidden">
                <img src={trip.image} alt={trip.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/10 flex items-center gap-1 text-white">
                  <Calendar className="h-3.5 w-3.5 text-amber-500" />
                  {trip.days} Days
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <img src={trip.creator.picture} alt={trip.creator.name} className="w-7 h-7 rounded-full border border-amber-500/50" />
                    <span className="text-xs text-neutral-400 font-medium">{trip.creator.name}</span>
                    <span className="text-[10px] text-neutral-600">• {trip.date}</span>
                  </div>
                  <h3 className="font-bold text-lg text-white mb-2 leading-snug line-clamp-2 hover:text-amber-400 transition-all">
                    {trip.title}
                  </h3>
                  <p className="text-xs text-neutral-400 flex items-center gap-1 mb-4">
                    <MapPin className="h-3.5 w-3.5 text-amber-500" />
                    {trip.location}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-neutral-900 mt-6">
                  <div className="flex gap-4">
                    <button className="flex items-center gap-1 text-xs text-neutral-500 hover:text-rose-500 transition-all">
                      <Heart className="h-4 w-4" /> {trip.likes}
                    </button>
                    <button className="flex items-center gap-1 text-xs text-neutral-500 hover:text-amber-500 transition-all">
                      <MessageSquare className="h-4 w-4" /> {trip.commentsCount}
                    </button>
                  </div>
                  <button className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-all">
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Use Our Platform Section */}
      <section className="py-20 bg-neutral-950 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-amber-500 font-bold uppercase tracking-widest text-xs">Our Advantages</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 tracking-tight">Why Use Our Platform</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-900 border border-neutral-800/80 rounded-3xl p-8 hover:border-amber-500/20 transition-all">
              <div className="h-12 w-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-500 mb-6">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-white font-bold text-lg mb-3">AI-Powered Itineraries</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Harness state-of-the-art language models to compile custom travel suggestions, routes, and hotel pricing in milliseconds.
              </p>
            </div>

            <div className="bg-neutral-900 border border-neutral-800/80 rounded-3xl p-8 hover:border-amber-500/20 transition-all">
              <div className="h-12 w-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-500 mb-6">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="text-white font-bold text-lg mb-3">Personalized Travel Planning</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Filter by companion configuration, specific daily counts, budget tiers, and local activity styles to align plans with your goals.
              </p>
            </div>

            <div className="bg-neutral-900 border border-neutral-800/80 rounded-3xl p-8 hover:border-amber-500/20 transition-all">
              <div className="h-12 w-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-500 mb-6">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-white font-bold text-lg mb-3">Community Verified Trips</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Get real feedback from global explorers. Browse social reactions, reviews, and comments to verify sightseeing options prior to flight reservations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-amber-500 font-bold uppercase tracking-widest text-xs">Customer Reviews</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2 tracking-tight">What Travelers Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, index) => (
            <div key={index} className="bg-neutral-900/30 border border-neutral-800/60 rounded-3xl p-8 flex flex-col justify-between">
              <div>
                <div className="flex gap-1 mb-5">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed italic mb-6">"{test.quote}"</p>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <img src={test.avatar} alt={test.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="text-white font-bold text-sm">{test.name}</h4>
                  <p className="text-neutral-500 text-xs">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-neutral-950 border-t border-neutral-900">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-amber-500 font-bold uppercase tracking-widest text-xs">Common Questions</span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-2 tracking-tight">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqData.map((item, idx) => (
              <div key={idx} className="bg-neutral-900 border border-neutral-800/80 rounded-2xl overflow-hidden transition-all">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left text-white font-bold text-sm md:text-base cursor-pointer hover:bg-neutral-800/40 transition-all"
                >
                  <span>{item.q}</span>
                  <ChevronDown className={`h-5 w-5 text-gray-400 transition-all duration-300 ${activeFaq === idx ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="px-6 pb-5 text-sm text-neutral-400 leading-relaxed border-t border-neutral-800/40 pt-3">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simulated Generation Overlay Loader */}
      <AnimatePresence>
        {generating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <div className="bg-neutral-950/80 border border-neutral-800 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl relative overflow-hidden flex flex-col items-center">
              {/* Rotating loader */}
              <div className="w-16 h-16 rounded-full border-4 border-t-amber-500 border-r-amber-500 border-neutral-800 animate-spin mb-6" />

              <h2 className="text-xl font-bold mb-3 flex items-center gap-1.5 text-white">
                <Sparkles className="text-amber-500 h-5 w-5 animate-pulse" />
                Generating Itinerary
              </h2>
              <p className="text-sm text-gray-400 mb-6">
                Creating your custom {days}-day trip to <b>{place}</b>...
              </p>

              {/* Progress step message */}
              <div className="h-10 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={generationStep}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    className="text-amber-400 font-semibold text-xs tracking-wider uppercase"
                  >
                    {generationSteps[generationStep]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Subtle indicators */}
              <div className="flex gap-1.5 mt-6">
                {generationSteps.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      generationStep === i ? "w-6 bg-amber-500" : generationStep > i ? "w-1.5 bg-amber-500/50" : "w-1.5 bg-neutral-800"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default LandingPage;
