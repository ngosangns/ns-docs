---
area: technology
domain: ranking
type: case-study
title: Post Score Algorithm
description: Weighted scoring formula for ranking trending posts, with a variable glossary and a worked numeric example.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - ranking
  - algorithms
  - golang
resource: https://viblo.asia/p/xay-dung-tinh-nang-trending-bai-viet-m2vJPD2KJeK
---

# Post Score Algorithm

## Table of Contents

- [Resources](#resources)
- [General Formula](#general-formula)
- [Variable Definitions](#variable-definitions)
- [Worked Example](#worked-example)

## Resources

- https://viblo.asia/p/xay-dung-tinh-nang-trending-bai-viet-m2vJPD2KJeK

## General Formula

$$
FS=(w_5 \cdot CS+w_6 \cdot PS+ES+(AB \cdot w_7)+RP)\cdot(UP+FP)
$$

$$
ES=w_1 \cdot UV+w_2 \cdot DV+w_3 \cdot TC+w_4 \cdot TV
$$

$$
RP=w_{11}\cdot\left(\frac{1}{1+e^{-k \cdot (AVTP-x_0)}}-0.5\right)
$$

## Variable Definitions

- FS: Final Score of the post
- w_5, w_6: weights for Category Score and Poster Score
- CS: Category Score of the post
- PS: Poster Score (boosts posts from specific authors)
- ES: Engagement Score
- w_1..w_4: weights for UV/DV/TC/TV
- UV: Up Votes
- DV: Down Votes
- TC: Total Comments
- TV: Total Views
- AB: Admin Boost (1 if boosted, 0 otherwise)
- w_7: weight for the admin boost
- UP: User Preference for the category
- FP: Follower Preference (1 if the user follows the poster, 0 otherwise)
- RP: Reward/Penalty score (for example, for videos)
- w\_{11}: weight for RP
- k: steepness
- AVTP: Average View Time Percentage (video)
- x_0: AVTP threshold

## Worked Example

### Assumptions

- $w_1 = 2$, $w_2 = 1$, $w_3 = 0.5$, $w_4 = 0.1$
- $w_5 = 1$, $w_6 = 0.8$, $w_7 = 20$, $w_{11} = 10$
- $k = 10$
- $x_0 = 0.3$

### Input

- $CS = 0.7$
- $PS = 0.6$
- $UV = 50$
- $DV = 20$
- $TC = 10$
- $TV = 500$
- $AB = 1$
- $UP = 0.7$
- $FP = 1$
- $AVTP = 0.8$

### Computing ES

$$
ES=2 \cdot 50+1 \cdot 20+0.5 \cdot 10+0.1 \cdot 500=175
$$

### Computing RP

$$
RP=10\cdot\left(\frac{1}{1+e^{-10 \cdot (0.8-0.3)}}-0.5\right)\approx 4.5
$$

### Computing FS

$$
FS=(1\cdot 0.7+0.8\cdot 0.6+175+1\cdot 20+4.5)\cdot(0.7+1)\approx 343.47
$$

> **See also:** [Big O Notation](/Technology/Algorithm/Concepts/Big O Notation) · [Learning Resources](/Technology/Algorithm/Resources/Learning Resources)
