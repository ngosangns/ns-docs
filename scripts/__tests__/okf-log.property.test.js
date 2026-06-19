const { test } = require("node:test")
const assert = require("node:assert/strict")
const fc = require("fast-check")

const { parseLog, computeNewLog, VALID_KINDS } = require("../okf-log")

// A valid ISO 8601 date `YYYY-MM-DD`. Days are constrained to 01-28 so every
// (year, month, day) triple is a real calendar date regardless of month.
const dateArb = fc
  .record({
    year: fc.integer({ min: 2000, max: 2030 }),
    month: fc.integer({ min: 1, max: 12 }),
    day: fc.integer({ min: 1, max: 28 })
  })
  .map(({ year, month, day }) => {
    const mm = String(month).padStart(2, "0")
    const dd = String(day).padStart(2, "0")
    return `${year}-${mm}-${dd}`
  })

// Plain ascii message that cannot break the log structure: no newlines so a
// message never introduces a spurious heading line.
const messageArb = fc.string().map((s) => s.replace(/[\r\n]/g, " "))

// A single log entry: random date, valid kind and ascii message.
const entryArb = fc.record({
  date: dateArb,
  kind: fc.constantFrom(...VALID_KINDS),
  message: messageArb
})

// Property 8: Log newest-first.
// **Validates: Requirements 8.6**
// Folding computeNewLog over a series of entries with random dates must always
// leave the date headings in non-increasing (descending) order.
test("Property 8: log date headings stay in descending order", () => {
  fc.assert(
    fc.property(fc.array(entryArb, { maxLength: 20 }), (entries) => {
      let log = ""
      for (const entry of entries) {
        log = computeNewLog(log, entry)
      }

      const { blocks } = parseLog(log)
      for (let i = 0; i + 1 < blocks.length; i += 1) {
        assert.ok(
          blocks[i].date >= blocks[i + 1].date,
          `headings out of order at ${i}: ${blocks[i].date} < ${blocks[i + 1].date}`
        )
      }
    }),
    { numRuns: 200 }
  )
})
