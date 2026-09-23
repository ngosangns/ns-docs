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

> **See also:** [Loss Functions](/Technology/AI/Concepts/Core Concepts/Loss Functions) · [XGBoost Tips And Tricks](/Technology/AI/Write Ups/XGBoost Tips And Tricks)
