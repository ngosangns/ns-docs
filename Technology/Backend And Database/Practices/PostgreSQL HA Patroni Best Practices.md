---
area: technology
domain: patroni
type: resource
title: PostgreSQL HA Patroni Best Practices
description: Best practices for running highly available PostgreSQL with Patroni, PgBouncer, and etcd, including when to use the Ivory management UI versus the CLI.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - patroni
  - postgresql
  - high-availability
  - ivory
resource: https://devops.vn/posts/ivory-bien-viec-quan-tri-postgresql-ha-patroni-tro-nen-nhan-hon
---

# PostgreSQL HA Patroni Best Practices

> - Link: https://devops.vn/posts/ivory-bien-viec-quan-tri-postgresql-ha-patroni-tro-nen-nhan-hon
> - Community opinions on the PostgreSQL + Patroni + PgBouncer + etcd stack
> - An assessment of Ivory and when to use the CLI versus the UI

## Ivory Overview

### What Is Ivory?

**Ivory** is an open-source UI administration tool built specifically for PostgreSQL clusters managed by Patroni. It acts as a **management plane** that simplifies day-to-day operations. It does not fully replace the CLI or monitoring systems such as Grafana.

### Architecture and Installation

- **Backend:** Golang - lightweight and high-performance
- **Deployment:** A simple Docker container
- **Port:** 8080 (default)
- **Authentication:** Secret Word (required), Basic Auth (recommended for production)

```bash
docker run -d \
  -p 8080:80 \
  --name ivory \
  --restart unless-stopped \
  ghcr.io/veegres/ivory:latest
```

## Key Features of Ivory

### Visual Interface

- **Visualization:** Clearly shows Leader/Replica nodes (Sync/Async)
- **Replication Lag:** Displayed in real time from Patroni metadata
- **Switchover/Failover:** Performed from the UI with a single click
- **Scheduled Switchover:** Schedule an automatic Master switchover

### Maintenance Mode

- **Pause:** Freezes the cluster state in the DCS and disables auto-failover
- **Resume:** Returns control to Patroni after maintenance
- **Use Case:** OS patching, minor version upgrades, hardware changes

### Database Maintenance

- **Bloat Detection:** Shows the bloat ratio of tables and indexes
- **Compaction:** Integrates `pgcompacttable` so compaction can be run from the UI
- **Advantage:** Reclaims disk space with minimal locking (unlike `VACUUM FULL`)

### Configuration Management

- **DCS Configuration:** Edit cluster-wide global configuration
- **Local Configuration:** Adjust configuration for each node individually
- **Hot Reload:** Sends a `SIGHUP` signal to reload config without a restart
- **Rolling Restart:** Restarts nodes when necessary

### Query Console

- **Role Awareness:** Distinguishes queries running on the Leader (write) from those on a Replica (read-only)
- **Template Repository:** Saves commonly used troubleshooting statements
- **Use Case:** Checking `pg_stat_activity`, locks, and replication slots

## Stack Architecture - Best Practices

### Recommended Stack

Based on real-world experience from the community:

```
PostgreSQL + Patroni + PgBouncer + etcd
```

**Rationale:**

- **PostgreSQL:** The main database engine
- **Patroni:** The High Availability framework that manages automatic failover
- **PgBouncer:** Connection pooling that reduces connection overhead
- **etcd:** The Distributed Configuration Store (DCS) for Patroni

### Alternative: Autobase

Some teams use **Autobase** with a similar stack and rate it "pretty solid":

- Ships with the required components built in
- Reduces setup and configuration work

## When to Use Ivory vs the CLI

### Ivory Is a Good Fit For

**Daily operations for the dev team:**

- Developers with limited CLI experience
- Visualizing cluster state
- Frequent operations such as switchover and maintenance mode
- A query console with ready-made templates

**Routine tasks:**

- Scheduled switchover
- Centralized configuration management
- Bloat monitoring and compaction
- Quick health checks

### The CLI (Terminal) Remains the Go-To For

**Complex incidents:**

- Deep debugging and detailed log analysis
- Troubleshooting edge cases
- Integration with automation scripts
- Full control over every operation

