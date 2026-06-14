# RoamAI Frontend Documentation

## Overview
RoamAI is a premium AI-powered travel planning platform with a polished, production-ready frontend. The application uses React with Vite, featuring a modern dark theme inspired by premium travel brands like Airbnb, Google Travel, and Linear.

---

## Frontend Folder Structure

```
frontend/
├── public/                      # Static assets
│   └── vite.svg
├── src/
│   ├── assets/                 # Images, fonts, icons
│   │   └── logo.png
│   ├── components/             # Reusable UI components
│   │   ├── common/            # Shared layout components
│   │   │   ├── Header.jsx    # Navigation bar with auth
│   │   │   └── Footer.jsx    # Footer with links and newsletter
│   │   └── ui/               # Base UI components (shadcn/ui)
│   │       ├── button.jsx    # Button component
│   │       ├── dialog.jsx    # Modal/dialog component
│   │       ├── input.jsx     # Input field component
│   │       ├── popover.jsx   # Popover/tooltip component
│   │       └── sonner.jsx    # Toast notifications
│   ├── constants/             # Application constants
│   │   └── options.jsx       # AI prompt templates
│   ├── create-trip/           # Trip creation flow
│   │   └── index.jsx         # Create trip page
│   ├── layouts/               # Layout wrappers
│   │   └── RootLayout.jsx    # Main layout with Header/Footer
│   ├── lib/                   # Utility functions
│   │   └── utils.js          # Helper utilities
│   ├── pages/                 # Route pages
│   │   ├── About.jsx         # About page
│   │   ├── Community.jsx     # Community feed page
│   │   ├── Explore.jsx       # Explore destinations (unused - removed from nav)
│   │   ├── LandingPage.jsx   # Homepage (main landing page)
│   │   ├── MyTrips.jsx       # User's trips page
│   │   └── SavedTrips.jsx    # Saved trips page
│   ├── service/               # API services
│   │   ├── AIModal.jsx       # AI chat session service
│   │   ├── GlobalApi.jsx     # Global API configurations
│   │   └── firebaseConfig.jsx # Firebase configuration
│   ├── view-trip/             # Trip viewing flow
│   │   └── [tripId]/
│   │       ├── index.jsx     # Trip detail page
│   │       └── components/
│   │           ├── Hotels.jsx       # Hotel listings
│   │           ├── InfoSection.jsx  # Trip info section
│   │           └── PlacetoVisits.jsx # Places to visit
│   ├── App.css               # App-specific styles (empty)
│   ├── App.jsx               # Main App component
│   ├── index.css             # Global styles and Tailwind
│   ├── main.jsx              # Application entry point with routing
│   └── jsconfig.json         # JS configuration
├── .env.local                # Environment variables
├── components.json           # shadcn/ui configuration
├── eslint.config.js          # ESLint configuration
├── index.html                # HTML entry point
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
└── README.md                 # Frontend README
```

---

## File Descriptions

### Core Application Files

#### `src/main.jsx`
- **Purpose**: Application entry point and routing configuration
- **Key Features**: 
  - React Router setup with all routes
  - Google OAuth provider configuration
  - Route definitions for all pages
- **Safe to Modify**: ⚠️ **Caution** - Contains critical routing logic
- **Dependencies**: All page components, RootLayout

#### `src/App.jsx`
- **Purpose**: Root component that renders LandingPage
- **Key Features**: Simple wrapper for homepage
- **Safe to Modify**: ✅ Yes - minimal logic

#### `src/layouts/RootLayout.jsx`
- **Purpose**: Main layout wrapper with Header and Footer
- **Key Features**: Provides consistent layout across all routes
- **Safe to Modify**: ✅ Yes - layout changes only

### Pages

#### `src/pages/LandingPage.jsx` (⭐ PRIMARY FOCUS)
- **Purpose**: Main homepage with hero carousel, trip planner, and feature sections
- **Key Features**:
  - Hero carousel with 8 destination slides
  - AI Trip Planner form with glassmorphism design
  - Massive destination headlines with gradient typography
  - Destination-specific storytelling highlights
  - Trending destinations section
  - Travel categories grid
  - Community preview section
  - Why Use Platform features
  - Testimonials
  - FAQ accordion
  - Generation loading overlay
- **Safe to Modify**: ✅ Yes - main landing page
- **Reusable Components**: Destination cards, stat displays, FAQ items

