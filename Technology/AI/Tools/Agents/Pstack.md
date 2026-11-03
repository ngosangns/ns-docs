---
area: technology
domain: coding-agents
type: guide
title: pstack
description: pstack (cursor/plugins, MIT, v0.15.36) is Lauren Tan's Cursor plugin of markdown skills. poteto-mode matches one of 23 playbooks and the model follows that file. There is no router process.
timestamp: "2026-11-02T21:00:00.000Z"
tags:
  - technology
  - coding-agents
  - cursor
  - pstack
  - poteto-mode
resource: https://github.com/cursor/plugins/tree/main/pstack
sources:
  - id: tree
    resource: https://github.com/cursor/plugins/tree/ae5650febf4320793844c12c4adaa937f417f8da/pstack
    author: human:Lauren Tan
  - id: readme
    resource: https://github.com/cursor/plugins/blob/ae5650febf4320793844c12c4adaa937f417f8da/pstack/README.md
  - id: mode
    resource: https://github.com/cursor/plugins/blob/ae5650febf4320793844c12c4adaa937f417f8da/pstack/skills/poteto-mode/SKILL.md
generated:
  by: grok/4.7
  at: "2026-11-02T21:00:00.000Z"
---

# pstack

pstack is a Cursor plugin of markdown skills, playbooks, and two subagent definitions. It does not ship a router, a daemon, or a turn loop. Once `/poteto-mode` is on, the host injects `skills/poteto-mode/SKILL.md` and the model follows that file. The parent chat matches one of 23 playbooks, copies its steps into the todo list, and reads the next skill only when a step names it.

Checked 3 November 2026 against a sparse clone of `cursor/plugins` at `ae5650febf4320793844c12c4adaa937f417f8da` (`main`, commit time 31 October 2026 17:10 PDT, "Merge pull request #1150"). The tree has 705 paths. About 500 of those are the statechart test corpus and guide images, which this note does not walk line by line. Counts below come from `ls` on that clone. Plugin version in both manifests is `0.15.36`. License is MIT. Author field is Lauren Tan. The README says the same skills are what she uses at Cursor, and that she is on the React core team. That last sentence is the README's own claim.

## What the plugin registers

`.cursor-plugin/plugin.json` is the Cursor manifest. It sets `skills` to `./skills/`, `agents` to `./agents/`, `category` to `developer-tools`, and `logo` to `assets/logo.png`. There is no entrypoint and no hooks field. `plugin.json` at the plugin root is a second manifest against `https://agent-plugins.org/schemas/1.0.0/plugin.schema.json`. It repeats the name, version, description, author, and license, and it does not declare skills or agents.

`ls skills` returns 58 directories. Twenty-four of them are `principle-*` leaves. `ls playbooks` returns 23 files. `agents/` has two files, `poteto-agent.md` and `comment-sicko.md`.

Install in Cursor is `/add-plugin pstack`. In Claude Code it is `/plugin marketplace add cursor/plugins` and then `/plugin install pstack@cursor-plugins`, and every command is prefixed, so `/poteto-mode` becomes `/pstack:poteto-mode`. Claude Code installs a generated copy from `harness/pstack/` at the plugins repo root. This sparse checkout did not include that tree, so this note does not claim the generated copy matches `skills/`. After a pstack edit, the README says to run `node scripts/generate-pstack-harness-trees.mjs` from the repo root and commit the result, and that CI fails while the copy is stale. Claude Code leaves auto-update off for third-party marketplaces.

## How a turn is routed

`poteto-mode` sets `disable-model-invocation: true`. The host loads it when the user types the command or pins it. The model does not pull it in from a description match.

"On" has two strengths, and both are host behavior. Plain Enter attaches the skill to one message. Option+Enter on Mac, or Alt+Enter on Windows, makes it a Custom Mode. The guide says a Custom Mode stays in context every turn until the user exits it, in the Agents Window and the CLI. The plugin does not store that choice. `docs/harness/claude-code.md` is a translation table for Claude Code, not a second implementation. It maps Task to Agent, `poteto-agent` to `pstack:poteto-agent`, and the model rule path to `~/.claude/rules/pstack-models.md`. A step that needs Bugbot or Cursor Automations is skipped with one line.

One turn, as `SKILL.md` writes it:

