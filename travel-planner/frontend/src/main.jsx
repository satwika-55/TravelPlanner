import { StrictMode } from 'react'
import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from './components/ui/sonner.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import RootLayout from './layouts/RootLayout.jsx'

import Home from './pages/Home.jsx'
import CreateTrip from './pages/CreateTrip.jsx'
import ViewTrip from './pages/ViewTrip.jsx'
import MyTrips from './pages/MyTrips.jsx'
import Community from './pages/Community.jsx'
import SavedTrips from './pages/SavedTrips.jsx'
import About from './pages/About.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/create-trip',
        element: <CreateTrip />
      },
      {
        path: '/view-trip/:tripId',
        element: <ViewTrip />
      },
      {
        path: '/my-trips',
        element: <MyTrips />
      },
      {
        path: '/community',
        element: <Community />
      },
      {
        path: '/saved-trips',
        element: <SavedTrips />
      },
      {
        path: '/about',
        element: <About />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <RouterProvider router={router} />
      <Toaster />
    </GoogleOAuthProvider>
  </StrictMode>
)
