"use client"

import { useState } from "react"
import { FloatingTerminal } from "@/components/floating-terminal"
import { TerminalPanel } from "@/components/terminal-panel"

/** The floating terminal button + slide-in panel for the content view. */
export function CourseTerminal() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {open && <TerminalPanel onClose={() => setOpen(false)} />}
      {!open && <FloatingTerminal onClick={() => setOpen(true)} />}
    </>
  )
}
