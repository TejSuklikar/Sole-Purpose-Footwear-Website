import { type NextRequest, NextResponse } from "next/server"

interface GitHubSyncRequest {
  filename: string
  content: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const { filename, content, message }: GitHubSyncRequest = await request.json()

    // Validate required environment variables
    const token = process.env.GITHUB_TOKEN
    const owner = process.env.GITHUB_OWNER || "TejSuklikar" // Your GitHub username
    const repo = process.env.GITHUB_REPO || "Sole-Purpose-Footwear-Website"

    if (!token) {
      return NextResponse.json({ error: "GitHub token not configured" }, { status: 500 })
    }

    // Get current file SHA (required for updates)
    const getFileResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filename}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    })

    let sha: string | undefined
    if (getFileResponse.ok) {
      const fileData = await getFileResponse.json()
      sha = fileData.sha
    }

    // Create or update file
    const updateResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filename}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        content: Buffer.from(content).toString("base64"),
        sha, // Include SHA if file exists
        branch: "main",
      }),
    })

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json()
      console.error("GitHub API Error:", errorData)
      return NextResponse.json(
        { error: "Failed to update repository", details: errorData },
        { status: updateResponse.status },
      )
    }

    const result = await updateResponse.json()

    return NextResponse.json({
      success: true,
      commit: result.commit,
      message: "Successfully synced to repository",
    })
  } catch (error) {
    console.error("GitHub sync error:", error)
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
