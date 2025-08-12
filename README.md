
# PolishPaste Canvas (Side-by-side, resizable)

A minimal, classy **Carbon-style** code card generator with a **ChatGPT-like canvas layout**, resizable panels, icon toolbar, and optional Supabase sharing.

## Quick start

```bash
pnpm i   # or npm i / yarn
pnpm dev
```

Open http://localhost:3000

## Features
- Left nav rail (Card / Design) + dark toggle
- Resizable panels (drag the vertical gutter)
- Icon actions (top-right): Copy, Download, Export PNG, Save & Copy Link
- Theme: One Dark-like + Fira Code (for code)
- Optional Supabase save + /d/[id] viewer

## Env
Copy `.env.local.example` to `.env.local` and fill values to enable cloud save.

## Export
PNG export uses `html-to-image`. Install is included in `package.json`.
# polishposte
