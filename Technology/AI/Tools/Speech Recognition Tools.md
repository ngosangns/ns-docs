---
area: technology
domain: speech-recognition
type: tool
title: Speech Recognition Tools
description: Curated speech tooling covering ASR, TTS, pronunciation assessment, forced alignment, and self-supervised speech models such as HuBERT and wav2vec.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - speech-recognition
  - tts
  - asr
resource: https://www.facebook.com/meousensei/posts/pfbid0sKSPNQkduSiAY2TX9CjZJ795Z6ACBjkNtqy7QJVc1ZhMhevtarjeUNKKHi17WJXFl
---

# Speech Recognition Tools

## Vietnamese Language Tools

- **PhoTranscriptor** - A Vietnamese-language transcription app for researchers: https://www.facebook.com/meousensei/posts/pfbid0sKSPNQkduSiAY2TX9CjZJ795Z6ACBjkNtqy7QJVc1ZhMhevtarjeUNKKHi17WJXFl
- **KittenTTS** (https://github.com/KittenML/KittenTTS): Text to speech

## Pronunciation Assessment

- **gopt** (https://github.com/YuanGongND/gopt): Pronunciation assessment tool for non-native English speakers, using a Transformer model. Based on the ICASSP 2022 paper "Transformer-Based Multi-Aspect Multi-Granularity Non-native English Speaker Pronunciation Assessment". Assesses pronunciation across multiple aspects and levels of granularity.
- **phonemizer** (https://github.com/bootphon/phonemizer): Python tool that converts text into phonemes for many languages. Supports speech synthesis backends such as eSpeak and Festival. Installs via pip and is used through the Python API or command line. Useful for preparing data for speech recognition or speech synthesis systems.
- **Goodness-of-Pronunciation** (https://github.com/sweekarsud/Goodness-of-Pronunciation): Pronunciation quality assessment tool based on a machine learning model. Computes the GOP (Goodness-of-Pronunciation) score to evaluate read-aloud ability by comparing the learner's pronunciation against a reference. Provides source code and instructions for training and evaluating the model.
- **goodness-of-pronunciation-HTK** (https://github.com/topel/goodness-of-pronunciation-HTK): A GOP implementation using HTK (Hidden Markov Model Toolkit) to assess pronunciation at the phoneme level for second-language learners. Provides scripts and instructions for computing GOP scores. Requires installing HTK and preparing suitable data.
- **goparrot** (https://github.com/tzyll/goparrot): A simple Kaldi-based tool for computing GOP scores to assess read-aloud speech. Provides three kinds of GOP score: posterior-based, likelihood-based, and likelihood-ratio-based. Includes an ASR model trained on the WSJ dataset and test samples. Requires installing Kaldi and preparing data in Kaldi format.
- **IPA Audio Visual** (https://hanna-hofmann.com/ipa-audio-visual/): A unique tool for learning the International Phonetic Alphabet (IPA) that uses real-time MRI imagery synchronized with audio. Includes sections on vowels, consonants, and anatomy, helping learners understand how sounds are articulated and structured.

## ASR (Automatic Speech Recognition)

- **espeak-ng** (https://github.com/espeak-ng/espeak-ng): Open-source speech synthesizer supporting 100+ languages and accents. Uses formant synthesis, producing clear speech in a compact size. Usable as a command-line program or a shared library. Supports SSML and can write output as WAV files. Suited to text reading applications and assisting visually impaired users.
- **kaldi** (https://github.com/kaldi-asr/kaldi): Open-source automatic speech recognition (ASR) toolkit written in C++. Designed for ASR researchers, supporting many models such as GMM-HMM, DNN-HMM, and WFST. Provides tools for feature extraction, model training, and decoding. Lets you build custom speech recognition systems. Requires installing dependencies and compiling from source.
- **whisper-timestamped** (https://github.com/linto-ai/whisper-timestamped): An extension of OpenAI's Whisper model that provides word-level timestamps and confidence for multilingual speech recognition. Pinpoints when each word appears in the audio. Useful for automatically generating subtitles for video or analyzing audio content with high precision.
- **DeepSpeech** (https://github.com/mozilla/DeepSpeech): Open-source speech recognition tool developed by Mozilla, based on an end-to-end deep learning model. Converts speech to text with high accuracy and supports many languages. **Note**: DeepSpeech is discontinued and no longer maintained. Consider alternatives such as Whisper or other ASR systems.
- **Praat** (https://github.com/praat/praat.github.io): Open-source software for speech analysis, synthesis, and manipulation. Supports functions such as spectral analysis, formant measurement, pitch and intensity analysis, and creating and manipulating TextGrids for labeling and segmentation. Main website: https://praat.org
- **aeneas** (https://github.com/readbeyond/aeneas): Python/C library and toolkit for automatically synchronizing audio and text (forced alignment). Produces time-annotation files (TextGrid or other formats) that assign timestamps to each text segment in an audio file.
- **allosaurus** (https://github.com/xinjli/allosaurus): Deep-learning-based multilingual phoneme recognition model supporting 100+ languages. Recognizes and segments phonemes from audio files.
- **CMUSphinx** (https://cmusphinx.github.io/): Open-source speech recognition toolkit providing libraries and tools for developing speech recognition applications. Includes PocketSphinx, SphinxTrain, and Sphinx4.

## Self-Supervised Learning Models

- **FastHuBERT** (https://github.com/yanghaha0908/FastHuBERT): A HuBERT model optimized for speed and performance, speeding up training and inference in speech recognition tasks.
- **fairseq HuBERT** (https://github.com/facebookresearch/fairseq/tree/main/examples/hubert): Examples and instructions for using the HuBERT model in fairseq (Facebook AI Research's deep learning toolkit). HuBERT is a self-supervised learning model for speech recognition.
- **fairseq wav2vec** (https://github.com/facebookresearch/fairseq/tree/main/examples/wav2vec): Examples and instructions for using the wav2vec model in fairseq. Wav2vec is another self-supervised learning model for speech recognition.
- **wav2vec 2.0** (https://arxiv.org/abs/2006.11477): A framework for self-supervised speech representation learning. Demonstrates for the first time that learning powerful representations from speech audio alone, then fine-tuning on transcribed data, can outperform the best semi-supervised methods.
- **Whisper timestamp discussion** (https://github.com/openai/whisper/discussions/318): Discussion about extending the Whisper model to support accurate timestamping in speech recognition.

> **See also:** [Content And Multimedia Tools](/Technology/AI/Tools/GenAI/Content And Multimedia Tools) · [Local Runtime Tools](/Technology/AI/Tools/Runtime/Local Runtime Tools) · [Vietnamese NLP Resources](/Technology/AI/Resources/Vietnamese NLP Resources)
