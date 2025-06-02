import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Button} from '@/components/ui/button'
import Hero from './components/custom/Hero.jsx'


function App() {

  useEffect(() => {
    document.title = "Travel Planner";  // Set your desired title here
  }, []);

  useEffect(() => {
  const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = "image/svg+xml";
  link.rel = "icon";
  link.href = "/logo.svg"; // or /favicon.png
  document.getElementsByTagName('head')[0].appendChild(link);
  }, []);


  return (
    <>
    <Hero/>
    </>
  )
}

export default App
