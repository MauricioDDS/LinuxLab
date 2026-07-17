"use client"

import { useMemo, useState } from "react"
import { TerminalEmulator } from "@/components/terminal-emulator"
import { createTerminalSession } from "@/lib/data/terminal"

interface TerminalLine {
  type: "prompt" | "output"
  content: string
}

export default function TerminalPage() {
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
