import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import type { TopicContentMeta } from "@/lib/domain/content"
import { temario } from "./temario"

/**
 * Content seam (server-only — reads from disk).
 *
 * Lesson material lives under `content/temario/tema-NN/`: a `meta.json` manifest
 * plus one markdown file per subtopic. Their images live under
 * `public/temario/tema-NN/` so Next can serve them statically.
 *
 * Most topics have no content yet, in which case these return null and the UI
 * shows an empty state. Drop a `tema-NN` directory in to publish a topic — no
 * code changes needed.
 */

const CONTENT_ROOT = join(process.cwd(), "content", "temario")
const ASSET_ROOT = join(process.cwd(), "public", "temario")

function topicDir(topicNumber: number): string {
  return `tema-${String(topicNumber).padStart(2, "0")}`
}

export function getTopicContentMeta(topicNumber: number): TopicContentMeta | null {
  try {
    const raw = readFileSync(join(CONTENT_ROOT, topicDir(topicNumber), "meta.json"), "utf8")
    return JSON.parse(raw) as TopicContentMeta
  } catch {
    return null
  }
}

export function getSubtopicMarkdown(topicNumber: number, file: string): string | null {
  try {
    return readFileSync(join(CONTENT_ROOT, topicDir(topicNumber), file), "utf8")
  } catch {
    return null
  }
}

export function hasTopicContent(topicNumber: number): boolean {
  return getTopicContentMeta(topicNumber) !== null
}

/** Public URL of a lesson image, e.g. "/temario/tema-01/tux-evolution.png". */
export function lessonAssetUrl(topicNumber: number, file: string): string {
  return `/temario/${topicDir(topicNumber)}/${file}`
}

/** Whether the image file has actually been added to public/temario/tema-NN/. */
export function lessonAssetExists(topicNumber: number, file: string): boolean {
  return existsSync(join(ASSET_ROOT, topicDir(topicNumber), file))
}

/** One lesson (topic + subtopic) in reading order. */
export interface LessonRef {
  topicNumber: number
  topicSlug: string
  topicTitle: string
  subtopicId: string
  subtopicTitle: string
  href: string
}

/**
 * Every published lesson, flattened in temario order. Topics without content are
 * skipped, so "next" always lands on real material instead of an empty state.
 */
export function getLessonSequence(): LessonRef[] {
  const refs: LessonRef[] = []
  for (const topic of temario) {
    const meta = getTopicContentMeta(topic.number)
    if (!meta) continue
    for (const sub of meta.subtopics) {
      refs.push({
        topicNumber: topic.number,
        topicSlug: topic.slug,
        topicTitle: topic.title,
        subtopicId: sub.id,
        subtopicTitle: sub.title,
        href: `/curso?tema=${topic.slug}&sub=${sub.id}`,
      })
    }
  }
  return refs
}

/** Previous/next lesson around the given position. */
export function getLessonNeighbours(
  topicNumber: number,
  subtopicId: string,
): { prev: LessonRef | null; next: LessonRef | null } {
  const sequence = getLessonSequence()
  const i = sequence.findIndex(
    (r) => r.topicNumber === topicNumber && r.subtopicId === subtopicId,
  )
  if (i === -1) return { prev: null, next: null }
  return {
    prev: sequence[i - 1] ?? null,
    next: sequence[i + 1] ?? null,
  }
}
