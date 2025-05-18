export const SelectTravelList = [
    {
      id: 1,
      title: 'Just Me',
      desc: 'A sole traveler in exploration',
      icon: '🧍🏾‍♂️',
      people: '1'
    },
    {
      id: 2,
      title: 'Couple',
      desc: 'Perfect for two people to share an adventure together',
      icon: '❤️',
      people: '2'
    },
    {
      id: 3,
      title: 'Family',
      desc: 'A group of fun loving adv',
      icon: '🏠',
      people: '3 to 5 people'
    },
    {
      id: 4,
      title: 'Friends',
      desc: 'A group of friends ready for some fun and exploration',
      icon: '👯‍♂️',
      people: '5+'
    }
  ];

  export const selectBudgetOption = [
    {
      id: 1,
      title: 'Cheap',
      desc: 'Stay conscious of cost',
      icon: '💸'
    },
    {
      id: 2,
      title: 'Moderate',
      desc: 'Comfortable travel within a balanced budget',
      icon: '💵'
    },
    {
      id: 3,
      title: 'Expensive',
      desc: 'For those who prefer luxury and indulgence',
      icon: '💎' 
    }
  ];
  

  export const AI_PROMT='Generate Travel Plan for Location : {location}, for {days} Days for {traveler} with a {budget} budget , Give me a Hotels options list with\nHotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place\nDetails, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with\nbest time to visit in JSON format,'