import { Image as ImageIcon, Film } from "lucide-react"
import { Markdown } from "@/components/markdown"
import type { LessonBlock } from "@/lib/content/lesson-blocks"

const IMG_CLASS = "mx-auto my-8 max-h-80 w-auto max-w-full rounded-lg"

/** Renders a lesson: markdown chunks interleaved with its image/video directives. */
export function LessonBody({ blocks }: { blocks: LessonBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.kind) {
          case "markdown":
            return <Markdown key={i}>{block.content}</Markdown>

          case "image":
            return block.exists ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={block.src} alt={block.alt} className={IMG_CLASS} />
            ) : (
              <Pending
                key={i}
                icon={ImageIcon}
                title="Imagen pendiente"
                detail={block.alt}
                paths={[block.expectedPath]}
              />
            )

          case "image-theme":
            return block.exists ? (
              <span key={i} className="block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={block.lightSrc}
                  alt={block.alt}
                  className={`${IMG_CLASS} block dark:hidden`}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={block.darkSrc}
                  alt={block.alt}
                  className={`${IMG_CLASS} hidden dark:block`}
                />
              </span>
            ) : (
              <Pending
                key={i}
                icon={ImageIcon}
                title="Imagen pendiente (tema claro / oscuro)"
                detail={block.alt}
                paths={block.expectedPaths}
              />
            )

          case "video":
            return block.exists ? (
              <video
                key={i}
                src={block.src}
                controls
                preload="metadata"
                className="w-full my-8 rounded-lg border border-border bg-black"
              />
            ) : (
              <Pending
                key={i}
                icon={Film}
                title="Video pendiente"
                detail={block.title}
                paths={[block.expectedPath]}
              />
            )
        }
      })}
    </>
  )
}

function Pending({
  icon: Icon,
  title,
  detail,
  paths,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  detail: string
  paths: string[]
}) {
  return (
    <div className="my-8 border border-dashed border-border rounded-lg py-10 px-6 text-center">
      <Icon className="w-6 h-6 mx-auto text-muted-foreground mb-3" />
      <p className="text-sm font-medium text-foreground">{title}</p>
      {detail && <p className="text-xs text-muted-foreground mt-1">{detail}</p>}
      <div className="mt-3 space-y-0.5">
        {paths.map((p) => (
          <p key={p} className="text-[11px] font-mono text-muted-foreground">
            {p}
          </p>
        ))}
      </div>
    </div>
  )
}
