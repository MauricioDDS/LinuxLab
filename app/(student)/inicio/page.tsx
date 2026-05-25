import Link from "next/link"
import { Terminal, BookOpen, HardDrive } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function StudentHomePage() {
  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-1">
          Bienvenido, Juan Pérez
        </h1>
        <p className="text-muted-foreground">
          Tu entorno de laboratorio Linux está listo para usar.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Mi Entorno Linux */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Mi Entorno Linux</h2>
          </div>

          <span className="inline-flex items-center gap-2 text-xs font-medium text-success bg-success/10 px-2.5 py-1 rounded-full mb-5">
            <span className="w-2 h-2 rounded-full bg-success pulse-dot" />
            Contenedor activo
          </span>

          <div className="mb-5">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="flex items-center gap-2 text-muted-foreground">
                <HardDrive className="w-4 h-4" />
                Almacenamiento
              </span>
              <span className="font-mono text-foreground">512 MB de 2 GB</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: "25%" }} />
            </div>
          </div>

          <Link href="/terminal" className="block">
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground neon-glow gap-2">
              <Terminal className="w-4 h-4" />
              Abrir Terminal
            </Button>
          </Link>
        </div>

        {/* Contenidos */}
        <div className="bg-card border border-border rounded-lg p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Contenidos</h2>
          </div>

          <p className="text-sm text-muted-foreground mb-3">
            Consulta el material de referencia del curso de Sistemas Operativos.
          </p>
          <p className="text-sm text-muted-foreground mb-5">
            Accede a los módulos temáticos con explicaciones, ejemplos y ejercicios
            prácticos sobre Linux.
          </p>

          <Link href="/contenidos" className="mt-auto block">
            <Button variant="outline" className="w-full gap-2">
              <BookOpen className="w-4 h-4" />
              Ver contenidos
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
