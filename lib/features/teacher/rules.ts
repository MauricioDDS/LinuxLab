import type { RouteRule } from "@/lib/features/shared/types"

export const teacherRules: RouteRule[] = [
  { path: "/courses", roles: ["teacher", "admin"] },
  { path: "/bank", roles: ["teacher", "admin"], exact: true },
  { path: "/create-course", roles: ["teacher", "admin"], exact: true },
  { path: "/audit-log", roles: ["teacher", "admin"], exact: true },
]
