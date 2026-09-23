---
area: technology
domain: knn
type: guide
title: KNN K Nearest Neighbors
description: Strategies for keeping K-Nearest Neighbors robust against outliers, from preprocessing and tuning K to weighting neighbors and choosing distance metrics.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - knn
  - machine-learning
---

# KNN K Nearest Neighbors

## Handling Outliers in KNN

KNN works by finding the nearest data points to make a decision, so outliers can distort the model's results.

### Filter Outliers Before Training (Preprocessing)

- **Z-score**: Detects points whose value is too far from the mean
- **IQR (Interquartile Range)**: Measures spread and removes points that fall outside the IQR range
- Removing outliers cleans the data, so KNN performs better

### Tune the Value of K

- Increasing K: The algorithm considers more neighbors, which dampens the impact of a few outliers
- Caveat: Increasing K too much can make the model "too simple" and reduce accuracy
- Test and choose a suitable K

### Weight Closer Neighbors (Weighted KNN)

- Weighting closer neighbors gives them more influence on the prediction
- Outliers usually sit far from the main data points, so weighting reduces their influence

### Try KNN Variants

- **Robust KNN**: Advanced versions with mechanisms that reduce the influence of outliers
- Yields more accurate results without having to remove much data

### Explore Other Distance Metrics

- **Euclidean distance**: The most common
- **Manhattan distance**: Can help reduce the influence of outliers
- **Minkowski distance**: Another option
- Changing the distance metric can reduce the influence of outliers and make the model more accurate

## Summary

- KNN can struggle with outliers
- Strategies for handling them:
  - Filter the data (preprocessing)
  - Tune K
  - Weight closer neighbors
  - Use KNN variants (Robust KNN)
  - Experiment with different distance metrics
- Experimenting and tuning the model is an important part of optimizing performance

> **See also:** [Loss Functions](/Technology/AI/Concepts/Core Concepts/Loss Functions) · [Transfer Learning](/Technology/AI/Concepts/Core Concepts/Transfer Learning)
