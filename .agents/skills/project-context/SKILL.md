---
name: project-context
description: Boilerplate sandbox structure, edit boundaries, and workflow for AI edits
metadata:
  tags: fluos, nextjs, remotion, project-map, agent-guide
---

## When to use

Use this skill by default for any modification in this repository. It defines where to edit, what to avoid, and what to validate.

## Architecture overview

- Next.js App Router hosts the preview app (`src/app/*`).
- Remotion compositions are registered in `src/remotion/Root.tsx`.
- The active composition implementation is `src/remotion/MyComp/Main.tsx`.
- The in-browser preview uses `@remotion/player` in `src/app/page.tsx`.
- Shared composition contract is centralized in `types/constants.ts` using Zod.

## File ownership matrix

| User intent | Edit file(s) |
| --- | --- |
| Change visuals, motion, scene structure | `src/remotion/MyComp/Main.tsx` |
| Change default title/tagline values | `types/constants.ts` |
| Add/remove/rename composition props | `types/constants.ts`, `src/remotion/MyComp/Main.tsx`, `src/remotion/Root.tsx`, `src/app/page.tsx` |
| Change fps/duration/width/height | `types/constants.ts` and verify usage in `src/remotion/Root.tsx` + `src/app/page.tsx` |
| Change preview behavior (controls/autoplay/loop/layout) | `src/app/page.tsx` |
| Register additional compositions | `src/remotion/Root.tsx` (only when explicitly requested) |

## Current composition contract

- Composition ID: `MyComp` (`COMP_NAME` in `types/constants.ts`).
- Schema: `CompositionProps = { title: string; tagline: string }` in `types/constants.ts`.
- Default props source: `defaultMyCompProps` in `types/constants.ts`.
- Schema consumption:
  - `src/remotion/MyComp/Main.tsx` (typed component props).
  - `src/app/page.tsx` (preview input props).
  - `src/remotion/Root.tsx` (Remotion composition defaultProps and dimensions/fps/duration).

## Safe edit rules

- Keep `types/constants.ts`, `src/remotion/Root.tsx`, and `src/app/page.tsx` consistent whenever schema or video config changes.
- Do not introduce a new composition ID unless the request explicitly requires multiple compositions.
- Keep preview player values aligned with composition constants.
- Treat config/tooling files as out of scope unless the user asks for infra/tooling changes.

## Known caveats

- `src/components/*` exists from template scaffolding and is currently not wired into `src/app/page.tsx`.
- Prefer canonical edit targets over template carryover files unless a request explicitly targets those files.

## Required checks after edits

```bash
bun run lint
bun run build
```

Sanity preview:

```bash
bun run dev
```

Confirm `http://localhost:3000` renders and plays the expected composition.

## Complementary skill

For Remotion technique patterns (timing, transitions, media, subtitles, audio, etc.), load [`../remotion-best-practices/SKILL.md`](../remotion-best-practices/SKILL.md).
