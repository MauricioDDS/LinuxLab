/** Where an activity comes from: the shared bank, or a teacher's own creation. */
export type ActivitySource = "bank" | "teacher"

export type Difficulty = "basic" | "intermediate" | "advanced"

/** How a teacher activity is graded. */
export type EvaluationType = "atomic" | "manual"

/** One atomic assertion configured by the teacher (RF-17). */
export interface ActivityCheck {
  id: string
  type: string
  params: Record<string, string>
  points: number
}

export interface Activity {
  id: string
  title: string
  /** Temario topic this activity belongs to. */
  topicNumber: number
  source: ActivitySource
  difficulty?: Difficulty
  /** Rich-text / markdown instructions. Empty until authored. */
  instructions: string
  maxScore: number
  /** ISO date string. */
  dueDate?: string
  required: boolean
  evaluationType: EvaluationType
  checks: ActivityCheck[]
  /** How many courses use this bank activity. */
  uses?: number
}

export type CreateActivityInput = Omit<Activity, "id" | "uses">
