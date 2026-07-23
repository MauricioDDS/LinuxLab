import { SiteHeader } from "@/components/student/site-header"

/**
 * Shell for the student experience: a black top header instead of the left
 * sidebar. Fills the viewport (header fixed on top, content scrolls below) so
 * full-height pages like the terminal keep working.
 */
export function StudentShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <SiteHeader />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
