/**
 * Core identity types. These mirror the future `users` table / API contract.
 * Keep field names in English; UI labels stay in Spanish.
 */

export type Role = "admin" | "teacher" | "student"

export interface User {
  id: string
  name: string
  email: string
  role: Role
  googleId?: string
  active?: boolean
}

/** A person enrolled (or enrollable) as a student. */
export interface Student {
  id: string
  /** Full name (nombre completo). */
  name: string
  /** Institutional email. */
  email: string
  /** Student code (código estudiantil). */
  code: string
}

export interface Session {
  user: User
}
