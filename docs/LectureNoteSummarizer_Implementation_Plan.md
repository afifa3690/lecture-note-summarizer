# Lecture Note Summarizer — Implementation Plan

This document outlines the complete implementation plan for the **Lecture Note Summarizer**, based on the product specification, design system, and agent skill file.

## 1. Problem Statement
**What problem this project solves:**
Students, researchers, and educators spend excessive time manually reading dense lecture materials, textbooks, and handwritten notes to extract key concepts and build revision materials. 
The platform solves this by providing "frictionless learning." It automatically ingests raw academic content across various formats, extracts key concepts, and delivers structured summaries, interactive flashcards, practice questions, and presentations—allowing users to focus on understanding rather than processing.

## 2. Target Users
1. **Primary: Student (End Learner):** Needs fast, reliable study materials from diverse sources (PDFs, YouTube, notes). Uses the tool for structured summaries, flashcards, and quizzes.
2. **Secondary: Lecturer / Educator:** Needs to quickly convert raw lecture materials into structured study guides or presentation slides (PPTX) for students.
3. **Tertiary: Admin / Operator:** Internal team member monitoring AI processing pipelines, API costs, system health, and reviewing failed/low-confidence outputs.

## 3. Core Features
1. **Multi-Format Content Ingestion:** Process PDFs, DOCX, TXT, images, audio, YouTube URLs, and web links.
2. **OCR for Scanned/Handwritten Notes:** Tesseract/Google Vision API with low-confidence flagging for user review.
3. **AI Summarization Engine:** Generates short/medium/detailed summaries, key concepts, and subject categorization.
4. **Interactive Flashcard Generator:** Auto-generates editable Q&A pairs from extracted key concepts.
5. **Practice Question Generator:** Auto-generates MCQs, short-answer, and True/False questions mapped to difficulty and source.
6. **Document Q&A (NotebookLM-style):** Chat interface with strict source-grounding and inline citations (no hallucinated answers).
7. **Presentation Slide Generator:** Programmatic conversion of summarized content to downloadable PPTX slides.
8. **Smart LLM Routing (Tiered Subscriptions):** Base tier uses cost-optimized models (Gemini/DeepSeek); Pro uses premium models (Claude/GPT-4).

## 4. Tech Stack
* **Frontend:** React + TailwindCSS (Dark-mode primary, academic aesthetic).
* **Backend API:** Node.js with Express or Fastify.
* **Database:** PostgreSQL managed via Prisma ORM.
* **Job/Workflow Engine:** n8n (Worker mode) or BullMQ (Redis-backed async job queue).
* **File Storage:** AWS S3 or Cloudflare R2 (signed URLs).
* **AI & LLMs:** Google Gemini 2.5 Flash / DeepSeek V3 (Bulk processing), Anthropic Claude Sonnet 4 / OpenAI GPT-4 (Premium).
* **Utility Libraries:** `pptxgenjs` (Slides), `youtube-transcript` (Video), Playwright/Cheerio (Scraping), Tesseract OSS (OCR).
* **Authentication:** Supabase Auth or Auth0.

## 5. Database Schema
**Core Entity: `Document` (or `ContentItem`)**

| Field | Type | Description |
|---|---|---|
| `id` | UUID (PK) | Unique document record |
| `user_id` | UUID (FK) | Owning user account |
| `source_type` | TEXT | `pdf`, `docx`, `image`, `audio`, `youtube`, `url` |
| `source_url` | TEXT | Original URL (for YT/web links) |
| `source_filename`| TEXT | Original file name (for uploads) |
| `raw_text` | TEXT | Normalized plain text post-extraction |
| `ocr_confidence` | FLOAT | OCR confidence score (triggers review if < 0.75) |
| `summary_short` | TEXT | AI-generated short summary |
| `summary_medium` | TEXT | AI-generated medium summary |
| `summary_detailed` | TEXT | AI-generated detailed summary |
| `key_concepts` | JSONB | Array of `{term, definition}` |
| `subject_category` | TEXT | e.g., Biology, History |
| `flashcards` | JSONB | Array of `{question, answer}` |
| `practice_questions`| JSONB | Array of `{question, options[], correct_answer, difficulty}` |
| `processing_status`| TEXT | `queued`, `processing`, `ready`, `failed`, `ocr_review` |
| `llm_model_used` | TEXT | Audit trail of used LLM |
| `created_at` / `updated_at` | TIMESTAMP | Meta timestamps |

*(Other tables include `User`, `Subscription`, `QAMessages` (Chat history), `ProcessingJob`)*

## 6. API Endpoints (Basic Structure)
**Authentication**
* `POST /api/auth/register`
* `POST /api/auth/login`

