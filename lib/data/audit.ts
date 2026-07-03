import type { AuditEntry } from "@/lib/domain/audit"
import { notImplemented } from "./client"

export async function listAuditLog(): Promise<AuditEntry[]> {
  return []
}

export async function clearAuditLog(): Promise<void> {
  return notImplemented("audit.clearAuditLog")
}
