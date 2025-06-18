"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface User {
  email: string
  firstName: string
  lastName: string
  isAdmin: boolean
}

interface StoredUser {
  email: string
  firstName: string
  lastName: string
  password: string
  isAdmin: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>
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

    // Get stored users
    const storedUsers = JSON.parse(localStorage.getItem("sp_users") || "[]") as StoredUser[]

    // Find user with matching email and password
    const foundUser = storedUsers.find((u) => u.email === email && u.password === password)

    if (!foundUser) {
      return false
    }

    const userData = {
      email: foundUser.email,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      isAdmin: ADMIN_EMAILS.includes(foundUser.email),
    }

    setUser(userData)
    localStorage.setItem("sp_current_user", JSON.stringify(userData))
    return true
  }

  const signup = async (email: string, password: string, firstName: string, lastName: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simple validation
    if (!email || !password || !firstName || !lastName) {
      return false
    }

    // Get existing users
    const storedUsers = JSON.parse(localStorage.getItem("sp_users") || "[]") as StoredUser[]

    // Check if user already exists
    if (storedUsers.find((u) => u.email === email)) {
      return false // User already exists
    }

    // Create new user
    const newUser: StoredUser = {
      email,
      password, // In production, this would be hashed
      firstName,
      lastName,
      isAdmin: ADMIN_EMAILS.includes(email),
    }

    // Save to storage
    storedUsers.push(newUser)
    localStorage.setItem("sp_users", JSON.stringify(storedUsers))

    // Log them in
    const userData = {
      email,
      firstName,
      lastName,
      isAdmin: ADMIN_EMAILS.includes(email),
    }

    setUser(userData)
    localStorage.setItem("sp_current_user", JSON.stringify(userData))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("sp_current_user")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
