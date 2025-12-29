---
tags:
  - area/technology
  - domain/frontend
  - topic/react
  - topic/interview
  - topic/javascript
  - type/resource
  - lang/en
  - frontend
  - interview
  - questions
---

# Top 50 React Interview Questions

## React Basics

- **What is React?**: JavaScript library for building user interfaces, developed by Facebook
- **Does React use HTML?**: No, uses JSX (similar to HTML)
- **When was React first released?**: March 2013
- **Drawbacks**: Complex configuration with MVC, requires UI integration knowledge

## DOM & Virtual DOM

- **Real DOM vs Virtual DOM**:
  - Real DOM: Updated slowly, direct HTML update, wastes memory
  - Virtual DOM: Updates faster, cannot update HTML directly, less memory

## Flux & Redux

- **Flux Concept**: Architecture pattern, unidirectional data flow
- **Redux**: State container for JavaScript applications
- **Store**: Saves entire application state in one place
- **Action**: Function returning action object with action-type and data
- **Dispatcher**: Central hub receiving actions and broadcasting payload

## React Features

- **Important features**: 3rd party libraries, time-saving, faster development, simplicity, composable, Facebook support, one-directional data binding
- **Stateless components**: Pure functions rendering DOM based on properties
- **React Router**: Routing library, keeps URL in sync with page
- **Callback function**: Called when setState finishes, component re-renders
- **Higher Order Component (HOC)**: Advanced technique for reusing component logic
- **Presentational component**: Component that renders HTML

## Components & Props

- **Props**: Properties, passing data from parent to child, communication channel
- **Two types**: Function component, Class component
- **Synthetic event**: Cross-browser wrapper around native event
- **State**: Object deciding how component renders and behaves
- **Update state**: Directly or indirectly on component
- **Props vs State**: State is mutable, Props are immutable
- **Pure components**: Fastest components replacing render()

## Component Control

- **Information controlling component**: State and Props
  - State: Information that will change
  - Props: Set by parent, settled throughout component lifetime

## Tools & Setup

- **create-react-app**: Command-line tool for basic React application
- **Key in list**: Provides stable identity for each list element, should be unique
- **Children prop**: Pass component to other components as properties
- **Error boundaries**: Catch JavaScript errors in child components, log and show fallback UI
- **Empty tags**: Used for declaring fragments
- **Strict mode**: Run checks and warnings for React components (development only)
- **React portals**: Render children into DOM node using CreatePortal method
- **Context**: Pass data through component tree, share data globally

## Build Tools

- **Webpack**: Module builder, runs during development
- **Babel**: JavaScript compiler converting ES6/ES7 to ES5
- **JSX in browser**: Replace JSX using transformer like Babel

## Architecture

- **MVC issues**: Expensive DOM handling, slow applications, complex models

## Advanced

- **Multi-line expression**: Use multi-line JSX expression
- **Reduction**: Application method of handling State
- **Synthetic events**: Cross-browser wrapper with stopPropagation() and preventDefault()
- **Top-class elements**: Use when element has stage or lifetime cycle
- **Share element**: Using State
- **Reconciliation**: Compare rendered element with previously rendered DOM, update if needed
- **Re-render without setState**: Use forceUpdate()
- **Update props**: Cannot update (read-only, immutable)
- **Restructuring**: Extraction process of array objects
- **Mounting and Demounting**: Attaching/detaching element to/from DOM
- **prop-types library**: Runtime type checking for props
