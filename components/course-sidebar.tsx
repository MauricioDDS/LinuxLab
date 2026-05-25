"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Check, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

interface SubTopic {
  id: string
  title: string
  completed: boolean
}

interface Topic {
  id: string
  number: number
  title: string
  status: "completed" | "in-progress" | "not-started"
  progress: number
  subTopics: SubTopic[]
}

const topics: Topic[] = [
  {
    id: "1",
    number: 1,
    title: "Introducción a Linux",
    status: "completed",
    progress: 100,
    subTopics: [
      { id: "1.1", title: "Historia de Linux", completed: true },
      { id: "1.2", title: "Distribuciones", completed: true },
      { id: "1.3", title: "Instalación", completed: true },
    ],
  },
  {
    id: "2",
    number: 2,
    title: "Directorios",
    status: "completed",
    progress: 100,
    subTopics: [
      { id: "2.1", title: "Estructura del sistema de archivos", completed: true },
      { id: "2.2", title: "Navegación básica", completed: true },
      { id: "2.3", title: "Comandos cd, ls, pwd", completed: true },
    ],
  },
  {
    id: "3",
    number: 3,
    title: "Sistema de Archivos",
    status: "completed",
    progress: 100,
    subTopics: [
      { id: "3.1", title: "Tipos de archivos", completed: true },
      { id: "3.2", title: "Comandos de manipulación", completed: true },
      { id: "3.3", title: "Enlaces simbólicos", completed: true },
    ],
  },
  {
    id: "4",
    number: 4,
    title: "Permisos",
    status: "in-progress",
    progress: 60,
    subTopics: [
      { id: "4.1", title: "Conceptos básicos", completed: true },
      { id: "4.2", title: "chmod y chown", completed: true },
      { id: "4.3", title: "Umask", completed: false },
      { id: "4.4", title: "Permisos especiales", completed: false },
    ],
  },
  {
    id: "5",
    number: 5,
    title: "Shell Scripting",
    status: "not-started",
    progress: 0,
    subTopics: [
      { id: "5.1", title: "Introducción a Bash", completed: false },
      { id: "5.2", title: "Variables y operadores", completed: false },
      { id: "5.3", title: "Estructuras de control", completed: false },
      { id: "5.4", title: "Funciones", completed: false },
    ],
  },
]

export function CourseSidebar() {
  const [expandedTopics, setExpandedTopics] = useState<string[]>(["4"])
  const [selectedTopic, setSelectedTopic] = useState("4")

  const toggleExpand = (topicId: string) => {
    setExpandedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    )
  }

  const getStatusIcon = (status: Topic["status"]) => {
    switch (status) {
      case "completed":
        return (
          <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
            <Check className="w-3 h-3 text-success" />
          </div>
        )
      case "in-progress":
        return (
          <div className="w-5 h-5 rounded-full bg-warning/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-warning" />
          </div>
        )
      default:
        return (
          <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center">
            <Circle className="w-3 h-3 text-muted-foreground" />
          </div>
        )
    }
  }

  return (
    <aside className="w-72 border-r border-border bg-sidebar h-full flex flex-col">
      {/* Course Header */}
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-foreground text-sm">
          Administración de Sistemas Linux
        </h2>
        <p className="text-xs text-muted-foreground mt-1">UFPS - 2024-1</p>
      </div>

      {/* Topics Navigation */}
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {topics.map((topic) => (
            <li key={topic.id}>
              <button
                onClick={() => {
                  setSelectedTopic(topic.id)
                  toggleExpand(topic.id)
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 text-left transition-all duration-200",
                  selectedTopic === topic.id
                    ? "bg-primary/10 border-l-2 border-primary neon-border"
                    : "hover:bg-secondary/50 border-l-2 border-transparent"
                )}
              >
                {getStatusIcon(topic.status)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {topic.number}.
                    </span>
                    <span
                      className={cn(
                        "text-sm truncate",
                        selectedTopic === topic.id
                          ? "text-foreground font-medium"
                          : "text-muted-foreground"
                      )}
                    >
                      {topic.title}
                    </span>
                  </div>
                  {topic.status === "in-progress" && (
                    <div className="mt-1 h-1 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-warning transition-all"
                        style={{ width: `${topic.progress}%` }}
                      />
                    </div>
                  )}
                </div>
                {expandedTopics.includes(topic.id) ? (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                )}
              </button>

              {/* Sub-topics */}
              {expandedTopics.includes(topic.id) && (
                <ul className="ml-8 mt-1 space-y-1">
                  {topic.subTopics.map((subTopic) => (
                    <li key={subTopic.id}>
                      <button
                        className={cn(
                          "w-full flex items-center gap-2 px-3 py-1.5 text-left text-xs transition-colors",
                          subTopic.completed
                            ? "text-muted-foreground"
                            : "text-foreground hover:text-primary"
                        )}
                      >
                        {subTopic.completed ? (
                          <Check className="w-3 h-3 text-success" />
                        ) : (
                          <Circle className="w-3 h-3 text-muted-foreground" />
                        )}
                        <span className="truncate">{subTopic.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
