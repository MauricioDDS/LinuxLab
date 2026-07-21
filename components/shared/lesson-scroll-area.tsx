"use client"

import { useEffect, useRef, useState } from "react"
import { NeonProgress } from "@/components/shared/neon-progress"
import { useLessonProgress } from "@/lib/features/student/progress"

/** Below this the lesson counts as read. Reaching an exact 100% is fiddly. */
const READ_AT = 95

/**
 * The lesson's scroll container, with a reading-progress bar pinned to the
 * bottom of the sticky header. Reaching the end marks the lesson as read, which
 * is what feeds the per-topic progress in the sidebar.
 */
export function LessonScrollArea({
  topicNumber,
  subtopicId,
  header,
  children,
}: {
  topicNumber: number
  subtopicId: string | null
  header: React.ReactNode
  children: React.ReactNode
}) {
  const scrollRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [pct, setPct] = useState(0)
  const { markRead } = useLessonProgress()

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    let settle: ReturnType<typeof setTimeout> | undefined

    const update = () => {
      const max = el.scrollHeight - el.clientHeight

      if (max <= 8) {
        // Nothing to scroll: a short lesson, or a simulator. It counts as read,
        // but only once the layout stops changing — images and video load late
        // and would otherwise mark it read before the content is even there.
        setPct(100)
        clearTimeout(settle)
        if (subtopicId) {
          settle = setTimeout(() => markRead(topicNumber, subtopicId), 1200)
        }
        return
      }

      const value = Math.min(100, Math.round((el.scrollTop / max) * 100))
      setPct(value)
      if (value >= READ_AT && subtopicId) markRead(topicNumber, subtopicId)
    }

    update()
    el.addEventListener("scroll", update, { passive: true })

    // The lesson grows as images and video load, which changes the scrollable
    // height; recompute when it does.
    const observer = new ResizeObserver(update)
    observer.observe(el)
    if (contentRef.current) observer.observe(contentRef.current)

    return () => {
      clearTimeout(settle)
      el.removeEventListener("scroll", update)
      observer.disconnect()
    }
  }, [topicNumber, subtopicId, markRead])

  return (
    <main ref={scrollRef} className="flex-1 overflow-y-auto bg-background flex flex-col">
      {/* h-14 matches the sidebar header so their dividers line up. The reading
          bar is pinned to the bottom edge, so it doesn't add to that height. */}
      <div className="sticky top-0 z-10 h-14 bg-background/95 backdrop-blur border-b border-border">
        <div className="h-full px-6 flex items-center justify-between gap-4">
          {header}
          <span className="shrink-0 text-xs font-mono tabular-nums text-muted-foreground">
            {pct}%
          </span>
        </div>
        <NeonProgress
          value={pct}
          className="absolute bottom-0 inset-x-0 h-0.5 rounded-none bg-transparent"
          barClassName="rounded-none"
        />
      </div>

      <div ref={contentRef} className="flex-1">
        {children}
      </div>
    </main>
  )
}
