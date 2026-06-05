"use client"

import { useState } from "react"
import { Search, Download, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface LogEntry {
  id: number
  fecha: string
  hora: string
  usuario: string
  email: string
  rol: "Estudiante" | "Docente"
  cursos: string
  accion: string
}

const logEntries: LogEntry[] = [
  { id: 20, fecha: "24/05/2026", hora: "23:24:43", usuario: "María Valentina Castro", email: "minv2849@gmail.com", rol: "Estudiante", cursos: "Fundamentos de Programación", accion: "Inicio de sesión" },
  { id: 19, fecha: "24/05/2026", hora: "20:24:58", usuario: "Luis Fernando Martínez", email: "lfernando0117@gmail.com", rol: "Estudiante", cursos: "Fundamentos de Programación", accion: "Inicio de sesión" },
  { id: 18, fecha: "24/05/2026", hora: "18:53:28", usuario: "Immer Stiven Carrillo", email: "immer150208@gmail.com", rol: "Estudiante", cursos: "Fundamentos de Programación", accion: "Inicio de sesión" },
  { id: 17, fecha: "24/05/2026", hora: "17:30:12", usuario: "Carlos Mendoza", email: "cmendoza@ufps.edu.co", rol: "Docente", cursos: "Sistemas Operativos - I sem 2026", accion: "Creó actividad" },
  { id: 16, fecha: "24/05/2026", hora: "16:45:00", usuario: "María García López", email: "mgarcia@ufps.edu.co", rol: "Estudiante", cursos: "Sistemas Operativos - I sem 2026", accion: "Validó actividad" },
  { id: 15, fecha: "24/05/2026", hora: "15:10:33", usuario: "Carlos Andrés Ruiz", email: "caruiz@ufps.edu.co", rol: "Estudiante", cursos: "Sistemas Operativos - I sem 2026", accion: "Validó actividad" },
  { id: 14, fecha: "23/05/2026", hora: "22:05:19", usuario: "Ana Sofía Mendoza", email: "asmendoza@ufps.edu.co", rol: "Estudiante", cursos: "Sistemas Operativos - I sem 2026", accion: "Inicio de sesión" },
  { id: 13, fecha: "23/05/2026", hora: "20:00:44", usuario: "Laura Valentina Díaz", email: "lvdiaz@ufps.edu.co", rol: "Estudiante", cursos: "Sistemas Operativos - I sem 2026", accion: "Cierre de sesión" },
  { id: 12, fecha: "23/05/2026", hora: "19:55:01", usuario: "Laura Valentina Díaz", email: "lvdiaz@ufps.edu.co", rol: "Estudiante", cursos: "Sistemas Operativos - I sem 2026", accion: "Validó actividad" },
  { id: 11, fecha: "23/05/2026", hora: "18:30:22", usuario: "Juan Pablo Torres", email: "jptorres@ufps.edu.co", rol: "Estudiante", cursos: "Sistemas Operativos - I sem 2026", accion: "Inicio de sesión" },
  { id: 10, fecha: "23/05/2026", hora: "14:12:05", usuario: "Carlos Mendoza", email: "cmendoza@ufps.edu.co", rol: "Docente", cursos: "Sistemas Operativos - I sem 2026", accion: "Editó curso" },
  { id: 9, fecha: "23/05/2026", hora: "12:00:00", usuario: "Santiago Herrera", email: "sherrera@ufps.edu.co", rol: "Estudiante", cursos: "Sistemas Operativos - I sem 2026", accion: "Inicio de sesión" },
]

const PAGE_SIZE = 8

export default function BitacoraPage() {
  const [search, setSearch] = useState("")
  const [desde, setDesde] = useState("")
  const [hasta, setHasta] = useState("")
  const [page, setPage] = useState(1)

  const filtered = logEntries.filter((e) => {
    const q = search.toLowerCase()
    return (
      e.usuario.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q)
    )
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground mb-1">Bitácora de Accesos</h1>
        <p className="text-muted-foreground text-sm">
          Registro histórico de accesos y acciones relevantes en la plataforma
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-start justify-between mb-3">
            <h2 className="font-medium text-foreground">Bitácora de Accesos</h2>
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
              {logEntries.length} registros
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-4">Tamaño: 41.26 KB</p>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-border rounded-md text-foreground hover:bg-secondary/50 transition-colors">
              <Download className="w-3.5 h-3.5" />
              Descargar
            </button>
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-danger text-white hover:bg-danger/90 transition-colors">
              <Trash2 className="w-3.5 h-3.5" />
              Borrar bitácora
            </button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-start justify-between mb-3">
            <h2 className="font-medium text-foreground">Bitácora de Notificaciones</h2>
            <span className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded-full font-medium">
              11 registros
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-4">Tamaño: 1.76 KB</p>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-border rounded-md text-foreground hover:bg-secondary/50 transition-colors">
              <Download className="w-3.5 h-3.5" />
              Descargar
            </button>
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-danger text-white hover:bg-danger/90 transition-colors">
              <Trash2 className="w-3.5 h-3.5" />
              Borrar bitácora
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o email..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Desde:</span>
          <input
            type="date"
            value={desde}
            onChange={(e) => setDesde(e.target.value)}
            className="h-9 rounded-md border border-border bg-card px-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary [color-scheme:light] dark:[color-scheme:dark]"
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Hasta:</span>
          <input
            type="date"
            value={hasta}
            onChange={(e) => setHasta(e.target.value)}
            className="h-9 rounded-md border border-border bg-card px-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary [color-scheme:light] dark:[color-scheme:dark]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide w-12">N°</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide w-40">Entrada</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Usuario</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide w-28">Rol</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Cursos</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide w-36">Acción</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-b border-border/50 last:border-0 hover:bg-secondary/20 transition-colors"
                >
                  <td className="px-4 py-3 text-sm font-mono text-muted-foreground">{entry.id}</td>
                  <td className="px-4 py-3">
                    <span className="block text-sm text-foreground">{entry.fecha}</span>
                    <span className="block text-xs font-mono text-muted-foreground">Hora: {entry.hora}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="block text-sm font-medium text-foreground">{entry.usuario}</span>
                    <span className="block text-xs text-muted-foreground">{entry.email}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
                        entry.rol === "Estudiante"
                          ? "bg-success/15 text-success"
                          : "bg-primary/15 text-primary"
                      )}
                    >
                      {entry.rol}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground max-w-[180px] truncate">
                    {entry.cursos}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">{entry.accion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginated.length === 0 && (
          <div className="py-10 text-center text-sm text-muted-foreground">
            No se encontraron registros.
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Página {page} de {totalPages}</span>
        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1.5 rounded-md border border-border text-foreground hover:bg-secondary/50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1.5 rounded-md border border-border text-foreground hover:bg-secondary/50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  )
}
