import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { selectBudgetOption, SelectTravelList } from "../constants/options";
import { toast } from 'sonner';
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../components/ui/dialog";
import { LogIn, Sparkles, ArrowRight } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { generateTrip } from "../services/api.js";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const CreateTrip = () => {
  const [place, setPlace] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formdata, setFormdata] = useState({});
  const [opendailog, setOpendailog] = useState(false);
  const [dynamicImage, setDynamicImage] = useState("https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&q=80");
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetuserProfile(codeResp),
    onError: (error) => console.log(error),
    redirectUri: "http://localhost:5173/create-trip",
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpendailog(true);
      return;
    }

    if (
      formdata?.days > 15 ||
      !formdata?.location ||
      !formdata?.budget ||
      !formdata?.traveler
    ) {
      toast("Please fill all details");
      return;
    }

    setLoading(true);
    try {
      const userData = JSON.parse(user);
      const response = await generateTrip({
        location: formdata.location,
        days: formdata.days,
        budget: formdata.budget,
        traveler: formdata.traveler,
        userEmail: userData.email,
      });

      if (response.success) {
        navigate(`/view-trip/${response.tripId}`);
      }
    } catch (error) {
      console.error("Error generating trip:", error);
      toast("Failed to generate trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const GetuserProfile = (tokeninfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokeninfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokeninfo?.access_token}`,
          Accept: "Application/json",
        },
      })
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpendailog(false);
        OnGenerateTrip();
      });
  };

  const fetchSuggestions = async (query) => {
    if (query.length < 1) return;
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${
          import.meta.env.VITE_GEOAPIFY_API_KEY
        }`
      );
      const data = await response.json();
      setSuggestions(data.features || []);
    } catch (error) {
      console.error("Error fetching place suggestions:", error);
    }

    setLoading(false);
  };

  const handleInputChangeAndSuggestions = (e) => {
    const query = e.target.value;
    setPlace(query);
    handleInputChange("location", query);
    if (query) {
      fetchSuggestions(query);
      // Simple dynamic image based on search term
      const images = {
        paris: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80",
        japan: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80",
        bali: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80",
        switzerland: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80",
      };
      const matchedImage = Object.entries(images).find(([key]) =>
        query.toLowerCase().includes(key)
      )?.[1];
      if (matchedImage) setDynamicImage(matchedImage);
    } else {
      setSuggestions([]);
      setDynamicImage("https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&q=80");
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    const selectedPlace = suggestion.properties.formatted;
    setPlace(selectedPlace);
    handleInputChange("location", selectedPlace);
    setSuggestions([]);
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen font-sans">
      <Header />

      <main className="pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto px-6">
          {/* Form Section */}
          <div className="flex flex-col justify-center">
            <div className="mb-12">
              <h1 className="text-4xl font-bold mb-3">Design Your Journey</h1>
              <p className="text-gray-600 text-lg">Tell us what you're looking for, and our AI will craft the perfect itinerary.</p>
            </div>

            <form className="space-y-6">
              {/* Destination & Duration Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-900 mb-2">Destination</label>
                  <input
                    type="text"
                    value={place}
                    onChange={handleInputChangeAndSuggestions}
                    placeholder="e.g. Kyoto, Japan or 'Anywhere warm'"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
                  />
                  {suggestions.length > 0 && (
                    <ul className="absolute top-full left-0 right-0 mt-1 border border-gray-300 rounded-lg bg-white shadow-lg max-h-48 overflow-y-auto z-10">
                      {suggestions.map((suggestion) => (
                        <li
                          key={suggestion.properties.place_id}
                          onClick={() => handleSuggestionSelect(suggestion)}
                          className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm"
                        >
                          {suggestion.properties.formatted}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Duration (Days)</label>
                  <input
                    type="number"
                    onChange={(e) => handleInputChange("days", e.target.value)}
                    placeholder="e.g. 7"
                    min="1"
                    max="30"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Who is traveling? */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Who is traveling?</label>
                <div className="flex flex-wrap gap-2">
                  {["Solo", "Couple", "Family", "Friends"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleInputChange("traveler", option)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        formdata.traveler === option
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Travel Style */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Travel Style (Select up to 3)</label>
                <div className="flex flex-wrap gap-2">
                  {["Adventure", "Relaxation", "Cultural", "Food & Wine", "Nature", "Nightlife"].map((style) => (
                    <button
                      key={style}
                      type="button"
                      className="px-4 py-2 rounded-lg font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-all"
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">Budget Range</label>
                <select
                  onChange={(e) => handleInputChange("budget", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
                >
                  <option>Select Budget</option>
                  <option>Budget-friendly</option>
                  <option>Standard</option>
                  <option>Premium / Luxury</option>
                </select>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Additional Notes (Optional)</label>
                <textarea
                  placeholder="e.g. I prefer boutique hotels, no early morning flights, must visit local markets..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all h-24"
                />
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={OnGenerateTrip}
                disabled={loading}
                className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold flex items-center justify-center gap-2 transition-all"
              >
                {loading ? "Generating..." : <>
                  Generate My Itinerary <Sparkles className="h-5 w-5" />
                </>}
              </button>
            </form>
          </div>

          {/* Image Section */}
          <div
            className="hidden lg:block rounded-2xl h-96 bg-cover bg-center"
            style={{ backgroundImage: `url('${dynamicImage}')` }}
          />
        </div>
      </main>

      {/* Auth Dialog */}
      <Dialog open={opendailog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription className="space-y-6">
              <h1 className="font-bold text-lg text-gray-900">Sign In with Google</h1>
              <p className="text-gray-600">Sign in to the App with Google authentication securely</p>
              <Button
                disabled={loading}
                onClick={login}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {loading ? "Loading..." : <>
                  <LogIn className="mr-2" />
                  Continue with Google
                </>}
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default CreateTrip;


