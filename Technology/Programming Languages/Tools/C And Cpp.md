---
area: technology
domain: c
type: resource
title: C And Cpp
description: Curated list of C and C++ libraries, currently featuring the Clay high-performance UI layout library.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - c
  - cpp
  - libraries
resource: https://github.com/nicbarker/clay
---

# C And Cpp

Clay, short for C Layout, is a high performance 2D UI layout library in C. It aims for microsecond layout performance. The layout model is flex-box like and supports complex responsive layouts, including text wrapping, scrolling containers, and aspect ratio scaling. A transition API covers layout animations.

The library is a single clay.h file of 4.8k lines of code, with zero dependencies and no standard library linking. It can compile with clang to an uncompressed wasm file of 15kb for the browser. Memory use is a static arena with no malloc or free. The readme gives an example overhead of about 3.5mb for 8192 layout elements.

## Resources

## Libraries

- https://github.com/nicbarker/clay: High performance UI layout library in C

Syntax is nested and declarative, in a React-like style. Clay is renderer agnostic and outputs a sorted list of rendering primitives for a 3D engine or for HTML. Include clay.h after defining CLAY_IMPLEMENTATION in one file. Layouts sit between Clay_BeginLayout and Clay_EndLayout.

> **See also:** [Nodejs](/Technology/Programming Languages/Tools/Nodejs) · [Rul](/Technology/Programming Languages/Tools/Rul)
