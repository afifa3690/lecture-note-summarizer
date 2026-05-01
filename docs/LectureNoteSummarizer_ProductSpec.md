# PRODUCT SPEC SHEET

## Lecture Note Summarizer — AI Academic Study Assistant Platform

---

## 1. Product Name & One-line Description

| Field | Detail |
|---|---|
| **Product Name** | **Lecture Note Summarizer** |
| **One-line Description** | An AI-powered platform that automatically ingests lecture materials, extracts key concepts, and delivers structured summaries, flashcards, and practice questions — source-grounded, hallucination-checked, and ready for revision. |
| **Product Type** | Commercial SaaS / Web Application |
| **Version** | 1.0 (MVP) |

---

## 2. Who is the User?

**Primary User — Student (End Learner)**

Someone who wants fast, reliable study materials from large volumes of lecture content — likely an undergraduate, postgraduate, or self-learner. They upload notes, PDFs, YouTube lectures, or website links and receive structured summaries, flashcards, and quizzes. They pay a monthly subscription ($10–$25).

**Secondary User — Lecturer / Educator**

An academic who needs to quickly convert raw lecture materials into structured study guides or presentation slides for students. They upload lecture notes or recordings and export polished summaries and PPTX slides directly from the platform.

**Tertiary User — Admin / Operator**

The internal team member who monitors AI processing pipelines, reviews failed or low-confidence outputs, manages API cost metrics, and maintains system health. They need full backend access with role-based control.

Three distinct access levels: **Student** (frontend, read + generate), **Educator** (frontend, full export + slide generation), and **Admin** (backend dashboard, full monitoring + CRUD).

---

## 3. Core Features

| # | Feature | Priority | Description |
|---|---|---|---|
| F1 | Multi-Format Content Ingestion | Must Have | Accepts PDF, DOCX, TXT, images (scanned notes), audio recordings, YouTube lecture links, and website URLs. Files are parsed and normalized into clean text before any AI processing. |
| F2 | OCR for Scanned & Handwritten Notes | Must Have | Tesseract OCR or Google Vision API processes uploaded images and scanned PDFs to extract text. Low-confidence OCR output is flagged for user review before summarization proceeds. |
| F3 | AI Summarization Engine | Must Have | LLM agent (routed by content length and complexity) reads normalized input and produces a strict JSON output: `summary_short`, `summary_medium`, `summary_detailed`, `key_concepts[]`, `subject_category`. |
| F4 | Flashcard Generator | Must Have | Automatically derives question-answer pairs from key concepts and summary content. Stored per document; user can edit, delete, or add cards manually. |
| F5 | Practice Question Generator | Must Have | Generates multiple-choice and short-answer questions from summarized material. Questions are tagged by concept and difficulty level (Easy / Medium / Hard). |
| F6 | Document Q&A (NotebookLM-style) | Must Have | Users ask free-text questions about uploaded materials. LLM answers are grounded strictly in uploaded content with inline source citations — no hallucinated external facts. |
| F7 | Presentation Slide Generator | Should Have | Converts summarized content into a structured PPTX file. User selects slide count (5 / 10 / 15), presentation style (Academic / Professional / Minimal), and source documents. Output is downloadable. |
| F8 | YouTube & Web Link Analyzer | Should Have | Accepts YouTube video URLs (via transcript extraction) and website URLs (via scraping). Extracts text content and feeds it into the same summarization and flashcard pipeline as uploaded files. |
| F9 | Tiered Subscription Model | Should Have | Basic tier (Gemini Flash / DeepSeek) for high-volume routine summarization; Pro tier (Claude Sonnet / GPT-4) for complex long-form academic content and advanced Q&A. Pricing: $10–$25/month. |
| F10 | Error Alerting & Cost Monitoring | Should Have | A dedicated monitoring workflow triggers on pipeline failures and sends alerts. Weekly LLM token usage reports track operational spend per user tier. |

---

## 4. Data Model

**Core content object stored in the database:**

