"use client"

import Link from "next/link"
import { Clock, Video, Terminal, ListChecks, type LucideIcon } from "lucide-react"
import { syllabus } from "@/lib/features/shared/temario"
import { topicIllustration } from "@/components/student/topic-illustrations"
import { NeonProgress } from "@/components/shared/neon-progress"
import { useLessonProgress } from "@/lib/features/student/progress"
import { cn } from "@/lib/utils"
import type { Topic } from "@/lib/features/student/types"
import type { TopicPreview } from "@/lib/features/shared/lessons"

interface TopicGridProps {
  lessonCounts: Record<number, number>
  previews: Record<number, TopicPreview>
}

/**
 * The topic catalogue, AlgoMaster-style: each card has an illustration panel on
 * top that zooms on hover while the card lifts and lights up with a neon glow;
 * the text content stays put. Adds our per-topic progress bar and sneak-peek tags.
 */
export function TopicGrid({ lessonCounts, previews }: TopicGridProps) {
  const { readCountForTopic } = useLessonProgress()

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {syllabus.map((topic) => {
        const total = lessonCounts[topic.number] ?? 0
        return (
          <TopicCard
            key={topic.slug}
            topic={topic}
            total={total}
            done={total > 0 ? Math.min(readCountForTopic(topic.number), total) : 0}
            preview={previews[topic.number]}
          />
        )
      })}
    </div>
  )
}

interface TagSpec {
  icon: LucideIcon
  label: string
  className: string
}

/** Colored "sneak peek" chips. Reading time always shows; the rest only when
 *  the topic actually has that kind of content inside. */
function previewTags(preview: TopicPreview): TagSpec[] {
  const tags: TagSpec[] = []
  if (preview.minutes > 0) {
    tags.push({
      icon: Clock,
      label: `${preview.minutes} min`,
      className: "bg-secondary text-muted-foreground",
    })
  }
  if (preview.videos > 0) {
    tags.push({
      icon: Video,
      label: `${preview.videos} ${preview.videos === 1 ? "video" : "videos"}`,
      className: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    })
  }
  if (preview.simulators > 0) {
    tags.push({
      icon: Terminal,
      label: `${preview.simulators} ${preview.simulators === 1 ? "simulador" : "simuladores"}`,
      className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    })
  }
  if (preview.activities > 0) {
    tags.push({
      icon: ListChecks,
      label: `${preview.activities} ${preview.activities === 1 ? "actividad" : "actividades"}`,
      className: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    })
  }
  return tags
}

function TopicCard({
  topic,
  total,
  done,
  preview,
}: {
  topic: Topic
  total: number
  done: number
  preview?: TopicPreview
}) {
  const Illustration = topicIllustration(topic.number)
  const pct = total > 0 ? Math.round((done / total) * 100) : 0
  const tags = preview ? previewTags(preview) : []

  return (
    <Link
      href={`/course?tema=${topic.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 ease-out hover:z-10 hover:scale-[1.02] hover:border-primary/50 hover:shadow-[var(--neon-glow-strong)]"
    >
      {/* Illustration panel: dark, and the drawing zooms on hover. */}
      <div className="overflow-hidden border-b border-border bg-[#0d1117]">
        <div className="flex aspect-[16/10] items-center justify-center p-6 transition-transform duration-500 ease-out group-hover:scale-110">
          <Illustration />
        </div>
      </div>

      {/* Content stays steady while the card and image grow. */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
          {topic.number}. {topic.title}
        </h3>
        {/* Gradient underline reveal, AlgoMaster-style. */}
        <span className="mt-1.5 h-0.5 w-0 rounded-full bg-gradient-to-r from-[#ff5470] to-[#C41E3A] transition-all duration-300 ease-out group-hover:w-12" />
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {topic.description}
        </p>

        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag.label}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium",
                  tag.className,
                )}
              >
                <tag.icon className="h-3 w-3" />
                {tag.label}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-5">
          <div className="flex items-center gap-2">
            <NeonProgress value={pct} />
            <span className="w-9 shrink-0 text-right font-mono text-xs tabular-nums text-muted-foreground">
              {pct}%
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
