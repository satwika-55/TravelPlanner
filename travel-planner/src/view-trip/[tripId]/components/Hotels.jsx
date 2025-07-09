import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Replace with your Pexels API key
const PEXELS_API_KEY = "f2UUAqYDEleuPKsCtxeGT5dLw7HIM7XxrDELIGBGxpvkNwii4XescWeh";

const Hotels = ({ trip }) => {
  const [hotelImages, setHotelImages] = useState({}); // State to store fetched hotel images

  // Function to fetch images dynamically from Pexels API
  const fetchHotelImage = async (hotelName) => {
    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${hotelName}&per_page=1&orientation=landscape`,
        {
          headers: {
            Authorization: PEXELS_API_KEY, // Pass your API key
          },
        }
      );
      const data = await response.json();

      if (data?.photos?.length > 0) {
        return data.photos[0].src.large; // Return the first image URL (large size for better quality)
      }
    } catch (error) {
      console.error("Error fetching hotel image:", error);
    }

    // Fallback to a default image if the fetch fails
    return "https://www.vivantahotels.com/content/dam/vivanta/hotels/vivanta-vijayawada/gallery/Vijaywada_Welcome-for-Web_3x2-02.jpg/jcr:content/renditions/cq5dam.web.756.756.jpeg";
  };

  useEffect(() => {
    const fetchImages = async () => {
      const images = {};
      for (const hotel of trip?.tripdata?.hotels || []) {
        const imageUrl = await fetchHotelImage(hotel?.HotelName || "hotel");
        images[hotel?.HotelName] = imageUrl;
      }
      setHotelImages(images);
    };
 
    fetchImages();
  }, [trip]);

  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {trip?.tripdata?.hotels?.map((hotel, index) => {
          // Use the dynamically fetched image or fallback
          const imageUrl =
            hotelImages[hotel?.HotelName] ||
            "https://t4.ftcdn.net/jpg/07/99/81/03/240_F_799810388_Wz1GWMKApg9JzAOw8EpaiApXrsoESp88.jpg";

          return (
            <Link
              key={index}
              to={
                'https://www.google.com/maps/search/?api=1&query=' +
                encodeURIComponent(hotel?.['Hotel address'])
              }
              target="_blank"
              className="hover:scale-105 transition-all cursor-pointer"
            >
              <div>
                <img className="rounded-xl" src={imageUrl} alt={hotel?.HotelName} />
                <div className="my-2 flex flex-col gap-2">
                  <h2 className="font-medium">{hotel?.HotelName}</h2>
                  <h2 className="text-xs text-gray-500">📍🗺️ {hotel?.['Hotel address']}</h2>
                  <h2 className="text-sm">💵 {hotel?.Price}</h2>
                  <h2 className="text-sm">⭐ {hotel?.rating} stars</h2>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Hotels;