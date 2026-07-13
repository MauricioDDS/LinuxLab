import {
  Terminal,
  SquareTerminal,
  FolderTree,
  HardDrive,
  FolderPlus,
  FilePlus,
  ShieldCheck,
  Archive,
  Search,
  Users,
  Activity,
  Server,
  Code2,
  Package,
  type LucideIcon,
} from "lucide-react"

/**
 * Presentation-only mapping of temario topic number → icon. Kept out of the
 * temario data so the content stays pure (no React/icon dependency).
 */
const TOPIC_ICONS: Record<number, LucideIcon> = {
  1: Terminal, // Introducción a Linux
  2: SquareTerminal, // Introducción a la CLI
  3: FolderTree, // Directorios
  4: HardDrive, // Sistema de archivos
  5: FolderPlus, // Creación de directorios
  6: FilePlus, // Creación de archivos
  7: ShieldCheck, // Permisos
  8: Archive, // Compresión
  9: Search, // Búsqueda
  10: Users, // Usuarios y grupos
  11: Activity, // Gestión de procesos
  12: Server, // Servicios y demonios
  13: Code2, // Shell scripting
  14: Package, // Instalación de paquetes (complementario)
}

export function topicIcon(topicNumber: number): LucideIcon {
  return TOPIC_ICONS[topicNumber] ?? Terminal
}
