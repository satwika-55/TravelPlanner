import { StrictMode } from 'react'
import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/common/Header.jsx'
import { Toaster } from './components/ui/sonner.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { View } from 'lucide-react'
import Viewtrip from './view-trip/[tripId]/index.jsx'
import MyTrips from './pages/MyTrips.jsx'
import Explore from './pages/Explore.jsx'
import Community from './pages/Community.jsx'
import SavedTrips from './pages/SavedTrips.jsx'
import About from './pages/About.jsx'
import RootLayout from './layouts/RootLayout.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <App />
      },
      {
        path: '/create-trip',
        element: <CreateTrip />
      },
      {
        path: '/view-trip/:tripId',
        element: <Viewtrip />
      },
      {
        path: '/my-trips',
        element: <MyTrips />
      },
      {
        path: '/explore',
        element: <Explore />
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
    </GoogleOAuthProvider>
  </StrictMode>
)
