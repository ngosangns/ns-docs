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

This note introduces pose estimation, the task of finding a person's joints and body parts in an image or video and returning them as coordinates. It defines the goal and the usual output, a set of 2D or 3D keypoints for the head, shoulders, elbows, hips and ankles. A short section on evolution credits CNNs and the Transformer for the recent gains in accuracy and speed. The rest compares two common solutions, Ultralytics YOLO-Pose and Google's MediaPipe Pose, and lists the traits they share, namely quick install, fast processing, multithreading and simple integration. The page works as a starting point before picking a library for a real-time application.

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

The output is a set of 2D or 3D keypoints. Typical points are the head, neck, shoulders, elbows, wrists, hips, knees, and ankles. The same idea can apply to an animal. CNNs and the Transformer are credited for the recent gains in accuracy and speed. YOLO-Pose is a YOLO build for this task. MediaPipe Pose is Google's library and fits real-time use. Both install quickly, run quickly, support multithreading, and integrate with little effort.

> **See also:** [Human Action Recognition](/Technology/AI/Practices/Human Action Recognition) · [Object Detection](/Technology/AI/Concepts/Computer Vision/Computer Vision#object-detection) · [Fitness Exercise Datasets](/Technology/AI/Resources/Datasets/Datasets#fitness-exercise-datasets)
