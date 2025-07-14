"use client"

import { Suspense } from "react"
import { CheckoutSuccess } from "@/components/checkout-success"

/**
 * Server Component
 * Next automatically injects the `searchParams` prop for App Router pages.
 */
export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  return (
    <div className="py-20">
      <div className="max-w-2xl px-4 mx-auto sm:px-6 lg:px-8">
        {/* `CheckoutSuccess` is a Client Component and now receives the
            raw searchParams so the page itself no longer calls
            `useSearchParams()`, eliminating the CSR-bailout error. */}
        <Suspense fallback={<div>Loading…</div>}>
          <CheckoutSuccess searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  )
}
