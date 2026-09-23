---
area: technology
domain: web-development
type: note
title: Web Developer Interview Insights
description: Notes from David Walsh's interview with a Pornhub web developer on development process, performance monitoring, video player work, tech stack, Web API pain points and team culture.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - web-development
  - frontend
  - javascript
  - interview
resource: https://davidwalsh.name/pornhub-interview
---

# Web Developer Interview Insights

> **Source**: David Walsh's interview with a web developer at Pornhub (10/2019)  
> **Original link**: https://davidwalsh.name/pornhub-interview

## Development Process

### Placeholders And Content

- No placeholder images/videos are used during development
- The focus is on code and functionality
- The team has become used to the content after working with it for a while

### Video Player Development

- The player is split into two parts:
  - Core player: implements basic functionality and events
  - Development in an isolated environment (clean room)
- Real ads and third-party code are integrated to catch bugs early
- The team works with ad vendors so events can be triggered on their own when needed

## Performance Monitoring

### Measurement Systems

- **Video player metrics**: video playback performance and usage
- **RUM (Real User Monitoring)**: whole-page performance measured by a third party
- **WebPageTest private instances**:
  - Run script tests from AWS data centers
  - Inspect events at specific points in time
  - View "waterfalls" from different locations and providers

## Video Player

### Management

- A dedicated team is responsible for developing the video player
- Priority: continuous monitoring of performance and efficiency
- Uses the full toolset: browser performance tools, web page tests, metrics
- Stability is ensured through a thorough QA process

### Features

- Pre-roll ad integration
- Marking highlight moments
- Playback speed changes
- Many more features

## Technology Stack Evolution

### CSS

- From plain CSS → LESS and mixins
- Flexible grid system with media queries
- `<picture>` element for multiple resolutions and screen sizes

### JavaScript

- Gradually removing jQuery and jQueryUI
- Returning to vanilla JavaScript (effective object-oriented programming)
- Trying out new frameworks

### Web APIs In Use

- **IntersectionObserver**: optimized lazy loading of images
- **Picture-in-Picture API**: experimenting with floating video (to gather feedback)

## Web APIs That Need Improvement

### Beacon API

- Has problems on iOS
- Does not work correctly with the `pageHide` event

### Fetch API

- Does not support tracking download progress
- Provides no way to intercept requests

### WebRTC

- Simulcast layers are still limited
- This holds even for screen sharing when the resolution is not high enough

### Service Workers

- `navigator.serviceWorker.register` is not intercepted by any Fetch event handler in the Service Worker

## WebXR/VR

- Researching WebXR and spatial computing
- The first major platform to support VR, computer vision, and virtual performers
- Continues to push new technology and the open web
- Still exploring content and platforms for the new environment

## Desktop vs Mobile

### Key Differences

- Limited by the operating system and browser type
- iOS and Android have different sets of permissions and features

### Concrete Examples

- **iOS**: some devices don't allow a custom video player in fullscreen and force the native QuickTime player
- **Android**: full control, so all features can be implemented in fullscreen mode
- **HLS streaming**: IE and Edge are picky about HLS quality. In some cases higher qualities must be blocked to avoid stuttering and visual glitches

## Browser Support

- Dropped support for IE versions older than IE11
- Stopped using Flash for the video player
- Main focus: Chrome, Firefox, Safari

## Technical Stack

### Backend

- **Web server**: Nginx
- **Language**: PHP
- **Database**: MySQL
- **Caching**: Memcached and/or Redis
- **Optional**: Varnish, ElasticSearch, Node.js, Go, Vertica

### Frontend

- **JavaScript**: vanilla JavaScript (phasing out jQuery)
- **Framework**: experimenting with Vue.js

## Product Differentiation

### What Sets Adult Sites Apart

- **Content library**: each brand has its own character
- **UX and features**: distinct user experiences
- **Algorithms**: different algorithms for distributing and recommending content in unique ways

## Team And Collaboration

### Team Size

- Mid-sized relative to the scale of the product

### Collaboration

- Works closely with: backend developers, QA testers, product managers
- Communication: face-to-face at the desk, MS Teams, email

## Work Environment

### Culture

- Relaxed and friendly atmosphere
- Not very different from other agencies
- Much larger scale than previous workplaces

### Motivation

- Engaging technical challenges
- Millions of people interact with the features you build
- Job stability (the industry never disappears)

### Stigma

- Proud of the product
- Family and friends know and are curious
- An interesting conversation topic

## Key Takeaways

- Being at the forefront of major trends and changes in technology
- The work is always interesting and challenging
- The thrill of building experiences for a product with enormous traffic
- The source code holds a lot of valuable knowledge about performance optimization and clever tricks

> **See also:** [37 Tips From A Senior Frontend Developer](/Technology/Frontend/Resources/37 Tips From A Senior Frontend Developer) · [Frontend Overview](/Technology/Frontend/Resources/Frontend Overview)
