import Link from "next/link"
import { ShieldX } from "lucide-react"

export default function NoAutorizadoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1b2433] p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl px-8 py-10 text-center">
        <div className="w-16 h-16 mx-auto mb-6 bg-destructive/10 rounded-xl flex items-center justify-center">
          <ShieldX className="w-8 h-8 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold text-[#1c2128]">Acceso no autorizado</h1>
        <p className="text-[#5b626b] mt-2 text-sm leading-relaxed">
          No tienes permisos para acceder a esta sección.
          Si crees que esto es un error, contacta al administrador.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block h-11 leading-[44px] px-6 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors text-sm"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
