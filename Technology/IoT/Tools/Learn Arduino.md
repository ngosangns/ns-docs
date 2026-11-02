---
area: technology
domain: iot
type: tool
title: Learn Arduino
description: Learn Arduino (learn-arduino-red.vercel.app) is Dilum Sanjaya's free browser-based 3D course — 16 pre-wired Arduino Uno lessons with adjustable parameters, simulated code, serial output and a schematic view, in 13 languages, with no backend or account.
timestamp: "2026-11-02T00:00:00.000Z"
tags:
  - technology
  - iot
  - arduino
  - education
  - threejs
resource: https://learn-arduino-red.vercel.app/
---

# Learn Arduino

[Learn Arduino](https://learn-arduino-red.vercel.app/) is a free, browser-based 3D course for the Arduino Uno: 16 lessons, from blinking an LED to a distance-sensor traffic light, each rendered as an interactive scene with a code panel and a simulated serial monitor. There is no signup, no hardware and no server-side account; progress lives in `localStorage`.

It is by [Dilum Sanjaya](https://x.com/DilumSanjaya), a senior software engineer ([GitHub `dilums`](https://github.com/dilums)), who announced it on X on 20/10/2026 as "an app that takes you through Arduino one circuit at a time. Made with Opus 5.5" ([post](https://x.com/DilumSanjaya/status/2112587730542854263)). An update on 22/10 added more lessons, 12 translations and a schematic view ([post](https://x.com/DilumSanjaya/status/2113313456602681360)). A sibling ESP32 edition followed on 26/10/2026 ([post](https://x.com/DilumSanjaya/status/2114762155333689679)); this note covers only the Arduino app.

Checked 2026-11-02 by reading the HTML, CSS and JavaScript bundles, the manifest, sitemap and response headers, plus the author's posts and GitHub profile. The page was last modified 2026-11-02 00:38 UTC; the sitemap says 2026-10-24. Not clicked through in a browser, not compared against real hardware.

## Curriculum

The 16 lessons form a sensible beginner arc: board and digital output, then inputs, then sensors and sound, then actuators, then a combined project.

| #   | Lesson          | What it introduces                                                        | Parts in the scene                   |
| --- | --------------- | ------------------------------------------------------------------------- | ------------------------------------ |
| 1   | Meet the board  | Uno layout, ATmega328P, digital/analog/power pins, `setup()`/`loop()`     | Uno, USB, power jack                 |
| 2   | Blink an LED    | Digital output, current-limiting resistor, pin 13 and the on-board L LED  | LED, 220 Ω resistor                  |
| 3   | Push a button   | Digital input, pull-down resistor, debounce, hold vs toggle logic         | Tactile switch, 10 kΩ, LED           |
| 4   | Turn a knob     | 10-bit ADC, `analogRead()`, PWM dimming with `analogWrite()`              | 10 kΩ potentiometer, LED             |
| 5   | Mix colours     | Three PWM channels on an RGB LED                                          | RGB LED, three 220 Ω resistors       |
| 6   | Sense light     | LDR voltage divider, threshold logic                                      | GL5528 LDR, desk lamp, LED           |
| 7   | Read a sensor   | HC-SR04 trigger/echo, `pulseIn()`, serial output, divide by 58            | Ultrasonic sensor, movable obstacle  |
| 8   | Make a sound    | Passive piezo, `tone()`, arrays of note frequencies                       | Buzzer                               |
| 9   | Mini piano      | `INPUT_PULLUP`, eight keys, `tone()`/`noTone()`, state change             | Eight switches, buzzer               |
| 10  | Control a motor | Why a pin cannot drive a motor, TIP120 transistor, PWM, flyback-diode tip | DC motor, TIP120, 1 kΩ base resistor |
| 11  | Sense heat      | TMP36 voltage → temperature, `(volts − 0.5) × 100`                        | TMP36, fan                           |
| 12  | Sweep a servo   | `Servo` library, 0–180° position, 50 Hz pulses                            | SG90 servo                           |
| 13  | Spin the wheel  | 28BYJ-48 stepper, ULN2003 driver, `AccelStepper`, 2048 steps per turn     | Stepper, driver board, button        |
| 14  | Smart plant     | Capacitive soil sensor, `map()`, I²C SSD1306 OLED                         | Soil sensor, OLED, watering can      |
| 15  | Feel the force  | FSR voltage divider, `map()` to servo angle, threshold bell               | FSR, servo needle, bell              |
| 16  | Build a project | Combine the distance sensor with a red/yellow/green traffic light         | HC-SR04, three LEDs, obstacle        |

The board specification table is the standard Uno R3 one: ATmega328P, 5 V, 7–12 V input, 14 digital I/O (6 PWM), 6 analog inputs, 32 KB flash, 2 KB SRAM, 1 KB EEPROM, 16 MHz, 68.6 × 53.4 mm. The component figures spot-checked cleanly: TMP36 at 0.5 V / 10 mV per °C, HC-SR04 at 2–400 cm and 40 kHz, PWM pins 3/5/6/9/10/11, 220 Ω giving about 14 mA through a 2 V LED, 28BYJ-48 at 2048 steps per revolution.

## Anatomy of a lesson

Each lesson is one 3D scene plus four DOM panels around it.

- **Scene.** A procedurally built Uno, breadboard, wires and parts, rendered with Three.js (`WebGLRenderer`, shadows, ACES tone mapping). The circuit is already wired. Drag or use WASD to pan, Q/E to rotate, scroll to zoom. Callout cards and leader lines are DOM/SVG overlays anchored to 3D positions.
- **Info panel.** Four tabs: Overview, Pinout, How the code works, Specifications. The pinout is lesson-specific ("D13 → resistor → LED +"), not just the board headers.
- **Inspector.** Clicking a part opens controls for that lesson: resistor value, LED colour and timing, potentiometer position, obstacle type and distance, lamp position, melody and tempo, motor ramp, servo sweep, prize-wheel speed, soil dryness, press force. Choices are radio groups; sliders are ranges; colours are swatches.
- **Code panel.** Shows an Arduino sketch with `{{placeholders}}`, a copy button and an expand button. Changing a parameter rewrites the sketch's constants and the sim's behaviour; the code comments are translated along with the rest of the UI.
- **Run.** A short fake "upload" (TX/RX flicker) precedes the simulation. Run/Stop is also the space bar. The serial monitor is resizable, keeps the last 40 lines, and shows values such as temperature, distance, moisture or note names.
- **Schematic.** A generated SVG netlist view of the lesson, toggled with C, added in the 22/10 update.
- **Progress.** A lesson is marked done the first time its simulation starts. The count, per-lesson parameter values and settings persist in `localStorage` (`learn-arduino:done`, `:values`, `:settings`); "Reset progress" clears the record. Lessons are addressable by hash (`#blink`, `#servo`, …).

Settings toggle callout labels, current-flow dots and HIGH/LOW labels, the floor grid, turntable auto-rotation, sound and reduced motion. The scene honours `prefers-reduced-motion: reduce` by default, and Hebrew switches the layout to RTL.

## What is actually simulated

This is the main thing to understand before recommending it.

- **The C++ is not compiled or executed.** There is no parser, interpreter, `eval` or `new Function` in the bundles. Each lesson selects a hand-written simulation handler (`sim: blink`, `button`, `knob`, `rgb`, … — 16 in total) that drives the 3D scene and serial output. The sketch on screen is generated from the same parameter values, so it stays consistent with what you see, but editing it is not possible and its logic is not what runs.
- **You do not wire the circuit.** Every scene arrives pre-wired; there is no wire-dragging, pin-to-hole placement or netlist editing. The interaction is clicking parts, moving props, pressing buttons and changing parameters. The site's "wire LEDs, buttons, sensors" line is marketing shorthand for "watch a pre-built circuit and vary it".
- **The electrical model is local, not general.** A sim may compute the few quantities it displays (LED current from the chosen resistor, temperature from the TMP36 voltage, distance from echo time), but it is not a SPICE-style solver and will not catch wiring mistakes, voltage drops or thermal problems.
- **There are no exercises or checks.** No quizzes, no "build this yourself" validation. Completion means "you pressed Run", which makes the progress counter a reading tracker rather than an assessment.

That is a reasonable design for a zero-setup introduction: the hard part for a beginner is often just seeing what a circuit does. It is not a substitute for assembling a real breadboard, and it does not teach debugging a circuit you wired wrong.

## Technical shape

- **Stack.** A Vite-built single-page app; the Three.js renderer and scene code sit in a 425 KB `stage` chunk, the lesson data and UI in a 132 KB `main` chunk, with a 64 KB stylesheet and 21 KB of prerendered HTML. Brotli transfer is roughly 6 KB HTML + 14 KB CSS + 164 KB JS, plus two locally served Barlow Semi Condensed WOFF2 files (~45 KB) and a locale chunk if the browser is not English.
- **No external assets at runtime.** No `.glb`, `.gltf`, `.hdr` or texture URLs appear in the bundles; the board, parts, wires and labels are generated in code. There are no `fetch`/XHR/WebSocket calls in the app or scene bundles, and no analytics, tag manager or session recorder.
- **Languages.** 13 locales: English, Spanish, Portuguese, French, German, Italian, Turkish, Indonesian, Simplified Chinese, Japanese, Korean, Hindi and Hebrew. Each translation is a lazy-loaded 62–100 KB chunk (28–31 KB compressed). There is no Vietnamese.
- **Hosting.** Static on Vercel, with HSTS, `X-Content-Type-Options`, `Referrer-Policy` and a restrictive `Permissions-Policy` (camera, microphone, geolocation and browsing-topics disabled). A web manifest exists, but no service worker: a reload still needs the network.

## Caveats and trust notes

- **Provenance.** The author says it was made with Claude Opus 5.5. I could not find a public source repository, license or build instructions; GitHub search under the author returns no Arduino project, and the site links only to his X profile. Treat the lessons as editorial content, not a maintained open-source curriculum.
- **Accuracy is mostly good but simplified.** Pin 13's on-board LED is driven through a buffer on a real Uno, not straight from the pin; clone boards may use a CH340 USB bridge and different tolerances; "open-source hardware" describes the design documentation, not every clone. The datasheet values shown are typical, not guaranteed.
- **Simulation vs hardware.** Sound is synthesised in the browser, the serial monitor is fabricated, and the "upload" is an animation. A learner still needs real hardware to meet voltage drops, loose jumpers, debounce that behaves differently, and a servo that browns out the board.
- **Accessibility.** Tabs, lesson list, inspector controls and callout cards are keyboard reachable with ARIA roles; arrow keys move tabs and radio groups, space runs the sketch, `[`/`]` change lesson, `1`–`0` jump to a lesson, `R` resets the view, `F` toggles flow and `C` the schematic. Reduced motion and sound toggles exist. But the 3D parts themselves are pointer-only, the canvas has no text alternative, and the serial monitor has no `aria-live`, so a screen-reader user gets the labels and code but not the live output. No third-party accessibility audit was found.
- **Privacy.** No account, no cookies, no analytics code, and progress never leaves the browser. Vercel still sees ordinary request metadata, and the page loads fonts and assets from its own origin only.

## Not checked

Did not interact with all 16 lessons in a browser, did not test touch/mobile layout, WebGL fallback or screen-reader behaviour, did not run Lighthouse or axe, did not verify the 12 translations for accuracy, did not compare the simulations against a physical Uno, and could not verify the "Opus 5.5" claim or inspect source code. Bundle findings come from static inspection, not runtime instrumentation.

> **See also:** [Development Tools](/Technology/IoT/Tools/Development Tools) · [Hardware Platforms](/Technology/IoT/Concepts/Hardware Platforms)
