/**
 * MOCK terminal: in-browser fake, NOT a real shell.
 *
 * This is the only place demo command output lives. It exists purely so the
 * terminal UI is demonstrable before the real Xterm.js + WebSocket gateway is
 * wired (see `terminal.ts`). Do not build real features on top of it.
 */
import type { TerminalResult, TerminalSession, TerminalSessionOptions } from "./terminal"

export function createMockTerminalSession(
  options: TerminalSessionOptions = {},
): TerminalSession {
  const user = options.user ?? "estudiante"

  return {
    greeting: [
      "LinuxLab UFPS: terminal de demostración (mock).",
      "Aún no conectada a un entorno Linux real. Escribe 'help' para ver los comandos simulados.\n",
    ],
    async run(command: string): Promise<TerminalResult> {
      const cmd = command.trim().toLowerCase()
      if (cmd === "") return { output: "" }
      if (cmd === "help")
        return { output: "Comandos simulados: ls, pwd, whoami, echo, cat, clear, help" }
      if (cmd === "pwd") return { output: `/home/${user}` }
      if (cmd === "whoami") return { output: user }
      if (cmd === "ls" || cmd === "ls -l" || cmd === "ls -la")
        return { output: "documentos/  practicas/  notas.txt  script.sh" }
      if (cmd === "clear") return { output: "", clear: true }
      if (cmd.startsWith("echo ")) return { output: command.substring(5).replace(/['"]/g, "") }
      if (cmd.startsWith("cat "))
        return { output: `cat: ${cmd.substring(4)}: No such file or directory` }
      if (cmd.startsWith("mkdir ") || cmd.startsWith("touch ") || cmd.startsWith("chmod "))
        return { output: "" }
      return { output: `bash: ${command.split(" ")[0]}: command not found` }
    },
  }
}
