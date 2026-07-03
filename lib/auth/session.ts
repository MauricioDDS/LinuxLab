import type { Role, Session } from "@/lib/domain/user"

/**
 * Server-side auth seam.
 *
 * Returns null until authentication is implemented (email + password). When the
 * backend exists, read the session from a cookie/JWT here. Route handlers and
 * server components can then call `requireRole` to gate access.
 */
export async function getSession(): Promise<Session | null> {
  return null
}

/**
 * Guard helper for server components / route handlers. Not wired into pages yet
 * (route protection is deferred); provided so the boundary exists.
 */
export async function requireRole(role: Role): Promise<Session> {
  const session = await getSession()
  if (!session) {
    throw new Error("Unauthorized: no active session.")
  }
  if (session.user.role !== role) {
    throw new Error(`Forbidden: requires role "${role}".`)
  }
  return session
}
