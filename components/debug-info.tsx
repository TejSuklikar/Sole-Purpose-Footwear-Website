"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "./auth-provider"
import { clearAllCaches, forceDataRefresh, testLiveDataConnection } from "@/lib/cache-buster"

export function DebugInfo() {
  const [isVisible, setIsVisible] = useState(false)
  const [debugData, setDebugData] = useState<any>({})
  const [testResults, setTestResults] = useState<any>(null)
  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (isVisible) {
      const updateDebugData = () => {
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
            lastShoesFetch: localStorage.getItem("sp_shoes_last_fetch")
              ? new Date(Number.parseInt(localStorage.getItem("sp_shoes_last_fetch") || "0")).toLocaleString()
              : "Never",
            lastEventsFetch: localStorage.getItem("sp_events_last_fetch")
              ? new Date(Number.parseInt(localStorage.getItem("sp_events_last_fetch") || "0")).toLocaleString()
              : "Never",
          },
          url: window.location.href,
          referrer: document.referrer || "Direct",
          cacheStatus: {
            serviceWorker: "serviceWorker" in navigator ? "Available" : "Not Available",
            cacheAPI: "caches" in window ? "Available" : "Not Available",
          },
          networkStatus: navigator.onLine ? "Online" : "Offline",
          performance: {
            now: performance.now(),
            timing: performance.timing ? "Available" : "Not Available",
          },
        }
        setDebugData(data)
      }

      updateDebugData()
      const interval = setInterval(updateDebugData, 2000) // Update every 2 seconds

      return () => clearInterval(interval)
    }
  }, [isVisible, user])

  const handleTestConnection = async () => {
    setIsTestingConnection(true)
    try {
      const results = await testLiveDataConnection()
      setTestResults(results)

      const message = `Live Data Connection Test:
      
Shoes: ${results.shoes ? "✅ SUCCESS" : "❌ FAILED"} (${results.details.shoesData || 0} items)
Status: ${results.details.shoesStatus}
Error: ${results.details.shoesError || "None"}

Events: ${results.events ? "✅ SUCCESS" : "❌ FAILED"} (${results.details.eventsData || 0} items)  
Status: ${results.details.eventsStatus}
Error: ${results.details.eventsError || "None"}

Overall: ${results.shoes && results.events ? "✅ ALL SYSTEMS WORKING" : "❌ ISSUES DETECTED"}`

      alert(message)
    } catch (error) {
      alert(`❌ Connection test failed: ${error}`)
    } finally {
      setIsTestingConnection(false)
    }
  }

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          size="sm"
          variant="outline"
          className="bg-red-500 text-white border-red-500 hover:bg-red-600 animate-pulse"
        >
          Debug
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Cross-Device Sync Debug Panel
            <Button onClick={() => setIsVisible(false)} size="sm" variant="outline">
              Close
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Connection Test Results */}
          {testResults && (
            <div className="bg-gray-100 p-4 rounded">
              <h3 className="font-semibold mb-2">Last Connection Test Results</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Shoes API:</strong> {testResults.shoes ? "✅ Working" : "❌ Failed"}
                  <br />
                  Status: {testResults.details.shoesStatus}
                  <br />
                  Data: {testResults.details.shoesData || 0} items
                  {testResults.details.shoesError && (
                    <>
                      <br />
                      Error: {testResults.details.shoesError}
                    </>
                  )}
                </div>
                <div>
                  <strong>Events API:</strong> {testResults.events ? "✅ Working" : "❌ Failed"}
                  <br />
                  Status: {testResults.details.eventsStatus}
                  <br />
                  Data: {testResults.details.eventsData || 0} items
                  {testResults.details.eventsError && (
                    <>
                      <br />
                      Error: {testResults.details.eventsError}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Current Status */}
          <div>
            <h3 className="font-semibold mb-2">Current System Status</h3>
            <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-60 whitespace-pre-wrap">
              {JSON.stringify(debugData, null, 2)}
            </pre>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <Button onClick={handleTestConnection} disabled={isTestingConnection} className="bg-blue-500 text-white">
              {isTestingConnection ? "Testing..." : "Test Live Data"}
            </Button>

            <Button
              onClick={() => {
                forceDataRefresh()
                setTimeout(() => window.location.reload(), 1000)
              }}
              className="bg-green-500 text-white"
            >
              Force Refresh & Reload
            </Button>

            <Button
              onClick={() => {
                clearAllCaches()
                setTimeout(() => window.location.reload(), 1000)
              }}
              className="bg-red-500 text-white"
            >
              Nuclear Reset
            </Button>

            <Button
              onClick={() => {
                localStorage.clear()
                sessionStorage.clear()
                window.location.reload()
              }}
              variant="outline"
            >
              Clear All Storage
            </Button>

            <Button
              onClick={() => {
                window.location.href = window.location.href.split("?")[0] + "?cb=" + Date.now()
              }}
              variant="outline"
            >
              Hard Reload Page
            </Button>

            <Button
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(debugData, null, 2))
                alert("Debug info copied to clipboard!")
              }}
              variant="outline"
            >
              Copy Debug Info
            </Button>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 p-4 rounded">
            <h3 className="font-semibold mb-2">Cross-Device Sync Testing Instructions:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Make a change in admin panel on Device A</li>
              <li>Wait for "Successfully synced to repository" message</li>
              <li>On Device B, click "Test Live Data" to verify connection</li>
              <li>If test passes, changes should appear within 3-5 seconds</li>
              <li>If test fails, use "Nuclear Reset" and try again</li>
              <li>Check console logs for detailed sync activity</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
