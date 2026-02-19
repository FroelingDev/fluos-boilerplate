# Agent Entry Point

## Purpose of this repository
This repository is the Fluos boilerplate sandbox. AI agents modify this codebase to change the generated Remotion video output.

## Read this first
1. Load [`.agents/README.md`](.agents/README.md).
2. Load [`.agents/skills/project-context/SKILL.md`](.agents/skills/project-context/SKILL.md) for repository-specific routing.
3. If the task requires Remotion techniques, load [`.agents/skills/remotion-best-practices/SKILL.md`](.agents/skills/remotion-best-practices/SKILL.md).
4. Apply edits only in canonical targets unless the user explicitly requests broader changes.
5. Run the validation checklist before finalizing.

## Canonical edit targets
| File | Primary ownership |
| --- | --- |
| `src/remotion/MyComp/Main.tsx` | Visual design, animation timing, layout, scene behavior |
| `types/constants.ts` | Composition schema, default props, composition ID, dimensions, fps, duration |
| `src/remotion/Root.tsx` | Composition registration and binding constants to Remotion |
| `src/app/page.tsx` | In-browser preview player configuration and input props wiring |

## Project map
```text
.
├── src/app/
│   ├── layout.tsx                  # Next.js shell and metadata
│   └── page.tsx                    # Remotion Player preview page
├── src/remotion/
│   ├── Root.tsx                    # Composition registration
│   └── MyComp/
│       ├── Main.tsx                # Main composition implementation
│       ├── FluosLogo.tsx           # Logo scene element
│       └── Rings.tsx               # Background/shape element
├── types/constants.ts              # Shared composition contract and defaults
├── remotion.config.ts              # Remotion CLI config
├── next.config.js                  # Next.js config for sandbox root
└── .agents/skills/                 # Local agent skills and references
```

## Quick routing for common requests
| User request | Edit first |
| --- | --- |
| "Change title/tagline text" | `types/constants.ts`, then `src/remotion/MyComp/Main.tsx` if style/placement changes |
| "Adjust animation speed/timing" | `src/remotion/MyComp/Main.tsx` |
| "Change fps/duration/resolution" | `types/constants.ts`, verify propagation in `src/remotion/Root.tsx` and `src/app/page.tsx` |
| "Add/remove composition props" | `types/constants.ts`, `src/remotion/MyComp/Main.tsx`, `src/remotion/Root.tsx`, `src/app/page.tsx` |
| "Preview/player behavior changes" | `src/app/page.tsx` |

## Non-goals / avoid touching unless requested
- `src/components/*` is template carryover and is not wired into the current homepage preview flow.
- Build/config files (`package.json`, `next.config.js`, `remotion.config.ts`, lint config) should only be changed when the user explicitly asks for tooling or infra changes.
- Do not introduce additional composition IDs unless explicitly requested.

## Validation checklist
Run after edits:

```bash
bun run lint
bun run build
```

Sanity preview path:

```bash
bun run dev
```

Then confirm `http://localhost:3000` plays the expected composition with expected props.

## Where skill docs live
- Local skill index: [`.agents/README.md`](.agents/README.md)
- Project-specific context skill: [`.agents/skills/project-context/SKILL.md`](.agents/skills/project-context/SKILL.md)
- Generic Remotion domain skill: [`.agents/skills/remotion-best-practices/SKILL.md`](.agents/skills/remotion-best-practices/SKILL.md)
