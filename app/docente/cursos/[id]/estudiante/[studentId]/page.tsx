"use client"

import { Fragment, use } from "react"
import Link from "next/link"
import { ChevronLeft, User, Calendar, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CircularProgress, ProgressBar } from "@/components/progress-indicators"
import { cn } from "@/lib/utils"

interface StudentDetailPageProps {
  params: Promise<{ id: string; studentId: string }>
}

const studentData = {
  id: "1",
  name: "María García López",
  code: "1151234",
  email: "maria.garcia@ufps.edu.co",
  course: "Sistemas Operativos - 2025-II",
  enrolledAt: "2025-01-15",
  lastActive: "Hace 2 horas",
  overallProgress: 72,
  topicProgress: [
    { id: 1, name: "Introducción a Linux", completed: 3, total: 3, avgScore: 92 },
    { id: 2, name: "Directorios", completed: 5, total: 5, avgScore: 88 },
    { id: 4, name: "Permisos", completed: 4, total: 6, avgScore: 85 },
    { id: 6, name: "Compresión", completed: 1, total: 4, avgScore: 75 },
    { id: 8, name: "Shell Scripting", completed: 0, total: 5, avgScore: 0 },
  ],
  recentActivities: [
    { id: 1, name: "Permisos con chmod", date: "2025-05-22", score: 95, maxScore: 100, type: "auto", status: "graded" },
    { id: 2, name: "Script de backup", date: "2025-05-21", score: null, maxScore: 100, type: "manual", status: "pending" },
    { id: 3, name: "Compresión tar/gzip", date: "2025-05-20", score: 75, maxScore: 100, type: "auto", status: "graded" },
    { id: 4, name: "Permisos especiales", date: "2025-05-18", score: 88, maxScore: 100, type: "manual", status: "graded" },
    { id: 5, name: "Navegación directorios", date: "2025-05-15", score: 100, maxScore: 100, type: "auto", status: "graded" },
  ],
  allActivities: [
    { id: 1, topic: "Introducción a Linux", name: "Primeros comandos", type: "banco", score: 90, maxScore: 100, status: "completed" },
    { id: 2, topic: "Introducción a Linux", name: "Manual y ayuda", type: "banco", score: 95, maxScore: 100, status: "completed" },
    { id: 3, topic: "Introducción a Linux", name: "Historia de Linux", type: "profesor", score: 92, maxScore: 100, status: "completed" },
    { id: 4, topic: "Directorios", name: "Navegación básica", type: "banco", score: 100, maxScore: 100, status: "completed" },
    { id: 5, topic: "Directorios", name: "Crear y eliminar", type: "banco", score: 85, maxScore: 100, status: "completed" },
    { id: 6, topic: "Directorios", name: "Rutas absolutas/relativas", type: "banco", score: 88, maxScore: 100, status: "completed" },
    { id: 7, topic: "Directorios", name: "Ejercicio árbol", type: "profesor", score: 80, maxScore: 100, status: "completed" },
    { id: 8, topic: "Directorios", name: "Proyecto estructura", type: "profesor", score: 90, maxScore: 100, status: "completed" },
    { id: 9, topic: "Permisos", name: "chmod básico", type: "banco", score: 95, maxScore: 100, status: "completed" },
    { id: 10, topic: "Permisos", name: "chmod octal", type: "banco", score: 88, maxScore: 100, status: "completed" },
    { id: 11, topic: "Permisos", name: "chown y chgrp", type: "banco", score: 82, maxScore: 100, status: "completed" },
    { id: 12, topic: "Permisos", name: "Permisos especiales", type: "profesor", score: 75, maxScore: 100, status: "completed" },
    { id: 13, topic: "Permisos", name: "Script permisos", type: "profesor", score: null, maxScore: 100, status: "pending" },
    { id: 14, topic: "Permisos", name: "Auditoría permisos", type: "profesor", score: null, maxScore: 100, status: "not-started" },
    { id: 15, topic: "Compresión", name: "tar básico", type: "banco", score: 75, maxScore: 100, status: "completed" },
    { id: 16, topic: "Compresión", name: "gzip y bzip2", type: "banco", score: null, maxScore: 100, status: "not-started" },
    { id: 17, topic: "Compresión", name: "Archivos zip", type: "banco", score: null, maxScore: 100, status: "not-started" },
    { id: 18, topic: "Compresión", name: "Backup comprimido", type: "profesor", score: null, maxScore: 100, status: "not-started" },
    { id: 19, topic: "Shell Scripting", name: "Variables", type: "banco", score: null, maxScore: 100, status: "not-started" },
    { id: 20, topic: "Shell Scripting", name: "Condicionales", type: "banco", score: null, maxScore: 100, status: "not-started" },
  ],
}

