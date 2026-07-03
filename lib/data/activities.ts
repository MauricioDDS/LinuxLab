import type { Activity, CreateActivityInput } from "@/lib/domain/activity"
import { notImplemented } from "./client"

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

/** Student submits their work on a teacher activity for review. */
export async function submitActivity(_activityId: string): Promise<void> {
  return notImplemented("activities.submitActivity")
}

/** Run the activity's atomic checks against the student's environment. */
export async function validateActivity(_activityId: string): Promise<never> {
  return notImplemented("activities.validateActivity")
}
