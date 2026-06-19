const { test } = require("node:test")
const assert = require("node:assert/strict")

const {
  RESERVED_FILES,
  OKF_KEYS,
  IGNORED_PATHS,
  TYPE_RULES
} = require("../okf-core/constants")

test("RESERVED_FILES holds the bundle reserved file names", () => {
  assert.deepEqual(RESERVED_FILES, ["index.md", "log.md"])
})

test("OKF_KEYS holds the canonical frontmatter keys", () => {
  assert.deepEqual(OKF_KEYS, [
    "type",
    "title",
    "description",
    "resource",
    "tags",
    "timestamp"
  ])
})

test("IGNORED_PATHS excludes build, VCS and non-knowledge directories", () => {
  assert.deepEqual(IGNORED_PATHS, [
    ".git",
    "node_modules",
    ".wrangler",
    "web/dist",
    ".kiro",
    "graphify-out",
    "docs",
    "scripts",
    "backups",
    "export",
    "README.md"
  ])
})

test("TYPE_RULES maps directory prefixes to non-empty type strings", () => {
  assert.ok(Object.keys(TYPE_RULES).length > 0)
  for (const [prefix, type] of Object.entries(TYPE_RULES)) {
    assert.equal(typeof prefix, "string")
    assert.equal(typeof type, "string")
    assert.ok(type.length > 0)
  }
})
