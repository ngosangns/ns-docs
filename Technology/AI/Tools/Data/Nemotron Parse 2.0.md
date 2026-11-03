---
area: technology
domain: document-processing
type: tool
title: Nemotron Parse 2.0
description: NVIDIA Nemotron Parse 2.0 is an OpenMDW-1.1 vision-encoder-decoder under 1 billion parameters that turns a document image and a task prompt into text, layout classes, and bounding boxes. The Hub card names nvidia/Nemotron-3.5-Parse as the newer model.
timestamp: "2026-11-03T00:00:00.000Z"
tags:
  - technology
  - document-processing
  - ocr
  - nemotron
  - nvidia
resource: https://huggingface.co/nvidia/NVIDIA-Nemotron-Parse-2.0
sources:
  - id: readme
    resource: https://huggingface.co/nvidia/NVIDIA-Nemotron-Parse-2.0/raw/main/README.md
    author: human:NVIDIA
  - id: hub-api
    resource: https://huggingface.co/api/models/nvidia/NVIDIA-Nemotron-Parse-2.0
    author: human:Hugging Face
  - id: config
    resource: https://huggingface.co/nvidia/NVIDIA-Nemotron-Parse-2.0/resolve/main/config.json
    author: human:NVIDIA
  - id: license
    resource: https://huggingface.co/nvidia/NVIDIA-Nemotron-Parse-2.0/resolve/main/LICENSE
    author: human:NVIDIA
  - id: vllm-notes
    resource: https://huggingface.co/nvidia/NVIDIA-Nemotron-Parse-2.0/resolve/main/VLLM_COMPATIBILITY.md
    author: human:NVIDIA
  - id: parse-35
    resource: https://huggingface.co/nvidia/Nemotron-3.5-Parse/raw/main/README.md
    author: human:NVIDIA
generated:
  by: grok/4.7
  at: "2026-11-03T00:00:00.000Z"
---

# Nemotron Parse 2.0

NVIDIA Nemotron Parse 2.0 reads one RGB document image and one task prompt. It writes one string with the page text, a semantic class, a bounding box, and the order the card calls reading order. The Hub id is `nvidia/NVIDIA-Nemotron-Parse-2.0`. Model files and source code in that repo are OpenMDW-1.1. The tokenizer is CC-BY-4.0. The card field `new_version` is `nvidia/Nemotron-3.5-Parse`.

