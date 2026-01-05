---
tags:
  - area/technology
  - domain/tools
  - type/note
  - lang/vi
---

# note MacOS

## Mole

- **Mô tả**: Deep clean and optimize your Mac - công cụ all-in-one để dọn dẹp và tối ưu hóa macOS
- **GitHub**: https://github.com/tw93/Mole
- **Cài đặt**: `brew install mole` hoặc `curl -fsSL https://raw.githubusercontent.com/tw93/mole/main/install.sh | bash`
- **Lệnh chính**: `mo clean`, `mo uninstall`, `mo optimize`, `mo analyze`, `mo status`, `mo purge`, `mo installer`
- **Tính năng**: Deep cleaning, smart uninstaller, disk analyzer, live monitoring, project artifact cleanup
- **Tips**: Preview với `--dry-run`, enable Touch ID với `mo touchid`, shell completion với `mo completion`

## Mac Cleaner CLI

- **Mô tả**: Free & Open Source Mac cleanup tool - scan và xóa junk files, caches, logs từ terminal
- **GitHub**: https://github.com/guhcostan/mac-cleaner-cli
- **Cài đặt**: `npx mac-cleaner-cli` (không cần cài đặt) hoặc `npm install -g mac-cleaner-cli`
- **Lệnh chính**: `npx mac-cleaner-cli`, `npx mac-cleaner-cli --risky`, `npx mac-cleaner-cli uninstall`, `npx mac-cleaner-cli maintenance`
- **Tính năng**: Interactive selection, file explorer (drill down vào folders), categories (safe/moderate/risky), app uninstaller, maintenance tasks
- **Categories**: Trash, browser cache, temp files, system cache, dev cache (npm/yarn/pip/Xcode), node_modules, Docker, Homebrew cache
- **Tips**: Dùng `--risky` để hiện risky categories, `-f` để enable file picker cho tất cả categories, 100% offline - không gửi data

## Homebrew

- **Mô tả**: Package manager cho macOS - công cụ quản lý phần mềm phổ biến nhất
- **Website**: https://brew.sh
- **Cài đặt**: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
- **Lệnh chính**: `brew install/uninstall`, `brew update/upgrade`, `brew list/search/info`, `brew doctor/cleanup`
- **Cask**: `brew install --cask <app>` để cài GUI apps
- **Tips**: Chạy `brew update && brew upgrade` thường xuyên, `brew cleanup` để giải phóng dung lượng

## Raycast

- **Mô tả**: Launcher và productivity tool - thay thế Spotlight và Alfred
- **Website**: https://raycast.com
- **Cài đặt**: `brew install --cask raycast`
- **Tính năng**: App launcher, quick actions, clipboard history, window management, snippets, AI features
- **Use cases**: Launch apps nhanh, quick actions, quản lý clipboard, text snippets, tích hợp development tools

## Rectangle

- **Mô tả**: Window manager - quản lý và sắp xếp windows bằng keyboard shortcuts
- **GitHub**: https://github.com/rxhanson/Rectangle
- **Cài đặt**: `brew install --cask rectangle`
- **Shortcuts**: `⌃⌥←/→` (left/right half), `⌃⌥↑/↓` (top/bottom half), `⌃⌥F` (maximize), `⌃⌥C` (center)
- **Use cases**: Quản lý nhiều windows, tối ưu với multiple monitors, tăng productivity

## Karabiner-Elements

- **Mô tả**: Keyboard customizer - remap keys và tạo complex rules
- **Website**: https://karabiner-elements.pqrs.org
- **Cài đặt**: `brew install --cask karabiner-elements`
- **Tính năng**: Key remapping, complex modifications, device-specific rules, profiles, virtual keyboards
- **Use cases**: Remap keys cho workflow, custom shortcuts, sử dụng non-Apple keyboards, vim-like bindings

## iTerm2

- **Mô tả**: Terminal emulator nâng cao - thay thế Terminal.app
- **Website**: https://iterm2.com
- **Cài đặt**: `brew install --cask iterm2`
- **Tính năng**: Split panes, hotkey window, search history, autocomplete, broadcast input, profiles, shell integration
- **Tips**: Tạo profiles, sử dụng color schemes, enable shell integration, tích hợp với tmux

## The Unarchiver

- **Mô tả**: File extractor - hỗ trợ nhiều định dạng archive
- **Website**: https://theunarchiver.com
- **Cài đặt**: `brew install --cask the-unarchiver`
- **Tính năng**: Hỗ trợ ZIP, RAR, 7z, TAR, GZ, BZ2, XZ, password support, encoding detection
- **Use cases**: Extract archives, xử lý archives từ Windows/Linux, password-protected archives

## Hammerspoon

- **Mô tả**: Desktop automation tool với Lua scripting
- **Website**: https://www.hammerspoon.org
- **Cài đặt**: `brew install --cask hammerspoon`
- **Tính năng**: Lua scripting, window management, system events, hotkeys, menubar, network monitoring, API access
- **Use cases**: Tự động hóa workflows, custom window management, monitor system events, automation phức tạp

## AppCleaner

- **Mô tả**: Gỡ cài đặt ứng dụng sạch sẽ - tìm và xóa tất cả files liên quan
- **Website**: https://freemacsoft.net/appcleaner
- **Cài đặt**: `brew install --cask appcleaner`
- **Tính năng**: Smart delete, preview files, selective deletion, drag & drop, application list
- **Use cases**: Gỡ cài đặt apps sạch sẽ, tìm leftover files, quản lý disk space

## DaisyDisk

- **Mô tả**: Disk space analyzer với visual interface
- **Website**: https://daisydiskapp.com
- **Cài đặt**: `brew install --cask daisydisk`
- **Tính năng**: Visual treemap, quick scanning, file management, multiple disks, filtering
- **Use cases**: Phân tích dung lượng disk, tìm files lớn, dọn dẹp disk space
