import { readFileSync } from "node:fs"
import { join } from "node:path"
import type { TopicContentMeta } from "@/lib/domain/content"

/**
 * Content seam (server-only — reads from disk).
 *
 * Lesson material lives under `content/temario/tema-NN/`: a `meta.json` manifest
 * plus one markdown file per subtopic. Most topics have no content yet, in which
 * case these return null and the UI shows an empty state. Drop a `tema-NN`
 * directory in to publish a topic — no code changes needed.
 */

const CONTENT_ROOT = join(process.cwd(), "content", "temario")

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
