import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';

export function useAuth() {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Firebase-тегі қолданушы күйін бақылау
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Шығу функциясы
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout қатесі:", error);
    }
  };

  return { 
    firebaseUser, 
    loading, 
    isAuthenticated: !!firebaseUser, // Қолданушы бар болса true қайтарады
    logout 
  };
}