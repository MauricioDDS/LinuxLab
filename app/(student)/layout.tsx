import { StudentSidebar } from "@/components/student-sidebar"

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <StudentSidebar />
      <main className="flex-1 overflow-auto bg-background">{children}</main>
    </div>
  )
}
