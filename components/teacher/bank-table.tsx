"use client"

import { useState } from "react"
import { Search, Edit, Trash2, Eye, FileCode } from "lucide-react"
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
import type { Activity } from "@/lib/domain/activity"
import { syllabus, getTopic } from "@/lib/content/temario"

const difficultyClass: Record<string, string> = {
  basic: "text-success",
  intermediate: "text-warning",
  advanced: "text-primary",
}

export function BankTable({ activities }: { activities: Activity[] }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTopic, setSelectedTopic] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")

  const filtered = activities.filter((activity) => {
    const matchesSearch = activity.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesTopic =
      selectedTopic === "all" || activity.topicNumber === Number(selectedTopic)
    const matchesDifficulty =
      selectedDifficulty === "all" || activity.difficulty === selectedDifficulty
    return matchesSearch && matchesTopic && matchesDifficulty
  })

  return (
    <>
      {/* Filters */}
      <div className="bg-card border border-border p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary/30 border-border focus:border-primary"
            />
          </div>

          <Select value={selectedTopic} onValueChange={setSelectedTopic}>
            <SelectTrigger className="w-56 bg-secondary/30 border-border">
              <SelectValue placeholder="Topic" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">All topics</SelectItem>
              {syllabus.map((topic) => (
                <SelectItem key={topic.number} value={String(topic.number)}>
                  {topic.number}. {topic.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
            <SelectTrigger className="w-36 bg-secondary/30 border-border">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="basic">Basic</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Activity</TableHead>
              <TableHead className="text-muted-foreground">Topic</TableHead>
              <TableHead className="text-muted-foreground">Difficulty</TableHead>
              <TableHead className="text-muted-foreground">Type</TableHead>
              <TableHead className="text-muted-foreground text-right">Uses</TableHead>
              <TableHead className="text-muted-foreground w-32"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((activity) => (
              <TableRow key={activity.id} className="border-border hover:bg-secondary/30">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <FileCode className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span className="text-foreground font-medium">{activity.title}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {getTopic(activity.topicNumber)?.title ?? "—"}
                </TableCell>
                <TableCell>
                  {activity.difficulty ? (
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs ${
                        difficultyClass[activity.difficulty] ?? "text-muted-foreground"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {activity.difficulty}
                    </span>
                  ) : (
                    <span className="text-muted-foreground text-xs">—</span>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {activity.evaluationType === "manual" ? "Manual review" : "Self-assessment"}
                </TableCell>
                <TableCell className="text-muted-foreground text-right">
                  {activity.uses ?? 0}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <button className="w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filtered.length === 0 && (
          <div className="px-4 py-12 text-center text-sm text-muted-foreground">
            No activities in the bank.
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="mt-4 text-sm text-muted-foreground">
        Showing {filtered.length} of {activities.length} activities
      </div>
    </>
  )
}
