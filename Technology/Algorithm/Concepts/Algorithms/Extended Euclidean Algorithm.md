---
area: technology
domain: algorithms
type: guide
title: Extended Euclidean Algorithm
description: Explains how the Extended Euclidean Algorithm solves the linear Diophantine equation ax + by = c and how RSA uses it to compute modular inverses.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - algorithms
  - number-theory
  - cryptography
resource: https://viblo.asia/p/giai-thuat-euclid-mo-rong-extended-euclidean-algorithm-va-phuong-trinh-axbyc-AZoJjgxeLY7
---

# Extended Euclidean Algorithm

> This document was created from an article on Viblo:
>
> - https://viblo.asia/p/giai-thuat-euclid-mo-rong-extended-euclidean-algorithm-va-phuong-trinh-axbyc-AZoJjgxeLY7

## The Equation ax + by = c

- **Definition**: An equation with integer coefficients a, b, c for which we look for integer solutions (x, y)
- **Solvability condition**:
  - Let d = gcd(a, b) (the greatest common divisor of a and b)
  - There exist integers x, y such that ax + by = d
  - The necessary and sufficient condition for ax + by = c to have an integer solution is that d divides c
  - If d does not divide c, the equation has no integer solution

## The Euclidean Algorithm for GCD

- **How it works**:
  - Assume a > b; divide a by b to get the remainder r
  - Continue by finding the GCD of the pair (b, r)
  - Repeat until the remainder is 0
  - The last non-zero divisor is the GCD of a and b
- **Characteristics**:
  - The algorithm is fast and efficient
  - Time complexity is O(log min(a, b))
  - It is the foundation of the Extended Euclidean Algorithm

## The Extended Euclidean Algorithm

- **Purpose**: Find solutions of the Diophantine equation ax + by = c
- **Procedure**:
  - Let d = gcd(a, b)
  - First, find a solution of ax + by = d
  - If that equation has a solution (x₀, y₀), then (c/d × x₀, c/d × y₀) is a solution of ax + by = c
  - The process involves successive divisions and a recurrence formula to compute the values of x and y
- **Mechanism**:
  - While running the Euclidean algorithm, the coefficients x and y are computed at the same time
  - A recurrence formula based on the division steps of the Euclidean algorithm is used
  - The final result gives both d = gcd(a, b) and the coefficients x, y satisfying ax + by = d

## Application in RSA Cryptography

- **Problem**: In RSA, after choosing the public exponent e, we need to find the private exponent d such that d × e ≡ 1 (mod φ(n))
- **Transformation**:
  - The equation d × e ≡ 1 (mod φ(n)) can be rewritten as d × e + k × φ(n) = 1 with k an integer
  - This is exactly the form ax + by = c with a = e, b = φ(n), c = 1
- **Solvability condition**:
  - The equation has a solution when gcd(e, φ(n)) = 1
  - This explains why e must be chosen coprime to φ(n)
- **Computation**:
  - Use the Extended Euclidean Algorithm to find d such that d × e ≡ 1 (mod φ(n))
  - The resulting d is the modular inverse of e modulo φ(n)
  - This d is used as the private exponent in RSA

## Summary

- The Extended Euclidean Algorithm is a powerful tool for solving the Diophantine equation ax + by = c
- It has important applications in cryptography, especially for computing modular inverses
- It effectively combines finding the GCD with solving a linear equation
- It is the mathematical foundation of many modern encryption algorithms

> **See also:** [Learning Resources](/Technology/Algorithm/Resources/Learning Resources) · [Big O Notation](/Technology/Algorithm/Concepts/Big O Notation)
