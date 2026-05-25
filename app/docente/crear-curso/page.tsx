"use client"

import { useState } from "react"
import { Save, Send, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { TopicSelector } from "@/components/topic-selector"
import { StudentManager, Student } from "@/components/student-manager"

const initialStudents: Student[] = [
  {
    id: "1",
    nombre: "Andrea Sofía Ramírez",
    email: "asramirez@ufps.edu.co",
    codigo: "1151423",
  },
  {
    id: "2",
    nombre: "Luis Fernando Ortega",
    email: "lfortega@ufps.edu.co",
    codigo: "1151567",
  },
  {
    id: "3",
    nombre: "María José Contreras",
    email: "mjcontreras@ufps.edu.co",
    codigo: "1151892",
  },
  {
    id: "4",
    nombre: "Carlos Andrés Villamizar",
    email: "cavillamizar@ufps.edu.co",
    codigo: "1152034",
  },
]

export default function CreateCoursePage() {
  const [courseName, setCourseName] = useState("Sistemas Operativos - 2025-II")
  const [description, setDescription] = useState(
    "Curso introductorio a la administración de sistemas Linux. Los estudiantes aprenderán los fundamentos del sistema operativo, manejo de archivos, permisos, y automatización con scripts."
  )
  const [selectedTopics, setSelectedTopics] = useState<number[]>([1, 2, 4, 8])
  const [students, setStudents] = useState<Student[]>(initialStudents)

  const handleToggleTopic = (id: number) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    )
  }

  const handleSelectAllTopics = () => {
    if (selectedTopics.length === 12) {
      setSelectedTopics([])
    } else {
      setSelectedTopics([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
    }
  }

  const handleAddStudent = (student: Omit<Student, "id">) => {
    setStudents((prev) => [
      ...prev,
      { ...student, id: Date.now().toString() },
    ])
  }

  const handleRemoveStudent = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id))
  }

  const handleUploadCSV = (file: File) => {
    // In a real app, parse the CSV here
    console.log("Uploading CSV:", file.name)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border">
        <div className="flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/docente"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                Crear Curso
              </h1>
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
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground neon-glow">
              <Send className="w-4 h-4 mr-2" />
              Publicar curso
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-8 space-y-8">
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
