---
area: technology
domain: machine-learning
type: guide
title: Laravel AI SDK
description: Laravel's first-party AI SDK (laravel/ai) — a unified PHP API for agents with tools and structured output, images, audio, transcription, embeddings, reranking, classification, vector stores, and human tool approval.
timestamp: "2026-09-29T00:00:00.000Z"
tags:
  - technology
  - machine-learning
  - laravel
  - php
  - agents
resource: https://github.com/laravel/ai
---

# Laravel AI SDK

[laravel/ai](https://github.com/laravel/ai) is Laravel's first-party AI SDK: a unified, expressive PHP API over OpenAI, Anthropic, Gemini, Azure, Bedrock, Groq, xAI, DeepSeek, Mistral, Ollama, OpenRouter, and OpenAI-compatible endpoints. MIT, ~1.2k stars. It covers agents with tools and structured output, image generation, TTS/STT, summarization, embeddings, reranking, classification, file/vector-store RAG, and human-in-the-loop tool approval — all through Laravel idioms (Artisan generators, service container, queues, events, `Stringable` macros, Eloquent).

Docs: [laravel.com/docs/ai-sdk](https://laravel.com/docs/ai-sdk).

## Installation And Configuration

```bash
composer require laravel/ai
php artisan vendor:publish --provider="Laravel\Ai\AiServiceProvider"
php artisan migrate   # creates agent_conversations + agent_conversation_messages
```

Provider credentials go in `config/ai.php` or `.env` (`OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GEMINI_API_KEY`, …). Default models per capability are configured in `config/ai.php`.

- **Custom base URLs** — a `url` key per provider routes through a proxy/gateway (LiteLLM, Azure OpenAI Gateway). Supported for OpenAI, Anthropic, Gemini, Groq, Cohere, DeepSeek, xAI, OpenRouter.
- **OpenAI-compatible driver** — `'driver' => 'openai-compatible'` with a required `url` (optional `key`, custom `headers`) targets LM Studio, vLLM, Together, Fireworks, or a local gateway. Supports text, streaming, tools, structured output, image attachments, embeddings, and transcription; embeddings and transcription models must be declared explicitly since arbitrary endpoints have no known model list.
- **Provider support matrix** — text spans 12 providers; images (OpenAI/Gemini/xAI/Azure/Bedrock/OpenRouter), TTS (OpenAI/ElevenLabs/Gemini/Mistral/OpenRouter), STT, embeddings, reranking, classification (TypeSafe/OpenRouter), and files each cover a narrower subset. `Laravel\Ai\Enums\Lab` is the enum for referencing providers in code.

## Agents

An agent is a PHP class encapsulating instructions, conversation context, tools, and output schema. Generate with `php artisan make:agent SalesCoach` (add `--structured` for a schema).

```php
class SalesCoach implements Agent, Conversational, HasTools, HasStructuredOutput
{
    use Promptable;

    public function __construct(public User $user) {}

    public function instructions(): Stringable|string { /* system prompt */ }
    public function messages(): iterable { /* prior conversation */ }
    public function tools(): iterable { return [new RetrievePreviousTranscripts]; }
    public function schema(JsonSchema $schema): array {
        return ['score' => $schema->integer()->min(1)->max(10)->required()];
    }
}

$response = (new SalesCoach)->prompt('Analyze this sales transcript...');
$response = SalesCoach::make(user: $user);          // container-resolved
$response = (new SalesCoach)->prompt($text, provider: Lab::Anthropic, model: 'claude-haiku-4-5-20251001', timeout: 120);
```

- **Conversation memory** — implement `Conversational` and return messages from `messages()`, or use the `RemembersConversations` trait to persist automatically. `forUser($user)->prompt(...)` starts a conversation and returns a `conversationId`; `continue($conversationId, as: $user)` resumes it.
- **Structured output** — implement `HasStructuredOutput` with a `schema()`; the response is array-accessible (`$response['score']`).
- **Attachments** — `Files\Document` / `Files\Image` from a disk, local path, URL, or uploaded file.
- **Streaming** — `stream()` returns a `StreamableAgentResponse` that can be returned directly from a route (SSE), with `then()` for completion and manual event iteration. `usingVercelDataProtocol()` emits the Vercel AI SDK stream protocol.
- **Broadcasting / queueing** — `broadcast()`, `broadcastNow()`, `broadcastOnQueue()`; `queue()->then()->catch()` runs the generation in the background.
- **Anonymous agents** — the `agent()` helper builds an ad-hoc agent without a class, optionally with a schema.
- **Configuration attributes** — `#[Provider]`, `#[Model]`, `#[MaxSteps]`, `#[MaxTokens]`, `#[Temperature]`, `#[TopP]`, `#[Timeout]`, plus `#[UseCheapestModel]` / `#[UseSmartestModel]` (note: the model those resolve to can change between SDK releases — pin `#[Model]` when cost/pricing stability matters).
- **Provider options** — implement `HasProviderOptions` to send per-provider payloads (OpenAI `reasoning.effort`, Anthropic `thinking.budget_tokens`, `cache_control`). Also available on the image/audio/transcription/embedding/reranking builders, and as closures receiving the active provider.
- **Prompt caching** — OpenAI/Gemini/Groq/DeepSeek/xAI cache automatically; Anthropic and Bedrock require `#[CacheInstructions]` / `#[CacheToolDefinitions]` (optional TTL, e.g. `'1h'`). Caching instructions for an hour also requires caching tool definitions for an hour, or an `InvalidArgumentException` is thrown.
- **Middleware** — implement `HasMiddleware`; `handle(PendingStep $step, Closure $next)` runs once per generation step and can rewrite model, instructions, messages, tools, and provider options, or short-circuit with a cached `StepResponse`. Useful for dropping expensive tools after the first step or summarizing the middle of a long tool loop.

## Tools

`php artisan make:tool RandomNumberGenerator` scaffolds a `Tool` with `description()`, `handle(Request $request)`, and `schema(JsonSchema $schema)`. Return tools from an agent's `tools()`.

- **`SimilaritySearch`** — RAG over Eloquent vector columns: `SimilaritySearch::usingModel(Document::class, 'embedding')` with optional `minSimilarity`, `limit`, and a query closure.
- **`FileStorage`** — `FileStorage::all('local')` / `readOnly('local')` exposes list/read/URL/write/delete/copy tools for a Laravel filesystem disk, returned as a collection you can filter.
- **MCP tools** — spread a Laravel MCP client's tools into the agent: `...Client::web($url)->withToken($token)->tools()`, `...Mcp::client('github')->tools()`, or `...Client::local('php', ['artisan', 'mcp:start'])->tools()`.
- **Deferred tool loading** — `ToolSearch` (OpenAI/Anthropic) defers large tool sets so the provider loads them only when relevant; Anthropic supports `regex` (default) and `bm25` strategies. Providers without support throw rather than silently dropping the tools.
- **Provider tools** — executed by the provider, not your app: `WebSearch`, `WebFetch`, `FileSearch` (over vector stores, with metadata filters), `CodeExecution` (provider-hosted sandbox).
- **Sub-agents** — an agent returned from another agent's `tools()` becomes a callable tool; implement `CanActAsTool` to set the tool-facing name/description. Each sub-agent invocation runs in isolation without the parent's history, and streams alongside the parent when streaming.

## Human Tool Approval

Tools with sensitive or irreversible effects can require approval: implement `Approvable` and use `InteractsWithApprovals`. Approvable tools require approval by default; `needsApproval(Request)` can return a bool or an `Approval::required('reason')` for conditional gating, and `withoutApproval()` / `requireApproval('reason')` override per agent.

The agent **pauses** before executing; inspect `$response->hasPendingApprovals()` and `$response->pendingApprovals` (each with `id`, `tool`, `arguments`, `reason`). Resume with `Decisions::from(['call_abc' => Decision::approve(), 'call_ghi' => Decision::reject('reason')])` — decisions may approve, reject, or edit arguments; `approveRemaining()` / `rejectRemaining()` supply defaults. Every pending call needs a decision or `ApprovalMismatchException` is thrown.

Two operational notes: paused turns are matched by conversation and pending tool calls, **not** by the participant, so authorize conversation access before resuming; and tool approval requires the paused turn's history to be available on resume (use `RemembersConversations` or pass history via `withMessages`), otherwise `ApprovalNotResumableException`. Supported across `prompt`, `stream`, `queue`, `broadcast`, `broadcastNow`, `broadcastOnQueue`; during streaming a pause is a `tool_approval_request` event.

## Media, Embeddings, And Classification

- **Images** — `Image::of('...')->quality('high')->landscape()->generate()`; reference images via `attachments()`; `n` provider option returns multiple; `store()`/`storeAs()`/`storePublicly()` persist to a disk; `queue()` for background generation.
- **Audio (TTS)** — `Audio::of('...')->female()->instructions('Said like a pirate')->generate()`, or `Str::of('...')->toAudio()`.
- **Transcription (STT)** — `Transcription::fromPath()/fromStorage()/fromUpload()->diarize()->generate()`. OpenAI-compatible and Groq providers do not support diarization.
- **Summarization** — `Str::of($article)->summarize(sentences: 4, provider: Lab::Anthropic, model: '...')`; defaults to three sentences on the provider's cheapest text model.
- **Embeddings** — `Str::of('...')->toEmbeddings()`, or `Embeddings::for([...])->dimensions(1536)->generate(Lab::OpenAI, 'text-embedding-3-small')`. **Multimodal embeddings** accept image/audio/document/video inputs (Gemini: all four; VoyageAI: image and video). Caching is opt-in via `ai.caching.embeddings.cache` (30-day TTL, keyed on provider/model/dimensions/content) or per-request `->cache(seconds: 3600)`.
- **Reranking** — `Reranking::of($documents)->rerank('PHP frameworks')` returns scored, reordered results; collections get a `rerank()` macro (`$posts->rerank('body', 'Laravel tutorials')`).
- **Classification** (experimental) — ask a fixed set of typed questions and get probabilities instead of free text: `Boolean` (`.isTrue(threshold: 0.8)`), `Choice` (`.choice`, `.probabilityOf()`, `.confidence`), `Score` (`.score`, `.level()`, `.normalized()`). `Str::of($message)->decide('Is this spam?', threshold: 0.9)` for a single yes/no. Defaults to TypeSafe.

## RAG: Files, Vector Stores, Similarity Search

- **Files** — `Document::fromPath()/fromStorage()/fromUrl()/fromString()/fromUpload()->put()` stores a file with the provider; reference later with `Document::fromId($id)` instead of re-uploading. `get()`, `delete()`, and per-provider `withProviderOptions()` (e.g. OpenAI `purpose`).
- **Vector stores** — `Stores::create('Knowledge Base')` (optional `description`, `expiresWhenIdleFor`), `Stores::get()`, `Stores::delete()`. `$store->add(Document::fromPath(...), metadata: [...])` stores and indexes in one step; metadata later filters `FileSearch`. `$store->remove($id, deleteFile: true)` also deletes from provider file storage. Gemini imports block until searchable (up to five minutes) — add them from a queued job.
- **Querying embeddings in the database** — Laravel adds native `vector` columns: `$table->vector('embedding', dimensions: 1536)->index()` (auto HNSW with cosine distance), the `AsVector` Eloquent cast, and `whereVectorSimilarTo('embedding', $query, minSimilarity: 0.4)` — passing a plain string auto-generates its embedding. Lower-level `selectVectorDistance`, `whereVectorDistanceLessThan`, `orderByVectorDistance` are also available. Supported on PostgreSQL with `pgvector` and MariaDB 11.7+.

## Reliability And Observability

- **Failover** — pass an array of providers/models; failover triggers only on `FailoverableException` subclasses (`RateLimitedException`, `ProviderOverloadedException`, `InsufficientCreditsException`), not on validation or bad-request errors. Use an associative array keyed by `Lab::X->value` to pin a model per provider in the chain.
- **Usage** — every response has `usage`; text returns `TextUsage` with `cacheReadInputTokens`, `cacheWriteInputTokens`, `reasoningTokens`, and `uncachedInputTokens()`. Cache reads, cache writes, and uncached input are billed at different rates, so price them separately rather than from the input total. Other capabilities add their own counts (`imageInputTokens`, `audioSeconds`, `searchUnits`). Unreported counts are `null`, not `0`.
- **Events** — ~35 events including `PromptingAgent`, `AgentPrompted`, `AgentFailed`, `AgentFailedOver`, `ProviderFailedOver`, `StartingStep`/`StepCompleted`/`StepFailed`, `InvokingTool`/`ToolInvoked`/`ToolFailed`, `ToolApprovalRequested`/`ToolApprovalResolved`, and per-capability `Generating*`/`*Generated` pairs.

## Testing

Every capability has a `fake()` plus assertion helpers, so AI calls never hit the network in tests:

```php
SalesCoach::fake(['First response', 'Second response']);
SalesCoach::fake(fn (AgentPrompt $p) => 'Response for: '.$p->prompt);
SalesCoach::assertPrompted('Analyze this...');
SalesCoach::assertPromptedTimes(3);
SalesCoach::fake()->preventStrayPrompts();   // fail on un-faked invocations
```

Structured-output agents auto-generate schema-shaped fake data; `AgentResponse::fakeWithPendingApprovals([...])` and `fakeWithReasoning(...)` cover approval and reasoning flows. `Image::fake()`, `Audio::fake()`, `Transcription::fake()`, `Embeddings::fake()`, `Reranking::fake()`, `Classification::fake()`, `Files::fake()`, and `Stores::fake()` follow the same pattern (faking stores also fakes file operations). Queued variants use `assertQueued` / `assertNotQueued` / `assertNothingQueued`.

## Frontend Integration

Streamed responses can speak the Vercel AI SDK stream protocol (so `useChat` renders tool output and approval parts natively) or the Agent User Interaction protocol (reports sub-agent progress as activity snapshots and approvals as interrupts). Clients post approval decisions along with the rest of the conversation, so a chat request can be passed straight to the agent:

```php
$chat = Vercel::chat($request);

return (new FileAssistant)
    ->continue($conversationId, as: $request->user())
    ->stream($chat)
    ->usingProtocol($chat->protocol());
```

The package also ships a Laravel Boost skill (`resources/boost/skills/ai-sdk-development/SKILL.md`) so AI coding agents get AI-SDK-specific guidance when working in a Laravel app.

> **See also:** [Development Frameworks](/Technology/AI/Tools/Frameworks/Development Frameworks) · [Agent Frameworks](/Technology/AI/Tools/Agents/Agent Frameworks) · [RAG Tutorial Neo4j GraphRAG](/Technology/AI/Practices/RAG Tutorial Neo4j GraphRAG)
