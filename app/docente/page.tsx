"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, Users, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

const courses = [
  {
    id: 1,
    name: "Sistemas Operativos - 2025-I",
    students: 32,
    topics: 8,
    status: "active",
  },
  {
    id: 2,
    name: "Fundamentos de Linux - 2024-II",
    students: 28,
    topics: 12,
    status: "completed",
  },
  {
    id: 3,
    name: "Administración de Servidores - 2025-I",
    students: 15,
    topics: 6,
    status: "draft",
  },
]

export default function TeacherDashboard() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-foreground mb-1">
            Mis Cursos
          </h1>
          <p className="text-muted-foreground">
            Gestiona tus cursos y actividades
          </p>
        </div>
        <Link href="/docente/crear-curso">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground neon-glow">
            <Plus className="w-4 h-4 mr-2" />
            Crear nuevo curso
          </Button>
        </Link>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/docente/cursos/${course.id}`}
            className="bg-card border border-border p-6 hover:border-primary/30 transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-primary/10 border border-primary/30 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium ${
                  course.status === "active"
                    ? "bg-success/20 text-success border border-success/30"
                    : course.status === "completed"
                    ? "bg-muted text-muted-foreground border border-border"
                    : "bg-warning/20 text-warning border border-warning/30"
                }`}
              >
                {course.status === "active"
                  ? "Activo"
                  : course.status === "completed"
                  ? "Finalizado"
                  : "Borrador"}
              </span>
            </div>

            <h3 className="text-lg font-medium text-foreground mb-3 group-hover:text-primary transition-colors">
              {course.name}
            </h3>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                {course.students} estudiantes
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                {course.topics} temas
              </div>
            </div>

            <div className="flex items-center justify-end mt-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-sm">Ver detalles</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
