import { BookOpen, FileText, Link2, Video, type LucideIcon } from "lucide-react"
import { LessonBody } from "@/components/lesson-body"
import { LessonNav } from "@/components/lesson-nav"
import type { Topic } from "@/lib/domain/topic"
import type { LessonResource, LessonSubtopic, TopicContentMeta } from "@/lib/domain/content"
import type { LessonBlock } from "@/lib/content/lesson-blocks"
import type { LessonRef } from "@/lib/content/lessons"

interface ContentAreaProps {
  topic: Topic
  meta: TopicContentMeta | null
  activeSubtopic: LessonSubtopic | null
  blocks: LessonBlock[] | null
  prev: LessonRef | null
  next: LessonRef | null
}

/**
 * Renders the lesson material for the active topic/subtopic. The content comes
 * from the content seam (lib/content/lessons.ts); when a topic has no published
 * content this shows an empty state.
 */
export function ContentArea({
  topic,
  meta,
  activeSubtopic,
  blocks,
  prev,
  next,
}: ContentAreaProps) {
  return (
    <main className="flex-1 overflow-y-auto bg-background">
      <div className="px-6 py-4 border-b border-border">
        <p className="text-sm text-muted-foreground">
          {topic.number}. {topic.title}
          {activeSubtopic && (
            <span className="text-foreground"> / {activeSubtopic.title}</span>
          )}
        </p>
      </div>

      <div className="p-6 max-w-3xl">
        {blocks && blocks.length > 0 ? (
          <>
            <LessonBody blocks={blocks} />

            {/* Navegación entre sublecciones: va antes de Recursos, porque los
                recursos son del tema completo y no cambian entre sublecciones. */}
            <LessonNav prev={prev} next={next} />

            {meta && meta.resources.length > 0 && (
              <section className="mt-10 pt-6 border-t border-border">
                <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
                  Recursos
                </h2>
                <div className="grid gap-3">
                  {meta.resources.map((resource) => (
                    <ResourceCard key={resource.url} resource={resource} />
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <div className="max-w-md mx-auto text-center py-16">
            <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-secondary/60 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-muted-foreground" />
            </div>
            <h2 className="text-base font-medium text-foreground mb-1">Material no disponible</h2>
            <p className="text-sm text-muted-foreground">
              El contenido de este tema aún no está publicado.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

const RESOURCE_ICONS: Record<string, LucideIcon> = {
  pdf: FileText,
  video: Video,
  link: Link2,
}

function ResourceCard({ resource }: { resource: LessonResource }) {
  const Icon = RESOURCE_ICONS[resource.type] ?? Link2
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-4 bg-card border border-border p-4 hover:border-primary/50 transition-colors group"
    >
      <div className="w-10 h-10 bg-primary/20 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-foreground font-medium group-hover:text-primary transition-colors">
          {resource.title}
        </h3>
        {resource.detail && (
          <p className="text-xs text-muted-foreground mt-1">{resource.detail}</p>
        )}
      </div>
      <Link2 className="w-4 h-4 text-muted-foreground shrink-0" />
    </a>
  )
}
