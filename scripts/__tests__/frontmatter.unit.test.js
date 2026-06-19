const { test } = require("node:test")
const assert = require("node:assert/strict")

const { parseFrontmatter, serializeConcept } = require("../okf-core/frontmatter")

// Requirement 2.1: valid non-empty YAML block -> data parsed, hadFrontmatter true.
test("parseFrontmatter parses a valid non-empty frontmatter block", () => {
  const raw = "---\ntype: Note\ntitle: Hello\n---\nbody text"
  const result = parseFrontmatter(raw)
  assert.deepEqual(result.data, { type: "Note", title: "Hello" })
  assert.equal(result.body, "body text")
  assert.equal(result.hadFrontmatter, true)
})

// Requirement 2.2: no block -> data {}, body === raw unchanged, hadFrontmatter false.
test("parseFrontmatter returns the input unchanged when no frontmatter block exists", () => {
  const raw = "# Just a heading\n\nSome body without frontmatter."
  const result = parseFrontmatter(raw)
  assert.deepEqual(result.data, {})
  assert.equal(result.body, raw)
  assert.equal(result.hadFrontmatter, false)
})

test("parseFrontmatter treats an unterminated opening delimiter as no frontmatter", () => {
  const raw = "---\ntype: Note\nno closing delimiter here"
  const result = parseFrontmatter(raw)
  assert.deepEqual(result.data, {})
  assert.equal(result.body, raw)
  assert.equal(result.hadFrontmatter, false)
})

// Requirement 2.3: empty block `---\n---` -> data {}, hadFrontmatter true.
test("parseFrontmatter handles an empty frontmatter block", () => {
  const raw = "---\n---\nbody after empty block"
  const result = parseFrontmatter(raw)
  assert.deepEqual(result.data, {})
  assert.equal(result.body, "body after empty block")
  assert.equal(result.hadFrontmatter, true)
})

// Requirement 2.4: body after the closing delimiter is preserved verbatim,
// including whitespace and newlines.
test("parseFrontmatter preserves body whitespace and newlines verbatim", () => {
  const body = "  leading spaces\n\ntrailing newlines\n\n  \n"
  const raw = `---\ntype: Note\n---\n${body}`
  const result = parseFrontmatter(raw)
  assert.equal(result.body, body)
  assert.equal(result.hadFrontmatter, true)
})

test("parseFrontmatter preserves a body that is only whitespace", () => {
  const raw = "---\ntype: Note\n---\n   \t\n\n"
  const result = parseFrontmatter(raw)
  assert.equal(result.body, "   \t\n\n")
})

// Requirement 2.5: invalid YAML syntax throws.
test("parseFrontmatter throws on invalid YAML syntax", () => {
  const raw = "---\nfoo: [unclosed\n---\nbody"
  assert.throws(() => parseFrontmatter(raw), /Invalid YAML frontmatter/)
})

// serializeConcept round-trips parsed data with the body intact (Requirements 2.1, 2.4).
test("serializeConcept re-emits a frontmatter block parseable back to the same data", () => {
  const raw = "---\ntype: Note\ntitle: Hello\n---\nbody text"
  const parsed = parseFrontmatter(raw)
  const serialized = serializeConcept(parsed)
  const reparsed = parseFrontmatter(serialized)
  assert.deepEqual(reparsed.data, parsed.data)
  assert.equal(reparsed.body, parsed.body)
  assert.equal(reparsed.hadFrontmatter, true)
})

// serializeConcept leaves a no-frontmatter concept as its body (Requirement 2.2).
test("serializeConcept returns the body unchanged when there is no frontmatter", () => {
  const raw = "# Heading\n\nBody without frontmatter."
  const parsed = parseFrontmatter(raw)
  const serialized = serializeConcept(parsed)
  assert.equal(serialized, raw)
})
