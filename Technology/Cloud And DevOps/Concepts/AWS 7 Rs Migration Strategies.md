---
area: technology
domain: cloud-migration
type: concept
title: AWS 7 Rs Migration Strategies
description: The AWS 7 Rs migration strategies (rehost, relocate, replatform, refactor, repurchase, retire, retain) and AWS Prescriptive Guidance on large portfolio migrations — move first, modernize later.
timestamp: "2026-10-29T00:00:00.000Z"
tags:
  - technology
  - aws
  - cloud
  - migration
---

# AWS 7 Rs Migration Strategies

AWS defines seven migration strategies, the **7 Rs**, for moving applications to the cloud: **Retire, Retain, Rehost, Relocate, Repurchase, Replatform, Refactor/Re-architect**. The first group settles what should not move at all, and the second gets a workload onto AWS with as little change as possible. Refactor stands apart, because modernization happens during the migration instead of after it, and it is the most complex and costly of the seven. For a large portfolio, AWS guidance prefers rehost, replatform, relocate and retire first, then modernizing once the move is done. Verified against [AWS Prescriptive Guidance, "About the migration strategies"](https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html) on 2026-10-29.

## The portfolio group: decide what not to move

- **Retire** — decommission or archive applications with no business value, or running end-of-support OS/components, to cut maintenance cost and security risk. AWS also flags _zombie_ (< 5% avg CPU/memory) and _idle_ (5–20% over 90 days) applications as retire candidates, plus apps with no inbound connections for 90 days.
- **Retain** — keep in the source environment when not ready to migrate: data-residency compliance, dependencies (other apps must move first), recently upgraded systems (wait for the next technical refresh), no business value, waiting for a vendor SaaS release, specialized hardware with no cloud equivalent, mainframe/mid-range and non-x86 Unix apps.
- **Repurchase (drop and shop)** — replace with SaaS or a cloud-native commercial product to shed infrastructure management. AWS requires a security and compliance assessment **before** purchase; after purchase: train users, migrate data, integrate authentication (e.g. Active Directory), configure networking.

## The move group: get it onto AWS

- **Rehost (lift and shift)** — move the application to AWS with no changes to the application itself. Downtime depends on the **cutover strategy**. Automatable with AWS Transform MGN (formerly MGN/Application Migration Service), Cloud Migration Factory, VM Import/Export.
- **Relocate** — move servers to a cloud version of the same platform (the VMware Cloud on AWS case), or move instances/objects between VPCs, AWS Regions, or AWS accounts — e.g. an Amazon RDS DB instance to another VPC or account. No new hardware, no rewrites, and the overall architecture stays intact; the quickest way to be operating in the cloud.
- **Replatform (lift, tinker, and shift)** — move plus some optimization to use managed/serverless services or upgrade the execution platform. The change can be few or many, depending on business goals and the target platform. Typical example: Microsoft SQL Server → **Amazon RDS for SQL Server**. Other AWS examples: OS upgrades, Graviton, Windows→Linux (.NET Framework → .NET Core), VMs → containers without code changes (App2Container).

## Refactor/Re-architect: the 7th R

Move an application and **redesign its core components** to take full advantage of cloud-native features. It is the most complex and costly strategy because modernization happens _during_ the migration.

**AWS guidance for large migrations:** common strategies are rehost, replatform, relocate, and retire. Refactor is **not recommended** for large migrations — it is hard to manage across many applications. Rehost/relocate/replatform first, then modernize after the migration completes. Refactor during migration only when the other strategies are not an acceptable option to meet business needs.

The documented use cases that justify refactor mid-migration:

- A monolith is already hindering delivery speed or the ability to address customer needs.
- A legacy application nobody knows how to maintain, or whose source code is unavailable.
- The application is hard to test or has very low test coverage, hurting quality and delivery — redesigning lets you raise coverage and add automated testing.
- Security/compliance requires keeping some sensitive database tables (e.g. customer or patient data) on-premises while the rest of the database moves to AWS — the database must be refactored to separate the migrated tables from the retained ones.

## Notes on the VNJUG post this came from

A Vietnamese VNJUG post (2026-10-29) summarizing this topic checks out against the AWS page nearly verbatim: all 7 Rs definitions, the cutover-strategy downtime note for rehost, the RDS-across-VPC relocate example, the SQL Server → RDS for SQL Server replatform example, and all four refactor drivers match. Two minor additions AWS includes that the post omits: _retire_ also belongs to the "common strategies for large migrations" set, and _retain_ lists more use cases (SaaS wait, specialized hardware, mainframe/non-x86, no business value).

Sources: [AWS Prescriptive Guidance — About the migration strategies](https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html), [AWS Migration Strategy Guide](https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-migration/introduction.html). Verified 2026-10-29.
