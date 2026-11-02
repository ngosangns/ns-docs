const { test } = require("node:test")
const assert = require("node:assert/strict")

const { analyzeBody, classify } = require("../publish-audit")
const {
  stripSections,
  stripFirstH1,
  autolinkBareUrls,
  absolutizeLinks
} = require("../publish-build")

test("lead counts prose after a section heading and across paragraphs", () => {
  const body = [
    "# Title",
    "",
    "## Overview",
    "",
    "First paragraph with a few words.",
    "",
    "Second paragraph adds more words.",
    "",
    "- a bullet",
    ""
  ].join("\n")
  const analysis = analyzeBody(body)
  assert.equal(analysis.introWords, 11)
})

test("a list before any prose means no lead", () => {
  const body = ["# Title", "", "- first", "- second", ""].join("\n")
  assert.equal(analyzeBody(body).introWords, 0)
})

test("sentences inside bullets are measured separately", () => {
  const body = [
    "# Title",
    "",
    "Lead.",
    "",
    "- Short one. Another short one.",
    "- Third one. Fourth one.",
    ""
  ].join("\n")
  const analysis = analyzeBody(body)
  assert.equal(analysis.sentenceCount, 5)
  assert.equal(analysis.avgSentence, 2)
})

test("narrative ratio counts long bullets but not link-dump bullets", () => {
  const long = [
    "# Title",
    "",
    "Lead.",
    "",
    "- This bullet carries a full sentence with enough words to count as prose.",
    "- Another bullet with a complete sentence and enough words to count here."
  ].join("\n")
  const short = [
    "# Title",
    "",
    "Lead.",
    "",
    ...Array.from({ length: 12 }, (_, i) => `- https://${i}.example`)
  ].join("\n")
  assert.ok(analyzeBody(long).paragraphRatio > 0.8)
  assert.ok(analyzeBody(short).paragraphRatio < 0.2)
})

test("audit sections are excluded from prose metrics", () => {
  const body = [
    "# Title",
    "",
    "Lead.",
    "",
    "## Not checked",
    "",
    "This sentence sits in an audit section and must not count.",
    ""
  ].join("\n")
  const analysis = analyzeBody(body)
  assert.deepEqual(analysis.auditSections, ["Not checked"])
  assert.equal(analysis.sentenceCount, 1)
})

test("classify reports a fragment below 150 words", () => {
  const body = "# Title\n\nShort body.\n"
  const analysis = { ...analyzeBody(body), title: "Title" }
  const { blockers } = classify(body, analysis)
  assert.ok(blockers.includes("fragment under 150 words"))
})

test("stripSections removes a heading and its deeper content only", () => {
  const body = [
    "## Keep",
    "",
    "keep me",
    "",
    "## Not checked",
    "",
    "drop me",
    "",
    "### Detail",
    "",
    "drop me too",
    "",
    "## Keep again",
    "",
    "keep this"
  ].join("\n")
  const out = stripSections(body, () => false)
  assert.match(out, /keep me/)
  assert.match(out, /keep this/)
  assert.ok(!out.includes("drop me"))
})

test("stripSections keeps sections the docs projection allows", () => {
  const body = "## Sources\n\n- https://a.example\n"
  const out = stripSections(body, (heading) => heading === "Sources")
  assert.match(out, /Sources/)
})

test("stripFirstH1 removes exactly the first H1", () => {
  const body = "# Title\n\nBody.\n\n## Section\n"
  assert.equal(stripFirstH1(body), "Body.\n\n## Section")
})

test("autolinkBareUrls leaves existing links and code alone", () => {
  const body = [
    "- https://bare.example",
    "- [text](https://linked.example)",
    "",
    "```",
    "https://inside.example",
    "```"
  ].join("\n")
  const out = autolinkBareUrls(body)
  assert.match(out, /<https:\/\/bare\.example>/)
  assert.match(out, /\]\(https:\/\/linked\.example\)/)
  assert.match(out, /^https:\/\/inside\.example$/m)
})

test("absolutizeLinks prefixes only bundle-relative targets", () => {
  const body = "[a](/Technology/A B) [b](https://x.example) [c](#anchor)"
  const out = absolutizeLinks(body)
  assert.match(out, /\(https:\/\/ngosangns-knowledge-base\.pages\.dev\/Technology\/A%20B\)/)
  assert.match(out, /\(https:\/\/x\.example\)/)
  assert.match(out, /\(#anchor\)/)
})
