import { db } from '@/service/firebaseconfig';
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
    try {
      const docRef = doc(db, 'travel-plan', tripId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setTrip(docSnap.data())
      } else {
        console.log("No such document");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
        <Information trip={trip}/>
        <Hotels trip={trip}/>
        <PlacetoVists trip={trip}/>
    </div>
  );
};

export default Viewtrip;