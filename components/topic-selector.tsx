"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

const topics = [
  { id: 1, title: "Introducción a Linux", activities: 3 },
  { id: 2, title: "Directorios", activities: 5 },
  { id: 3, title: "Sistema de Archivos", activities: 4 },
  { id: 4, title: "Permisos", activities: 6 },
  { id: 5, title: "Compresión", activities: 2 },
  { id: 6, title: "Usuarios y Grupos", activities: 4 },
  { id: 7, title: "Procesos", activities: 3 },
  { id: 8, title: "Shell Scripting", activities: 7 },
  { id: 9, title: "Redes Básicas", activities: 5 },
  { id: 10, title: "Gestión de Paquetes", activities: 3 },
  { id: 11, title: "Servicios del Sistema", activities: 4 },
  { id: 12, title: "Seguridad Básica", activities: 5 },
]

interface TopicSelectorProps {
  selectedTopics: number[]
  onToggle: (id: number) => void
  onSelectAll: () => void
}

export function TopicSelector({
  selectedTopics,
  onToggle,
  onSelectAll,
}: TopicSelectorProps) {
  const allSelected = selectedTopics.length === topics.length

  return (
    <div className="space-y-4">
      {/* Select All Toggle */}
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <button
          onClick={onSelectAll}
          className="text-sm text-primary hover:text-primary/80 transition-colors"
        >
          {allSelected ? "Deseleccionar todos" : "Seleccionar todos"}
        </button>
        <span className="text-xs text-muted-foreground">
          {selectedTopics.length} de {topics.length} seleccionados
        </span>
      </div>

      {/* Topic List */}
      <div className="space-y-1">
        {topics.map((topic) => {
          const isSelected = selectedTopics.includes(topic.id)
          return (
            <label
              key={topic.id}
              className={cn(
                "flex items-center gap-3 p-3 cursor-pointer transition-all duration-200 border border-transparent",
                isSelected
                  ? "bg-primary/5 border-primary/20"
                  : "hover:bg-secondary/30"
              )}
            >
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => onToggle(topic.id)}
                className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span className="text-sm text-muted-foreground w-6">
                {topic.id}.
              </span>
              <span
                className={cn(
                  "flex-1 text-sm",
                  isSelected ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {topic.title}
              </span>
              <span className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1">
                {topic.activities} actividades
              </span>
            </label>
          )
        })}
      </div>
    </div>
  )
}
