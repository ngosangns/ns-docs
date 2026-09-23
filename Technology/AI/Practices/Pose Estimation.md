---
area: technology
domain: computer-vision
type: guide
title: Pose Estimation
description: Introduces pose estimation, the task of locating human body keypoints in images and video, and the popular YOLO-Pose and MediaPipe Pose solutions.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - computer-vision
  - pose-estimation
---

# Pose Estimation

## Concept

- **Pose Estimation**: One of the fundamental and most popular problems in computer vision, especially with Deep Learning
- **Goal**: Locate the joints or body parts of a person (or sometimes an animal) in a still image or video
- **Output**: A set of 2D or 3D coordinates representing keypoints, such as:
  - Head, neck, shoulders
  - Elbows, wrists
  - Hips, knees, ankles
  - And other points on the body

## Evolution

- With the advances in **CNNs (convolutional neural networks)** and the **Transformer** architecture for computer vision
- The accuracy and speed of pose estimation models and solutions have improved significantly in recent years

## Popular Solutions

### Ultralytics YOLO (YOLO-Pose)

- A version of YOLO specialized for pose estimation
- High processing speed
- Simple to install
- Supports multithreading and integrates easily into platforms and applications

### MediaPipe Pose (Google)

- Google's solution
- High processing speed
- Simple to install
- Supports multithreading and integrates easily into platforms and applications
- Well suited to real-time applications

## Why They Are Popular

- **Simple installation**: Easy to add to a project
- **High processing speed**: Fast enough for real-time applications
- **Multithreading support**: Handles multiple data streams at once
- **Easy integration**: Plugs into platforms and applications with little effort

> **See also:** [Human Action Recognition](/Technology/AI/Practices/Human Action Recognition) · [Object Detection](/Technology/AI/Concepts/Computer Vision/Object Detection) · [Fitness Exercise Datasets](/Technology/AI/Resources/Datasets/Fitness Exercise Datasets)
