import Link from "next/link"
import { Terminal } from "lucide-react"

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1b2433] p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl px-8 py-10 text-center">
        <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-xl flex items-center justify-center">
          <Terminal className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-[#1c2128]">Linux Lab UFPS</h1>
        <p className="text-[#5b626b] mt-2 text-sm">
          Laboratorio Virtual de Linux para Sistemas Operativos
        </p>
        <Link
          href="/inicio"
          className="mt-8 flex items-center justify-center gap-3 w-full h-11 rounded-md border border-[#e2e5ea] bg-white text-[#1c2128] font-medium hover:bg-[#f6f7f9] transition-colors"
        >
          <GoogleIcon />
          Iniciar sesión con Google
        </Link>
        <p className="mt-6 text-xs text-[#5b626b]">
          Acceso exclusivo para estudiantes y docentes de la UFPS
        </p>
      </div>
    </div>
  )
}