#### `src/pages/Community.jsx`
- **Purpose**: Community feed showing shared trips
- **Key Features**: Trip cards with likes, comments, save functionality
- **Safe to Modify**: ✅ Yes
- **Dependencies**: Header, Footer

#### `src/pages/MyTrips.jsx`
- **Purpose**: User's created trips list
- **Key Features**: Trip cards with view/edit/delete actions
- **Safe to Modify**: ✅ Yes

#### `src/pages/SavedTrips.jsx`
- **Purpose**: User's saved trips from community
- **Key Features**: Saved trip cards with unsave functionality
- **Safe to Modify**: ✅ Yes

#### `src/pages/About.jsx`
- **Purpose**: About page with company information
- **Key Features**: Company info, team, mission
- **Safe to Modify**: ✅ Yes

#### `src/pages/Explore.jsx` (⚠️ UNUSED)
- **Purpose**: Explore destinations page (removed from navbar)
- **Status**: File exists but not linked in navigation
- **Recommendation**: Can be deleted or repurposed for future use
- **Safe to Modify**: ✅ Yes - not currently used

### Common Components

#### `src/components/common/Header.jsx`
- **Purpose**: Navigation bar with logo, links, and authentication
- **Key Features**:
  - Responsive navigation (desktop/mobile)
  - Google OAuth integration
  - User profile display
  - Scroll-based background blur
  - Active route highlighting
- **Navigation Links**: Home, Community, Saved Trips, My Trips, About
- **Safe to Modify**: ✅ Yes - navigation changes only
- **Reusable**: ✅ Yes - used across all pages

#### `src/components/common/Footer.jsx`
- **Purpose**: Footer with links, social media, newsletter
- **Key Features**:
  - Brand information
  - Quick links (Community, My Trips, Saved Trips, About)
  - Resources links
  - Newsletter signup form
  - Social media links
- **Safe to Modify**: ✅ Yes
- **Reusable**: ✅ Yes - used across all pages

### UI Components (shadcn/ui)

#### `src/components/ui/button.jsx`
- **Purpose**: Reusable button component
- **Variants**: Default, destructive, outline, ghost, link
- **Sizes**: Default, sm, lg, icon
- **Safe to Modify**: ⚠️ **Caution** - base UI component
- **Reusable**: ✅ Yes - highly reusable

#### `src/components/ui/dialog.jsx`
- **Purpose**: Modal/dialog component
- **Safe to Modify**: ⚠️ **Caution** - base UI component
- **Reusable**: ✅ Yes

#### `src/components/ui/input.jsx`
- **Purpose**: Input field component
- **Safe to Modify**: ⚠️ **Caution** - base UI component
- **Reusable**: ✅ Yes

#### `src/components/ui/popover.jsx`
- **Purpose**: Popover/tooltip component
- **Safe to Modify**: ⚠️ **Caution** - base UI component
- **Reusable**: ✅ Yes

#### `src/components/ui/sonner.jsx`
- **Purpose**: Toast notification wrapper
- **Safe to Modify**: ⚠️ **Caution** - base UI component
- **Reusable**: ✅ Yes

### Trip Creation & Viewing

#### `src/create-trip/index.jsx`
- **Purpose**: Alternative trip creation flow
- **Safe to Modify**: ✅ Yes

#### `src/view-trip/[tripId]/index.jsx`
- **Purpose**: Trip detail page with itinerary
- **Key Features**: Displays hotels, places to visit, trip info
- **Dependencies**: Hotels, InfoSection, PlacetoVisits components
- **Safe to Modify**: ✅ Yes

#### `src/view-trip/[tripId]/components/Hotels.jsx`
- **Purpose**: Hotel listings component
- **Safe to Modify**: ✅ Yes
- **Reusable**: ✅ Yes - can be used in other contexts

#### `src/view-trip/[tripId]/components/InfoSection.jsx`
- **Purpose**: Trip information section
- **Safe to Modify**: ✅ Yes
- **Reusable**: ✅ Yes

#### `src/view-trip/[tripId]/components/PlacetoVisits.jsx`
- **Purpose**: Places to visit component
- **Safe to Modify**: ✅ Yes
- **Reusable**: ✅ Yes

### Services

#### `src/service/AIModal.jsx`
- **Purpose**: AI chat session service for trip generation
- **Key Features**: Google Gemini API integration
- **Safe to Modify**: ⚠️ **Caution** - core AI logic
- **Backend Integration**: Will need real API endpoint

#### `src/service/GlobalApi.jsx`
- **Purpose**: Global API configurations
- **Safe to Modify**: ⚠️ **Caution** - API configuration

