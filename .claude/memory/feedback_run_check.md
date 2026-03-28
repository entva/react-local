---
name: Always run npm run check after edits
description: User expects npm run check to be run to verify fixes, not just TypeScript compilation
type: feedback
---

Always run `npm run check` after making code changes to verify lint, typecheck, and tests all pass.

**Why:** User was frustrated that a fix was presented without verifying it actually worked end-to-end.

**How to apply:** After every substantive code edit in this repo, run `npm run check` before reporting done.
