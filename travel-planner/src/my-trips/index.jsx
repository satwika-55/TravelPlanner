import { db } from '@/service/firebaseconfig';
import { collection, getDocs, query, where } from 'firebase/firestore'; 
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Usertripcard from './components/Usertripcard';

const Mytrip = () => {
    const navigation = useNavigate();
    const [usertrips, setusertrips] = useState([]);

    useEffect(() => {
        GetUserTrip();
    }, []);

    const GetUserTrip = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            console.log('No user found, redirecting to home.');
            navigation('/'); // Redirect to home if no user found
            return;
        }
        setusertrips([]);
        console.log('Fetching trips for user:', user?.email); // Debug log

        try {
            const q = query(
                collection(db, 'cities'),
                where('userEmail', '==', user?.email) // Assuming 'userEmail' is the correct field
            );

            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                console.log('No trips found for this user.');
            } else {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, '==>', doc.data());
                    setusertrips(prevState => [...prevState, doc.data()]);
                });
            }
        } catch (error) {
            console.error('Error fetching trips:', error);
        }
    };

    return (
        <div className="sm:px-10 md:px-32 lg:px-52 xl:px-10 px-5 mt-10 mx-auto">
            <h2 className='font-bold text-3xl'>My Trips</h2>
            <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5'>
                {usertrips.map((trip, index) => {
                    return <Usertripcard key={index} trip={trip} />; // Add return here to render component
                })}
            </div>
        </div>
    );
};

export default Mytrip; 