import { Navbar } from "@/components/navbar"
import { CourseSidebar } from "@/components/course-sidebar"
import { ContentArea } from "@/components/content-area"
import { CourseTerminal } from "@/components/course-terminal"
import { syllabus, getTopicBySlug } from "@/lib/content/temario"
import {
  getTopicContentMeta,
  getSubtopicMarkdown,
  getLessonNeighbours,
  getTopicLessonCounts,
} from "@/lib/content/lessons"
import { parseLessonBlocks } from "@/lib/content/lesson-blocks"
import { LessonProgressProvider } from "@/lib/progress/context"

export default async function CursoPage({
  searchParams,
}: {
  searchParams: Promise<{ tema?: string; sub?: string }>
}) {
  const { tema, sub } = await searchParams
  const topic = (tema ? getTopicBySlug(tema) : undefined) ?? syllabus[0]

  const meta = getTopicContentMeta(topic.number)
  const activeSubtopic = meta
    ? (meta.subtopics.find((s) => s.id === sub) ?? meta.subtopics[0] ?? null)
    : null

  const isSimulator = activeSubtopic?.type === "simulator"
  const markdown =
    activeSubtopic && !isSimulator
      ? getSubtopicMarkdown(topic.number, activeSubtopic.file)
      : null
  const blocks = isSimulator
    ? [{ kind: "simulator" as const, src: `/temario/tema-${String(topic.number).padStart(2, "0")}/${activeSubtopic!.file}` }]
    : markdown
      ? parseLessonBlocks(markdown, topic.number)
      : null

  // Works for topics without content too, so you can keep advancing the syllabus.
  const { prev, next } = getLessonNeighbours(topic.number, activeSubtopic?.id ?? null)

  return (
    <LessonProgressProvider>
      <div className="h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex overflow-hidden">
          <CourseSidebar
            activeTopicSlug={topic.slug}
            activeSubtopicId={activeSubtopic?.id}
            contentSubtopics={meta?.subtopics}
            lessonCounts={getTopicLessonCounts()}
          />
          <ContentArea
            topic={topic}
            meta={meta}
            activeSubtopic={activeSubtopic}
            blocks={blocks}
            prev={prev}
            next={next}
          />
          <CourseTerminal />
        </div>
      </div>
    </LessonProgressProvider>
  )
}
