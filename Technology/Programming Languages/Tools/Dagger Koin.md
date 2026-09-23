---
area: technology
domain: android
type: note
title: Dagger Koin
description: Notes on dependency injection for Android with Dagger (components, modules, scopes) and a Koin pitfall with generic types.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - android
  - dependency-injection
  - dagger
  - koin
resource: https://developer.android.com/training/dependency-injection/dagger-android
---

# Dagger Koin

## Dagger

- A component can be used with the application context to manage its own lifecycle.
- A module can be seen as a group of multiple dependencies => shortens the declarations.
- A component manages which dependencies get injected into which module within the component.
- Providing a module to a component is how that component learns how to create those dependencies.
- Caution: Modules that use a scope annotation can only be used in components that are annotated with the same scope.
- https://developer.android.com/training/dependency-injection/dagger-android

## Koin

- When two dependencies have the same class but different generics, use `named` to tell them apart, because Koin may inject the wrong one.

> **See also:** [Java Spring](/Technology/Programming Languages/Tools/Java Spring)
