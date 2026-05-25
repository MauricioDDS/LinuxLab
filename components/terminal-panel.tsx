"use client"

import { useState } from "react"
import { Terminal as TerminalIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TerminalEmulator } from "@/components/terminal-emulator"

interface TerminalLine {
  type: "prompt" | "output"
  content: string
}

const initialHistory: TerminalLine[] = [
  { type: "output", content: "LinuxLab UFPS — terminal lista." },
  { type: "output", content: "Escribe 'help' para ver los comandos disponibles.\n" },
]

function processCommand(
  command: string,
  setHistory: React.Dispatch<React.SetStateAction<TerminalLine[]>>
): string {
  const cmd = command.trim().toLowerCase()
  if (cmd === "help") return "Comandos: ls, pwd, whoami, echo, cat, clear, help"
  if (cmd === "pwd") return "/home/estudiante"
  if (cmd === "whoami") return "estudiante"
  if (cmd === "ls" || cmd === "ls -l" || cmd === "ls -la")
    return "documentos/  practicas/  notas.txt  script.sh"
  if (cmd === "clear") {
    setHistory([])
    return ""
  }
  if (cmd.startsWith("echo ")) return command.substring(5).replace(/['"]/g, "")
  if (cmd.startsWith("cat ")) return `cat: ${cmd.substring(4)}: No such file or directory`
  return `bash: ${command.split(" ")[0]}: command not found`
}

export function TerminalPanel({ onClose }: { onClose: () => void }) {
  const [history, setHistory] = useState<TerminalLine[]>(initialHistory)
  const [currentInput, setCurrentInput] = useState("")

  const handleSubmit = (command: string) => {
    setHistory((prev) => [...prev, { type: "prompt", content: command }])
    const output = processCommand(command, setHistory)
    if (output) setHistory((prev) => [...prev, { type: "output", content: output }])
    setCurrentInput("")
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
