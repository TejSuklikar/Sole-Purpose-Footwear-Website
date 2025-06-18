"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface User {
  email: string
  firstName: string
  lastName: string
  isAdmin: boolean
  picture?: string
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

// You need to replace this with your actual Google Client ID from Google Cloud Console
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "your-google-client-id.apps.googleusercontent.com"

declare global {
  interface Window {
    google: any
    googleSignInCallback: (response: any) => void
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [googleLoaded, setGoogleLoaded] = useState(false)

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

    // Load Google Identity Services
    const script = document.createElement("script")
    script.src = "https://accounts.google.com/gsi/client"
    script.async = true
    script.defer = true
    script.onload = () => {
      setGoogleLoaded(true)
      initializeGoogleSignIn()
    }
    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  const initializeGoogleSignIn = () => {
    if (typeof window.google !== "undefined") {
      // Set up the callback function
      window.googleSignInCallback = (response: any) => {
        handleGoogleResponse(response)
      }

      // Initialize Google Identity Services
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: window.googleSignInCallback,
        auto_select: false,
        cancel_on_tap_outside: true,
      })
    }
  }

  const handleGoogleResponse = (response: any) => {
    try {
      // Decode the JWT token to get user info
      const payload = JSON.parse(atob(response.credential.split(".")[1]))

      const userData = {
        email: payload.email,
        firstName: payload.given_name || "User",
        lastName: payload.family_name || "",
        picture: payload.picture,
        isAdmin: ADMIN_EMAILS.includes(payload.email),
      }

      setUser(userData)
      localStorage.setItem("sp_user", JSON.stringify(userData))
    } catch (error) {
      console.error("Google sign-in error:", error)
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

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
    return new Promise((resolve) => {
      if (!googleLoaded || typeof window.google === "undefined") {
        console.error("Google Identity Services not loaded")
        resolve(false)
        return
      }

      try {
        // First try One Tap
        window.google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // If One Tap doesn't work, use the popup flow
            window.google.accounts.oauth2
              .initTokenClient({
                client_id: GOOGLE_CLIENT_ID,
                scope: "email profile openid",
                callback: (response: any) => {
                  if (response.access_token) {
                    // Fetch user info using the access token
                    fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${response.access_token}`)
                      .then((res) => res.json())
                      .then((userInfo) => {
                        const userData = {
                          email: userInfo.email,
                          firstName: userInfo.given_name || "User",
                          lastName: userInfo.family_name || "",
                          picture: userInfo.picture,
                          isAdmin: ADMIN_EMAILS.includes(userInfo.email),
                        }
                        setUser(userData)
                        localStorage.setItem("sp_user", JSON.stringify(userData))
                        resolve(true)
                      })
                      .catch((error) => {
                        console.error("Failed to fetch user info:", error)
                        resolve(false)
                      })
                  } else {
                    resolve(false)
                  }
                },
                error_callback: (error: any) => {
                  console.error("Google OAuth error:", error)
                  resolve(false)
                },
              })
              .requestAccessToken()
          }
        })
      } catch (error) {
        console.error("Google OAuth initialization error:", error)
        resolve(false)
      }
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
    // Sign out from Google as well
    if (typeof window.google !== "undefined") {
      window.google.accounts.id.disableAutoSelect()
    }
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
