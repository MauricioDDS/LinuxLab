"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Terminal, BookOpen, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { useAuth, initialsOf } from "@/lib/features/auth/context"
import { DevRoleSwitcher } from "@/components/dev/role-switcher"

const navItems = [
  { label: "Home", href: "/home", icon: Home },
  { label: "Terminal", href: "/terminal", icon: Terminal },
  { label: "Contents", href: "/contents", icon: BookOpen },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  return (
    <aside className="w-64 bg-sidebar border-r border-border flex flex-col h-screen shrink-0">
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <Link href="/home" className="flex items-center gap-2 group">
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
        <button
          onClick={async () => {
            await signOut()
            window.location.href = "/"
          }}
          className="flex items-center gap-3 px-3 py-2 text-sm rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors w-full"
        >
          <LogOut className="w-4 h-4" />
          Cerrar sesión
        </button>
      </div>

      <DevRoleSwitcher />
    </aside>
  )
}