1. Read the inline principle index. Do not read all 24 leaves up front. Read a leaf only when a decision uses it. The reply names that principle and the choice it changed. A citation with no decision behind it does not count.
2. Apply the non-negotiables before the match. The first message of a task restates the goal, the problem, and the smallest change, and does not wait. A one-line edit the user fully specified skips that restatement.
3. Match one playbook from the list at the bottom of `SKILL.md`. Open `playbooks/<kebab>.md` and copy its steps into the todo list before any task todo. A skipped step stays as `skip:` plus one reason.
4. Run that playbook in the parent chat. Never spawn `poteto-agent` to run the playbook. The parent reviews every subagent's diff and writes its own summary.
5. Write the reply under the Writing section, then the playbook's own reply lines.

"new task" is a phrase the guide tells the model to treat as a re-match. Nothing parses it. Without it, a question in the middle of Feature is the next Feature step. "don't change any code yet" pins Investigation.

A large or cross-cutting change, or work the user will review later, goes to `figure-it-out` even when Feature would fit. `figure-it-out` designs one bespoke run. A standing multi-day program goes to the Orchestrate playbook instead. The overnight guide says a "going to bed" handoff also routes through `figure-it-out` before code, because the user will review it later. `autonomous-run.md` itself does not name `figure-it-out`. The mode skill's playbook rule is what produces that route, and the playbook file assumes the route already happened.

README line 219 says poteto-mode and poteto-agent "route through the same wrapper." No wrapper file exists in the tree. The two uses of "wrapper" are that line and the line that calls `poteto-agent` itself the wrapper. Read it as two prompts that share one skill file, not as a shared code path.

## What "autonomy" allows

The Autonomy section is four rules. Reversible work and external actions such as team chat, ticket updates, and kicking off evals proceed without asking. Always pause for force-push to a shared branch, deploys, data deletion, and customer messages. "Don't stop", "going to bed", "run until done", and "be fully autonomous" keep going. Asked whether to do something, the model may decline. Agreement is not the default.

A fork of the form "which approach" is classified before anyone is asked. If a run could settle it, the Prototype playbook settles it. A read-only Investigation stays an Investigation. A product or preference call is the only kind reserved for the user. Under a full-autonomy grant, a call the grant covers is decided and reported, with no offer and no token to type back. A call only the operator can make gets a default, a full explanation, and a plain statement of what the operator could say instead.

## Models

`/setup-pstack` runs before the turn, not during it. It detects the slugs the Task tool accepts, asks one of four budgets (`unlimited`, `large`, `medium`, `small`), and writes an always-applied rule. In Cursor that file is `~/.cursor/rules/pstack-models.mdc`. The README's default split, before any rule, sends code delegates to `grok-4.7-xhigh-fast` and prose, judgment, and the hardest changes to `claude-opus-5-5-xhigh`. A missing role line keeps that skill's default. `inherit-parent` and `auto` omit the subagent `model` field, so the child uses the parent chat's model.

Per spawn, start at the budget's effort and move one step. Raise one step, up to max, for the hardest work. Lower one step for judgment and two or more for routine work. Drop the `-fast` suffix unless CI or trunk is red, or a person is blocked. Verification stays on the `swarm workers` line and keeps `-fast`. A slug the Task tool rejects is never retried. Fall back to the role default, then the calling skill's fallback, then the closest valid slug of the same family, then omit `model`.

The rule applies to new chats only. A rule written before a default change still pins the old default. Delete those lines, or the file, and run `/setup-pstack` again. A rerun keeps any role whose model differs from the default.

## Subagents

`agents/poteto-agent.md` is the delegate type, with `is_background: true`. Its prompt must carry the user's goal, the playbook, and the absolute path of `skills/poteto-mode/SKILL.md`. The delegate reads that file before acting. Substituting `generalPurpose` skips that read. `how`, `why`, `interrogate`, `reflect`, and `swarm` set their own `subagent_type` and must not be overridden.

Task defaults in the mode skill: `run_in_background: true`, agent mode rather than readonly, file pointers instead of inlined context, and an explicit model from the role line. Readonly strips MCP, which is why `why` forbids it and `how` sets it. Fresh agent per round. Resume only when the new work needs that agent's checkout, uncommitted changes, or a live process such as a dev server or a babysit watcher. A role such as a PR owner outlives its agent. The next round is a fresh agent with the consolidated brief.

`agents/comment-sicko.md` is a read-only comment reviewer. `no-comments` spawns it. The mode match does not.

## The 23 playbooks

The match list and the directory agree on 23. Opening a PR is one of the 23 and is also the last step of every build playbook. Diagnosis playbooks do not open one.