Checked 3 November 2026. Sources were the model README, `config.json`, `generation_config.json`, `preprocessor_config.json`, `LICENSE`, `VLLM_COMPATIBILITY.md`, and the Hugging Face model API at 2026-11-02 21:05 UTC. The [Nemotron 3.5 Parse README](https://huggingface.co/nvidia/Nemotron-3.5-Parse) was read the same day for the successor table. The weights were not downloaded. The model was not run.

## What the model returns

The README aims the model at document understanding, retrieval, extraction, and multimodal data curation. Named region kinds are titles, paragraphs, captions, tables, charts, page headers, page footers, footnotes, pictures, and bibliography entries. A chart region uses the token `<class_Chart>`.

The image is RGB. The README recommends a maximum of width 1664 and height 2048, and a minimum of width 1024 and height 1280. `preprocessor_config.json` sets height 2048 and width 1664. `config.json` stores `image_size` as `[2048, 1664]`. The processor source was not read, so this note does not say which axis that array uses.

The output is one string. `postprocessing.py` can map boxes back onto the original image. For table or chart text it accepts LaTeX, HTML, markdown, JSON, `json_hierarchical`, or CSV. Plain text is the other text format, next to markdown.

## Weights and architecture

The README describes three stages. The vision encoder is a ViT-H based on NVIDIA C-RADIO. `config.json` names it `nvidia/C-RADIOv2-H`, architecture `RADIOModel`, with `args.model` set to `vit_huge_patch16_224`. The adapter is 1D convolutions and normalization that shorten the vision sequence. The decoder is an mBART decoder with 10 blocks.

In `config.json` those blocks are `decoder_layers` 10, `d_model` 1024, `decoder_attention_heads` 16, and `decoder_ffn_dim` 4096. The same decoder object still has `encoder_layers` 12. That field sits on the text-decoder config. It is not the C-RADIO tower.

The README says the parameter count is under 1 billion. It does not print an exact count. The Hub safetensors block on the model API lists 903,049,222 F32 parameters and 3 I64 parameters, 903,049,225 in total. Reported repo storage on that response was 3,620,678,360 bytes. `torch_dtype` is `bfloat16`. `tie_word_embeddings` is true.

`VLLM_COMPATIBILITY.md` says this export keeps 666 tensors. It drops 4 extra-head tensors from the main file and stores those 4 in `auxiliary_prediction_heads.safetensors.extra`. `lm_head.weight` is not materialized. Standard generation does not load the sidecar. The README keeps that file for later multi-token prediction research.

`vocab_size` is 72256. That matches the README figure of 72,256 entries, about 20,000 of them added over Nemotron Parse v1.2. `class_token_start_idx` is 52315. This note does not interpret that index.

The same API response reported `createdAt` 2026-06-30T20:14:50Z, `lastModified` 2026-10-20T20:22:30Z, and sha `4e021c03edc92e715d5d788921a927d0cbb4b4d1`. Downloads were 17,728 and likes were 134. Those two counts move. The README release line says Hugging Face on 3 August 2026. The API `createdAt` is earlier. Both dates stay in this note.

## Task prompts

`generation_config.json` sets `max_new_tokens` to 9000, `do_sample` to false, `num_beams` to 1, and `repetition_penalty` to 1.1. `max_sequence_length` in `config.json` is 9000.

The README default prompt is below. It skips text inside pictures.

```text
</s><s><predict_bbox><predict_classes><output_markdown><predict_no_text_in_pic>
```

To keep text inside figures, use `<predict_text_in_pic>` instead of `<predict_no_text_in_pic>`. For boxes and classes without text, use `<output_no_text>` with `<predict_no_text_in_pic>`.

Two optional logits processors ship in the repo. `NemotronParseRepetitionStopProcessor` closes a repeating coordinate block. `NemotronParseTableInsertionLogitsProcessor` forces table-shaped blocks on a table crop.

The README pins direct Transformers use to `transformers==5.6.1`, `timm==1.0.22`, `accelerate==1.12.0`, `open_clip_torch==3.2.0`, and `einops==0.8.1`, on the image `nvcr.io/nvidia/pytorch:25.03-py3`. `open_clip_torch` is there because C-RADIO remote code checks an OpenCLIP adaptor. The README says Parse does not run that adaptor. The processor does not use Albumentations. Loading needs `trust_remote_code=True`. The example casts weights to bfloat16.

The README limits vLLM to versions 0.20 through 0.26. The container examples were checked on v0.20.0. On A100 and A10 it recommends `--attention-backend=TRITON_ATTN`. A vLLM 0.20 build that does not support tied Nemotron Parse output embeddings needs `vllm_tied_patch/sitecustomize.py` on `PYTHONPATH`. The Python example sets `max_tokens` to 9000. The OpenAI-compatible server example sets `max_tokens` to 8192. `limit_mm_per_prompt` allows one image.

Listed microarchitectures are Turing, Ampere, Hopper, and Blackwell. The listed operating system is Linux. The Inference section names test hardware as H100 and A100 only. That test list is shorter than the compatibility list.

## Scores on the 2.0 card

The README compares 2.0 with Nemotron Parse v1.2. It says the 2.0 column is an equal-weight soup of checkpoints 58k, 60k, 62k, 64k, and 66k. This note did not check whether `model.safetensors` is that soup. The scores were not re-run.

| Benchmark | Metric | v1.2 | 2.0 | Change on the card |
| --- | --- | --- | --- | --- |
| ParseBench | Overall score, higher is better | 0.5782 | 0.6391 | +0.0609 |
| OmniDocBench Notes, handwriting | Text edit distance, lower is better | 0.9739 | 0.3395 | -0.6343 |
| IndicVisionBench | Overall ANLS, character | 0.0612 | 0.7203 | +0.6592 |
| MOSCAR | Overall bag-of-characters F1 | 0.4410 | 0.9102 | +0.4692 |

ParseBench covers text fidelity, semantic formatting, tables, charts, and visual grounding. IndicVisionBench on this card names Bengali, Gujarati, Hindi, Kannada, Malayalam, Marathi, Odia, Punjabi, Tamil, and Telugu. MOSCAR is multilingual synthetic OCR across many scripts. The handwriting row is the OmniDocBench slice whose `data_source` is `note`. Training size on the card is a range. Images are 1 million to 1 billion. Text is 1 billion to 10 trillion tokens. Collection and labels are mixed automated, human, and synthetic work. No exact corpus size is printed.

## What the 3.5 card says about 2.0

[Nemotron 3.5 Parse](https://huggingface.co/nvidia/Nemotron-3.5-Parse) is the model named in `new_version`. Its README dates the Hugging Face release to 17 October 2026. It is a different network. It uses C-RADIOv4-SO400M, a 72,505-token tokenizer under MIT, and 630,800,496 unique parameters by that card's count. Its default prompt uses `<predict_text_in_pic>`. The 2.0 default uses `<predict_no_text_in_pic>`.

That README prints Nemotron Parse 2.0 at ParseBench 63.91 and 3.95 pages per second. The speed uses one H100 and 2,078 prepared pages. Timing includes model passes and crop work. It excludes page preparation, startup, warmup, final rendering, and writes. The 3.5 card says the comparison used the released 2.0 weights, the same pages, greedy decoding, the same scorer, and each model's own default prompt.

63.91 equals 0.6391 times 100. The 2.0 card prints 0.6391 for ParseBench overall, so those two overall figures match that rescaling. The other two shared names do not. The 3.5 card prints Parse 2.0 IndicVision overall ANLS-char as 72.12 on 876 pages. The 2.0 card prints 0.7203, which is 72.03 after multiplying by 100. The 3.5 card prints Parse 2.0 MOSCAR overall character bag F1 as 97.44 on 8,111 pages. The 2.0 card prints 0.9102, which is 91.02 after multiplying by 100. Keep them as separate reported figures.

The 3.5 card also says MOSCAR uses simple synthetic pages. It says those scores do not guarantee accuracy on complex scans, handwriting, or degraded images. The 2.0 card does not put that warning next to 0.9102.

## License and use limits

`LICENSE` says every binary model file and source file is OpenMDW-1.1, and the tokenizer is CC-BY-4.0. The OpenMDW-1.1 text in that file grants dealing in the model materials free of charge and without restriction, including copyright, patent, database, and trade secret rights. A distribution must keep the agreement and the origin notices. A lawsuit that claims the materials infringe a patent or copyright ends the grant, unless that lawsuit answers one already brought against you. The agreement says it does not restrict use, modification, or sharing of outputs. The materials are provided as is, with no warranty. You still have to clear other people's rights in the inputs. The README says the model may reproduce visible text from the page, including health information, confidential business data, and intellectual property.

The listed operating system is Linux. None of the scores or the page rate were measured for this note.

> **See also:** [Data Tools](/Technology/AI/Tools/Data/Data%20Tools)
