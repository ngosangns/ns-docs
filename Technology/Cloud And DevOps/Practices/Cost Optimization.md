---
area: technology
domain: cost-optimization
type: usecase
title: Cost Optimization
description: A real story of an AWS Lambda bill exploding 70x from a copy-pasted Terraform memory setting, with the cost drivers and lessons for controlling it.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - cost-optimization
  - aws
  - lambda
  - devops
---

# Cost Optimization

Cost Optimization records one incident and the reasoning it taught. An SRE saw AWS Lambda spend grow 70x in three days, from about 200 dollars a month to about 14,000, and a budget alert did not stop it in time. The cause was a copy-paste in Terraform. Memory was set to 4096 MB when about 128 MB was enough, and millions of daily invocations multiplied the bill. The note then explains the three cost drivers, which are memory allocated, request count, and duration, and the levers that act on them. ARM CPUs cut the price, AWS Lambda Power Tuning finds the sweet spot between memory and execution time, and concurrency settings cap or warm instances. It ends with lessons on right-sizing memory, tuning architecture, limiting concurrency, and profiling.

## DevOps Burning Infra Money – Episode 2

### The Story of Lambda Costs "Evaporating"

- An SRE noticed that AWS Lambda costs had grown **70x** in 3 days (from ~\$200/month to ~\$14,000/month).
- Even though an **AWS Budget Alert** was set up and cost data was being extracted with Lambda, the runaway spend still wasn't stopped in time.
- The cause was a Terraform copy-paste: Lambda memory was set to **4096 MB** when only ~128 MB was actually needed, and with millions of invocations per day the cost blew up quickly.

### Lambda Cost Analysis

Cost depends on three main factors:

1. **Memory allocated** – the higher it is, the greater the cost, but it can reduce execution time.
2. **Request count** – the more invocations, the more it costs.
3. **Duration (execution time)** – the longer it runs, the higher the cost.
   - Use ARM (Graviton) CPUs instead of x86 to reduce price.
   - Use **AWS Lambda Power Tuning** to find the sweet spot between memory and execution time.
   - Set **reserved concurrency** to cap the number of instances and **provisioned concurrency** to keep functions warm, avoiding cold starts under heavy request load.

### Lessons Learned

- Allocate only the memory you truly need – don't copy-paste a "big" configuration just to move fast.
- Tune memory and architecture (ARM/x86) to balance cost and performance.
- Limit concurrency to control sudden scale-up spikes.
- Set up profiling and warm-up (provisioned concurrency) to optimize performance.

> **See also:** [Case Study Quick Win Optimization](/Technology/System Design/Practices/Case Study Quick Win Optimization) · [DevOps Tools](/Technology/Cloud And DevOps/Tools/DevOps Tools)