### Build

These stay in the lead, delegate the diff, and end at Opening a PR.

- **Feature.** `how`, then `architect`, then a four-item throughput checkpoint, then a code delegate. When more than one implementation shape is valid, the delegate goes through `arena`, and that handoff has no skip. The checkpoint items are blocking first steps, independent workstreams, shared mutable state, and the smallest safe decomposition. A dimension that does not apply stays as `n/a:` plus a reason.
- **Bug fix.** Reproduce on the control surface first. Ask the user only after that surface cannot reach the target, and only with a stated reason. Binary-search with `how` and `why`. Confirm the surviving mechanism with runtime evidence before `architect`. The failing repro commit lands before the fix. `tdd` applies when the bug has a cheap local test. The reply pastes failing-then-passing output.
- **Refactoring.** Pin behavior with a characterization test, snapshot, or equivalence harness before any move. Typecheck and lint are not a pin. A revealed bug splits out. A redesign routes to Feature. Migrate every caller and delete the old API in the same wave. Revert the diff if reader load did not drop.
- **Perf issue.** Baseline trace first, vetted by `benchmark-checklist`. Then seven mantras, cheapest first, stopping at the first that meets the target. Don't do it. Don't do it again. Do it less. Do it later. Do it when they're not looking. Do it concurrently. Do it cheaper.
- **Hillclimb.** One metric, a frozen harness, one hypothesis per iteration, keep or full revert, one commit per accepted win. A plateau is not a stop. A one-off fix stays on Perf issue.
- **Visual parity.** The baseline screenshot harness is the spec and is never edited. A nonzero image diff is a fail. One owner per component. Shared primitives migrate first.
- **Authoring a skill.** Hand the prose to Cursor's built-in `create-skill`. Check frontmatter, referenced files, and cross-skill links. Then Opening a PR.

Prototype and Eval do not open a PR. Prototype builds in a scratch directory, with no tests and no production framework, and hands the chosen direction to Feature. Eval hides the rubric and the eval vocabulary from candidates, scores both sets with one judge in one pass, and grades chain-following from the files the candidate opened plus the shape of the code.

### Diagnosis

Investigation, Runtime forensics, and Trace forensics stop at a cited answer. The throughput line is fixed: `throughput checkpoint: n/a, read-only investigation` or `read-only forensics`. Investigation routes through `how`, and through `why` when the question is about motivation. It does not call `architect` unless the findings precede a code change, in which case it hands back. Runtime forensics instruments the live process. Trace forensics reads a captured artifact and does not re-run it. Both hand back to Bug fix or Perf once the cause is known.

### From a diff to a merged PR

Opening a PR is the shared exit. Work from a git worktree off main. Commit liberally, then rebase into small ordered commits. Run `/deslop` from the `cursor-team-kit` plugin before commit, and `/no-comments` before review. Title and body go through `technical-writing`, then `unslop`. The title is Conventional Commits `type(scope): subject`, with no trailing period. The body is a one-minute briefing. Sections, in order, dropping an empty one: `## Why`, `## What changed`, `## Scope` (always), `## Tradeoffs` (only when a reviewer would ask), `## Blast Radius`, `## Verification`. The squash body stays under about 40 lines.

The forge resolves once. `gh` is the default. `origin pr` wins only when `command -v origin` succeeds and Origin can resolve the repo. Never require Graphite (`gt`). When the run has a built-in PR tool, create, edit, retarget, and mark-ready go through it. Open ready, never as a draft. A stack is a base-branch chain. The root targets trunk. Each child rebases onto its parent's exact tip and its PR targets the parent branch.

Opening a PR does not start a babysit. Finish the phase or the stack first. The one exemption is an Autopilot-full or Autopilot-stack owner, whose brief is the ask Babysit waits for.

Babysit owns the merge frontier and never merges. Declare the mode before any poll. `drive` is the default, for "babysit this" and "get it green". `background` triages while a plan still executes. `threads-only` answers review comments. `check` is one status pass, and it is the mode for a small or docs-only PR. Only the lowest unmerged PR is in play. Never retarget, rebase, or force-push from inside a babysit, unless the babysitter is the Autopilot owner of that same PR. Order is conflicts, then review threads, then CI. A conflict is reported, not resolved. One push wave for every known fix.

