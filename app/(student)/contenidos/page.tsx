import Link from "next/link"
import { temario } from "@/lib/content/temario"
import { topicIcon } from "@/lib/content/topic-icons"

export default function ContenidosPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-1">Contenidos</h1>
        <p className="text-muted-foreground">
          Material de referencia para el curso de Sistemas Operativos.
        </p>
      </div>

      {/* Topic grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {temario.map((topic) => {
          const Icon = topicIcon(topic.number)
          return (
            <Link
              key={topic.slug}
              href={`/curso?tema=${topic.slug}`}
              className="group bg-card border border-border rounded-lg p-6 hover:border-primary/40 transition-colors"
            >
              <div className="w-11 h-11 bg-primary/10 flex items-center justify-center rounded-md mb-4 group-hover:bg-primary/15 transition-colors">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {topic.number}. {topic.title}
                </h2>
                {topic.complementary && (
                  <span className="text-[10px] uppercase tracking-wide font-medium text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
                    Complementario
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {topic.description}
              </p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