#### `src/service/firebaseConfig.jsx`
- **Purpose**: Firebase configuration
- **Safe to Modify**: ⚠️ **Caution** - authentication config

### Constants & Utilities

#### `src/constants/options.jsx`
- **Purpose**: AI prompt templates for trip generation
- **Key Features**: Structured prompt for AI model
- **Safe to Modify**: ⚠️ **Caution** - affects AI output quality
- **Backend Integration**: May need adjustment based on backend API

#### `src/lib/utils.js`
- **Purpose**: Utility functions (cn helper for classnames)
- **Safe to Modify**: ✅ Yes - utility functions only

### Styling

#### `src/index.css`
- **Purpose**: Global styles and Tailwind CSS imports
- **Key Features**: Tailwind directives, custom animations, scrollbar styles
- **Safe to Modify**: ✅ Yes - styling only
- **Custom Animations**: fadeIn, slide animations

#### `src/App.css`
- **Purpose**: App-specific styles (currently empty)
- **Safe to Modify**: ✅ Yes

---

## Component Hierarchy

```
App
└── RootLayout
    ├── Header
    └── [Route Content]
        ├── LandingPage
        │   ├── Hero Carousel
        │   ├── AI Trip Planner (Glass Card)
        │   ├── Trending Destinations
        │   ├── Travel Categories
        │   ├── Community Preview
        │   ├── Why Use Platform
        │   ├── Testimonials
        │   └── FAQ
        ├── Community
        │   └── Trip Cards
        ├── MyTrips
        │   └── Trip Cards
        ├── SavedTrips
        │   └── Trip Cards
        ├── About
        │   └── About Content
        ├── CreateTrip
        │   └── Trip Form
        └── ViewTrip
            ├── Hotels
            ├── InfoSection
            └── PlacetoVisits
    └── Footer
```

---

## Reusable Components

### Highly Reusable (✅ Recommended for reuse)
- **Header.jsx** - Navigation bar with auth
- **Footer.jsx** - Footer with links
- **button.jsx** - Button component (shadcn/ui)
- **input.jsx** - Input component (shadcn/ui)
- **dialog.jsx** - Modal component (shadcn/ui)
- **Hotels.jsx** - Hotel listings
- **InfoSection.jsx** - Trip info section
- **PlacetoVisits.jsx** - Places to visit

### Context-Specific (⚠️ Use with caution)
- **LandingPage.jsx** - Homepage specific
- **Community.jsx** - Community feed specific
- **MyTrips.jsx** - User trips specific
- **SavedTrips.jsx** - Saved trips specific

### Not Reusable (❌ Page-specific)
- **About.jsx** - About page only
- **Explore.jsx** - Explore page only (unused)
- **CreateTrip/index.jsx** - Creation flow only
- **ViewTrip/[tripId]/index.jsx** - Trip detail only

---

## Files Safe to Modify

### ✅ Safe to Modify (Low Risk)
- `src/pages/LandingPage.jsx` - Main landing page
- `src/pages/Community.jsx` - Community feed
- `src/pages/MyTrips.jsx` - My trips page
- `src/pages/SavedTrips.jsx` - Saved trips page
- `src/pages/About.jsx` - About page
- `src/components/common/Header.jsx` - Navigation bar
- `src/components/common/Footer.jsx` - Footer
- `src/index.css` - Global styles
- `src/App.css` - App-specific styles
- `src/lib/utils.js` - Utility functions

### ⚠️ Modify with Caution (Medium Risk)
- `src/main.jsx` - Routing configuration
- `src/layouts/RootLayout.jsx` - Main layout
- `src/create-trip/index.jsx` - Trip creation flow
- `src/view-trip/[tripId]/index.jsx` - Trip detail page
- `src/view-trip/[tripId]/components/*.jsx` - Trip components
- `src/constants/options.jsx` - AI prompt templates

### ❌ Do Not Modify (High Risk)
- `src/components/ui/*.jsx` - Base UI components (shadcn/ui)
- `src/service/AIModal.jsx` - AI service (without backend knowledge)
- `src/service/GlobalApi.jsx` - API configuration
- `src/service/firebaseConfig.jsx` - Firebase configuration
- `package.json` - Dependencies (without testing)
- `vite.config.js` - Build configuration

---

## Design System

