import { db } from '../config/firebaseAdmin.js';
import { generateTripItinerary } from '../services/geminiService.js';

const AI_PROMT = `Generate a travel plan for location: {location}, for {days} days, for {traveler} with a {budget} budget, give me Hotels option list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itineraries with place Name, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for {days} days with each day plan with best time to visit in JSON format.`;

export const generateTrip = async (req, res) => {
  try {
    const { location, days, budget, traveler, userEmail } = req.body;

    if (!location || !days || !budget || !traveler || !userEmail) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    if (!db) {
      return res.status(503).json({
        success: false,
        message: 'Database not configured. Please set Firebase credentials.',
      });
    }

    const finalPrompt = AI_PROMT
      .replace('{location}', location)
      .replace('{days}', days)
      .replace('{traveler}', traveler)
      .replace('{budget}', budget);

    const tripData = await generateTripItinerary(finalPrompt);
    const parsedTripData = JSON.parse(tripData);

    const docId = Date.now().toString();
    await db.collection('travel-plan').doc(docId).set({
      userselection: { location, days, budget, traveler },
      tripdata: parsedTripData,
      userEmail,
      id: docId,
      createdAt: new Date(),
    });

    res.json({
      success: true,
      tripId: docId,
      trip: parsedTripData,
    });
  } catch (error) {
    console.error('Error generating trip:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate trip',
      error: error.message,
    });
  }
};

export const getTrip = async (req, res) => {
  try {
    const { tripId } = req.params;

    if (!tripId) {
      return res.status(400).json({
        success: false,
        message: 'Trip ID is required',
      });
    }

    if (!db) {
      return res.status(503).json({
        success: false,
        message: 'Database not configured',
      });
    }

    const docSnapshot = await db.collection('travel-plan').doc(tripId).get();

    if (!docSnapshot.exists()) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found',
      });
    }

    res.json({
      success: true,
      trip: docSnapshot.data(),
    });
  } catch (error) {
    console.error('Error fetching trip:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trip',
      error: error.message,
    });
  }
};

export const getUserTrips = async (req, res) => {
  try {
    const { userEmail } = req.params;

    if (!userEmail) {
      return res.status(400).json({
        success: false,
        message: 'User email is required',
      });
    }

    if (!db) {
      return res.status(503).json({
        success: false,
        message: 'Database not configured',
      });
    }

    const querySnapshot = await db
      .collection('travel-plan')
      .where('userEmail', '==', userEmail)
      .orderBy('createdAt', 'desc')
      .get();

    const trips = [];
    querySnapshot.forEach((doc) => {
      trips.push(doc.data());
    });

    res.json({
      success: true,
      trips,
    });
  } catch (error) {
    console.error('Error fetching user trips:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user trips',
      error: error.message,
    });
  }
};

export const getAllTrips = async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({
        success: false,
        message: 'Database not configured',
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const querySnapshot = await db
      .collection('travel-plan')
      .orderBy('createdAt', 'desc')
      .get();

    const trips = [];
    let count = 0;
    querySnapshot.forEach((doc) => {
      if (count >= skip && trips.length < limit) {
        trips.push(doc.data());
      }
      count++;
    });

    res.json({
      success: true,
      trips,
      page,
      limit,
      total: count,
    });
  } catch (error) {
    console.error('Error fetching trips:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trips',
      error: error.message,
    });
  }
};

export const saveTrip = async (req, res) => {
  try {
    const { tripId, userEmail } = req.body;

    if (!tripId || !userEmail) {
      return res.status(400).json({
        success: false,
        message: 'Trip ID and user email are required',
      });
    }

    if (!db) {
      return res.status(503).json({
        success: false,
        message: 'Database not configured',
      });
    }

    const docSnapshot = await db.collection('travel-plan').doc(tripId).get();

    if (!docSnapshot.exists()) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found',
      });
    }

    await db.collection('saved-trips').add({
      tripId,
      userEmail,
      savedAt: new Date(),
    });

    res.json({
      success: true,
      message: 'Trip saved successfully',
    });
  } catch (error) {
    console.error('Error saving trip:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save trip',
      error: error.message,
    });
  }
};

export const getSavedTrips = async (req, res) => {
  try {
    const { userEmail } = req.params;

    if (!userEmail) {
      return res.status(400).json({
        success: false,
        message: 'User email is required',
      });
    }

    if (!db) {
      return res.status(503).json({
        success: false,
        message: 'Database not configured',
      });
    }

    const savedTripsSnapshot = await db
      .collection('saved-trips')
      .where('userEmail', '==', userEmail)
      .get();

    const tripIds = [];
    savedTripsSnapshot.forEach((doc) => {
      tripIds.push(doc.data().tripId);
    });

    const trips = [];
    for (const tripId of tripIds) {
      const tripDoc = await db.collection('travel-plan').doc(tripId).get();
      if (tripDoc.exists()) {
        trips.push(tripDoc.data());
      }
    }

    res.json({
      success: true,
      trips,
    });
  } catch (error) {
    console.error('Error fetching saved trips:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch saved trips',
      error: error.message,
    });
  }
};
