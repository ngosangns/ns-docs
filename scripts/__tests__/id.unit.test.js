const { test } = require("node:test")
const assert = require("node:assert/strict")
const path = require("node:path")

const { conceptIdOf, isReservedFile } = require("../okf-core/id")

// conceptIdOf(absPath, rootDir) -> bundle-relative id with `/` separators,
// `.md` stripped, no leading slash. See Requirements 1.3, 1.4.
test("conceptIdOf derives bundle-relative ids", () => {
  const root = path.join("/", "vault")
  const cases = [
    {
      name: "POSIX separators, strips .md",
      absPath: path.join(root, "English", "Grammar", "Passive Voice.md"),
      expected: "English/Grammar/Passive Voice"
    },
    {
      name: "file at root keeps no leading slash",
      absPath: path.join(root, "note.md"),
      expected: "note"
    },
    {
      name: "non-md file keeps its extension",
      absPath: path.join(root, "Attachments", "diagram.png"),
      expected: "Attachments/diagram.png"
    },
    {
      name: "uppercase .MD extension is stripped",
      absPath: path.join(root, "Topic.MD"),
      expected: "Topic"
    }
  ]
  for (const { name, absPath, expected } of cases) {
    assert.equal(conceptIdOf(absPath, root), expected, name)
  }
})

test("conceptIdOf always emits / separators regardless of native ones", () => {
  // path.join uses the platform's native separator (`\\` on Windows, `/` on
  // POSIX); conceptIdOf must normalize whatever path.relative returns to `/`.
  const root = path.join("/", "vault")
  const absPath = path.join(root, "Tech", "Notes", "Deep.md")
  const id = conceptIdOf(absPath, root)
  assert.equal(id, "Tech/Notes/Deep")
  assert.ok(!id.includes("\\"), "id must not contain backslash separators")
})

test("conceptIdOf normalizes backslash separators in the relative path", () => {
  // Directly exercise the backslash-normalization branch in a platform-
  // independent way: a rootDir whose relative result keeps backslashes.
  const root = "."
  const absPath = "sub\\dir\\Topic.md"
  assert.equal(conceptIdOf(absPath, root), "sub/dir/Topic")
})

test("conceptIdOf is idempotent for already-derived ids", () => {
  const root = path.join("/", "vault")
  const absPath = path.join(root, "Projects", "OKF", "Design.md")
  const first = conceptIdOf(absPath, root)
  // Calling again against the same root yields the identical id (the id is
  // already relative, no .md, `/` separators, no leading slash).
  const second = conceptIdOf(path.join(root, first), root)
  assert.equal(first, "Projects/OKF/Design")
  assert.equal(second, first)
})

// isReservedFile(relPath) -> true for index.md / log.md, case-insensitive.
// See Requirement 1.5.
test("isReservedFile classifies reserved bundle files case-insensitively", () => {
  const cases = [
    { input: "index.md", expected: true },
    { input: "log.md", expected: true },
    { input: "INDEX.MD", expected: true },
    { input: "Log.md", expected: true },
    { input: "English/Grammar/index.md", expected: true },
    { input: "note.md", expected: false },
    { input: "other.txt", expected: false }
  ]
  for (const { input, expected } of cases) {
    assert.equal(isReservedFile(input), expected, input)
  }
})