export default function StudentDetailPage({ params }: StudentDetailPageProps) {
  const { id } = use(params)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href={`/docente/cursos/${id}/seguimiento`}>
              <Button variant="ghost" size="icon" className="shrink-0">
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex-1">
              <nav className="text-xs text-muted-foreground mb-1">
                <span className="hover:text-foreground cursor-pointer">Mis Cursos</span>
                <span className="mx-2">/</span>
                <span className="hover:text-foreground cursor-pointer">Sistemas Operativos 2025-II</span>
                <span className="mx-2">/</span>
                <span className="hover:text-foreground cursor-pointer">Seguimiento</span>
                <span className="mx-2">/</span>
                <span className="text-foreground">{studentData.name}</span>
              </nav>
              <h1 className="text-xl font-semibold">Progreso del Estudiante</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Student Header Card */}
        <div className="bg-card border border-border p-6">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="w-16 h-16 bg-secondary flex items-center justify-center shrink-0">
              <User className="w-8 h-8 text-muted-foreground" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-semibold mb-1">{studentData.name}</h2>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
                <span className="font-mono">{studentData.code}</span>
                <span>{studentData.email}</span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Inscrito: {new Date(studentData.enrolledAt).toLocaleDateString("es-CO")}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Última actividad: {studentData.lastActive}
                </span>
              </div>
              <div className="mt-2">
                <span className="text-xs bg-secondary px-2 py-0.5">{studentData.course}</span>
              </div>
            </div>

            {/* Circular Progress */}
            <div className="shrink-0 text-center">
              <CircularProgress value={studentData.overallProgress} size="lg" />
              <p className="text-xs text-muted-foreground mt-2">Progreso General</p>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left: Topic Progress (60%) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Progreso por Tema
            </h3>
            <div className="space-y-3">
              {studentData.topicProgress.map((topic) => {
                const progressPercent = topic.total > 0 ? Math.round((topic.completed / topic.total) * 100) : 0
                return (
                  <div
                    key={topic.id}
                    className="bg-card border border-border p-4 hover:border-primary/20 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{topic.id}. {topic.name}</span>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="font-mono">
                          {topic.completed}/{topic.total} actividades
                        </span>
                        {topic.avgScore > 0 && (
                          <span className="font-mono">
                            Promedio: <span className="text-primary">{topic.avgScore}</span>/100
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="h-2 bg-secondary/50 overflow-hidden">
                      <div
                        className={cn(
                          "h-full transition-all duration-300",
                          progressPercent === 100 ? "bg-success" : "bg-primary"
                        )}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right: Recent Activities (40%) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Actividades Recientes
            </h3>
            <div className="space-y-2">
              {studentData.recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="bg-card border border-border p-3 hover:border-primary/20 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{activity.name}</p>
                      <p className="text-xs text-muted-foreground font-mono mt-0.5">
                        {new Date(activity.date).toLocaleDateString("es-CO", {
                          day: "numeric",
                          month: "short",
                        })}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      {activity.status === "graded" ? (
                        <span className="text-sm font-mono font-medium">
                          <span className={cn(
                            activity.score! >= 80 ? "text-success" : 
                            activity.score! >= 50 ? "text-warning" : "text-danger"
                          )}>
                            {activity.score}
                          </span>
                          <span className="text-muted-foreground">/{activity.maxScore}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs bg-warning/20 text-warning px-2 py-0.5">
                          <AlertCircle className="w-3 h-3" />
                          Pendiente
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className={cn(
                      "text-xs px-1.5 py-0.5",
                      activity.type === "auto" 
                        ? "bg-primary/20 text-primary" 
                        : "bg-secondary text-muted-foreground"
                    )}>
                      {activity.type === "auto" ? "Auto-evaluada" : "Revisión docente"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Grades Table */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Calificaciones
          </h3>
          <div className="border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-card border-b border-border">
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Actividad
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide w-[100px]">
                      Tipo
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide w-[120px]">
                      Puntuación
                    </th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide w-[120px]">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    let currentTopic = ""
                    return studentData.allActivities.map((activity) => {
                      const showTopicHeader = activity.topic !== currentTopic
                      currentTopic = activity.topic
                      return (
                        <Fragment key={activity.id}>
                          {showTopicHeader && (
                            <tr className="bg-secondary/30">
                              <td colSpan={4} className="px-4 py-2 text-xs font-medium text-muted-foreground">
                                {activity.topic}
                              </td>
                            </tr>
                          )}
                          <tr className="border-b border-border/50 hover:bg-card/50 transition-colors">
                            <td className="px-4 py-2.5">
                              <span className="text-sm">{activity.name}</span>
                            </td>
                            <td className="px-4 py-2.5">
                              <span className={cn(
                                "text-xs px-1.5 py-0.5",
                                activity.type === "banco" 
                                  ? "bg-primary/20 text-primary" 
                                  : "bg-secondary text-muted-foreground"
                              )}>
                                {activity.type === "banco" ? "Banco" : "Profesor"}
                              </span>
                            </td>
                            <td className="px-4 py-2.5 text-center">
                              {activity.score !== null ? (
                                <span className="font-mono text-sm">
                                  <span className={cn(
                                    activity.score >= 80 ? "text-success" : 
                                    activity.score >= 50 ? "text-warning" : "text-danger"
                                  )}>
                                    {activity.score}
                                  </span>
                                  <span className="text-muted-foreground">/{activity.maxScore}</span>
                                </span>
                              ) : (
                                <span className="text-muted-foreground text-sm">—</span>
                              )}
                            </td>
                            <td className="px-4 py-2.5 text-center">
                              {activity.status === "completed" && (
                                <span className="inline-flex items-center gap-1 text-xs text-success">
                                  <CheckCircle2 className="w-3 h-3" />
                                  Completada
                                </span>
                              )}
                              {activity.status === "pending" && (
                                <span className="inline-flex items-center gap-1 text-xs text-warning">
                                  <Clock className="w-3 h-3" />
                                  Pendiente
                                </span>
                              )}
                              {activity.status === "not-started" && (
                                <span className="text-xs text-muted-foreground">
                                  Sin iniciar
                                </span>
                              )}
                            </td>
                          </tr>
                        </Fragment>
                      )
                    })
                  })()}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
          <span>
            Total: {studentData.allActivities.filter(a => a.status === "completed").length} completadas de {studentData.allActivities.length} actividades
          </span>
          <span className="font-mono">Última actualización: hace 2 min</span>
        </div>
      </div>
    </div>
  )
}
