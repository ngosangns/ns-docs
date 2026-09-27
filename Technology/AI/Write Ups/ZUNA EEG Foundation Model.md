---
area: technology
domain: eeg
type: note
title: ZUNA EEG Foundation Model
description: Notes on Zyphra's ZUNA, a 380M open-source foundation model that denoises, inpaints, and super-resolves scalp EEG by electrode position — a signal layer for non-invasive BCI, not a thought-to-text decoder.
timestamp: "2026-09-27T00:00:00.000Z"
tags:
  - technology
  - eeg
  - bci
  - diffusion
  - foundation-model
resource: https://www.zyphra.com/our-work/zuna
---

# ZUNA EEG Foundation Model

> **Source**: [ZUNA on zyphra.com](https://www.zyphra.com/our-work/zuna) (02/18/2026) — Chris Warner, Jonas Mago, Jonathan Huml, Beren Millidge. Paper: _ZUNA: Flexible EEG Superresolution with Position-Aware Diffusion Autoencoders_ ([arXiv:2602.18478](https://arxiv.org/abs/2602.18478)).

The ZUNA article is not about a model that "reads thoughts into text". It is a **foundation model for scalp EEG signals**: denoising, filling in dropped channels, and "super-resolving" a sparse montage into a denser one. Thought-to-text is Zyphra's **long-term direction**; ZUNA is only the signal-processing foundation layer.

## What the Article Says

Non-invasive EEG is cheap and widely available, but real-world data is messy: channels drop out, motion artifacts corrupt signals, and montages vary wildly (a 4-channel Muse headband vs a 256-channel research cap). The standard tool in MNE is **spherical spline interpolation** — geometric interpolation on a sphere that learns no prior from real data. It works when few channels are missing but breaks down past ~75% dropout.

ZUNA replaces geometric interpolation with a model trained on ~2 million channel-hours of public EEG (208 datasets), so it can:

- denoise the channels that exist
- reconstruct channels that were lost
- predict the signal at electrode positions **never recorded**, given only their 3D scalp coordinates

Practical goal: rescue "unusable" recordings, bring cheap headsets closer to lab quality, and stop depending on a fixed montage. The marketing framing — multimodal AI after text/audio/vision is **thought-to-text** via non-invasive BCI in service of "human-aligned superintelligence" — is a mission statement, not a demonstrated result.

## Model Facts

|               | ZUNA (the article)              | ZUNA1.1 (current default)                   |
| ------------- | ------------------------------- | ------------------------------------------- |
| Released      | 02/18/2026                      | ~07/2026, paper 07/29/2026                  |
| Parameters    | 380M                            | 380M (same architecture, more stable)       |
| Training data | ~2M channel-hours, 208 datasets | ~3.5M channel-hours                         |
| Window        | fixed 5 s                       | **0.5–30 s**                                |
| Masking       | whole-channel dropout           | channels + time segments + scattered values |
| License       | Apache 2.0                      | Apache 2.0                                  |

GitHub now defaults to **ZUNA1.1**. Weights: [Zyphra/ZUNA](https://huggingface.co/Zyphra/ZUNA) (original), [Zyphra/ZUNA1.1](https://huggingface.co/Zyphra/ZUNA1.1). Code: [github.com/Zyphra/ZUNA](https://github.com/Zyphra/ZUNA). Install: `pip install zuna`. Runs on consumer GPUs or CPU — GitHub claims <1 GB VRAM. A playground on Zyphra Cloud accepts `.fif` uploads.

**Not an LLM.** It does not chat and does not decode inner language. Input and output are EEG time series.

### Architecture

Diffusion autoencoder + transformer encoder–decoder.

1. Each channel is cut into **0.125 s** chunks (32 samples at 256 Hz) → continuous tokens (not discrete GPT-style tokens).
2. Tokens form a 1D sequence over channel × time.
3. Positional encoding is **4D RoPE** over `(x, y, z, t)`: electrode coordinates on the scalp plus raw time. The model doesn't memorize "channel 7" — it learns "this physical location at this moment". That is what makes it montage-agnostic and able to upsample new positions.
4. The encoder compresses into a latent space; the decoder diffuses/reconstructs the masked parts. Trained with masked reconstruction plus very heavy channel dropout.

ZUNA1.1 adds Sandwich-norm, QK-norm, a 3-stage training curriculum (~580k steps), and a mix of 4 corruption types to better match real-world EEG.

### Benchmarks (as reported)

Against MNE's default spherical spline, on validation sets plus unseen datasets / different preprocessing pipelines:

- ZUNA wins clearly, and **the gap widens as dropout increases**.
- With >75% of channels missing: ZUNA beats spline on every dataset they report.
- ZUNA1.1: NMSE equal or better than ZUNA1 on 5 s windows while handling more corruption types. NMSE ~0.5 when masking 15–20% of tokens — described as "looks close to ground truth".

Caveat: this is **waveform reconstruction**, not decoding accuracy for motor imagery, speech, or thought. The paper emphasizes better cross-dataset generalization than earlier EEG deep-learning models tied to a single montage.

## How to Read "Thought-to-Text"

The pipeline they imagine:

```
raw EEG, sparse, noisy
    → ZUNA (clean / infill / upsample)
        → a future decoding model (not ZUNA)
            → text / agent
```

ZUNA only completes stage 1. The semantic decoding stage **does not exist in this work**. Their own disclaimer: research only, not for clinical use, and reconstructed signals can be "hallucinated" (plausible but not ground truth).

## Usage

```python
from zuna import reconstruct_fif

reconstruct_fif(
    input_dir="fif_in",
    output_dir="fif_out",
    figures_dir="figures",
    gpu_device=0,                 # "" for CPU
    repair_channels=["Cz"],
    target_channel_count=["Fz", "Pz"],
    bad_segments=[(5, 6), (10, 11, "C3")],
)
```

Expected input: MNE `.fif` files, 256 Hz sample rate, with electrode coordinates (or a `standard_1020` montage assigned).

## References

- Article: [zyphra.com/our-work/zuna](https://www.zyphra.com/our-work/zuna)
- ZUNA paper: [arXiv:2602.18478](https://arxiv.org/abs/2602.18478)
- ZUNA1.1 paper: [arXiv:2607.27308](https://arxiv.org/abs/2607.27308)

**In one sentence:** ZUNA is a 380M open-source model that repairs and "upscales the resolution" of EEG using electrode coordinates — a foundation for non-invasive BCI, not a mind-reading machine.

> **See also:** [Transformer Architecture](/Technology/AI/Concepts/Core Concepts/Transformer Architecture) · [Attention Mechanism](/Technology/AI/Concepts/Core Concepts/Attention Mechanism) · [Code World Model](/Technology/AI/Practices/Code World Model)
