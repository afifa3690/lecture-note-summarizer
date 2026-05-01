# 📚 Lecture Note Summarizer — Design System
### Version 1.0 | Smart Academic Assistant

> **For use by developers and designers building the Lecture Note Summarizer UI.**
> This file is the single source of truth for all visual decisions. Use ONLY the colors, fonts, spacing, and component patterns defined here. When in doubt: dark background, light text, accent in indigo-blue. Keep it clean and academic.

---

## 0. Agent Instructions

Read this section first before building any screen.

- Use ONLY the colors, fonts, spacing, and component patterns defined here.
- Do NOT invent new colors, border radii, or shadow values.
- Every screen has a spec in Section 9. Build exactly what is described.
- When in doubt: dark background, light text, accent in indigo. Keep it clean and focused.

---

## 1. Brand Identity

| Property | Value |
|---|---|
| **Product Name** | Lecture Note Summarizer |
| **Tagline** | *Upload. Understand. Retain.* |
| **Personality** | Focused, intelligent, academic — like a brilliant study partner, not a flashy app |
| **Visual Mood** | Dark-mode first, high contrast, generous whitespace, structured layouts, no decorative clutter |
| **Core User** | Students, lecturers, and researchers |

---

## 2. Color System

### 2.1 Base Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-bg-base` | `#0D0F14` | Page background |
| `--color-bg-surface` | `#161A22` | Cards, panels, sidebar |
| `--color-bg-elevated` | `#1E2430` | Modals, dropdowns, hover states |
| `--color-bg-subtle` | `#252C3A` | Dividers, inactive tabs, table rows |
| `--color-border` | `#2E3748` | All borders and outlines |
| `--color-border-focus` | `#4F6EF7` | Input focus ring |

### 2.2 Text Colors

| Token | Hex | Usage |
|---|---|---|
| `--color-text-primary` | `#F0F2F8` | Headings, body text |
| `--color-text-secondary` | `#9AA3B8` | Subtitles, metadata, timestamps |
| `--color-text-muted` | `#5C6478` | Placeholder text, disabled states |
| `--color-text-inverse` | `#0D0F14` | Text on accent/light backgrounds |

### 2.3 Accent & Brand Colors

| Token | Hex | Usage |
|---|---|---|
| `--color-accent-primary` | `#4F6EF7` | Primary buttons, active nav, links |
| `--color-accent-primary-hover` | `#3A5AE8` | Hover state for primary accent |
| `--color-accent-secondary` | `#9B5CF6` | Flashcards, Pro tier, AI-generated highlights |
| `--color-accent-warm` | `#F59E0B` | Key concept highlights, important markers |
| `--color-accent-glow` | `rgba(79,110,247,0.15)` | Subtle glow on cards, focus effects |

### 2.4 Semantic / Status Colors

| Token | Hex | Usage |
|---|---|---|
| `--color-success` | `#22C55E` | Upload success, processing complete |
| `--color-success-bg` | `rgba(34,197,94,0.1)` | Success banner background |
| `--color-warning` | `#F59E0B` | Processing in progress, partial results |
| `--color-warning-bg` | `rgba(245,158,11,0.1)` | Warning banner background |
| `--color-danger` | `#EF4444` | Errors, failed uploads, unsupported formats |
| `--color-danger-bg` | `rgba(239,68,68,0.1)` | Error banner background |
| `--color-info` | `#38BDF8` | Informational messages, tips, tooltips |
| `--color-info-bg` | `rgba(56,189,248,0.1)` | Info banner background |

### 2.5 Content Type Colors

Each input type and output mode has a fixed color pair: background and text.

