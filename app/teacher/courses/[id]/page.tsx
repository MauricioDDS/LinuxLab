import Link from "next/link"
import {
  ChevronLeft,
  Users,
  BookOpen,
  Plus,
  BarChart3,
  Settings,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { getCourse } from "@/lib/data/courses"
import { listCourseActivities } from "@/lib/data/activities"
import { getTopic } from "@/lib/content/temario"

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [course, activities] = await Promise.all([
    getCourse(id),
    listCourseActivities(id),
  ])

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
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
                  <span className="text-foreground">{course?.name ?? "Curso"}</span>
                </nav>
                <h1 className="text-xl font-semibold">{course?.name ?? "Curso"}</h1>
              </div>
            </div>
            {course && (
              <Button variant="outline" size="sm" className="border-border">
                <Settings className="w-4 h-4 mr-2" />
                Configuración
              </Button>
            )}
          </div>
        </div>
      </div>

      {!course ? (
        <div className="max-w-md mx-auto text-center py-24">
          <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-secondary/60 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-muted-foreground" />
          </div>
          <h2 className="text-base font-medium text-foreground mb-1">Curso no encontrado</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Este curso no existe o aún no tiene datos.
          </p>
          <Link href="/teacher">
            <Button variant="outline">Volver a Mis Cursos</Button>
          </Link>
        </div>
      ) : (
        <div className="p-6 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <StatCard icon={Users} value={course.studentCount} label="Estudiantes" accent />
            <StatCard icon={BookOpen} value={course.enabledTopics.length} label="Temas activos" />
            <StatCard icon={FileText} value={course.activityCount} label="Actividades" />
            <div className="bg-card border border-border p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-success/10 flex items-center justify-center">
                <div className="w-3 h-3 bg-success rounded-full" />
              </div>
              <div>
                <span className="text-2xl font-semibold font-mono text-success">
                  {course.archived ? "Archivado" : "Activo"}
                </span>
                <span className="block text-xs text-muted-foreground">Estado</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <QuickAction
              href={`/teacher/courses/${id}/tracking`}
              icon={BarChart3}
              title="Panel de Seguimiento"
              description="Ver progreso de estudiantes"
            />
            <QuickAction
              href={`/teacher/courses/${id}/new-activity`}
              icon={Plus}
              title="Nueva Actividad"
              description="Crear actividad personalizada"
            />
          </div>

          {/* Recent Activities */}
          <div className="bg-card border border-border">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <h2 className="font-medium">Actividades Recientes</h2>
            </div>
            {activities.length === 0 ? (
              <div className="px-4 py-10 text-center text-sm text-muted-foreground">
                Este curso aún no tiene actividades.
              </div>
            ) : (
              <div className="divide-y divide-border/50">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="px-4 py-3 flex items-center justify-between hover:bg-secondary/20 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <span className="text-sm font-medium">{activity.title}</span>
                        <span className="text-xs text-muted-foreground ml-2">
                          {getTopic(activity.topicNumber)?.title ?? ""}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Course Description */}
          <div className="bg-card border border-border p-4">
            <h2 className="font-medium mb-2">Descripción del curso</h2>
            <p className="text-sm text-muted-foreground">{course.description}</p>
          </div>
        </div>
      )}
    </div>
  )
}

function StatCard({
  icon: Icon,
  value,
  label,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>
  value: number
  label: string
  accent?: boolean
}) {
  return (
    <div className="bg-card border border-border p-4 flex items-center gap-3">
      <div
        className={`w-10 h-10 flex items-center justify-center ${
          accent ? "bg-primary/10" : "bg-secondary/50"
        }`}
      >
        <Icon className={`w-5 h-5 ${accent ? "text-primary" : "text-muted-foreground"}`} />
      </div>
      <div>
        <span className="text-2xl font-semibold font-mono">{value}</span>
        <span className="block text-xs text-muted-foreground">{label}</span>
      </div>
    </div>
  )
}

function QuickAction({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <Link
      href={href}
      className="bg-card border border-border p-6 hover:border-primary/30 transition-all group"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-medium group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Link>
  )
}
