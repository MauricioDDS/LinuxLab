import {
  Terminal,
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
  2: FolderTree, // Directorios
  3: HardDrive, // Sistema de archivos
  4: FolderPlus, // Creación de directorios
  5: FilePlus, // Creación de archivos
  6: ShieldCheck, // Permisos
  7: Archive, // Compresión
  8: Search, // Búsqueda
  9: Users, // Usuarios y grupos
  10: Activity, // Gestión de procesos
  11: Server, // Servicios y demonios
  12: Code2, // Shell scripting
  13: Package, // Instalación de paquetes (complementario)
}

export function topicIcon(topicNumber: number): LucideIcon {
  return TOPIC_ICONS[topicNumber] ?? Terminal
}
