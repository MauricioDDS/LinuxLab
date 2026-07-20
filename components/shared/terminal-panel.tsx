"use client"

import { useMemo, useState } from "react"
import { Terminal as TerminalIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TerminalEmulator } from "@/components/shared/terminal-emulator"
import { createTerminalSession } from "@/lib/features/student/data"

interface TerminalLine {
  type: "prompt" | "output"
  content: string
}

export function TerminalPanel({ onClose }: { onClose: () => void }) {
  const session = useMemo(() => createTerminalSession({ user: "student" }), [])
  const [history, setHistory] = useState<TerminalLine[]>(
    session.greeting.map((content) => ({ type: "output", content }))
  )
  const [currentInput, setCurrentInput] = useState("")

  const handleSubmit = async (command: string) => {
    setHistory((prev) => [...prev, { type: "prompt", content: command }])
    setCurrentInput("")
    const result = await session.run(command)
    if (result.clear) {
      setHistory([])
      return
    }
    if (result.output) {
      setHistory((prev) => [...prev, { type: "output", content: result.output }])
    }
  }

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
        <TerminalEmulator
          history={history}
          currentInput={currentInput}
          onInputChange={setCurrentInput}
          onSubmit={handleSubmit}
        />
      </div>
    </aside>
  )
}
