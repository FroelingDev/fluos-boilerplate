# Local Agent Knowledge Index

## Available local skills
- [`remotion-best-practices`](skills/remotion-best-practices/SKILL.md): Generic Remotion implementation patterns and domain techniques.
- [`project-context`](skills/project-context/SKILL.md): Repository-specific structure, edit boundaries, file routing, and validation workflow.

## When to use remotion-best-practices vs project-context
- Use [`project-context`](skills/project-context/SKILL.md) first for any task in this repository.
- Use [`remotion-best-practices`](skills/remotion-best-practices/SKILL.md) when implementing animation/composition/media patterns.
- Use both for most non-trivial video-editing tasks: project-context for file targeting, remotion-best-practices for implementation quality.

## Decision tree
- Need to answer "where is X?", "which file should change?", or "what are repo guardrails?": use [`project-context`](skills/project-context/SKILL.md).
- Need to implement style, timing, sequencing, transitions, captions, audio handling, or rendering patterns: use [`remotion-best-practices`](skills/remotion-best-practices/SKILL.md).

## Fast links
- [`skills/project-context/SKILL.md`](skills/project-context/SKILL.md)
- [`skills/remotion-best-practices/SKILL.md`](skills/remotion-best-practices/SKILL.md)
