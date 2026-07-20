export type Role = "admin" | "teacher" | "student"

export interface User {
  id: string
  name: string
  email: string
  role: Role
  googleId?: string
  active?: boolean
}

export interface Student {
  id: string
  name: string
  email: string
  code: string
}

export interface Session {
  user: User
}
