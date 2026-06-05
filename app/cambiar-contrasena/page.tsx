"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ShieldCheck } from "lucide-react"

export default function CambiarContrasenaPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")

  const mismatch = confirm.length > 0 && password !== confirm
  const tooShort = password.length > 0 && password.length < 8

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (mismatch || tooShort || password.length === 0) return
    // Mock: el backend guarda la nueva contraseña y marca el primer ingreso como completado.
    router.push("/inicio")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1b2433] p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl px-8 py-10">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-xl flex items-center justify-center">
          <ShieldCheck className="w-8 h-8 text-primary" />
        </div>

        <h1 className="text-2xl font-bold text-[#1c2128] text-center">Cambia tu contraseña</h1>
        <p className="text-[#5b626b] mt-2 text-center text-sm">
          Por seguridad, debes establecer una nueva contraseña antes de continuar
          a la plataforma.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="new-password" className="text-sm font-medium text-[#1c2128]">
              Nueva contraseña
            </label>
            <input
              id="new-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 8 caracteres"
              className="w-full h-11 rounded-md border border-[#e2e5ea] bg-white px-3 text-[#1c2128] placeholder:text-[#9aa0a8] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
            {tooShort && (
              <p className="text-xs text-danger">La contraseña debe tener al menos 8 caracteres.</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="confirm-password" className="text-sm font-medium text-[#1c2128]">
              Confirmar contraseña
            </label>
            <input
              id="confirm-password"
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Repite la nueva contraseña"
              className="w-full h-11 rounded-md border border-[#e2e5ea] bg-white px-3 text-[#1c2128] placeholder:text-[#9aa0a8] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
            {mismatch && (
              <p className="text-xs text-danger">Las contraseñas no coinciden.</p>
            )}
          </div>

          <button
            type="submit"
            disabled={mismatch || tooShort || password.length === 0}
            className="w-full h-11 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Guardar y continuar
          </button>
        </form>
      </div>
    </div>
  )
}
