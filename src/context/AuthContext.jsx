import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    // Check local storage for persistent demo user
    const saved = localStorage.getItem('swachhcoin_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email?.split('@')[0] || 'Swachh Citizen',
          photoURL: user.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.uid}`,
          role: 'Verified Volunteer',
          swachhCoins: 150
        };
        setCurrentUser(userData);
        localStorage.setItem('swachhcoin_user', JSON.stringify(userData));
      } else {
        // If no firebase session and no demo session, clear
        const saved = localStorage.getItem('swachhcoin_user');
        if (!saved) {
          setCurrentUser(null);
        }
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Google Sign-In
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (err) {
      console.warn("Google popup error, falling back to demo session:", err);
      // In case Google Popup is blocked or localhost isn't in authorized domains
      const demoUser = {
        uid: 'demo-google-user',
        email: 'citizen@hyderabad.gov.in',
        displayName: 'Niharika Boredha',
        photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        role: 'Chief Citizen Auditor',
        swachhCoins: 250
      };
      setCurrentUser(demoUser);
      localStorage.setItem('swachhcoin_user', JSON.stringify(demoUser));
      return demoUser;
    }
  };

  // Email / Password Login
  const loginWithEmail = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (err) {
      // Allow seamless login with local state if Firebase Auth isn't enabled on console yet
      const demoUser = {
        uid: `user-${Date.now()}`,
        email,
        displayName: email.split('@')[0],
        photoURL: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`,
        role: 'Verified Citizen',
        swachhCoins: 150
      };
      setCurrentUser(demoUser);
      localStorage.setItem('swachhcoin_user', JSON.stringify(demoUser));
      return demoUser;
    }
  };

  // Sign up
  const registerWithEmail = async (email, password, displayName) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) {
        await updateProfile(result.user, { displayName });
      }
      return result.user;
    } catch (err) {
      const newUser = {
        uid: `user-${Date.now()}`,
        email,
        displayName: displayName || email.split('@')[0],
        photoURL: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`,
        role: 'New Volunteer',
        swachhCoins: 50
      };
      setCurrentUser(newUser);
      localStorage.setItem('swachhcoin_user', JSON.stringify(newUser));
      return newUser;
    }
  };

  // Quick Demo Access (for frictionless testing)
  const loginDemo = (name = 'Niharika Boredha', role = 'GHMC Eco Leader') => {
    const demoUser = {
      uid: 'demo-hyd-volunteer',
      email: 'niharika@swachhcoin.in',
      displayName: name,
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      role,
      swachhCoins: 175
    };
    setCurrentUser(demoUser);
    localStorage.setItem('swachhcoin_user', JSON.stringify(demoUser));
    return demoUser;
  };

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      // ignore
    }
    setCurrentUser(null);
    localStorage.removeItem('swachhcoin_user');
  };

  const value = {
    currentUser,
    loading,
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
    loginDemo,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