On GitHub, status comes from `scripts/watch-pr/watch-pr`. Single or stack mode stops at `READY`. Queued mode never emits `READY`. A blocker-free frontier is `WAITING` with reason `merge-queue`. Report that and stop. Waiting for merges is Shipping's job. On Origin, stop when checks are green, the PR is mergeable with no blockers, and no thread blocks. Origin does not use the GitHub verdict words. Owner approval is a wait. Only an explicit merge, land, or ship request routes to Shipping.

`READY` does not mean a human approved. In `scripts/watch-pr/policy.ts`, ready requires clean CI, zero unresolved threads, no conflict, and a review decision other than `CHANGES_REQUESTED`. `REVIEW_REQUIRED` and a null decision still yield ready. The playbook does not say whether that is a product choice or a gap. The code allows it.

Shipping is the only playbook that merges. One Cursor cloud agent that did not write the code runs the change the way a user would and posts `PASS`, `PASS+NOTES`, or `FAIL`. Green CI and an approving bot are not verdicts. Walk up from the lowest unmerged PR and stop at the first without a pass. That prefix is the run. Its top is the ceiling. Compare `git patch-id` at the verdict SHA with the current head before trusting an older verdict. Merge the lowest PR with `gh pr merge <pr> --squash`, or `origin pr merge <pr>`. On Origin the plain command also merges every PR below the one you name. Read the PR back. A merge command can report success when a queue only queued it. A landed PR reads merged with trunk as its base. Arm auto-merge only when the verdict covers the current head, because it lands whatever head is ready. Stop at the ceiling.

### Programs

- **Multi-phase plan.** The deliverable is a markdown checklist, not code. `scripts/check-plan.mjs` lints it and the playbook stops. Execution waits for an explicit go. The checker rejects an em dash, an en dash, a curly quote, or a colon followed by a space in prose outside code fences. Each PR section must contain the sentence "Tests alone are not sufficient verification. A PR is verified only when its unit, live, and perf boxes are all checked." three times, once per Verify block.
- **Autonomous run.** State one checkable exit predicate before the first iteration. Wake with Cursor's `/loop`. Each iteration makes the smallest change the evidence justifies, commits if it advanced, and reverts what did not. A plateau is not a stop. Never relax the predicate.
- **Orchestrate.** One coordinator chat for a multi-day program. It does not write code, call these scripts, or poll. One owner per PR. A verifier on a different model family. About ten workers in flight. Three levels maximum. The owner merges only on that verifier's pass at the current head.
- **Autopilot-full.** One cloud owner per PR, in parallel off trunk, never stacked. The root runs one full swarm at the code-ready head. The owner merges only what that swarm verified. A request to state the plan is not a go. On the operator's stop, every owner gets a zero-writes order.
- **Autopilot-stack.** Autopilot-full with merge removed. A PR stacks only on a PR it builds on. A restack that leaves `git patch-id` unchanged keeps the verdict. After the handoff, nobody pushes without the operator's go.
- **Pause safely.** Explicit only. "keep going" and "going to bed, keep going" do not pause. Finish or back out of the current step, commit one `wip:` commit, and write a resume note outside the context.
- **Session pickup.** Read the prior transcript, cloud-agent URL, or pushed branch as authoritative. Do not glob `~/.cursor/projects/*/`. Do not re-run the prior repro. Route the remainder, then verify inherited claims on the real artifact.
- **Worktree cleanup.** The one playbook that deletes user state. `scripts/worktree-audit.sh` suggests buckets. The pinned set wins over a `safe` mark. `wip` and in-use pause. `git worktree remove --force` does not delete branch refs.

## Principles

Twenty-four leaves, grouped in the mode skill. Every leaf sets `disable-model-invocation: true`. The index line is the trigger. The leaf is the rule, and only after it is read.

**Core.** Laziness protocol. Foundational thinking. Redesign from first principles. Attack the premise. Subtract before you add. Minimize reader load. Outcome-oriented execution. Experience first. Exhaust the design space. Build the lever.

**Architecture.** Model the domain. Boundary discipline. Type system discipline. Make operations idempotent. Migrate callers then delete legacy APIs. Separate before serializing shared state.

**Verification.** Prove it works. Fix root causes. Sequence verifiable units. Test behavior, not implementation. Explain the number.

**Delegation.** Guard the context window. Never block on the human.

**Meta.** Encode lessons in structure. `correct` is the repo-wide form. It mines history, counts a mistake class at two occurrences, and fixes at the highest level that works. Architecture first, then types or a lint whose error names the fix, then a test, then docs last.

