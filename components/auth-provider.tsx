"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface User {
  email: string
  firstName: string
  lastName: string
  isAdmin: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  loginWithGoogle: () => Promise<boolean>
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

const ADMIN_EMAILS = ["solepurposefootwear813@gmail.com", "anitej@suklikar.org"]

// Google OAuth configuration
const GOOGLE_CLIENT_ID = "your-google-client-id" // In production, this would be your actual client ID

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

    // Load Google OAuth script
    const script = document.createElement("script")
    script.src = "https://accounts.google.com/gsi/client"
    script.async = true
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo purposes, accept any password for existing users
    // In production, you'd validate against your backend
    const userData = {
      email,
      firstName: email.split("@")[0],
      lastName: "User",
      isAdmin: ADMIN_EMAILS.includes(email),
    }

    setUser(userData)
    localStorage.setItem("sp_user", JSON.stringify(userData))
    return true
  }

  const loginWithGoogle = async (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      // Check if Google API is loaded
      if (typeof window.google === "undefined") {
        // Fallback: simulate Google login for demo
        setTimeout(async () => {
          try {
            // Open a popup window to simulate Google OAuth
            const popup = window.open(
              "https://accounts.google.com/oauth/authorize?client_id=demo&redirect_uri=" +
                encodeURIComponent(window.location.origin) +
                "&response_type=code&scope=email%20profile",
              "google-signin",
              "width=500,height=600,scrollbars=yes,resizable=yes",
            )

            if (!popup) {
              alert("Please allow popups for Google sign-in")
              resolve(false)
              return
            }

            // Simulate user selecting Google account
            setTimeout(() => {
              popup.close()

              // Mock Google user data - in production this would come from Google
              const mockGoogleUser = {
                email: "user@gmail.com",
                firstName: "John",
                lastName: "Doe",
                isAdmin: false,
              }

              setUser(mockGoogleUser)
              localStorage.setItem("sp_user", JSON.stringify(mockGoogleUser))
              resolve(true)
            }, 2000)
          } catch (error) {
            reject(error)
          }
        }, 500)
        return
      }

      // Real Google OAuth implementation
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response: any) => {
          try {
            // Decode the JWT token to get user info
            const payload = JSON.parse(atob(response.credential.split(".")[1]))

            const userData = {
              email: payload.email,
              firstName: payload.given_name || "User",
              lastName: payload.family_name || "",
              isAdmin: ADMIN_EMAILS.includes(payload.email),
            }

            setUser(userData)
            localStorage.setItem("sp_user", JSON.stringify(userData))
            resolve(true)
          } catch (error) {
            console.error("Google sign-in error:", error)
            resolve(false)
          }
        },
      })

      // Show the Google One Tap dialog
      window.google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Fallback to popup
          window.google.accounts.id.renderButton(document.getElementById("google-signin-button"), {
            theme: "outline",
            size: "large",
          })
        }
      })
    })
  }

  const signup = async (email: string, password: string, firstName: string, lastName: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const userData = {
      email,
      firstName,
      lastName,
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
