const { test } = require("node:test")
const assert = require("node:assert/strict")

const { inferType, migrateFrontmatter } = require("../okf-migrate")
const { TYPE_RULES } = require("../okf-core/constants")

// inferType(concept, typeRules) -> non-empty `type`. See Requirements 3.1-3.4.
test("inferType keeps a non-empty existing type unchanged", () => {
  // Requirement 3.2: an explicit type wins over directory inference.
  const concept = {
    id: "English/Grammar/Passive Voice",
    data: { type: "Playbook" }
  }
  assert.equal(inferType(concept, TYPE_RULES), "Playbook")
})

test("inferType maps a directory prefix to its type when type is empty", () => {
  // Requirements 3.1, 3.3: empty type + matching root-directory prefix.
  const cases = [
    { id: "English/Grammar/Passive Voice", expected: "Reference" },
    { id: "Technology/Notes/Deep", expected: "Reference" },
    { id: "Projects/OKF/Design", expected: "Playbook" },
    { id: "Life/Health/Sleep", expected: "Note" }
  ]
  for (const { id, expected } of cases) {
    const concept = { id, data: { type: "" } }
    assert.equal(inferType(concept, TYPE_RULES), expected, id)
  }
})

test("inferType picks the longest matching prefix", () => {
  // Requirement 3.3: longest-matching root-directory prefix wins when nested
  // rules could both apply.
  const rules = {
    Projects: "Playbook",
    "Projects/OKF": "Reference"
  }
  const concept = { id: "Projects/OKF/Design", data: { type: "" } }
  assert.equal(inferType(concept, rules), "Reference")
})

test("inferType falls back to Note when no prefix matches", () => {
  // Requirement 3.4: unmatched prefix yields the default "Note".
  const concept = { id: "Unmapped/Folder/Topic", data: { type: "" } }
  assert.equal(inferType(concept, TYPE_RULES), "Note")
})

// migrateFrontmatter(concept, typeRules) -> { concept, changes }.
// See Requirements 4.1-4.4 and 3.x.
test("migrateFrontmatter fills empty recommended fields and records each change", () => {
  // Requirements 4.1 (title from file name), 4.2 (empty description),
  // 4.3 (ISO 8601 timestamp), plus type inference for an empty type.
  const concept = {
    id: "English/Grammar/Passive Voice",
    relPath: "English/Grammar/Passive Voice.md",
    data: { type: "" }
  }
  const { concept: next, changes } = migrateFrontmatter(concept, TYPE_RULES)

  // Requirement 4.1: title derived from file name without ".md".
  assert.equal(next.data.title, "Passive Voice")
  // Requirement 4.2: description filled with an empty string.
  assert.equal(next.data.description, "")
  // Requirement 4.3: timestamp is a valid ISO 8601 string.
  assert.match(
    next.data.timestamp,
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
  )
  // Empty type assigned via inference.
  assert.equal(next.data.type, "Reference")

  // A change is recorded for each filled field.
  const fields = changes.map((change) => change.field).sort()
  assert.deepEqual(fields, ["description", "timestamp", "title", "type"])

  // Each change record carries the source id and before/after values.
  const titleChange = changes.find((change) => change.field === "title")
  assert.deepEqual(titleChange, {
    id: "English/Grammar/Passive Voice",
    field: "title",
    before: undefined,
    after: "Passive Voice"
  })

  const typeChange = changes.find((change) => change.field === "type")
  assert.equal(typeChange.before, "")
  assert.equal(typeChange.after, "Reference")

  // The original input is never mutated.
  assert.equal(concept.data.title, undefined)
  assert.equal(concept.data.type, "")
})

test("migrateFrontmatter keeps existing non-empty values without recording changes", () => {
  // Requirement 4.4: existing non-empty fields are preserved untouched and
  // record no change.
  const concept = {
    id: "English/Grammar/Passive Voice",
    relPath: "English/Grammar/Passive Voice.md",
    data: {
      type: "Playbook",
      title: "Custom Title",
      description: "Existing description",
      timestamp: "2020-01-02T03:04:05.000Z"
    }
  }
  const { concept: next, changes } = migrateFrontmatter(concept, TYPE_RULES)

  assert.equal(next.data.type, "Playbook")
  assert.equal(next.data.title, "Custom Title")
  assert.equal(next.data.description, "Existing description")
  assert.equal(next.data.timestamp, "2020-01-02T03:04:05.000Z")
  assert.deepEqual(changes, [])
})

test("migrateFrontmatter is idempotent: a second pass records no changes", () => {
  // Requirement 10.8: running migration twice is a no-op on the second pass.
  const concept = {
    id: "Life/Health/Sleep",
    relPath: "Life/Health/Sleep.md",
    data: {}
  }
  const first = migrateFrontmatter(concept, TYPE_RULES)
  assert.ok(first.changes.length > 0)

  const second = migrateFrontmatter(first.concept, TYPE_RULES)
  assert.deepEqual(second.changes, [])
})
