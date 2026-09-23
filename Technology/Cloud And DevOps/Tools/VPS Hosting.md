---
area: technology
domain: vps
type: guide
title: VPS Hosting
description: Guide to fixing the UFW and Docker firewall conflict on a VPS with ufw-docker, plus an overview of the Nixopus VPS management platform.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - vps
  - ufw
  - docker
  - firewall
  - security
  - linux
resource: https://github.com/chaifeng/ufw-docker
---

# VPS Hosting

## Managing the Firewall with UFW and Docker

Tags: #ufw #docker #firewall #security #linux #ufw-docker

### UFW (Uncomplicated Firewall)

#### Introduction

UFW is a user-friendly command-line interface for managing `iptables` (the netfilter firewall) on Linux. UFW's goal is to simplify firewall configuration so users can easily allow or block connections to and from the server.

#### Main Functions

- Manage rules that allow or deny connections based on port, protocol, and source/destination IP address.
- Support predefined application profiles.
- Easily enable and disable the firewall.

### The UFW and Docker Compatibility Problem

#### How Docker Manages Networking

Docker has its own networking mechanism. When you expose a container port (for example `docker run -p 80:80 nginx`), Docker automatically adds rules to `iptables` (specifically in the `DOCKER` chain) to forward traffic from the host port to the corresponding container port.

#### Conflict with UFW

The `iptables` rules created by Docker are usually inserted ahead of UFW's rules or have higher priority. As a result:

- UFW cannot control the ports exposed by Docker.
- Even if you use `ufw deny <port>` or `ufw default deny incoming`, ports opened by Docker can still be reached from outside.
- This is a potential security risk, since unintended services may be exposed.

### Solution: ufw-docker

#### Introduction

`ufw-docker` is a tool (usually a script) designed to solve the compatibility problem between UFW and Docker. It lets UFW "see" and properly manage the ports exposed by Docker containers.

- Popular repository: `https://github.com/chaifeng/ufw-docker`

#### How It Works (Overview)

`ufw-docker` typically intervenes in how Docker interacts with `iptables`. It adjusts `iptables` rules so that traffic to Docker ports must pass through UFW's rules first.
Specifically, it may:

- Modify the `DOCKER-USER` chain in `iptables` so UFW can apply policy.
- Ensure UFW's default rules (for example `deny incoming`) also apply to Docker ports unless explicitly allowed in UFW.

#### Installation (Example with chaifeng's Script)

1.  Download the script:
    ```bash
    sudo wget -O /usr/local/bin/ufw-docker https://github.com/chaifeng/ufw-docker/raw/master/ufw-docker
    sudo chmod +x /usr/local/bin/ufw-docker
    ```
2.  Configure UFW to manage Docker (after installing `ufw-docker`):
    Edit the file `/etc/ufw/after.rules` and add the following at the end of the file, before the last `COMMIT` line:

    ```
    # BEGIN UFW AND DOCKER
    *filter
    :DOCKER-USER - [0:0]
    -A DOCKER-USER -j RETURN -s 10.0.0.0/8
    -A DOCKER-USER -j RETURN -s 172.16.0.0/12
    -A DOCKER-USER -j RETURN -s 192.168.0.0/16

    -A DOCKER-USER -p udp -m udp --sport 53 --dport 1024:65535 -j RETURN

    -A DOCKER-USER -j UFW_DEFAULT_INPUT_DENY_FORWARD
    -A DOCKER-USER -j DROP

    COMMIT
    # END UFW AND DOCKER
    ```

    Note: The IP ranges `10.0.0.0/8`, `172.16.0.0/12`, and `192.168.0.0/16` are common private ranges and may need adjusting for your network setup. The UDP line for DNS lets containers resolve domain names.

3.  Restart UFW and Docker:
    ```bash
    sudo systemctl restart ufw
    sudo systemctl restart docker
    ```
    Or, if UFW is not yet enabled:
    ```bash
    sudo ufw enable
    sudo systemctl restart docker
    ```

#### Usage

After installing and configuring `ufw-docker`:

- To expose a Docker container port externally, you must allow that port in UFW:
  ```bash
  sudo ufw allow <port_number>
  ```
  For example, if the container exposes port 8080, run `sudo ufw allow 8080`.
- Other UFW rules (for example `ufw allow from <ip_address> to any port <port_number>`) will work as expected with Docker ports.

### Important Notes

- Order: Install and configure basic UFW first, then install `ufw-docker` and make the necessary adjustments.
- Verification: Always thoroughly check the open ports from an outside machine (using `nmap` or a similar tool) after configuring to make sure the firewall works as intended.
- Updates: Follow the `ufw-docker` repository for updates and security fixes.
- Understand `iptables`: Basic knowledge of `iptables` helps you understand how `ufw-docker` works and troubleshoot problems.
- Restart services: After changing UFW configuration or installing `ufw-docker`, restart both UFW (`sudo ufw reload` or `sudo systemctl restart ufw`) and Docker (`sudo systemctl restart docker`) to apply the changes.

## Tools / Frameworks / Platforms

### Nixopus (VPS Management Platform)

- **Overview & Core Purpose:**
  - A platform designed to simplify managing Virtual Private Servers (VPS)
  - Goal: streamline workflows for DevOps engineers, system administrators, and developers
- **Key Functions & Features:**
  - One-click application deployment
  - Integrated web-based terminal
  - Visual file manager
  - Real-time monitoring: CPU, RAM, container usage
  - Integrated TLS management
  - GitHub integration for CI/CD
  - Proxy management via Caddy
  - Notification integrations: Slack, Discord, Email
  - Comprehensive deployment tools
  - User-friendly interface
  - Customizable installation options
  - Self-hosted deployment
- **Main Use Cases:**
  - Simplified VPS management: for DevOps professionals, system administrators, and developers
  - Rapid application deployment: quickly deploy apps to virtual servers
  - Server monitoring & maintenance: monitoring capabilities and maintenance tools
  - CI/CD automation: integration with GitHub
- **Advantages & Strengths:**
  - Simplified workflow: integrated tools (one-click deployment, file manager, web-based terminal)
  - Improved efficiency: real-time monitoring, CI/CD integration
  - Centralized control: a single interface for managing many aspects of a VPS
  - DevOps support: GitHub integration, proxy management

> **See also:** [DevOps Tools](/Technology/Cloud And DevOps/Tools/DevOps Tools) · [VPN Proxy Firewall](/Technology/Cloud And DevOps/Tools/VPN Proxy Firewall) · [Reverse Proxy](/Technology/Cloud And DevOps/Tools/Reverse Proxy)
