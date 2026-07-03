import { Navbar } from "@/components/navbar"
import { CourseSidebar } from "@/components/course-sidebar"
import { ContentArea } from "@/components/content-area"
import { CourseTerminal } from "@/components/course-terminal"
import { temario, getTopicBySlug } from "@/lib/content/temario"
import { getTopicContentMeta, getSubtopicMarkdown } from "@/lib/content/lessons"

export default async function CursoPage({
  searchParams,
}: {
  searchParams: Promise<{ tema?: string; sub?: string }>
}) {
  const { tema, sub } = await searchParams
  const topic = (tema ? getTopicBySlug(tema) : undefined) ?? temario[0]

  const meta = getTopicContentMeta(topic.number)
  const activeSubtopic = meta
    ? (meta.subtopics.find((s) => s.id === sub) ?? meta.subtopics[0] ?? null)
    : null
  const markdown =
    activeSubtopic !== null ? getSubtopicMarkdown(topic.number, activeSubtopic.file) : null

  return (
    <div className="h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        <CourseSidebar
          activeTopicSlug={topic.slug}
          activeSubtopicId={activeSubtopic?.id}
          contentSubtopics={meta?.subtopics}
        />
        <ContentArea
          topic={topic}
          meta={meta}
          activeSubtopic={activeSubtopic}
          markdown={markdown}
        />
        <CourseTerminal />
      </div>
    </div>
  )
}
