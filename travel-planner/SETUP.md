# Quick Setup Guide

## Prerequisites
- Node.js (v18 or higher)
- Firebase Project with Firestore
- Google Gemini API Key
- Geoapify API Key
- Google OAuth Credentials

## Installation

### Step 1: Install Dependencies

From the root directory:
```bash
npm run install-all
```

Or individually:
```bash
# Install backend dependencies
cd backend && npm install && cd ..

# Install frontend dependencies
cd frontend && npm install && cd ..
```

### Step 2: Configure Environment Variables

#### Backend Setup (backend/.env)
```bash
cp backend/.env.example backend/.env
```

Fill in the values:
```env
PORT=5000
NODE_ENV=development

# Get from: https://console.cloud.google.com/
VITE_GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here

# Get from: https://www.geoapify.com/
VITE_GEOAPIFY_API_KEY=your_geoapify_api_key_here

# Firebase Admin Credentials (from Firebase Console → Service Accounts)
FIREBASE_PROJECT_ID=travel-planner-71b4c
FIREBASE_PRIVATE_KEY=your_firebase_private_key_here
FIREBASE_CLIENT_EMAIL=your_firebase_client_email_here
```

#### Frontend Setup (frontend/.env)
```bash
cp frontend/.env.example frontend/.env
```

Fill in the values:
```env
# Get from: https://console.cloud.google.com/ (OAuth 2.0 Client ID)
VITE_GOOGLE_AUTH_CLIENT_ID=your_google_auth_client_id_here

VITE_GEOAPIFY_API_KEY=your_geoapify_api_key_here

# Backend API URL (for development)
VITE_API_BASE_URL=http://localhost:5000/api
```

### Step 3: Set Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Create a **Firestore Database** (not Realtime Database)
4. Create service account credentials:
   - Go to Project Settings → Service Accounts
   - Click "Generate New Private Key"
   - Copy the `privateKey` and `client_email` values to backend/.env

## Running the Application

### Option 1: Run Both (Recommended for Development)
```bash
# From root directory
npm run dev
```
This runs backend on `http://localhost:5000` and frontend on `http://localhost:5173`

### Option 2: Run Separately
```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

### Option 3: Production Build
```bash
npm run build
```

## Testing the Setup

1. Open `http://localhost:5173` in your browser
2. Click "Generate Trip"
3. Fill in the form:
   - Destination: Any place
   - Days: 3-5
   - Budget: Select one
   - Traveler: Select one
4. Click "Generate Trip"
5. Check backend console for Gemini API response
6. Trip should be saved to Firestore and displayed

## Troubleshooting

### Backend won't start
- Check if port 5000 is already in use: `lsof -i :5000` (Mac/Linux) or `netstat -ano | findstr :5000` (Windows)
- Ensure all environment variables are set correctly
- Check Firebase credentials are valid

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check `VITE_API_BASE_URL` in frontend/.env
- Check browser console for CORS errors

### Gemini API errors
- Verify API key is correct and active
- Check quota in Google Cloud Console
- Ensure API is enabled in Google Cloud project

### Firebase errors
- Verify service account credentials
- Ensure Firestore database exists and is accessible
- Check Firebase project ID matches

## Project Structure Reminder
See `PROJECT_STRUCTURE.md` for detailed folder and file descriptions.

## Next Steps
1. Test the complete flow (generate → save → view trip)
2. Set up database schema (ensure collections exist)
3. Add more features (comments, likes, shares)
4. Deploy to production

Good luck! 🚀
