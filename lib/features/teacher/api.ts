import { apiFetch } from "@/lib/api/client"
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
import type { Student } from "@/lib/features/auth/types"

export const teacherApi = {
  listCourses: () => apiFetch<Course[]>("/api/courses"),
  getCourse: (id: string) => apiFetch<Course>(`/api/courses/${id}`),
  createCourse: (input: CreateCourseInput) =>
    apiFetch<Course>("/api/courses", { method: "POST", body: JSON.stringify(input) }),
  setCourseArchived: (id: string, archived: boolean) =>
    apiFetch<void>(`/api/courses/${id}`, { method: "PATCH", body: JSON.stringify({ archived }) }),
  deleteCourse: (id: string) =>
    apiFetch<void>(`/api/courses/${id}`, { method: "DELETE" }),

  listBankActivities: () => apiFetch<Activity[]>("/api/activities/bank"),
  listCourseActivities: (courseId: string) =>
    apiFetch<Activity[]>(`/api/courses/${courseId}/activities`),
  getActivity: (id: string) => apiFetch<Activity>(`/api/activities/${id}`),
  createActivity: (input: CreateActivityInput) =>
    apiFetch<Activity>("/api/activities", { method: "POST", body: JSON.stringify(input) }),
  submitActivity: (activityId: string) =>
    apiFetch<void>(`/api/activities/${activityId}/submit`, { method: "POST" }),
  validateActivity: (activityId: string) =>
    apiFetch<void>(`/api/activities/${activityId}/validate`, { method: "POST" }),

  listEnrollments: (courseId: string) =>
    apiFetch<Enrollment[]>(`/api/courses/${courseId}/enrollments`),
  addStudent: (courseId: string, input: Omit<Student, "id">) =>
    apiFetch<Student>(`/api/courses/${courseId}/students`, {
      method: "POST",
      body: JSON.stringify(input),
    }),
  importStudentsCsv: (courseId: string, _file: File) =>
    apiFetch<Student[]>(`/api/courses/${courseId}/students/import`, { method: "POST" }),
  removeStudent: (courseId: string, studentId: string) =>
    apiFetch<void>(`/api/courses/${courseId}/students/${studentId}`, { method: "DELETE" }),

  listAuditLog: () => apiFetch<AuditEntry[]>("/api/audit-log"),
  clearAuditLog: () => apiFetch<void>("/api/audit-log", { method: "DELETE" }),

  getCourseProgress: (courseId: string) =>
    apiFetch<CourseProgressSummary>(`/api/courses/${courseId}/progress`),
  getStudentCourseDetail: (courseId: string, studentId: string) =>
    apiFetch<StudentCourseDetail>(`/api/courses/${courseId}/students/${studentId}`),
  gradeSubmission: (submissionId: string, score: number, feedback?: string) =>
    apiFetch<void>(`/api/submissions/${submissionId}`, {
      method: "PATCH",
      body: JSON.stringify({ score, feedback }),
    }),
}
