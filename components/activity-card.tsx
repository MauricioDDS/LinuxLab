"use client"

import Link from "next/link"
import { Check, Clock, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ActivityCardProps {
  title: string
  source: "banco" | "profesor"
  status: "completed" | "pending"
  score?: number
  maxScore?: number
  href?: string
}

export function ActivityCard({
  title,
  source,
  status,
  score,
  maxScore,
  href = "/actividad",
}: ActivityCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-4 bg-card border border-border p-4 transition-all duration-300 hover:border-primary/30 group cursor-pointer",
        status === "completed" && "border-l-2 border-l-success"
      )}
    >
      {/* Status Icon */}
      <div
        className={cn(
          "w-10 h-10 flex items-center justify-center shrink-0",
          status === "completed"
            ? "bg-success/20"
            : "bg-secondary"
        )}
      >
        {status === "completed" ? (
          <Check className="w-5 h-5 text-success" />
        ) : (
          <Clock className="w-5 h-5 text-muted-foreground" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-foreground font-medium truncate group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          {/* Source Badge */}
          <span
            className={cn(
              "text-xs px-2 py-0.5 font-medium",
              source === "banco"
                ? "bg-primary/20 text-primary"
                : "bg-secondary text-muted-foreground"
            )}
          >
            {source === "banco" ? "Banco" : "Profesor"}
          </span>
          {/* Status */}
          <span
            className={cn(
              "text-xs",
              status === "completed"
                ? "text-success"
                : "text-muted-foreground"
            )}
          >
            {status === "completed" ? "Completada" : "Pendiente"}
          </span>
        </div>
      </div>

      {/* Score or Arrow */}
      {status === "completed" && score !== undefined && maxScore !== undefined ? (
        <div className="text-right shrink-0">
          <span className="text-lg font-semibold text-foreground">{score}</span>
          <span className="text-muted-foreground text-sm">/{maxScore}</span>
        </div>
      ) : (
        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
      )}
    </Link>
  )
}