Four leaves put the operative rule in the description, and the body does not repeat it. An agent that reads only the body does not get the rule the index promised.

- `principle-exhaust-the-design-space` is 9 lines. The description says to build 2 or 3 competing prototypes and compare them. The body is one sentence about product decisions that depend on feel.
- `principle-guard-the-context-window` is 12 lines. The description says to route bulk to subagents and keep summaries in the main thread. The body says to size phases and cap scope.
- `principle-encode-lessons-in-structure` is 11 lines. The description says to encode a repeated instruction as a lint, a metadata flag, a runtime check, or a script. The body covers the case that needs judgment and the corollary that a structural fix replaces the instruction.
- `principle-migrate-callers-then-delete-legacy-apis` is 14 lines. The description says to migrate callers and delete the old API in one wave. The body says to update tests to the new contract, and names the three conditions. No external users need compatibility. The project can absorb a coordinated break. The new API is part of a simplification.

## Design skills the playbooks call

These five multiply work in different ways. None of them is the router.

- **architect** grounds with `how`, and with `why` when ownership moves. It runs arena for two or more whole-shape sketches, using the `architect runners` model line rather than `arena runners`. It implements against the winner and throws the sketch out when the same workaround shape repeats. The caller usage is written before the types.
- **arena** gives N candidates the same brief. They never see the rubric. Each writes to its own worktree. One readonly judge from a different model family scores them. The coordinator picks a base and grafts one or two things from each loser by hand.
- **swarm** covers slices, or races identical briefs. The selection rule (`first pass`, `rank all`, or `best-of`) is declared before spawn. Each worker reports PASS, ISSUES, or BLOCKED. A result that omits the named SHAs and the method is dropped and respawned once. There is no base and no graft.
- **interrogate** reuses arena's fan-out and drops the judge, the pick, and the graft. A finding survives only when rerunning its command shows a failure that breaks the stated intent. It changes nothing.
- **reflect** sends one transcript to a judgment reviewer, a tooling reviewer, a divergent reviewer, and a synthesizer. Accepted waits for explicit approval. Backlog is filed without waiting. Anything a lint could enforce moves to Backlog, which is `correct`'s territory. Skill edits land in a copy under `.cursor/skills/` or `~/.cursor/skills/`, never under `plugins/cache/`, and never as a PR.

## Prose rules

`unslop` is a numbered catalog with stable ids and deliberate gaps. Rules 1, 2, 4, 6, and 21 are absent so that other skills can keep citing a number after a rule is removed. Rule 13 bans the em dash, the en dash, and parentheses. Rule 14 bans a colon used as a mid-sentence connector. A colon before a list stays.

`technical-writing` picks one Diátaxis mode first. Tutorial, how-to, reference, or explanation. Then it applies Google developer style, Simplified Technical English, and Global English. It may propose an addition to unslop rule 26. It must not edit that skill.

`no-comments` spawns `comment-sicko` over the diff, rejects bad kills, and will not encode a constraint and delete the comment unless the caller approves. `bro` restates the last message in plain language. `in-your-own-words` restates the user's goal. `sharpen` rewrites a prompt and does not do the task. `typescript-best-practices` is the only skill here with a `paths` frontmatter, `**/*.ts` and `**/*.tsx`, and it says to apply type-system-discipline first.

## Not shipped here

The README lists three things the mode skill names that this plugin does not bundle. `/deslop` and the `deslop` skill. `control-cli` for CLIs and TUIs, and `control-ui` for browser, Electron, and web. `/create-skill`, which is a Cursor built-in. Cursor also ships its own babysit skill and its own `/autopilot`. Inside poteto-mode, a PR-status request goes to the Babysit playbook instead. Install `cursor-team-kit` beside pstack for the first three.

The README's reason for having no planning skill is one paragraph. Cursor already has plan mode. The author's own line is that the best spec is code, and that a plan is not the default.

`/automate-me` mines recent transcripts and drafts a `<your-name>-mode` skill that routes through pstack. pstack stays the base.

## What this note does not claim

- The Claude Code generated tree at `harness/pstack/` was not in the checkout.
- `why`'s reference prompts were not opened. The five-step flow is from `skills/why/SKILL.md` only. That file ends at line 98, mid-list, after the recency-bias failure mode.
- The statechart test corpus outputs (`sany.out`, `verdict-*.out`) were not read.
- No skill was executed. No model call was made. No PR was opened.
- Whether `REVIEW_REQUIRED` counting as `READY` is intentional is not stated in the playbook. The watcher code allows it.
## Verification skills