| Field | Type | Description |
|---|---|---|
| `id` | UUID | Unique document record |
| `user_id` | UUID (FK) | Owning user account |
| `source_type` | TEXT | `pdf` / `docx` / `image` / `audio` / `youtube` / `url` |
| `source_url` | TEXT | Original URL (for YouTube and web links) |
| `source_filename` | TEXT | Original file name (for uploaded files) |
| `raw_text` | TEXT | Normalized plain text after parsing / OCR |
| `ocr_confidence` | FLOAT | OCR confidence score (null if not applicable) |
| `summary_short` | TEXT | AI-generated short summary |
| `summary_medium` | TEXT | AI-generated medium summary |
| `summary_detailed` | TEXT | AI-generated detailed summary |
| `key_concepts` | JSONB | Array of extracted key concept objects `{term, definition}` |
| `subject_category` | TEXT | e.g., Biology, History, Computer Science |
| `flashcards` | JSONB | Array of `{question, answer}` pairs |
| `practice_questions` | JSONB | Array of `{question, options[], correct_answer, difficulty}` |
| `processing_status` | TEXT | `queued` / `processing` / `ready` / `failed` / `ocr_review` |
| `llm_model_used` | TEXT | Which model generated the output (for audit) |
| `created_at` | TIMESTAMP | When the record was created |
| `updated_at` | TIMESTAMP | Last modification timestamp |

**Entity Relationships:**

- One **User** → many **Documents** (uploaded sources)
- One **Document** → one **ProcessingJob** (async AI pipeline run)
- One **ProcessingJob** → one **SummaryOutput** (short / medium / detailed)
- One **SummaryOutput** → many **Flashcards** + many **PracticeQuestions**
- One **Document** → many **QAMessages** (chat history for Q&A view)
- One **User** → one **Subscription** (Basic / Pro tier)

---

## 5. Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Workflow / Job Engine** | n8n (self-hosted, Docker Worker mode) or BullMQ | Async job queue for OCR, summarization, and slide generation pipelines; built-in retry and error handling |
| **OCR Engine** | Tesseract OSS / Google Vision API | Open-source OCR for standard scans; Google Vision for low-quality or handwritten notes |
| **YouTube Transcript** | `youtube-transcript` (Node.js) / YouTube Data API | Extracts video transcripts without requiring video download |
| **Web Scraper** | Playwright / Cheerio | Headless browser scraping for web page content extraction |
| **LLM (Bulk)** | Google Gemini 2.5 Flash / DeepSeek V3 | Cost-optimized for high-volume routine summarization (Basic tier) |
| **LLM (Premium)** | Anthropic Claude Sonnet 4 / OpenAI GPT-4.1 | Reserved for complex long-form academic content and advanced Q&A (Pro tier) |
| **Slide Generator** | `pptxgenjs` (Node.js) | Programmatic PPTX generation from structured summary JSON |
| **Content Repository** | PostgreSQL + Prisma ORM | Persistent storage for all documents, summaries, flashcards, and Q&A history |
| **File Storage** | AWS S3 / Cloudflare R2 | Stores raw uploaded files (PDF, images, audio) with signed URL access |
| **Backend API** | Node.js + Express / Fastify | REST API consumed by the React frontend; handles auth, uploads, and job dispatch |
| **Frontend** | React + TailwindCSS | Fast, clean UI; no ads, no bloat |
| **Authentication** | Supabase Auth / Auth0 | Email + password + Google OAuth; JWT-based session management |
| **Monitoring** | Slack / Email alerts + Sentry | Real-time pipeline failure alerts and frontend error tracking |

---

## 6. Constraints

### 6.1 Data Integrity

1. **Source grounding is mandatory:** All Q&A answers must be generated strictly from uploaded source content. The LLM system prompt must explicitly prohibit answering from general world knowledge — citations must reference specific uploaded documents.

2. **No processing on low-confidence OCR:** Documents with `ocr_confidence` below 0.75 must be flagged with status `ocr_review` and surfaced to the user for confirmation before any AI summarization proceeds.

