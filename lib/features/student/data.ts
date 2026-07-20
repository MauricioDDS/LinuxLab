import { createMockTerminalSession } from "./terminal.mock"

export interface TerminalResult {
  /** Text to append to the terminal. Empty string appends nothing. */
  output: string
  /** When true, the UI should clear its history (e.g. the `clear` command). */
  clear?: boolean
}

export interface TerminalSession {
  /** Lines shown when the terminal first opens. */
  readonly greeting: string[]
  /** Execute a command and return its output. */
  run(command: string): Promise<TerminalResult>
}

export interface TerminalSessionOptions {
  /** Prompt username, e.g. "student" or "teacher". */
  user?: string
}

/**
 * Terminal seam.
 *
 * TODO (real terminal): replace the mock with an Xterm.js front-end connected
 * over WebSocket (`env.terminalGatewayUrl`) to the shared Linux server, where
 * each student has an isolated Unix account with cgroup/quota limits. The UI
 * components already talk only to this `TerminalSession` interface, so swapping
 * the implementation here is all that's needed.
 *
 * For now it returns an in-browser mock so the interface is demonstrable.
 */
export function createTerminalSession(options: TerminalSessionOptions = {}): TerminalSession {
  return createMockTerminalSession(options)
}
