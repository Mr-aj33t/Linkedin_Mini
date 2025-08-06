# LinkedIn Mini - Community Platform

A modern, responsive LinkedIn-like community platform built with React, Firebase, and Vite.

## 🔗 Live Demo: [https://mini-linkedin-8008.web.app](https://mini-linkedin-8008.web.app/)

## ✨ Features

- **User Authentication**: Register/Login with email and password using Firebase Auth
- **User Profiles**: Customizable profiles with name, email, and bio
- **Post Feed**: Create and view text-only posts in real-time
- **Like System**: Like/unlike posts with real-time updates
- **Delete Posts**: Original creators can delete their posts
- **Profile Pages**: View user profiles and their posts
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Live feed updates using Firestore listeners

## 🚀 Tech Stack

- **Frontend**: React 19 + Vite
- **Routing**: React Router DOM
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **Styling**: CSS3 with modern design
- **Notifications**: React Hot Toast
- **Deployment**: Firebase Hosting

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase project with Authentication and Firestore enabled

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd linkedin-mini
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Setup**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication with Email/Password provider
   - Create a Firestore database
   - Get your Firebase config from Project Settings
   - Update `src/firebase.js` with your Firebase configuration

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Firebase Configuration

Update the `firebaseConfig` object in `src/firebase.js` with your Firebase project credentials:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};
```

## 📱 Usage

1. **Register**: Create a new account with email, password, name, and bio
2. **Login**: Sign in with your credentials
3. **Create Posts**: Share your thoughts with the community
4. **Interact**: Like posts from other users
5. **Profile**: View your profile and posts, or visit other users' profiles
6. **Manage**: Delete your own posts when needed

## 🏗️ Project Structure

```
src/
├── components/
│   ├── DeleteButton.jsx    # Delete post functionality
│   ├── LikeButton.jsx      # Like/unlike functionality
│   ├── Navbar.jsx          # Navigation component
│   └── PostCard.jsx        # Individual post display
├── contexts/
│   └── AuthContext.jsx     # Global authentication state
├── pages/
│   ├── Home.jsx            # Main feed page
│   ├── LoginRegister.jsx   # Authentication page
│   └── Profile.jsx         # User profile page
├── App.jsx                 # Main app component with routing
├── App.css                 # Global styles
├── firebase.js             # Firebase configuration
└── main.jsx               # App entry point
```

## 🚀 Deployment

### Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase Hosting**
   ```bash
   firebase init hosting
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

5. **Deploy**
   ```bash
   firebase deploy
   ```

## 🎨 Features in Detail

### Authentication
- Secure email/password authentication
- User profile creation and management
- Protected routes for authenticated users
- Global authentication state management

### Posts
- Real-time post creation and display
- Chronological feed ordering
- Author information display
- Timestamp formatting

### Likes
- One like per user per post
- Real-time like count updates
- Visual feedback for liked posts
- Optimistic UI updates

### Profiles
- Public user profiles
- User's post history
- Profile information display
- Navigation between profiles

## 🔒 Security

- Firebase Authentication handles secure user management
- Firestore security rules should be configured for production
- Client-side route protection
- User-specific data access control
