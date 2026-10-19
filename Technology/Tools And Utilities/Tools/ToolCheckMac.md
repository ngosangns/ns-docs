---
area: technology
domain: utility-tools
type: tool
title: ToolCheckMac
description: ToolCheckMac (huytran1120/ToolCheckMac, MIT) is a native SwiftUI app for checking a used Mac before buying - battery, SSD SMART, MDM/DEP, Activation Lock, serial cross-check, interactive keyboard/screen/audio/camera/trackpad tests and a 0-100 score with PNG/PDF report. Source review found no network code, no sudo and read-only system commands; release builds are unsigned and not notarized.
timestamp: "2026-10-19T00:00:00.000Z"
tags:
  - technology
  - utility-tools
  - macos
  - hardware-diagnostics
  - used-mac
resource: https://github.com/huytran1120/ToolCheckMac
---

# ToolCheckMac

[ToolCheckMac](https://github.com/huytran1120/ToolCheckMac) (app name ToolCheckMacBook) is a native macOS app for inspecting a Mac's hardware and lock state, aimed at people buying a second-hand Mac, shops and technicians. The UI and reports are bilingual Vietnamese/English. Site: [huytran1120.github.io/ToolCheckMac](https://huytran1120.github.io/ToolCheckMac/).

Checked 2026-10-19 (repo state at commit `6503ed7`, v1.3.2):

- Author: GitHub user huytran1120 ("huy tran", Viet Nam, account since 2020).
- License MIT. Language Swift 6 / SwiftUI, Xcode project generated with XcodeGen.
- 5 stars, 0 forks, 0 open issues. 36 commits, all by one author.
- Created 2026-10-09, last push 2026-10-18 23:33 (UTC+7). Very new.
- Releases: v1.2.0 (2026-10-09), v1.3.1 and v1.3.2 (both 2026-10-18). Universal 2 (arm64 + x86_64), macOS 14 Sonoma or later.

## What it checks (verified in source)

Automatic scan, each item read by a local system tool or framework:

| Area                  | How the code reads it                                                                                                                        |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Model, chip, RAM, OS  | `system_profiler SPHardwareDataType -json`, `ioreg -ar -k product-name` for the marketing name                                               |
| Serial cross-check    | Serial from IOKit compared with `system_profiler`; a mismatch is a red flag                                                                  |
| Battery               | `ioreg -rd1 -c AppleSmartBattery`: cycle count, design vs raw max capacity; cycle count cross-checked between two reads                      |
| SSD                   | `system_profiler SPNVMeDataType -json`: model, size, SMART status (Verified / Failing), free space                                           |
| MDM / DEP             | `profiles status -type enrollment`; `profiles list -all` (often needs root, then reported as unknown)                                        |
| Activation Lock       | `activation_lock_status` field from `system_profiler SPHardwareDataType`                                                                     |
| Apple ID signed in    | `defaults read MobileMeAccounts Accounts`, only checks whether an `AccountID` exists                                                         |
| `/etc/hosts`          | Looks for overrides of `albert.apple.com`, `iprofiles.apple.com`, `mdmenrollment.apple.com`, `deviceenrollment.apple.com` (MDM-bypass signs) |
| SIP                   | `csrutil status`                                                                                                                             |
| Security chip         | `system_profiler SPiBridgeDataType -json` (Apple Silicon / T2 / legacy Intel)                                                                |
| Ports, Bluetooth      | `system_profiler` USB, Thunderbolt and Bluetooth data                                                                                        |
| Temperatures and fans | Read-only AppleSMC calls through IOKit (read-key commands only)                                                                              |

Interactive tests: keyboard matrix, full-screen colour patterns for dead pixels and backlight bleed, left/right speaker, microphone level meter, camera preview, Touch ID prompt (LocalAuthentication), trackpad gestures and Force Touch, live USB plug/unplug, a CPU stress test that watches thermal state (15 s default), and a disk benchmark. The benchmark writes and then reads a 1 GB temp file with `F_NOCACHE` and deletes it afterwards.

There is also an "AI model advisor" that maps unified memory to local LLM sizes (budget is roughly RAM minus 8 GB). It only shows links (Ollama, LM Studio, Hugging Face, MLX) and does no downloads.

Scoring: start at 100, minus 25 per red flag and minus 8 per warning, floored at 0. History is saved to `~/Library/Application Support/ToolCheckMacBook/history.json`, and reports can be exported as PNG or PDF.

README claims that do not match the code: the README lists SSD TBW, power-on hours, unsafe shutdowns and spare capacity. At v1.3.2, `StorageService` only reads the SMART status string; those fields exist only as translation keys. Treat the SSD check as pass/fail SMART, not a full wear report.

## Safety review (source only, not run)

What I skimmed: all of `Sources/`, `scripts/`, the GitHub workflow, the Homebrew cask and the entitlements. Nothing was built or run.

- **Network.** There is no `URLSession`, socket or telemetry code. The only URLs are opened in your browser when you click: checkcoverage.apple.com (AppleCare lookup, which copies the serial to the clipboard first), the LICENSE page, the four LLM sites, and the System Settings microphone pane. This matches the README's "100% offline" claim.
- **Privileges.** The app never calls `sudo`, AppleScript admin prompts or helper tools, and installs no daemons. All 12 subprocess calls go through `ShellRunner`, which uses fixed absolute paths (`/usr/sbin/system_profiler`, `/usr/sbin/ioreg`, `/usr/bin/profiles`, `/usr/bin/csrutil`, `/usr/bin/defaults`) with fixed arguments and a 30 s timeout. There is no shell string, so no injection. All of these commands only read.
- **Files written.** The 1 GB benchmark file in the temp directory (deleted after), `history.json`, exported reports where you choose, and a language preference in UserDefaults.
- **Permissions.** Camera and microphone entitlements are declared for those tests; audio and video are not saved. The app is not sandboxed (`ENABLE_APP_SANDBOX: NO`); hardened runtime is on only for Release builds.
- **Privacy note.** Reports contain the serial number and the lock and management state. Don't post them publicly.
- **Distribution risk (main caveat).** CI builds are not Developer ID signed or notarized, so Gatekeeper will block them. The README itself says not to bypass Gatekeeper. The safest path is to build from reviewed source (`xcodebuild`, see README). If you use the DMG or the Homebrew cask (`brew install --cask` from the repo's raw cask URL, pinned sha256), check the SHA-256 against `checksums.txt` on the release. I did not verify that the release binaries match the source.
- **Build scripts.** `scripts/build_and_notarize.sh` and `scripts/run_tests.sh` only run xcodegen, xcodebuild, codesign, hdiutil and notarytool. They don't use curl. The CI workflow uses `sudo xcode-select` only on the GitHub runner.

## Limits for a used-Mac check

- Offline signals are evidence, not proof. The README says so too: a clean result does not certify that the Mac is released from an organisation. A `/etc/hosts` override or disabled SIP is only a reason to investigate.
- For Activation Lock, have the seller sign out of Find My and iCloud in front of you. Check coverage on [checkcoverage.apple.com](https://checkcoverage.apple.com/). If the Mac will be wiped, use Apple's [Erase All Content and Settings](https://support.apple.com/en-us/102664) (Apple Silicon or T2 Macs).
- Battery health percentage is derived from raw capacity, so it can differ from what System Settings shows.
