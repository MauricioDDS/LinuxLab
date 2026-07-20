"use client"

import type { Role } from "@/lib/features/auth/types"
import { Sidebar as StudentSidebar } from "@/components/student/sidebar"
import { Sidebar as TeacherSidebar } from "@/components/teacher/sidebar"
import { Sidebar as AdminSidebar } from "@/components/admin/sidebar"

export function RoleSidebar({ role }: { role: Role }) {
  switch (role) {
    case "student":
      return <StudentSidebar />
    case "teacher":
      return <TeacherSidebar />
    case "admin":
      return <AdminSidebar />
  }
}
