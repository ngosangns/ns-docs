---
area: technology
domain: signal-processing
type: guide
title: Signal Processing
description: Introduces the Fourier Transform, the Discrete Fourier Transform and FFT, including how epicycles can draw pictures from Fourier coefficients.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - signal-processing
  - computer-science
  - fourier-transform
  - DFT
resource: https://viblo.asia/p/fourier-transform-la-gi-ve-tranh-voi-discrete-fourier-transform-kNLr3deOVgA
---

# Signal Processing

## Fourier Transform

- **Concept**: A tool that decomposes a signal into a sum of sine and cosine waves of different frequencies
- **Principle**: Any signal can be represented as a sum of sine and cosine waves with different frequencies
- **Domain conversion**:
  - Converts a signal from the **time domain** (how it varies over time) to the **frequency domain** (which frequencies are present)
  - Example: A song is a combination of many different notes (high and low frequencies); the Fourier Transform separates out each note so you can see its contribution
- **Applications**:
  - Audio processing: analyze a song to see how much bass (low frequency), midrange, and treble (high frequency) it contains
  - Image processing: analyzing and processing images
  - Data analysis in science and engineering
  - Telecommunications and signal transmission

## Discrete Fourier Transform (DFT)

- **Concept**: The discrete version of the Fourier Transform, used when working with digital data
- **Characteristics**:
  - Works on discrete data, such as audio samples recorded by a computer or phone
  - Processes individual data points rather than a continuous signal
- **Practical applications**:
  - Drawing pictures with the DFT: use the DFT to reconstruct a drawing from Fourier coefficients
    - Each Fourier coefficient corresponds to a circle (epicycle)
    - The circle's radius = the coefficient's magnitude
    - The circle rotates at a speed proportional to the frequency k
    - The end point of the chain of circles traces out the original curve
  - Visualization: illustrates the relationship between the time domain and the frequency domain intuitively
- **Fast Fourier Transform (FFT)**: An optimized algorithm for computing the DFT efficiently, reducing computational complexity
- Source: https://viblo.asia/p/fourier-transform-la-gi-ve-tranh-voi-discrete-fourier-transform-kNLr3deOVgA #signal-processing #fourier-transform #DFT

> **See also:** [CPU Performance](/Technology/Computer Science/Concepts/CPU Performance) · [Operating Systems](/Technology/Computer Science/Concepts/Operating Systems)
