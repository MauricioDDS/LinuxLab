"use client"

import { useState, useRef, useEffect } from "react"
import { Copy, Trash2, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TerminalLine {
  type: "prompt" | "output" | "input"
  content: string
}

interface TerminalEmulatorProps {
  history: TerminalLine[]
  currentInput: string
  onInputChange: (value: string) => void
  onSubmit: (command: string) => void
  isFullscreen?: boolean
  onToggleFullscreen?: () => void
}

export function TerminalEmulator({
  history,
  currentInput,
  onInputChange,
  onSubmit,
  isFullscreen = false,
  onToggleFullscreen,
}: TerminalEmulatorProps) {
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
  }, [history, currentInput])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentInput.trim()) {
      onSubmit(currentInput)
    }
  }

  const focusInput = () => {
    inputRef.current?.focus()
  }

  const copyToClipboard = () => {
    const text = history
      .map((line) => {
        if (line.type === "prompt") return `$ ${line.content}`
        return line.content
      })
      .join("\n")
    navigator.clipboard.writeText(text)
  }

  const clearTerminal = () => {
    // This would be handled by parent component
  }

  return (
    <div className="h-full flex flex-col bg-[#0a0a0a] rounded-lg overflow-hidden">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#161616] border-b border-primary/30">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-sm text-zinc-400 ml-3 font-mono">
            Terminal
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
          {onToggleFullscreen && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-zinc-400 hover:text-zinc-100"
              onClick={onToggleFullscreen}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </Button>
          )}
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
        {history.map((line, index) => (
          <div key={index} className="leading-6">
            {line.type === "prompt" ? (
              <div className="flex">
                <span className="text-[#238636]">student@linuxlab</span>
                <span className="text-zinc-100">:</span>
                <span className="text-[#58a6ff]">~</span>
                <span className="text-zinc-100">$ </span>
                <span className="text-zinc-100">{line.content}</span>
              </div>
            ) : (
              <div className="text-zinc-400 whitespace-pre">
                {line.content}
              </div>
            )}
          </div>
        ))}

        {/* Current Input Line */}
        <div className="flex leading-6">
          <span className="text-[#238636]">estudiante@linuxlab</span>
          <span className="text-zinc-100">:</span>
          <span className="text-[#58a6ff]">~</span>
          <span className="text-zinc-100">$ </span>
          <span className="text-zinc-100">{currentInput}</span>
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
          value={currentInput}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="absolute opacity-0 pointer-events-none"
          autoFocus
        />
      </div>
    </div>
  )
}
