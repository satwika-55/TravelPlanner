import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, DollarSign } from 'lucide-react';

const PEXELS_API_KEY = "f2UUAqYDEleuPKsCtxeGT5dLw7HIM7XxrDELIGBGxpvkNwii4XescWeh";

const Hotels = ({ trip }) => {
  const [hotelImages, setHotelImages] = useState({});

  const fetchHotelImage = async (hotelName) => {
    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${hotelName}&per_page=1&orientation=landscape`,
        {
          headers: {
            Authorization: PEXELS_API_KEY,
          },
        }
      );
      const data = await response.json();

      if (data?.photos?.length > 0) {
        return data.photos[0].src.large;
      }
    } catch (error) {
      console.error("Error fetching hotel image:", error);
    }

    return "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80";
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
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-8">Hotel Recommendations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trip?.tripdata?.hotels?.map((hotel, index) => {
          const imageUrl = hotelImages[hotel?.HotelName] || "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80";

          return (
            <Link
              key={index}
              to={
                'https://www.google.com/maps/search/?api=1&query=' +
                encodeURIComponent(hotel?.['Hotel address'])
              }
              target="_blank"
              className="group"
            >
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all hover:border-blue-200">
                <img
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  src={imageUrl}
                  alt={hotel?.HotelName}
                />
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">{hotel?.HotelName}</h3>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
                      <span>{hotel?.['Hotel address']}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="font-medium">{hotel?.Price}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span>{hotel?.rating} stars</span>
                    </div>
                  </div>

                  <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-all">
                    View on Maps
                  </button>
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