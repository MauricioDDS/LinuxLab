"use client"

import Link from "next/link"
import { 
  ChevronLeft, 
  Users, 
  BookOpen, 
  Plus, 
  BarChart3, 
  Settings,
  FileText,
  Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { use } from "react"

const courseData = {
  id: 1,
  name: "Sistemas Operativos - 2025-II",
  description: "Curso introductorio a sistemas operativos basados en Linux para estudiantes de Ingeniería de Sistemas.",
  students: 28,
  topics: 5,
  activities: 12,
  status: "active",
}

const recentActivities = [
  { id: 1, name: "Navegación de directorios", topic: "Directorios", submissions: 24, pending: 4 },
  { id: 2, name: "Permisos chmod", topic: "Permisos", submissions: 18, pending: 10 },
  { id: 3, name: "Script de backup", topic: "Shell Scripting", submissions: 8, pending: 20 },
]

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/docente">
                <Button variant="ghost" size="icon" className="shrink-0">
                  <ChevronLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <nav className="text-xs text-muted-foreground mb-1">
                  <span className="hover:text-foreground cursor-pointer">Mis Cursos</span>
                  <span className="mx-2">/</span>
                  <span className="text-foreground">{courseData.name}</span>
                </nav>
                <h1 className="text-xl font-semibold">{courseData.name}</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-border">
                <Settings className="w-4 h-4 mr-2" />
                Configuración
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-card border border-border p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="text-2xl font-semibold font-mono">{courseData.students}</span>
              <span className="block text-xs text-muted-foreground">Estudiantes</span>
            </div>
          </div>
          <div className="bg-card border border-border p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary/50 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <span className="text-2xl font-semibold font-mono">{courseData.topics}</span>
              <span className="block text-xs text-muted-foreground">Temas activos</span>
            </div>
          </div>
          <div className="bg-card border border-border p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary/50 flex items-center justify-center">
              <FileText className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <span className="text-2xl font-semibold font-mono">{courseData.activities}</span>
              <span className="block text-xs text-muted-foreground">Actividades</span>
            </div>
          </div>
          <div className="bg-card border border-border p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-success/10 flex items-center justify-center">
              <div className="w-3 h-3 bg-success rounded-full" />
            </div>
            <div>
              <span className="text-2xl font-semibold font-mono text-success">Activo</span>
              <span className="block text-xs text-muted-foreground">Estado</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href={`/docente/cursos/${id}/seguimiento`}
            className="bg-card border border-border p-6 hover:border-primary/30 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium group-hover:text-primary transition-colors">
                  Panel de Seguimiento
                </h3>
                <p className="text-sm text-muted-foreground">
                  Ver progreso de estudiantes
                </p>
              </div>
            </div>
          </Link>

          <Link
            href={`/docente/cursos/${id}/nueva-actividad`}
            className="bg-card border border-border p-6 hover:border-primary/30 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Plus className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium group-hover:text-primary transition-colors">
                  Nueva Actividad
                </h3>
                <p className="text-sm text-muted-foreground">
                  Crear actividad personalizada
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Activities */}
        <div className="bg-card border border-border">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h2 className="font-medium">Actividades Recientes</h2>
            <Link href={`/docente/cursos/${id}/actividades`} className="text-sm text-primary hover:underline">
              Ver todas
            </Link>
          </div>
          <div className="divide-y divide-border/50">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="px-4 py-3 flex items-center justify-between hover:bg-secondary/20 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <span className="text-sm font-medium">{activity.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {activity.topic}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-success font-mono">{activity.submissions} enviadas</span>
                  {activity.pending > 0 && (
                    <span className="text-warning font-mono">{activity.pending} pendientes</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Description */}
        <div className="bg-card border border-border p-4">
          <h2 className="font-medium mb-2">Descripción del curso</h2>
          <p className="text-sm text-muted-foreground">{courseData.description}</p>
        </div>
      </div>
    </div>
  )
}
