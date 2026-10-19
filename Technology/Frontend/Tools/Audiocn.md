---
area: technology
domain: frontend
type: tool
title: Audiocn
description: audiocn (audiocn/ui, MIT, by OrcDev and fortysevenfx) is a shadcn/ui registry of copy-and-own React audio components - about two dozen components (level meters, spectrum and waveform visualizers, faders, knobs, channel strips, a mixer, a player, sound pads), 6 blocks and 18 Web Audio hooks, built on Base UI and Tailwind v4 and themed by shadcn tokens. Not an npm package; installed with npx shadcn add @audiocn/<item>. Launched 2026-10-02.
timestamp: "2026-10-19T00:00:00.000Z"
tags:
  - technology
  - frontend
  - react
  - shadcn
  - component-library
  - web-audio
resource: https://github.com/audiocn/ui
---

# Audiocn

[audiocn](https://audiocn.dev) ([audiocn/ui](https://github.com/audiocn/ui)) is "audio UI components for React, built the shadcn way". It is a [shadcn/ui registry](https://ui.shadcn.com/docs/registry), not an npm package: the shadcn CLI copies each component's source into your project, together with the hooks and audio core it needs, and from then on you own the code.

It covers meters, visualizers and mixer controls, plus Web Audio hooks to feed them.

Checked 2026-10-19:

- **Authors:** the README credits [OrcDev](https://x.com/orcdev) (TheOrcDev, also behind [8bitcn/ui](https://github.com/TheOrcDev/8bitcn-ui) and shadscan) and [fortysevenfx](https://x.com/fortysevenfx). By commits, OrcDev has 188, François Best 16 and one other contributor 1.
- **Launch:** announced by OrcDev on X on 2026-10-02.
- **Repo:**
  - 268 stars, 11 forks, 9 open issues. Created 2026-09-30, last push 2026-10-12. No GitHub releases.
  - 205 commits, 194 of them in the first three days (2026-09-30 to 10-02); only a few small commits since.
- **License:** MIT (`license.md`, copyright OrcDev). GitHub shows "Other" because the file also carves out a Warcraft III "Work, work" sound used on the demo site, which is not part of the registry.
- **Registry:** `registry.json` has 50 items: 24 `registry:ui` components (the README badge says 23, but its own tables list 24), 6 blocks, 18 hooks and 2 libs (`core` and the shared `electric` renderer). The live endpoint `https://audiocn.dev/r/{name}.json` works; it redirects to `www.audiocn.dev` and returns 200.
- **Docs:** [audiocn.dev/docs](https://audiocn.dev/docs), built with Fumadocs. There is an [llms.txt](https://www.audiocn.dev/llms.txt), and appending `.md` to a docs URL gives the Markdown version.

## What's in it

- **Meters and visualizers:** Level Meter (peak and RMS, zones, peak hold, clip light), dB Scale, dB Readout, Clip Indicator, Bar Visualizer, Electric Bar Visualizer, Electric Waveform, Smooth Waveform, Live Waveform, Waveform (clip view with playhead, seeking, regions and markers) and Spectrum.
- **Controls:** Fader (in dB, with tapers and detents), Parameter Slider, Knob (SVG), LCD Display (dot matrix), Pan Control, Channel Toggle (mute, solo, monitor), Volume Control and Audio Device Select.
- **Mixer:** Channel Strip and Mixer (shared meter settings, keyboard navigation).
- **Sounds and music:** Audio Player (transport, rate, loop, shortcuts), Track List and Sound Pad.
- **Blocks (6):** System Audio Mixer, Music Player, Soundboard, Mic Setup, System Audio Settings and Quick Audio Popover.
- **Hooks (18):**
  - Inputs: `useMicrophone` (browser processing off by default), `useSystemAudio` (tab or system audio through the screen-share picker), `useAudioDevices`.
  - Analysis and mixing: `useAudioAnalyser`, `useWebAudioMixer` (ducking, monitor sends, limited master), `useMixer` (state only).
  - Playback: `useAudioPlayer`, `useSound` (short sounds decoded into memory), `useWaveformData` (decoded and cached peaks).
  - Utilities: `useDemoSignal` (synthetic speech, music or tone for previews), plus context, frame-source, level, clip-hold, gain-node, visibility, reduced-motion and config helpers.
- **Design choices from the README:**
  - Meters paint on `requestAnimationFrame` without React re-renders, so many channels stay smooth.
  - Components only receive levels and values and never open a microphone themselves, so you can feed them from any audio engine.
  - Values are in decibels.
  - Every fader, knob and strip works with the keyboard, has ARIA roles and respects reduced motion.
  - Theming uses the standard shadcn variables, plus six audio tokens: `--meter-ok`, `--meter-warn`, `--meter-clip`, `--channel-mute`, `--channel-solo`, `--channel-monitor`.

## Install and use

Requirements: React 19.2 or later (the hooks use `useEffectEvent`), Tailwind CSS v4, and a project set up with shadcn/ui (`components.json`, `cn` in `@/lib/utils`). Components are built on Base UI, and the CLI installs `@base-ui/react`, so they also work next to Radix-based shadcn components.

```json
// components.json
{ "registries": { "@audiocn": "https://audiocn.dev/r/{name}.json" } }
```

```bash
npx shadcn@latest add @audiocn/level-meter
npx shadcn@latest add @audiocn/system-audio-mixer   # a whole block
```

```tsx
import { LevelMeter } from "@/components/ui/level-meter"

export const MicLevel = ({ peakDb }: { peakDb: number }) => <LevelMeter aria-label="Microphone level" peakDb={peakDb} />
```

Files land in `components/ui/*`, `hooks/use-*.ts`, `lib/audio/*.ts`, plus tokens in `app/globals.css`. The only npm dependencies registry items pull in are `@base-ui/react`, `class-variance-authority` and `@phosphor-icons/react`. Browsers keep an `AudioContext` suspended until a user gesture, so start audio from a click.

## Install safety (source skim, nothing run)

- **Using the registry** only runs the official `shadcn` CLI, which downloads JSON from `audiocn.dev` and writes source files and the three npm dependencies into your project. Review the diff, as with any registry: the content is fetched live from the site, not pinned to a release.
- **Registry source** (`components/ui`, `hooks`, `lib/audio`, `components/blocks`): no analytics or beacons.
  - The only `fetch` is in `useSound`, and it loads the sound URL you pass in.
  - Microphone and system-audio access goes through the browser's own permission prompts (`getUserMedia`, `getDisplayMedia`) and only when you call those hooks.
- **The repo itself** is the Next.js docs site.
  - Cloning it and running `pnpm install` runs a `postinstall` of `fumadocs-mdx`, which generates the docs content.
  - The site uses `@vercel/analytics`. That only affects the audiocn.dev site, not what the registry installs.

## Pros and cons (my assessment)

Pros:

- Fills a real gap: there are few accessible, themeable React audio controls and meters, and these use real dB units and render without re-rendering React.
- Copy-and-own shadcn model with any shadcn theme, Base UI under the hood, a small dependency footprint, MIT, and docs ready for agents.
- The hooks make microphone, system-audio and mixer demos work out of the box, while the components stay engine-agnostic.

Cons:

- Brand new: built in about three days, with very few commits after launch, no releases or versioning, and only two main authors. There is no update path once code is copied, other than re-adding the item.
- Needs React 19.2+, Tailwind v4 and a shadcn setup. The README calls the blocks "drop in and ship", but they will still need wiring to your audio.
- Accessibility and performance claims are self-reported.

## Alternatives and related

- [ElevenLabs UI](https://github.com/elevenlabs/ui) (2.4k stars, MIT): another shadcn-based registry, aimed at voice and agent apps (orbs, waveforms, voice chat). See also [ElevenLabs](/Technology/AI/Tools/Voice Cloning/ElevenLabs).
- [wavesurfer.js](https://github.com/katspaugh/wavesurfer.js) (10k stars, BSD-3-Clause): a framework-agnostic waveform player library, if you only need waveform playback.
- General UI kits: [React Next → Design Systems](/Technology/Frontend/Tools/React Next) (shadcn/ui and its registries such as RetroUI and ReUI), and [SakaniUI](/Technology/Frontend/Tools/SakaniUI), an installed package rather than copy-and-own.
- [Web And Desktop Frameworks](/Technology/Frontend/Tools/Web And Desktop Frameworks) lists OrcDev's shadscan (UI audits for shadcn apps).
