#!/usr/bin/env node

// Frontmatter parsing and Concept serialization for the OKF tooling.
// See .kiro/specs/okf-redesign/design.md (Function 2: parseFrontmatter) and
// Requirements 2.1-2.7 for the contract implemented here.

const yaml = require("js-yaml")

const { OKF_KEYS } = require("./constants")

// Matches a frontmatter block anchored at the start of the string:
//   ---\n            (opening delimiter on its own line)
//   <yaml content>   (captured, may be empty)
//   ---              (closing delimiter on its own line)
// The optional newline before the closing delimiter lets an empty block
// (`---\n---`) match with an empty YAML capture. CRLF endings are tolerated.
const FRONTMATTER_RE = /^---[ \t]*\r?\n([\s\S]*?)(?:\r?\n)?---[ \t]*(?:\r?\n|$)/

// parseFrontmatter(raw) -> { data, body, hadFrontmatter }
//
// - Recognizes a `---\n...\n---` block at the very start of `raw`.
// - Valid non-empty YAML  -> data = parsed object, hadFrontmatter = true.
// - Empty block           -> data = {},            hadFrontmatter = true.
// - No valid block        -> data = {}, body = raw, hadFrontmatter = false.
// - Body after the closing delimiter is preserved verbatim.
// - Invalid YAML syntax    -> throws (the caller attaches the file name).
function parseFrontmatter(raw) {
  const source = typeof raw === "string" ? raw : ""

  const match = FRONTMATTER_RE.exec(source)
  if (!match) {
    return { data: {}, body: source, hadFrontmatter: false }
  }

  const yamlText = match[1]
  const body = source.slice(match[0].length)

  let parsed
  try {
    parsed = yaml.load(yamlText)
  } catch (err) {
    // Re-throw so the caller can attach the file name. Do not swallow.
    throw new Error(`Invalid YAML frontmatter: ${err.message}`)
  }

  const data = parsed && typeof parsed === "object" ? parsed : {}

  return { data, body, hadFrontmatter: true }
}

// serializeConcept(concept) -> string
//
// Joins the frontmatter block with the body. Every key on `concept.data`,
// including keys outside OKF_KEYS, is preserved verbatim (name, value and
// type) because the whole data object is dumped as-is.
function serializeConcept(concept) {
  const data = concept && concept.data && typeof concept.data === "object" ? concept.data : {}
  const body = concept && typeof concept.body === "string" ? concept.body : ""
  const hadFrontmatter = Boolean(concept && concept.hadFrontmatter)

  const keys = Object.keys(data)

  // No frontmatter to emit: return the body untouched.
  if (keys.length === 0 && !hadFrontmatter) {
    return body
  }

  let yamlText = ""
  if (keys.length > 0) {
    yamlText = yaml.dump(data, {
      lineWidth: -1,
      noRefs: true,
      sortKeys: false
    })
  }

  return `---\n${yamlText}---\n${body}`
}

module.exports = {
  parseFrontmatter,
  serializeConcept,
  OKF_KEYS
}
