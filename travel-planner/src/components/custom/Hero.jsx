import React from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <>
    <div className = 'flex flex-col items-center mx-56 gap-9'>
        <h1 className = 'font-extrabold text-[60px] text-center mt-20' >
            <span className = 'text-[#f56551]'>Discover the power of travel planning</span> : with our AI-driven MakeYourTrip
        </h1>
        <p className = 'text-xl text-gray-700 text-center'>
            Get your personalized travel itenary taking into consideration the budget,Number of days, Place, Purpose of Visit etc.<br/>  
            <span className = 'font-bold '>Unleash Your Travel Beast!</span>
        </p>
        <Link to = '/create-trip'>
        <Button className="font-bold text-[35px] border border-black bg-red-200 w-65 h-25 border-2 rounded-md">Let's Pack!</Button>
        </Link>
    </div>
    </>
  )
}

export default Hero