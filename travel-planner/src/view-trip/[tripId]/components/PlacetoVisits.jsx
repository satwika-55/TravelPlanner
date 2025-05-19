import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";

// Replace with your Pexels API key
const PEXELS_API_KEY = "jkTXzyWcuD4lFMtj9wYgziiIVEEN6RrAwraovKartb2c795k0BNgdJxl"; // Replace with your Pexels API Key

const PlacetoVists = ({ trip }) => {
  const [placeImages, setPlaceImages] = useState({}); // To store images for each place

  // Fetch image from Pexels based on place name
  const getPlaceImage = async (placeName) => {
    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${placeName}&per_page=1`,
        {
          headers: {
            Authorization: PEXELS_API_KEY, // Add the API key in the request header
          },
        }
      );
      const data = await response.json();

      if (data && data.photos && data.photos.length > 0) {
        return data.photos[0].src.small; // Return the small image URL from Pexels API
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }

    // Return a default image if Pexels API fails
    return "https://via.placeholder.com/150"; // Default image
  };

  useEffect(() => {
    const fetchImages = async () => {
      const images = {};
      for (let dayKey of Object.keys(trip?.tripdata?.itinerary || {})) {
        const item = trip?.tripdata?.itinerary[dayKey];
        const imageUrl = await getPlaceImage(item?.placeName || "place");
        images[item?.placeName] = imageUrl;
      }
      setPlaceImages(images);
    };

    fetchImages();
  }, [trip]);

  const handleNavigate = (placeName) => {
    const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(placeName)}`;
    window.open(googleMapsUrl, "_blank"); // Opens the map in a new tab
  };

  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>
      <div className="grid md:grid-cols-2 gap-5">
        {Object.keys(trip?.tripdata?.itinerary || {})
          .sort() // Sort the keys in ascending order (day1, day2, day3, ...)
          .map((dayKey, index) => {
            const item = trip.tripdata.itinerary[dayKey]; // Access each day's details
            const imageUrl = placeImages[item?.placeName] || "https://via.placeholder.com/150"; // Default image
            return (
              <div key={index} className="my-3">
                <h2 className="font-medium text-lg">{dayKey}</h2>
                <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md">
                  <img
                    className="rounded-xl w-[140px] h-[140px]"
                    src={imageUrl}
                    alt={item.placeName}
                  />
                  <div>
                    <h3 className="font-bold">{item.placeName}</h3>
                    <h2 className="text-sm text-gray-500">✨ {item["Place Details"]}</h2>
                    <h2 className="text-sm">⭐ {item?.rating} stars</h2>
                    <h2 className="text-sm">🎟️ Ticket Pricing: {item["ticket Pricing"]}</h2>
                    <Button size="sm" onClick={() => handleNavigate(item.placeName)}>
                      🎯 Navigate
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PlacetoVists;