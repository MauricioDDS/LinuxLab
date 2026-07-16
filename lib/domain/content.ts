/**
 * Lesson content types. Lesson material is FIXED content authored by the thesis
 * team and stored as markdown files described by a `meta.json` per topic under
 * `content/temario/tema-NN/`. These types mirror that manifest. The catalogue of
 * topics still lives in `lib/content/temario.ts`; this layer enriches a topic
 * with its actual material when it exists.
 */

export interface LessonResource {
  type: "pdf" | "link" | "video" | string
  title: string
  url: string
  detail?: string
}

export interface LessonSubtopic {
  id: string
  title: string
  /** Markdown filename relative to the topic directory. */
  file: string
  /** "simulator" renders a full-width iframe instead of markdown. Default: "markdown". */
  type?: "markdown" | "simulator"
}

export interface TopicContentMeta {
  /** e.g. "tema-01". */
  id: string
  number: number
  title: string
  description: string
  subtopics: LessonSubtopic[]
  resources: LessonResource[]
}
