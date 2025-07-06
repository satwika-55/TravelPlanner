import React from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  const Card = ({ title, text }) => {
    return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      width: '400px',
      marginRight: '16px',
      height: '600px',
    }}>
      <h3 className='text-extrabold text-[50px]'>{title}</h3>
      <p>{text}</p>
    </div>
    );
  };
  const Urownreview = () => {
    return (
      <div className="height-[800px] w-[500px] border-2 border-gray-300 rounded-lg p-4 flex flex-col gap-4">
        <h2 className=" border-2 border-gray-300 rounded-lg"> A short description</h2>
        <h4 className=" border-2 border-gray-300 rounded-lg"> Explain your review in detail</h4>
        <p> Rate us!</p>
      </div>
    );
  };
  return (
    <>
    <div className = 'flex flex-col items-center mx-56 gap-9 '>
        <h1 className = 'font-extrabold text-[60px] text-center mt-20' >
            <span className = 'text-[#f56551]'>Make your own customised Iterneries</span> : with our AI-driven MakeYourTrip
        </h1>
        <p className = 'text-xl text-gray-700 text-center'>
            Get your personalized travel itenary taking into consideration the budget,Number of days, Place, Purpose of Visit etc.<br/>  
            <span className = 'font-bold '>Unleash Your Travel Beast!</span>
        </p>
        <Link to = '/create-trip'>
        <Button className="font-bold text-[35px] border border-black bg-red-400 w-65 h-25 border-2 rounded-md">Let's Pack!</Button>
        </Link>
        <img src = "https://wallpapers.com/images/featured/travel-ibk7fgrvtvhs7qzg.jpg"></img>

        <h2 className="font-bold text-center text-[40px] mt-40"> What our people say about us ? </h2>
        <div className="flex flex-wrap justify-center mt-10 gap-4">
          <Card title="Good" text="This is the first card." />
          <Card title="Excellent" text="This is the second card." />
          <Card title="Worthy" text="This is the third card." />
        </div>
        <h2 className="font-bold text-center text-[40px] mt-20"> Add your own review </h2>
        <Urownreview/>
    </div>
    </>
  )
}

export default Hero