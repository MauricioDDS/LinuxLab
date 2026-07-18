"use client"

import { useState } from "react"
import Link from "next/link"
import {
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Circle,
  Home,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { syllabus } from "@/lib/features/shared/temario"
import { NeonProgress } from "@/components/shared/neon-progress"
import { useLessonProgress } from "@/lib/features/student/progress"
import type { LessonSubtopic } from "@/lib/features/shared/types"

interface CourseSidebarProps {
  activeTopicSlug: string
  activeSubtopicId?: string
  /** Subtopics of the active topic, when it has published content. */
  contentSubtopics?: LessonSubtopic[]
  /** Lesson count per topic number, for the progress bars. */
  lessonCounts: Record<number, number>
  courseName?: string
}

/**
 * Topic navigation for the content view. URL-driven (links to
  * `/course?tema=&sub=`); the active topic expands to show its subtopics from the
 * content manifest. Collapsible into a slim rail to give the lesson more room.
 */
export function CourseSidebar({
  activeTopicSlug,
  activeSubtopicId,
  contentSubtopics,
  lessonCounts,
  courseName,
}: CourseSidebarProps) {
  const [open, setOpen] = useState(true)
  const { readCountForTopic, isRead } = useLessonProgress()

  if (!open) {
    return (
      <aside className="w-12 shrink-0 border-r border-border bg-sidebar h-full flex flex-col items-center gap-1 py-3">
        <button
          onClick={() => setOpen(true)}
          title="Mostrar contenidos"
          aria-label="Mostrar contenidos"
          className="w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <PanelLeftOpen className="w-4 h-4" />
        </button>
        <Link
          href="/home"
          title="Back to home"
          aria-label="Back to home"
          className="w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <Home className="w-4 h-4" />
        </Link>
      </aside>
    )
  }

  return (
    <aside className="w-72 shrink-0 border-r border-border bg-sidebar h-full flex flex-col">
      {/* Course Header */}
      <div className="p-4 border-b border-border flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Link
            href="/home"
            title="Volver al inicio"
            aria-label="Volver al inicio"
            className="w-8 h-8 shrink-0 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <Home className="w-4 h-4" />
          </Link>
          <h2 className="font-semibold text-foreground text-sm truncate">
            {courseName ?? "Contenidos del curso"}
          </h2>
        </div>
        <button
          onClick={() => setOpen(false)}
          title="Ocultar contenidos"
          aria-label="Ocultar contenidos"
          className="w-8 h-8 shrink-0 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <PanelLeftClose className="w-4 h-4" />
        </button>
      </div>

      {/* Topics Navigation */}
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {syllabus.map((topic) => {
            const isActive = topic.slug === activeTopicSlug
            const subs =
              isActive && contentSubtopics && contentSubtopics.length > 0
                ? contentSubtopics
                : null
            const hasSubs = subs ? subs.length > 0 : topic.subTopics.length > 0

            const total = lessonCounts[topic.number] ?? 0
            const done = total > 0 ? Math.min(readCountForTopic(topic.number), total) : 0
            const pct = total > 0 ? Math.round((done / total) * 100) : 0

            return (
              <li key={topic.slug}>
                <Link
                  href={`/course?tema=${topic.slug}`}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 text-left transition-all duration-200",
                    isActive
                      ? "bg-primary/10 border-l-2 border-primary neon-border"
                      : "hover:bg-secondary/50 border-l-2 border-transparent"
                  )}
                >
                  <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    {pct === 100 ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                    ) : (
                      <Circle className="w-3 h-3 text-muted-foreground" />
                    )}
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
                    {total > 0 && (
                      <div className="flex items-center gap-2 mt-1.5">
                        <NeonProgress value={pct} className="h-1" />
                        <span className="shrink-0 w-8 text-right text-[10px] font-mono tabular-nums text-muted-foreground">
                          {pct}%
                        </span>
                      </div>
                    )}
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
                              href={`/course?tema=${topic.slug}&sub=${sub.id}`}
                              className={cn(
                                "w-full flex items-center gap-2 px-3 py-1.5 text-left text-xs transition-colors",
                                sub.id === activeSubtopicId
                                  ? "text-primary font-medium"
                                  : "text-muted-foreground hover:text-primary"
                              )}
                            >
                              {isRead(topic.number, sub.id) ? (
                                <CheckCircle2 className="w-3 h-3 shrink-0 text-primary" />
                              ) : (
                                <Circle className="w-3 h-3 shrink-0" />
                              )}
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
