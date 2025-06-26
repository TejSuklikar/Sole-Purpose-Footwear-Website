"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "./auth-provider"
import { clearAllCaches, forceDataRefresh } from "@/lib/cache-buster"

export function DebugInfo() {
  const [isVisible, setIsVisible] = useState(false)
  const [debugData, setDebugData] = useState<any>({})
  const { user } = useAuth()

  useEffect(() => {
    if (isVisible) {
      const data = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent.substring(0, 100) + "...",
        currentUser: user,
        localStorage: {
          shoes: localStorage.getItem("sp_shoes_global") ? "Present" : "Missing",
          events: localStorage.getItem("sp_events_global") ? "Present" : "Missing",
          user: localStorage.getItem("sp_current_user") ? "Present" : "Missing",
          shoesCount: localStorage.getItem("sp_shoes_global")
            ? JSON.parse(localStorage.getItem("sp_shoes_global") || "[]").length
            : 0,
          eventsCount: localStorage.getItem("sp_events_global")
            ? JSON.parse(localStorage.getItem("sp_events_global") || "[]").length
            : 0,
        },
        url: window.location.href,
        referrer: document.referrer || "Direct",
        cacheStatus: {
          serviceWorker: "serviceWorker" in navigator ? "Available" : "Not Available",
          cacheAPI: "caches" in window ? "Available" : "Not Available",
        },
      }
      setDebugData(data)
    }
  }, [isVisible, user])

  const testLiveDataFetch = async () => {
    try {
      console.log("🧪 Testing live data fetch...")

      const shoesResponse = await fetch(`/data/shoes.json?test=${Date.now()}`, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      })

      const eventsResponse = await fetch(`/data/events.json?test=${Date.now()}`, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      })

      const shoesData = shoesResponse.ok ? await shoesResponse.json() : null
      const eventsData = eventsResponse.ok ? await eventsResponse.json() : null

      alert(`Live Data Test Results:
Shoes: ${shoesResponse.ok ? `✅ ${shoesData?.length || 0} items` : `❌ ${shoesResponse.status}`}
Events: ${eventsResponse.ok ? `✅ ${eventsData?.length || 0} items` : `❌ ${eventsResponse.status}`}`)
    } catch (error) {
      alert(`❌ Live data fetch failed: ${error}`)
    }
  }

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          size="sm"
          variant="outline"
          className="bg-red-500 text-white border-red-500 hover:bg-red-600"
        >
          Debug
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-auto">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Debug Information
            <Button onClick={() => setIsVisible(false)} size="sm" variant="outline">
              Close
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Current Status</h3>
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-40">
              {JSON.stringify(debugData, null, 2)}
            </pre>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() => {
                clearAllCaches()
                window.location.reload()
              }}
              size="sm"
              className="bg-red-500 text-white"
            >
              Clear All Caches & Reload
            </Button>

            <Button
              onClick={() => {
                localStorage.clear()
                window.location.reload()
              }}
              size="sm"
              variant="outline"
            >
              Clear localStorage & Reload
            </Button>

            <Button
              onClick={() => {
                forceDataRefresh()
                setTimeout(() => window.location.reload(), 1000)
              }}
              size="sm"
              className="bg-blue-500 text-white"
            >
              Force Data Refresh
            </Button>

            <Button onClick={testLiveDataFetch} size="sm" className="bg-green-500 text-white">
              Test Live Data
            </Button>

            <Button
              onClick={() => {
                window.location.href = window.location.href.split("?")[0]
              }}
              size="sm"
              variant="outline"
            >
              Remove URL Parameters
            </Button>

            <Button
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(debugData, null, 2))
                alert("Debug info copied to clipboard!")
              }}
              size="sm"
              variant="outline"
            >
              Copy Debug Info
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
