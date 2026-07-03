/**
 * Temario (course syllabus) types. The temario is FIXED content authored by the
 * thesis team — see `lib/content/temario.ts` for the canonical data. Lesson
 * bodies (the actual teaching material) are NOT part of this shape; they are
 * loaded separately through the content seam.
 */

export interface SubTopic {
  number: number
  title: string
}

export interface Topic {
  number: number
  /** Stable URL/key-friendly identifier, e.g. "permisos". */
  slug: string
  title: string
  /** Short catalogue description (navigational, not lesson content). */
  description: string
  /** Optional/complementary topics are flagged so the UI can label them. */
  complementary?: boolean
  subTopics: SubTopic[]
}
