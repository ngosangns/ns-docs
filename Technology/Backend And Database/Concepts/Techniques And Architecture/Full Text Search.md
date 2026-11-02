---
area: technology
domain: full-text-search
type: guide
title: Full Text Search
description: Summary of how full-text search works (inverted index, stop words, stemming, relevance ranking) and its support in MySQL.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - full-text-search
  - database
resource: https://viblo.asia/p/fulltext-search-trong-mysql-ap-dung-scout-va-algolia-07LKXNLElV4
---

# Full Text Search

Full-text search finds text that matches a string on one or more chosen columns. MySQL stores that lookup in a FULLTEXT index. That index is used on CHAR, VARCHAR, or TEXT columns. This note uses an inverted index. The index maps each term to the records that contain it.

The note lists natural-language search, phrase search, and boolean search. Boolean mode uses plus and minus to decide which words come back. Stop words are ignored, and stemming is supported. Results are ranked by relevance. A closer match gets a higher rank. MySQL supports this on MyISAM and on InnoDB since 5.6.

- Uses an inverted index
- Supports natural-language, phrase, and boolean search
- Ignores stop words and supports stemming
- Ranks results by relevance scoring
- MySQL: supported by MyISAM and InnoDB (since 5.6)
- [Reference](https://viblo.asia/p/fulltext-search-trong-mysql-ap-dung-scout-va-algolia-07LKXNLElV4)

The linked article applies that search with Laravel Scout and Algolia.

> **See also:** [Storage Engines](/Technology/Backend And Database/Concepts/Core Concepts/Storage Engines) · [MySQL](/Technology/Backend And Database/Tools/MySQL) · [PostgreSQL](/Technology/Backend And Database/Tools/PostgreSQL)
