import { env } from "@/lib/config/env"

export class NotImplementedError extends Error {
  constructor(operation: string) {
    super(
      `"${operation}" is not implemented yet. Wire it to the backend in lib/data/. ` +
        `See ARCHITECTURE.md.`,
    )
    this.name = "NotImplementedError"
  }
}

export function notImplemented(operation: string): never {
  throw new NotImplementedError(operation)
}

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
