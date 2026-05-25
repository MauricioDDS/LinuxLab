import Link from "next/link"
import {
  Terminal,
  FolderTree,
  ShieldCheck,
  Users,
  Code2,
  Archive,
  type LucideIcon,
} from "lucide-react"

interface Topic {
  title: string
  description: string
  icon: LucideIcon
}

const topics: Topic[] = [
  {
    title: "Introducción a Linux",
    description:
      "Historia, distribuciones y conceptos fundamentales del sistema operativo Linux.",
    icon: Terminal,
  },
  {
    title: "Sistema de Archivos",
    description: "Estructura de directorios, navegación y gestión de archivos en Linux.",
    icon: FolderTree,
  },
  {
    title: "Permisos en Linux",
    description:
      "Control de acceso a archivos y directorios mediante permisos y propietarios.",
    icon: ShieldCheck,
  },
  {
    title: "Usuarios y Grupos",
    description: "Administración de cuentas de usuario y grupos en el sistema.",
    icon: Users,
  },
  {
    title: "Shell y Scripting",
    description: "Introducción a la shell de Linux y automatización mediante scripts.",
    icon: Code2,
  },
  {
    title: "Compresión y Búsqueda",
    description: "Herramientas para comprimir archivos y buscar contenido en el sistema.",
    icon: Archive,
  },
]

export default function ContenidosPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-1">Contenidos</h1>
        <p className="text-muted-foreground">
          Material de referencia para el curso de Sistemas Operativos.
        </p>
      </div>

      {/* Topic grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {topics.map((topic) => (
          <Link
            key={topic.title}
            href="/curso"
            className="group bg-card border border-border rounded-lg p-6 hover:border-primary/40 transition-colors"
          >
            <div className="w-11 h-11 bg-primary/10 flex items-center justify-center rounded-md mb-4 group-hover:bg-primary/15 transition-colors">
              <topic.icon className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {topic.title}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {topic.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
