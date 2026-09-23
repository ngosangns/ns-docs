# Sections

- [Distributed Cache](Technology/Backend%20And%20Database/Practices/Distributed%20Cache/index.md)

# Concepts

- [1M CCU System Optimization](Technology/Backend%20And%20Database/Practices/1M%20CCU%20System%20Optimization.md) - Summary and best practices for optimizing a system serving 1M+ concurrent users, covering custom trace IDs, async rate limiting with Kafka and Flink, minimal Go architecture, and community Q&A.
- [1M RPS Voucher System](Technology/Backend%20And%20Database/Practices/1M%20RPS%20Voucher%20System.md) - Case study of issuing vouchers at 1M req/s by pre-distributing them into pod RAM, with the trade-offs and the comment Q&A on fraud, Redis HA, and history.
- [Algorithms Behind Algolia](Technology/Backend%20And%20Database/Practices/Algorithms%20Behind%20Algolia.md) - Overview of the algorithms that make Algolia a fast real-time search engine, covering inverted indexes with tries, typo tolerance, ranking, bitset filtering, and index compression.
- [Database Connection Pooling](Technology/Backend%20And%20Database/Practices/Database%20Connection%20Pooling.md) - Explains why a database connection is an expensive OS process, how connection pools work, and how to size a pool using Little's Law, Kingman's formula, and the process-to-core ratio.
- [OceanBase Alibaba Singles Day](Technology/Backend%20And%20Database/Practices/OceanBase%20Alibaba%20Singles%20Day.md) - Case study of how OceanBase handled Alibaba's 11.11 Singles Day peak of 544,000 TPS, covering its architecture, LSM-tree storage, Paxos replication, and trade-offs.
- [PostgreSQL HA Patroni Best Practices](Technology/Backend%20And%20Database/Practices/PostgreSQL%20HA%20Patroni%20Best%20Practices.md) - Best practices for running highly available PostgreSQL with Patroni, PgBouncer, and etcd, including when to use the Ivory management UI versus the CLI.
- [ProxySQL Connection Multiplexing](Technology/Backend%20And%20Database/Practices/ProxySQL%20Connection%20Multiplexing.md) - How ProxySQL connection multiplexing lets many frontend connections share few MySQL backend connections, when it is disabled, and how to tune it.
- [Vitess Distributed Database Best Practices](Technology/Backend%20And%20Database/Practices/Vitess%20Distributed%20Database%20Best%20Practices.md) - Community-derived best practices for Vitess MySQL sharding, covering cross-shard transactions, CDC and the outbox pattern, distributed transaction patterns, and deployment.
