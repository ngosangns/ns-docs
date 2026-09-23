---
area: technology
domain: combinatorics
type: guide
title: Enumeration Problems
description: Covers arrangements, combinations, and permutations, the generation method with lexicographic order, and backtracking with branch and bound for enumerating configurations.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - combinatorics
  - algorithms
  - backtracking
---

# Enumeration Problems

## Table of Contents

- [Arrangements, Combinations, Permutations](#arrangements-combinations-permutations)
- [The Generation Method](#the-generation-method)
- [The Backtracking Algorithm](#the-backtracking-algorithm)

## Arrangements, Combinations, Permutations

- **Number of k-arrangements with repetition of a set of _n_ elements: $n^k$**
  - Example of one k-arrangement with repetition: $112(k=3)$
- **Number of k-arrangements without repetition of a set of _n_ elements:**
  $$
  n(n-1)(n-2)...(n-(k+1))=\frac{n!}{(n-k)!}
  $$
  - Example of one k-arrangement without repetition: $123(k=3)$
- **Permutation: the number of k-arrangements without repetition of a set of _n_ elements when $k=n$**
  - Example of one permutation: $1234(n=k=4)$
- **Combination: a k-combination of a set X of _n_ elements is a collection Y of subsets, where each subset has _k_ elements**
  - The permutations of a subset in _Y_ are exactly the k-arrangements without repetition of the set _X_
  - The number of permutations of a subset in _Y_ is $k!$
  - Number of subsets in _Y = (number of k-arrangements without repetition of set X / $k!$)_
  - Example of one subset in _Y_: $(1,2,3)=(3,2,1)$

---

## The Generation Method

- Generation algorithm:
  ```
  〈Build the first configuration〉;
  repeat
  〈Output the current configuration〉;
  〈From the current configuration, generate the next one if any remain〉;
  until 〈no configurations left〉;
  ```
- The result of the generation method is called a **dictionary** (lexicographic listing)
- A total lexicographic order is a dictionary in which each result is greater than the previous one; it must satisfy the following requirements:
  - **Totality**: Either _a ≤ b_ or _b ≤ a_
  - **Reflexivity**: _a ≤ a_
  - **Antisymmetry**: If _a ≤ b_ and _b ≤ a_ then _a = b_ must hold
  - **Transitivity**: If _a ≤ b_ and _b ≤ c_ then _a ≤ c_
- Comparing two sequences lexicographically:
  - Let _a[1..n]_ and _b[1..n]_ be two sequences of length _n_, where the elements of _a_ and _b_ already have a total order _≤_. Then:
    - _a < b_ if there exists a positive integer _k: 1 ≤ k < n_ such that:
      ```
      a[1]   = b[1]
      a[2]   = b[2]
      ...
      a[k-1] = b[k-1]
      a[k]   = b[k]
      a[k+1] < b[k+1]
      ```
    - _a = b_ if _a[i] = b[i]_ for all _i: 1 ≤ i ≤ n_
    - If the two sequences _a_ and _b_ have different lengths, lexicographic order can still be defined. Append special elements _∅_ to the end of _a_ or _b_ so that their lengths are equal, and treat these _∅_ elements as smaller than all other elements; this reduces the problem to comparing two sequences of the same length. Examples:
      ```
      <1, 2, 3, 4> < <5, 6>
      <a, b, c>    < <a, b, c, d>
      'calculator' < 'computer'
      ```
- Some lexicographic examples in the ebook:
  - Generating binary strings of length n
  - Listing k-element subsets
  - Listing permutations

---

## The Backtracking Algorithm

- Backtracking is used to solve the problem of enumerating configurations
- Each configuration is built one element at a time, and each element is chosen by trying all possibilities
- Example of backtracking applied to enumerating arrangements with repetition:
  ```
  procedure Try(i: Integer);
  begin
  	for 〈every value V that can be assigned to x[i]〉 do
  		begin
  			〈Try x[i] := V〉;
  			if 〈x[i] is the last element in the configuration〉 then
  				〈Report the configuration found〉
  			else
  				begin
  					〈Record that x[i] takes value V (if needed)〉;
  					Try(i + 1); {Recursive call to choose x[i+1]}
  					〈If needed, undo the record of trying x[i] := V so another value can be tried〉;
  				end;
  		end;
  end;
  ```
- Some problems in the ebook that apply backtracking:
  - The number decomposition problem
  - The N-queens problem
- Branch and bound evaluation within the backtracking process
  - Helps prune early any options that are certainly not optimal or contain no solution
  - The branch and bound technique gives backtracking the ability to evaluate at each step
  - Related problems in the ebook:
    - The traveling salesman problem
    - The ABC sequence

> **See also:** [Problem Solving Approaches](/Technology/Algorithm/Concepts/Approaches/Problem Solving Approaches) · [Algorithm Development](/Technology/Algorithm/Concepts/Approaches/Algorithm Development) · [Le Minh Hoang Book Notes](/Technology/Algorithm/Resources/Le Minh Hoang Book Notes)
