import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Loader } from '@googlemaps/js-api-loader';

function CreateTrip() {
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);

  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
      libraries: ['places'],
    });

    loader
      .load()
      .then(() => {
        setIsGoogleLoaded(true);
      })
      .catch(err => {
        console.error('Failed to load Google Maps script:', err);
      });
  }, []);

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 text-center'>
      <h2 className='font-bold text-7xl'>Tell us your travel preferences</h2>
      <p className='mt-8 text-gray-700 text-3xl'>
        Just provide some basic information and we will personalise your travel experience!
      </p>

      <div className='mt-20'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is the destination of your choice?</h2>
          {isGoogleLoaded ? (
            <GooglePlacesAutocomplete
              selectProps={{
                onChange: (place) => console.log(place),
              }}
            />
          ) : (
            <p>Loading location autocomplete...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateTrip;
