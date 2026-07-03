import {
  Terminal,
  HelpCircle,
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
  1: Terminal,
  2: HelpCircle,
  3: FolderTree,
  4: HardDrive,
  5: FolderPlus,
  6: FilePlus,
  7: ShieldCheck,
  8: Archive,
  9: Search,
  10: Users,
  11: Activity,
  12: Server,
  13: Code2,
  14: Package,
}

export function topicIcon(topicNumber: number): LucideIcon {
  return TOPIC_ICONS[topicNumber] ?? Terminal
}
