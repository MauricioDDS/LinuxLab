"use client"

import { useState } from "react"
import { Save, Send, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { TopicSelector } from "@/components/student/topic-selector"
import { StudentManager } from "@/components/teacher/student-manager"
import { syllabus } from "@/lib/features/shared/temario"
import { createCourse } from "@/lib/features/teacher/data"
import type { Student } from "@/lib/features/auth/types"

export default function CreateCoursePage() {
  const [courseName, setCourseName] = useState("")
  const [description, setDescription] = useState("")
  const [selectedTopics, setSelectedTopics] = useState<number[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [error, setError] = useState<string | null>(null)
  const [publishing, setPublishing] = useState(false)

  const handleToggleTopic = (topicNumber: number) => {
    setSelectedTopics((prev) =>
      prev.includes(topicNumber)
        ? prev.filter((t) => t !== topicNumber)
        : [...prev, topicNumber]
    )
  }

  const handleSelectAllTopics = () => {
    setSelectedTopics((prev) =>
      prev.length === syllabus.length ? [] : syllabus.map((t) => t.number)
    )
  }

  const handleAddStudent = (student: Omit<Student, "id">) => {
    setStudents((prev) => [...prev, { ...student, id: crypto.randomUUID() }])
  }

  const handleRemoveStudent = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id))
  }

  const handleUploadCSV = (file: File) => {
    // TODO: parse the CSV client-side, or hand it to students.importStudentsCsv
    // once the course exists. Roster is held locally until the course is published.
    console.log("CSV seleccionado:", file.name)
  }

  const handlePublish = async () => {
    setError(null)
    setPublishing(true)
    try {
      await createCourse({
        name: courseName,
        description,
        enabledTopics: selectedTopics,
      })
      // On success the backend returns the course; redirect there.
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo publicar el curso.")
    } finally {
      setPublishing(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border">
        <div className="flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/home"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Crear Curso</h1>
              <p className="text-sm text-muted-foreground">
                Configura un nuevo curso para tus estudiantes
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-border text-muted-foreground hover:text-foreground"
            >
              <Save className="w-4 h-4 mr-2" />
              Guardar borrador
            </Button>
            <Button
              onClick={handlePublish}
              disabled={publishing}
              className="bg-primary hover:bg-primary/90 text-primary-foreground neon-glow"
            >
              <Send className="w-4 h-4 mr-2" />
              {publishing ? "Publicando…" : "Publicar curso"}
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-8 space-y-8">
        {error && (
          <div className="text-sm text-danger bg-danger/10 border border-danger/20 rounded-md px-3 py-2">
            {error}
          </div>
        )}

        {/* Section 1: Course Info */}
        <section className="bg-card border border-border p-6">
          <h2 className="text-lg font-medium text-foreground mb-6 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary/20 text-primary text-sm flex items-center justify-center">
              1
            </span>
            Información del curso
          </h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="courseName" className="text-muted-foreground">
                Nombre del curso
              </Label>
              <Input
                id="courseName"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Ej: Sistemas Operativos - 2026-I"
                className="bg-secondary/30 border-border focus:border-primary focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-muted-foreground">
                Descripción
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Breve descripción del curso…"
                className="bg-secondary/30 border-border focus:border-primary focus:ring-primary/20 resize-none"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Topic Selection */}
        <section className="bg-card border border-border p-6">
          <h2 className="text-lg font-medium text-foreground mb-6 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary/20 text-primary text-sm flex items-center justify-center">
              2
            </span>
            Selección de temas
          </h2>

          <TopicSelector
            selectedTopics={selectedTopics}
            onToggle={handleToggleTopic}
            onSelectAll={handleSelectAllTopics}
          />
        </section>

        {/* Section 3: Students */}
        <section className="bg-card border border-border p-6">
          <h2 className="text-lg font-medium text-foreground mb-6 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary/20 text-primary text-sm flex items-center justify-center">
              3
            </span>
            Estudiantes
            <span className="ml-auto text-sm font-normal text-muted-foreground">
              {students.length} estudiantes agregados
            </span>
          </h2>

          <StudentManager
            students={students}
            onAddStudent={handleAddStudent}
            onRemoveStudent={handleRemoveStudent}
            onUploadCSV={handleUploadCSV}
          />
        </section>
      </div>
    </div>
  )
}