3. **Clean text only:** Raw OCR output, HTML tags, and formatting artifacts must be stripped by a preprocessing step before any LLM input. LLM-generated Markdown wrappers must be stripped before database writes.

### 6.2 Security

1. **File validation is mandatory:** All uploaded files must be validated for MIME type, file extension, and maximum size (50MB per file) before processing begins. Malformed or unsupported files are rejected immediately — before any API credits are consumed.

2. **Credential management:** All API keys (LLM providers, OCR, YouTube, S3) stored in environment variables or a secrets manager — never hardcoded.

3. **User data isolation:** All document queries must be scoped to the authenticated `user_id`. Cross-user data access is blocked at the API layer.

### 6.3 Cost Control

1. **LLM routing is enforced:** Routine summarization of standard documents must use cost-optimized models only. Premium models are invoked exclusively for Pro tier users and complex long-context content — enforced via conditional routing logic.

2. **Token budgeting per request:** Input text is chunked and truncated to model context limits before submission. Documents exceeding 100,000 tokens must be processed in segments with result merging.

3. **Budget alerting:** Weekly LLM token consumption per user tier must be audited. Unexpected cost spikes trigger an automatic Slack alert.

### 6.4 Rate Limits & Resilience

1. **Retry on fail:** All critical external API calls (LLM, OCR, YouTube, S3) must have retry logic enabled with exponential backoff (max 3 attempts).

2. **Async job processing:** All AI-heavy operations (summarization, flashcard generation, slide generation) must be dispatched as async background jobs — never blocking the HTTP response. Frontend polls job status via a `/status/:jobId` endpoint.

3. **Concurrent upload throttling:** Users are limited to 5 concurrent uploads on Basic tier and 20 on Pro tier to prevent resource exhaustion.

### 6.5 Content Quality

1. **Active subject categorization:** Every processed document must be assigned a `subject_category` by the LLM. Uncategorized content is flagged, not discarded — it surfaces in the UI under "Uncategorized" for manual labelling.

2. **Minimum content threshold:** Documents with fewer than 100 words of extractable text after parsing are rejected with a clear user-facing error before any LLM credits are consumed.

---

## 7. Screens

| Screen | Purpose |
|---|---|
| **S1 — Dashboard / Document Library** | Primary user screen. Displays all uploaded documents as cards with title, content type tag, processing status badge, and last modified date. Upload new documents via drag-and-drop zone or URL input. |
| **S2 — Summary View** | Expanded view of a single processed document. Displays short / medium / detailed summary (user-selectable toggle), highlighted key concepts, and action buttons to copy, download, or generate slides. Flashcards and practice questions are displayed below the summary. |
| **S3 — Q&A Chat View** | NotebookLM-style chat interface. Left panel lists all uploaded source documents. Right panel is a chat window where the user asks questions grounded in uploaded materials. AI responses include inline source citations. |
| **S4 — Presentation Slide Generator** | User selects source documents, slide count, and presentation style. Preview panel shows generated slide structure. One-click PPTX download. Processing state shows skeleton loaders with a progress indicator. |
| **S5 — Upload & Processing View** | Dedicated upload screen with full-size drag-and-drop zone and URL input field for YouTube / web links. Shows active upload progress bars and OCR review prompts for low-confidence scans. |
| **S6 — Onboarding / Landing Page** | Public-facing. Explains the product value proposition, core features (summarize, flashcards, Q&A, slides), and pricing tiers. Emphasizes "source-grounded, no hallucinations, ad-free" as the core UVP. Sign-up CTA. |
| **S7 — Login / Account Screen** | Email + password + Google OAuth. Basic subscribers access summarization and flashcards. Pro subscribers unlock advanced Q&A and slide generation. Admins are routed to the backend monitoring dashboard. |

---

*Document prepared for: Lecture Note Summarizer — AI Academic Study Assistant Platform*
*Product Spec v1.0 | Modelled after the CurrentAI GYAN product specification format*
