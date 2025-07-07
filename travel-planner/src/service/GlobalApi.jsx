import axios from 'axios';

const BASE_URL='https://places.googleapis.com/vi.places:searchText'

const config = {
    headers:{
        'Content-Type':'application/json',
        'X-Goog-Api-key': import.meta.env.VITE_GEOAPIFY_API_KEY
        'X-Goog-FieldMask':[
            'places.photos',
            'places.displayName',
            'places.id'
        ] 
    }
}

export const GetPlaceDetails=(data)=>axios.post(BASE_URL, data, config)