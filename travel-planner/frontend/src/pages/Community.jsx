import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Heart, HeartOff, MessageSquare, Share2, Search, Filter, Trash2, Edit2,
  Calendar, MapPin, Smile, Star, ArrowLeft, ArrowDown, ChevronRight, ThumbsDown, Check
} from "lucide-react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { toast } from "sonner";

// Preset initial community feed data
const initialCommunityFeed = [
  {
    id: "trip-paris-101",
    title: "Enchanting 7-Day Parisian Escape",
    location: "Paris, France",
    budget: "Expensive",
    days: 7,
    traveler: "Couple",
    style: "Romantic",
    createdAt: "2026-06-12T00:00:00.000Z",
    creator: { name: "Aria Smith", picture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" },
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80",
    likes: 142,
    dislikes: 2,
    likedBy: [],
    dislikedBy: [],
    savedBy: [],
    comments: [
      { id: "c1", userId: "aria-smith", userName: "Aria Smith", userPicture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80", content: "Absolutely loved the river cruise recommendation!", time: "2 days ago" },
      { id: "c2", userId: "john-doe", userName: "John Doe", userPicture: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80", content: "Did you need to book the Eiffel tower tickets far in advance?", time: "1 day ago" }
    ],
    tripdata: {
      hotels: [
        { HotelName: "Hotel Plaza Athénée", "Hotel address": "25 Avenue Montaigne, Paris", Price: "$950/night", rating: "4.9" }
      ],
      itinerary: {
        day1: { placeName: "Eiffel Tower", "Place Details": "The historic iron lattice tower on the Champ de Mars.", rating: "4.9", "ticket Pricing": "€25" },
        day2: { placeName: "Louvre Museum", "Place Details": "Exquisite world-class historical art museum.", rating: "4.8", "ticket Pricing": "€17" }
      }
    }
  },
  {
    id: "trip-bali-202",
    title: "Chasing Waterfalls & Temples in Ubud",
    location: "Bali, Indonesia",
    budget: "Cheap",
    days: 5,
    traveler: "Just Me",
    style: "Backpacking",
    createdAt: "2026-06-10T00:00:00.000Z",
    creator: { name: "Lukas Weber", picture: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80" },
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
    likes: 98,
    dislikes: 1,
    likedBy: [],
    dislikedBy: [],
    savedBy: [],
    comments: [],
    tripdata: {
      hotels: [
        { HotelName: "Ubud Green Resort", "Hotel address": "Jalan Raya Sanggingan, Ubud", Price: "$45/night", rating: "4.6" }
      ],
      itinerary: {
        day1: { placeName: "Tegalalang Rice Terraces", "Place Details": "Tiered valley rice paddies with scenic viewpoints.", rating: "4.7", "ticket Pricing": "$1" }
      }
    }
  },
  {
    id: "trip-kyoto-303",
    title: "Scenic Shrines and Bamboo Forests",
    location: "Kyoto, Japan",
    budget: "Moderate",
    days: 6,
    traveler: "Friends",
    style: "Cultural",
    createdAt: "2026-06-08T00:00:00.000Z",
    creator: { name: "Yuki Tanaka", picture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" },
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80",
    likes: 235,
    dislikes: 3,
    likedBy: [],
    dislikedBy: [],
    savedBy: [],
    comments: [
      { id: "c3", userId: "ben-k", userName: "Benjamin", userPicture: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80", content: "Kyoto in spring is unbeatable. Golden Pavilion looks stunning.", time: "4 days ago" }
    ],
    tripdata: {
      hotels: [
        { HotelName: "Kyoto Ryokan Sawanoya", "Hotel address": "Sano District, Kyoto", Price: "$120/night", rating: "4.7" }
      ],
      itinerary: {
        day1: { placeName: "Arashiyama Bamboo Grove", "Place Details": "Towering natural green bamboo walking paths.", rating: "4.8", "ticket Pricing": "Free" }
      }
    }
  }
];

const Community = () => {
  const [trips, setTrips] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("All");
  const [activeCommentsTrip, setActiveCommentsTrip] = useState(null); // Trip currently viewing comments for
  const [newCommentText, setNewCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  // Sync state with localStorage
  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      setCurrentUser(JSON.parse(userString));
    } else {
      // Create guest fallback user
      setCurrentUser({
        email: "demo@roamai.com",
        name: "Guest Explorer",
        picture: "https://t4.ftcdn.net/jpg/00/65/48/25/240_F_65482539_C0ZozE5gUjCafz7Xq98WB4dW6LAhqKfs.jpg"
      });
    }

    const localFeed = localStorage.getItem("community-trips");
    if (localFeed) {
      setTrips(JSON.parse(localFeed));
    } else {
      localStorage.setItem("community-trips", JSON.stringify(initialCommunityFeed));
      setTrips(initialCommunityFeed);
    }
  }, []);

  const saveTripsToStorage = (updatedTrips) => {
    setTrips(updatedTrips);
    localStorage.setItem("community-trips", JSON.stringify(updatedTrips));
  };

  const userEmail = currentUser?.email || "demo@roamai.com";

  // Social Operations
  const handleLike = (tripId) => {
    const updated = trips.map((trip) => {
      if (trip.id === tripId) {
        let likedBy = trip.likedBy || [];
        let dislikedBy = trip.dislikedBy || [];
        let likes = trip.likes || 0;
        let dislikes = trip.dislikes || 0;

        if (likedBy.includes(userEmail)) {
          // Unlike
          likedBy = likedBy.filter((e) => e !== userEmail);
          likes = Math.max(0, likes - 1);
        } else {
          // Like
          likedBy.push(userEmail);
          likes += 1;
          // Remove from dislike if any
          if (dislikedBy.includes(userEmail)) {
            dislikedBy = dislikedBy.filter((e) => e !== userEmail);
            dislikes = Math.max(0, dislikes - 1);
          }
        }
        return { ...trip, likedBy, dislikedBy, likes, dislikes };
      }
      return trip;
    });
    saveTripsToStorage(updated);
  };

  const handleDislike = (tripId) => {
    const updated = trips.map((trip) => {
      if (trip.id === tripId) {
        let likedBy = trip.likedBy || [];
        let dislikedBy = trip.dislikedBy || [];
        let likes = trip.likes || 0;
        let dislikes = trip.dislikes || 0;

        if (dislikedBy.includes(userEmail)) {
          // Remove dislike
          dislikedBy = dislikedBy.filter((e) => e !== userEmail);
          dislikes = Math.max(0, dislikes - 1);
        } else {
          // Dislike
          dislikedBy.push(userEmail);
          dislikes += 1;
          // Remove from like if any
          if (likedBy.includes(userEmail)) {
            likedBy = likedBy.filter((e) => e !== userEmail);
            likes = Math.max(0, likes - 1);
          }
        }
        return { ...trip, likedBy, dislikedBy, likes, dislikes };
      }
      return trip;
    });
    saveTripsToStorage(updated);
  };

  const handleSaveTrip = (tripId) => {
    const updated = trips.map((trip) => {
      if (trip.id === tripId) {
        let savedBy = trip.savedBy || [];
        if (savedBy.includes(userEmail)) {
          savedBy = savedBy.filter((e) => e !== userEmail);
          toast.success("Itinerary removed from Saved Trips");
        } else {
          savedBy.push(userEmail);
          toast.success("Itinerary bookmarked into Saved Trips!");
        }
        return { ...trip, savedBy };
      }
      return trip;
    });
    saveTripsToStorage(updated);
  };

  const handleShare = (trip) => {
    const shareUrl = `${window.location.origin}/view-trip/${trip.id}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard! Share it with anyone.");
  };

  // Comments Operations
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment = {
      id: Date.now().toString(),
      userId: userEmail,
      userName: currentUser?.name || "Guest Explorer",
      userPicture: currentUser?.picture || "https://t4.ftcdn.net/jpg/00/65/48/25/240_F_65482539_C0ZozE5gUjCafz7Xq98WB4dW6LAhqKfs.jpg",
      content: newCommentText,
      time: "Just now"
    };

    const updated = trips.map((trip) => {
      if (trip.id === activeCommentsTrip.id) {
        const comments = [...(trip.comments || []), newComment];
        // Keep active comments list synced
        setActiveCommentsTrip({ ...trip, comments });
        return { ...trip, comments };
      }
      return trip;
    });

    saveTripsToStorage(updated);
    setNewCommentText("");
    toast.success("Comment added!");
  };

  const handleDeleteComment = (commentId) => {
    const updated = trips.map((trip) => {
      if (trip.id === activeCommentsTrip.id) {
        const comments = (trip.comments || []).filter((c) => c.id !== commentId);
        setActiveCommentsTrip({ ...trip, comments });
        return { ...trip, comments };
      }
      return trip;
    });
    saveTripsToStorage(updated);
    toast.success("Comment deleted.");
  };

  const handleStartEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditingCommentText(comment.content);
  };

  const handleSaveEditComment = (commentId) => {
    if (!editingCommentText.trim()) return;

    const updated = trips.map((trip) => {
      if (trip.id === activeCommentsTrip.id) {
        const comments = (trip.comments || []).map((c) => {
          if (c.id === commentId) {
            return { ...c, content: editingCommentText, time: "Edited just now" };
          }
          return c;
        });
        setActiveCommentsTrip({ ...trip, comments });
        return { ...trip, comments };
      }
      return trip;
    });

    saveTripsToStorage(updated);
    setEditingCommentId(null);
    setEditingCommentText("");
    toast.success("Comment updated!");
  };

  // Filters
  const filteredTrips = trips.filter((trip) => {
    const matchesSearch =
      trip.location.toLowerCase().includes(search.toLowerCase()) ||
      trip.title.toLowerCase().includes(search.toLowerCase());
    const matchesBudget =
      selectedBudget === "All" || trip.budget === selectedBudget;
    return matchesSearch && matchesBudget;
  });

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <Header />

      <main className="pt-28 pb-20 max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="mb-10 text-left">
          <Link to="/" className="flex items-center gap-1 text-sm text-neutral-500 hover:text-amber-500 mb-4 transition-all">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <span className="text-amber-500 font-bold uppercase tracking-widest text-xs">Explore Social Feed</span>
          <h1 className="text-3xl md:text-5xl font-black mt-2 tracking-tight">Travel Community</h1>
          <p className="text-neutral-400 mt-2">Discover, save, comment on, and clone itineraries from global explorers.</p>
        </div>

        {/* Search / Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-neutral-500" />
            <input
              type="text"
              placeholder="Search by city or title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-all"
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 scrollbar-none">
            <span className="text-sm font-semibold text-neutral-500 self-center mr-2">Budget:</span>
            {["All", "Cheap", "Moderate", "Expensive"].map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBudget(b)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedBudget === b
                    ? "bg-amber-500 text-neutral-950"
                    : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Feed Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTrips.length > 0 ? (
            filteredTrips.map((trip) => {
              const hasLiked = (trip.likedBy || []).includes(userEmail);
              const hasDisliked = (trip.dislikedBy || []).includes(userEmail);
              const hasSaved = (trip.savedBy || []).includes(userEmail);

              return (
                <div
                  key={trip.id}
                  className="bg-neutral-900/30 border border-neutral-800/60 rounded-3xl overflow-hidden hover:border-neutral-700 transition-all flex flex-col h-full shadow-lg"
                >
                  {/* Photo & Badge */}
                  <div className="h-52 relative overflow-hidden">
                    <img src={trip.image} alt={trip.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/10 flex items-center gap-1 text-white">
                      <Calendar className="h-3.5 w-3.5 text-amber-500" />
                      {trip.days} Days
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      {/* Creator Info */}
                      <div className="flex items-center gap-2 mb-4">
                        <img
                          src={trip.creator?.picture || "https://t4.ftcdn.net/jpg/00/65/48/25/240_F_65482539_C0ZozE5gUjCafz7Xq98WB4dW6LAhqKfs.jpg"}
                          alt={trip.creator?.name || "Explorer"}
                          className="w-7 h-7 rounded-full border border-amber-500/50 object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <span className="text-xs text-neutral-400 font-medium">{trip.creator?.name || "Explorer"}</span>
                        <span className="text-[10px] text-neutral-600">
                          • {new Date(trip.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <h3 className="font-bold text-lg text-white mb-2 leading-snug hover:text-amber-400 transition-all line-clamp-2">
                        <Link to={`/view-trip/${trip.id}`}>{trip.title || `Trip to ${trip.location}`}</Link>
                      </h3>
                      <p className="text-xs text-neutral-500 flex items-center gap-1 mb-4">
                        <MapPin className="h-3.5 w-3.5 text-amber-500" />
                        {trip.location}
                      </p>

                      {/* Snippet preview */}
                      <div className="bg-black/40 border border-neutral-800/60 rounded-xl p-3 mb-4 text-xs text-neutral-400">
                        <span className="font-bold text-neutral-200 block mb-1">Itinerary Preview:</span>
                        {Object.keys(trip.tripdata?.itinerary || {}).length > 0 ? (
                          <div className="truncate">
                            Day 1: {trip.tripdata.itinerary.day1?.placeName || "Sightseeing start"}
                          </div>
                        ) : (
                          "View complete personalized hotels and travel directions..."
                        )}
                      </div>
                    </div>

                    {/* Social Stats & Buttons */}
                    <div className="pt-4 border-t border-neutral-900 mt-auto flex flex-col gap-3">
                      <div className="flex justify-between items-center text-xs text-neutral-400">
                        <span>Companion: <b>{trip.traveler || "Couple"}</b></span>
                        <span>Budget: <b className="text-amber-500">{trip.budget}</b></span>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-3">
                          {/* Likes */}
                          <button
                            onClick={() => handleLike(trip.id)}
                            className={`flex items-center gap-1 text-xs transition-all ${
                              hasLiked ? "text-amber-400 font-bold" : "text-neutral-500 hover:text-amber-400"
                            }`}
                          >
                            <Heart className={`h-4.5 w-4.5 ${hasLiked ? "fill-amber-500 text-amber-500" : ""}`} />
                            {trip.likes || 0}
                          </button>

                          {/* Dislikes */}
                          <button
                            onClick={() => handleDislike(trip.id)}
                            className={`flex items-center gap-1 text-xs transition-all ${
                              hasDisliked ? "text-rose-500 font-bold" : "text-neutral-500 hover:text-rose-500"
                            }`}
                          >
                            <ThumbsDown className={`h-4 w-4 ${hasDisliked ? "fill-rose-500 text-rose-500" : ""}`} />
                            {trip.dislikes || 0}
                          </button>

                          {/* Comments Trigger */}
                          <button
                            onClick={() => setActiveCommentsTrip(trip)}
                            className="flex items-center gap-1 text-xs text-neutral-500 hover:text-amber-400 transition-all"
                          >
                            <MessageSquare className="h-4.5 w-4.5" />
                            {trip.comments?.length || 0}
                          </button>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSaveTrip(trip.id)}
                            className={`p-1.5 rounded-lg bg-neutral-900 border transition-all ${
                              hasSaved
                                ? "border-amber-500 text-amber-500 bg-amber-500/10"
                                : "border-neutral-800 text-neutral-400 hover:text-white"
                            }`}
                          >
                            <Heart className={`h-4 w-4 ${hasSaved ? "fill-amber-500" : ""}`} />
                          </button>

                          <button
                            onClick={() => handleShare(trip)}
                            className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-all"
                          >
                            <Share2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-16 text-center text-neutral-500 flex flex-col items-center justify-center">
              <MessageSquare className="h-12 w-12 text-neutral-600 mb-3 animate-pulse" />
              <p className="font-bold text-lg">No community trips found.</p>
              <p className="text-sm text-neutral-600">Try adjusting your filters or create a new trip to publish.</p>
            </div>
          )}
        </div>
      </main>

      {/* Inline Comments Modal / Drawer */}
      {activeCommentsTrip && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-neutral-950 border border-neutral-800 rounded-3xl w-full max-w-lg p-6 md:p-8 max-h-[85vh] flex flex-col shadow-2xl relative">
            <button
              onClick={() => {
                setActiveCommentsTrip(null);
                setEditingCommentId(null);
              }}
              className="absolute top-4 right-4 text-neutral-500 hover:text-white text-lg font-bold p-1 bg-neutral-900 rounded-full w-8 h-8 flex items-center justify-center"
            >
              ×
            </button>

            <h3 className="text-lg font-bold mb-1 text-white truncate">Comments</h3>
            <p className="text-xs text-neutral-500 mb-6 truncate">{activeCommentsTrip.title}</p>

            {/* Comments List */}
            <div className="flex-grow overflow-y-auto mb-6 space-y-4 pr-1 scrollbar-thin">
              {activeCommentsTrip.comments?.length > 0 ? (
                activeCommentsTrip.comments.map((comment) => (
                  <div key={comment.id} className="bg-neutral-900/60 border border-neutral-900 rounded-2xl p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <img
                          src={comment.userPicture}
                          alt={comment.userName}
                          className="w-7 h-7 rounded-full object-cover border border-amber-500/20"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <span className="text-xs font-bold text-neutral-200">{comment.userName}</span>
                          <span className="text-[9px] text-neutral-600 block">{comment.time}</span>
                        </div>
                      </div>

                      {/* Edit/Delete controls if the comment belongs to currently logged user */}
                      {comment.userId === userEmail && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleStartEditComment(comment)}
                            className="p-1 text-neutral-500 hover:text-amber-500 transition-all"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="p-1 text-neutral-500 hover:text-rose-500 transition-all"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {editingCommentId === comment.id ? (
                      <div className="mt-3 flex gap-2">
                        <input
                          type="text"
                          value={editingCommentText}
                          onChange={(e) => setEditingCommentText(e.target.value)}
                          className="flex-grow bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-1.5 text-xs text-white"
                        />
                        <button
                          onClick={() => handleSaveEditComment(comment.id)}
                          className="px-3 py-1.5 rounded-xl bg-amber-500 text-neutral-950 text-xs font-bold flex items-center gap-1"
                        >
                          <Check className="h-3 w-3" /> Save
                        </button>
                      </div>
                    ) : (
                      <p className="text-xs text-neutral-300 mt-2 leading-relaxed">{comment.content}</p>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center text-neutral-600 py-10 text-xs flex flex-col items-center">
                  <MessageSquare className="h-8 w-8 text-neutral-700 mb-2" />
                  No comments yet. Be the first to share your thoughts!
                </div>
              )}
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleAddComment} className="flex gap-2 mt-auto">
              <input
                type="text"
                placeholder="Share your traveler tips..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                className="flex-grow bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-all"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 text-sm font-bold transition-all active:scale-95 cursor-pointer"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Community;
