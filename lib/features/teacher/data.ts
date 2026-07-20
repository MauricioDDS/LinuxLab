import { notImplemented } from "@/lib/features/shared/stub"
import type { Student } from "@/lib/features/auth/types"
import type {
  Course,
  CreateCourseInput,
  Activity,
  CreateActivityInput,
  AuditEntry,
  CourseProgressSummary,
  StudentCourseDetail,
  Enrollment,
} from "./types"

export async function listCourses(): Promise<Course[]> {
  return []
}

export async function getCourse(_id: string): Promise<Course | null> {
  return null
}

export async function createCourse(_input: CreateCourseInput): Promise<Course> {
  return notImplemented("courses.createCourse")
}

export async function setCourseArchived(_id: string, _archived: boolean): Promise<void> {
  return notImplemented("courses.setCourseArchived")
}

export async function deleteCourse(_id: string): Promise<void> {
  return notImplemented("courses.deleteCourse")
}

export async function listBankActivities(): Promise<Activity[]> {
  return []
}

export async function listCourseActivities(_courseId: string): Promise<Activity[]> {
  return []
}

export async function getActivity(_id: string): Promise<Activity | null> {
  return null
}

export async function createActivity(_input: CreateActivityInput): Promise<Activity> {
  return notImplemented("activities.createActivity")
}

export async function submitActivity(_activityId: string): Promise<void> {
  return notImplemented("activities.submitActivity")
}

export async function validateActivity(_activityId: string): Promise<never> {
  return notImplemented("activities.validateActivity")
}

export async function listEnrollments(_courseId: string): Promise<Enrollment[]> {
  return []
}

export async function addStudent(
  _courseId: string,
  _input: Omit<Student, "id">,
): Promise<Student> {
  return notImplemented("students.addStudent")
}

export async function importStudentsCsv(_courseId: string, _file: File): Promise<Student[]> {
  return notImplemented("students.importStudentsCsv")
}

export async function removeStudent(_courseId: string, _studentId: string): Promise<void> {
  return notImplemented("students.removeStudent")
}

export async function listAuditLog(): Promise<AuditEntry[]> {
  return []
}

export async function clearAuditLog(): Promise<void> {
  return notImplemented("audit.clearAuditLog")
}

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
