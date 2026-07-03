import type { Course, CreateCourseInput } from "@/lib/domain/course"
import { notImplemented } from "./client"

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
