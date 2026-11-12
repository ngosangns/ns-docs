---
area: technology
domain: database-migration
type: guide
title: Zero-Downtime Database Migration
description: Michiel Rook's May 2019 expand and contract sequence for renaming a column while two application versions share one database, and the locks, backfill races, and tool limits that sequence does not remove.
timestamp: "2026-11-12T00:00:00.000Z"
tags:
  - technology
  - database
  - migration
  - postgresql
  - mysql
resource: https://speakerdeck.com/mrook/database-schema-migrations-with-zero-downtime-continuous-lifecycle-london-2019
---

# Zero-downtime database migration

A rolling deploy runs the old build and the new build at the same time. Both talk to one database. A migration that renames, drops, or tightens a column for the new build breaks the old build at that moment. Michiel Rook's deck "Database schema migrations with zero downtime", Continuous Lifecycle London, 14 May 2019, splits that change into releases that stay compatible with the previous build.

The deck is the source for the column rename, the Flyway transcript, and the `pt-online-schema-change` steps below. Checked from the slide text on Speaker Deck on 12 November 2026. A circulated Vietnamese summary follows that deck closely and overstates a few limits. Those corrections are in the sections below. The deck does not state a year count for Rook's career, so this note does not either.

## Why the stop and migrate flow fails

The deck opens on continuous deployment, a slide that says "50+ deploys per day", and high availability. That "50+" is a slide title. It is not a measurement from a named system. A different talk on his site describes one project moving from manual releases every two weeks to 30 automated deploys a day. Do not merge those two numbers.

The failure mode is on the slides. App 1.0 expects database 1.0. The migration produces database 2.0. During the rollout, app 1.0 and app 2.0 both run. One of them expects a schema the database no longer has. The rule on the next slides is that the old app should work with the new database state. That is what makes "one build back" possible, including `git revert HEAD`.

The move is to decouple the migration from the deployment. Each database change is non-destructive until a later cleanup. The deck's examples of non-destructive work are adding a table, adding a column, and sometimes creating an index.

## Expand, then contract

