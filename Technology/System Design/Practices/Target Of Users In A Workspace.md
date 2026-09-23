---
area: technology
domain: workspace-targets
type: note
title: Target Of Users In A Workspace
description: Glossary of concepts and formulas for a workspace target and points system, such as goals, scenes, outputs, achievements, and working-day adjusted goals.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - workspace-targets
  - glossary
---

# Target Of Users In A Workspace

## Concepts

### Other

- **Total working days in month**: the default number of working days for a user in a month (excluding holidays, days off, and overtime days)
- **Net working days all-inclusive**: the actual number of working days for a user in a month

### Target

- **Target**: the objective to be achieved
- **Goal**: the number of points for a target

### Scene

- **Scene**: a task a user needs to complete
- **Total Points**: the points that can be earned after completing one task (scene)

### Target & Scene

- Contribution Ratio: the percentage of the work a user contributes toward completing a task

### Target & Scene Period (Month)

- **Unlocked Points**

### Target Period (Month)

- **Total Output**: the default number of points a user earns by completing tasks in a period (currently a month). Points earned reset to 0 at the end of each period
- **Expected Output**: the number of points a user would earn if they completed all the tasks registered in a period (currently a month)
- **All-inclusive Goal**: the points needed to reach a target. It differs in that it varies per user (based on the number of working days in their period)
- **Levels unlocked** (multi-level target)
- **Levels expected to unlock** (multi-level target)
- **Achievement**: the points a user actually receives for completing tasks in a period (currently a month). It is based on the user's **Total Output** and **Net working days all-inclusive**, and varies per user
- **Expected Achievement:** the points a user would actually earn if they completed all the tasks registered in a period (currently a month). It is based on the user's **Expected Output** and **Net working days all-inclusive**, and varies per user
- **Planned Output**

| Group                         | Name                           | Code                  | Formula                                                       |
| ----------------------------- | ------------------------------ | --------------------- | ------------------------------------------------------------- |
| Other                         | Total working days in month    | workingday            |                                                               |
| Other                         | Net working days all-inclusive | net_workingday        |                                                               |
| Target                        | Goal                           | goal                  |                                                               |
| Scene                         | Total Points                   | target_point          |                                                               |
| Target & Scene                | Contribution Ratio             | contribution_ratio    |                                                               |
| Target & Scene period (month) | Unlocked Points                | collected_point       |                                                               |
| Target period (month)         | Total Output                   | total_collected_point |                                                               |
| Target period (month)         | Expected Output                | total_pending_point   |                                                               |
| Target period (month)         | Levels unlocked                | unlocked_level        |                                                               |
| Target period (month)         | Levels expected to unlock      | expected_level        |                                                               |
| Target period (month)         | All-inclusive Goal             | adjusted_goal         | goal / workingday \* net_workingday                           |
| Target period (month)         | Achievement                    | achievement           | total_collected_point / adjusted_goal                         |
| Target period (month)         | Expected Achievement           | expected_achievement  | (total_collected_point + total_pending_point) / adjusted_goal |
| Target period (month)         | Planned Output                 | planned_output        | adjusted_goal \* net_workingday / net_workingday              |

> **See also:** [Task Scheduler System Design](/Technology/System Design/Practices/Task Scheduler System Design)
