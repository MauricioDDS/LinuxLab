"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { temario } from "@/lib/content/temario"

interface TopicSelectorProps {
  /** Selected temario topic numbers. */
  selectedTopics: number[]
  onToggle: (topicNumber: number) => void
  onSelectAll: () => void
}

export function TopicSelector({
  selectedTopics,
  onToggle,
  onSelectAll,
}: TopicSelectorProps) {
  const allSelected = selectedTopics.length === temario.length

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
          {selectedTopics.length} de {temario.length} seleccionados
        </span>
      </div>

      {/* Topic List */}
      <div className="space-y-1">
        {temario.map((topic) => {
          const isSelected = selectedTopics.includes(topic.number)
          return (
            <label
              key={topic.number}
              className={cn(
                "flex items-center gap-3 p-3 cursor-pointer transition-all duration-200 border border-transparent",
                isSelected
                  ? "bg-primary/5 border-primary/20"
                  : "hover:bg-secondary/30"
              )}
            >
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => onToggle(topic.number)}
                className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span className="text-sm text-muted-foreground w-6">
                {topic.number}.
              </span>
              <span
                className={cn(
                  "flex-1 text-sm",
                  isSelected ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {topic.title}
              </span>
              {topic.complementary && (
                <span className="text-[10px] uppercase tracking-wide font-medium text-muted-foreground bg-secondary/60 px-1.5 py-0.5 rounded">
                  Complementario
                </span>
              )}
            </label>
          )
        })}
      </div>
    </div>
  )
}
