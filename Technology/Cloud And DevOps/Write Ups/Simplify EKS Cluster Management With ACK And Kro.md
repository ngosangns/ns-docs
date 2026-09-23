---
area: technology
domain: kubernetes
type: case-study
title: Simplify EKS Cluster Management With ACK And Kro
description: Notes on a GitOps architecture for managing a fleet of Amazon EKS clusters through a single Kubernetes API using ACK, kro and Argo CD.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - kubernetes
  - eks
  - gitops
  - devops
resource: https://awsstudygroup.com/2026/02/06/don-gian-hoa-quan-ly-cum-kubernetes-bang-ack-kro-va-amazon-eks
---

# Simplify EKS Cluster Management With ACK And Kro

> **Source**: [Simplifying Kubernetes cluster management with ACK, kro, and Amazon EKS](https://awsstudygroup.com/2026/02/06/don-gian-hoa-quan-ly-cum-kubernetes-bang-ack-kro-va-amazon-eks) (Vietnamese translation, "Đơn giản hóa quản lý cụm Kubernetes bằng ACK, kro và Amazon EKS") — Islam Mahgoub, Kumudhan Cherarajan, Markos Kandylis, Ramesh Mathikumar, Sébastien Allamand, AWS Study Group, 22/01/2026

## The Problem

Provisioning, bootstrapping add-ons, and operating many EKS clusters over the long term usually means mixing several disjointed IaC pipelines, Kubernetes manifests, and Helm charts — slow, error-prone, and hard to standardize. The article proposes managing the entire cluster lifecycle through **a single Kubernetes API**, following a GitOps model.

## Three Main Components

- **ACK (AWS Controllers for Kubernetes)** — a set of CRDs plus custom controllers that let you create AWS resources (VPC, IAM roles, EKS clusters...) by applying Custom Resource (CR) YAML, instead of calling a separate IaC tool.
- **kro** (pronounced "crow", Kube Resource Orchestrator) — an orchestration layer for **dependencies & ordering** between CRs: it bundles related AWS/K8s resources into a `ResourceGraphDefinition` (RGD), infers the creation order (topological order) automatically, and uses **CEL expressions** to feed one resource's output fields into another's inputs (for example taking `vpcID` from the VPC CR and passing it to the Subnet CR).
- **Argo CD** — the GitOps controller: bootstraps the management cluster, provisions workload clusters, and installs the corresponding add-ons.

The article uses **Amazon EKS Capabilities** — managed versions of all three tools above, so you don't have to install, operate, or scale them yourself.

## Why kro Is Needed (Not Just ACK)

Creating one EKS cluster needs many interdependent AWS resources: VPC → subnets → route table/NAT → IAM roles (cluster + node) → the EKS cluster. Applying CRs arbitrarily fails because prerequisites are missing, and you would have to extract fields (VPC ID, subnet ID...) by hand and pass them to other CRs. kro solves this with RGDs: you define a new CRD (`schema`) containing all the required resources (`resources`), and the kro controller handles the dependency graph and CEL substitution.

## Layered RGD Structure

The article splits this into 3 RGDs:

- `Vpc` — networking resources (VPC, subnets...).
- `EksClusterBasic` — the EKS cluster itself.
- `EksCluster` — a "wrapper" RGD that contains instances of the two RGDs above and exposes a `vpc.create: boolean` field to choose between two scenarios via `includeWhen`:
  - `true` → create a new `Vpc` + `EksClusterBasic` (network fields come from `vpc.status`).
  - `false` → create only `EksClusterBasic` in an existing VPC (network fields come directly from the input `schema.spec.vpc`).

This lets RGDs nest inside RGDs → building a reusable "tree" of RGDs, with CEL again inferring dependencies (`internetGateway.spec.vpc = ${vpc.status.vpcID}` tells kro that `internetGateway` depends on `vpc`, so the VPC is created first).

## Multi-Account AWS with ACK

Use the cluster-scoped CRD `IAMRoleSelector` to map **namespace → IAM role** via a label selector: when the ACK controller sees a new CR in a namespace, it looks up the `IAMRoleSelector` matching that namespace to learn which role to **assume** (this role can live in a different workload account), and only then calls the AWS API to create the resource in the target account. Permissions are needed in both directions: the ACK controller's role (in the management account) must be allowed `sts:AssumeRole`, and the target role's trust policy must allow the management role to assume it.

## Add-on Bootstrap via Argo CD ApplicationSet

- Each add-on ↔ one Argo CD `ApplicationSet` using the **Cluster Generator** to produce `Application`s applied to many workload clusters at once.
- For the cluster generator to "see" a workload cluster, that cluster must be registered as a remote cluster in Argo CD — done with a `Secret` (containing the cluster ARN) created right inside the `EksClusterBasic` RGD (field `server` = `${ekscluster.status.ackResourceMetadata.arn}`).
- The Argo CD controller needs access to the workload cluster → granted through an **EKS access entry**, also declared in the `EksClusterBasic` RGD (an `AccessEntry` CR with `policyARN: AmazonEKSClusterAdminPolicy` and `principalARN` pointing to the Argo CD controller's IAM role).
- Add-ons that need their own IAM permissions (for example External Secrets Operator) → use **EKS Pod Identity**: create the IAM policy + role + ServiceAccount↔role association, also placed in the RGD so IAM is ready _before_ the add-on pod starts (avoiding crashes from missing permissions).

## End-to-End Flow for Creating a Workload Cluster

1. A dev opens a PR containing the cluster's RGD instance manifest (name, k8s version, add-ons to enable...).
2. Argo CD syncs the RGD instance into the management cluster.
3. The kro controller decomposes the RGD instance into individual ACK CRs and applies them in dependency order; it also creates the `Secret` holding the cluster information for Argo CD.
4. The ACK controller assumes the workload account role and calls the AWS API to create the actual VPC/IAM roles/EKS cluster.
5. The Argo CD `ApplicationSet` generates an `Application` for each enabled add-on and installs it into the workload cluster.

## Caveats

kro is under **active development and not production-ready** — the `ResourceGraphDefinition` CRD and related APIs may still change a lot; weigh the risk before putting it into production.

The full reference source code is in the repository linked from the original article (follow its README to try it yourself).

> **See also:** [Kubernetes](/Technology/Cloud And DevOps/Tools/Kubernetes) · [DevOps Tools](/Technology/Cloud And DevOps/Tools/DevOps Tools) · [VPC And Availability Zones](/Technology/Cloud And DevOps/Concepts/Network/VPC And Availability Zones)
