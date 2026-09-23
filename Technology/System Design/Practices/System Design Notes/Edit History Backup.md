---
area: technology
domain: version-control
type: note
title: Edit History Backup
description: Community discussion on storing document edit history using versioned diffs with periodic full snapshots, plus comparisons to persistent segment trees, ropes, and git blobs.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - system-design
  - version-control
  - database
---

# Edit History Backup

:)) With the constraints on scale and reload time I don't dare to weigh in, since the projects I've worked on weren't that strictly large, but I'd still like to contribute a little.

- Idea for handling it:
  - Call the first version version 1 – fullSave 1
  - For each subsequent edit, store the edit content and edit position in a version table
  - Set a rule: when the user leaves the document, or after some number of edits (5, 10, ...), or when the amount of change is large enough, create a new fullSave that includes the earlier edits
  - One change is counted on each autosave or manual user save (if autosave runs every 5s, just count autosaves)

- In the database, there are 2 tables:
  - 1. The basic document information (id (PK), current version (FK), subject, owner, times, etc.)
  - 2. The version information table, which contains:
    - version id (PK)
    - original document id (FK)
    - previous version id (depending on the id rule – if ids are based on the original document id it isn't needed, but it costs an extra step to work out the previous version)
    - change: a link to a JSON file containing information such as (change type: modify, add, delete; change position; change content) OR some other content format, but I find JSON works better and has helper functions that are quick
    - fullSave version id: id of the most recent fullsave version
    - fullsave content: the complete current content of the document; if the rule for creating a fullsave hasn't been met yet, this is null
    - other information: edit time, who edited, ...

- To reconstruct a version that isn't a fullsave, use the id of the nearest fullsave version and the previous version ids (which is why each version stores its previous version id)

- For the cache strategy, store the most recent fullsave version and the change versions, until another fullsave is created

---

I'm mostly here to learn from everyone and don't know much about system design. But I do know a bit about algorithms: when I studied the Persistent Segment Tree – a kind of segment tree – when there is a change at a node, you don't copy the old nodes exactly into the new ones; instead you only create new nodes for the parts that differ, and the identical parts still point back to the old nodes. That's just a tiny bit of information. I hope reading this idea gives you all some ideas.

![](/Attachments/9e0f1a2b-3c4d-5e6f-7081-92a3b4c5d6e7.png)

Text editors usually use the Rope data structure, though in practice it's customized to support many features such as change detection, diffing, etc.

I've read about git internals, and git works on this same mechanism: changed content is recorded in blobs.

> **See also:** [Technical Solutions](/Technology/System Design/Practices/System Design Notes/Technical Solutions) · [3 2 1 Backup Strategy](/Technology/System Design/Practices/3 2 1 Backup Strategy)
