---
area: technology
domain: aws
type: guide
title: VPC And Availability Zones
description: Explains how AWS VPCs relate to Regions, Availability Zones and subnets, including core VPC components, subnet types and CIDR examples.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - aws
  - vpc
  - networking
---

# VPC And Availability Zones

In AWS network design, the **VPC Region** is the geographic scope in which you deploy and manage your virtual network (**Virtual Private Cloud - VPC**). Each VPC is created in one Region (for example Singapore, Tokyo, or Sydney) and exists only in that single Region. A Region consists of multiple physically independent Availability Zones (AZs).

## What Is a VPC in AWS Network Design?

### VPC and Region in Detail

1. **VPC (Virtual Private Cloud)**
   A private virtual network that you define and fully control inside AWS. You can customize components such as:
   - Internal IP addresses (CIDR block)
   - Subnets
   - Route tables
   - Security groups and network ACLs (network access control)
   - Internet Gateway, NAT Gateway, VPN gateways
2. **Region**
   The physical geographic location where AWS data centers are placed. Each Region contains multiple Availability Zones (AZs). Examples:
   - `ap-southeast-1`: Singapore
   - `ap-northeast-1`: Tokyo
   - `us-east-1`: North Virginia (United States)
3. **Relationship between VPC and Region**
   - Each VPC belongs to **exactly one Region** and cannot span multiple Regions.
   - However, a VPC can span multiple Availability Zones within the same Region to provide High Availability.
4. **Design considerations for VPC and Region**
   A few notes when designing a VPC:
   - Each Region should have at least one separate VPC to ensure performance and redundancy.
   - To connect VPCs across Regions, you must use **inter-Region VPC peering**, VPN, Transit Gateway, or AWS Direct Connect.

### Example

- You create a VPC with CIDR block `10.0.0.0/16` in the **Singapore (ap-southeast-1)** Region. Inside this Region you create smaller subnets such as `10.0.1.0/24` and `10.0.2.0/24` placed in different AZs.

### Short Conclusion

- The **VPC Region** is the geographic scope where you deploy your virtual VPC network in AWS. A VPC exists in only one Region and can extend across multiple AZs in that Region.

---

## VPC, AZ, and Subnet

### VPC (Virtual Private Cloud)

#### Concept

- A **VPC** (Virtual Private Cloud) is a private virtual network that you create and manage in AWS. It lets you deploy and manage AWS resources (such as EC2 virtual servers, RDS databases, Lambda, and so on) in a network environment that is secured and controlled by you.

#### Main Components of a VPC

- **CIDR Block (IP range)**:
  The range of IP addresses you assign to your VPC (for example `10.0.0.0/16`).
- **Internet Gateway (IGW)**:
  The gateway that lets the VPC connect to the Internet.
- **Route Table**:
  Routing table that directs network traffic inside and outside the VPC.
- **Security Group (SG)**:
  Instance-level (EC2) firewall that controls inbound and outbound traffic for each instance.
- **Network ACL (NACL)**:
  Subnet-level firewall that applies to the entire subnet within the VPC.
- **NAT Gateway**:
  Allows servers in a private subnet to reach the Internet, for example to update or download software, while not allowing the Internet to reach that subnet directly.

#### Visual Example

- A VPC with CIDR `10.0.0.0/16` can contain:
  - Public subnet: `10.0.1.0/24`
  - Private subnet: `10.0.2.0/24`

### Availability Zone (AZ)

#### Concept

- An **Availability Zone (AZ)** is a physically separate data center within a Region. Each AWS Region contains multiple AZs, ensuring high availability and fault tolerance.

#### Main Characteristics

- AZs in the same Region are connected by very high-speed, low-latency network links.
- Each AZ has its own power, networking, and cooling systems so that a failure in one AZ does not affect the others.
- You should design your system to span multiple AZs to increase availability (High Availability).

#### Example

For instance, the Singapore Region (`ap-southeast-1`) includes AZs such as:

- `ap-southeast-1a`
- `ap-southeast-1b`
- `ap-southeast-1c`

If AZ `ap-southeast-1a` has an incident, the other AZs keep working normally and the service stays online.

### Subnet

#### Concept

- A **subnet** is a sub-network inside a VPC, holding a set of IP addresses carved out of the VPC's CIDR. It is where you place AWS resources such as EC2, RDS, Lambda, and so on.

#### Subnet Types

- **Public Subnet**:
  Has a route to the Internet through an **Internet Gateway (IGW)**, so servers can be reached directly from the Internet.
- **Private Subnet**:
  Cannot be reached directly from the Internet. Servers in this subnet that need Internet access must go through a **NAT Gateway** or NAT instance.
- **Isolated Subnet**:
  Completely isolated, with no route to the Internet.

#### Subnet Example

Suppose you have a VPC CIDR of `10.0.0.0/16` split into:

- Public subnet: `10.0.1.0/24` (holds the IGW route and web servers)
- Private subnet: `10.0.2.0/24` (holds the database)

This keeps the database in the private subnet unreachable directly from outside, improving security.

### Concrete Summary Example

| Component  | Concrete example                                        | Main role                                      |
| ---------- | ------------------------------------------------------- | ---------------------------------------------- |
| **VPC**    | CIDR: `10.0.0.0/16`                                     | Creates a private virtual network environment  |
| **AZ**     | `ap-southeast-1a`, `ap-southeast-1b`, `ap-southeast-1c` | Provides high availability and fault tolerance |
| **Subnet** | `10.0.1.0/24 (Public)`, `10.0.2.0/24 (Private)`         | Segments the network and controls access       |

### ⚡️ Quick Summary

| Concept    | Quick explanation                                                    |
| ---------- | -------------------------------------------------------------------- |
| **VPC**    | A private virtual network you configure and manage yourself in AWS   |
| **AZ**     | Physically independent data centers inside each Region               |
| **Subnet** | Smaller networks inside a VPC used to segment resources and security |

> **See also:** [NAT And Port](/Technology/Cloud And DevOps/Concepts/Network/NAT And Port) · [Simplify EKS Cluster Management With ACK And Kro](/Technology/Cloud And DevOps/Write Ups/Simplify EKS Cluster Management With ACK And Kro)
