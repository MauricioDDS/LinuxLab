import type { Enrollment } from "@/lib/domain/course"
import type { Student } from "@/lib/domain/user"
import { notImplemented } from "./stub"

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
