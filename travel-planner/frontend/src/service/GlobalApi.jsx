import axios from 'axios';

const BASE_URL = 'https://api.geoapify.com/v1/geocode/autocomplete';

export const GetPlaceDetails = async (textQuery) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        text: textQuery,
        apiKey: import.meta.env.VITE_GEOAPIFY_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching place details from Geoapify:", error);
    throw error;
  }
};
export const PHOTO_REF_URL = 'https://photos.geoapify.com/v1/photo/{NAME}';