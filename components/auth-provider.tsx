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
    const savedUser = localStorage.getItem("sp_current_user")
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
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
  }

  return (
    <AuthContext.Provider value={{ user, loginAsAdmin, loginAsGuest, logout, loading }}>
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
