import { TopicGrid } from "@/components/student/topic-grid"
import { getTopicLessonCounts } from "@/lib/features/shared/lessons"
import { LessonProgressProvider } from "@/lib/features/student/progress"

export default function ContentsPage() {
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
