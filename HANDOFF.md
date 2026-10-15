# Handoff

Running record of what is built, what was decided, and what the next session
should know. Newest log entry at the top. The plan is `PLAN.md`; the rules are
`CLAUDE.md`.

## Status

P1 (shell) and P2 (glossary) are built and checked locally; the Talk, Start
and Projects tabs carry first-draft content from PLAN.md. Not yet live:
Cloudflare Pages is not connected.

Talk: Saturday 17 October 2026, Shenzhen.

## Open items

- [ ] Paul: connect the repo to Cloudflare Pages and add the custom domain
      build.contrapaul.com. Screenshot every screen for frame T21.
- [ ] Paul: open `dev/keys.html`, press every clicker button, and report any
      row marked "not mapped".
- [ ] Paul: choose the three resources for T5 to T7, then trim the Projects
      tab, which currently lists every candidate from PLAN.md Part 4.
- [ ] Paul: T2 top three words (typed live, or leave generic), T28 story,
      T25b example and screenshot, T18 before-and-after pairs.
- [ ] Media still to record (every dashed "TO ADD" box on the page): T4
      montage, T5 to T7 loops, T17 first-build recording, T25b screenshot.
- [ ] Paul: read the 21 new glossary definitions (the entries without a
      "from codewithai" comment in js/data/glossary.js).
- [ ] T19 lists this repo's commits by hand: refresh it before the talk.
- [ ] P6 polish if time: frame transitions, video loops.

## Gotchas that have already bitten

- **Frames must be `overflow: clip`, not `hidden`.** Each frame's glow
  (`::before`, inset -20%) makes it scrollable, and focusing a glossary link
  scrolled frame 10 up by 167px inside itself. `clip` cannot scroll.
- **`history.scrollRestoration = 'manual'`.** Otherwise a reload on
  `#/talk/10` jumps to frame 10 and the browser then restores the old scroll
  position on top of it.
- **Rapid clicker presses.** While a scroll is animating, the next press
  counts from the frame being scrolled to, not from where the scroll has got
  to. Without that, three quick presses moved one frame.
- **Testing in a hidden browser pane.** `requestAnimationFrame` is paused
  when the pane is hidden, so scrolling never finishes and every timing test
  fails. Replace it with a `setTimeout` shim in the console before testing.
- **The `computer` tool's Page_Down sends an empty key.** Test Page Down by
  dispatching a KeyboardEvent instead.

## Log

### 2026-10-15: P1 shell and P2 glossary

- **Asked:** start the build.
- **Built:**
  - `index.html`: four tabs. The Talk tab has 32 frames, T1 to T31 plus
    T25b, numbered on screen, with first-draft text from PLAN.md Part 2.
    The Start tab is a 10-frame guide with copyable BRIEF, HANDOFF and rules
    templates. The Projects tab lists every candidate from PLAN.md Part 4.
    The Glossary tab is rendered from data.
  - `js/deck.js`: router (`#/talk/12`), keys (arrows, Page Up/Down, Space,
    Home/End, 1 to 4, B and . to blank, F and F5 for full screen with no
    reload), eased scrolling, a frame rail, a progress bar, reveal-once
    motion, word-by-word headlines, drift between frames, and QR codes.
  - `js/glossary.js` and `js/data/glossary.js`: 52 terms, 31 copied from
    codewithai (English only) and 21 new. Hover shows a card, click goes to
    the entry, and Back returns to the frame. On touch, the first tap shows
    the card and the second follows the link.
  - `js/theme.js`: dark by default; on screens up to 760px it follows the
    phone's setting, with a toggle.
  - T25: the slop poster with four rings drawn in code: the slogans in
    threes, "in today's fast-paced world", the em dash in warning sign 7,
    and the QR code. Ring positions checked against the image.
  - T13 shows real trivia commits; T16 quotes the real brief; T19 and T20
    show this repo's real commit and push output.
  - `dev/keys.html`: a clicker key tester.
- **Decided:**
  - Fonts: Barlow, Barlow Condensed and JetBrains Mono (SIL Open Font
    License, license files beside them). Not Bespoke Slab, whose license
    for a public repo is unverified.
  - No "learn more" links in the glossary, because Wikipedia does not load
    in Shenzhen.
- **Verified** in the preview at 1280x720, 1600x900 and 1920x1080:
  - every Talk frame is exactly one screen
  - all keys step correctly, including rapid presses and tall Start frames
  - deep links survive a reload
  - glossary hover, click and Back all work
  - phone layout and light theme work, with no sideways scroll
  - no console errors, no em dashes, nothing fetched from another host
- **Unverified:**
  - Firefox, which Paul presents from. Checked in Chromium only.
  - The real clicker.
  - A real projector.
  - The live site.

### 2026-10-15: repo created (P0)

- **Asked:** create the build repo.
- **Built:** `CLAUDE.md` is the general rules file shared by Paul's other
  repos, plus project rules for this site. `PLAN.md` is the talk and site
  plan, moved here from `GitHub/presentation.md` so there is one copy.
  This file. An MIT `LICENSE` and a `README.md`.
- **Decided:**
  - Cloudflare Pages with no build step.
  - Dark by default, light on phones.
  - English only.
  - 35 minutes of talk, then 10 minutes of Q&A.
  - The repo is public from day one.
- **Unverified:** nothing deployed yet.
