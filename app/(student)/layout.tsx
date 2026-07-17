import { redirect } from "next/navigation"
import { getServerSession } from "@/lib/auth/session"
import { StudentSidebar } from "@/components/student-sidebar"

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  if (!session || session.user.role !== "estudiante") {
    redirect("/")
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <StudentSidebar />
      <main className="flex-1 overflow-auto bg-background">{children}</main>
    </div>
  )
}
