# SwachhCoin: AI-Powered Civic Clean-to-Earn Platform

SwachhCoin is a civic technology application engineered to incentivize community cleanliness and waste management across municipal jurisdictions, beginning with the Greater Hyderabad Municipal Corporation (GHMC) area in Telangana, India.

The platform provides a decentralized, reward-driven mechanism where citizens submit photographic proof (Before and After cleaning) of localized garbage spots along with verified GPS coordinates. Submissions are audited in real time by Google Gemini Multimodal AI vision models to ensure location consistency, measure waste reduction percentage, and detect fraudulent or staged cleanups. Verified contributors are rewarded with SwachhCoins, which can be redeemed for discounts at local retail stores or applied toward utility bill payments.

---

## Live Deployment

* Production Application: https://swachhcoin-2be4a.web.app
* Code Repository: https://github.com/Niharika-b07/SwachhCoin

---

## Economic Model

SwachhCoin operates on a transparent civic exchange standard:

* Exchange Rate: 10 SwachhCoins = 1.00 INR (0.10 INR per coin)
* Initial Wallet Grant: 150 SwachhCoins (Equivalent to 15.00 INR)
* Average Cleanup Bounty: 50 to 75 SwachhCoins (5.00 to 7.50 INR)

### Redemption Channels

1. Local Retail and Kirana Stores:
   * Instant store vouchers redeemable at partner general stores (e.g., Sai Kirana Store, Hyderabad).
2. Municipal and Utility Bill Payments:
   * TSSPDCL Electricity Bill Subsidies (Telangana Southern Power Distribution).
   * HMWSSB Water Supply and Sewerage Board payments.
   * Prepaid Mobile Recharge Coupons (Jio, Airtel, Vi).
3. Public Transit:
   * Hyderabad Metro Rail ticketing credits.

---

## Key Platform Capabilities

### 1. Dual Image Upload with Hardware GPS Tagging
* Allows contributors to upload images from their device file system or capture directly using mobile hardware cameras.
* Retrieves device GPS coordinates (Latitude, Longitude, and Accuracy radius) using the browser Geolocation API.
* Attaches location coordinates directly to the cryptographic verification payload.

### 2. Multimodal AI Automated Audit (Google Gemini)
* Cloud Functions backend executes multimodal audits on paired before and after cleanup photos.
* Model analyzes:
  * Physical Location Consistency: Evaluates architectural fixtures, background landmarks, curb structures, and wall textures.
  * Waste Reduction Metric: Quantifies debris reduction on a 0 to 100 percentage scale.
  * Authenticity Scoring: Determines whether the cleanup demonstrates genuine manual community labor or synthetic/staged artifacts.
* Verification Criteria: Location verified, Genuine work confirmed, and at least 70% waste volume reduction.

### 3. Interactive GIS India Map
* Powered by Leaflet and OpenStreetMap rendering engines.
* Pan-India geographic coverage with street-level resolution across all 28 states, 8 union territories, and municipal districts.
* Quick-jump geographic scopes: All India, Telangana State, Hyderabad Metropolitan Area, Prakash Nagar, and Sai Kirana Store.
* Custom marker mapping for verified clean zones and active garbage bounties.

### 4. Security Architecture and Access Control
* Protected client routing with authentication session listeners.
* Firebase Authentication integration supporting Google Identity Provider and Email/Password credentials.
* Authenticated session persistence with instant guest access option for civic auditors.

---

## Technology Stack

### Frontend Client
* Framework: React 18
* Bundler: Vite 5
* Styling: Tailwind CSS, PostCSS, Custom Glassmorphism Architecture
* Mapping: Leaflet 1.9, OpenStreetMap
* Icons: Lucide React
* Routing: React Router DOM v6

### Backend and Cloud Infrastructure
* Serverless Runtime: Firebase Cloud Functions v2 (Node.js 18 / 20)
* AI Framework: Google Gen AI SDK (@google/genai)
* Vision Model: Gemini 2.5 Flash
* Database: Cloud Firestore
* Hosting: Firebase Hosting with Global CDN and SSL
* Identity Management: Firebase Authentication

