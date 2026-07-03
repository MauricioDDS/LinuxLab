import type { Student } from "./user"

export interface Course {
  id: string
  name: string
  description: string
  /** ISO date string. */
  createdAt: string
  archived: boolean
  /** Temario topic numbers enabled for this course. */
  enabledTopics: number[]
  studentCount: number
  activityCount: number
}

export interface Enrollment {
  id: string
  courseId: string
  student: Student
  /** ISO date string. */
  enrolledAt: string
}

export type CreateCourseInput = {
  name: string
  description: string
  enabledTopics: number[]
}
