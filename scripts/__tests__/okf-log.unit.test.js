const { test } = require("node:test")
const assert = require("node:assert/strict")
const fs = require("node:fs")
const os = require("node:os")
const path = require("node:path")

const {
  parseLog,
  computeNewLog,
  appendLogEntry,
  buildEntryLine,
  VALID_KINDS
} = require("../okf-log")

// makeTempDir() -> string
// Creates a fresh temp directory and returns its absolute path. Callers are
// responsible for cleaning it up with fs.rmSync(dir, { recursive: true }).
function makeTempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "okf-log-"))
}

// --- Requirement 8.2: entry line begins with one bold kind -----------------

test("buildEntryLine begins with exactly one bold kind from the valid set", () => {
  for (const kind of VALID_KINDS) {
    const line = buildEntryLine(kind, "did a thing")
    assert.equal(line, `**${kind}** did a thing`)
    // Exactly one bold keyword at the very start.
    const boldMatches = line.match(/\*\*[^*]+\*\*/g)
    assert.equal(boldMatches.length, 1, "expected exactly one bold keyword")
    assert.ok(line.startsWith(`**${kind}**`), "bold keyword must be first")
    assert.ok(VALID_KINDS.includes(kind))
  }
})

test("buildEntryLine emits just the bold keyword when the message is empty", () => {
  assert.equal(buildEntryLine("Update", ""), "**Update**")
  assert.equal(buildEntryLine("Update", "   "), "**Update**")
  assert.equal(buildEntryLine("Update"), "**Update**")
})

test("VALID_KINDS is exactly {Update, Creation, Deprecation}", () => {
  assert.deepEqual([...VALID_KINDS].sort(), ["Creation", "Deprecation", "Update"])
})

// --- Requirement 8.1: heading format `## YYYY-MM-DD` -----------------------

