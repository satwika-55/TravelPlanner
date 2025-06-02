import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/custom/Header.jsx'
import { Toaster } from './components/ui/sonner.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { View } from 'lucide-react'
import Viewtrip from './view-trip/[tripId]/index.jsx'
import Mytrip from './my-trips/index.jsx'
import RegisterLogin from './registerLogin.jsx'

const router = createBrowserRouter([
  {
    path : '/',
    element : <App />
  },
  {
    path : '/create-trip',
    element : <CreateTrip />
  },
  {
    path:'/view-trip/:tripId',
    element : <Viewtrip />
  },
  {
    path : '/my-trips',
    element : <Mytrip />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header />
      <RegisterLogin />
      <Toaster />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
)
