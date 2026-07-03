import type { ActivitySource } from "./activity"
import type { Student } from "./user"

export type ProgressStatus = "completed" | "in-progress" | "not-started" | "overdue"

/** One row of the teacher tracking table (panel de seguimiento). */
export interface StudentProgress {
  student: Student
  /** Status per temario topic number. */
  topicStatus: Record<number, ProgressStatus>
  /** Overall completion 0–100. */
  progress: number
  /** Human-readable relative time, e.g. "Hace 2 horas". */
  lastActivity: string
}

/** Aggregate numbers shown in the tracking dashboard metric cards. */
export interface CourseProgressSummary {
  enrolledCount: number
  averageProgress: number
  completedToday: number
  activeNow: number
  rows: StudentProgress[]
}

export interface TopicProgress {
  topicNumber: number
  title: string
  completed: number
  total: number
  avgScore: number
}

export type GradeStatus = "completed" | "pending" | "not-started"

export interface Grade {
  id: string
  activityName: string
  topicTitle: string
  source: ActivitySource
  score: number | null
  maxScore: number
  status: GradeStatus
  /** ISO date string. */
  date?: string
  /** "auto" (atomic checks) or "manual" (teacher review). */
  evaluation?: "auto" | "manual"
}

/** Full per-student dashboard for one course. */
export interface StudentCourseDetail {
  student: Student
  courseName: string
  /** ISO date string. */
  enrolledAt: string
  lastActive: string
  overallProgress: number
  topicProgress: TopicProgress[]
  recentGrades: Grade[]
  grades: Grade[]
}