[Parallel change](https://martinfowler.com/bliki/ParallelChange.html), also called expand and contract, is Danilo Sato's 13 May 2014 note on martinfowler.com. Expand the interface so the old and new forms both work. Migrate callers. Contract by removing the old form. Rook applies that name to a column rename.

The example renames `surname` to `last_name` on `person`. The deck numbers six moves. Each move has to ship before the next one, because only the previous build is guaranteed to still work.

1. Add the column. The slide is `ALTER TABLE person ADD last_name VARCHAR(255)`. There is no `NOT NULL`, so existing rows get null and the old build does not have to supply a value.
2. Write both columns. `setLastName` assigns `lastName` and `surname`.
3. Read the new column and fall back. `getLastName` returns `lastName` when it is set, and `surname` otherwise.
4. Copy old rows. The slide is `UPDATE person SET person.last_name = person.surname WHERE person.last_name IS NULL`.
5. Read only the new column. `getLastName` returns `lastName`.
6. Remove the old column and the code that still mentions it.

The old build ignores `last_name` only if its statements name columns. An `INSERT` that lists values by position, or a `SELECT *` mapped by position, breaks when a column appears. The slide does not show that case.

Do not drop `surname` in the same release that stops writing it. The previous build still uses `surname`. Dropping it removes the one-build rollback the deck is aiming at. The contract belongs in a later release, after every running process, job, and rollback target has moved off the old column.

Setting `NOT NULL` on `last_name` is not on these slides. Treat it as its own later change. The [PostgreSQL 18 ALTER TABLE notes](https://docs.postgresql.tw/18/reference/sql-commands/sql-altertable) say adding `NOT NULL` scans existing rows and does not rewrite the table. `ALTER TABLE` still takes `ACCESS EXCLUSIVE` unless the subform says otherwise, so that scan is a separate risk from the rename.

## What an added column actually locks

The summary says a nullable column add does not lock the table. The 2019 slides do not say that. They list "adding columns" under non-destructive changes.

PostgreSQL's `ALTER TABLE` takes `ACCESS EXCLUSIVE` unless the subform says otherwise. `ADD COLUMN` is not one of those exceptions in the [PostgreSQL 16 notes](https://www.postgresql.org/docs/16/sql-altertable.html), read 12 November 2026. That lock conflicts with every other lock, including the `ACCESS SHARE` lock a `SELECT` takes. The lock is often short, and it still waits for transactions that already hold any lock on the table. Queries that arrive while it waits queue behind it.

The same notes say a non-volatile `DEFAULT`, or no default at all, is stored in metadata and does not rewrite the table. Null is the default when you omit one. A volatile default rewrites the table and its indexes. Changing a column type rewrites them too. "No rewrite" and "no lock" are different claims. The first is often true. The second is not.

The Flyway sample output on the deck names MySQL 5.7. The 5.7 manual URL opened here resolved to the current manual, so this note does not quote a 5.7 lock matrix. The current manual's column table lists adding a column as instant and metadata-only, with limits. Instant add cannot be combined with other actions that lack the instant algorithm. It does not apply to `ROW_FORMAT=COMPRESSED`, a table with a `FULLTEXT` index, the data dictionary tablespace, or a temporary table. Concurrent DML is not allowed when the new column is auto-increment. The [online DDL limitations](https://dev.mysql.com/doc/refman/26.10/en/innodb-online-ddl-limitations.html) page still says the operation can take an exclusive metadata lock during execution and always takes one in the final phase, while it updates the table definition. A transaction that already holds a metadata lock blocks that phase.

## The backfill loses updates the fallback still hides

Step 2 lives in the new build. Until that rollout finishes, old processes write only `surname`. If the `UPDATE` has already copied a row, a later write from the old build changes `surname` and leaves `last_name` stale. The same `UPDATE` will not touch that row again, because `last_name` is no longer null.

While the read path still falls back, some requests return `surname` and some return the stale `last_name`. After step 5 removes the fallback, the stale value is the one callers see.

Run the copy only after every writer is on the dual-write build. Run it again after the old build is gone, and stop when a pass changes zero rows. A trigger that copies `surname` to `last_name` covers writers you do not control. The deck does not show the trigger or the second pass. It does list long migrations, failures and restarts, memory, cleanup, logging, and nullable types as the hard part of background work. The single `UPDATE` on the slide is the illustration. On a large table it is also the statement that holds row locks and writes a new version of every copied row. Chunk it by primary key, and pause between chunks.

## Flyway records scripts

The deck's worked example is Flyway Community Edition 5.0.7 against MySQL 5.7. The command `flyway migrate` creates `flyway_schema_history` and stores the version, script name, checksum, and success flag. A legacy database starts with `flyway baseline` instead of replaying a snapshot as version 1. The same section lists repeatable migrations, Java migrations, callbacks, and the pro edition.

That table answers "which scripts have run". It does not make a script compatible with the old build. A rename written as one versioned file still breaks the rolling deploy. Liquibase is a separate changelog tool. The transcribed slides do not name it.

The deck also asks "roll back or roll forward?" and "restoring from backups?" next to destructive changes. The compatibility rule is the practical answer those slides set up. You revert the application build. You do not restore an older database backup over live data, because every write after that backup is gone. The slides do not use the phrase "fix forward". They also do not show a failed migration repaired by a follow-up script. Keeping each step compatible is what makes the application rollback real.

## A rewrite still needs a copy tool

`pt-online-schema-change` is the large-table tool on the deck. The four steps match the [Percona Toolkit overview](https://docs.percona.com/percona-toolkit/pt-online-schema-change.html). Create a new table. Add triggers on the original table so changes during the copy land on the new table. Copy rows in chunks. Finish with an atomic `RENAME TABLE`, then drop the original table.

The slide command is `pt-online-schema-change --execute --alter "add index name_idx (name)" D=test,t=test1,h=localhost`.

The copy needs a second full table on disk, plus room for the triggers' extra writes. The overview says the tool will not work if the table already has triggers. It refuses to alter a table that foreign keys reference, unless you pass `--alter-foreign-keys-method`. `rebuild_constraints` updates child tables so their keys point at the new table. `drop_swap` drops the original and then renames, which is riskier. A Percona post from 7 June 2019 describes those two methods, and a 12 April 2023 post warns against leaving the choice on `auto`. The swap is a brief metadata lock, not a lock-free rename. Plan disk, triggers, and foreign keys before treating the tool as the way through a large `ALTER`.

## Other paths on the same deck

The summary stops at the column rename and `pt-online-schema-change`. The deck continues.

For documents, Rook shows two shapes in one collection, `surName` at version 1 and `lastName` at version 2, then "migrate during read". The background-script link on the slide is `emirotin/mongodb-migrations`.

For a change he does not want on the live primary, the slides migrate a MySQL replica. `STOP SLAVE SQL_THREAD`, run the `ALTER` on the replica, `START SLAVE SQL_THREAD`, then `CHANGE MASTER` and repeat on the former primary. The `ALTER` in that picture is `DROP COLUMN surname`. The slides do not discuss what the SQL thread does if events from the old primary still name the dropped column. Treat that sequence as a picture of failover, and prove the event stream against the new schema before you promote.

The deck also separates writes onto a commit log and replays that log to build a new read database, under the CQRS heading. The test picture is smaller. Spin up an empty database, run the migrations, and assert the result, then repeat on staging.

The closing slides are planning, multiple steps, and no breaking changes. The safety is the order of those steps. Flyway and `pt-online-schema-change` do not replace it.
