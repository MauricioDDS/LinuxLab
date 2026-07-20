"use client"

import { useEffect, useState } from "react"

/**
 * Selector de rol SOLO para desarrollo. Cambia el rol de la sesion falsa
 * (ver el bloque de bypass en lib/features/auth/session.ts) escribiendo la
 * cookie "dev-role" y recargando, para saltar entre las vistas de estudiante,
 * docente y admin sin editar codigo.
 *
 * No renderiza nada en produccion.
 */
const ROLES = ["student", "teacher", "admin"] as const
type DevRole = (typeof ROLES)[number]

const LABEL: Record<DevRole, string> = {
  student: "Estudiante",
  teacher: "Docente",
  admin: "Admin",
}

function readDevRole(): DevRole {
  const raw = document.cookie
    .split("; ")
    .find((c) => c.startsWith("dev-role="))
    ?.split("=")[1]
  return raw === "teacher" || raw === "admin" ? raw : "student"
}

export function DevRoleSwitcher() {
  const [role, setRole] = useState<DevRole>("student")

  useEffect(() => {
    setRole(readDevRole())
  }, [])

  if (process.env.NODE_ENV === "production") return null

  const change = (r: DevRole) => {
    document.cookie = `dev-role=${r}; path=/; max-age=31536000`
    // Recarga completa para que el server vuelva a renderizar con el rol nuevo.
    window.location.reload()
  }

  return (
    <div className="fixed bottom-3 left-3 z-[9999] flex items-center gap-1 rounded-full border border-border bg-card/95 px-1.5 py-1 shadow-lg backdrop-blur">
      <span className="px-1.5 text-[10px] font-mono font-semibold tracking-wide text-muted-foreground">
        DEV
      </span>
      {ROLES.map((r) => (
        <button
          key={r}
          onClick={() => change(r)}
          className={
            "rounded-full px-2.5 py-0.5 text-xs transition-colors " +
            (role === r
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary")
          }
        >
          {LABEL[r]}
        </button>
      ))}
    </div>
  )
}
