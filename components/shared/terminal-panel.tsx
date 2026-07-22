"use client"

import { Terminal as TerminalIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TerminalEmulator } from "@/components/shared/terminal-emulator"

export function TerminalPanel({ onClose }: { onClose: () => void }) {
  return (
    <aside className="w-[42%] min-w-[360px] border-l border-border bg-background flex flex-col shrink-0">
      <div className="flex items-center justify-between px-4 h-12 border-b border-border shrink-0">
        <span className="text-sm font-medium text-foreground flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-primary" />
          Mi Terminal
        </span>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Cerrar terminal"
          onClick={onClose}
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex-1 p-3 overflow-hidden">
        <TerminalEmulator />
      </div>
    </aside>
  )
}
