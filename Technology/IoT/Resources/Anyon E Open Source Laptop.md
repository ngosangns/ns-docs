---
area: technology
domain: iot
type: resource
title: anyon_e Open Source Laptop
description: Notes on anyon_e, Byran Huang's MIT-licensed open-source 13.3 inch laptop built around a FriendlyElec CM3588 (RK3588) module, a Samsung 4K AMOLED panel, and a custom power board, keyboard, and CNC chassis.
timestamp: "2026-10-21T00:00:00.000Z"
tags:
  - technology
  - iot
  - hardware
  - rk3588
  - open-hardware
resource: https://github.com/byrantech/laptop
sources:
  - url: https://www.byran.ee/posts/creation
    title: Creation (byran.ee, 2026-01-22)
  - url: https://github.com/byrantech/laptop
    title: byrantech/laptop README
  - url: https://www.youtube.com/watch?v=fks3PBodyiE
    title: How I Made A Laptop From Scratch - anyon_e
generated:
  by: agent
  at: "2026-10-21T00:00:00.000Z"
status: draft
---

# anyon_e Open Source Laptop

[anyon_e](https://github.com/byrantech/laptop) (also written "anyon e") is a one-off, MIT-licensed laptop that Byran Huang built as his 2024-25 fall senior project at Phillips Exeter Academy, advised by Brad Robinson and Charles Mamolo. The blog post is dated 2026-01-22 and says the work ran from May 2024 until then. The name comes from anyons, particles that are neither bosons nor fermions; the README glosses that as "integrated like bosons, distinct like fermions."

Checked 2026-10-21 against the [Creation post](https://www.byran.ee/posts/creation), the [GitHub README](https://github.com/byrantech/laptop), and the [YouTube description](https://www.youtube.com/watch?v=fks3PBodyiE). The GitHub URL `Hello9999901/laptop` redirects to `byrantech/laptop`. The old handle is still in the site footer, the KiCanvas links, and the `Adafruit_nRF52_Bootloader` submodule. Repo state that day: public, MIT, about 4.3k stars, 259 forks, 68 watchers, 123 commits. Repo folders: `audio`, `batteries`, `chassis`, `display`, `ec`, `haptic`, `keyboard`, `motherboard`, `pdfs`, `power`, `switch`, `trackpad`, `website`, `wireless`.

The headline on the blog says the machine plays Minecraft at 4K, runs models above 7B parameters, browses the web, and lasts about 7 hours. None of those four claims is backed by a measurement in the writeup. The power section says the firmware was not optimized and quiescent draw was still about 50 mA. Treat the headline as the author's claim, not a measured result.

## What is custom and what is a module

The SoC board is not a from-scratch RK3588 design. Huang picked the FriendlyElec CM3588 system-on-module and designed the carrier, the power board, the keyboard, and the chassis around it. The stated reason is that a full custom SoC board was out of reach for the project.

RK3588, as he lists it: four Cortex-A76 plus four Cortex-A55, Mali-G610, 6 TOPS NPU, 8K60 decode, 8K display output, dual USB 3.1, PCIe 3.0 x4, HDMI 2.1 and eDP 1.4. The YouTube description adds 16 GB DDR4, an M.2 NVMe Gen 3 SSD, and a total thickness under 18 mm. Those three numbers are only in the video description, not in the blog body.

CAD is in OnShape: [document `a18bb6df7dbba66df24a7ec8`](https://cad.onshape.com/documents/a18bb6df7dbba66df24a7ec8/w/967d921e60c207e3b6f5cf7b/e/1f78a9387b17c2d178742295).

## Display

The panel is a Samsung ATNA33TP11, 13.3 inch, 4K AMOLED, driven over eDP. He found it through Panelook and bought new stock on Taobao because of OLED burn-in. To pass the 1.5 GHz four-lane eDP link he swapped the connector and shortened the board by 2 mm. Linux bring-up used logs from Asus laptops that ship the same panel, on a kernel that is not mainline. The "coming soon" deep dives on the display and the mainboard both link back to this same post, so there is no second article.

## Mainboard

Target width was under 90 mm, set by the battery and panel dimensions.

External I/O:

- Two USB 3.1 Type-C (README says USB 3.1 Gen 1)
- One USB 2.0 Type-A
- Headphone jack
- microSD

Internal:

- M.2 E-key: Realtek RTL8852BE, Wi-Fi 6 (802.11ax) and Bluetooth 5.2
- M.2 M-key: NVMe up to 2242. A full-length NVMe needs chassis changes
- ESP32-S3 as the embedded controller, per the README

KiCanvas: [motherboard tree](https://kicanvas.org/?github=https://github.com/Hello9999901/laptop/tree/main/motherboard).

## Power

Four cells, each 6 mm thick, taking about half the chassis volume. Cells are Powerizer / AA Portable Power Corp polymer packs, [3.7 V 4250 mAh 15.7 Wh, 8.5 A rate, prewired with a PCB](https://www.batteryspace.com/polymerli-ionmodule37v4250mah157wh85arate-prewiredwithpcbpl5467100.aspx). His arithmetic: 4.250 Ah x 3.7 V x 4S = 62.9 Wh, peak 4.2 V x 4S = 16.8 V, and 8 A giving 134.4 W max discharge. The README rounds the pack to about 60 Wh.

Charging accepts up to 20 V USB-C (100 W) into a TI BQ25713. A TI BQ77915 balances the cells. An Analog LTC2943 tracks state of charge. An ESP32-S3 runs the pack. He load-tested it to about 5 A and ran the whole system off it. Quiescent current was still about 50 mA because the firmware was not optimized.

The ESP32's USB plugs into an internal USB port on the motherboard and sends telemetry over UART. A Python script and a kernel module forward that into the kernel battery service so the desktop shows it natively.

KiCanvas: [power tree](https://kicanvas.org/?github=https://github.com/Hello9999901/laptop/tree/main/power).

## Software

The installed system is Ubuntu 24.04 LTS on kernel 6.1, from Joshua Riek's [ubuntu-rockchip](https://github.com/Joshua-Riek/ubuntu-rockchip), using Armbian's kernel, which he believes still tracks Rockchip's tree. He had not done Linux bring-up before. Almost all of the board description lives in the device tree. He compiled it on a Mac through an OrbStack Ubuntu 24.04 container: DTSI/DTS, then `dtcpp`, then `dtc`, producing `anyon_e.dtb`, copied over with `scp` and installed with `u-boot-update`. Bring-up covered display, PCIe, and USB.

## Keyboard and trackpad

The keyboard pulls out and works as a standalone wireless keyboard. Switches are Cherry MX ULP. Firmware is ZMK on an nRF52840 that sits under the spacebar. Power is a 1 mm, 200 mAh cell from PowerStream plus a small protection board tucked between two rows, saving about 1.6 mm of PCB height. The stack is PLA and 6061 aluminum from Fabworks, under about 7 mm total. Keycaps were printed in PLA on a Bambu Lab X1C with a 0.15 mm nozzle because none were easy to buy.

The trackpad is not custom sensing. It is an Azoteq PXM0057-401 eval board from Mouser, about $35, with a glass top, multi-touch, and USB. He notes the part has since gone out of production with few replacements. The YouTube description calls it a 10-finger trackpad.

KiCanvas: [keyboard tree](https://kicanvas.org/?github=https://github.com/Hello9999901/laptop/tree/main/keyboard).

## Chassis, cooling, audio

The chassis is CNC aluminum, anodized matte black. He sent blocks to JLC to compare finishes, liked dark gray best in hand, and picked matte black for the look. The shape mixes the Razer Blade and the MacBook Pro. Because the keyboard comes off, the bottom shell has no screws; the palm rest screws into it.

The hinge is Framework's 13.3 inch [display hinge kit](https://frame.work/products/display-hinge-kit?v=FRANFB0001), constrained in OnShape so the closing angle is exact. Layout: batteries on the bottom, power board on the right, motherboard on the left, hinge at the top. A clear PETG power button on its own PCB lights up. A carbon fiber rod (McMaster 2153T11) balances the hinge, which is offset because the mainboard is wide.

Cooling is a full-copper CNC heatsink from JLCCNC plus a heatpipe and a fan, joined with PTM7950. Clearance between the keyboard and the heatsink is under half a millimeter. He did not have a way to make a custom heatpipe and fin stack. Smaller structural parts are JLC SLS nylon and FDM PA6-CF.

Audio is a pair of PUI [AS04004MO-SP40](https://puiaudio.com/product/speakers-and-receivers/as04004mo-sp40) speakers. The CM3588 DAC output did not work and he ran out of debug time, so audio goes through a separate USB-to-audio board and a class-D amplifier he did not design.

## Limits of the sources

- The blog says its two deep dives are "coming soon" but both links point at the same post.
- Minecraft at 4K, models above 7B, web browsing, and the ~7 hour battery life appear only in the opening sentence. The power section contradicts "fully optimized."
- 16 GB DDR4, NVMe Gen 3, and thickness under 18 mm appear only in the YouTube description.
- Star and fork counts move. The figures above are from 2026-10-21.
