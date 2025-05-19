import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";

// Replace with your Pexels API key
const PEXELS_API_KEY = "jkTXzyWcuD4lFMtj9wYgziiIVEEN6RrAwraovKartb2c795k0BNgdJxl";

const Information = ({ trip }) => {
  const [destinationImage, setDestinationImage] = useState(
    "https://t4.ftcdn.net/jpg/00/65/48/25/240_F_65482539_C0ZozE5gUjCafz7Xq98WB4dW6LAhqKfs.jpg" // Fallback image
  );

  // Function to fetch an image based on location dynamically
  const fetchDestinationImage = async (location) => {
    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${location}&per_page=1`,
        {
          headers: {
            Authorization: PEXELS_API_KEY, // Pass your API key
          },
        }
      );
      const data = await response.json();

      if (data?.photos?.length > 0) {
        setDestinationImage(data.photos[0].src.large); // Update state with the fetched image
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
    <div>
      <img
        className="h-[350px] w-full object-cover rounded-xl"
        src={destinationImage}
        alt={trip?.userselection?.location || "Trip destination"}
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userselection?.location || "Unknown Destination"}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🗓️ {trip?.userselection?.days || 0} Days
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💰{trip?.userselection?.budget || "N/A"} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🥂 No. Of Travelers: {trip?.userselection?.traveler || 1}
            </h2>
          </div>
        </div>
        <Button>➤ Share</Button>
      </div>
    </div>
  );
};

export default Information;