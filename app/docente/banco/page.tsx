"use client"

import { useState } from "react"
import { Search, Filter, Plus, Edit, Trash2, Eye, FileCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const activities = [
  {
    id: 1,
    title: "Listar contenido de directorios",
    topic: "Directorios",
    difficulty: "Básico",
    type: "Práctica terminal",
    uses: 45,
  },
  {
    id: 2,
    title: "Cambiar permisos con chmod",
    topic: "Permisos",
    difficulty: "Intermedio",
    type: "Práctica terminal",
    uses: 38,
  },
  {
    id: 3,
    title: "Crear usuarios y grupos",
    topic: "Usuarios y Grupos",
    difficulty: "Intermedio",
    type: "Práctica terminal",
    uses: 29,
  },
  {
    id: 4,
    title: "Script de backup automático",
    topic: "Shell Scripting",
    difficulty: "Avanzado",
    type: "Práctica terminal",
    uses: 22,
  },
  {
    id: 5,
    title: "Comprimir y descomprimir archivos",
    topic: "Compresión",
    difficulty: "Básico",
    type: "Práctica terminal",
    uses: 51,
  },
  {
    id: 6,
    title: "Navegación en el sistema de archivos",
    topic: "Sistema de Archivos",
    difficulty: "Básico",
    type: "Práctica terminal",
    uses: 67,
  },
  {
    id: 7,
    title: "Gestión de procesos",
    topic: "Procesos",
    difficulty: "Intermedio",
    type: "Práctica terminal",
    uses: 34,
  },
  {
    id: 8,
    title: "Configuración de red básica",
    topic: "Redes Básicas",
    difficulty: "Avanzado",
    type: "Práctica terminal",
    uses: 18,
  },
]

const topics = [
  "Todos los temas",
  "Introducción a Linux",
  "Directorios",
  "Sistema de Archivos",
  "Permisos",
  "Compresión",
  "Usuarios y Grupos",
  "Procesos",
  "Shell Scripting",
  "Redes Básicas",
  "Gestión de Paquetes",
  "Servicios del Sistema",
  "Seguridad Básica",
]

export default function BancoActividadesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTopic, setSelectedTopic] = useState("Todos los temas")
  const [selectedDifficulty, setSelectedDifficulty] = useState("Todas")

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch = activity.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesTopic =
      selectedTopic === "Todos los temas" || activity.topic === selectedTopic
    const matchesDifficulty =
      selectedDifficulty === "Todas" || activity.difficulty === selectedDifficulty
    return matchesSearch && matchesTopic && matchesDifficulty
  })

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-foreground mb-1">
            Banco de Actividades
          </h1>
          <p className="text-muted-foreground">
            Gestiona y crea actividades para tus cursos
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground neon-glow">
          <Plus className="w-4 h-4 mr-2" />
          Nueva actividad
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar actividades..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary/30 border-border focus:border-primary"
            />
          </div>

          <Select value={selectedTopic} onValueChange={setSelectedTopic}>
            <SelectTrigger className="w-48 bg-secondary/30 border-border">
              <SelectValue placeholder="Tema" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {topics.map((topic) => (
                <SelectItem key={topic} value={topic}>
                  {topic}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedDifficulty}
            onValueChange={setSelectedDifficulty}
          >
            <SelectTrigger className="w-36 bg-secondary/30 border-border">
              <SelectValue placeholder="Dificultad" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="Todas">Todas</SelectItem>
              <SelectItem value="Básico">Básico</SelectItem>
              <SelectItem value="Intermedio">Intermedio</SelectItem>
              <SelectItem value="Avanzado">Avanzado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Actividad</TableHead>
              <TableHead className="text-muted-foreground">Tema</TableHead>
              <TableHead className="text-muted-foreground">Dificultad</TableHead>
              <TableHead className="text-muted-foreground">Tipo</TableHead>
              <TableHead className="text-muted-foreground text-right">
                Usos
              </TableHead>
              <TableHead className="text-muted-foreground w-32"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredActivities.map((activity) => (
              <TableRow
                key={activity.id}
                className="border-border hover:bg-secondary/30"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <FileCode className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span className="text-foreground font-medium">
                      {activity.title}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {activity.topic}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs ${
                      activity.difficulty === "Básico"
                        ? "text-success"
                        : activity.difficulty === "Intermedio"
                        ? "text-warning"
                        : "text-primary"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {activity.difficulty}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {activity.type}
                </TableCell>
                <TableCell className="text-muted-foreground text-right">
                  {activity.uses}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 text-muted-foreground hover:text-foreground"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 text-muted-foreground hover:text-foreground"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Summary */}
      <div className="mt-4 text-sm text-muted-foreground">
        Mostrando {filteredActivities.length} de {activities.length} actividades
      </div>
    </div>
  )
}
