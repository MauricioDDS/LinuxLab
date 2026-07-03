"use client"

import { useMemo, useState } from "react"
import { ClipboardList } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { TerminalEmulator } from "@/components/terminal-emulator"
import { createTerminalSession } from "@/lib/data/terminal"

interface TerminalLine {
  type: "prompt" | "output"
  content: string
}

export default function ActividadPage() {
  const session = useMemo(() => createTerminalSession({ user: "estudiante" }), [])
  const [history, setHistory] = useState<TerminalLine[]>(
    session.greeting.map((content) => ({ type: "output", content }))
  )
  const [currentInput, setCurrentInput] = useState("")
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleTerminalSubmit = async (command: string) => {
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
    <div className="h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Instructions (40%) */}
        <div className="w-[40%] flex-shrink-0 bg-card border-r border-border flex items-center justify-center p-8">
          <div className="max-w-sm text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-secondary/60 flex items-center justify-center">
              <ClipboardList className="w-6 h-6 text-muted-foreground" />
            </div>
            <h1 className="text-base font-medium text-foreground mb-1">
              No hay actividad seleccionada
            </h1>
            <p className="text-sm text-muted-foreground">
              Abre una actividad desde un tema del curso. Las instrucciones, los pasos
              y la validación se cargarán aquí.
            </p>
          </div>
        </div>

        {/* Right Panel - Terminal (60%) */}
        <div className="flex-1 p-4">
          <TerminalEmulator
            history={history}
            currentInput={currentInput}
            onInputChange={setCurrentInput}
            onSubmit={handleTerminalSubmit}
            isFullscreen={isFullscreen}
            onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
          />
        </div>
      </div>
    </div>
  )
}
