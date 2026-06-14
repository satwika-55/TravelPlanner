import { db } from '../../service/firebaseconfig.jsx';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Information from './components/InfoSection.jsx';
import Hotels from './components/Hotels.jsx';
import PlacetoVists from './components/PlacetoVisits';

const Viewtrip = () => {
  const { tripId } = useParams();
  const [trip,setTrip]= useState([]);
  useEffect(() => {
    if (tripId) {
      getTripData();
    }
  }, [tripId]);

  const getTripData = async () => {
    // Check localStorage first for my trips or community feed trips
    const localTrips = JSON.parse(localStorage.getItem("my-trips")) || [];
    const localTrip = localTrips.find((t) => t.id === tripId);
    if (localTrip) {
      setTrip(localTrip);
      return;
    }

    const localFeed = JSON.parse(localStorage.getItem("community-trips")) || [];
    const feedTrip = localFeed.find((t) => t.id === tripId);
    if (feedTrip) {
      setTrip(feedTrip);
      return;
    }

    try {
      const docRef = doc(db, 'travel-plan', tripId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setTrip(docSnap.data());
      } else {
        console.log("No such document");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
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