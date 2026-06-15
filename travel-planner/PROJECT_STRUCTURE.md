# Travel Planner - Project Structure Documentation

## Overview
This is a full-stack travel planning application built with React (frontend) and Express (backend). It generates AI-powered trip itineraries using Google Gemini API and stores data in Firebase Firestore.

---

## 📁 Project Directory Structure

```
travel-planner/
├── backend/                      # Express.js backend server
│   ├── config/
│   │   └── firebaseAdmin.js     # Firebase Admin SDK configuration
│   ├── controllers/
│   │   └── tripController.js    # Business logic for trip operations
│   ├── routes/
│   │   └── tripRoutes.js        # API endpoint definitions
│   ├── services/
│   │   └── geminiService.js     # Google Gemini API integration
│   ├── middleware/              # Custom middleware (empty - for future use)
│   ├── utils/                   # Utility functions (empty - for future use)
│   ├── server.js                # Main Express server entry point
│   ├── package.json             # Backend dependencies
│   └── .env.example             # Example environment variables
│
├── frontend/                    # React.js frontend application
│   ├── src/
│   │   ├── assets/              # Static images, logos, etc.
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Header.jsx   # Navigation header component
│   │   │   │   └── Footer.jsx   # Footer component
│   │   │   └── ui/              # Shadcn UI components (reusable)
│   │   │       ├── button.jsx
│   │   │       ├── dialog.jsx
│   │   │       ├── input.jsx
│   │   │       ├── popover.jsx
│   │   │       └── sonner.jsx   # Toast notifications
│   │   ├── constants/
│   │   │   └── options.jsx      # Budget & traveler type options, AI prompts
│   │   ├── layouts/
│   │   │   └── RootLayout.jsx   # Main layout with Header/Footer
│   │   ├── lib/
│   │   │   └── utils.js         # Utility functions
│   │   ├── pages/               # Page components (one page per file)
│   │   │   ├── Home.jsx         # Landing/home page with carousel
│   │   │   ├── CreateTrip.jsx   # Trip form page
│   │   │   ├── ViewTrip.jsx     # Trip details page
│   │   │   │   └── components/  # ViewTrip-specific components
│   │   │   │       ├── Hotels.jsx
│   │   │   │       ├── InfoSection.jsx
│   │   │   │       └── PlacetoVisits.jsx
│   │   │   ├── Community.jsx    # Community feed (social media style)
│   │   │   ├── MyTrips.jsx      # User's created trips
│   │   │   ├── SavedTrips.jsx   # User's saved trips
│   │   │   └── About.jsx        # About page
│   │   ├── services/
│   │   │   ├── api.js           # API calls to backend (fetch wrapper)
│   │   │   ├── GlobalApi.jsx    # Geoapify place suggestions API
│   │   │   └── firebaseConfig.jsx # Firebase client configuration
│   │   ├── App.jsx              # Root app component (minimal)
│   │   ├── main.jsx             # React-Router setup & app entry
│   │   ├── index.css            # Global styles
│   │   └── App.css              # App-specific styles
│   ├── public/                  # Static files served as-is
│   ├── index.html               # HTML template
│   ├── vite.config.js           # Vite build configuration
│   ├── jsconfig.json            # JavaScript configuration
│   ├── components.json          # Shadcn UI configuration
│   ├── package.json             # Frontend dependencies
│   ├── .env.example             # Example environment variables
│   └── .gitignore               # Git ignore patterns
│
├── package.json                 # Root package.json (monorepo scripts)
├── .gitignore                   # Global git ignore
└── README.md                    # Project documentation

```

---

## 🗂️ What Each Folder/File Does

### **Backend Structure**

#### `backend/server.js`
- **Purpose**: Entry point for the Express server
- **What it does**: Initializes Express app, sets up CORS, defines routes, and starts server on port 5000
- **Key config**: CORS allows `localhost:5173` (frontend dev) and `localhost:3000`

