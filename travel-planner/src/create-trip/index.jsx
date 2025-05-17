import React, { useState } from "react";

const CreateTrip = () => {
  const [place, setPlace] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async (query) => {
    if (query.length < 3) return;
    setLoading(true);

    // console.log("API Key from env:", import.meta.env.VITE_GEOAPIFY_API_KEY); 

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

    if (query) {
      fetchSuggestions(query);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    const selectedPlace = suggestion.properties.formatted;
    setPlace(selectedPlace);
    setSuggestions([]);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-52 xl:px-10 px-5 mt-10 mx-auto">
      <h2 className="font-bold text-3xl">Tell your travel preferences</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-9">
        <div>
          <h2 className="text-xl my-3 font-medium">What is your destination of choice?</h2>
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
      </div>
    </div>
  );
};

export default CreateTrip;
