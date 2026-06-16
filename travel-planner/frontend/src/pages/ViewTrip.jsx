import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Information from './ViewTrip/components/InfoSection.jsx';
import Hotels from './ViewTrip/components/Hotels.jsx';
import PlacetoVists from './ViewTrip/components/PlacetoVisits.jsx';
import Header from '../components/common/Header.jsx';
import Footer from '../components/common/Footer.jsx';
import { getTripData } from '../services/api.js';

const Viewtrip = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tripId) {
      fetchTripData();
    }
  }, [tripId]);

  const fetchTripData = async () => {
    try {
      setLoading(true);
      const data = await getTripData(tripId);
      setTrip(data);
    } catch (error) {
      console.error('Error fetching trip:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-white text-gray-900 min-h-screen font-sans'>
      <Header />
      <div className='pt-24 md:pt-28 px-6 md:px-12 lg:px-20 pb-20 max-w-6xl mx-auto'>
        {loading ? (
          <div className='flex items-center justify-center py-20'>
            <p className='text-gray-600'>Loading trip details...</p>
          </div>
        ) : (
          <>
            <Information trip={trip}/>
            <Hotels trip={trip}/>
            <PlacetoVists trip={trip}/>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Viewtrip;