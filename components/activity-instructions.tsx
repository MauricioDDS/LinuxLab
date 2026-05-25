"use client"

import { Check, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Step {
  id: number
  instruction: string
  status: "completed" | "current" | "locked"
}

interface ActivityInstructionsProps {
  title: string
  source: "banco" | "profesor"
  points: number
  steps: Step[]
  currentStep: number
  onValidate: () => void
  onSubmit: () => void
  allCompleted: boolean
}

export function ActivityInstructions({
  title,
  source,
  points,
  steps,
  currentStep,
  onValidate,
  onSubmit,
  allCompleted,
}: ActivityInstructionsProps) {
  return (
    <div className="h-full flex flex-col bg-card border-r border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3 mb-2">
          <span
            className={cn(
              "px-2.5 py-0.5 rounded-full text-xs font-medium",
              source === "banco"
                ? "bg-primary/20 text-primary"
                : "bg-secondary text-muted-foreground"
            )}
          >
            {source === "banco" ? "Banco" : "Profesor"}
          </span>
          <span className="text-sm text-muted-foreground font-medium">
            {points} puntos
          </span>
        </div>
        <h1 className="text-xl font-semibold text-foreground">{title}</h1>
      </div>

      {/* Steps */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-3">
          {steps.map((step) => (
            <div
              key={step.id}
              className={cn(
                "relative p-4 rounded-lg border transition-all",
                step.status === "completed" &&
                  "bg-success/10 border-success/30",
                step.status === "current" &&
                  "bg-primary/10 border-primary/50",
                step.status === "locked" &&
                  "bg-secondary/50 border-border opacity-60"
              )}
            >
              {/* Left accent for current step */}
              {step.status === "current" && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-lg" />
              )}

              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                    step.status === "completed" && "bg-success",
                    step.status === "current" && "bg-primary",
                    step.status === "locked" && "bg-secondary"
                  )}
                >
                  {step.status === "completed" ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : step.status === "locked" ? (
                    <Lock className="w-3 h-3 text-muted-foreground" />
                  ) : (
                    <span className="text-xs font-bold text-white">
                      {step.id}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    Paso {step.id}
                  </p>
                  <p
                    className={cn(
                      "text-sm mt-1",
                      step.status === "locked"
                        ? "text-muted-foreground"
                        : "text-foreground/80"
                    )}
                  >
                    {step.instruction}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Area */}
      <div className="p-6 border-t border-border bg-background/50">
        <p className="text-sm text-muted-foreground mb-4">
          Ejecuta el comando en la terminal y presiona Validar
        </p>
        <div className="flex gap-3">
          <Button
            onClick={onValidate}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground neon-glow hover:neon-glow-strong transition-all duration-300"
          >
            Validar
          </Button>
          <Button
            onClick={onSubmit}
            variant="outline"
            disabled={!allCompleted}
            className={cn(
              "flex-1 border-border",
              allCompleted && "border-primary text-primary hover:bg-primary/10"
            )}
          >
            Enviar actividad
          </Button>
        </div>
      </div>
    </div>
  )
}
