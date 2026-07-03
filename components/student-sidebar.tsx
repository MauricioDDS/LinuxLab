"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Terminal, BookOpen, LogOut, ArrowLeftRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth, initialsOf } from "@/lib/auth/context"

const navItems = [
  { label: "Inicio", href: "/inicio", icon: Home },
  { label: "Mi Terminal", href: "/terminal", icon: Terminal },
  { label: "Contenidos", href: "/contenidos", icon: BookOpen },
]

export function StudentSidebar() {
  const pathname = usePathname()
  const { user } = useAuth()

  return (
    <aside className="w-64 bg-sidebar border-r border-border flex flex-col h-screen shrink-0">
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <Link href="/inicio" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-primary/15 flex items-center justify-center rounded-md group-hover:neon-glow transition-shadow">
            <Terminal className="w-5 h-5 text-primary" />
          </div>
          <span className="font-semibold text-foreground">Linux Lab UFPS</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 text-sm rounded-md transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Role switch */}
      <div className="px-3 pb-2">
        <Link
          href="/docente"
          className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
        >
          <ArrowLeftRight className="w-4 h-4" />
          Ver vista docente
        </Link>
      </div>

      {/* Profile */}
      <div className="border-t border-border p-3 space-y-2">
        <div className="flex items-center gap-3 px-1">
          <Avatar className="w-9 h-9">
            <AvatarFallback className="bg-primary/15 text-primary text-xs font-medium">
              {initialsOf(user?.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {user?.name ?? "Invitado"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email ?? "Sin sesión activa"}
            </p>
          </div>
          <ThemeToggle className="h-8 w-8 shrink-0" />
        </div>
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 text-sm rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Cerrar sesión
        </Link>
      </div>
    </aside>
  )
}
