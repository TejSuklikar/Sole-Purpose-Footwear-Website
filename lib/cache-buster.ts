// Cache busting utilities to ensure fresh data across all devices

export function getCacheBustingUrl(url: string): string {
  const timestamp = new Date().getTime()
  const separator = url.includes("?") ? "&" : "?"
  return `${url}${separator}v=${timestamp}&cb=${Math.random().toString(36).substr(2, 9)}`
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

  // Clear any browser caches we can access
  if ("caches" in window) {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name)
      })
    })
  }
}

export async function fetchWithCacheBusting(url: string, options: RequestInit = {}): Promise<Response> {
  const cacheBustedUrl = getCacheBustingUrl(url)

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
