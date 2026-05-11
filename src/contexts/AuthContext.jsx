import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../db/clientConfig';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore existing session
    auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        setLoading(false);
      } else {
        // No session — sign in anonymously so every visitor has an identity
        auth.signInAnonymously().then(({ data, error }) => {
          if (!error) setUser(data.user);
          setLoading(false);
        });
      }
    });

    // Keep state in sync with Supabase session changes
    const { data: { subscription } } = auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    const { data, error } = await auth.signInWithEmail(email, password);
    if (error) throw error;
    return data;
  };

  const signUp = async (email, password) => {
    const { data, error } = await auth.signUp(email, password);
    if (error) throw error;
    // If email confirmation is enabled, data.session will be null
    if (!data.session) {
      throw new Error('CHECK_EMAIL');
    }
    return data;
  };

  const signOut = async () => {
    await auth.signOut();
    // Re-create an anonymous session so the app stays functional
    const { data } = await auth.signInAnonymously();
    setUser(data?.user ?? null);
  };

  const isAnonymous = user?.is_anonymous ?? true;

  return (
    <AuthContext.Provider value={{ user, loading, isAnonymous, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
