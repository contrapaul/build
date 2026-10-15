# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

---

# Project rules: build.contrapaul.com

A website that is both a 35 minute conference talk and a guide the audience
keeps. Read `PLAN.md` (the brief, quoted verbatim at the top, and the plan)
and `HANDOFF.md` (where things stand) before changing anything.

Talk: Saturday 17 October 2026, Shenzhen, international audience, English
only. Presented from a laptop on a 16:9 projector, stepped with a clicker.

## Rules that are easy to break

- **Nothing is fetched from another host, ever.** Fonts, scripts, video and
  QR codes are committed to this repo. Why: the talk is in Shenzhen. Anything
  blocked in China, or on the venue wifi, stops the page in front of the room.
- **No em dash characters.** Not in the UI, not in comments, not in docs,
  not in commit messages. Use a comma, a full stop or a colon. Why: Paul reads
  them as a tell of AI writing.
- **Legible from the back of the room.** Every Talk frame is judged on a
  projector at a distance. Nothing important depends on hover.
- **No AI-generated images, except labelled examples of slop.** Media is
  screen recordings of real work, Paul's drawings and photos, or diagrams
  built in code. The slop poster on T25 is the one exception and is labelled
  as AI-generated. Why: the talk argues for this rule.
- **Every technical word is a glossary link** on its first use in a frame,
  and every glossary entry has a `short` and a `full` definition. Why: the
  audience did not come to learn jargon.
- **The clicker must work.** Page Down and Page Up step frames exactly like
  the arrow keys. Never break keyboard navigation to add a feature.
- **This repo is public.** No student data, no school documents, nothing
  copyrighted that is not ours to publish. Every file here is also served
  on the live site.
- **Disclose AI use.** The footer says the site was built with an AI coding
  agent.

## Keep HANDOFF.md current

After every change that works, add a dated entry to the top of the log in
HANDOFF.md: what was asked, what was built, what was decided and why, and
what is still unverified. Update the status section if it changed. Do this
before saying you are finished.

## Working on it

- Plain static files, no build step. Cloudflare Pages serves the repo root,
  deployed by pushing to `main`.
- Serve locally with `python3 -m http.server 8000` (fetch does not work over
  `file://`), then open http://localhost:8000.
- Reuse before writing: the reuse map in PLAN.md names the existing code for
  the tab router, glossary, motion, key handling and QR codes.
