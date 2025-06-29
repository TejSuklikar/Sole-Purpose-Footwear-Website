"use client"

import { AuthGuard } from "@/components/auth-guard"
import { AdminPanel } from "@/components/admin-panel"

export default function AdminPage() {
  return (
    <AuthGuard>
      <AdminPanel />
    </AuthGuard>
  )
}
