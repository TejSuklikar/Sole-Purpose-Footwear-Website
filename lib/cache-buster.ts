// Cache busting utilities to ensure fresh data across all devices

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
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
      ...options.headers,
    },
  })
}

export function clearAllCaches(): void {
  // Clear localStorage
  const keysToKeep = ["sp_current_user"] // Keep user login
  const allKeys = Object.keys(localStorage)

  allKeys.forEach((key) => {
    if (!keysToKeep.includes(key)) {
      localStorage.removeItem(key)
    }
  })

  // Clear browser caches if available
  if ("caches" in window) {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name)
      })
    })
  }

  console.log("🧹 All caches cleared")
}

export function forceDataRefresh(): void {
  // Remove cached data timestamps to force refresh
  localStorage.removeItem("sp_shoes_last_fetch")
  localStorage.removeItem("sp_events_last_fetch")

  // Dispatch custom event to trigger refresh across components
  window.dispatchEvent(new CustomEvent("forceDataRefresh"))

  console.log("🔄 Forced data refresh triggered")
}
