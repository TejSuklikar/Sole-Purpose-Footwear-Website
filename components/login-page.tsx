"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "./auth-provider"
import { Mail, Lock, User, Chrome } from "lucide-react"

export function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { login, loginWithGoogle, signup } = useAuth()

  useEffect(() => {
    // Render Google Sign-In button when Google is loaded
    const renderGoogleButton = () => {
      const googleButtonDiv = document.getElementById("google-signin-button")
      if (googleButtonDiv && typeof window.google !== "undefined") {
        // Clear any existing content
        googleButtonDiv.innerHTML = ""

        window.google.accounts.id.renderButton(googleButtonDiv, {
          theme: "outline",
          size: "large",
          width: "100%",
          text: "continue_with",
          shape: "rectangular",
        })
      }
    }

    // Check if Google is already loaded
    if (typeof window.google !== "undefined") {
      renderGoogleButton()
    } else {
      // Wait for Google to load
      const checkGoogle = setInterval(() => {
        if (typeof window.google !== "undefined") {
          clearInterval(checkGoogle)
          renderGoogleButton()
        }
      }, 100)

      // Clean up interval after 10 seconds
      setTimeout(() => clearInterval(checkGoogle), 10000)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      let success = false
      if (isLogin) {
        success = await login(formData.email, formData.password)
      } else {
        if (!formData.firstName.trim() || !formData.lastName.trim()) {
          setError("Please enter both first and last name")
          setLoading(false)
          return
        }
        success = await signup(formData.email, formData.password, formData.firstName, formData.lastName)
      }

      if (!success) {
        setError("Authentication failed. Please try again.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError("")

    try {
      const success = await loginWithGoogle()
      if (!success) {
        setError("Google login was cancelled or failed.")
      }
    } catch (err) {
      setError("An error occurred with Google login. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const switchMode = () => {
    setIsLogin(!isLogin)
    setError("")
    setFormData({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    })
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-black font-bold">SP</span>
            </div>
            <span className="font-playfair text-2xl font-semibold text-white">Sole Purpose</span>
          </div>
          <p className="text-neutral-400">
            {isLogin ? "Sign in to access your account" : "Create your account to get started"}
          </p>
        </div>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-white text-center">{isLogin ? "Welcome Back" : "Create Account"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Google Sign In Button */}
            <div className="space-y-3">
              {/* Native Google Button (will show user's actual accounts) */}
              <div id="google-signin-button" className="w-full min-h-[44px] flex items-center justify-center"></div>

              {/* Fallback button if Google button doesn't load */}
              <Button
                onClick={handleGoogleLogin}
                disabled={loading}
                variant="outline"
                className="w-full bg-white text-black hover:bg-neutral-100"
              >
                <Chrome className="mr-2 h-4 w-4" />
                {loading ? "Opening Google..." : "Continue with Google"}
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-neutral-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-neutral-900 px-2 text-neutral-400">Or continue with email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="firstName" className="text-white">
                      First Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="pl-10"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-white">
                      Last Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="pl-10"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-3">
                  <p className="text-red-400 text-sm text-center">{error}</p>
                </div>
              )}

              <Button type="submit" disabled={loading} className="w-full bg-white text-black hover:bg-neutral-100">
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                    Please wait...
                  </div>
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="text-center">
              <button onClick={switchMode} className="text-neutral-400 hover:text-white text-sm transition-colors">
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
