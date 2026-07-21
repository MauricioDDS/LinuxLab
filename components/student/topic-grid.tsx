"use client"

import Link from "next/link"
import { Clock, Video, Terminal, ListChecks, type LucideIcon } from "lucide-react"
import { syllabus } from "@/lib/features/shared/temario"
import { topicIcon } from "@/lib/features/shared/topic-icons"
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
 * The topic catalogue. Each card is compact at rest (icon, title, tags, bar) and
 * expands on hover to reveal the description, lighting up with a neon glow.
 */
export function TopicGrid({ lessonCounts, previews }: TopicGridProps) {
  const { readCountForTopic } = useLessonProgress()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
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
  const Icon = topicIcon(topic.number)
  const pct = total > 0 ? Math.round((done / total) * 100) : 0
  const tags = preview ? previewTags(preview) : []

  return (
    <Link
      href={`/course?tema=${topic.slug}`}
      className="group flex flex-col bg-card border border-border rounded-lg p-6 transition-all duration-300 hover:border-primary hover:shadow-[var(--neon-glow-strong)]"
    >
      <div className="w-11 h-11 bg-primary/10 flex items-center justify-center rounded-md mb-4 group-hover:bg-primary/15 transition-colors">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {topic.number}. {topic.title}
        </h2>
        {topic.complementary && (
          <span className="text-[10px] uppercase tracking-wide font-medium text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
            Complementario
          </span>
        )}
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag.label}
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium",
                tag.className,
              )}
            >
              <tag.icon className="w-3 h-3" />
              {tag.label}
            </span>
          ))}
        </div>
      )}

      {/* Collapsed at rest; the grid row grows from 0fr to 1fr on hover to reveal
          the description. overflow-hidden clips it while collapsed. */}
      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <p className="pt-3 text-sm text-muted-foreground leading-relaxed">
            {topic.description}
          </p>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex items-center gap-2">
          <NeonProgress value={pct} />
          <span className="shrink-0 w-9 text-right text-xs font-mono tabular-nums text-muted-foreground">
            {pct}%
          </span>
        </div>
      </div>
    </Link>
  )
}
