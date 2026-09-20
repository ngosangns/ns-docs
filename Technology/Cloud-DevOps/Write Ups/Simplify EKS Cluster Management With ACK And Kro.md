---
area: technology
domain: devops
topic: kubernetes
type: case-study
title: Simplify EKS Cluster Management With ACK And Kro
description: Ghi chú/tổng hợp kiến trúc GitOps quản lý fleet cụm Amazon EKS bằng ACK, kro và Argo CD
timestamp: '2026-09-20T00:00:00.000Z'
tags:
  - technology
  - devops
  - kubernetes
  - eks
  - gitops
resource: https://awsstudygroup.com/2026/02/06/don-gian-hoa-quan-ly-cum-kubernetes-bang-ack-kro-va-amazon-eks
---

# Đơn giản hóa quản lý cụm Kubernetes bằng ACK, kro và Amazon EKS — Ghi chú

> **Nguồn**: [Đơn giản hóa quản lý cụm Kubernetes bằng ACK, kro và Amazon EKS](https://awsstudygroup.com/2026/02/06/don-gian-hoa-quan-ly-cum-kubernetes-bang-ack-kro-va-amazon-eks) — Islam Mahgoub, Kumudhan Cherarajan, Markos Kandylis, Ramesh Mathikumar, Sébastien Allamand, AWS Study Group, 22/01/2026

## Vấn đề

Provision + bootstrap add-on + vận hành lâu dài nhiều cụm EKS thường phải trộn lẫn nhiều pipeline IaC rời rạc, Kubernetes manifest và Helm chart — chậm, dễ lỗi, khó chuẩn hoá. Bài viết đề xuất quản lý toàn bộ vòng đời cụm chỉ qua **một Kubernetes API duy nhất**, theo mô hình GitOps.

## Ba thành phần chính

- **ACK (AWS Controllers for Kubernetes)** — bộ CRD + custom controller cho phép tạo tài nguyên AWS (VPC, IAM role, cụm EKS...) bằng cách apply Custom Resource (CR) YAML, thay vì gọi IaC tool riêng.
- **kro** (đọc là "crow", Kube Resource Orchestrator) — lớp điều phối **dependency & ordering** giữa các CR: gói nhiều tài nguyên AWS/K8s liên quan thành một `ResourceGraphDefinition` (RGD), tự suy ra thứ tự tạo tài nguyên (topological order) và dùng **CEL expression** để lấy field output của resource này làm input cho resource khác (vd. lấy `vpcID` từ VPC CR truyền vào Subnet CR).
- **Argo CD** — GitOps controller: bootstrap cụm quản lý, provision cụm workload và cài add-on tương ứng.

Bài viết dùng **Amazon EKS Capabilities** — bản managed sẵn có của cả 3 công cụ trên, khỏi phải tự cài/vận hành/scale chúng.

## Vì sao cần kro (không chỉ ACK)

Tạo 1 cụm EKS cần nhiều tài nguyên AWS phụ thuộc lẫn nhau: VPC → subnets → route table/NAT → IAM role (cluster + node) → cụm EKS. Apply CR tuỳ tiện sẽ fail vì thiếu prerequisite, và phải tự tay trích field (VPC ID, subnet ID...) truyền qua CR khác. kro giải quyết bằng RGD: định nghĩa 1 CRD mới (`schema`) gồm toàn bộ resource cần thiết (`resources`), kro controller tự lo dependency graph + CEL substitution.

## Cấu trúc RGD phân lớp

Bài viết tách 3 RGD:

- `Vpc` — tài nguyên mạng (VPC, subnets...).
- `EksClusterBasic` — bản thân cụm EKS.
- `EksCluster` — RGD "bao" gộp instance của 2 RGD trên, expose field `vpc.create: boolean` để chọn 1 trong 2 kịch bản qua `includeWhen`:
  - `true` → tạo `Vpc` + `EksClusterBasic` mới (network field lấy từ `vpc.status`).
  - `false` → chỉ tạo `EksClusterBasic` trong VPC có sẵn (network field lấy thẳng từ input `schema.spec.vpc`).

Cách này cho phép RGD lồng RGD → xây "cây" RGD tái sử dụng được, cùng CEL suy ra phụ thuộc (`internetGateway.spec.vpc = ${vpc.status.vpcID}` khiến kro biết `internetGateway` phụ thuộc `vpc` và tạo VPC trước).

## Đa tài khoản AWS với ACK

Dùng cluster-scoped CRD `IAMRoleSelector` để map **namespace → IAM role** bằng label selector: ACK controller thấy CR mới trong 1 namespace, tra `IAMRoleSelector` khớp namespace đó để biết cần **assume role** nào (role này có thể nằm ở account workload khác), rồi mới gọi AWS API tạo resource trong account đích. Cần 2 chiều permission: role của ACK controller (ở management account) được phép `sts:AssumeRole`, và trust policy của role đích cho phép role quản lý assume.

## Bootstrap add-on qua Argo CD ApplicationSet

- Mỗi add-on ↔ 1 Argo CD `ApplicationSet` dùng **Cluster Generator** để sinh `Application` áp cho nhiều cụm workload cùng lúc.
- Để cluster generator "thấy" 1 cụm workload, cụm đó phải được đăng ký làm remote cluster trong Argo CD — làm bằng 1 `Secret` (chứa ARN cụm) được tạo ngay trong RGD `EksClusterBasic` (field `server` = `${ekscluster.status.ackResourceMetadata.arn}`).
- Argo CD controller cần quyền truy cập cụm workload → cấp qua **EKS access entry**, cũng khai báo luôn trong RGD `EksClusterBasic` (`AccessEntry` CR với `policyARN: AmazonEKSClusterAdminPolicy`, `principalARN` trỏ về IAM role của Argo CD controller).
- Add-on cần IAM permission riêng (vd. External Secrets Operator) → dùng **EKS Pod Identity**: tạo IAM policy + role + association ServiceAccount↔role, cũng đưa vào RGD để đảm bảo IAM sẵn sàng *trước khi* add-on pod khởi động (tránh crash do thiếu quyền).

## Luồng end-to-end tạo 1 cụm workload

1. Dev mở PR chứa manifest RGD instance của cụm (tên, k8s version, add-on cần bật...).
2–3. Argo CD sync instance RGD vào cụm quản lý.
4. kro controller phân rã RGD instance thành các ACK CR riêng lẻ, apply theo đúng thứ tự phụ thuộc; đồng thời tạo `Secret` chứa thông tin cụm cho Argo CD.
5. ACK controller assume role account workload, gọi AWS API tạo VPC/IAM role/cụm EKS thật.
6. Argo CD `ApplicationSet` sinh `Application` cho từng add-on đã bật, cài vào cụm workload.

## Lưu ý

kro đang **active development, chưa production-ready** — CRD `ResourceGraphDefinition` và API liên quan có thể còn thay đổi nhiều; cân nhắc rủi ro trước khi đưa vào prod.

Mã nguồn tham chiếu đầy đủ có trong repo được link ở bài gốc (theo README để tự chạy thử).
