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
import { LogIn } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { generateTrip } from "../services/api.js";

const CreateTrip = () => {
  const [place, setPlace] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formdata, setFormdata] = useState({});
  const [opendailog, setOpendailog] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(formdata);
  }, [formdata]);

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
        console.log(resp);
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
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    const selectedPlace = suggestion.properties.formatted;
    setPlace(selectedPlace);
    handleInputChange("location", selectedPlace);
    setSuggestions([]);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-52 xl:px-10 px-5 mt-10 mx-auto">
      <h2 className="font-bold text-3xl">Tell your travel preferences</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-9">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination of choice?
          </h2>
          <input
            type="text"
            value={place}
            onChange={handleInputChangeAndSuggestions}
            placeholder="Type to search..."
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {loading && <p>Loading...</p>}
          {suggestions.length > 0 && (
            <ul className="border border-gray-300 rounded-md mt-2 max-h-60 overflow-y-auto">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.properties.place_id}
                  onClick={() => handleSuggestionSelect(suggestion)}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {suggestion.properties.formatted}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder={"Ex. 3"}
            type="number"
            onChange={(e) => handleInputChange("days", e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {selectBudgetOption.map((item, index) => (
              <div
                onClick={() => handleInputChange("budget", item.title)}
                key={index}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  formdata?.budget === item.title ? "shadow-lg border-black" : ""
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on traveling with on your next adventure?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelList.map((item, index) => (
              <div
                onClick={() => handleInputChange("traveler", item.title)}
                key={index}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  formdata?.traveler === item.title ? "shadow-lg border-black" : ""
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

      </div>
      
      <div className="mt-10 justify-end flex">
        <Button onClick={OnGenerateTrip} disabled={loading}>
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="loader"></div> {/* Spinner */}
              Generating...
            </div>
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      <Dialog open={opendailog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <h1 className="font-bold text-lg mt-7">Sign In with Google</h1>
              <p>Sign in to the App with Google authentication securely</p>
              <Button
                disabled={loading}
                onClick={login}
                className="w-full mt-10 border text-xl"
              >
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <LogIn className="mr-5" />
                )}
                Continue with Google
                {/* Continue with Google */}
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog> 
    </div>
  );
};

export default CreateTrip;


