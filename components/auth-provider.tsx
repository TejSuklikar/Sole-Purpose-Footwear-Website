"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface User {
  email: string
  isAdmin: boolean
}

interface AuthContextType {
  user: User | null
  loginAsAdmin: (email: string) => boolean
  loginAsGuest: () => void
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
    try {
      const savedUser = localStorage.getItem("sp_current_user")
      if (savedUser) {
        const userData = JSON.parse(savedUser)
        // Validate the saved user data
        if (userData && typeof userData.email === "string" && typeof userData.isAdmin === "boolean") {
          setUser(userData)
        } else {
          // Clear invalid data
          localStorage.removeItem("sp_current_user")
        }
      }
    } catch (error) {
      console.error("Error loading saved user:", error)
      localStorage.removeItem("sp_current_user")
    }
    setLoading(false)
  }, [])

  const loginAsAdmin = (email: string): boolean => {
    if (!ADMIN_EMAILS.includes(email)) {
      return false
    }

    const userData = {
      email,
      isAdmin: true,
    }

    setUser(userData)
    localStorage.setItem("sp_current_user", JSON.stringify(userData))
    return true
  }

  const loginAsGuest = () => {
    const userData = {
      email: "guest@solepurpose.com",
      isAdmin: false,
    }

    setUser(userData)
    localStorage.setItem("sp_current_user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("sp_current_user")
    // Also clear any cached data
    localStorage.removeItem("sp_shoes_global")
    localStorage.removeItem("sp_events_global")
  }

  return (
    <AuthContext.Provider value={{ user, loginAsAdmin, loginAsGuest, logout, loading: false }}>
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
