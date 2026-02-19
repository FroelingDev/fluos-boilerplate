# Fluos Boilerplate Sandbox

This repository is the baseline project that runs inside a Daytona sandbox for Fluos AI.

Users prompt Fluos AI, and the AI updates this codebase to change the video output.

## What this project includes

- Next.js App Router app (`next@16`)
- Remotion composition + in-browser preview player
- Type-safe props with `zod`
- Tailwind CSS v4 styling
- Bun-based workflow

## Quick start

```bash
bun install
bun run dev
```

Open `http://localhost:3000`.

The homepage renders a live Remotion player for the `MyComp` composition using the default props in `types/constants.ts`.

## Commands

```bash
# Start Next.js dev server
bun run dev

# Build production app
bun run build

# Start production server
bun run start

# Lint project
bun run lint

# Open Remotion Studio
bun run remotion

# Render composition locally from CLI
bun run render
```

## Project structure

```text
src/app/
  page.tsx                   # Frontend preview page
  layout.tsx                 # App shell and metadata

src/remotion/
  Root.tsx                   # Registers compositions
  MyComp/Main.tsx            # Main composition visuals and animation

types/
  constants.ts               # Composition id, dimensions, fps, default props
```

## AI editing guide (for Fluos)

When a user asks to change the video, these are the primary files to edit:

- `src/remotion/MyComp/Main.tsx`: Visual design, timing, animation, text layout.
- `types/constants.ts`: Composition ID, default props, width/height/fps/duration.
- `src/remotion/Root.tsx`: Composition registration.
- `src/app/page.tsx`: Preview behavior and player settings.

## For AI agents

Use these docs as the canonical routing layer before editing:

- [`AGENTS.md`](AGENTS.md): Repo entrypoint, edit boundaries, validation checklist.
- [`.agents/README.md`](.agents/README.md): Local skill index and decision routing.

## Notes for sandbox usage

- Turbopack root is pinned in `next.config.js` to this project directory.
- This repo is intentionally small and editable so Fluos AI can modify it quickly from user prompts.
