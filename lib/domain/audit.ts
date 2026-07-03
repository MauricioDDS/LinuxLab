import type { Role } from "./user"

/** One entry of the access/action log (bitácora). */
export interface AuditEntry {
  id: number
  /** ISO date-time string. */
  timestamp: string
  userName: string
  email: string
  role: Role
  course: string
  action: string
}
