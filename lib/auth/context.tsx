"use client"

import { createContext, useCallback, useContext, useState } from "react"
import type { User } from "@/lib/domain/user"
import { notImplemented } from "@/lib/data/client"

interface AuthContextValue {
  user: User | null
  /** True while an auth check/request is in flight. */
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  /** Set a new password (used on first-login forced change). */
  changePassword: (newPassword: string) => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

/**
 * Client auth seam. Holds the current user (none yet) and exposes the auth
 * actions. The actions throw `notImplemented` until the email+password backend
 * is wired — call sites already handle the rejected promise.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user] = useState<User | null>(null)

  const signIn = useCallback(async (_email: string, _password: string) => {
    notImplemented("auth.signIn")
  }, [])

  const signOut = useCallback(async () => {
    notImplemented("auth.signOut")
  }, [])

  const changePassword = useCallback(async (_newPassword: string) => {
    notImplemented("auth.changePassword")
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading: false, signIn, signOut, changePassword }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth must be used within <AuthProvider>.")
  }
  return ctx
}

/** Initials for an avatar fallback, e.g. "Ana Gómez" → "AG". */
export function initialsOf(name: string | undefined | null): string {
  if (!name) return "?"
  const parts = name.trim().split(/\s+/).slice(0, 2)
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("") || "?"
}
