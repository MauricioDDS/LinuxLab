"use client"

import Link from "next/link"
import { syllabus } from "@/lib/features/shared/temario"
import { topicIcon } from "@/lib/features/shared/topic-icons"
import { NeonProgress } from "@/components/shared/neon-progress"
import { useLessonProgress } from "@/lib/features/student/progress"
import type { Topic } from "@/lib/features/student/types"

/** The topic catalogue, each card showing how much of the topic has been read. */
export function TopicGrid({ lessonCounts }: { lessonCounts: Record<number, number> }) {
  const { readCountForTopic } = useLessonProgress()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {syllabus.map((topic) => {
        const total = lessonCounts[topic.number] ?? 0
        return (
          <TopicCard
            key={topic.slug}
            topic={topic}
            total={total}
            done={total > 0 ? Math.min(readCountForTopic(topic.number), total) : 0}
          />
        )
      })}
    </div>
  )
}

function TopicCard({ topic, total, done }: { topic: Topic; total: number; done: number }) {
  const Icon = topicIcon(topic.number)
  const pct = total > 0 ? Math.round((done / total) * 100) : 0

  return (
    <Link
      href={`/course?tema=${topic.slug}`}
      className="group flex flex-col bg-card border border-border rounded-lg p-6 hover:border-primary/40 transition-colors"
    >
      <div className="w-11 h-11 bg-primary/10 flex items-center justify-center rounded-md mb-4 group-hover:bg-primary/15 transition-colors">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {topic.number}. {topic.title}
        </h2>
        {topic.complementary && (
          <span className="text-[10px] uppercase tracking-wide font-medium text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
            Complementario
          </span>
        )}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{topic.description}</p>

      {/* mt-auto keeps the bars aligned across cards of different text lengths. */}
      <div className="mt-auto pt-5">
        {/* An untouched topic just shows the empty grey track; the red fill (and
            its glow) only appear once there is progress. */}
        <div className="flex items-center gap-2">
          <NeonProgress value={pct} />
          <span className="shrink-0 w-9 text-right text-xs font-mono tabular-nums text-muted-foreground">
            {pct}%
          </span>
        </div>
        {total > 0 && (
          <p className="mt-1.5 text-xs text-muted-foreground">
            {done} de {total} {total === 1 ? "lección" : "lecciones"}
          </p>
        )}
      </div>
    </Link>
  )
}
