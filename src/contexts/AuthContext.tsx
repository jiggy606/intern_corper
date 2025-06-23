import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

interface User {
  id: string
  email: string
  name?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)
export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Helper – map Supabase user to your local shape
  const mapUser = (u: any): User => ({
    id: u.id,
    email: u.email ?? '',
    name: u.user_metadata?.full_name ?? u.email ?? '',
  });


  // 1️⃣  Bootstrap on first load
  useEffect(() => {
  supabase.auth.getSession()
    .then(({ data: { session } }) => {
      const user = session?.user;
      if (user) {
        setUser(mapUser(user));
      }
    })
    .finally(() => setIsLoading(false));

  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    const user = session?.user;
    if (user) {
      setUser(mapUser(user));
    } else {
      setUser(null);
    }
  });

  return () => subscription.unsubscribe();
  }, []);


  // Sign-in
  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })  // :contentReference[oaicite:1]{index=1}
    if (error) return false
    return true
  }

  // Sign-out
  const logout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
