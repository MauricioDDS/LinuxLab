"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { CourseSidebar } from "@/components/course-sidebar"
import { ContentArea } from "@/components/content-area"
import { FloatingTerminal } from "@/components/floating-terminal"
import { TerminalPanel } from "@/components/terminal-panel"

export default function CursoPage() {
  const [terminalOpen, setTerminalOpen] = useState(false)

  return (
    <div className="h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        <CourseSidebar />
        <ContentArea />
        {terminalOpen && <TerminalPanel onClose={() => setTerminalOpen(false)} />}
      </div>
      {!terminalOpen && <FloatingTerminal onClick={() => setTerminalOpen(true)} />}
    </div>
  )
}
