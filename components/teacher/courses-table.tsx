"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Eye, Pencil, Users, Archive, ArchiveRestore, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Course } from "@/lib/domain/course"
import { deleteCourse, setCourseArchived } from "@/lib/data/courses"

type Tab = "activos" | "archivados"

export function CoursesTable({ initialCourses }: { initialCourses: Course[] }) {
  const [courses, setCourses] = useState<Course[]>(initialCourses)
  const [tab, setTab] = useState<Tab>("activos")
  const [error, setError] = useState<string | null>(null)

  const counts = useMemo(
    () => ({
      activos: courses.filter((c) => !c.archived).length,
      archivados: courses.filter((c) => c.archived).length,
    }),
    [courses]
  )

  const visible = courses.filter((c) =>
    tab === "activos" ? !c.archived : c.archived
  )

  const toggleArchive = async (course: Course) => {
    setError(null)
    try {
      await setCourseArchived(course.id, !course.archived)
      setCourses((prev) =>
        prev.map((c) => (c.id === course.id ? { ...c, archived: !c.archived } : c))
      )
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo archivar el curso.")
    }
  }

  const removeCourse = async (id: string) => {
    setError(null)
    try {
      await deleteCourse(id)
      setCourses((prev) => prev.filter((c) => c.id !== id))
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo eliminar el curso.")
    }
  }

  return (
    <>
      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border mb-4">
        {(["activos", "archivados"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors capitalize",
              tab === t
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {t === "activos" ? "Activos" : "Archivados"}
            <span className="ml-2 text-xs text-muted-foreground">{counts[t]}</span>
          </button>
        ))}
      </div>

      {error && (
        <div className="mb-4 text-sm text-danger bg-danger/10 border border-danger/20 rounded-md px-3 py-2">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide w-16">
                  ID
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Curso
                </th>
                <th className="text-center px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide w-28">
                  Estudiantes
                </th>
                <th className="text-center px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide w-28">
                  Actividades
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide w-32">
                  Creado
                </th>
                <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide w-44">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {visible.map((course) => (
                <tr
                  key={course.id}
                  className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors"
                >
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center justify-center min-w-9 px-2 py-0.5 text-xs font-mono rounded-md bg-secondary text-muted-foreground">
                      #{course.id}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/teacher/courses/${course.id}`} className="group block">
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {course.name}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {course.description}
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-center text-sm font-mono text-foreground">
                    {course.studentCount}
                  </td>
                  <td className="px-4 py-3 text-center text-sm font-mono text-foreground">
                    {course.activityCount}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground font-mono">
                    {new Date(course.createdAt).toLocaleDateString("es-CO")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <IconAction href={`/teacher/courses/${course.id}`} label="View" icon={Eye} />
                      <IconAction href={`/teacher/courses/${course.id}`} label="Students" icon={Users} />
                      <IconAction href={`/teacher/create-course`} label="Edit" icon={Pencil} />
                      <button
                        onClick={() => toggleArchive(course)}
                        title={course.archived ? "Desarchivar" : "Archivar"}
                        className="w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                      >
                        {course.archived ? (
                          <ArchiveRestore className="w-4 h-4" />
                        ) : (
                          <Archive className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => removeCourse(course.id)}
                        title="Eliminar"
                        className="w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-danger hover:bg-danger/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {visible.length === 0 && (
          <div className="px-4 py-12 text-center text-sm text-muted-foreground">
            No tienes cursos {tab === "activos" ? "activos" : "archivados"}.
          </div>
        )}
      </div>
    </>
  )
}

function IconAction({
  href,
  label,
  icon: Icon,
}: {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Link
      href={href}
      title={label}
      className="w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
    >
      <Icon className="w-4 h-4" />
    </Link>
  )
}