test("computeNewLog renders a canonical `## YYYY-MM-DD` heading", () => {
  const out = computeNewLog("", { date: "2024-03-09", kind: "Update", message: "first" })
  const heading = out.split("\n")[0]
  assert.match(heading, /^## \d{4}-\d{2}-\d{2}$/)
  assert.equal(heading, "## 2024-03-09")
})

// --- Requirement 8.3: same-day insert goes first under the heading ---------

test("computeNewLog inserts a same-day entry as the FIRST line under the heading", () => {
  const initial = ["## 2024-03-09", "**Update** older", ""].join("\n")
  const out = computeNewLog(initial, {
    date: "2024-03-09",
    kind: "Creation",
    message: "newer"
  })

  const parsed = parseLog(out)
  assert.equal(parsed.blocks.length, 1, "no new date block should be created")
  assert.equal(parsed.blocks[0].date, "2024-03-09")
  // Newest-first within the day: the new entry precedes the old one.
  assert.equal(parsed.blocks[0].lines[0], "**Creation** newer")
  assert.equal(parsed.blocks[0].lines[1], "**Update** older")
})

// --- Requirement 8.4: a newer date block is placed at the TOP --------------

test("computeNewLog places a new (newer) date block above existing blocks", () => {
  const initial = ["## 2024-03-08", "**Update** yesterday", ""].join("\n")
  const out = computeNewLog(initial, {
    date: "2024-03-09",
    kind: "Update",
    message: "today"
  })

  const parsed = parseLog(out)
  assert.equal(parsed.blocks.length, 2)
  // Newest date heading is at the top.
  assert.equal(parsed.blocks[0].date, "2024-03-09")
  assert.equal(parsed.blocks[0].lines[0], "**Update** today")
  assert.equal(parsed.blocks[1].date, "2024-03-08")
})

test("computeNewLog keeps date headings in descending order for an older insert", () => {
  // An older date must land below newer ones without reordering existing blocks.
  const initial = ["## 2024-03-10", "**Update** newest", "## 2024-03-08", "**Update** old"].join(
    "\n"
  )
  const out = computeNewLog(initial, {
    date: "2024-03-09",
    kind: "Update",
    message: "middle"
  })

  const parsed = parseLog(out)
  const dates = parsed.blocks.map((b) => b.date)
  assert.deepEqual(dates, ["2024-03-10", "2024-03-09", "2024-03-08"])
})

// --- Requirement 8.5: preserve old content ---------------------------------

test("computeNewLog preserves existing entries (no delete/modify/reorder)", () => {
  const initial = [
    "# Log",
    "",
    "## 2024-03-08",
    "**Creation** alpha",
    "**Update** beta",
    "",
    "## 2024-03-01",
    "**Deprecation** gamma"
  ].join("\n")

  const out = computeNewLog(initial, {
    date: "2024-03-09",
    kind: "Update",
    message: "fresh"
  })

  // Every original line still appears, in its original relative order.
  assert.ok(out.includes("# Log"), "preamble title preserved")
  assert.ok(out.includes("**Creation** alpha"))
  assert.ok(out.includes("**Update** beta"))
  assert.ok(out.includes("**Deprecation** gamma"))

  const parsed = parseLog(out)
  // Existing blocks remain intact and in order, with the new one prepended.
  assert.deepEqual(
    parsed.blocks.map((b) => b.date),
    ["2024-03-09", "2024-03-08", "2024-03-01"]
  )
  const march8 = parsed.blocks.find((b) => b.date === "2024-03-08")
  assert.deepEqual(march8.lines.slice(0, 2), ["**Creation** alpha", "**Update** beta"])
  const march1 = parsed.blocks.find((b) => b.date === "2024-03-01")
  assert.ok(march1.lines.includes("**Deprecation** gamma"))
})

// --- Requirement 8.7: reject an invalid kind, leaving the log unchanged -----

test("computeNewLog throws on an invalid kind", () => {
  assert.throws(
    () => computeNewLog("## 2024-03-09\n**Update** x", { kind: "Bogus", message: "y" }),
    /Invalid log entry kind/
  )
  assert.throws(() => computeNewLog("", { kind: undefined, message: "y" }), /Invalid log entry/)
})

test("appendLogEntry rejects an invalid kind and leaves the file unchanged (8.7)", () => {
  const dir = makeTempDir()
  try {
    const logPath = path.join(dir, "log.md")
    const original = ["## 2024-03-09", "**Update** keep me", ""].join("\n")
    fs.writeFileSync(logPath, original, "utf8")

    assert.throws(
      () => appendLogEntry(logPath, { kind: "Invalid", message: "nope" }),
      /Invalid log entry kind/
    )

    const after = fs.readFileSync(logPath, "utf8")
    assert.equal(after, original, "log.md must be untouched after an invalid kind")
  } finally {
    fs.rmSync(dir, { recursive: true, force: true })
  }
})

// --- Requirement 8.8: restore the original content on a write failure -------
//
// Simulation chosen: write a known log file, then mark it read-only with
// fs.chmodSync(0o444). The atomic rename in appendLogEntry then fails because
// the target cannot be replaced, exercising the restore/rollback path. We
// assert appendLogEntry throws and the original content is intact, then restore
// write permissions in finally so the temp dir can be cleaned up.
test("appendLogEntry throws and preserves the original on a write failure (8.8)", () => {
  const dir = makeTempDir()
  const logPath = path.join(dir, "log.md")
  const original = ["## 2024-03-09", "**Update** precious", ""].join("\n")
  fs.writeFileSync(logPath, original, "utf8")
  // Make both the file and its directory read-only to force a rename failure.
  fs.chmodSync(logPath, 0o444)
  fs.chmodSync(dir, 0o555)

  try {
    assert.throws(
      () => appendLogEntry(logPath, { kind: "Update", message: "should fail" }),
      /Failed to write log/
    )
    // Restore dir perms before reading back the content.
    fs.chmodSync(dir, 0o755)
    fs.chmodSync(logPath, 0o644)
    const after = fs.readFileSync(logPath, "utf8")
    assert.equal(after, original, "original content must be preserved on write failure")
  } finally {
    // Ensure perms are restored so cleanup succeeds.
    try {
      fs.chmodSync(dir, 0o755)
    } catch (e) {}
    try {
      fs.chmodSync(logPath, 0o644)
    } catch (e) {}
    fs.rmSync(dir, { recursive: true, force: true })
  }
})

// --- Happy path: appendLogEntry round-trips through the filesystem ----------

test("appendLogEntry writes a same-day entry to the top of the day's block", () => {
  const dir = makeTempDir()
  try {
    const logPath = path.join(dir, "log.md")
    fs.writeFileSync(logPath, "## 2024-03-09\n**Update** old\n", "utf8")

    appendLogEntry(logPath, { date: "2024-03-09", kind: "Creation", message: "new" })

    const parsed = parseLog(fs.readFileSync(logPath, "utf8"))
    assert.equal(parsed.blocks.length, 1)
    assert.equal(parsed.blocks[0].lines[0], "**Creation** new")
    assert.equal(parsed.blocks[0].lines[1], "**Update** old")
  } finally {
    fs.rmSync(dir, { recursive: true, force: true })
  }
})
