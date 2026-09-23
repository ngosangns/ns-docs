---
area: technology
domain: pinot
type: case-study
title: Apache Pinot
description: Overview of Apache Pinot, the distributed real-time OLAP database, its indexing optimizations, and how Uber used it to solve job counting at scale.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - pinot
  - olap
  - database
resource: https://viblo.asia/p/job-counting-bai-toan-hoc-bua-ma-uber-giai-quyet-trong-tich-tac-018J2KDRLYK
---

# Apache Pinot

An open-source distributed database created at LinkedIn in the mid-2010s, open-sourced in 2015, and donated to the Apache Foundation in 2019.

## Features

- Designed for real-time data analytics (OLAP - Online Analytical Processing)
- **Scalability**: Scales horizontally by splitting data into partitions and distributing them across many nodes
- **Fast queries**: Uses columnar storage and reads only the columns relevant to a query, minimizing the amount of data to process
- **Real-time processing**: Supports real-time data ingestion and querying with low latency

## Optimization Techniques

- **Inverted Index**: A data structure for fast lookup, like a book's index, that quickly identifies the segment files and rows containing the data for a given value
- **Bloom Filter**: A quick check for whether an element is likely to be in a dataset, letting Pinot skip segment files that do not contain the data being sought and saving time and resources
- **Data Sorting**: Sorts data by frequently queried columns to minimize the number of segment files accessed

## Case Study: Uber Job Counting

- **Problem**: Count each driver's trips over different time ranges (day, week, month) with more than 150 million users and nearly 10 billion trips per year
- **Challenges**:
  - Huge data volume, millions of trips per day
  - Real-time querying and analysis with low latency
  - Data is stored across different servers
- **Solution with Apache Pinot**:
  - Use an inverted index on the `provider_id` and `requester_id` columns to speed up queries
  - Enable a bloom filter per segment file on `provider_id` and `requester_id` to eliminate irrelevant files
  - Sort data by the `provider_id` column so that the trips of one driver on the same day land in the same segment file, reducing the number of files to access
- **Handling request spikes**: Apply "jitter" - add a random interval to the wait time between retries after errors, so requests do not arrive all at once, reducing load on the system
- [Reference](https://viblo.asia/p/job-counting-bai-toan-hoc-bua-ma-uber-giai-quyet-trong-tich-tac-018J2KDRLYK)
- [Uber article](https://www.uber.com/en-VN/blog/job-counting-at-scale/)

## Resources

- [Website](https://pinot.apache.org/)

> **See also:** [SQL Databases](/Technology/Backend And Database/Concepts/Database Types/SQL Databases) · [Sharding Partitioning](/Technology/Backend And Database/Concepts/Techniques And Architecture/Sharding Partitioning) · [Full Text Search](/Technology/Backend And Database/Concepts/Techniques And Architecture/Full Text Search)
