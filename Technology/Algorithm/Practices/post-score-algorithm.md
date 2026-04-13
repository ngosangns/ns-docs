---
area: technology
domain: algorithms
topic: golang
type: resource
lang: vi
created: '2026-04-13'
modified: '2026-04-13'
---

# Post score algorithm - Trending algorithm

## Mục lục

- [Resources](#resources)
- [Công thức tổng quát](#công-thức-tổng-quát)
- [Diễn giải biến số](#diễn-giải-biến-số)
- [Ví dụ tính toán](#ví-dụ-tính-toán)

## Resources

- https://viblo.asia/p/xay-dung-tinh-nang-trending-bai-viet-m2vJPD2KJeK

## Công thức tổng quát

$$
FS=(w_5 \cdot CS+w_6 \cdot PS+ES+(AB \cdot w_7)+RP)\cdot(UP+FP)
$$

$$
ES=w_1 \cdot UV+w_2 \cdot DV+w_3 \cdot TC+w_4 \cdot TV
$$

$$
RP=w_{11}\cdot\left(\frac{1}{1+e^{-k \cdot (AVTP-x_0)}}-0.5\right)
$$

## Diễn giải biến số

- FS: Final Score của bài viết
- w_5, w_6: trọng số cho Category Score và Poster Score
- CS: Category Score của bài viết
- PS: Poster Score (boost bài từ tác giả cụ thể)
- ES: Engagement Score
- w_1..w_4: trọng số cho UV/DV/TC/TV
- UV: Up Votes
- DV: Down Votes
- TC: Total Comments
- TV: Total Views
- AB: Admin Boost (1 nếu boost, 0 nếu không)
- w_7: trọng số cho admin boost
- UP: User Preference theo category
- FP: Follower Preference (1 nếu user follow poster, 0 nếu không)
- RP: Reward/Penalty score (ví dụ cho video)
- w\_{11}: trọng số cho RP
- k: độ dốc (steepness)
- AVTP: Average View Time Percentage (video)
- x_0: ngưỡng AVTP

## Ví dụ tính toán

### Giả định

- $w_1 = 2$, $w_2 = 1$, $w_3 = 0.5$, $w_4 = 0.1$
- $w_5 = 1$, $w_6 = 0.8$, $w_7 = 20$, $w_{11} = 10$
- $k = 10$
- $x_0 = 0.3$

### Input

- $CS = 0.7$
- $PS = 0.6$
- $UV = 50$
- $DV = 20$
- $TC = 10$
- $TV = 500$
- $AB = 1$
- $UP = 0.7$
- $FP = 1$
- $AVTP = 0.8$

### Tính ES

$$
ES=2 \cdot 50+1 \cdot 20+0.5 \cdot 10+0.1 \cdot 500=175
$$

### Tính RP

$$
RP=10\cdot\left(\frac{1}{1+e^{-10 \cdot (0.8-0.3)}}-0.5\right)\approx 4.5
$$

### Tính FS

$$
FS=(1\cdot 0.7+0.8\cdot 0.6+175+1\cdot 20+4.5)\cdot(0.7+1)\approx 343.47
$$