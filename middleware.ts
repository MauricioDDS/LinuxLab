import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "linuxlab-jwt-secret-2026",
)

const ROUTE_RULES = [
  { prefix: "/docente", roles: ["docente", "admin"] },
  { prefix: "/inicio", roles: ["estudiante"] },
  { prefix: "/terminal", roles: ["estudiante"] },
  { prefix: "/contenidos", roles: ["estudiante"] },
  { prefix: "/curso", roles: ["estudiante", "docente", "admin"] },
  { prefix: "/actividad", roles: ["estudiante"] },
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public route: login page
  if (pathname === "/") {
    const token = request.cookies.get("token")?.value
    if (!token) return NextResponse.next()

    try {
      const { payload } = await jwtVerify(token, JWT_SECRET)
      const role = payload.role as string
      const redirectTo = role === "estudiante" ? "/inicio" : "/docente"
      return NextResponse.redirect(new URL(redirectTo, request.url))
    } catch {
      return NextResponse.next()
    }
  }

  // Check protected routes
  const rule = ROUTE_RULES.find((r) => pathname.startsWith(r.prefix))
  if (!rule) return NextResponse.next()

  const token = request.cookies.get("token")?.value
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    const role = payload.role as string
    if (!rule.roles.includes(role)) {
      return NextResponse.redirect(new URL("/no-autorizado", request.url))
    }
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL("/", request.url))
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|__/auth|.*\\.png$|.*\\.svg$).*)",
  ],
}
