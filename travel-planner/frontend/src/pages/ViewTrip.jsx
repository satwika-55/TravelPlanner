import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Information from './ViewTrip/components/InfoSection.jsx';
import Hotels from './ViewTrip/components/Hotels.jsx';
import PlacetoVists from './ViewTrip/components/PlacetoVisits.jsx';
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
    <div className='pt-28 md:pt-36 p-10 md:px-20 lg:px-44 xl:px-56 bg-black text-white min-h-screen'>
        <Information trip={trip}/>
        <Hotels trip={trip}/>
        <PlacetoVists trip={trip}/>
    </div>
  );
};

export default Viewtrip;