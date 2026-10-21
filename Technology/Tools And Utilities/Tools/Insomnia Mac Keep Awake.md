---
area: technology
domain: utility-tools
type: tool
title: Insomnia Mac Keep Awake
description: "Insomnia (krishhgg/Insomnia, MIT, Swift) is a macOS 26+ menu bar app, not the Kong Insomnia API client, that keeps a MacBook awake with the lid closed for a timed session (e.g. long AI coding-agent runs) via pmset disablesleep, with lid-close actions, battery/heat floors and a launchd recovery backstop. Source review found no telemetry; its main risk is a passwordless sudoers rule for four pmset commands usable by any process running as the user."
timestamp: "2026-10-22T00:00:00.000Z"
tags:
  - technology
  - utility-tools
  - macos
  - keep-awake
  - menu-bar-app
resource: https://github.com/krishhgg/Insomnia
---

# Insomnia (Mac keep-awake)

**Not the Kong Insomnia API client.** [krishhgg/Insomnia](https://github.com/krishhgg/Insomnia) is an original repo, not a fork, by Krish Garg (San Francisco). It is a SwiftUI menu bar app (an eye icon; no Dock icon, no window) that keeps a MacBook awake, including in clamshell mode, for a session with a fixed end time. The target use case is leaving AI coding agents (Claude Code, Codex) running with the lid closed. Website: [getinsomnia.app](https://getinsomnia.app). The repo topics call it an "amphetamine-alternative" and "caffeinate".

Snapshot taken on 2026-10-19:

- **Popularity and activity:** about 1.6k stars, 113 forks, 53 open issues/PRs and 12 contributors on 2026-10-19. On 2026-10-22 the API showed 1,638 stars, 118 forks and 57 open issues/PRs.
- **Code:** about 520 commits since 2026-09-02, roughly 16k lines of Swift in `Sources`, plus a large test suite.
- **License:** MIT.
- **Releases:**
  - v0.1.0 stable (2026-10-10), packaged by hand, with no attestation.
  - Daily `nightly-*` prereleases built by CI, each with `SHA256SUMS` and a GitHub build provenance attestation.
- **Requirements:** macOS 26+ on Apple Silicon. Building from source needs Swift 6.2+.
- **Status:** the author labels it **experimental** and warns: use a ventilated surface, not a closed bag. "Recovery can fail."

## How it works

- **Starting a session:** you enter days, hours and minutes in the menu bar. The app runs `sudo -n pmset -a disablesleep 1`, reads the setting back, and reverts it when the session ends. Click the eye to add time; press and hold the end control to finish early.
- **Battery and heat floors** (defaults, all adjustable):
  - Below 40% battery it turns on Low Power Mode (`pmset -b lowpowermode 1`).
  - Below 10% it ends the session.
  - At serious heat it turns on Low Power Mode; at critical heat it ends the session.
  - These rules only work while the app is running.
- **When the lid closes**, it reverts each of these when the lid opens:
  - turns off the display and keyboard backlight, after saving their brightness
  - freezes apps on a list with `SIGSTOP`; the defaults are Slack, WhatsApp and Discord. Meeting and recording apps are skipped.
  - mutes audio
  - turns on Low Power Mode
  - optionally freezes Docker Desktop when no container is running
- **Recovery journal:** every change is written to a journal before it is made. A per-user LaunchAgent (`com.insomnia.backstop`, runs every minute) undoes the changes if the app is gone when the session should have ended. Before running `backstop.sh` from the app bundle, it checks the bundle with `codesign --verify --strict` against a pinned code requirement.
- **Optional extras:**
  - Wi-Fi failover to an iPhone hotspot. The password is stored in the login Keychain, and the app asks for Location permission only to read SSIDs.
  - After 90 seconds offline, it types `continue` into tmux panes you have explicitly marked (`@insomnia-nudge on`). Enter is pressed only if you opt in.
  - Offers to relaunch Chrome, Arc or Comet without background throttling.
- **Installing:** the README suggests pasting a prompt into your coding agent so it follows `skills/install-insomnia/SKILL.md`. That skill tells the agent never to run `sudo` itself, and to hand the user the password-requiring command instead. You can also install manually (`gh attestation verify` + `shasum`, then `install.sh`) or build from source.

## Safety review (source read, not run)

Reviewed at commit `e242782` (2026-10-19): `Sources/`, `scripts/install.sh`, `backstop.sh`, `uninstall.sh` and `SECURITY.md`.

- **Privilege escalation, the main thing to accept knowingly.** `install.sh` asks for your password once. It validates `/etc/sudoers.d/insomnia` with `visudo -c` and installs it with exactly these lines:

  ```text
  $USER ALL=(root) NOPASSWD: /usr/bin/pmset -a disablesleep 1
  $USER ALL=(root) NOPASSWD: /usr/bin/pmset -a disablesleep 0
  $USER ALL=(root) NOPASSWD: /usr/bin/pmset -b lowpowermode 1
  $USER ALL=(root) NOPASSWD: /usr/bin/pmset -b lowpowermode 0
  ```

  The rule is narrow: fixed arguments, no wildcards. But it is granted to your **user account**, not to the app, so any process running as you can disable sleep. README and SECURITY.md say this openly. The worst case is a Mac that never sleeps, which matters for heat and battery, especially in a bag.

- **Network:** the only HTTP code is a release check, `api.github.com/repos/krishhgg/Insomnia/releases`. It uses an ephemeral `URLSession` that refuses redirects, and it runs from the "Check for updates" button in Settings. I found no automatic call site, but I didn't trace every UI path. There is no auto-update or download-and-execute. No telemetry, analytics or crash-reporting SDKs turned up in the grep.
- **Other system actions, all documented:**
  - `SIGSTOP`/`SIGCONT` on listed apps. A process it can't prove it froze stays frozen.
  - writing `NSAppSleepDisabled` into other apps' defaults; off by default, journaled and restored
  - Keychain item `insomnia-hotspot`
  - typing into tmux panes, opt-in per pane
  - relaunching browsers, after asking
- **Persistence:** a per-user LaunchAgent in `~/Library/LaunchAgents`, plus the sudoers file. `uninstall.sh` removes the app, the agent and the sudoers rule (`--purge` also removes config and logs), and undoes any open session first.
- **Obfuscation:** none found. The source is plain, heavily commented Swift and bash, and there are no binaries besides the icons.
- **Distribution:** builds are ad-hoc signed and **not notarized**, so Gatekeeper blocks the first launch. Verify `SHA256SUMS` and the attestation before installing nightlies. v0.1.0 has no attestation.
- **Privacy:** logs (`~/Library/Logs/Insomnia/`, mode 0600) can contain SSIDs, process details and tmux targets. Check them before sharing.

**Verdict:** this looks like a legitimate, unusually careful hobby or indie tool, not malware. The real trade-offs are the user-wide NOPASSWD `pmset` rule and physical heat risk when running with the lid closed. Built-in alternatives are `caffeinate` (no root needed; from general macOS knowledge, not verified here, it doesn't stop lid-close sleep without an external display) and running `sudo pmset -a disablesleep 1` yourself.

## Update 2026-10-22

Rechecked the GitHub API, recent merged commits and `SECURITY.md`. I did not re-read the whole source.

- No new stable release. The only non-nightly tag is still `v0.1.0`; the newest nightly I saw was 2026-10-19, built from `e242782`, the same commit as the review above. `main` has moved on since then.
- The commits after it are mostly small. They cover CI that runs the Swift tests on the maintainer's Mac mini in throwaway VMs, a Settings option for the default focused field, a Settings version display and release check, an early exit in the backstop when there is nothing to undo, macOS 27 wording fixes, and test fixes. One commit makes the release check refuse redirects and stop guessing where a higher version came from. That fits the "ephemeral `URLSession` that refuses redirects" described above.
- `SECURITY.md` says plainly that this is experimental software with no security-response SLA. It repeats that the passwordless `pmset` grant is not exclusive to the app, and says the app is not sandboxed and log files can hold SSIDs and tmux target names. It sets file modes only and leaves any ACL as it is. Logs are mode 0600, capped at 1 MiB, and mirrored to the unified log with the body marked private.
- The verdict above still stands for the reviewed commit. Commits after `e242782` were not reviewed, so check the diff before installing a newer nightly.

## Caveats

- This review is a static grep and read of a ~16k-line codebase, not a full audit. Neither the app nor the release zips were run or checked.
- The repo is very active, with daily nightlies, so later commits may change any of the above.
- I didn't verify that the website getinsomnia.app matches the repo (it returned HTTP 200).

## Related

- [ToolCheckMac](/Technology/Tools And Utilities/Tools/ToolCheckMac): another native macOS utility, reviewed the same way.
- The Kong Insomnia API client is a different product. See the API-client entries in [Developer Tools And Environments](/Technology/Tools And Utilities/Tools/Developer Tools And Environments).
