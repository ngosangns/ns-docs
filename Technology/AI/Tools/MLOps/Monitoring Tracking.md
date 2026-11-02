---
area: technology
domain: model-evaluation
type: guide
title: Monitoring Tracking
description: Explains how to use the t-test to decide whether one machine learning model's accuracy is statistically better than another's.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - model-evaluation
  - statistics
  - mlops
---

# Monitoring Tracking

This note explains how to use a t-test to decide whether one model is really better than another. It covers a single idea and stays focused. A model's accuracy moves between runs because of the random seed and the data split, so one score is not enough evidence. The note defines the concept, shows how it applies to comparing two models, and states the question it answers. A concrete example follows, with ten accuracy readings for Model A and ten for Model B. The procedure section then walks through the null and alternative hypotheses, the t-statistic and p-value, and the 0.05 cutoff for rejecting the null. It ends with why this matters, namely avoiding gut-feeling evaluation.

## T-test in Machine Learning

- **Concept**: A statistical method that compares the means of two groups of data to determine whether the difference is statistically significant or just due to chance
- **Application in ML**: Compare the performance of two models (Model A vs Model B) when run multiple times with varying results caused by randomness (random seed, data split)
- **Purpose**: Answer the question "Is Model A's average performance really better than Model B's?" or whether it is only a small difference due to chance
- **Example**:
  - Model A run 10 times: accuracy = [0.85, 0.86, 0.84, 0.87, 0.85, 0.86, 0.85, 0.84, 0.87, 0.86]
  - Model B run 10 times: accuracy = [0.83, 0.82, 0.81, 0.83, 0.82, 0.81, 0.83, 0.82, 0.81, 0.83]
  - Model A has a higher mean score, but a t-test is needed to confirm that the difference is statistically significant
- **Procedure**:
  - **Hypotheses**:
    - Null hypothesis (H0): The two models do not differ in mean performance
    - Alternative hypothesis (H1): The two models have different mean performance
  - **Computation**: Compute the t-statistic and p-value from the accuracy data of the two models
  - **Evaluating the p-value**:
    - p-value < 0.05 → reject H0 → the difference is statistically significant
    - p-value ≥ 0.05 → not enough evidence to reject H0 → cannot claim which model is better
- **Why it matters**:
  - ML does not always produce perfectly exact results
  - Factors such as the random seed and dataset split can affect results
  - A single comparison can lead to a wrong conclusion about model quality
  - The t-test helps avoid "gut-feeling evaluation" by using multiple runs and statistical analysis so that decisions are scientifically grounded

> **See also:** [Loss Functions](/Technology/AI/Concepts/Core Concepts/Core Concepts#loss-functions) · [XGBoost Tips And Tricks](/Technology/AI/Write Ups/XGBoost Tips And Tricks)
