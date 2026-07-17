import { redirect } from "next/navigation"
import { getServerSession } from "@/lib/auth/session"
import { Sidebar } from "@/components/student/sidebar"

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  if (!session || !["student", "admin"].includes(session.user.role)) {
    redirect("/")
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-background">{children}</main>
    </div>
  )
}
