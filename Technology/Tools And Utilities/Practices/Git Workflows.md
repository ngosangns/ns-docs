---
area: technology
domain: git
type: guide
title: Git Workflows
description: Introduction to and comparison of the Trunk-based Development and Forking Workflow models for managing a Git project.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - git
  - tools
---

# Git Workflows

In Git, two popular models for managing a project's workflow are **Trunk-based development (Trunk Flow)** and the **Forking Workflow (Forking Flow)**. Below is a **detailed introduction and comparison** of the two.

## Trunk Flow (Trunk-based Development)

Trunk Flow is a development model in which all developers work **directly on a single main branch** (usually `main` or `master`). Side branches (feature branches) are typically created temporarily and merged back as early as possible.

### Process

1. Each developer creates a feature branch from `main`.
2. Keep the work short, ideally under a few days.
3. Merge back into `main` early (usually by squash or rebase).
4. CI/CD can be used to verify before merging.

### Advantages

- Clean, linear Git history.
- Easy to integrate continuous CI/CD.
- Encourages frequent, quick code review.
- Suitable for small to medium teams.

### Disadvantages

- Requires a high degree of synchronization within the team.
- Merge conflicts are likely when many people work at once.

## Forking Flow (GitHub Flow / Forking Workflow)

Each developer works on **their own copy (fork)** of the main repo. When finished, they submit a Pull Request (PR) to merge into the original (upstream) repo.

### Process

1. The developer forks the main repo into their own copy.
2. Create a branch from the fork → work → commit.
3. Push to the fork → open a Pull Request to the original repo.
4. The main repo's maintainer reviews and merges the PR.

### Advantages

- High security (very well suited to open source).
- Lower risk for the main repo because nobody pushes to it directly.
- Makes it easy to collaborate with outsiders (contributors).

### Disadvantages

- Continuous CI/CD is hard to set up without explicit configuration.
- More complex workflow: you need to sync with upstream.
- Pull requests can go stale if the fork is not actively updated.

## Trunk Flow vs Forking Flow

| Criterion             | **Trunk Flow**                           | **Forking Flow**                              |
| --------------------- | ---------------------------------------- | --------------------------------------------- |
| Main goal             | Development speed, fast CI/CD            | Security, control over the community          |
| Used for              | Internal projects, small to medium teams | Open-source projects, external contributors   |
| Development style     | Short branches, fast merges              | Work on a fork, send PRs to the original repo |
| Complexity            | Simple                                   | More complex, requires syncing the fork       |
| Branch structure      | Few branches, usually `main` + `feature` | Each person uses their own fork               |
| Risk to the main repo | Higher (people push directly)            | Lower (only maintainers can merge)            |
| Ease of CI/CD         | ✅ Very easy to integrate                | ❌ Needs extra setup                          |

## Conclusion

| You should use   | If...                                                                                                   |
| ---------------- | ------------------------------------------------------------------------------------------------------- |
| **Trunk Flow**   | You work in an internal team and want fast CI/CD rollout and a clear Git history.                       |
| **Forking Flow** | You develop an open-source project, collaborate with strangers, and need to control access permissions. |

> **See also:** [Git And GitHub](/Technology/Tools And Utilities/Tools/Git And GitHub) · [Developer Tools And Environments](/Technology/Tools And Utilities/Tools/Developer Tools And Environments)