**Advanced operations:**

- Performance fine-tuning
- Custom monitoring and alerting
- Integration with other tools
- Emergency recovery scenarios

### Best Practice: Hybrid Approach

**Recommendation:**

- **Ivory:** Use for daily operations, monitoring, and routine tasks
- **CLI:** Use for troubleshooting, advanced operations, and incident response
- **Combined:** Use both depending on the situation

## Technical Details - Replication Lag Monitoring

### How Ivory Gets Replication Lag

**Question:** Does Ivory get replication lag directly from the Patroni API, or by querying `pg_stat_replication`?

**Answer:**

- **Mainly from Patroni metadata** (it does not poll the DB directly very much)
- Patroni has already aggregated replication lag information from the nodes
- Load on the database is minimized by reusing existing metadata

### Implications

**Advantages:**

- Less query overhead on PostgreSQL
- Uses data that Patroni has already processed and validated
- Consistent with the state Patroni uses to decide on failover

**Caveats:**

- There may be a slight delay compared with querying `pg_stat_replication` directly
- Depends on how often Patroni updates its metadata

## Consolidated Best Practices

### Architecture

1. **Standard stack:** PostgreSQL + Patroni + PgBouncer + etcd
2. **DCS:** etcd is a popular and stable choice
3. **Connection Pooling:** Always use PgBouncer to optimize connections

### Management Tools

1. **Ivory for daily ops:**
   - Set up Ivory for the dev team
   - Use it for routine tasks and monitoring
   - Keep template queries for common troubleshooting

2. **CLI for advanced work:**
   - Keep CLI skills sharp for incident response
   - Script automation for complex tasks
   - Deep debugging and performance tuning

### Monitoring

1. **Replication Lag:**
   - Use Patroni metadata (as Ivory does) to reduce DB load
   - Query `pg_stat_replication` directly when high accuracy is needed
   - Combine both approaches depending on the use case

2. **Health Checks:**
   - Ivory for quick visual checks
   - CLI/scripts for detailed health monitoring
   - Integrate with Grafana/Prometheus for long-term metrics

### Maintenance

1. **Scheduled Maintenance:**
   - Use Ivory Scheduled Switchover
   - Enable Maintenance Mode before OS patching
   - Document the procedure and test it on staging

2. **Bloat Management:**
   - Monitor bloat regularly through Ivory
   - Use `pgcompacttable` instead of `VACUUM FULL` when possible
   - Schedule compaction during off-peak hours

### Configuration

1. **Centralized Config:**
   - Use Ivory to manage DCS configuration
   - Keep configuration changes under version control
   - Test config changes on staging first

2. **Hot Reload:**
   - Prefer `SIGHUP` reload whenever possible
   - Use rolling restarts only when necessary
   - Coordinate with the team before restarting

## Conclusion

### Summary

- **Ivory** is an excellent UI management tool for PostgreSQL HA with Patroni
- It suits **daily operations** and **dev teams** with limited CLI experience
- **The CLI is still necessary** for complex incidents and advanced operations
- A **hybrid approach** (Ivory + CLI) is the best practice

### Recommendations

1. **Set up Ivory** for production environments
2. **Train the team** on both Ivory and the CLI
3. **Document** commonly used operations and troubleshooting procedures
4. **Monitor** replication lag and health metrics regularly
5. **Test** switchover/failover operations on staging first

### References

- [Ivory GitHub](https://github.com/veegres/ivory)
- [Patroni Documentation](https://patroni.readthedocs.io/)
- [PostgreSQL High Availability](https://www.postgresql.org/docs/current/high-availability.html)
- [DevOps Vietnam - Ivory Article](https://devops.vn/posts/ivory-bien-viec-quan-tri-postgresql-ha-patroni-tro-nen-nhan-hon)

---

**Last Updated:** 2025-01-02  
**Source:** Compiled from the DevOps Vietnam article and community opinions

> **See also:** [ProxySQL Connection Multiplexing](/Technology/Backend And Database/Practices/ProxySQL Connection Multiplexing) · [Vitess Distributed Database Best Practices](/Technology/Backend And Database/Practices/Vitess Distributed Database Best Practices)
