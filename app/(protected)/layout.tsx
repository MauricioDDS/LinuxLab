import { redirect } from "next/navigation"
import { getServerSession } from "@/lib/features/auth/session"
import { RoleSidebar } from "@/components/shared/role-sidebar"
import { StudentShell } from "@/components/student/student-shell"

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  if (!session) redirect("/")

  // Students get the new top-header shell; teacher/admin keep the sidebar until
  // those views are redesigned too.
  if (session.user.role === "student") {
    return <StudentShell>{children}</StudentShell>
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <RoleSidebar role={session.user.role} />
      <main className="flex-1 overflow-auto bg-background">{children}</main>
    </div>
  )
}