#### `backend/config/firebaseAdmin.js`
- **Purpose**: Firebase Admin SDK initialization
- **What it does**: Sets up Firebase admin authentication using service account credentials from environment variables
- **Why separate**: Backend needs admin access to read/write to Firestore securely (frontend can't use admin SDK)

#### `backend/controllers/tripController.js`
- **Purpose**: Business logic for trip-related operations
- **Functions**:
  - `generateTrip()` - Takes user input, calls Gemini AI, saves to Firestore
  - `getTrip()` - Fetches single trip by ID
  - `getUserTrips()` - Gets all trips created by a user
  - `getAllTrips()` - Gets trips for community feed (paginated)
  - `saveTrip()` - Saves trip to user's saved list
  - `getSavedTrips()` - Gets user's saved trips

#### `backend/services/geminiService.js`
- **Purpose**: Google Gemini AI integration
- **What it does**: Wraps the Gemini API calls and generates trip itineraries based on prompts
- **Why separate**: Encapsulates API calls for reusability and easy maintenance

#### `backend/routes/tripRoutes.js`
- **Purpose**: Defines API endpoints
- **Routes**:
  - `POST /api/trips/generate` - Generate new trip
  - `GET /api/trips/:tripId` - Get single trip
  - `GET /api/trips/user/:userEmail` - Get user's created trips
  - `GET /api/trips` - Get all trips (with pagination)
  - `POST /api/trips/save` - Save a trip
  - `GET /api/trips/saved/:userEmail` - Get user's saved trips

---

### **Frontend Structure**

#### `frontend/src/main.jsx`
- **Purpose**: React Router setup
- **What it does**: Defines all routes, sets up GoogleOAuthProvider, renders app
- **Key components**: Router config, Toaster for notifications

#### `frontend/src/layouts/RootLayout.jsx`
- **Purpose**: Main layout wrapper
- **What it does**: Renders Header, main content (via Outlet), and Footer
- **Result**: Consistent layout across all pages

#### `frontend/src/pages/`
- **Purpose**: Page components (one per file for clarity)
- **Files**:
  - `Home.jsx` - Landing page with carousel of destination cards + call-to-action
  - `CreateTrip.jsx` - Form to collect trip preferences (location, days, budget, traveler type)
  - `ViewTrip.jsx` - Display generated trip details with hotels and places to visit
  - `Community.jsx` - Feed of all trips (social media style)
  - `MyTrips.jsx` - List of trips user has created
  - `SavedTrips.jsx` - List of trips user has saved
  - `About.jsx` - About page

#### `frontend/src/pages/ViewTrip/components/`
- `InfoSection.jsx` - Shows trip overview (location, duration, budget, description)
- `Hotels.jsx` - Displays hotel recommendations
- `PlacetoVisits.jsx` - Displays itinerary and places to visit

#### `frontend/src/components/common/`
- `Header.jsx` - Navigation bar with links to all pages, logo, auth status
- `Footer.jsx` - Footer with links and info

#### `frontend/src/components/ui/`
- **Purpose**: Reusable Shadcn UI components
- **Files**: button, dialog, input, popover, sonner (toast notifications)

#### `frontend/src/services/api.js`
- **Purpose**: Frontend API client
- **What it does**: Makes fetch requests to backend `/api/trips` endpoints
- **Base URL**: From `VITE_API_BASE_URL` environment variable (default: `http://localhost:5000/api`)
- **Functions**: `generateTrip()`, `getTripData()`, `getUserTrips()`, `getAllTrips()`, `saveTrip()`, `getSavedTrips()`

#### `frontend/src/services/GlobalApi.jsx`
- **Purpose**: Geoapify place autocomplete API
- **What it does**: Fetches place suggestions as user types in location field

#### `frontend/src/services/firebaseConfig.jsx`
- **Purpose**: Firebase client configuration
- **What it does**: Initializes Firebase for client-side auth and storage (if needed)

#### `frontend/src/constants/options.jsx`
- **Purpose**: Static data
- **Contains**: Budget options, traveler types, AI prompt template

---

## 🔄 Data Flow

### Trip Generation Flow
1. User fills form on `CreateTrip.jsx` (location, days, budget, traveler type)
2. Clicks "Generate Trip" → calls `generateTrip()` from `services/api.js`
3. Frontend sends POST request to `backend/routes/tripRoutes.js` → `POST /api/trips/generate`
4. Backend controller calls `geminiService.generateTripItinerary()` with the Gemini API
5. Gemini returns itinerary as JSON
6. Backend saves to Firestore and returns `tripId`
7. Frontend redirects to `/view-trip/{tripId}`
8. `ViewTrip.jsx` calls `getTripData(tripId)` to fetch and display trip

### Community Feed Flow
1. User navigates to `/community`
2. `Community.jsx` calls `getAllTrips()` (paginated)
3. Displays trips as cards with like/comment/save options
4. Click card → redirects to `/view-trip/{tripId}`

---

## 🔐 Environment Variables

### Backend (`.env`)
```
PORT=5000
NODE_ENV=development
VITE_GOOGLE_GEMINI_API_KEY=<your_gemini_key>
VITE_GEOAPIFY_API_KEY=<your_geoapify_key>
FIREBASE_PROJECT_ID=travel-planner-71b4c
FIREBASE_PRIVATE_KEY=<your_firebase_private_key>
FIREBASE_CLIENT_EMAIL=<your_firebase_service_account_email>
```

### Frontend (`.env`)
```
VITE_GOOGLE_AUTH_CLIENT_ID=<your_google_oauth_client_id>
VITE_GEOAPIFY_API_KEY=<your_geoapify_key>
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🚀 How to Run

### Start Backend
```bash
cd backend
npm install
npm run dev
```
Server runs on `http://localhost:5000`

### Start Frontend
```bash
cd frontend
npm install
npm run dev
```
App runs on `http://localhost:5173`

### Run Both (from root)
```bash
npm install-all
npm run dev
```

---

## 📱 Key Features

| Feature | Where | Implementation |
|---------|-------|-----------------|
| Trip Generation | `CreateTrip.jsx` + Backend | Gemini AI API + form validation |
| Community Feed | `Community.jsx` | Paginated fetch from backend |
| View Trip Details | `ViewTrip.jsx` | Fetches from Firestore via backend |
| Save Trips | `SavedTrips.jsx` | Saves reference in `saved-trips` collection |
| User Trips | `MyTrips.jsx` | Filters by user email |
| Google Auth | `Header.jsx` | React OAuth + localStorage |

---

## 🔧 Architecture Principles

1. **Separation of Concerns**
   - Backend handles API/business logic
   - Frontend handles UI/UX
   - Each page is a separate component

2. **Security**
   - API keys in backend (.env) only
   - Firebase Admin SDK on backend (protects database)
   - Frontend uses client SDK for auth only

3. **Scalability**
   - Modular components in `/components`
   - Service layer for API calls
   - Controllers for business logic
   - Routes organized by resource

4. **Maintainability**
   - Clear naming conventions
   - Organized folder structure
   - Services abstract external APIs
   - Constants in dedicated files

---

## 🔮 Next Steps (For You)

1. **Connect backend to frontend**: Update `VITE_API_BASE_URL` in frontend `.env`
2. **Add authentication checks**: Validate user tokens in backend routes (middleware)
3. **Add database migrations**: Create Firestore collections if they don't exist
4. **Add error handling**: More specific error messages in controllers
5. **Add more features**:
   - Comments on trips (Community)
   - Like/Unlike functionality
   - User profiles
   - Edit/Delete trips
   - Share trips

---

## 📝 File Naming Conventions

- **Components**: `PascalCase.jsx` (e.g., `Header.jsx`)
- **Pages**: `PascalCase.jsx` (e.g., `CreateTrip.jsx`)
- **Services**: `camelCase.js` (e.g., `api.js`)
- **Config**: `camelCase.js` (e.g., `firebaseAdmin.js`)
- **Controllers**: `<resource>Controller.js` (e.g., `tripController.js`)
- **Routes**: `<resource>Routes.js` (e.g., `tripRoutes.js`)

---

## ✅ Clean-Up Done

✔ Backend folder created with proper structure  
✔ API service layer created in frontend  
✔ Pages reorganized to `/pages` folder  
✔ Removed redundant code from frontend  
✔ Fixed all import paths  
✔ Added environment variable examples  
✔ Updated root package.json with dev scripts  

Good luck with your project! 🚀
