"use client"

import { useState } from "react"
import { Terminal } from "lucide-react"
import { useAuth } from "@/lib/auth/context"

export default function LoginPage() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await signIn(email, password)
      // On success the backend will establish the session and redirect.
      // (Auth is not implemented yet. See lib/auth/context.tsx.)
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo iniciar sesión.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1b2433] p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl px-8 py-10">
        <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-xl flex items-center justify-center">
          <Terminal className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-[#1c2128] text-center">Linux Lab UFPS</h1>
        <p className="text-[#5b626b] mt-2 text-center text-sm">
          Laboratorio Virtual de Linux para Sistemas Operativos
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium text-[#1c2128]">
              Correo institucional
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ufps.edu.co"
              className="w-full h-11 rounded-md border border-[#e2e5ea] bg-white px-3 text-[#1c2128] placeholder:text-[#9aa0a8] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="text-sm font-medium text-[#1c2128]">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tu contraseña"
              className="w-full h-11 rounded-md border border-[#e2e5ea] bg-white px-3 text-[#1c2128] placeholder:text-[#9aa0a8] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>

          {error && (
            <p className="text-sm text-danger bg-danger/10 rounded-md px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Iniciando sesión…" : "Iniciar sesión"}
          </button>
        </form>

        <p className="mt-6 text-xs text-[#5b626b] text-center">
          Acceso exclusivo para estudiantes y docentes de la UFPS
        </p>
      </div>
    </div>
  )
}
