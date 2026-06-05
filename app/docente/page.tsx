"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  Plus,
  Eye,
  Pencil,
  Users,
  Archive,
  ArchiveRestore,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Course {
  id: number
  name: string
  description: string
  students: number
  activities: number
  created: string
  archived: boolean
}

const initialCourses: Course[] = [
  { id: 7, name: "Sistemas Operativos - I sem 2026", description: "Grupo de Sistemas Operativos", students: 21, activities: 21, created: "08/04/2026", archived: false },
  { id: 8, name: "Análisis de Algoritmos - I sem 2026", description: "Grupo de análisis de algoritmos", students: 11, activities: 11, created: "15/04/2026", archived: false },
  { id: 5, name: "Estructuras de datos - I sem 2026", description: "Grupo de estructuras de datos", students: 24, activities: 24, created: "31/03/2026", archived: false },
  { id: 4, name: "Fundamentos de Programación - I sem 2026", description: "Grupo de fundamentos", students: 18, activities: 9, created: "31/03/2026", archived: false },
  { id: 2, name: "Fundamentos de Linux - 2025-II", description: "Grupo cerrado del semestre anterior", students: 28, activities: 12, created: "10/08/2025", archived: true },
  { id: 1, name: "Administración de Servidores - 2025-I", description: "Curso piloto", students: 15, activities: 6, created: "15/02/2025", archived: true },
]

type Tab = "activos" | "archivados"

export default function TeacherDashboard() {
  const [courses, setCourses] = useState<Course[]>(initialCourses)
  const [tab, setTab] = useState<Tab>("activos")

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

  const toggleArchive = (id: number) =>
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, archived: !c.archived } : c))
    )

  const removeCourse = (id: number) =>
    setCourses((prev) => prev.filter((c) => c.id !== id))

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground mb-1">Mis Cursos</h1>
          <p className="text-muted-foreground">Gestiona tus cursos y actividades</p>
        </div>
        <Link href="/docente/crear-curso">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground neon-glow">
            <Plus className="w-4 h-4 mr-2" />
            Crear nuevo curso
          </Button>
        </Link>
      </div>

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
            <span className="ml-2 text-xs text-muted-foreground">
              {counts[t]}
            </span>
          </button>
        ))}
      </div>

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
                    <Link href={`/docente/cursos/${course.id}`} className="group block">
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {course.name}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {course.description}
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-center text-sm font-mono text-foreground">
                    {course.students}
                  </td>
                  <td className="px-4 py-3 text-center text-sm font-mono text-foreground">
                    {course.activities}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground font-mono">
                    {course.created}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <IconAction href={`/docente/cursos/${course.id}`} label="Ver" icon={Eye} />
                      <IconAction href={`/docente/cursos/${course.id}`} label="Estudiantes" icon={Users} />
                      <IconAction href={`/docente/crear-curso`} label="Editar" icon={Pencil} />
                      <button
                        onClick={() => toggleArchive(course.id)}
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
    </div>
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
