---
area: technology
domain: algorithms
type: guide
title: Algorithm Development
description: Guide to choosing an algorithm by its essential properties, finding program errors with well-built test sets, and optimizing a working program.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - algorithms
  - testing
  - optimization
---

# Algorithm Development

## Table of Contents

- [Choosing an Algorithm](#choosing-an-algorithm)
- [Finding Program Errors](#finding-program-errors)
- [Optimizing the Program](#optimizing-the-program)

## Choosing an Algorithm

### Properties of an Algorithm

- **Unambiguity**:
  - Algorithms are classified into two kinds:
    - **Deterministic**: The same input always produces the same output. The result does not change across runs. Example: a function that computes the sum _a + b_
    - **Randomized**: The same input may produce a different result on each run. Example: a function that picks a random number between _a_ and _b_
  - An algorithm belongs to exactly one of these two kinds
- **Termination**: The algorithm must not fall into an infinite process; it must stop and produce a result after a finite number of steps
- **Correctness**: After executing all the steps of the algorithm as defined, we must obtain the desired result for every possible input. The result is verified against the requirements of the problem
- **Generality**: The algorithm must be easy to adapt to any problem in a class of problems and be able to work on different data
- **Feasibility**:
  - **The size must be small enough**: For example, an algorithm has zero efficiency if the memory it requires exceeds the storage capacity of the computer system
  - **The algorithm must be convertible into a program**: For example, an algorithm that requires representing irrational numbers with absolute precision is not realistic on today's computer systems
  - **The computer must be able to execute the algorithm within an acceptable time**, which differs from a mathematical solution (which only needs to be proven to finish in a finite number of steps). For example, scheduling a semester's timetable cannot take a computer until the next semester to produce

## Finding Program Errors

- There are three kinds of errors:
  - **Syntax errors**: The most common but easiest to fix; a solid grasp of the programming language is enough. Someone who cannot fix syntax errors is considered unable to program
  - **Implementation errors**: The implementation does not faithfully express the intended algorithm. For these, review the program as a whole and use debugging tools to correct it
  - **Algorithm errors**: The rarest but most dangerous. If minor, the algorithm must be adjusted; if severe, the flawed algorithm may have to be discarded entirely and redone from scratch
- Building test sets:
  - Test sets should be stored in text files
  - Start with small tests that can be made by hand
  - Next, make tests containing special values, the ones that are easy to get wrong
  - Test sets must be diverse, avoiding repetition of similar tests
  - Include a few large tests to check the program's endurance
  - Note that a program passing all tests does not mean it is correct, because we may simply not have built a test that makes it fail

## Optimizing the Program

- A program that runs correctly is not necessarily finished; some details should be revised so it runs faster and more efficiently. Typically, before testing, aim to write the program as simply as possible, as long as it produces the correct result. Then, when optimizing, review the poorly written parts and optimize the code to be shorter and faster. Do not optimize as you write, because optimized code tends to be complex and hard to control
- Optimization should be guided by the following criteria:
  - **Reliability**: After each optimization step, verify that the algorithm still runs as intended
  - **Flexibility**: The program must be easy to modify. Few programs are perfect when first written and most need revising; a program that is easy to modify reduces the programmer's effort during development
  - **Clarity**: The program must be easy to read and understand, so that after a long time you can still read it, find errors (if any), and improve it. Clarity depends heavily on programming tools and coding style
  - **Efficiency**: The program must run fast and use little memory, saving both space and time. An efficient program requires a good algorithm and some programming tricks. However, applying too many tricks can make the program convoluted and hard to modify. Efficiency should stop at an acceptable level and matters less than the three criteria above, because hardware advances quickly and efficiency requirements need not be too heavy

> **See also:** [Problem Solving Approaches](/Technology/Algorithm/Concepts/Approaches/Problem Solving Approaches) · [Enumeration Problems](/Technology/Algorithm/Concepts/Approaches/Enumeration Problems) · [Big O Notation](/Technology/Algorithm/Concepts/Big O Notation)
