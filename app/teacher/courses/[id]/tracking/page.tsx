import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TrackingPanel } from "@/components/teacher/tracking-panel"
import { getCourse } from "@/lib/data/courses"
import { getCourseProgress } from "@/lib/data/submissions"
import { getTopic } from "@/lib/content/temario"
import type { Topic } from "@/lib/domain/topic"

export default async function TrackingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [course, summary] = await Promise.all([getCourse(id), getCourseProgress(id)])
  const topics: Topic[] = (course?.enabledTopics ?? [])
    .map(getTopic)
    .filter((t): t is Topic => Boolean(t))
  const courseName = course?.name ?? "Curso"

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/teacher">
              <Button variant="ghost" size="icon" className="shrink-0">
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <nav className="text-xs text-muted-foreground mb-1">
                <Link href="/teacher" className="hover:text-foreground">
                  Mis Cursos
                </Link>
                <span className="mx-2">/</span>
                <Link href={`/teacher/courses/${id}`} className="hover:text-foreground">
                  {courseName}
                </Link>
                <span className="mx-2">/</span>
                <span className="text-foreground">Seguimiento</span>
              </nav>
              <h1 className="text-xl font-semibold">Panel de Seguimiento</h1>
            </div>
          </div>
        </div>
      </div>

      <TrackingPanel courseId={id} summary={summary} topics={topics} />
    </div>
  )
}
