---
area: technology
domain: git
type: resource
title: Git And GitHub
description: Git and GitHub tools, self-hosted servers, hooks and a guide to rewriting history with git filter-repo.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - git
  - github
  - tools
resource: https://github.com/jj-vcs/jj
---

# Git And GitHub

## Resources

- [Git Workflows](/Technology/Tools And Utilities/Practices/Git Workflows): Git workflow models (Trunk Flow, Forking Flow)

## Tools

- jj - A Git-compatible VCS that is both simple and powerful: https://github.com/jj-vcs/jj
- Git FTP: https://github.com/git-ftp/git-ftp

## Self-Hosted Git Server

- https://github.com/charmbracelet/soft-serve
- https://github.com/gogs/gogs

## Git Hooks

- https://github.com/evilmartians/lefthook

## Git for Data

- dolt: https://github.com/dolthub/dolt

## GitHub Actions

- [github-local-actions](https://github.com/SanjulaGanepola/github-local-actions): Tool to run GitHub Actions workflows locally for testing and debugging. #GitHubActions #CI/CD

## Commands

### Git filter-repo

`git filter-repo` is a powerful tool used to **replace `git filter-branch` and BFG Repo-Cleaner**, letting you **manipulate and rewrite a Git repository's history more safely and efficiently**.

#### Main Uses of `git filter-repo`

- **Remove files/directories from the entire Git history.**
- **Change usernames and emails in the commit history.**
- **Move content from one directory into another across the whole history.**
- **Filter commits by certain conditions (content, time, author, etc.).**
- **Split a subdirectory into a separate repository.**

#### Why Use `git filter-repo` Instead of `git filter-branch` or BFG?

| Tool                  | Performance   | Ease of use | Flexibility       |
| --------------------- | ------------- | ----------- | ----------------- |
| `git filter-branch`   | Slow          | Hard        | High              |
| BFG Repo-Cleaner      | Fast          | Easy        | Limited           |
| **`git filter-repo`** | **Very fast** | **Easy**    | **Very flexible** |

#### 📦 Installing `git filter-repo`

```bash
# On a system with pip:
pip install git-filter-repo

# Or from source:
git clone https://github.com/newren/git-filter-repo.git
cd git-filter-repo
make prefix=/usr/local install
```

> **Note**: Back up your repository before using it, because this operation **permanently changes the commit history**.

#### 🔧 Practical Examples

1. **Remove the entire `secrets/` directory from every commit:**

```bash
git filter-repo --path secrets/ --invert-paths
```

2. **Change author names and emails:**

```bash
git filter-repo --mailmap my-mailmap.txt
```

With the contents of `my-mailmap.txt`:

```
Old Name <old@email.com> <==> New Name <new@email.com>
```

3. **Split the `src/projectA` directory into its own repo:**

```bash
git filter-repo --subdirectory-filter src/projectA
```

> **See also:** [Git Workflows](/Technology/Tools And Utilities/Practices/Git Workflows) · [Developer Tools And Environments](/Technology/Tools And Utilities/Tools/Developer Tools And Environments)
