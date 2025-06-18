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
    return new Promise((resolve) => {
      // Create a more realistic Google OAuth simulation
      const popup = window.open(
        "",
        "google-signin",
        "width=500,height=600,scrollbars=yes,resizable=yes,left=" +
          (window.screen.width / 2 - 250) +
          ",top=" +
          (window.screen.height / 2 - 300),
      )

      if (!popup) {
        alert("Please allow popups for Google sign-in to work properly")
        resolve(false)
        return
      }

      // Create a realistic Google sign-in page simulation
      popup.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Sign in - Google Accounts</title>
          <style>
            body { 
              font-family: 'Google Sans', Roboto, Arial, sans-serif; 
              margin: 0; 
              padding: 20px; 
              background: #fff;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
            }
            .container { 
              max-width: 400px; 
              padding: 40px; 
              border: 1px solid #dadce0; 
              border-radius: 8px;
              text-align: center;
            }
            .logo { 
              font-size: 24px; 
              color: #1a73e8; 
              margin-bottom: 20px; 
              font-weight: 400;
            }
            .title { 
              font-size: 24px; 
              margin-bottom: 8px; 
              color: #202124;
            }
            .subtitle { 
              color: #5f6368; 
              margin-bottom: 30px; 
            }
            .account { 
              border: 1px solid #dadce0; 
              border-radius: 8px; 
              padding: 16px; 
              margin: 10px 0; 
              cursor: pointer; 
              transition: all 0.2s;
              display: flex;
              align-items: center;
            }
            .account:hover { 
              background: #f8f9fa; 
              border-color: #1a73e8;
            }
            .avatar { 
              width: 32px; 
              height: 32px; 
              border-radius: 50%; 
              background: #1a73e8; 
              color: white; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              margin-right: 12px;
              font-weight: 500;
            }
            .account-info { 
              text-align: left; 
              flex: 1;
            }
            .name { 
              font-weight: 500; 
              color: #202124; 
            }
            .email { 
              color: #5f6368; 
              font-size: 14px; 
            }
            .loading {
              display: none;
              color: #5f6368;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">Google</div>
            <div class="title">Choose an account</div>
            <div class="subtitle">to continue to Sole Purpose Footwear</div>
            
            <div class="account" onclick="selectAccount('john.doe@gmail.com', 'John', 'Doe')">
              <div class="avatar">JD</div>
              <div class="account-info">
                <div class="name">John Doe</div>
                <div class="email">john.doe@gmail.com</div>
              </div>
            </div>
            
            <div class="account" onclick="selectAccount('sarah.smith@gmail.com', 'Sarah', 'Smith')">
              <div class="avatar">SS</div>
              <div class="account-info">
                <div class="name">Sarah Smith</div>
                <div class="email">sarah.smith@gmail.com</div>
              </div>
            </div>
            
            <div class="account" onclick="selectAccount('solepurposefootwear813@gmail.com', 'Sole Purpose', 'Admin')">
              <div class="avatar">SP</div>
              <div class="account-info">
                <div class="name">Sole Purpose Admin</div>
                <div class="email">solepurposefootwear813@gmail.com</div>
              </div>
            </div>
            
            <div class="loading" id="loading">Signing you in...</div>
          </div>
          
          <script>
            function selectAccount(email, firstName, lastName) {
              document.querySelector('.title').textContent = 'Signing you in...';
              document.querySelector('.subtitle').style.display = 'none';
              document.querySelectorAll('.account').forEach(el => el.style.display = 'none');
              document.getElementById('loading').style.display = 'block';
              
              setTimeout(() => {
                window.opener.postMessage({
                  type: 'GOOGLE_AUTH_SUCCESS',
                  user: { email, firstName, lastName }
                }, '*');
                window.close();
              }, 1500);
            }
          </script>
        </body>
        </html>
      `)

      // Listen for the message from the popup
      const messageHandler = (event: MessageEvent) => {
        if (event.data.type === "GOOGLE_AUTH_SUCCESS") {
          const { email, firstName, lastName } = event.data.user

          const userData = {
            email,
            firstName,
            lastName,
            isAdmin: ADMIN_EMAILS.includes(email),
          }

          setUser(userData)
          localStorage.setItem("sp_user", JSON.stringify(userData))
          window.removeEventListener("message", messageHandler)
          resolve(true)
        }
      }

      window.addEventListener("message", messageHandler)

      // Handle popup being closed manually
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed)
          window.removeEventListener("message", messageHandler)
          resolve(false)
        }
      }, 1000)
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