**Documents & Processing**
* `POST /api/documents/upload` - Submit file/URL; queues processing job.
* `GET /api/documents` - Fetch user's document library.
* `GET /api/documents/:id` - Fetch document details, summaries, and flashcards.
* `PATCH /api/documents/:id` - Update document metadata or resolve `ocr_review` state.
* `DELETE /api/documents/:id` - Delete document and associated files.
* `GET /api/jobs/status/:jobId` - Polling endpoint for async AI processing operations.

**Interactive Features**
* `POST /api/documents/:id/chat` - Send a Q&A chat message; returns source-grounded response.
* `POST /api/documents/:id/slides` - Triggers slide generation and returns PPTX download link.
* `PATCH /api/documents/:id/flashcards` - Edit, add, or delete flashcards manually.

## 7. Folder Structure
```text
/lecture-note-summarizer
├── /frontend               # React Web Application
│   ├── /src
│   │   ├── /assets         # Static resources
│   │   ├── /components     # Reusable UI (UploadCard, FlashCard, ChatMessage)
│   │   ├── /context        # AuthProvider, ThemeProvider
│   │   ├── /hooks          # API queries, WebSocket/Polling hooks
│   │   ├── /pages          # Dashboard, SummaryView, Q&A View, Landing
│   │   ├── /styles         # index.css (Strict inclusion of Design System tokens)
│   │   └── /utils          # Formatting helpers, API clients
│   ├── package.json
│   └── tailwind.config.js
├── /backend                # Node.js API Service
│   ├── /src
│   │   ├── /controllers    # Express/Fastify route handlers
│   │   ├── /middlewares    # Auth validation, file size limits, rate limiters
│   │   ├── /routes         # API routing declarations
│   │   ├── /services       # LLM orchestrator, OCR wrappers, Scraping, PPTX prep
│   │   ├── /jobs           # BullMQ worker definitions (Async pipeline)
│   │   ├── /prisma         # schema.prisma and migrations
│   │   └── /utils          # Validators, error handlers
│   ├── package.json
│   └── Dockerfile
├── /docker-compose.yml     # Local dev: Postgres, Redis
└── /README.md
```

## 8. Step-by-Step Development Plan

### Phase 1: Foundation & Infrastructure (Week 1)
1. **Repo Setup:** Initialize monorepo or standard frontend/backend split. Set up `docker-compose` with Postgres and Redis.
2. **Database Schema:** Define Prisma schema and run initial migrations.
3. **Design System Integration:** Configure TailwindCSS exactly to the provided Design System specs (Colors, Typography, Border/Shadow tokens) in `index.css`.
4. **Auth Setup:** Integrate Supabase/Auth0 and protect API routes.

### Phase 2: Ingestion & Storage (Week 2)
1. **File Uploads:** Implement direct-to-S3/R2 uploads and secure file validation (MIME types, 50MB limit).
2. **Content Extractors:** Build modular extraction logic:
   - File parsers (PDF, DOCX)
   - OCR integration via Tesseract
   - YouTube transcripts (`youtube-transcript` package)
   - Web scraping (Cheerio/Playwright)

### Phase 3: AI Processing Pipeline (Week 3)
1. **Job Queue Setup:** Implement BullMQ to handle async processing.
2. **LLM Orchestration:** Chain the prompts:
   - Chunk extraction -> JSON Summaries -> Key Concepts -> Flashcards -> Questions.
3. **Status Polling:** Connect frontend state to backend job status (`queued`, `processing`, `ocr_review`, `ready`).
4. **Pipeline QA:** Implement fail-forwards, retry logic, and low OCR confidence interception.

### Phase 4: Frontend Core Screens (Week 4)
1. **Layouts:** Implement Navbar, Desktop Sidebar Sidebar, and mobile responsive logic.
2. **Dashboard (S1) & Upload (S5):** Build `UploadDropZone`, validate visually against specs. Show active upload progress.
3. **Summary View (S2):** Render `SummaryOutputCard`, interactive `KeyConceptPill` components, and the `Flashcard` carousel layout.

### Phase 5: Interactive Generation (Week 5)
1. **Document Q&A (S3):** Implement the NotebookLM-style split view. Build the RAG/context-injection logic ensuring strict source-grounding.
2. **Slide Generator:** Wire up `pptxgenjs` to the structured summary JSON. Implement the generator panel (S4).

### Phase 6: Polish, Testing & Deployment (Week 6)
1. **Visual QA:** Strict audit against the *Design System* (animations max 500ms, typography scale checks).
2. **Cost & Error Monitoring:** Set up budget alerts and Sentry error tracking for the AI pipeline.
3. **Empty States & Onboarding:** Implement S6 Landing page and empty states for the dashboard.
4. **Deploy:** Backend/Workers to Render/Railway, Frontend to Vercel/Netlify, Postgres to Supabase/Neon.
