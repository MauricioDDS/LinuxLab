"use client"

import Link from "next/link"
import { Terminal, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4">
      {/* Logo */}
      <Link href="/inicio" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary/20 flex items-center justify-center neon-glow">
          <Terminal className="w-5 h-5 text-primary" />
        </div>
        <span className="font-semibold text-lg tracking-tight">
          <span className="text-primary neon-text">Linux</span>
          <span className="text-foreground">Lab</span>
        </span>
      </Link>

      {/* User Section */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <Terminal className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-sm text-foreground">Juan Pérez</span>
          <Avatar className="w-8 h-8">
            <AvatarImage src="/avatar.png" alt="Juan Pérez" />
            <AvatarFallback className="bg-secondary text-foreground text-xs">
              <User className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
