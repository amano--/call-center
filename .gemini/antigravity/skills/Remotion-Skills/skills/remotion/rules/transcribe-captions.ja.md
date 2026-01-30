---
name: transcribe-captions
description: オーディオを文字起こしして Remotion でキャプションを生成する
metadata:
  tags: captions, transcribe, whisper, audio, speech-to-text
---

# オーディオを文字起こしする

Remotion は、オーディオを文字起こししてキャプションを生成するためのいくつかの組み込みオプションを提供します。

- `@remotion/install-whisper-cpp` - Whisper.cpp を使用してサーバーでローカルに文字起こしします。高速で無料ですが、サーバーインフラストラクチャが必要です。
  https://remotion.dev/docs/install-whisper-cpp

- `@remotion/whisper-web` - WebAssembly を使用してブラウザで文字起こしします。サーバーが不要で無料ですが、WASM オーバーヘッドのため遅くなります。
  https://remotion.dev/docs/whisper-web

- `@remotion/openai-whisper` - OpenAI Whisper API を使用してクラウドベースの文字起こしを行います。高速でサーバーが不要ですが、支払いが必要です。
  https://remotion.dev/docs/openai-whisper/openai-whisper-api-to-captions
