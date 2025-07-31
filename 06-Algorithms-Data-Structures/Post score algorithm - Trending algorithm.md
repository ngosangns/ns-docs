---
relates:
  - "[[Data structures & Algorithms]]"
---
# 1. Resources

- https://viblo.asia/p/xay-dung-tinh-nang-trending-bai-viet-m2vJPD2KJeK

## 1.1. Final Score (FS) Formula

FS=(w5∗CS+w6∗PS+ES+(AB∗w7)+RP)∗(UP+FP)FS = (w_5 * CS + w_6 * PS + ES + (AB * w_7) + RP) * (UP + FP)

### 1.1.1. Where

- **FS** = Final Score of a post.
- **w_5** and **w_6** = weights for Category Score and Poster Score, respectively.
- **CS** = Category Score of the post.
- **PS** = Poster Score of the post (used for boosting posts from specific content creators).
- **ES** = Engagement Score, calculated as:

ES=w1∗UV+w2∗DV+w3∗TC+w4∗TVES = w_1 * UV + w_2 * DV + w_3 * TC + w_4 * TV

- **w_1, w_2, w_3, w_4** = weights for:
    - **UV** = Up Votes
    - **DV** = Down Votes
    - **TC** = Total Comments
    - **TV** = Total Views
- **AB** = Admin Boost (binary: `1` if boosted, `0` if not).
- **w_7** = weight for the admin boost.
- **UP** = User Preference for the post's category.
- **FP** = Follower Preference (binary: `1` if the user follows the poster, `0` if not).
- **RP** = Reward and Penalty score, calculated as:

RP=w11∗(11+e−k∗(AVTP−x0)−0.5)RP = w_{11} * \left( \frac{1}{1 + e^{-k * (AVTP - x_0)}} - 0.5 \right)

- **w_{11}** = weight for RP value.
- **k** = steepness parameter.
- **AVTP** = Average View Time Percentage (video posts only).
- **x_0** = threshold value for AVTP.

## 1.2. Example with Hypothetical Weights and Values

### 1.2.1. Assumptions

- `w_1 = 2`, `w_2 = 1`, `w_3 = 0.5`, `w_4 = 0.1`
- `w_5 = 1`, `w_6 = 0.8`, `w_7 = 20`, `w_{11} = 10`
- `k = 10` (steepness)
- `x_0 = 0.3` (AVTP threshold)

### 1.2.2. Input Values

- `CS = 0.7`
- `PS = 0.6`
- `UV = 50`
- `DV = 20`
- `TC = 10`
- `TV = 500`
- `AB = 1`
- `UP = 0.7`
- `FP = 1`
- `AVTP = 0.8` (80%)

### 1.2.3. Step-by-Step Calculation

#### 1.2.3.1. **Calculate Engagement Score (ES)**

ES=w1∗UV+w2∗DV+w3∗TC+w4∗TVES=2∗50+1∗20+0.5∗10+0.1∗500ES=100+20+5+50=175ES = w_1 * UV + w_2 * DV + w_3 * TC + w_4 * TV ES = 2 * 50 + 1 * 20 + 0.5 * 10 + 0.1 * 500 ES = 100 + 20 + 5 + 50 = 175

#### 1.2.3.2. **Calculate RP (Reward and Penalty)**

RP=w11∗(11+e−k(AVTP−x0)−0.5)RP=10∗(11+e−10(0.8−0.3)−0.5)RP≈10∗(0.95−0.5)=4.5RP = w_{11} * \left( \frac{1}{1 + e^{-k(AVTP - x_0)}} - 0.5 \right) RP = 10 * \left( \frac{1}{1 + e^{-10(0.8 - 0.3)}} - 0.5 \right) RP ≈ 10 * (0.95 - 0.5) = 4.5

#### 1.2.3.3. **Substitute into FS formula**

FS=(w5∗CS+w6∗PS+ES+AB∗w7+RP)∗(UP+FP)FS=(1∗0.7+0.8∗0.6+175+1∗20+4.5)∗(0.7+1)FS=(0.7+0.48+175+20+4.5)∗1.7FS=202.68∗1.7≈343.47FS = (w_5 * CS + w_6 * PS + ES + AB * w_7 + RP) * (UP + FP) FS = (1 * 0.7 + 0.8 * 0.6 + 175 + 1 * 20 + 4.5) * (0.7 + 1) FS = (0.7 + 0.48 + 175 + 20 + 4.5) * 1.7 FS = 202.68 * 1.7 ≈ 343.47

### 1.2.4. Final Result

FS≈343.47FS ≈ 343.47

> Higher FS values indicate a greater chance the post will be shown to users on the platform.
