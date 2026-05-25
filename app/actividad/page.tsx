"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { ActivityInstructions } from "@/components/activity-instructions"
import { TerminalEmulator } from "@/components/terminal-emulator"

interface TerminalLine {
  type: "prompt" | "output"
  content: string
}

const initialSteps = [
  {
    id: 1,
    instruction: "Crea un archivo llamado script.sh usando touch",
    status: "completed" as const,
  },
  {
    id: 2,
    instruction: "Asigna permisos 755 al archivo script.sh",
    status: "current" as const,
  },
  {
    id: 3,
    instruction: "Verifica los permisos con ls -l",
    status: "locked" as const,
  },
  {
    id: 4,
    instruction: "Cambia el propietario del archivo usando chown",
    status: "locked" as const,
  },
]

const initialHistory: TerminalLine[] = [
  { type: "prompt", content: "touch script.sh" },
  { type: "prompt", content: "ls -l" },
  {
    type: "output",
    content: `total 4
-rw-r--r-- 1 estudiante estudiante    0 May 24 10:30 script.sh`,
  },
]

export default function ActividadPage() {
  const [steps, setSteps] = useState(initialSteps)
  const [currentStep, setCurrentStep] = useState(2)
  const [history, setHistory] = useState<TerminalLine[]>(initialHistory)
  const [currentInput, setCurrentInput] = useState("chmod 755 script.sh")
  const [isFullscreen, setIsFullscreen] = useState(false)

  const allCompleted = steps.every((step) => step.status === "completed")

  const handleValidate = () => {
    // Simulate validation - in real app would check terminal output
    const expectedCommands: Record<number, string> = {
      2: "chmod 755 script.sh",
      3: "ls -l",
      4: "chown",
    }

    const expected = expectedCommands[currentStep]
    if (currentInput.includes(expected?.split(" ")[0] || "")) {
      // Add command to history
      setHistory((prev) => [...prev, { type: "prompt", content: currentInput }])

      // Add output for chmod
      if (currentStep === 2) {
        // chmod doesn't produce output, move to next step
      } else if (currentStep === 3) {
        setHistory((prev) => [
          ...prev,
          {
            type: "output",
            content: `total 4
-rwxr-xr-x 1 estudiante estudiante    0 May 24 10:30 script.sh`,
          },
        ])
      }

      // Update steps
      setSteps((prev) =>
        prev.map((step) => {
          if (step.id === currentStep) {
            return { ...step, status: "completed" as const }
          }
          if (step.id === currentStep + 1) {
            return { ...step, status: "current" as const }
          }
          return step
        })
      )

      setCurrentStep((prev) => Math.min(prev + 1, steps.length))
      setCurrentInput("")
    }
  }

  const handleSubmit = () => {
    if (allCompleted) {
      alert("Actividad enviada correctamente!")
    }
  }

  const handleTerminalSubmit = (command: string) => {
    setHistory((prev) => [...prev, { type: "prompt", content: command }])

    // Simulate command outputs
    if (command === "ls -l") {
      const hasChmod = history.some(
        (h) => h.type === "prompt" && h.content.includes("chmod 755")
      )
      setHistory((prev) => [
        ...prev,
        {
          type: "output",
          content: hasChmod
            ? `total 4
-rwxr-xr-x 1 estudiante estudiante    0 May 24 10:30 script.sh`
            : `total 4
-rw-r--r-- 1 estudiante estudiante    0 May 24 10:30 script.sh`,
        },
      ])
    } else if (command === "pwd") {
      setHistory((prev) => [
        ...prev,
        { type: "output", content: "/home/estudiante" },
      ])
    } else if (command === "whoami") {
      setHistory((prev) => [
        ...prev,
        { type: "output", content: "estudiante" },
      ])
    } else if (command.startsWith("echo")) {
      const text = command.replace(/^echo\s*/, "").replace(/['"]/g, "")
      setHistory((prev) => [...prev, { type: "output", content: text }])
    }

    setCurrentInput("")
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Instructions (40%) */}
        <div className="w-[40%] flex-shrink-0">
          <ActivityInstructions
            title="Práctica: Gestión de permisos con chmod"
            source="banco"
            points={100}
            steps={steps}
            currentStep={currentStep}
            onValidate={handleValidate}
            onSubmit={handleSubmit}
            allCompleted={allCompleted}
          />
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
