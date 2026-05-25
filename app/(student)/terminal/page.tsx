"use client"

import { useState } from "react"
import { TerminalEmulator } from "@/components/terminal-emulator"

interface TerminalLine {
  type: "prompt" | "output"
  content: string
}

const initialHistory: TerminalLine[] = [
  { type: "output", content: "LinuxLab UFPS — entorno de estudiante (Ubuntu 22.04 LTS)." },
  { type: "output", content: "Escribe 'help' para ver los comandos disponibles.\n" },
]

export default function MiTerminalPage() {
  const [history, setHistory] = useState<TerminalLine[]>(initialHistory)
  const [currentInput, setCurrentInput] = useState("")

  const processCommand = (command: string): string => {
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

  const handleSubmit = (command: string) => {
    setHistory((prev) => [...prev, { type: "prompt", content: command }])
    const output = processCommand(command)
    if (output) setHistory((prev) => [...prev, { type: "output", content: output }])
    setCurrentInput("")
  }

  return (
    <div className="h-screen flex flex-col p-6">
      <div className="mb-4 shrink-0">
        <h1 className="text-2xl font-semibold text-foreground mb-1">Mi Terminal</h1>
        <p className="text-muted-foreground">
          Tu sesión Linux personal y persistente. Lo que crees aquí se conserva entre clases.
        </p>
      </div>
      <div className="flex-1 min-h-0">
        <TerminalEmulator
          history={history}
          currentInput={currentInput}
          onInputChange={setCurrentInput}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}
