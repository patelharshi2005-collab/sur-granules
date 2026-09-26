import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, signInWithPopup, signOut as fbSignOut, onIdTokenChanged } from 'firebase/auth';
import { auth, googleAuthProvider } from '../lib/firebase.ts';

export interface DbUser {
  id: number;
  uid: string;
  email: string;
  name?: string;
  role: string;
  phone?: string;
  company?: string;
}

interface AuthContextType {
  user: User | null;
  dbUser: DbUser | null;
  token: string | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
  getIdToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [dbUser, setDbUser] = useState<DbUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const idToken = await currentUser.getIdToken();
          setToken(idToken);

          // Synchronize user with database
          const res = await fetch('/api/auth/sync', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify({
              name: currentUser.displayName || currentUser.email?.split('@')[0],
            }),
          });

          if (res.ok) {
            const data = await res.json();
            setDbUser(data.user);
          }
        } catch (error) {
          console.error('Failed to sync user with backend:', error);
        }
      } else {
        setToken(null);
        setDbUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleAuthProvider);
    } catch (error) {
      console.error('Google Sign-in failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fbSignOut(auth);
      setUser(null);
      setDbUser(null);
      setToken(null);
    } catch (error) {
      console.error('Sign-out failed:', error);
      throw error;
    }
  };

  const getIdToken = async (): Promise<string | null> => {
    if (!auth.currentUser) return null;
    const freshToken = await auth.currentUser.getIdToken();
    setToken(freshToken);
    return freshToken;
  };

  // User is considered admin if their dbUser.role === 'admin' OR if email matches factory admin
  const isAdmin: boolean = Boolean(
    dbUser?.role === 'admin' ||
    user?.email?.toLowerCase() === 'jaimiksur@gmail.com' ||
    user?.email?.toLowerCase().includes('admin')
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        dbUser,
        token,
        loading,
        signInWithGoogle,
        logout,
        isAdmin,
        getIdToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
