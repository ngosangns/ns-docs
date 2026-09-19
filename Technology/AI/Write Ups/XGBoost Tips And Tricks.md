---
area: technology
domain: ai-ml
topic: machine-learning
type: case-study
title: XGBoost Tips And Tricks
description: Ghi chú/tổng hợp các kinh nghiệm dùng XGBoost của Chris Deotte (Kaggle Grandmaster)
timestamp: '2026-09-20T00:00:00.000Z'
tags:
  - technology
  - ai-ml
  - machine-learning
  - xgboost
  - kaggle
resource: https://www.kaggle.com/writeups/cdeotte/xgboost-tips-and-tricks
---

# XGBoost Tips and Tricks — Ghi chú

> **Nguồn**: [XGBoost Tips and Tricks](https://www.kaggle.com/writeups/cdeotte/xgboost-tips-and-tricks) — Chris Deotte (cdeotte), Kaggle Writeup, 27/11/2025

## Tổng quan

Bài viết đúc kết kinh nghiệm nhiều năm dùng XGBoost để thắng các cuộc thi Kaggle và triển khai mô hình thực tế, chia làm 5 mảng: nền tảng data science, kiến thức cơ bản về XGBoost, xây dựng/tối ưu model, scale cho dữ liệu lớn, và deploy/inference.

## 1. Nền tảng Data Science (áp dụng cho mọi bài toán, không riêng XGB)

- **Thực nghiệm nhanh (Fast Experimentation)**: chìa khóa thành công là rút ngắn tối đa thời gian của một vòng lặp preprocess → feature engineering → train → infer → evaluate, để mỗi ngày thử được nhiều ý tưởng hơn. Cách tăng tốc số 1 là chạy trên GPU thay vì CPU — dùng cuDF/cuML để tăng tốc thao tác dataframe và train/infer model; với XGBoost chỉ cần thêm `"device": "cuda"`.
- **Validation nội bộ đáng tin cậy**: nên dùng KFold để tận dụng toàn bộ dữ liệu train khi đánh giá. Quan trọng là thiết kế fold sao cho mô phỏng đúng mối quan hệ giữa train/test thực tế — ví dụ nếu tập test chứa bệnh nhân chưa từng thấy thì dùng GroupKFold theo bệnh nhân; nếu test là time-series xảy ra sau train thì validation cũng phải tách theo thời gian tương tự.
- **EDA (Exploratory Data Analysis)**: hiểu càng sâu về dữ liệu và mối quan hệ feature–target thì càng dễ thiết kế feature engineering và kiến trúc model phù hợp.

## 2. Kiến thức cơ bản về XGBoost

XGBoost về bản chất là một **ensemble của các decision tree**, trong đó mỗi cây tiếp theo được fit để sửa lỗi (residual) của các cây trước. Hai đặc điểm cần nhớ:

- Decision tree chỉ quan tâm đến **thứ tự** (ordering) của giá trị số, không quan tâm phân phối cụ thể.
- Decision tree **không thể ngoại suy** (extrapolate) ra ngoài khoảng giá trị đã thấy trong lúc train.

Có 2 API chính để dùng XGBoost:

- **Native Python API** (`xgb.DMatrix` + `xgb.train`): nhiều tính năng nâng cao hơn (learning rate thay đổi theo từng vòng, callback, train tiếp tục/incremental...) nhưng phức tạp hơn cho người mới.
- **Scikit-Learn API** (`XGBRegressor`/`XGBClassifier` với `.fit`/`.predict`): tiện dùng chung với pipeline/GridSearchCV của sklearn, không cần tự tạo DMatrix, nhưng không expose hết các tính năng nâng cao của API gốc.

## 3. Xây dựng & tối ưu model

**Baseline gần như miễn phí**: một điểm mạnh của XGBoost là có thể train ngay mà *không cần tiền xử lý* — để nguyên missing values, categorical, numeric — trong khi nhiều model khác đòi hỏi impute/encode/normalize trước. Quy trình thường gặp: chạy KFold, mỗi fold tạo DMatrix (bật `enable_categorical=True`), train với `early_stopping_rounds` để tự dừng đúng lúc, rồi lấy out-of-fold predictions để đánh giá (vd. AUC).

**Hyperparameter — không cần lo quá nhiều**: bộ tham số mặc định đã khá tốt, chỉ cần chỉnh vài "núm vặn" chính:

- `objective`, `eval_metric` — xác định loại bài toán.
- `learning_rate` — bắt đầu từ ~0.1, giảm dần sau khi tối ưu các phần khác để lấy thêm performance.
- `device: cuda` — nên bật GPU với dataset vừa/lớn để tăng tốc.
- Hai núm quan trọng nhất là **`max_depth`** (thử từ 3 đến 12, mặc định 6) và **`colsample_bytree`** (thử từ 0.3 đến 0.9, mặc định 0.8), cùng với `subsample` (mặc định 0.8). Riêng việc chỉnh 2 núm `max_depth` và `colsample_bytree` đã có thể đạt hơn 95% hiệu năng khả dụng của XGBoost.
- Muốn vắt thêm chút performance thì mới đi sâu vào regularization (`min_child_weight`, `gamma`, `lambda`, `alpha`, `scale_pos_weight`...) hoặc các tham số khác (`grow_policy`, `max_leaves`, `tree_method`, `max_bin`), có thể tune tay hoặc dùng Optuna.

**Feature engineering mới là nơi tạo khác biệt lớn nhất**: tác giả dành phần lớn thời gian ở đây thay vì tune hyperparameter. Kỹ thuật mạnh nhất là tạo nhiều categorical feature mới rồi encode chúng, đặc biệt bằng cách **groupby theo cột categorical rồi aggregate một thống kê của cột numeric** (mean, quantile, histogram bins...). Khi thống kê được aggregate chính là target, kỹ thuật này gọi là **Target Encoding** — cần cẩn thận tránh leakage. Các hướng biến đổi feature phổ biến: binning số→categorical, combine/split cột, rồi encode bằng one-hot/label/target/count encoding. Nhiều chiến thắng Kaggle gần đây chỉ nhờ feature engineering đơn thuần (binning, combine cột, groupby-aggregate, target encoding); cuDF giúp tăng tốc groupby tới ~50x, cho phép thử hàng nghìn ý tưởng feature nhanh hơn.

## 4. Scale XGBoost cho dữ liệu lớn

Ba kỹ thuật chính:

1. **Giảm kiểu dữ liệu (dtype)** về mức nhỏ nhất cần thiết để tiết kiệm RAM/VRAM.
2. **`QuantileDMatrix`** (XGBoost v2.0/v3.0) thay cho `DMatrix` thường, cho phép train với dataset lớn hơn mà không tăng RAM/VRAM nhờ quản lý bộ nhớ tốt hơn; `ExtMemQuantileDMatrix` đẩy giới hạn này xa hơn nữa (dùng cùng một custom data loader/iterator).
3. **Dask-XGBoost** để tận dụng nhiều GPU cùng lúc: tạo `LocalCluster`/`Client` của Dask, dùng `DaskDMatrix` và `xgb.dask.train`/`xgb.dask.predict` thay cho API đơn-GPU.

Theo bài viết, đội NVIDIA nhờ kết hợp giảm dtype + QuantileDMatrix + Dask-XGBoost đã đạt tốc độ gấp **250x** (4 GPU so với 1 CPU) và **25x** (4 GPU so với 20 CPU), giúp thực nghiệm nhanh hơn và thắng nhiều cuộc thi RecSys.

## 5. Deploy & Inference

- **NVIDIA cuML Forest Inference Library (FIL)**: load model đã train (`model.ubj`/`model.json`) vào `ForestInference` để tăng tốc inference trên GPU; có thể `optimize(batch_size=...)` để tự tune theo batch size thực tế trước khi `predict`/`predict_proba`.
- **Refit trên toàn bộ dữ liệu (Refit on Full Data)**: sau khi tìm được hyperparameter tối ưu bằng KFold, train lại **một model duy nhất** trên 100% dữ liệu train (thay vì giữ K model của K-fold). Model dùng 100% data thường tốt hơn model chỉ thấy (K-1)/K dữ liệu, đồng thời khi serving chỉ cần 1 model thay vì K. Số vòng train nên nhân theo tỉ lệ K/(K-1) so với số vòng tối ưu tìm được lúc KFold. Đây là mẹo phổ biến để tăng điểm leaderboard trên Kaggle.

## Tóm tắt nhanh

- **Data science foundations**: thực nghiệm nhanh (ưu tiên GPU) + validation mô phỏng đúng quan hệ train/test.
- **XGBoost fundamentals**: chỉ quan tâm thứ tự giá trị số; không ngoại suy ngoài khoảng đã train.
- **Build & optimize**: 2 núm quan trọng nhất là `max_depth` và `colsample_bytree`; đầu tư thời gian vào feature engineering (đặc biệt categorical/target encoding) mang lại lợi ích lớn hơn tune hyperparameter.
- **Scale**: giảm dtype → `DMatrix` → `QuantileDMatrix` → `ExtMemQuantileDMatrix` → Dask-XGBoost khi cần nhiều GPU.
- **Deploy & inference**: dùng cuML FIL để tăng tốc predict; refit model cuối trên 100% data train.
