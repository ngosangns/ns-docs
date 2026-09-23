import { visit } from "unist-util-visit"
import { fromHtml } from "hast-util-from-html"
import type { Root, Element, ElementContent, Text } from "hast"
import { createHighlighter, type Highlighter, type BundledLanguage } from "shiki"

const THEMES = { light: "github-light", dark: "github-dark" } as const

let highlighterPromise: Promise<Highlighter> | null = null
const loadedLangs = new Set<string>(["text", "plaintext"])

function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [THEMES.light, THEMES.dark],
      langs: ["plaintext"],
    })
  }
  return highlighterPromise
}

async function ensureLanguage(highlighter: Highlighter, lang: string): Promise<string> {
  if (loadedLangs.has(lang)) return lang
  try {
    await highlighter.loadLanguage(lang as BundledLanguage)
    loadedLangs.add(lang)
    return lang
  } catch {
    return "text"
  }
}

function extractText(node: Element | Text): string {
  if (node.type === "text") return node.value
  return node.children.map((child) => extractText(child as Element | Text)).join("")
}

function languageOf(codeEl: Element): string {
  const classes = codeEl.properties?.className
  const list = Array.isArray(classes) ? classes.map(String) : []
  const match = list.find((c) => c.startsWith("language-"))
  return match ? match.slice("language-".length) : "text"
}

/**
 * Build-time-only rehype plugin: replaces every `<pre><code class="language-x">`
 * block with Shiki's dual-theme (light+dark) highlighted markup, so no client
 * JS is needed for syntax highlighting. Unknown/unloadable languages degrade
 * to plain text instead of failing the build.
 */
export function rehypeShikiHighlight() {
  return async (tree: Root) => {
    const highlighter = await getHighlighter()
    const targets: { parent: Root | Element; index: number; pre: Element }[] = []

    visit(tree, "element", (node, index, parent) => {
      if (node.tagName !== "pre" || index == null || !parent) return
      const code = node.children.find(
        (c): c is Element => c.type === "element" && c.tagName === "code",
      )
      if (!code) return
      targets.push({ parent: parent as Root | Element, index, pre: node })
    })

    for (const { parent, index, pre } of targets) {
      const code = pre.children.find(
        (c): c is Element => c.type === "element" && c.tagName === "code",
      )!
      const lang = await ensureLanguage(highlighter, languageOf(code))
      const text = extractText(code)

      const html = highlighter.codeToHtml(text, {
        lang,
        themes: THEMES,
        defaultColor: false,
      })

      const parsed = fromHtml(html, { fragment: true })
      const highlightedPre = parsed.children.find(
        (c): c is Element => c.type === "element" && c.tagName === "pre",
      )
      if (!highlightedPre) continue

      const siblings = parent.children as ElementContent[]
      siblings[index] = highlightedPre
    }
  }
}
