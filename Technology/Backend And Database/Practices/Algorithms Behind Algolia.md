---
area: technology
domain: search-engine
type: note
title: Algorithms Behind Algolia
description: Overview of the algorithms that make Algolia a fast real-time search engine, covering inverted indexes with tries, typo tolerance, ranking, bitset filtering, and index compression.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - search-engine
  - golang
resource: https://viblo.asia/p/cac-thuat-toan-phia-sau-algolia-y3RL1w9P4ao
---

# Algorithms Behind Algolia

> https://viblo.asia/p/cac-thuat-toan-phia-sau-algolia-y3RL1w9P4ao

## Introduction to Algolia

- A real-time search engine
- Prioritizes high performance and extremely low response times

## Indexing: Inverted Index & Trie Optimization

- Uses an inverted index to store the relationship between keywords and documents
- Combined with a Trie to optimize prefix search
- Saves storage space

## Approximate Search (Approximate Nearest Neighbor - ANN)

- Applies techniques such as Levenshtein Distance to measure the distance between words
- Enables approximate search and corrects users' typing mistakes
- Improves search accuracy

## Ranking Formula

- Combines factors such as:
  - ExactMatch: exact match
  - TypoTolerance: tolerance for typos
  - Proximity: how close the words are to each other
  - AttributePriority: attribute priority
  - CustomRanking: custom ranking
- Combines TF-IDF with custom weights to rank search results

## Fast Filtering and Faceted Search

- Uses Bitmasking and BitSet for fast, efficient filtering
- Allows filtering results with AND/OR filters

## Compression & Memory Optimization

- Applies techniques such as:
  - Delta Encoding: encodes the differences between values
  - Front Coding: compresses strings that share a common prefix
  - Numeric Bucketing: groups numeric values
- Reduces index size and optimizes memory
