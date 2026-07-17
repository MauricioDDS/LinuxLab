import type {
  CourseProgressSummary,
  StudentCourseDetail,
} from "@/lib/domain/submission"
import { notImplemented } from "./stub"

const EMPTY_SUMMARY: CourseProgressSummary = {
  enrolledCount: 0,
  averageProgress: 0,
  completedToday: 0,
  activeNow: 0,
  rows: [],
}

export async function getCourseProgress(_courseId: string): Promise<CourseProgressSummary> {
  return EMPTY_SUMMARY
}

export async function getStudentCourseDetail(
  _courseId: string,
  _studentId: string,
): Promise<StudentCourseDetail | null> {
  return null
}

export async function gradeSubmission(
  _submissionId: string,
  _score: number,
  _feedback?: string,
): Promise<void> {
  return notImplemented("submissions.gradeSubmission")
}
