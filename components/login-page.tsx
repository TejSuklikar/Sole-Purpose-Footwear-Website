"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "./auth-provider"
import { Mail, Lock, User, Shield, AlertCircle } from "lucide-react"

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

  const { login, signup } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      let success = false
      if (isLogin) {
        success = await login(formData.email, formData.password)
        if (!success) {
          setError("Invalid email or password. Please check your credentials.")
        }
      } else {
        if (!formData.firstName.trim() || !formData.lastName.trim()) {
          setError("Please enter both first and last name")
          setLoading(false)
          return
        }
        success = await signup(formData.email, formData.password, formData.firstName, formData.lastName)
        if (!success) {
          setError("Account with this email already exists. Please try logging in instead.")
        }
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
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

  const isAdminEmail = (email: string) => {
    return email === "solepurposefootwear813@gmail.com" || email === "anitej@suklikar.org"
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
                  {formData.email && isAdminEmail(formData.email) && (
                    <div className="absolute right-3 top-3">
                      <Shield className="h-4 w-4 text-yellow-500" title="Admin Account" />
                    </div>
                  )}
                </div>
                {formData.email && isAdminEmail(formData.email) && (
                  <p className="text-yellow-500 text-xs mt-1 flex items-center">
                    <Shield className="h-3 w-3 mr-1" />
                    Admin account detected
                  </p>
                )}
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
                {!isLogin && (
                  <p className="text-neutral-400 text-xs mt-1">Password will be remembered for future logins</p>
                )}
              </div>

              {error && (
                <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-red-400" />
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
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

            {/* Admin Info */}
            <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-4 w-4 text-yellow-500" />
                <span className="text-white text-sm font-medium">Admin Access</span>
              </div>
              <p className="text-neutral-400 text-xs">
                Admin accounts automatically get access to the admin panel for managing shoes and featured items.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
