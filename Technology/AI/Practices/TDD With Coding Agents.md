---
area: technology
domain: coding-agents
type: guide
title: TDD With Coding Agents
description: Why forcing strict test-first TDD on a coding agent often costs more than it returns, and what to do instead - outcome feedback loops, regression tests, static-analysis feedback tools, and ATDD on a hexagonal or vertical-slice architecture.
timestamp: "2026-10-21T00:00:00.000Z"
tags:
  - technology
  - coding-agents
  - testing
  - tdd
  - atdd
  - software-architecture
resource: https://arxiv.org/abs/2402.13521
---

# TDD With Coding Agents

Notes from a Vietnamese engineer's post on what changes when TDD moves from a human to an agentic loop. The post's own claims are marked as such below; the sources I could open are cited where they support or complicate them. The comment-linked article the post refers to was not available, so it is not summarised here.

## Why TDD helped humans

- Writing the test first makes you use the class or function before it exists. That forces you to design its interface up front.
- Result: better-designed code, fewer bugs, higher coverage, and a system that is easier to test and extend.

## What goes wrong when an agent must follow TDD (claims from the post)

- **Token cost**: red, green and refactor each add model turns. The post estimates about 3x tokens. This number is the author's estimate, not measured here.
- **Test-after drift**: the agent often writes the test after the feature, which defeats the point of test-first.
- **Test tampering**: the agent sometimes edits the test so it passes instead of fixing the code.
- **Little payoff**: even when the agent follows TDD strictly, the post argues the resulting application is not clearly better.

## What the sources show

- Tampering is a real, observed failure. Kent Beck, in [Augmented Coding: Beyond the Vibes](https://tidyfirst.substack.com/p/augmented-coding-beyond-the-vibes), lists its warning signs while building a B+ Tree with an agent: loops, functionality he did not ask for, and "any indication that the genie was cheating, for example by disabling or deleting tests". He had to watch intermediate results and propose the next test himself (for example "add the keys in the reverse order"). Two earlier attempts stalled under accumulated complexity.
- Beck separates augmented coding from vibe coding: you still care about the code, its complexity, the tests and their coverage.
- Tests given to the model help. [Test-Driven Development for Code Generation](https://arxiv.org/abs/2402.13521) (Mathews and Nagappan, 2024) reports that giving GPT-4 and Llama 3 test cases alongside the problem statement raised success on MBPP and HumanEval. This is function-level benchmark work with human-written tests. It does not show that an agent running a multi-turn red/green/refactor loop on a real codebase pays off.

Read together: tests are valuable as a specification and a check, but making the agent walk the strict TDD ritual is a separate bet, and it has costs.

## Recommended approach (from the post)

1. **Monitor each loop's outcome and feed it back.** Look at what the agent produced, give feedback, and let it loop again and fix. Do not trust the first pass.
2. **Ask for tests, not test-first.** The agent should write tests, but the order does not need to be enforced. Invest in **regression tests** - the long-standing pain of software teams, and the author is still working out how to do this well with agents.
3. **Add more feedback tools.** Static scans, linters and formatters give the agent cheap, deterministic signals that cost far fewer tokens than extra test turns.
4. **Consider ATDD plus hexagonal or vertical-slice architecture.** ATDD (Acceptance Test-Driven Development) has been revived recently. Acceptance tests are written against behaviour at the system boundary, so the agent is free to restructure internals without breaking them.

## Why ATDD and hexagonal fit agents (my reasoning, not from the post)

- An acceptance test describes what the user can do, not how the code is organised. It is harder for the agent to "fix" by editing, because changing it changes the requirement, and that is a visible, reviewable act.
- Hexagonal architecture isolates the core behind ports, so acceptance tests can drive the core through a port with fake adapters. They run fast and need no database or UI. See [Hexagonal Architecture](/Technology/System Design/Practices/AWS Cloud Design Patterns/Hexagonal Architecture) and [Software Architecture](/Technology/System Design/Practices/System Design Notes/Software Architecture).
- Vertical slices keep one feature's code and tests together, so the agent needs less context per task.

## Guardrails against test tampering

- Treat test files as protected: review any diff that touches a test, or mark acceptance and regression tests read-only in the agent's instructions.
- Run the existing suite before the change and compare the set of passing tests afterward, so a deleted or skipped test shows up.
- Keep a human-written acceptance test as the definition of done.

## Related

- [Superpowers](/Technology/AI/Tools/Memory/Superpowers) - a skills framework that makes strict RED-GREEN-REFACTOR TDD the default for agents; the opposite bet to this note.
- [Coding Agents](/Technology/AI/Tools/Agents/Coding Agents)
- [Testing Tools](/Technology/Testing/Tools/Testing Tools)
