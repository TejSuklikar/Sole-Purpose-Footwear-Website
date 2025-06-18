"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface User {
  email: string
  name: string
  isAdmin: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  loginWithGoogle: () => Promise<boolean>
  signup: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

const ADMIN_EMAILS = ["solepurposefootwear813@gmail.com", "anitej@suklikar.org"]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on mount
    const savedUser = localStorage.getItem("sp_user")
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser({
        ...userData,
        isAdmin: ADMIN_EMAILS.includes(userData.email),
      })
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo purposes, accept any password for existing users
    const userData = {
      email,
      name: email.split("@")[0],
      isAdmin: ADMIN_EMAILS.includes(email),
    }

    setUser(userData)
    localStorage.setItem("sp_user", JSON.stringify(userData))
    return true
  }

  const loginWithGoogle = async (): Promise<boolean> => {
    // Simulate Google OAuth
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // For demo, we'll simulate a Google login
    const mockGoogleUser = {
      email: "demo@gmail.com",
      name: "Demo User",
      isAdmin: false,
    }

    setUser(mockGoogleUser)
    localStorage.setItem("sp_user", JSON.stringify(mockGoogleUser))
    return true
  }

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const userData = {
      email,
      name,
      isAdmin: ADMIN_EMAILS.includes(email),
    }

    setUser(userData)
    localStorage.setItem("sp_user", JSON.stringify(userData))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("sp_user")
  }

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
