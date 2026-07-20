import { redirect } from "next/navigation"
import { getServerSession } from "@/lib/features/auth/session"
import { RoleSidebar } from "@/components/shared/role-sidebar"

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  if (!session) redirect("/")

  return (
    <div className="flex h-screen overflow-hidden">
      <RoleSidebar role={session.user.role} />
      <main className="flex-1 overflow-auto bg-background">{children}</main>
    </div>
  )
}
