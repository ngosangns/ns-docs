---
area: technology
domain: sandboxing
type: case-study
title: Building Your Own Sandboxes
description: Notes on Alfonso Campodonico's "Building your own sandboxes" (2026-10-18) - vmkit runs Firecracker or Cloud Hypervisor microVMs behind one API, each VMM inside a rootless namespace jail with a default-deny per-VM network, and kiln turns OCI images into one-erofs-per-layer microVM images. Main lesson - the VMM is the easy part, the policy around it is the work.
timestamp: "2026-10-19T00:00:00.000Z"
tags:
  - technology
  - sandboxing
  - security
  - microvm
  - firecracker
  - agents
resource: https://alfonsocampodonico.com/posts/building-your-own-sandboxes
---

# Building Your Own Sandboxes

Notes on [Building your own sandboxes](https://alfonsocampodonico.com/posts/building-your-own-sandboxes) by Alfonso Campodonico (2026-10-18, 6 min read). The article describes two layers the author built to run untrusted code without renting a sandbox vendor:

- **vmkit**: microVMs on [Firecracker](https://github.com/firecracker-microvm/firecracker) and [Cloud Hypervisor](https://github.com/cloud-hypervisor/cloud-hypervisor) behind one API. Every VMM runs in a rootless sandbox with a default-deny network.
- **kiln**: turns OCI images into microVM images and boots them. kiln depends on vmkit, never the reverse.

The article links **no source repository**, and a search found none, so vmkit and kiln could not be inspected. It also reports **no performance numbers** (boot time, memory, density). Everything below is the author's description.

## The promise and the threat model

"A sandbox makes one promise: code you don't trust runs, and nothing it does reaches anything you care about."

The rule: images, guests, and anything running inside them are untrusted. **Nothing the guest reports** (an exit code, a digest, a size) **drives a security decision.**

Protected assets: the host, other VMs on it, credentials the host can reach (cloud metadata, registry tokens), the local image store, and even your terminal. The guarantees listed:

| #   | Guarantee                                                                                                                               |
| --- | --------------------------------------------------------------------------------------------------------------------------------------- |
| T5  | Guests can't reach link-local (including cloud metadata), private, loopback or host addresses, or other VMs. They can't spoof addresses |
| T6  | VMMs run unprivileged and only see the files and devices their VM needs. Nothing runs as root                                           |
| T8  | Every string from the guest or the image is sanitised before it's printed                                                               |
| T9  | Guest messages are size-bounded and schema-validated. A protocol violation ends the VM                                                  |

Why a microVM rather than a container: a container shares the host kernel, so every syscall is attack surface. A microVM has its own kernel, so an escape needs a guest kernel bug **and** a KVM or VMM bug, but only if the VMM itself is locked down. Firecracker's own answer is its jailer, which needs root; the author wanted neither root nor a weaker bar.

## Layer one: a rootless jail (vmkit-sandbox)

A small helper builds a jail from Linux namespaces as a normal user and refuses to run as root. Three stages:

1. `run` unshares user and PID namespaces and maps your uid.
2. Inside the new user namespace it sets `max_user_namespaces` to 0, so nothing inside can create its own, and marks itself undumpable.
3. `init` becomes PID 1, unshares mount, network, IPC and UTS, builds the root, `pivot_root`s into it, then execs the VMM or supervises the program.

If a stage dies, the next gets SIGKILL; nothing outlives its parent.

What a VMM sees:

- a read-only 1 MiB tmpfs holding `/dev/kvm`, the VMM binary, the kernel, its disks, and one socket directory;
- fixed paths (`/vm/disk/0`) independent of host layout;
- files opened by descriptor, never via a symlink, so a compromised VMM can't redirect them;
- tight rlimits, no core dumps, a cgroup scope when available (MemoryMax, CPUQuota, TasksMax);
- `no_new_privs`, its own session keyring, no inherited descriptors but stdio.

On top: Firecracker's own seccomp filters, and Landlock rules for Cloud Hypervisor's exact files.

The same helper runs any program, not just a VMM. When code only needs containing, not booting, a namespace jail "costs a fraction of a VM". Two flags do most of the work:

- `nest`: the program gets its own user namespace, root over its files but unable to mount, change routes, or touch the firewall.
- `seccomp`: blocks mounts, `unshare`, `setns`, BPF, `io_uring` and similar. Trick: `clone3` returns `ENOSYS`, so libc falls back to `clone`, whose flags seccomp can inspect.

```rust
let spec = Spec {
    command: Command {
        program: Program::Path("/usr/bin/python3".into()),
        args: vec!["untrusted.py".into()],
        ..
    },
    root: Root::Overlay { lowers: vec![base], upper, work },
    ids: Ids::Subordinate { count: 65536 },
    network: Network::Egress(NetSpec::default()),
    nest: true,
    seccomp: true,
    ..
};
let status = sandbox::spawn(&spec, Stdio::inherit())?.wait()?;
```

## Layer two: two VMMs, one API

vmkit drives both VMMs through one `Vmm` trait, built against both from day one "because an abstraction designed against one backend always leaks it". Callers decide from `capabilities()`, never from the backend's name.

```rust
let vmm = backend.discover()?;
let mut vm = vmm.create(&VmSpec { kernel, disks, .. })?;
vm.start()?;
let end = vm.wait()?;
```

|                           | Firecracker                 | Cloud Hypervisor         |
| ------------------------- | --------------------------- | ------------------------ |
| Virtio devices            | 17 on x86_64, 92 on aarch64 | 31, one taken by its RNG |
| How the guest ends the VM | reboot                      | poweroff                 |
| Console                   | ttyS0                       | ttyAMA0 on aarch64       |
| Extra confinement         | Its own seccomp filters     | Landlock                 |

A real bug hid in the exit row: on Cloud Hypervisor a guest reset reboots the VM, so a workload can silently run twice. vmkit watches the VMM's event stream and kills it on a reset, and kills it anyway if it can't read the stream. The guest kernel is pinned (the diagram names a 6.18 kernel).

## The network: default deny, outside the guest

"Most sandbox escapes that matter in the cloud aren't kernel exploits. They're a guest asking 169.254.169.254, the cloud metadata service, for the host's credentials." (Compare the IMDS credential theft in [CVE-2026-40175 Axios IMDS Bypass](/Technology/Security/Write Ups/CVE-2026-40175 Axios IMDS Bypass).)

- Each VM has its own network namespace with an nftables chain the guest can't touch. The guest kernel has no netfilter.
- Path: guest NIC → `tap0` in the VM's netns (gateway and DNS) → nftables forward chain → unprivileged userspace egress proxy over ordinary host sockets → internet. The host's firewall never changes.
- Forward chain order:
  1. drop IPv6 and spoofed sources;
  2. accept established flows and port forwards;
  3. accept destinations in the allow set;
  4. drop destinations in the deny set: `0.0.0.0/8, 10.0.0.0/8, 100.64.0.0/10, 127.0.0.0/8, 169.254.0.0/16, 172.16.0.0/12, 192.0.0.0/24, 192.168.0.0/16, 198.18.0.0/15, 224.0.0.0/3` plus the host's own address;
  5. otherwise accept.
- Modes in the demo: Restricted, DenyAll, Open.
- IPv6 is dropped entirely because the deny list only knows IPv4 ranges.
- The test suite runs a hostile guest that tries every one of these and must fail at all of them.

## Images: kiln turns OCI images into microVMs

Core decision: **one read-only erofs filesystem per OCI layer.** kiln streams each layer's tar straight into erofs without extracting it, which gives:

- **Determinism**: same input, same bytes on any host; identical layers dedupe across images.
- **Per-layer caching**: a warm convert of an unchanged image is one HEAD request.
- **Runs on a Mac**: nothing is extracted, so no Linux ownership or root is needed.

```sh
kiln convert go:1.27-cli
kiln run alpine:3 -- sh -c 'echo hello'
```

Pipeline:

1. Pull from a registry, OCI layout, or `docker save`; every blob verified by digest.
2. One erofs per layer. If the image has more than `--max-layers` (default 10), bottom layers are squashed.
3. The kiln image is an OCI 1.1 artifact: pinned kernel + kiln-init + app layers + process config. Commands: convert, pull, push.
4. Before boot, kiln checks that the kernel matches the pin, supplies the init layer itself (never from the image), and that the disks fit the VMM's device budget.
5. Every layer becomes a virtio-blk disk (vda init, vdb… app layers, scratch ext4), plus vsock and NIC.
6. In the guest, kiln-init (PID 1) says hello and receives its config over one schema-validated vsock channel.
7. It mounts the erofs layers and the writable ext4 scratch disk, stacks them with overlayfs, `pivot_root`s.
8. It sets hostname, hosts, DNS, network; starts the image's command and relays stdio; supervises signals and reaping; syncs scratch and sends `Exited`.

The **device budget** is why layers get squashed: layers, vsock, and the NIC share the VMM's virtio device limit (for example 6 layers = 10 of Firecracker x86_64's 17 devices).

Trust is explicit at boot: kiln pins the digests of the kernels and kiln-init builds it trusts, so a malicious image can't swap kernel or init.

## What's next (per the author)

- **Lazy restore**: snapshots as OCI artifacts, fetched in chunks on demand from below the VMM.
- **A containerd shim**, so kiln images run as a Kubernetes RuntimeClass.
- **IPv6**: needs an IPv6 deny list, anti-spoofing, and neighbour discovery handled outside the guest.

## Takeaways

- **The VMM is the smallest part.** Most code and nearly all bugs are in who runs it, what it can open, and where its packets go.
- **Put policy outside the guest.** Firewall, kernel, and init are decided on the host, where a compromised guest can't argue.
- **Don't trust guest output.** Bound, validate, and sanitise every message and string, even before printing to a terminal.
- **Block cloud metadata first.** Link-local and private ranges are the practical escape route, not kernel exploits.
- **Not every job needs a VM.** A rootless namespace jail with nested userns and seccomp is a cheaper tier for code that only needs containing.

## Hosted alternatives

The article's footnote lists vendors at the time of writing: E2B, Modal, Daytona, Vercel Sandbox, Cloudflare Sandbox, CodeSandbox SDK, Fly.io Machines, Northflank, Runloop, Blaxel, Morph Cloud, and Beam. Their isolation technologies and pricing were not checked for this note. Daytona is already listed in [Agent Infrastructure And Platforms](/Technology/AI/Tools/Agents/Agent Infrastructure And Platforms), and [Google AX](/Technology/AI/Tools/Agents/Google AX) runs agent tasks in sandboxes on its own substrate.

Other self-hostable microVM building blocks are collected in [infracloudio/awesome-microvm](https://github.com/infracloudio/awesome-microvm), including Kata Containers, Flintlock, libkrun-based tools such as smolvm, and Hyperlight. They were not evaluated here. Firecracker itself is Apache-2.0, built by AWS for Lambda and Fargate.
