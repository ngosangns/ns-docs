---
area: technology
domain: frontend
type: guide
title: Classroom Lifetime Badge
description: Viclass plan-time chip on the top-left classroom pill. It counts down the owner's session_duration, and on 1 November 2026 the full-round corner classes are uncommitted while the pane-toolbar commit keeps only the placement comment.
timestamp: "2026-11-01T00:00:00.000Z"
tags:
  - technology
  - frontend
  - viclass
  - classroom
---

# Classroom Lifetime Badge

`app-classroom-lifetime-badge` is the plan-time chip in the Viclass classroom. It shows how long the class may still run under the owner's `session_duration`. Checked in `/Users/ngosangns/Github/ryan/viclass` on 1 November 2026, branch `feat/classroom-frontend` (GitButler commit `szqk`, git `1729bb342b`).

The chip is the first group of the top-left pane pill, the presented board's viewport toolbar. Owner and members each get their own variant. The right pane's own-board pill does not render it. The group hides itself when the badge has nothing true to say.

## What it is allowed to say

The clock comes from `expiresAt` on the classroom details `portal.lsession` already returns. The tooltip allowance is `expiresAt` minus the creation time in the first four bytes of the classroom ObjectId, rounded to the minute, so an operator override is included and the plan catalogue is not fetched for the number. Remaining time is whole seconds, rounded up, and never negative. At 10 minutes or less the chip switches to the low tone (`border-sc5 text-sc5`). Above a day the label is `{days}d HH:MM:SS`.

| Viewer | What the chip does |
| --- | --- |
| Owner on a known tier below `PRO` | Countdown button. Click opens the upgrade dialog. |
| Owner on `PRO` with a null `expiresAt` | Infinity sign, same chip size. Tooltip says there is no class time limit. |
| Owner whose tier did not resolve, or a degraded read that looks like `FREE` | Countdown if `expiresAt` is set. No plan line and no upgrade offer. A failed plan read still counts down. |
| Owner who is a guest or unverified | No plan request. A null expiry stays hidden. |
| Member | Countdown only. No upgrade. A null expiry stays hidden, because a member cannot know that the owner is `PRO`. |

A null `expiresAt` is not treated as unlimited by itself. `portal.lsession` also returns null when it could not read the allowance, and that path fails open. The infinity sign needs three facts together: the viewer is the owner, the resolved tier is `PRO`, and `expiresAt` is null. Otherwise the badge stays hidden.

After the owner leaves for pricing and the window focuses again, the badge re-reads the classroom and the tier. The server derives a new `expiresAt` for the same class, so the old countdown must not keep running.

## Corner classes are not in the pane-toolbar commit

The committed HTML, from the earlier "countdown under the logo" work, still uses a tab fused to the top edge on all three variants (infinity, upgrade button, timer):

```html
rounded-b-[10px] border border-t-0
```

That matched the old comment: the chip hung off the logo panel and straddled its bottom edge. Commit `szqk` rewrote only the component comment. The committed hunk is `szqk:vrtm:919d`. The comment now says the chip is the first group of the top-left pill. `git show 1729bb342b` does not touch the HTML.

The working tree changes those three class lines to a normal chip, which fits inside the pill:

```html
rounded-[10px] border
```

`but diff` on 1 November 2026 shows that as the whole uncommitted diff of the HTML file, id `yskk`:

| Hunk | Lines | Change |
| --- | --- | --- |
| `yskk:5ce2` | infinity span | drop `rounded-b` and `border-t-0` |
| `yskk:85c1` | upgrade button | same |
| `yskk:4257` | timer span | same |

The paste's ids (`ys`, `szq:ys:4`, `szq:ys:5`, `szq:ys:8`, `vr:9`) were an earlier shortening of the same split. GitButler ids change when the workspace changes. `szq` is `szqk`. `vr:9` is `szqk:vrtm:919d`. The `.ts` file is not in the uncommitted list.

`szqk` does not contain the corner restyle. Putting the three hunks back is an amend into that commit, not a new commit:

```bash
but amend --target szqk yskk:5ce2 yskk:85c1 yskk:4257
```

`but amend --target szqk yskk` amends the whole file, which on this date is the same three hunks. Re-check the ids with `but diff yskk` first. This note did not amend or discard anything. `but discard yskk` would throw away the full-round chip and leave the fused tab in the tree.
