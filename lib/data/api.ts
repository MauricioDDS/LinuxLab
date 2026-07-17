import { env } from "@/lib/config/env"

export async function apiFetch<T = unknown>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${env.backendUrl}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    const error = new Error(body.error || `HTTP ${res.status}`)
    ;(error as any).status = res.status
    throw error
  }

  return res.json()
}
