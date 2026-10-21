---
area: technology
domain: genai
type: tool
title: Mash Loop
description: Mash Loop (lvt1693/mashloop, MIT) is an endless local jukebox. It uses beat tracking and stem separation to loop each song through seamless jump points and mix a library into one continuous DJ-style set. Weeks old, one author, tested on Windows only.
timestamp: "2026-10-22T00:00:00.000Z"
tags:
  - technology
  - audio
  - music
  - python
  - webaudio
resource: https://github.com/lvt1693/mashloop
---

# Mash Loop

[Mash ∞ Loop](https://github.com/lvt1693/mashloop) (demo: [mashloop.truclv.com](https://mashloop.truclv.com)) plays music without end. Inside a song it jumps between sections that sound alike, so you cannot tell which repeat you are on. Between songs it finds a beat-matched point to mix into the next one. It is the idea of the old [Infinite Jukebox](https://musicmachinery.com/2012/11/12/the-infinite-jukebox/) extended from one song to a whole library. Checked 2026-10-22 against the README, `requirements.txt`, the repo tree, and the GitHub API. I did not run it or open the demo.

|           |                                                                                                                             |
| --------- | --------------------------------------------------------------------------------------------------------------------------- |
| Author    | GitHub user `lvt1693` (only contributor listed)                                                                             |
| License   | MIT for the code; downloaded music stays with its owners                                                                    |
| Created   | 2026-10-15; README changelog has entries for 15, 16, and 17 Oct; no GitHub releases                                         |
| GitHub    | 73 stars, 32 forks, 0 open issues                                                                                           |
| Language  | Python backend (`loopbox/`, FastAPI), vanilla JavaScript front end (`web/`)                                                 |
| Docs      | README is in Vietnamese with a short English summary at the end. The web UI is Vietnamese; code and comments are in English |
| Tested on | Windows 11, Python 3.13, NVIDIA GPU. Not tried on macOS or Linux; CPU works but analysis is slower                          |

## What it does

- Mixes a library into one chain, spending a while on each song and then moving to the next good splice point.
- Thirteen transition types (straight splice, drop, blend, long filtered crossfade, echo, wash, build-up, flanger, silence break, plus off-by-default turntable effects) and ten blend styles (EQ swap, filter sweep, vocal swap, acapella, mashup, double drop, loop outro, and others).
- Key lock: tempo is stretched up to 8% (18% with a gradual ramp, half/double time such as 70 ↔ 140 included) without shifting pitch. Songs in different keys get shifted by up to two semitones, then glide back to their own key.
- Vocal awareness: avoids cutting mid-phrase, swapping male and female singers mid-line, or stacking two vocals. Uses a separate vocal stem so a mix can carry only the instrumental or lay one song's vocal over another's backing.
- Next-song criteria: balanced, same mood, same tempo, key-compatible (Camelot wheel), a "DJ set" arc with warm-up, peak and breaks, or free choice, each looking one step ahead.
- Sources: YouTube (including playlists), SoundCloud, Bandcamp, Zing MP3, Mixcloud, YouTube search, or dropped files and zips. There are nine built-in libraries, eight of them Creative Commons music from Jamendo, ccMixter, and Incompetech.
- Each song gets a mood colour and the UI is drawn as an ∞ made of two rings, one per song, touching at the mix point.

## How it works

Per song, in `loopbox/analysis/` (README description):

1. Beat This! (CPJKU) detects beats and downbeats, then a refinement step snaps each beat to its onset peak.
2. Demucs separates drums, bass, vocals, and the rest.
3. Each beat gets a descriptor (harmony from the drumless part, timbre, loudness, rhythm, per-stem levels, vocal pitch and timbre). Song mood comes from drums, tempo, brightness, and major/minor.
4. Key is estimated with the Albrecht-Shanahan profile; sections and phrases come from a self-similarity matrix.
5. Jump points are beat pairs whose surrounding 8-beat windows match at the same position in a 4-bar phrase, with per-jump crossfades (12 ms for hard drums up to 60 ms for sustained notes).
6. Transitions between each pair of songs are computed once and shared with all users.

Playback in `web/js/` is plain Web Audio API scheduled 0.6 s ahead, finding the route to a transition with Dijkstra over the jump graph. Time-stretch with key lock is [signalsmith-stretch](https://github.com/Signalsmith-Audio/signalsmith-stretch) in the browser. There is no framework and no build step.

## Run it

Needs Python 3.11+, ffmpeg on `PATH`, and Node.js 20+ (yt-dlp uses it for YouTube's player). The README's recipe installs CUDA PyTorch 2.6, `beat-this`, and `demucs`, then `requirements.txt`, then runs `.\run.ps1` to serve `http://127.0.0.1:8765`. The first analysis downloads about 160 MB of models. Equivalent command elsewhere: `python -m loopbox.server --open`.

Setting `MASHLOOP_MULTIUSER=1` switches to a multi-user server where every visit gets its own library and songs and song-pair splices are shared. `deploy/` has scripts for an Ubuntu GPU host with systemd and HAProxy with Let's Encrypt.

## Caveats

- Quality claims are the author's own. The README reports simulated 6-hour runs (for example "same mood" cut mood jumps from 0.49 to 0.31 against 0.76 for random picks) and a 4-minute Chrome playback with no dropouts, and says the human ear is the final judge. I did not reproduce any of it.
- It depends on `yt-dlp` and third-party sites, so downloads can break as those sites change. The README itself warns that Zing MP3 is flaky and SoundCloud previews are rejected. It says Suno audio is not supported because it is encrypted.
- Copyright: the repo ships no music. The author asks for personal use and respect for site terms. Pulling audio from YouTube and similar sites may breach their terms, which is your call to weigh. The hosted demo adds per-IP limits and shuffled audio delivery, and the README says that is not DRM.
- Hosted demo limits as stated: 10 added songs per library, and audio is deleted after 12 hours without a listener.
- Single author, a few days old, and last push before this check was 2026-10-16 UTC.

Related: [Content And Multimedia Tools](/Technology/AI/Tools/GenAI/Content And Multimedia Tools) and [Audiocn](/Technology/Frontend/Tools/Audiocn) for browser audio UI components.
