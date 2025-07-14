interface SyncToRepoOptions {
  filename: string
  data: any
  message?: string
}

export async function syncToRepo({ filename, data, message }: SyncToRepoOptions) {
  try {
    const response = await fetch("/api/github-sync", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filename,
        content: JSON.stringify(data, null, 2),
        message: message || `Admin update: ${filename} - ${new Date().toISOString()}`,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Failed to sync to repository")
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error("Sync to repo failed:", error)
    throw error
  }
}

export async function syncShoesToRepo(shoes: any[]) {
  return syncToRepo({
    filename: "public/data/shoes.json", // Updated path to public directory
    data: shoes,
    message: `Admin update: Updated shoes inventory - ${new Date().toLocaleString()}`,
  })
}

export async function syncEventsToRepo(events: any[]) {
  return syncToRepo({
    filename: "public/data/events.json", // Updated path to public directory
    data: events,
    message: `Admin update: Updated events - ${new Date().toLocaleString()}`,
  })
}
