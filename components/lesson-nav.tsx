import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import type { LessonRef } from "@/lib/content/lessons"

/**
 * Previous/next navigation at the end of a lesson. Follows the reading order of
 * the temario, skipping topics that have no published content.
 */
export function LessonNav({
  prev,
  next,
}: {
  prev: LessonRef | null
  next: LessonRef | null
}) {
  if (!prev && !next) return null

  return (
    <nav className="mt-12 pt-6 border-t border-border flex items-center justify-between gap-4">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex items-center gap-3 max-w-[45%] rounded-md border border-border px-4 py-3 text-left hover:border-primary/40 hover:bg-secondary/40 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-muted-foreground shrink-0 group-hover:text-primary transition-colors" />
          <span className="min-w-0">
            <span className="block text-xs text-muted-foreground">Anterior</span>
            <span className="block text-sm font-medium text-foreground truncate">
              {prev.subtopicTitle}
            </span>
          </span>
        </Link>
      ) : (
        <span />
      )}

      {next ? (
        <Link
          href={next.href}
          className="group flex items-center gap-3 max-w-[55%] rounded-md bg-primary text-primary-foreground px-5 py-3 text-right neon-glow hover:neon-glow-strong hover:bg-primary/90 transition-all duration-300"
        >
          <span className="min-w-0">
            <span className="block text-xs text-primary-foreground/80">Siguiente</span>
            <span className="block text-sm font-semibold truncate">
              {next.subtopicTitle}
            </span>
          </span>
          <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  )
}
