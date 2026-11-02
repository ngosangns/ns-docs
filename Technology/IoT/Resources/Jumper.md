---
area: technology
domain: iot
type: resource
title: Jumper
description: Jumper (KingKongRobotics/jumper, Apache-2.0) is a 22-joint crab robot from KingKong Robotics, with an open toolkit for skins, MuJoCo motion training, and scenes.
timestamp: "2026-11-02T00:00:00.000Z"
tags:
  - technology
  - iot
  - robotics
  - hardware
  - mujoco
resource: https://github.com/KingKongRobotics/jumper
---

# Jumper

[Jumper](https://github.com/KingKongRobotics/jumper) is a crab robot from [KingKong Robotics](https://github.com/KingKongRobotics). The README calls the repo an AI toolkit for appearance, motion, and scene creation, and points hardware detail at `docs/HARDWARE.md`. The product page is [kingkong.tech/jumper](https://kingkong.tech/jumper). Checked 2026-11-02 against the org and repo metadata, the README, `docs/HARDWARE.md`, and the top of `pyproject.toml`. The site homepage was read. Product shop pages, the training tutorial, and the free-robot challenge link were not opened. Nothing was trained or purchased.

## Who publishes it

The GitHub org `KingKongRobotics` was created 2026-09-26, is named KingKong Robotics, lists `https://kingkong.tech`, and had 90 followers and 2 public repositories on 2026-11-02. The homepage groups three products: Jumper, tactile servos, and encoders. Prices were not on that homepage.

| Repo | What it is | Snapshot on 2026-11-02 |
| --- | --- | --- |
| [jumper](https://github.com/KingKongRobotics/jumper) | Motion training, replay, and `.app` bundles for the robot | Created 2026-09-28, pushed 2026-10-30, Python, Apache-2.0, 3,046 stars, 338 forks, about 208 MB |
| [jumper-design](https://github.com/KingKongRobotics/jumper-design) | Appearance and scene design. Skins (`.skin`) and maps (`.map`) live here | Created 2026-09-26, pushed 2026-09-30, Python, Apache-2.0, 85 stars, 22 forks |

Maintainer-owned materials are Apache-2.0, copyright 2026 KingKong Robotics. The README says third-party materials keep their own terms, and generated outputs do not automatically inherit the repo license. Example skins and maps are linked from `jumper-design` at commit `be74e0f`.

The README also links a "Get a free Jumper" challenge at `beunlimited.me`. That page was not opened, so the note does not record eligibility or terms.

## Hardware table

Figures below are copied from `docs/HARDWARE.md`. They were not measured on a unit.

| Item | Specification in that file |
| --- | --- |
| Body | 400 x 400 x 200 mm. Weight 1.8 kg. The engineering prototype is listed at 2.8 kg. Maximum grasping weight 1 kg. |
| Compute | Rockchip RK3576. 4 x Cortex-A72 at 2.2 GHz plus 4 x Cortex-A53 at 2.0 GHz. 6 TOPS INT8 NPU. 4 GB memory. 64 GB storage. |
| Motion | 22 tactile servos. The table links the shop page for that part. |
| Sensing | 6-axis IMU. Depth sensor described as dToF, 54 x 42 (2,268 points), 55 by 42 degree field, 5 cm to 8.8 m indoors, with configuration reference ST VL53L9CX. Camera 5 MP, 2592 x 1944, 162.2 degree diagonal field, with configuration reference OmniVision OV16880. |
| Interaction | Two 0.9-inch round TFT color displays, 2 speakers, 4 digital MEMS microphones. |
| Radio and power | Wi-Fi 5, dual-band. Bluetooth 5.0, BR/EDR and LE. Removable Li-ion pack, 25.2 V, 3000 mAh. USB-C, USB PD 3.1, up to 140 W with a compatible charger and cable. |
| Use | Indoor only. |

"Configuration reference" is the file's own wording. It is not the same as a confirmed bill of materials. The OV16880 press page linked from that cell is titled as a 16-megapixel sensor, which does not match the 5 MP row. Treat the 5 MP line as the spec table, and the part number as an unverified reference.

## Software

`pyproject.toml` names the project `mjrl-lab` version `0.0.1`, not `jumper`. It requires Python `>=3.10,<3.14`. The description calls it a dual-backend MuJoCo reinforcement-learning framework: MuJoCo Warp on GPU and native MuJoCo on CPU, sharing managers and rsl_rl code. `mjlab` and `rsl_rl` are vendored under `rl/`. The file says not to pip-install `mjlab` or `rsl-rl-lib` on top of those copies. Comments pin the vendored trees to mjlab 1.6.0 and rsl_rl 5.4.2, with `mujoco~=3.11.0` and `mujoco-warp~=3.11.0`. Training also expects `wandb` and PyYAML. The README points motion work at `docs/TUTORIAL.md`, GPU notebooks at `docs/COLAB.md`, and packaged motions at `deploy/BUNDLE.md`. Those three files were not read.

The public tree lists a root `.env` of about 7 KB. This note did not open it. Do not assume it is empty, and do not copy it into a checkout you share.

## Not checked

No robot was handled. Servo, encoder, and challenge pages were not opened. Training was not run. The `.env` file was not read. The 22-joint count and the rest of the hardware table are the spec file's claims, not a teardown.