| Content Type | Background | Text |
|---|---|---|
| Lecture Notes | `rgba(79,110,247,0.15)` | `#A5B4FC` |
| Textbook Chapter | `rgba(34,197,94,0.15)` | `#86EFAC` |
| Scanned / Handwritten | `rgba(245,158,11,0.15)` | `#FCD34D` |
| Website Link | `rgba(56,189,248,0.15)` | `#7DD3FC` |
| YouTube Lecture | `rgba(239,68,68,0.15)` | `#FCA5A5` |
| PDF Document | `rgba(155,92,246,0.15)` | `#C4B5FD` |
| Audio Recording | `rgba(16,185,129,0.15)` | `#6EE7B7` |

### 2.6 Summary Length Colors

| Summary Mode | Background | Text |
|---|---|---|
| Short | `rgba(56,189,248,0.15)` | `#7DD3FC` |
| Medium | `rgba(79,110,247,0.15)` | `#A5B4FC` |
| Detailed | `rgba(155,92,246,0.15)` | `#C4B5FD` |

---

## 3. Typography

### 3.1 Font Stack

```css
--font-sans: 'Inter', 'SF Pro Display', -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
--font-serif: 'Georgia', 'Times New Roman', serif; /* For article/reading views only */
```

Load Inter from Google Fonts:
`https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap`

### 3.2 Type Scale

| Token | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| `--text-xs` | 11px | 400 | 1.4 | Labels, micro-metadata |
| `--text-sm` | 13px | 400 | 1.5 | Secondary body, timestamps |
| `--text-base` | 15px | 400 | 1.6 | Primary body text |
| `--text-md` | 17px | 500 | 1.5 | Card titles, list items |
| `--text-lg` | 20px | 600 | 1.4 | Section headings |
| `--text-xl` | 24px | 700 | 1.3 | Page headings |
| `--text-2xl` | 30px | 700 | 1.2 | Hero headings |
| `--text-3xl` | 38px | 700 | 1.1 | Display / landing only |

### 3.3 Typography Rules

- **Document titles** on upload cards: `--text-md`, weight 600, `--color-text-primary`
- **Summary body text**: `--text-base`, weight 400, `--color-text-primary`, line-height 1.75
- **Key concept labels**: `--text-sm`, weight 600, `--color-accent-warm`
- **Source / metadata line**: `--text-sm`, weight 400, `--color-text-secondary`
- **Timestamps / file size**: `--text-xs`, weight 400, `--color-text-muted`
- **Content type tags**: `--text-xs`, weight 600, uppercase, letter-spacing `0.05em`
- **Navigation labels**: `--text-sm`, weight 500
- **Flashcard text**: `--text-md`, weight 500, centered
- **Practice question**: `--text-base`, weight 400, `--color-text-primary`

---

## 4. Spacing System

All spacing uses an 8px base grid.

| Token | Value | Usage |
|---|---|---|
| `--space-1` | 4px | Micro gaps (icon + label) |
| `--space-2` | 8px | Tight internal padding |
| `--space-3` | 12px | Tag padding, compact rows |
| `--space-4` | 16px | Default padding inside cards |
| `--space-5` | 20px | Section gaps |
| `--space-6` | 24px | Card vertical padding |
| `--space-8` | 32px | Between sections |
| `--space-10` | 40px | Page top/bottom padding |
| `--space-12` | 48px | Large section breaks |
| `--space-16` | 64px | Hero / empty state vertical space |

---

## 5. Border & Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | 6px | Tags, badges, small chips |
| `--radius-md` | 10px | Cards, inputs, buttons |
| `--radius-lg` | 16px | Modals, panels, upload zone |
| `--radius-full` | 9999px | Pill buttons, avatar circles |
| `--border-default` | `1px solid var(--color-border)` | All card/input borders |
| `--border-accent` | `1px solid var(--color-accent-primary)` | Active/selected states |
| `--border-dashed` | `2px dashed var(--color-border)` | Upload drop zones |

---

## 6. Shadows & Elevation

