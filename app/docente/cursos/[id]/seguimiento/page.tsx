"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Users, BarChart3, CheckCircle2, Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MetricCard } from "@/components/metric-card"
import { StatusIndicator, ProgressBar } from "@/components/progress-indicators"
import { StudentProgressDialog } from "@/components/student-progress-dialog"

const topics = [
  { id: 1, name: "Intro Linux", short: "T1" },
  { id: 2, name: "Directorios", short: "T2" },
  { id: 4, name: "Permisos", short: "T4" },
  { id: 6, name: "Compresión", short: "T6" },
  { id: 8, name: "Shell", short: "T8" },
]

type Status = "completed" | "in-progress" | "not-started" | "overdue"

interface Student {
  id: string
  name: string
  code: string
  topicStatus: Record<number, Status>
  progress: number
  lastActivity: string
}

const students: Student[] = [
  { id: "1", name: "María García López", code: "1151234", topicStatus: { 1: "completed", 2: "completed", 4: "in-progress", 6: "not-started", 8: "not-started" }, progress: 45, lastActivity: "Hace 2 horas" },
  { id: "2", name: "Carlos Andrés Ruiz", code: "1151456", topicStatus: { 1: "completed", 2: "completed", 4: "completed", 6: "completed", 8: "in-progress" }, progress: 82, lastActivity: "Hace 15 min" },
  { id: "3", name: "Ana Sofía Mendoza", code: "1151789", topicStatus: { 1: "completed", 2: "in-progress", 4: "not-started", 6: "not-started", 8: "not-started" }, progress: 28, lastActivity: "Hace 1 día" },
  { id: "4", name: "Juan Pablo Torres", code: "1152012", topicStatus: { 1: "completed", 2: "completed", 4: "completed", 6: "in-progress", 8: "not-started" }, progress: 67, lastActivity: "Hace 45 min" },
  { id: "5", name: "Laura Valentina Díaz", code: "1152345", topicStatus: { 1: "completed", 2: "completed", 4: "completed", 6: "completed", 8: "completed" }, progress: 100, lastActivity: "Hace 3 horas" },
  { id: "6", name: "Santiago Herrera M.", code: "1152678", topicStatus: { 1: "completed", 2: "overdue", 4: "not-started", 6: "not-started", 8: "not-started" }, progress: 15, lastActivity: "Hace 5 días" },
  { id: "7", name: "Valentina Rojas P.", code: "1152901", topicStatus: { 1: "completed", 2: "completed", 4: "in-progress", 6: "not-started", 8: "not-started" }, progress: 52, lastActivity: "Hace 1 hora" },
  { id: "8", name: "Andrés Felipe Castro", code: "1153234", topicStatus: { 1: "overdue", 2: "not-started", 4: "not-started", 6: "not-started", 8: "not-started" }, progress: 5, lastActivity: "Hace 2 semanas" },
]

export default function SeguimientoPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTopic, setSelectedTopic] = useState("all")
  const [selectedActivity, setSelectedActivity] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const openStudent = (student: Student) => {
    setSelectedStudent(student)
    setDialogOpen(true)
  }

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.code.includes(searchQuery)
  )

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/docente">
              <Button variant="ghost" size="icon" className="shrink-0">
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <nav className="text-xs text-muted-foreground mb-1">
                <span className="hover:text-foreground cursor-pointer">Mis Cursos</span>
                <span className="mx-2">/</span>
                <span className="hover:text-foreground cursor-pointer">Sistemas Operativos 2025-II</span>
                <span className="mx-2">/</span>
                <span className="text-foreground">Seguimiento</span>
              </nav>
              <h1 className="text-xl font-semibold">Panel de Seguimiento</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Estudiantes inscritos"
            value={28}
            icon={Users}
          />
          <MetricCard
            title="Promedio general"
            value="73%"
            icon={BarChart3}
          />
          <MetricCard
            title="Completadas hoy"
            value={12}
            icon={CheckCircle2}
          />
          <MetricCard
            title="Activos ahora"
            value={5}
            icon={Users}
            isLive
          />
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative">
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="appearance-none bg-card border border-border px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="all">Todos los temas</option>
              {topics.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.short}: {topic.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={selectedActivity}
              onChange={(e) => setSelectedActivity(e.target.value)}
              className="appearance-none bg-card border border-border px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="all">Todas las actividades</option>
              <option value="1">Navegación básica</option>
              <option value="2">Crear directorios</option>
              <option value="3">Permisos chmod</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>

          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar estudiante..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-card border-border"
            />
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground ml-auto">
            <div className="flex items-center gap-1.5">
              <StatusIndicator status="completed" size="sm" />
              <span>Completado</span>
            </div>
            <div className="flex items-center gap-1.5">
              <StatusIndicator status="in-progress" size="sm" />
              <span>En progreso</span>
            </div>
            <div className="flex items-center gap-1.5">
              <StatusIndicator status="not-started" size="sm" />
              <span>Sin iniciar</span>
            </div>
            <div className="flex items-center gap-1.5">
              <StatusIndicator status="overdue" size="sm" />
              <span>Vencido</span>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-card border-b border-border">
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide w-[240px]">
                    Estudiante
                  </th>
                  {topics.map((topic) => (
                    <th
                      key={topic.id}
                      className="text-center px-3 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide w-[80px]"
                      title={topic.name}
                    >
                      {topic.short}
                    </th>
                  ))}
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide w-[160px]">
                    Progreso
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide w-[140px]">
                    Última actividad
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr
                    key={student.id}
                    className="border-b border-border/50 hover:bg-card/50 transition-colors group"
                  >
                    <td className="px-4 py-3">
                      <button
                        onClick={() => openStudent(student)}
                        className="group/link text-left"
                      >
                        <span className="text-sm font-medium text-foreground group-hover/link:text-primary group-hover/link:underline decoration-primary underline-offset-2 transition-colors">
                          {student.name}
                        </span>
                        <span className="block text-xs font-mono text-muted-foreground">
                          {student.code}
                        </span>
                      </button>
                    </td>
                    {topics.map((topic) => (
                      <td key={topic.id} className="px-3 py-3">
                        <StatusIndicator status={student.topicStatus[topic.id]} />
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <ProgressBar value={student.progress} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-xs font-mono text-muted-foreground">
                        {student.lastActivity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Footer */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
          <span>Mostrando {filteredStudents.length} de {students.length} estudiantes</span>
          <div className="flex items-center gap-4">
            <span className="font-mono">Última actualización: hace 2 min</span>
          </div>
        </div>
      </div>

      {/* Student progress dialog */}
      <StudentProgressDialog
        student={selectedStudent}
        topics={topics}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  )
}