pstack does not ship a verifier for an app. It ships generators that write one into the target repo.

`create-verification-skill` writes `.cursor/skills/verify-<app>/`. The skill has Launch, Doctor, Drive, Evidence, Cleanup, and Helpers. A feature map is the source of the user-facing recipes. Each feature file has four required H2 headings. Sub-features. How to get to it, written from the user's point of view. Driving it with the harness. Gotchas. The bundled example is a fictional Notes app. The generator runs the new skill once before handoff. A skill that was never executed is a draft.

`maintain-verification-skill` rechecks that map. Outcomes are clean, changed, or blocked. It edits only the verify-skill directory. One read-only child per feature, then one live pass the coordinator drives. At most one PR. A product regression is reported, not fixed by editing the map, and the journey is not weakened to make a drive pass.

`create-formal-verification-skill` is for the case tests do not reach. A race, a retry, a state machine, a parser, or unsafe code. It picks one property, then the cheapest tool. TLA+ is the default for a bad event order. A code-level verifier is preferred for an every-input property. Generated tests are the fallback when no verifier runs on the language. The generated skill must catch a scratch change that breaks the property in the real code. That scratch change is then dropped. The property is not weakened to make the current code pass. A check that has never been seen to fail proves nothing. If the check is TLA+, the skill points at `/statechart` by name and does not copy its commands.

`maintain-formal-verification-skill` runs after commits that skipped the recheck. Outcomes per check are in sync, updated, bug, or blocked. A check can be both updated and bug. It edits models, harnesses, properties, and the verify skill. It does not edit product code. After an update that passes, it breaks the new code on purpose, confirms the check catches the break, and drops the break. A green check after the code moved is the case this skill exists for. The old model can keep passing while it describes code that is gone.

## Statechart

`/statechart` is a front end for TLC, not a model checker of its own. `scripts/statechart.ts` takes a `SPEC.tla`, an optional `--config`, an optional `--view`, and an `--out` directory that must be missing or empty. The first run installs TLC and Java through mise and needs the network. `scripts/run.ts` pins the jar to TLC 1.7.4 from the tlaplus GitHub release, with a sha256 checksum in the URL, and pins Java to `java@temurin-25`. Override with `TLA2TOOLS` and `JAVA`. TLC always gets `-workers 1`, `-fp 0`, and `-lncheck final`. The package is private, `@cursor-skill/statechart`, and its only devDependency is `fast-check` 4.5.3. Tests run under `node`. There is no bun dependency in this package. The mode skill's `watch-pr` package is the one that uses bun.

Exit codes. 0 means every rule TLC finished checking holds. 1 means a rule breaks. 2 means an error, a config TLC would refuse, a SANY failure, or a non-empty out directory. Only exits 0 and 1 publish output, by renaming a staged directory. A signal or a file that appears in `--out` during the run writes nothing. `run.ts` maps TLC status 0 to exit 0, and TLC status 11, 12, or 13 to exit 1.

What it checks. Every `INVARIANT`, in every reached state. Every `PROPERTY`, including a temporal one, whose counterexample can be a loop. Deadlock, unless the config sets `CHECK_DEADLOCK FALSE`. A correct end state needs a stutter action, or deadlock checking flags it. A `PROPERTY` with no `[]`, `<>`, or `~>` is checked only in the initial state. The bundled Counter spec shows this for `Low`. The report says so. Quoting "holds" without that sentence overclaims.

What it does not claim. After the first break, each later run stops at 100,000 distinct states (`RERUN_STATES` in `scripts/ir.ts`). Rules not reached are listed under "Rules not checked" and are not marked. They might hold or break. The chart budget is 500 states (`CHART_STATES`). Above that, the chart draws only the bug paths. If nothing broke, there is no `chart.mmd`. The report still gives the count. The drawing run passes `-deadlock`, so deadlock comes only from the verdict runs. A pass is a pass of this model under these constants. The skill tells the agent to replay each bug path against the real code, and to treat a bug that does not occur there as a wrong model until shown otherwise.

The view module supplies the words a person reads. `state()` returns a string for a flat chart, an array for parent states, or an object for parallel regions. Extra exports are rejected. A regions chart that cannot show the model's moves exactly falls back to parent states. A chart state that merges several model states is `breaks` only when every one of them breaks the rule. Otherwise it is `mayBreak`.

