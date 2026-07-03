import Link from "next/link"
import { ChevronDown, ChevronRight, Circle } from "lucide-react"
import { cn } from "@/lib/utils"
import { temario } from "@/lib/content/temario"
import type { LessonSubtopic } from "@/lib/domain/content"

interface CourseSidebarProps {
  activeTopicSlug: string
  activeSubtopicId?: string
  /** Subtopics of the active topic, when it has published content. */
  contentSubtopics?: LessonSubtopic[]
  courseName?: string
}

/**
 * Topic navigation for the content view. URL-driven (links to
 * `/curso?tema=&sub=`), so it can stay a server component. The active topic
 * expands to show its subtopics from the content manifest.
 */
export function CourseSidebar({
  activeTopicSlug,
  activeSubtopicId,
  contentSubtopics,
  courseName,
}: CourseSidebarProps) {
  return (
    <aside className="w-72 border-r border-border bg-sidebar h-full flex flex-col">
      {/* Course Header */}
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-foreground text-sm">
          {courseName ?? "Contenidos del curso"}
        </h2>
        <p className="text-xs text-muted-foreground mt-1">Sistemas Operativos · UFPS</p>
      </div>

      {/* Topics Navigation */}
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {temario.map((topic) => {
            const isActive = topic.slug === activeTopicSlug
            const subs =
              isActive && contentSubtopics && contentSubtopics.length > 0
                ? contentSubtopics
                : null
            const hasSubs = subs ? subs.length > 0 : topic.subTopics.length > 0

            return (
              <li key={topic.slug}>
                <Link
                  href={`/curso?tema=${topic.slug}`}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 text-left transition-all duration-200",
                    isActive
                      ? "bg-primary/10 border-l-2 border-primary neon-border"
                      : "hover:bg-secondary/50 border-l-2 border-transparent"
                  )}
                >
                  <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <Circle className="w-3 h-3 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{topic.number}.</span>
                      <span
                        className={cn(
                          "text-sm truncate",
                          isActive
                            ? "text-foreground font-medium"
                            : "text-muted-foreground"
                        )}
                      >
                        {topic.title}
                      </span>
                    </div>
                  </div>
                  {hasSubs &&
                    (isActive ? (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    ))}
                </Link>

                {/* Subtopics of the active topic */}
                {isActive && (
                  <ul className="ml-8 mt-1 space-y-1">
                    {subs
                      ? subs.map((sub) => (
                          <li key={sub.id}>
                            <Link
                              href={`/curso?tema=${topic.slug}&sub=${sub.id}`}
                              className={cn(
                                "w-full flex items-center gap-2 px-3 py-1.5 text-left text-xs transition-colors",
                                sub.id === activeSubtopicId
                                  ? "text-primary font-medium"
                                  : "text-muted-foreground hover:text-primary"
                              )}
                            >
                              <Circle className="w-3 h-3" />
                              <span className="truncate">{sub.title}</span>
                            </Link>
                          </li>
                        ))
                      : topic.subTopics.map((sub) => (
                          <li
                            key={sub.number}
                            className="flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground/70"
                          >
                            <Circle className="w-3 h-3" />
                            <span className="truncate">{sub.title}</span>
                          </li>
                        ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
