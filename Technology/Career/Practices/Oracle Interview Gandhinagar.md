---
area: technology
domain: interview
type: case-study
title: Oracle Interview Gandhinagar
description: A three-round Oracle interview experience in Gandhinagar, India, with the puzzles, Java, SQL, and string problems asked in each round.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - interview
  - oracle
  - java
---

# Oracle Interview Gandhinagar

**Location**: Gandhinagar, Gujarat, India  
**Overview**: 3 interview rounds (2 rounds on the same day, 1 the following week)  
**Overall difficulty**: 8/10

## Round 1 - General Knowledge

- **Duration**: 60-75 minutes
- **Date**: 9/5
- **Difficulty**: 7.5/10
- **Content**:
  - **Logic puzzle**: Arrange 4 pairs of socks with different distances between the two socks of the same color
  - **Java - Reverse words**: Keep the positions of the spaces unchanged
    - Input: "Hello Param How are You Welcome to oracle"
    - Output: "olleh maraP woH era uoY emocleW ot elcaro"
  - **Java - Sliding Window**: Find the longest substring without repeating characters
    - Input: "abcdba" → Output: "abcd"
  - **Math**: Compute the number of handshakes among N people
    - Formula: n \* (n - 1) / 2
  - **SQL**: Find the department with the second-highest salary (3 tables: Employee, Department, Salary)
  - **Advanced SQL**: Find the second-highest salary without window functions, limit, or offset

## Round 2 - Java & System Design

- **Duration**: 60 minutes
- **Date**: 9/5
- **Difficulty**: 8/10
- **Content**:
  - **Java OOP**: Method overriding and its real-world uses
    - Examples of inheritance, abstraction, encapsulation, polymorphism
  - **Multi-threading & ExecutorService**: Design an ATM system
    - Support multiple users withdrawing concurrently
    - Ensure synchronization
    - Check the balance before withdrawing
  - **String processing**: Find the greatest distance between two occurrences of a repeated word
    - Input: A string in which the word "Param" appears multiple times
    - Based on the first and last index of the word

## Round 3 - Algorithms & Advanced String Processing

- **Duration**: 1 hour
- **Date**: 11/5 (Monday)
- **Difficulty**: 8.5/10
- **Content**:
  - **Date handling**: Add days without using Java libraries
    - Input: "09-May-2025", n = 30 → Output: "08-Jun-2025"
    - Handle it yourself: days per month, leap years, converting string → date
  - **String**: Find the longest common prefix
    - Input: ["automatic", "auto", "autonomous"] → Output: "auto"
  - **Matrix traversal**: Traverse a matrix in a "zig-zag + return" pattern
    - 4x4 matrix, traverse from [0,0] in the pattern, then come back along the last row and first column
    - Output: 1, 2, 6, 7, 11, 12, 16, 15, 14, 13, 9, 5
  - **Logic puzzle**: Find the winner of a table tennis match
    - 3 players, the winner keeps playing
    - Based on the number of matches and the last consecutive winner (Player 2 won 7 matches)

## Summary

### Strengths

- Varied questions: logic, algorithms, string processing, dates, multi-threaded systems
- Friendly interviewers who are open to sharing
- Highly academic, thought-provoking

### Preparation Advice

- Review core Java (basic and advanced)
- Practice string-processing problems and puzzles
- Get familiar with multi-threading & ExecutorService
- Train your logical thinking and your ability to explain clearly

> **See also:** [Amazon SDE Interview](/Technology/Career/Practices/Amazon SDE Interview) · [Fresher Java Interview](/Technology/Career/Resources/Fresher Java Interview) · [Coding Interview Resources](/Technology/Career/Resources/Coding Interview Resources)
