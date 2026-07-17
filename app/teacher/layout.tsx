import { redirect } from "next/navigation"
import { getServerSession } from "@/lib/auth/session"
import { TeacherSidebar } from "@/components/teacher-sidebar"

export default async function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  if (!session || !["teacher", "admin"].includes(session.user.role)) {
    redirect("/")
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <TeacherSidebar />
      <main className="flex-1 overflow-auto bg-background">
        {children}
      </main>
    </div>
  )
}