## Benny

Benny is two Cursor automations for Slack issue reports. The files under `automations/benny/` are dormant. They do not appear as slash skills, because the Cursor manifest's skills root is `./skills/` only. There is no GitHub-issue trigger in the pack. GitHub is the repo Benny reads and the place a draft PR is opened. A GitHub issue appears only if the configured tracker adapter is GitHub Issues. Linear is the example in the config template.

The trigger is a new top-level message in one configured Slack channel. Triage and reproduce both start on that message. They do not trigger each other. Reproduce waits, up to the configured budget, for one marker line in the original thread from the configured triage identity. The markers are `[benny:bug]`, `[benny:performance]`, and `[benny:other]`. A marker from anyone else is ignored. `SOURCE_CHANNEL_ID` and `SOURCE_THREAD_TS` are frozen. Workers get no Slack credentials. The coordinator is the only Slack poster.

Triage classifies the report as one of bug, performance, feature request, question or feedback, or reroute. It files a tracker issue only when the report is a bug or a performance problem, clearly broken, still live, and not a duplicate. If the verdict post does not land in the source thread, it must cancel the ticket it just created. It does not cross-post. It pings an owner only when the routing map names one and config allows it. The default is off.

Reproduce accepts only a bug or performance marker. It drives the real UI twice, through a control adapter the user supplies. A unit test, a state poke, or a source reading is not a UI repro. If an open PR already plausibly fixes it, Benny verifies that fix and does not open a competing one. A fix proceeds only after a second look at the broken state, a media check, a rejection window, and a named root cause. The patched build must show the broken state gone, twice, on the same path. Then it opens a draft PR. `draft_only: true` in the example config. It never merges and never deploys. "Could not reproduce" is silent in the source channel.

The example budgets in `templates/configuration.example.yaml` are placeholders, not measured limits. Poll 45 seconds. Verdict wait 45 minutes. Triage follow-up 10 minutes, triage total 30. Repro 60. Rejection window 10. Fix 90. Operations follow-up 45. Artifact directory `/tmp/benny-artifacts`, kept 24 hours.

A person still has to act. Point Cursor at `FOR_AGENTS.md` and name the repo. Fill the Slack channel, the triage identity, the tracker, the control skill, and the feature map. Pick model slugs from the models Cursor shows. Setup must not guess. Commit the settings, the copied pack, and secret-free config. Secrets stay out of the repo, including an optional `BENNY_SLACK_BOT_TOKEN`. Explicitly ask before either automation is created. Review and save each one in the Automations editor. Run the harmless thread-safety test before normal traffic. Merge and deploy stay with the person.

## Catch-up and teaching skills

`recall` rebuilds recent context on a topic from the user's own transcripts plus a `git` and `gh` check. The capsule is at most 5 bullets, tagged threads, at most 5 problems, and one next move. `ketchup` is a read-only catch-up since the user's last message. What happened stays under 100 words, and every call waiting on the user is listed so the reply alone is enough to decide. `ketchup-video` is the same catch-up as a silent landscape mp4 of at most 10 slides. `teach` runs `how` and `why`, keeps `why`'s hedges, and explains in one account, diagram by diagram. It does not change code. `make-bot-ui` is a different path from Benny. It builds a local page whose server posts JSON to a Grok Bot webhook. The sender key stays on the server. The user copies it through a secret-request card, never through chat.

## What this note does not claim

- The Claude Code generated tree at `harness/pstack/` was not in the checkout. The README names `scripts/generate-pstack-harness-trees.mjs`, and that script was not in the checkout either.
- `why`'s reference prompts were not opened. The five-step flow is from `skills/why/SKILL.md` only. That file ends at line 98, mid-list, after the recency-bias failure mode.
- The statechart test corpus outputs (`sany.out`, `verdict-*.out`) were not read. The Counter spec, its config, `chart.mmd`, and `report.md` were.
- `regions.ts` and `mermaid.ts` were not read line by line. The region fallback and the label escaping are from the skill text, the pass headers, and `report.ts`.
- No skill was executed. TLC was not run. No Slack message was posted. No PR was opened.
- Whether `REVIEW_REQUIRED` counting as `READY` is intentional is not stated in the Babysit playbook. `scripts/watch-pr/policy.ts` allows it.
- The example Benny budgets are the template's numbers. They are not a measurement of how long a run takes.
