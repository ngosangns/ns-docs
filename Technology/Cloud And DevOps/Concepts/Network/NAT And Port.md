---
area: technology
domain: networking
type: note
title: NAT And Port
description: How a home ISP router maps a public dynamic IP and port to a local IP and port through NAT port forwarding.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - networking
  - devops
---

# NAT And Port

Every household that signs up for an internet plan gets a public dynamic IP (it changes automatically after the modem is reset).

The ISP's router provides NAT port forwarding (mapping one port on the public dynamic IP to a local IP + port). If the ISP has locked that feature on the router, you need to call the ISP and ask them to enable it.

Signing up for a household internet plan is what assigns that public dynamic IP. A modem reset is what changes it. NAT port forwarding on the ISP router is the mapping itself. One port on the public dynamic IP goes to a local IP and a local port. When that feature is locked, the step in the note is to call the ISP and ask them to enable it. Nearby notes cover VPC and availability zones, and file transfer and networking.

> **See also:** [VPC And Availability Zones](/Technology/Cloud And DevOps/Concepts/Network/VPC And Availability Zones) · [File Transfer And Networking](/Technology/Cloud And DevOps/Tools/Tools Notes#file-transfer-and-networking)
