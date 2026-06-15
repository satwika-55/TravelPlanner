const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const generateTrip = async (tripData) => {
  const response = await fetch(`${API_BASE_URL}/trips/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tripData),
  });

  if (!response.ok) {
    throw new Error('Failed to generate trip');
  }

  return response.json();
};

export const getTripData = async (tripId) => {
  const response = await fetch(`${API_BASE_URL}/trips/${tripId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch trip');
  }

  const data = await response.json();
  return data.trip;
};

export const getUserTrips = async (userEmail) => {
  const response = await fetch(`${API_BASE_URL}/trips/user/${userEmail}`);

  if (!response.ok) {
    throw new Error('Failed to fetch user trips');
  }

  const data = await response.json();
  return data.trips;
};

export const getAllTrips = async (page = 1, limit = 10) => {
  const response = await fetch(`${API_BASE_URL}/trips?page=${page}&limit=${limit}`);

  if (!response.ok) {
    throw new Error('Failed to fetch trips');
  }

  return response.json();
};

export const saveTrip = async (tripId, userEmail) => {
  const response = await fetch(`${API_BASE_URL}/trips/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tripId, userEmail }),
  });

  if (!response.ok) {
    throw new Error('Failed to save trip');
  }

  return response.json();
};

export const getSavedTrips = async (userEmail) => {
  const response = await fetch(`${API_BASE_URL}/trips/saved/${userEmail}`);

  if (!response.ok) {
    throw new Error('Failed to fetch saved trips');
  }

  const data = await response.json();
  return data.trips;
};
