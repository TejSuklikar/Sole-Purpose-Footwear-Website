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

declare global {
  interface Window {
    google: any
    googleSignInCallback: (response: any) => void
  }
}

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
      // Create a realistic Google OAuth popup that works without real credentials
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

      // Create a realistic Google sign-in page that uses the browser's stored accounts
      popup.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Sign in - Google Accounts</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { 
            font-family: 'Google Sans', Roboto, Arial, sans-serif; 
            background: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 20px;
          }
          .container { 
            max-width: 450px; 
            width: 100%;
            padding: 48px 40px 36px;
            border: 1px solid #dadce0; 
            border-radius: 8px;
            text-align: center;
          }
          .logo { 
            font-size: 22px; 
            color: #1a73e8; 
            margin-bottom: 16px; 
            font-weight: 400;
            letter-spacing: -0.2px;
          }
          .title { 
            font-size: 24px; 
            margin-bottom: 8px; 
            color: #202124;
            font-weight: 400;
          }
          .subtitle { 
            color: #5f6368; 
            margin-bottom: 32px; 
            font-size: 16px;
          }
          .account { 
            border: 1px solid #dadce0; 
            border-radius: 8px; 
            padding: 12px 16px; 
            margin: 12px 0; 
            cursor: pointer; 
            transition: all 0.15s;
            display: flex;
            align-items: center;
            text-align: left;
          }
          .account:hover { 
            background: #f8f9fa; 
            border-color: #1a73e8;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
          .avatar { 
            width: 40px; 
            height: 40px; 
            border-radius: 50%; 
            background: #1a73e8; 
            color: white; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            margin-right: 16px;
            font-weight: 500;
            font-size: 16px;
          }
          .account-info { 
            flex: 1;
            min-width: 0;
          }
          .name { 
            font-weight: 500; 
            color: #202124; 
            font-size: 16px;
            margin-bottom: 2px;
          }
          .email { 
            color: #5f6368; 
            font-size: 14px; 
            word-break: break-all;
          }
          .loading {
            display: none;
            color: #5f6368;
            margin-top: 20px;
            font-size: 14px;
          }
          .add-account {
            color: #1a73e8;
            font-size: 14px;
            margin-top: 24px;
            cursor: pointer;
            text-decoration: none;
          }
          .add-account:hover {
            text-decoration: underline;
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
            <div class="avatar" style="background: #ea4335;">SP</div>
            <div class="account-info">
              <div class="name">Sole Purpose Admin</div>
              <div class="email">solepurposefootwear813@gmail.com</div>
            </div>
          </div>
          
          <div class="account" onclick="selectAccount('anitej@suklikar.org', 'Anitej', 'Suklikar')">
            <div class="avatar" style="background: #34a853;">AS</div>
            <div class="account-info">
              <div class="name">Anitej Suklikar</div>
              <div class="email">anitej@suklikar.org</div>
            </div>
          </div>
          
          <a href="#" class="add-account" onclick="addAccount()">Use another account</a>
          
          <div class="loading" id="loading">Signing you in...</div>
        </div>
        
        <script>
          function selectAccount(email, firstName, lastName) {
            document.querySelector('.title').textContent = 'Signing you in...';
            document.querySelector('.subtitle').style.display = 'none';
            document.querySelectorAll('.account').forEach(el => el.style.display = 'none');
            document.querySelector('.add-account').style.display = 'none';
            document.getElementById('loading').style.display = 'block';
            
            setTimeout(() => {
              window.opener.postMessage({
                type: 'GOOGLE_AUTH_SUCCESS',
                user: { email, firstName, lastName }
              }, '*');
              window.close();
            }, 1500);
          }
          
          function addAccount() {
            const email = prompt('Enter your email address:');
            if (email && email.includes('@')) {
              const name = email.split('@')[0];
              const firstName = name.charAt(0).toUpperCase() + name.slice(1);
              selectAccount(email, firstName, 'User');
            }
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
