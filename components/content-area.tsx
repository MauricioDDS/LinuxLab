"use client"

import { useState } from "react"
import { ExternalLink, Play, ChevronRight, FileText, Video, Link2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { ActivityCard } from "./activity-card"

const tabs = ["Contenido", "Actividades", "Recursos"] as const
type Tab = (typeof tabs)[number]

export function ContentArea() {
  const [activeTab, setActiveTab] = useState<Tab>("Contenido")

  return (
    <main className="flex-1 overflow-y-auto bg-background">
      {/* Breadcrumb */}
      <div className="px-6 py-3 border-b border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Curso</span>
          <ChevronRight className="w-4 h-4" />
          <span>Permisos</span>
        </div>
      </div>

      {/* Topic Header */}
      <div className="px-6 py-4 border-b border-border">
        <h1 className="text-2xl font-semibold text-foreground">4. Permisos</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Aprende a gestionar permisos de archivos y directorios en Linux
        </p>
      </div>

      {/* Tabs */}
      <div className="px-6 border-b border-border">
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "py-3 text-sm font-medium transition-all duration-200 border-b-2 -mb-px",
                activeTab === tab
                  ? "text-primary border-primary"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "Contenido" && <ContentTab />}
        {activeTab === "Actividades" && <ActivitiesTab />}
        {activeTab === "Recursos" && <ResourcesTab />}
      </div>
    </main>
  )
}

function ContentTab() {
  return (
    <div className="space-y-10 max-w-3xl">
      {/* Text Content */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Gestión de Permisos en Linux
        </h2>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            En Linux, cada archivo y directorio tiene asociado un conjunto de permisos que determinan
            quién puede leer, escribir o ejecutar ese recurso. Los permisos se dividen en tres
            categorías: propietario (user), grupo (group) y otros (others).
          </p>
          <p className="text-muted-foreground leading-relaxed mt-3">
            El comando <code className="bg-secondary px-1.5 py-0.5 text-primary font-mono text-xs">chmod</code> permite
            modificar estos permisos utilizando notación octal o simbólica. Por ejemplo:
          </p>
        </div>
      </section>

      {/* Code Block (intentionally dark in both themes) */}
      <section className="bg-[#0d1117] border border-border p-4 rounded-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-zinc-400 font-mono">bash</span>
          <button className="text-xs text-zinc-400 hover:text-primary transition-colors">
            Copiar
          </button>
        </div>
        <pre className="font-mono text-sm overflow-x-auto">
          <code>
            <span className="text-zinc-500"># Dar permisos de ejecución al propietario</span>
            {"\n"}
            <span className="text-[#79c0ff]">chmod</span> <span className="text-[#a5d6ff]">755</span> <span className="text-zinc-100">script.sh</span>
            {"\n\n"}
            <span className="text-zinc-500"># Resultado: rwxr-xr-x</span>
            {"\n"}
            <span className="text-zinc-500"># - Propietario: lectura, escritura, ejecución (7)</span>
            {"\n"}
            <span className="text-zinc-500"># - Grupo: lectura, ejecución (5)</span>
            {"\n"}
            <span className="text-zinc-500"># - Otros: lectura, ejecución (5)</span>
          </code>
        </pre>
      </section>

      {/* Video Player */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Video Explicativo
        </h2>
        <div className="aspect-video bg-card border border-border flex items-center justify-center group cursor-pointer hover:border-primary/50 transition-colors">
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center transition-colors">
              <Play className="w-8 h-8 text-primary ml-1" />
            </div>
            <span className="text-sm text-muted-foreground">Permisos en Linux - Parte 1</span>
            <span className="text-xs text-muted-foreground">12:45</span>
          </div>
        </div>
      </section>

      {/* External Link Card */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Recursos Interactivos
        </h2>
        <a
          href="#"
          className="block bg-card border border-border p-4 hover:border-primary/50 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-foreground font-medium group-hover:text-primary transition-colors">
                Simulador de Umask - Operaciones Binarias
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Practica el cálculo de umask con este simulador interactivo
              </p>
            </div>
            <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </a>
      </section>
    </div>
  )
}

function ActivitiesTab() {
  return (
    <div className="space-y-4 max-w-4xl">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Todas las Actividades
      </h2>
      <div className="grid gap-4">
        <ActivityCard
          title="Práctica: Cambiar permisos de archivos"
          source="banco"
          status="completed"
          score={90}
          maxScore={100}
        />
        <ActivityCard
          title="Tarea: Configurar permisos de directorio"
          source="profesor"
          status="pending"
        />
        <ActivityCard
          title="Quiz: Conceptos de permisos"
          source="banco"
          status="pending"
        />
        <ActivityCard
          title="Laboratorio: Permisos especiales"
          source="profesor"
          status="pending"
        />
      </div>
    </div>
  )
}

function ResourcesTab() {
  return (
    <div className="space-y-4 max-w-4xl">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Recursos Adicionales
      </h2>
      <div className="grid gap-4">
        <a
          href="#"
          className="flex items-center gap-4 bg-card border border-border p-4 hover:border-primary/50 transition-all duration-300 group"
        >
          <div className="w-10 h-10 bg-primary/20 flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-foreground font-medium group-hover:text-primary transition-colors">
              Manual de Permisos Linux (PDF)
            </h3>
            <p className="text-xs text-muted-foreground mt-1">2.4 MB</p>
          </div>
          <ExternalLink className="w-4 h-4 text-muted-foreground" />
        </a>
        <a
          href="#"
          className="flex items-center gap-4 bg-card border border-border p-4 hover:border-primary/50 transition-all duration-300 group"
        >
          <div className="w-10 h-10 bg-primary/20 flex items-center justify-center">
            <Link2 className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-foreground font-medium group-hover:text-primary transition-colors">
              Documentación oficial de chmod
            </h3>
            <p className="text-xs text-muted-foreground mt-1">man7.org</p>
          </div>
          <ExternalLink className="w-4 h-4 text-muted-foreground" />
        </a>
        <a
          href="#"
          className="flex items-center gap-4 bg-card border border-border p-4 hover:border-primary/50 transition-all duration-300 group"
        >
          <div className="w-10 h-10 bg-primary/20 flex items-center justify-center">
            <Video className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-foreground font-medium group-hover:text-primary transition-colors">
              Video: Permisos Avanzados
            </h3>
            <p className="text-xs text-muted-foreground mt-1">18:32</p>
          </div>
          <ExternalLink className="w-4 h-4 text-muted-foreground" />
        </a>
      </div>
    </div>
  )
}
