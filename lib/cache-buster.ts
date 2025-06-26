// Enhanced cache busting utilities for cross-device sync

export function generateCacheBuster(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export function fetchWithCacheBusting(url: string, options: RequestInit = {}): Promise<Response> {
  const separator = url.includes("?") ? "&" : "?"
  const cacheBustedUrl = `${url}${separator}cb=${generateCacheBuster()}`

  return fetch(cacheBustedUrl, {
    ...options,
    cache: "no-store",
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0",
      Pragma: "no-cache",
      Expires: "0",
      ...options.headers,
    },
  })
}

export function clearAllCaches(): void {
  console.log("🧹 Starting comprehensive cache clear...")

  // Clear localStorage (except user data)
  const keysToKeep = ["sp_current_user"]
  const allKeys = Object.keys(localStorage)

  allKeys.forEach((key) => {
    if (!keysToKeep.includes(key)) {
      localStorage.removeItem(key)
      console.log(`🗑️ Removed localStorage key: ${key}`)
    }
  })

  // Clear sessionStorage
  sessionStorage.clear()
  console.log("🗑️ Cleared sessionStorage")

  // Clear browser caches if available
  if ("caches" in window) {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name)
        console.log(`🗑️ Deleted cache: ${name}`)
      })
    })
  }

  // Force reload all images and assets
  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    if (img.src) {
      const originalSrc = img.src.split("?")[0]
      img.src = `${originalSrc}?cb=${generateCacheBuster()}`
    }
  })

  console.log("✅ Comprehensive cache clear completed")
}

export function forceDataRefresh(): void {
  console.log("🔄 Forcing data refresh...")

  // Remove cached data to ensure a fresh fetch
  localStorage.removeItem("sp_shoes_global")
  localStorage.removeItem("sp_events_global")
  localStorage.removeItem("sp_shoes_last_fetch")
  localStorage.removeItem("sp_events_last_fetch")

  // Dispatch custom event to trigger refresh across all components
  window.dispatchEvent(new CustomEvent("forceDataRefresh", { detail: { timestamp: Date.now() } }))
}

export async function testLiveDataConnection(): Promise<{ shoes: boolean; events: boolean; details: any }> {
  const results = {
    shoes: false,
    events: false,
    details: {
      shoesStatus: 0,
      eventsStatus: 0,
      shoesError: null,
      eventsError: null,
      shoesData: null,
      eventsData: null,
    },
  }

  try {
    const shoesResponse = await fetchWithCacheBusting("/data/shoes.json")
    results.details.shoesStatus = shoesResponse.status

    if (shoesResponse.ok) {
      const shoesData = await shoesResponse.json()
      results.shoes = Array.isArray(shoesData) && shoesData.length > 0
      results.details.shoesData = shoesData?.length || 0
    } else {
      results.details.shoesError = `HTTP ${shoesResponse.status}`
    }
  } catch (error) {
    results.details.shoesError = error instanceof Error ? error.message : "Unknown error"
  }

  try {
    const eventsResponse = await fetchWithCacheBusting("/data/events.json")
    results.details.eventsStatus = eventsResponse.status

    if (eventsResponse.ok) {
      const eventsData = await eventsResponse.json()
      results.events = Array.isArray(eventsData) && eventsData.length > 0
      results.details.eventsData = eventsData?.length || 0
    } else {
      results.details.eventsError = `HTTP ${eventsResponse.status}`
    }
  } catch (error) {
    results.details.eventsError = error instanceof Error ? error.message : "Unknown error"
  }

  return results
}
