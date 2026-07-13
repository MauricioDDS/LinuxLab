import { lessonAssetExists, lessonAssetUrl } from "./lessons"

/**
 * Media directives inside lesson markdown, written as HTML comments so the raw
 * files stay readable:
 *
 *   <!-- IMAGE: archivo.png | texto alternativo -->
 *   <!-- IMAGE-DARK: logo-dark.png | ... -->      (par: se muestra en tema oscuro)
 *   <!-- IMAGE-LIGHT: logo-light.png | ... -->    (par: se muestra en tema claro)
 *   <!-- VIDEO: id-del-video | título -->
 *
 * Images are served from `public/temario/tema-NN/`. A directive whose file is not
 * there yet renders a "pendiente" placeholder instead of a broken image.
 */

export type LessonBlock =
  | { kind: "markdown"; content: string }
  | { kind: "image"; src: string; alt: string; exists: boolean; expectedPath: string }
  | {
      kind: "image-theme"
      lightSrc: string
      darkSrc: string
      alt: string
      exists: boolean
      expectedPaths: string[]
    }
  | { kind: "video"; title: string; src: string; exists: boolean; expectedPath: string }

interface Directive {
  type: string
  value: string
  label: string
}

type Token =
  | { kind: "markdown"; content: string }
  | { kind: "directive"; directive: Directive }

const DIRECTIVE_RE =
  /<!--\s*(IMAGE-DARK|IMAGE-LIGHT|IMAGE|VIDEO)\s*:\s*([^|\s][^|]*?)\s*(?:\|\s*(.*?)\s*)?-->/g

/** Find the complementary IMAGE-DARK/IMAGE-LIGHT directive, allowing blank text between. */
function findPartner(
  tokens: Token[],
  from: number,
  type: string,
): { directive: Directive; index: number } | null {
  const want = type === "IMAGE-DARK" ? "IMAGE-LIGHT" : "IMAGE-DARK"
  for (let j = from + 1; j < tokens.length; j++) {
    const token = tokens[j]
    if (token.kind === "markdown") {
      if (token.content.trim()) return null
      continue
    }
    return token.directive.type === want
      ? { directive: token.directive, index: j }
      : null
  }
  return null
}

export function parseLessonBlocks(markdown: string, topicNumber: number): LessonBlock[] {
  // 1. Split the markdown around the directives.
  const tokens: Token[] = []
  let cursor = 0
  for (const match of markdown.matchAll(DIRECTIVE_RE)) {
    const start = match.index ?? 0
    if (start > cursor) {
      tokens.push({ kind: "markdown", content: markdown.slice(cursor, start) })
    }
    tokens.push({
      kind: "directive",
      directive: {
        type: match[1],
        value: match[2].trim(),
        label: (match[3] ?? "").trim(),
      },
    })
    cursor = start + match[0].length
  }
  if (cursor < markdown.length) {
    tokens.push({ kind: "markdown", content: markdown.slice(cursor) })
  }

  // 2. Turn tokens into blocks, pairing dark/light images.
  const blocks: LessonBlock[] = []
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]

    if (token.kind === "markdown") {
      if (token.content.trim()) blocks.push({ kind: "markdown", content: token.content })
      continue
    }

    const { type, value, label } = token.directive

    if (type === "VIDEO") {
      // The directive may omit the extension: "mi-video" → "mi-video.mp4".
      const file = /\.(mp4|webm|mov)$/i.test(value) ? value : `${value}.mp4`
      blocks.push({
        kind: "video",
        title: label,
        src: lessonAssetUrl(topicNumber, file),
        exists: lessonAssetExists(topicNumber, file),
        expectedPath: `public${lessonAssetUrl(topicNumber, file)}`,
      })
      continue
    }

    if (type === "IMAGE-DARK" || type === "IMAGE-LIGHT") {
      const partner = findPartner(tokens, i, type)
      if (partner) {
        const darkFile = type === "IMAGE-DARK" ? value : partner.directive.value
        const lightFile = type === "IMAGE-LIGHT" ? value : partner.directive.value
        blocks.push({
          kind: "image-theme",
          lightSrc: lessonAssetUrl(topicNumber, lightFile),
          darkSrc: lessonAssetUrl(topicNumber, darkFile),
          alt: label || partner.directive.label,
          exists:
            lessonAssetExists(topicNumber, lightFile) &&
            lessonAssetExists(topicNumber, darkFile),
          expectedPaths: [
            `public${lessonAssetUrl(topicNumber, lightFile)}`,
            `public${lessonAssetUrl(topicNumber, darkFile)}`,
          ],
        })
        i = partner.index // consume the partner directive too
        continue
      }
      // Unpaired: fall through and render it as a normal image.
    }

    blocks.push({
      kind: "image",
      src: lessonAssetUrl(topicNumber, value),
      alt: label,
      exists: lessonAssetExists(topicNumber, value),
      expectedPath: `public${lessonAssetUrl(topicNumber, value)}`,
    })
  }

  return blocks
}
