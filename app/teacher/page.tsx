import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { listCourses } from "@/lib/data/courses"
import { CoursesTable } from "@/components/courses-table"

export default async function DashboardPage() {
  const courses = await listCourses()

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground mb-1">Mis Cursos</h1>
          <p className="text-muted-foreground">Gestiona tus cursos y actividades</p>
        </div>
        <Link href="/teacher/create-course">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground neon-glow">
            <Plus className="w-4 h-4 mr-2" />
            Crear nuevo curso
          </Button>
        </Link>
      </div>

      <CoursesTable initialCourses={courses} />
    </div>
  )
}
