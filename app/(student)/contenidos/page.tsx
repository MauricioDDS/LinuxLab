import { TopicGrid } from "@/components/topic-grid"
import { getTopicLessonCounts } from "@/lib/content/lessons"
import { LessonProgressProvider } from "@/lib/progress/context"

export default function ContenidosPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-1">Contenidos</h1>
        <p className="text-muted-foreground">
          Material de referencia para el curso de Sistemas Operativos.
        </p>
      </div>

      <LessonProgressProvider>
        <TopicGrid lessonCounts={getTopicLessonCounts()} />
      </LessonProgressProvider>
    </div>
  )
}