### Color Palette
- **Primary**: Amber-500 (#f59e0b) to Rose-600 (#e11d48) gradient
- **Background**: Black (#000000) and Neutral-950 (#0a0a0a)
- **Surface**: Neutral-900/60 with backdrop blur
- **Text**: White (#ffffff) and Gray-300 (#d1d5db)
- **Accent**: Amber-500 for highlights and CTAs

### Typography
- **Headings**: Font-black, tracking-tight, gradient text
- **Body**: Font-light to font-medium
- **Labels**: Uppercase, tracking-widest, text-xs
- **Scale**: 
  - Hero: text-5xl to text-8xl
  - Section titles: text-3xl to text-4xl
  - Body: text-sm to text-lg

### Spacing
- **Section padding**: py-20 to py-24
- **Card padding**: p-6 to p-8
- **Gap**: gap-6 to gap-8 for grids
- **Margins**: mb-8 to mb-16 for vertical rhythm

### Components
- **Cards**: rounded-2xl to rounded-3xl, backdrop-blur, border
- **Buttons**: rounded-xl, gradient backgrounds, shadow-lg
- **Inputs**: rounded-xl, bg-white/5, border-white/10
- **Glassmorphism**: backdrop-blur-xl, bg-black/50, border-white/10

### Animations
- **Hover**: scale-105, y-4 to y-8, border color changes
- **Transitions**: duration-300 to duration-500, ease-out
- **Framer Motion**: Slide transitions, fade effects
- **Loading**: Spin animations, pulse effects

---

## Backend Integration Suggestions

### 1. Authentication
**Current**: Google OAuth with localStorage
**Suggested Backend Integration**:
- Implement JWT-based authentication
- Replace localStorage with secure HTTP-only cookies
- Add refresh token mechanism
- Implement proper session management

**Files to Modify**:
- `src/components/common/Header.jsx` - Auth state management
- `src/service/firebaseConfig.jsx` - Replace with auth API calls
- Add auth context/provider for global state

### 2. Trip Generation API
**Current**: Google Gemini API with fallback mock data
**Suggested Backend Integration**:
- Create dedicated trip generation endpoint
- Implement rate limiting and caching
- Add user-specific prompt customization
- Store generated trips in database

**Files to Modify**:
- `src/service/AIModal.jsx` - Replace with backend API calls
- `src/constants/options.jsx` - Move prompt templates to backend
- `src/pages/LandingPage.jsx` - Update generation flow

### 3. Trip Storage
**Current**: localStorage for trips
**Suggested Backend Integration**:
- Implement RESTful API for CRUD operations
- Add database models for trips, hotels, places
- Implement pagination and filtering
- Add trip sharing and collaboration features

**Files to Modify**:
- `src/pages/LandingPage.jsx` - Replace localStorage with API calls
- `src/pages/MyTrips.jsx` - Fetch from backend
- `src/pages/SavedTrips.jsx` - Fetch from backend
- `src/pages/Community.jsx` - Fetch from backend

### 4. Community Feed
**Current**: Mock community data in localStorage
**Suggested Backend Integration**:
- Implement real-time community feed
- Add likes, comments, saves functionality
- Implement user profiles and following
- Add content moderation

**Files to Modify**:
- `src/pages/Community.jsx` - Real-time feed updates
- Add WebSocket or polling for real-time updates
- Implement social interactions API

### 5. Place Suggestions
**Current**: Geoapify API (free tier)
**Suggested Backend Integration**:
- Cache popular destinations
- Implement custom place search
- Add place details and images
- Integrate with trip generation

**Files to Modify**:
- `src/pages/LandingPage.jsx` - Replace with backend suggestions
- Add place search API endpoint

### 6. File Upload
**Current**: None (using Unsplash images)
**Suggested Backend Integration**:
- Implement image upload for trip photos
- Add file storage (S3, Cloudinary)
- Implement image optimization
- Add user avatars

**Files to Modify**:
- Add upload component to `src/components/ui/`
- Update trip creation flow to handle uploads
- Implement file upload API

### 7. Analytics & Tracking
**Current**: None
**Suggested Backend Integration**:
- Implement user behavior tracking
- Add trip generation analytics
- Track popular destinations
- Implement A/B testing

**Files to Modify**:
- Add analytics provider
- Track key user actions
- Implement conversion tracking

### 8. Email Notifications
**Current**: None
**Suggested Backend Integration**:
- Implement email service
- Send trip confirmation emails
- Add community interaction notifications
- Implement newsletter functionality

**Files to Modify**:
- `src/components/common/Footer.jsx` - Connect newsletter form
- Add notification preferences to user profile
- Implement email API integration

---

## API Endpoints Needed

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh token
- `GET /api/auth/me` - Get current user

### Trips
- `GET /api/trips` - Get user's trips
- `POST /api/trips` - Create new trip
- `GET /api/trips/:id` - Get trip details
- `PUT /api/trips/:id` - Update trip
- `DELETE /api/trips/:id` - Delete trip

### Community
- `GET /api/community/trips` - Get community feed
- `POST /api/community/trips/:id/like` - Like trip
- `POST /api/community/trips/:id/save` - Save trip
- `POST /api/community/trips/:id/comments` - Add comment

### Places
- `GET /api/places/search` - Search places
- `GET /api/places/:id` - Get place details
- `GET /api/places/popular` - Get popular places

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `GET /api/users/:id/trips` - Get user's public trips

---

## Environment Variables

### Required
- `VITE_GOOGLE_AUTH_CLIENT_ID` - Google OAuth client ID
- `VITE_GOOGLE_GEMINI_API_KEY` - Google Gemini API key (optional)
- `VITE_GEOAPIFY_API_KEY` - Geoapify API key (optional)

### Suggested for Backend
- `VITE_API_BASE_URL` - Backend API base URL
- `VITE_WS_URL` - WebSocket URL for real-time updates
- `VITE_ANALYTICS_ID` - Analytics tracking ID

---

## Performance Optimizations

### Current Optimizations
- Lazy loading with React Router
- Image optimization with Unsplash parameters
- Framer Motion for smooth animations
- Debounced search suggestions

### Suggested Optimizations
- Implement code splitting for routes
- Add image lazy loading
- Implement virtual scrolling for long lists
- Add service worker for offline support
- Implement caching strategy
- Add bundle size monitoring

---

## Accessibility

### Current State
- Semantic HTML structure
- Keyboard navigation support
- ARIA labels on interactive elements
- Focus management on modals

### Suggested Improvements
- Add screen reader announcements
- Implement skip navigation links
- Add color contrast validation
- Implement focus visible indicators
- Add keyboard shortcuts
- Implement ARIA live regions for dynamic content

---

## Testing Recommendations

### Unit Tests
- Test utility functions in `src/lib/utils.js`
- Test component rendering
- Test form validation
- Test API service functions

### Integration Tests
- Test routing navigation
- Test authentication flow
- Test trip creation flow
- Test community interactions

### E2E Tests
- Test complete user journeys
- Test cross-browser compatibility
- Test mobile responsiveness
- Test error handling

---

## Deployment Checklist

### Pre-Deployment
- [ ] Remove all console.log statements
- [ ] Set production environment variables
- [ ] Optimize images and assets
- [ ] Enable production build optimizations
- [ ] Test all user flows
- [ ] Verify API integrations
- [ ] Check for memory leaks
- [ ] Test error boundaries

### Post-Deployment
- [ ] Set up monitoring and analytics
- [ ] Configure error tracking (Sentry)
- [ ] Set up performance monitoring
- [ ] Implement logging
- [ ] Set up backup and recovery
- [ ] Configure CDN for assets
- [ ] Set up SSL certificates
- [ ] Implement rate limiting

---

## Future Enhancements

### Phase 1 (Short-term)
- Implement real backend API integration
- Add proper authentication system
- Implement trip sharing functionality
- Add user profiles

### Phase 2 (Medium-term)
- Implement real-time collaboration
- Add trip templates
- Implement advanced search
- Add trip export functionality

### Phase 3 (Long-term)
- Implement AI trip recommendations
- Add virtual tour previews
- Implement AR/VR features
- Add multi-language support

---

## Support & Maintenance

### Regular Maintenance Tasks
- Update dependencies monthly
- Monitor bundle size
- Review and optimize performance
- Update UI components as needed
- Fix accessibility issues
- Review and update documentation

### Emergency Contacts
- Backend API team for API issues
- DevOps team for deployment issues
- Design team for UI/UX issues

---

## Conclusion

The RoamAI frontend is now polished and production-ready with a premium design inspired by top travel platforms. The codebase is well-organized, component-based, and ready for backend integration. All major features are implemented with proper error handling and user feedback mechanisms.

The frontend is **FROZEN** as per the final polish pass. No further frontend changes should be made without explicit approval. The focus should now shift to backend development and community feed implementation.

---

**Document Version**: 1.0  
**Last Updated**: June 14, 2026  
**Frontend Status**: ✅ Production Ready - FROZEN