---

## Project Structure

```
SwachhCoin/
├── functions/
│   ├── index.js               # Firebase Cloud Function for Gemini AI verification
│   ├── package.json           # Backend dependencies and runtime scripts
│   └── .env.example           # Example backend environment variables
├── public/
│   └── assets/
│       ├── proofs/            # Verified photographic audit archives
│       ├── swachhcoin-spin.mp4 # 3D token visual asset
│       └── swachhcoin-bg.jpg  # Background aesthetic asset
├── src/
│   ├── components/
│   │   ├── BackgroundVideo.jsx # Fixed viewport background engine
│   │   ├── PhotoUpload.jsx    # Dual photo upload component
│   │   ├── ProtectedRoute.jsx # Route-level authentication guard
│   │   ├── VerificationCard.jsx # Audit breakdown and reward display
│   │   └── WalletBalance.jsx  # Balance card with INR exchange rates
│   ├── context/
│   │   └── AuthContext.jsx    # Authentication provider and session manager
│   ├── pages/
│   │   ├── Home.jsx           # Wallet overview, impact metrics, and feed
│   │   ├── Leaderboard.jsx    # Ward rankings and volunteer champion lists
│   │   ├── Login.jsx          # Security gateway and credential authentication
│   │   ├── MapExplore.jsx     # Interactive India Leaflet map and hotspot radar
│   │   ├── Rewards.jsx        # Kirana stores and utility bill redemption
│   │   └── SubmitCleanup.jsx  # Proof submission form with GPS acquisition
│   ├── App.jsx                # Root layout, routing table, and top/bottom nav
│   ├── firebase.js            # Firebase client SDK initialization
│   ├── index.css              # Global styles, scrollbars, and utility classes
│   └── main.jsx               # React DOM entry point
├── firebase.json              # Firebase Hosting and Functions configuration
├── index.html                 # HTML shell with responsive viewport settings
├── package.json               # Root frontend dependencies and build scripts
├── postcss.config.js          # PostCSS configuration for Tailwind processing
├── tailwind.config.js         # Tailwind theme configuration
└── vite.config.js             # Vite development and production configuration
```

---

## Local Development Setup

### Prerequisites
* Node.js version 18.x or higher
* npm version 9.x or higher
* Firebase CLI installed globally (`npm install -g firebase-tools`)

### 1. Clone the Repository
```bash
git clone https://github.com/Niharika-b07/SwachhCoin.git
cd SwachhCoin
```

### 2. Install Dependencies
Install frontend dependencies:
```bash
npm install
```

Install Cloud Functions backend dependencies:
```bash
cd functions
npm install
cd ..
```

### 3. Environment Variables Setup
Create a `.env` file in the `functions/` directory:
```bash
cp functions/.env.example functions/.env
```
Populate `functions/.env` with your Google Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run Development Server
Start the frontend development server:
```bash
npm run dev
```
Open `http://localhost:3000` in a supported browser.

---

## Production Deployment

### 1. Build Frontend Bundle
```bash
npm run build
```

### 2. Deploy Frontend to Firebase Hosting
```bash
firebase deploy --only hosting
```

### 3. Deploy Cloud Functions (Requires Firebase Blaze Plan)
```bash
firebase deploy --only functions
```

---

## Verification Criteria and Scoring

Each submission audited by Gemini AI is evaluated against the following schema:

```json
{
  "isSameLocation": true,
  "cleanupPercentage": 85,
  "isGenuine": true,
  "reason": "Before and after images confirm identical architectural structures with significant reduction in localized debris."
}
```

* Threshold for coin credit: `isSameLocation == true` AND `cleanupPercentage >= 70` AND `isGenuine == true`.
* Coins rewarded per verification: 25 to 75 SwachhCoins depending on location difficulty and debris density.

---

## Contributing and Governance

Contributions from civic volunteers, municipal representatives, and software developers are welcomed. Please submit issues or pull requests through GitHub.

---