| Token | Value | Usage |
|---|---|---|
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.3)` | Subtle card lift |
| `--shadow-md` | `0 4px 16px rgba(0,0,0,0.4)` | Modals, dropdowns |
| `--shadow-lg` | `0 8px 32px rgba(0,0,0,0.5)` | Full-screen overlays |
| `--shadow-accent` | `0 0 0 3px var(--color-accent-glow)` | Focus ring on inputs/buttons |

---

## 7. Core Components

### 7.1 UploadCard (Primary Input Unit)

The most important component in the app. Represents a single uploaded document or source.

```
┌─────────────────────────────────────────┐
│  [ContentTypeTag]           [Timestamp] │
│                                         │
│  Document / Source title, up to 2 lines │
│                                         │
│  📄 lecture_notes_week3.pdf · 2.4 MB   │
│                                         │
│  [ProcessingBadge]   [ActionMenu ···]  │
└─────────────────────────────────────────┘
```

**Specs:**
- Background: `--color-bg-surface`
- Border: `--border-default`
- Border-radius: `--radius-md`
- Padding: `--space-6` vertical, `--space-4` horizontal
- Hover: background transitions to `--color-bg-elevated`, border becomes `--color-border-focus` at 40% opacity
- Transition: `all 150ms ease`
- Cursor: pointer — navigates to Summary View

**Title:** `--text-md`, weight 600, `--color-text-primary`, max 2 lines, `-webkit-line-clamp: 2`
**Meta line:** `--text-sm`, `--color-text-secondary`, flex row, gap `--space-2`

---

### 7.2 ContentTypeTag

**Specs:**
- Font: `--text-xs`, weight 600, uppercase, letter-spacing `0.05em`
- Padding: `3px 8px`
- Border-radius: `--radius-sm`
- Colors: use the content type color pair from Section 2.5
- No border

---

### 7.3 ProcessingBadge

Shown on UploadCard and Summary View. Communicates processing state at a glance.

| Status | Label | Color |
|---|---|---|
| `processing` | ⟳ Processing | `--color-warning` on `--color-warning-bg` |
| `ready` | ✓ Ready | `--color-success` on `--color-success-bg` |
| `failed` | ✕ Failed | `--color-danger` on `--color-danger-bg` |
| `ocr` | 👁 OCR Running | `--color-info` on `--color-info-bg` |

**Specs:**
- Font: `--text-xs`, weight 600
- Padding: `3px 8px`
- Border-radius: `--radius-sm`
- Icon + label, gap `--space-1`

---

### 7.4 Button

**Primary Button:**
- Background: `--color-accent-primary`
- Text: `--color-text-inverse`, `--text-sm`, weight 600
- Padding: `10px 20px`
- Border-radius: `--radius-md`
- Hover: `--color-accent-primary-hover`, `translate-y -1px`
- Focus: `--shadow-accent`
- Disabled: opacity 0.4, cursor not-allowed

**Secondary Button (Ghost):**
- Background: transparent
- Border: `--border-default`
- Text: `--color-text-secondary`
- Hover: background `--color-bg-elevated`, text `--color-text-primary`
- Same padding and radius as Primary

**Danger Button:**
- Background: `--color-danger`
- Text: white
- Use only for destructive actions (delete document, clear all)

**Icon Button:**
- 36×36px, border-radius `--radius-md`
- Background: transparent
- Hover: `--color-bg-elevated`
- Active icon color: `--color-accent-primary`

**Summary Length Toggle (Pill Group):**
- Three connected buttons: Short | Medium | Detailed
- Inactive: `--color-bg-surface`, `--color-text-secondary`
- Active: `--color-accent-primary`, white text
- Border between: `--border-default`
- Border-radius on outer edges: `--radius-full`

---

### 7.5 Input / Search Field

```
┌──────────────────────────────────────────┐
│  🔍  Ask a question about your notes...  │
└──────────────────────────────────────────┘
```

**Specs:**
- Background: `--color-bg-surface`
- Border: `--border-default`
- Border-radius: `--radius-md`
- Padding: `10px 14px`
- Font: `--text-base`, `--color-text-primary`
- Placeholder: `--color-text-muted`
- Focus: border `--color-border-focus`, box-shadow `--shadow-accent`
- Height: 44px (single line), auto-expand for multiline chat input
- Icon: 16px, `--color-text-muted`, positioned left with 12px padding

---

### 7.6 Navigation Bar (Top)

```
┌────────────────────────────────────────────────────────────────┐
│  📚 LectureSummarizer    Dashboard | My Docs | Q&A   [Avatar]  │
└────────────────────────────────────────────────────────────────┘
```

**Specs:**
- Background: `--color-bg-surface`
- Bottom border: `--border-default`
- Height: 60px
- Padding: `0 --space-8`
- Position: sticky, top: 0, z-index: 100
- Logo: `--text-lg`, weight 700, `--color-text-primary`, with 📚 icon in `--color-accent-primary`
- Nav links: `--text-sm`, weight 500, `--color-text-secondary`
- Active nav link: `--color-text-primary`, bottom border in `--color-accent-primary`
- Backdrop blur: `blur(12px)`, background opacity 0.85

---

### 7.7 Sidebar (Document & Output Panel — Desktop only)

**Specs:**
- Width: 260px, fixed on left
- Background: `--color-bg-surface`
- Border-right: `--border-default`
- Padding: `--space-6`
- Section heading: `--text-xs`, weight 700, uppercase, `--color-text-muted`, letter-spacing `0.08em`
- Item: `--text-sm`, `--color-text-secondary`, padding `8px 12px`, border-radius `--radius-md`
- Active item: background `--color-accent-glow`, color `--color-accent-primary`, weight 600
- Hidden on mobile (< 768px); replaced by bottom tab bar

---

### 7.8 UploadDropZone

The primary upload interaction surface.

```
┌─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐
│                                            │
│           ⬆  Drop files here              │
│     or paste a YouTube / website link      │
│                                            │
│   PDF · DOCX · TXT · Images · Audio        │
│                                            │
│         [ Browse Files ]                   │
│                                            │
└─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘
```

**Specs:**
- Background: `--color-bg-surface`
- Border: `--border-dashed` (`2px dashed var(--color-border)`)
- Border-radius: `--radius-lg`
- Padding: `--space-16` vertical, `--space-8` horizontal
- Text: centered, `--text-base`, `--color-text-muted`
- Drag-over state: border `--color-accent-primary`, background `--color-accent-glow`
- Icon: 48px upload icon, `--color-text-muted`
- Transition: `all 150ms ease`

---

### 7.9 FlashCard

Interactive study card with flip animation.

```
┌─────────────────────────────────────────┐
│              [FRONT]                    │
│                                         │
│      What is photosynthesis?            │
│                                         │
│         [ Tap to reveal ]               │
└─────────────────────────────────────────┘
```

**Specs:**
- Background: `--color-bg-surface`; flipped back: `--color-bg-elevated`
- Border: `--border-accent` on front, `--border-default` on back
- Border-radius: `--radius-lg`
- Padding: `--space-8`
- Min-height: 200px
- Text: `--text-md`, weight 500, centered, `--color-text-primary`
- Card number label: `--text-xs`, `--color-text-muted`, top-right
- Flip animation: `transform: rotateY(180deg)`, `500ms ease-in-out`
- Navigation arrows: icon buttons, positioned left/right center

---

### 7.10 PracticeQuestion

Used in the revision/quiz view.

```
┌─────────────────────────────────────────────────┐
│  Q3 of 10                          [Skip →]     │
│─────────────────────────────────────────────────│
│  What is the main function of mitochondria?     │
│                                                 │
│  ○  Energy production (ATP synthesis)          │
│  ○  Protein synthesis                          │
│  ○  DNA replication                            │
│  ○  Cell division                              │
│                                                 │
│           [ Check Answer ]                      │
└─────────────────────────────────────────────────┘
```

**Specs:**
- Background: `--color-bg-surface`
- Border: `--border-default`
- Border-radius: `--radius-lg`
- Padding: `--space-8`
- Question text: `--text-md`, weight 600, `--color-text-primary`
- Answer options: `--text-base`, `--color-text-secondary`
- Selected option: background `--color-accent-glow`, border `--border-accent`, text `--color-accent-primary`
- Correct answer state: background `--color-success-bg`, border `1px solid --color-success`
- Wrong answer state: background `--color-danger-bg`, border `1px solid --color-danger`

---

### 7.11 SummaryOutputCard

The generated summary display area.

**Specs:**
- Background: `--color-bg-surface`
- Border: `--border-default`
- Border-radius: `--radius-lg`
- Padding: `--space-6`
- Prose body: `--text-base`, `--color-text-primary`, line-height 1.75
- Section headers within summary: `--text-md`, weight 700, `--color-accent-primary`
- Key concept highlights: `background: rgba(245,158,11,0.12)`, `color: --color-accent-warm`, padding `1px 4px`, border-radius `3px`
- Copy button: icon button, top-right corner of card
- Download button: icon button, adjacent to copy

---

### 7.12 KeyConceptPill

Inline chip used to highlight key terms in summaries.

**Specs:**
- Background: `rgba(245,158,11,0.12)`
- Text: `--color-accent-warm`, `--text-sm`, weight 600
- Padding: `2px 8px`
- Border-radius: `--radius-sm`
- Cursor: pointer (opens definition tooltip on click)

---

### 7.13 ChatMessage (Q&A View)

Used in the document Q&A feature (NotebookLM-style).

**User message:**
- Background: `--color-accent-primary`
- Text: white, `--text-base`
- Border-radius: `--radius-md` with bottom-right: `4px`
- Max-width: 75%, aligned right
- Padding: `--space-3 --space-4`

**AI response:**
- Background: `--color-bg-elevated`
- Text: `--color-text-primary`, `--text-base`
- Border-radius: `--radius-md` with bottom-left: `4px`
- Max-width: 85%, aligned left
- Padding: `--space-3 --space-4`
- Source citation chip: `--text-xs`, `--color-accent-primary`, background `--color-accent-glow`, border-radius `--radius-sm`

---

### 7.14 SkeletonLoader

Used while AI is processing content.

**Specs:**
- Background: `--color-bg-subtle`
- Border-radius: `--radius-sm`
- Animation: shimmer, `1500ms linear infinite`
- Shimmer color: `rgba(255,255,255,0.04)` sweep

---

### 7.15 EmptyState

When no documents are uploaded or no results found.

**Specs:**
- Container: centered, padding `--space-16` vertical
- Icon: 48px, `--color-text-muted`
- Heading: `--text-lg`, weight 600, `--color-text-secondary`
- Sub-text: `--text-base`, `--color-text-muted`
- CTA button: Primary style

---

### 7.16 Toast / Notification

**Specs:**
- Background: `--color-bg-elevated`
- Border: `--border-default`
- Border-radius: `--radius-md`
- Padding: `--space-3 --space-4`
- Font: `--text-sm`, `--color-text-primary`
- Left accent bar: 3px, color matches semantic status
- Position: fixed, bottom-right, z-index 500
- Width: 320px max
- Icon + text + optional dismiss `×`

---

## 8. Layout System

### 8.1 Page Structure

```
┌──────────────────────────────────────────────────────┐
│                   NAVBAR (60px)                      │
├──────────┬───────────────────────────────────────────┤
│          │                                           │
│ SIDEBAR  │           MAIN CONTENT AREA              │
│ (260px)  │                                           │
│          │                                           │
└──────────┴───────────────────────────────────────────┘
```

- Content max-width: `1200px`, centered
- Main content padding: `--space-8` on desktop, `--space-4` on mobile

### 8.2 Grid

- Desktop: 12-column grid, 24px gutters
- Tablet: 8-column grid, 16px gutters
- Mobile: 4-column grid, 16px gutters, no sidebar

---

## 9. Screen Specifications

### S1 — Dashboard / Home

**Layout:** Navbar + Sidebar (desktop) + main content area

**Page Header:**
- Heading: "My Documents", `--text-xl`, weight 700
- Sub-line: document count + last activity, `--text-sm`, `--color-text-secondary`

**Action Bar (below header):**
- Left: `[ + Upload New ]` Primary button, `[ + Add URL ]` Secondary button
- Right: view toggle (grid / list), sort dropdown

**Upload Drop Zone:** Full-width at top, collapses once documents exist (shows compact version)

**Document Grid:**
- UploadCards in a 2-column grid on desktop, 1-column on mobile
- Gap: `--space-4`
- Empty state: EmptyState component with upload CTA

**Recent Activity Sidebar Section:** Last 5 processed documents with ProcessingBadge

---

### S2 — Summary View

**Layout:** Single-column, max-width 760px, centered, Navbar at top

**Back button:** ← Documents (Secondary ghost), top, `--space-6` margin-bottom

**Document metadata row:** ContentTypeTag + file name + timestamp

**Summary Length Selector:** Short | Medium | Detailed pill group, center-aligned, `--space-6` margin-bottom

**SummaryOutputCard:** Full width, prose content with KeyConceptPills highlighted inline

**Action Bar (below summary):**
- `[ 📋 Copy Summary ]` `[ ⬇ Download ]` `[ 🎞 Generate Slides ]` Secondary buttons in a row

**Key Concepts Panel:** Below summary — horizontal scroll row of KeyConceptPills, clickable

**Divider:** 1px solid `--color-border`, margin `--space-6` vertical

**Flashcards Section:** Heading "Flashcards" + horizontal card carousel

**Practice Questions Section:** Heading "Practice Questions" + PracticeQuestion stack

---

### S3 — Q&A Chat View (NotebookLM-style)

**Layout:** Two-pane on desktop — left: document panel (320px), right: chat panel (fills remaining)

**Document Panel (left):**
- Lists all uploaded sources with ContentTypeTags
- Active source highlighted with accent background
- "Add source" button at bottom

**Chat Panel (right):**
- Header: "Ask anything about your materials", `--text-lg`, weight 600
- Message list: ChatMessage components, scrollable
- Input area (fixed bottom): multiline InputField + Send icon button
- Source citation chips appear inline in AI responses

**Empty state:** Icon + "Upload documents and ask questions to get started"

---

### S4 — Presentation Slide Generator

**Layout:** Navbar + main content, two-column split

**Left Panel (controls, 360px):**
- Heading: "Generate Slides"
- Source selector: checkboxes to pick which documents to include
- Slide count selector: 5 / 10 / 15 / Custom
- Style selector: Academic | Professional | Minimal
- `[ ✨ Generate Slides ]` Primary button, full width

**Right Panel (preview):**
- Slide preview area with mock slide frames
- Navigation: Previous / Next slide arrows
- `[ ⬇ Download PPTX ]` Primary button, top-right of panel
- Processing state: SkeletonLoader with "Generating slides…" label

---

### S5 — Upload & Processing View

**Layout:** Navbar + centered content, max-width 640px

**Upload Zone:** Full-size UploadDropZone component

**URL Input Row:**
- Label: "Or paste a link"
- Input field: 100% width, placeholder "https://youtube.com/... or any webpage"
- `[ Analyze Link ]` Primary button inline

**Supported Formats Badge Row:**
- Small ContentTypeTag badges for all supported types
- `--text-xs`, muted color, informational only

**Active Uploads List:**
- Each uploading file: name + progress bar + cancel button
- Progress bar: `--color-accent-primary` fill, `--color-bg-subtle` track, height 4px, `--radius-full`

---

### S6 — Onboarding / Landing Page

**Layout:** Full-width, no sidebar

**Hero Section:**
- Heading: "Turn any lecture into structured knowledge.", `--text-3xl`, weight 700, centered
- Sub-heading: "Upload notes, videos, or links. Get summaries, flashcards, and practice questions instantly.", `--text-lg`, `--color-text-secondary`, centered
- CTA: `[ Get Started — It's Free ]` Primary button, centered, `margin-top --space-8`
- Margin-bottom: `--space-12`

**Feature Cards (3 across on desktop, stacked on mobile):**
- Background: `--color-bg-surface`
- Border: `--border-default`
- Border-radius: `--radius-lg`
- Padding: `--space-8`
- Icon: 32px, `--color-accent-primary`
- Title: `--text-lg`, weight 700
- Description: `--text-base`, `--color-text-secondary`

---

### S7 — Login / Account Screen

**Layout:** Full-page centered, no navbar, no sidebar

**Background:** `--color-bg-base` with subtle radial gradient:
`radial-gradient(ellipse at 50% 0%, rgba(79,110,247,0.08) 0%, transparent 60%)`

**Login Card:**
- Width: 400px on desktop, full-width (minus 32px) on mobile
- Background: `--color-bg-surface`
- Border: `--border-default`
- Border-radius: `--radius-lg`
- Padding: `--space-10`
- Box-shadow: `--shadow-md`

**Card Contents:**
- Logo: 📚 + "Lecture Summarizer", centered, `--text-xl`, weight 700, `margin-bottom --space-8`
- Email input (Section 7.5)
- Password input (same styles, with show/hide toggle)
- `[ Sign In ]` Primary button, full width, `margin-top --space-4`
- "Or continue with Google" — Secondary button, full width, `margin-top --space-2`
- Forgot password link: `--text-sm`, `--color-accent-primary`, centered, below buttons
- Error state: red border on input + error message `--color-danger`, `--text-sm`, below input

---

## 10. Animation & Motion

| Interaction | Animation | Duration | Easing |
|---|---|---|---|
| Card hover | background + border color | 150ms | ease |
| Modal open | fade-in + scale(0.95→1.0) | 150ms | ease-out |
| Modal close | fade-out + scale(1.0→0.95) | 100ms | ease-in |
| Toast appear | slide-in from right | 250ms | ease-out |
| Toast dismiss | fade-out | 200ms | ease-in |
| Page transition | fade-in | 200ms | ease |
| Skeleton shimmer | linear loop | 1500ms | linear |
| Filter chip select | background + color | 100ms | ease |
| Button hover | translate-y(-1px) | 100ms | ease |
| Flashcard flip | rotateY(180deg) | 500ms | ease-in-out |
| Upload progress | width expand | continuous | linear |
| Processing pulse | opacity 0.4↔1.0 | 800ms | ease-in-out |

**Rule:** No animation should exceed 500ms (flashcard flip is the one exception). Do not animate layout properties (width, height). Prefer `opacity` and `transform`.

---

## 11. Iconography

Use **Lucide Icons** throughout (`lucide-react` or SVG imports).

| UI Element | Icon Name |
|---|---|
| Upload / add file | `Upload` |
| Document / notes | `FileText` |
| PDF | `File` |
| Scanned / OCR | `ScanLine` |
| YouTube | `Youtube` |
| Website / URL | `Globe` |
| Summary / generate | `Sparkles` |
| Flashcard | `Layers` |
| Practice question | `HelpCircle` |
| Key concept | `Star` |
| Q&A / chat | `MessageCircle` |
| Presentation / slides | `Presentation` |
| Download | `Download` |
| Copy | `Copy` |
| Search | `Search` |
| Back navigation | `ArrowLeft` |
| Close / dismiss | `X` |
| Menu (mobile) | `Menu` |
| Processing | `Loader2` (spin animation) |
| Ready / success | `CheckCircle` |
| Error | `AlertCircle` |
| Warning | `AlertTriangle` |
| Next / forward | `ChevronRight` |
| Previous / back | `ChevronLeft` |
| User / account | `User` |
| Logout | `LogOut` |
| Settings | `Settings` |
| Bookmark / save | `Bookmark` |
| Share | `Share2` |
| Expand | `Maximize2` |

**Icon sizes:**
- Inline with text: 16px
- Standalone icon button: 18px
- Empty state illustration: 48px
- Feature card icon: 32px
- Navigation: 20px

**Icon color:** Default `--color-text-secondary`. Active/accent states use `--color-accent-primary`.

---

## 12. Responsive Rules

| Rule | Behavior |
|---|---|
| Sidebar | Visible on desktop (≥1024px). Hidden on mobile. Replaced by bottom tab bar. |
| Upload card grid | 1 column on mobile. 1 column on tablet. 2 columns on desktop. |
| Navbar links | Full labels on desktop. Icon-only with bottom tab bar on mobile. |
| Feature cards | Side by side (3-up) on desktop. Stacked on mobile. |
| Q&A view | Two-pane on desktop. Document panel collapses to top drawer on mobile. |
| Slide generator | Two-column on desktop. Stacked (controls above preview) on mobile. |
| Login card | Fixed 400px on desktop. Full-width (−32px) on mobile. |
| Summary view | 760px max-width, full-width on mobile with 16px padding. |

---

## 13. CSS Custom Properties — Full Reference

Paste this into the `:root` of your stylesheet:

```css
:root {

  /* Backgrounds */
  --color-bg-base: #0D0F14;
  --color-bg-surface: #161A22;
  --color-bg-elevated: #1E2430;
  --color-bg-subtle: #252C3A;

  /* Borders */
  --color-border: #2E3748;
  --color-border-focus: #4F6EF7;

  /* Text */
  --color-text-primary: #F0F2F8;
  --color-text-secondary: #9AA3B8;
  --color-text-muted: #5C6478;
  --color-text-inverse: #0D0F14;

  /* Accent */
  --color-accent-primary: #4F6EF7;
  --color-accent-primary-hover: #3A5AE8;
  --color-accent-secondary: #9B5CF6;
  --color-accent-warm: #F59E0B;
  --color-accent-glow: rgba(79, 110, 247, 0.15);

  /* Semantic */
  --color-success: #22C55E;
  --color-success-bg: rgba(34, 197, 94, 0.1);
  --color-warning: #F59E0B;
  --color-warning-bg: rgba(245, 158, 11, 0.1);
  --color-danger: #EF4444;
  --color-danger-bg: rgba(239, 68, 68, 0.1);
  --color-info: #38BDF8;
  --color-info-bg: rgba(56, 189, 248, 0.1);

  /* Typography */
  --font-sans: 'Inter', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --font-serif: 'Georgia', serif;

  /* Spacing */
  --space-1: 4px;   --space-2: 8px;   --space-3: 12px;
  --space-4: 16px;  --space-5: 20px;  --space-6: 24px;
  --space-8: 32px;  --space-10: 40px; --space-12: 48px;
  --space-16: 64px;

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);
  --shadow-accent: 0 0 0 3px rgba(79, 110, 247, 0.15);

  /* Borders */
  --border-default: 1px solid var(--color-border);
  --border-accent: 1px solid var(--color-accent-primary);
  --border-dashed: 2px dashed var(--color-border);

  /* Typography Scale */
  --text-xs: 11px;
  --text-sm: 13px;
  --text-base: 15px;
  --text-md: 17px;
  --text-lg: 20px;
  --text-xl: 24px;
  --text-2xl: 30px;
  --text-3xl: 38px;

}
```

---

*Design System v1.0 — Lecture Note Summarizer*
*Screens: S1 Dashboard · S2 Summary · S3 Q&A Chat · S4 Slide Generator · S5 Upload · S6 Landing · S7 Login*
*Based on CurrentAI Design System by Antigravity Agent*
