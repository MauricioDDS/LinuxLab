"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronRight, Calendar, Save, Send, Copy, Trash2, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { RichTextEditor } from "@/components/rich-text-editor"
import { cn } from "@/lib/utils"

const courseTopics = [
  { id: 1, name: "Introducción a Linux" },
  { id: 2, name: "Directorios" },
  { id: 4, name: "Permisos" },
  { id: 6, name: "Compresión" },
  { id: 8, name: "Gestión de Procesos" },
  { id: 11, name: "Shell Scripting" },
]

const defaultInstructions = `Crea un script en bash que realice un backup del directorio /home/estudiante/documentos hacia /home/estudiante/backups.

El script debe:

1. Verificar que el directorio origen existe
2. Crear el directorio destino si no existe
3. Copiar los archivos preservando permisos
4. Mostrar un mensaje de confirmación al finalizar`

const defaultValidationScript = `#!/bin/bash
# Verificar que el directorio backup existe
if [ -d /home/$USER/backups ]; then
  echo 'PASS'
else
  echo 'FAIL'
fi`

interface TerminalLine {
  type: "prompt" | "output"
  content: string
}

export default function NuevaActividadPage() {
  const [activityName, setActivityName] = useState("Tarea: Script de backup")
  const [selectedTopic, setSelectedTopic] = useState("")
  const [maxScore, setMaxScore] = useState("100")
  const [dueDate, setDueDate] = useState("")
  const [isRequired, setIsRequired] = useState(true)
  const [instructions, setInstructions] = useState(defaultInstructions)
  const [evaluationType, setEvaluationType] = useState<"manual" | "script">("script")
  const [validationScript, setValidationScript] = useState(defaultValidationScript)
  
  // Terminal state
  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([
    { type: "output", content: "LinuxLab UFPS - Terminal de prueba para docentes" },
    { type: "output", content: "Usa esta terminal para preparar el entorno o probar tu script de validación.\n" },
  ])
  const [terminalInput, setTerminalInput] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalBodyRef = useRef<HTMLDivElement>(null)

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight
    }
  }, [terminalHistory, terminalInput])

  const processCommand = (command: string): string => {
    const cmd = command.trim().toLowerCase()
    
    if (cmd === "help") {
      return "Comandos disponibles: ls, pwd, whoami, echo, cat, mkdir, touch, clear, help"
    }
    if (cmd === "pwd") {
      return "/home/docente"
    }
    if (cmd === "whoami") {
      return "docente"
    }
    if (cmd === "ls" || cmd === "ls -l" || cmd === "ls -la") {
      return "documentos/  scripts/  backups/  validacion.sh"
    }
    if (cmd === "clear") {
      setTerminalHistory([])
      return ""
    }
    if (cmd.startsWith("echo ")) {
      return command.substring(5).replace(/['"]/g, "")
    }
    if (cmd.startsWith("cat ")) {
      const file = cmd.substring(4)
      if (file === "validacion.sh") {
        return validationScript
      }
      return `cat: ${file}: No such file or directory`
    }
    if (cmd === "bash validacion.sh" || cmd === "./validacion.sh") {
      return "PASS"
    }
    if (cmd.startsWith("mkdir ") || cmd.startsWith("touch ")) {
      return ""
    }
    
    return `bash: ${command.split(" ")[0]}: command not found`
  }

  const handleTerminalSubmit = () => {
    if (!terminalInput.trim()) return
    
    const newHistory: TerminalLine[] = [
      ...terminalHistory,
      { type: "prompt", content: terminalInput },
    ]
    
    const output = processCommand(terminalInput)
    if (output) {
      newHistory.push({ type: "output", content: output })
    }
    
    setTerminalHistory(newHistory)
    setTerminalInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleTerminalSubmit()
    }
  }

  const focusInput = () => {
    inputRef.current?.focus()
  }

  const copyToClipboard = () => {
    const text = terminalHistory
      .map((line) => {
        if (line.type === "prompt") return `$ ${line.content}`
        return line.content
      })
      .join("\n")
    navigator.clipboard.writeText(text)
  }

  const clearTerminal = () => {
    setTerminalHistory([
      { type: "output", content: "LinuxLab UFPS - Terminal de prueba para docentes" },
      { type: "output", content: "Usa esta terminal para preparar el entorno o probar tu script de validación.\n" },
    ])
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border">
        <div className="px-6 py-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/docente" className="hover:text-foreground transition-colors">
              Mis Cursos
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/docente/cursos/1" className="hover:text-foreground transition-colors">
              Sistemas Operativos 2025-II
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Nueva Actividad</span>
          </nav>

          {/* Title and actions */}
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-foreground">Crear nueva actividad</h1>
            <div className="flex items-center gap-3">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                Cancelar
              </Button>
              <Button variant="outline" className="border-border hover:bg-secondary">
                <Save className="w-4 h-4 mr-2" />
                Guardar borrador
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground neon-glow">
                <Send className="w-4 h-4 mr-2" />
                Publicar actividad
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Split Layout */}
      <div className="flex-1 flex">
        {/* Left Side - Configuration (55%) */}
        <div className="w-[55%] border-r border-border overflow-y-auto">
          <div className="p-6 space-y-8">
            {/* Section 1: General Information */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b border-border">
                <div className="w-6 h-6 bg-primary/10 border border-primary/30 flex items-center justify-center text-xs font-medium text-primary">
                  1
                </div>
                <h2 className="text-lg font-medium text-foreground">Información general</h2>
              </div>

              <div className="grid gap-5">
                {/* Activity name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Nombre de la actividad
                  </label>
                  <Input
                    value={activityName}
                    onChange={(e) => setActivityName(e.target.value)}
                    placeholder="Ej: Tarea: Script de backup"
                    className="bg-secondary/30 border-border focus:border-primary/50 focus:ring-primary/20"
                  />
                </div>

                {/* Topic and Score row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Tema asociado
                    </label>
                    <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                      <SelectTrigger className="bg-secondary/30 border-border focus:border-primary/50 focus:ring-primary/20">
                        <SelectValue placeholder="Seleccionar tema" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        {courseTopics.map((topic) => (
                          <SelectItem
                            key={topic.id}
                            value={topic.id.toString()}
                            className="focus:bg-primary/10 focus:text-foreground"
                          >
                            {topic.id}. {topic.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Puntuación máxima
                    </label>
                    <Input
                      type="number"
                      value={maxScore}
                      onChange={(e) => setMaxScore(e.target.value)}
                      placeholder="100"
                      min="0"
                      className="bg-secondary/30 border-border focus:border-primary/50 focus:ring-primary/20"
                    />
                  </div>
                </div>

                {/* Due date and toggle row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Fecha límite de entrega
                    </label>
                    <div className="relative">
                      <Input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="bg-secondary/30 border-border focus:border-primary/50 focus:ring-primary/20 [color-scheme:dark]"
                      />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Tipo de actividad
                    </label>
                    <div className="flex items-center gap-3 h-9">
                      <Switch
                        checked={isRequired}
                        onCheckedChange={setIsRequired}
                        className="data-[state=checked]:bg-primary"
                      />
                      <span className="text-sm text-muted-foreground">
                        {isRequired ? (
                          <span className="text-foreground font-medium">Obligatoria</span>
                        ) : (
                          "Complementaria"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Instructions */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b border-border">
                <div className="w-6 h-6 bg-primary/10 border border-primary/30 flex items-center justify-center text-xs font-medium text-primary">
                  2
                </div>
                <h2 className="text-lg font-medium text-foreground">Instrucciones</h2>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Describe la actividad para los estudiantes
                </label>
                <RichTextEditor
                  value={instructions}
                  onChange={setInstructions}
                  placeholder="Escribe las instrucciones de la actividad..."
                />
                <p className="text-xs text-muted-foreground">
                  Puedes usar formato Markdown para organizar las instrucciones.
                </p>
              </div>
            </section>

            {/* Section 3: Evaluation */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b border-border">
                <div className="w-6 h-6 bg-primary/10 border border-primary/30 flex items-center justify-center text-xs font-medium text-primary">
                  3
                </div>
                <h2 className="text-lg font-medium text-foreground">Evaluación</h2>
              </div>

              {/* Evaluation type toggle */}
              <div className="flex items-center gap-4 p-4 bg-secondary/30 border border-border">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setEvaluationType("manual")}
                    className={cn(
                      "px-4 py-2 text-sm font-medium transition-all",
                      evaluationType === "manual"
                        ? "bg-card border border-primary/50 text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Evaluación manual
                  </button>
                  <button
                    onClick={() => setEvaluationType("script")}
                    className={cn(
                      "px-4 py-2 text-sm font-medium transition-all",
                      evaluationType === "script"
                        ? "bg-card border border-primary/50 text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Script de validación
                  </button>
                </div>
              </div>

              {evaluationType === "manual" ? (
                <div className="p-4 bg-secondary/20 border border-border">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Podrás revisar y calificar manualmente los envíos de los estudiantes desde el{" "}
                    <Link href="/docente/cursos/1/seguimiento" className="text-primary hover:underline">
                      panel de seguimiento
                    </Link>
                    .
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">
                    Script de validación (Bash)
                  </label>
                  <div className="border border-border bg-[#0a0a0a] overflow-hidden">
                    {/* Code editor header */}
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#161616] border-b border-border">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                      </div>
                      <span className="text-xs text-zinc-400 ml-2 font-mono">
                        validacion.sh
                      </span>
                    </div>
                    {/* Code editor */}
                    <textarea
                      value={validationScript}
                      onChange={(e) => setValidationScript(e.target.value)}
                      className="w-full h-48 p-4 bg-transparent text-[#e6e6e6] font-mono text-sm resize-none focus:outline-none leading-relaxed"
                      spellCheck={false}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    El script debe imprimir PASS o FAIL. El resultado se asignará automáticamente como puntuación.
                  </p>
                </div>
              )}
            </section>
          </div>
        </div>

        {/* Right Side - Terminal Preview (45%) */}
        <div className="w-[45%] flex flex-col bg-[#0a0a0a]">
          {/* Terminal label */}
          <div className="px-4 py-3 border-b border-border bg-card">
            <h3 className="text-sm font-medium text-foreground">Terminal de prueba</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Usa esta terminal para preparar el entorno o probar tu script de validación
            </p>
          </div>

          {/* Terminal */}
          <div className="flex-1 flex flex-col">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#161616] border-b border-primary/30">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-sm text-zinc-400 ml-3 font-mono">
                  bash
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-zinc-400 hover:text-zinc-100"
                  onClick={copyToClipboard}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-zinc-400 hover:text-zinc-100"
                  onClick={clearTerminal}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Red separator line */}
            <div className="h-px bg-primary/50" />

            {/* Terminal Body */}
            <div
              ref={terminalBodyRef}
              className="flex-1 p-4 overflow-y-auto font-mono text-sm cursor-text"
              onClick={focusInput}
            >
              {/* History */}
              {terminalHistory.map((line, index) => (
                <div key={index} className="leading-6">
                  {line.type === "prompt" ? (
                    <div className="flex">
                      <span className="text-[#238636]">docente@linuxlab</span>
                      <span className="text-zinc-100">:</span>
                      <span className="text-[#58a6ff]">~</span>
                      <span className="text-zinc-100">$ </span>
                      <span className="text-zinc-100">{line.content}</span>
                    </div>
                  ) : (
                    <div className="text-zinc-400 whitespace-pre-wrap">
                      {line.content}
                    </div>
                  )}
                </div>
              ))}

              {/* Current Input Line */}
              <div className="flex leading-6">
                <span className="text-[#238636]">docente@linuxlab</span>
                <span className="text-zinc-100">:</span>
                <span className="text-[#58a6ff]">~</span>
                <span className="text-zinc-100">$ </span>
                <span className="text-zinc-100">{terminalInput}</span>
                <span
                  className={cn(
                    "w-2 h-5 bg-zinc-100 ml-0.5 inline-block",
                    !cursorVisible && "opacity-0"
                  )}
                />
              </div>

              {/* Hidden input for keyboard capture */}
              <input
                ref={inputRef}
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="absolute opacity-0 pointer-events-none"
                autoFocus
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
