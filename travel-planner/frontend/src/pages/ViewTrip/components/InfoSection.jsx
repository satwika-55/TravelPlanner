import { Button } from "../../../components/ui/button";
import React, { useState, useEffect } from "react";
import { Share2 } from "lucide-react";

const PEXELS_API_KEY = "f2UUAqYDEleuPKsCtxeGT5dLw7HIM7XxrDELIGBGxpvkNwii4XescWeh";

const Information = ({ trip }) => {
  const [destinationImage, setDestinationImage] = useState(
    "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&q=80"
  );

  const fetchDestinationImage = async (location) => {
    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${location}&per_page=1`,
        {
          headers: {
            Authorization: PEXELS_API_KEY,
          },
        }
      );
      const data = await response.json();

      if (data?.photos?.length > 0) {
        setDestinationImage(data.photos[0].src.large);
      }
    } catch (error) {
      console.error("Error fetching destination image:", error);
    }
  };

  useEffect(() => {
    if (trip?.userselection?.location) {
      fetchDestinationImage(trip.userselection.location);
    }
  }, [trip?.userselection?.location]);

  return (
    <div className="mb-12">
      <img
        className="w-full h-96 object-cover rounded-2xl mb-8"
        src={destinationImage}
        alt={trip?.userselection?.location || "Trip destination"}
      />
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-6">
        <div>
          <h1 className="text-5xl font-bold mb-6">{trip?.userselection?.location || "Unknown Destination"}</h1>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              📅 {trip?.userselection?.days || 0} Days
            </span>
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              💰 {trip?.userselection?.budget || "N/A"}
            </span>
            <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              👥 {trip?.userselection?.traveler || "1 Traveler"}
            </span>
          </div>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
          <Share2 className="h-4 w-4" /> Share Trip
        </Button>
      </div>
    </div>
  );
};

export default Information;