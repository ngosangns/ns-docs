# Concepts

- [Building Your Own Sandboxes](Technology/Security/Write%20Ups/Building%20Your%20Own%20Sandboxes.md) - Notes on Alfonso Campodonico's "Building your own sandboxes" (2026-10-18) - vmkit runs Firecracker or Cloud Hypervisor microVMs behind one API, each VMM inside a rootless namespace jail with a default-deny per-VM network, and kiln turns OCI images into one-erofs-per-layer microVM images. Main lesson - the VMM is the easy part, the policy around it is the work.
- [CVE-2026-40175 Axios IMDS Bypass](Technology/Security/Write%20Ups/CVE-2026-40175%20Axios%20IMDS%20Bypass.md) - Analysis of the axios vulnerability chain (prototype pollution → CRLF injection → request smuggling) that bypasses AWS IMDSv2 and steals IAM credentials.
