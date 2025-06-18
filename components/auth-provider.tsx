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

// For demo purposes - in production, you'd get this from your environment variables
const GOOGLE_CLIENT_ID = "your-google-client-id.apps.googleusercontent.com"

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
        // Fallback for when Google isn't loaded - show a realistic popup
        const popup = window.open(
          "https://accounts.google.com/oauth/authorize?client_id=demo&redirect_uri=" +
            encodeURIComponent(window.location.origin) +
            "&response_type=code&scope=email%20profile",
          "google-signin",
          "width=500,height=600,scrollbars=yes,resizable=yes,left=" +
            (window.screen.width / 2 - 250) +
            ",top=" +
            (window.screen.height / 2 - 300),
        )

        if (!popup) {
          alert("Please allow popups for Google sign-in")
          resolve(false)
          return
        }

        // For demo - simulate real Google OAuth
        setTimeout(() => {
          popup.close()
          // You could prompt user to enter their email for demo
          const demoEmail = prompt("Enter your email for demo login:")
          if (demoEmail) {
            const userData = {
              email: demoEmail,
              firstName: demoEmail.split("@")[0],
              lastName: "User",
              isAdmin: ADMIN_EMAILS.includes(demoEmail),
            }
            setUser(userData)
            localStorage.setItem("sp_user", JSON.stringify(userData))
            resolve(true)
          } else {
            resolve(false)
          }
        }, 2000)
        return
      }

      // Use real Google OAuth
      try {
        window.google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // If One Tap doesn't work, show the popup
            window.google.accounts.oauth2
              .initTokenClient({
                client_id: GOOGLE_CLIENT_ID,
                scope: "email profile",
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
                      .catch(() => resolve(false))
                  } else {
                    resolve(false)
                  }
                },
              })
              .requestAccessToken()
          }
        })
      } catch (error) {
        console.error("Google OAuth error:", error)
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
