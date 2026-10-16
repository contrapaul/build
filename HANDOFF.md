# Handoff

Running record of what is built, what was decided, and what the next session
should know. Newest log entry at the top. The plan is `PLAN.md`; the rules are
`CLAUDE.md`.

## Status

Live at build.contrapaul.com since 2026-10-16. Cloudflare's current Git flow
deploys it as a Worker with static assets: each push to `main` runs
`npx wrangler deploy` with no build command. `_headers` is honoured.
P1 and P2 are done, and the media is in. Paul is editing the text and will
make more text changes before any other major change.

Talk: Saturday 17 October 2026, Shenzhen.

## Open items

- [ ] Paul: test the clicker on `dev/keys.html` and report any row marked
      "not mapped".
- [ ] Paul: choose the three resources for T5 to T7, then trim the Projects
      tab.
- [ ] Paul: T2 top three words, T28 story, T25b example and screenshot.
- [ ] Still a dashed box: T4 montage. `~/Downloads/edu-showreel.mp4` (20s,
      30 MB, with audio) might suit it, but it is over the 25 MiB file
      limit and would need re-encoding.
- [ ] Refresh T19's commit list before the talk.
- [ ] Rehearse in Firefox on the real projector, with the clicker.

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
- **No ffmpeg on this Mac.** Videos were cut with an AVFoundation Swift
  script: it retimes by a speed factor, drops frames to a steady 30 fps,
  scales to 1280 wide and encodes H.264 at 2 Mbps with no audio. Keep every
  file under Cloudflare's 25 MiB per-file limit.

## Log

### 2026-10-16: media in, marking tools out

- **Asked:**
  - place Paul's new screenshots and recordings
  - remove the marking tools entirely ("not very good", soon to be removed
    from edu)
- **Built:**
  - **Videos:**
    - `media/qwen-pi.mp4`: Qwen3.8 27B in the Pi harness, 2x speed, 44s,
      10 MB. On T12, beside Paul's list of harnesses.
    - `media/first-build.mp4`: the first build session at 30x speed, 41s,
      8.6 MB. On T17.
    - Clips load only when their frame is current or next door, play while
      it is current, and pause otherwise.
  - **Images:**
    - T18: Paul editing these frames in VS Code (`vscodebuildpage.webp`).
    - T21: the six Cloudflare screens as a self-advancing slideshow with
      numbered captions.
    - Start step 05: the same six screens as a numbered gallery.
  - **Marking tools:** the "For marking and admin" group is gone from the
    Projects tab and from PLAN.md. The Start tab still suggests "a helper
    for writing report comments" as a generic idea; it links to nothing.
- **Decided:**
  - T21 and Start step 05 described the old Pages route ("Pages, Connect to
    Git, leave build settings blank"). Paul's screenshots show the current
    Workers route, so the T21 step list became captions of the screens and
    the Start steps were reworded to match. That is the only text changed
    this session apart from layout.
  - T12's headline went from h1 to h2 size, and its names render smaller,
    so the clip fits beside them.
  - Punctuation straight after a glossary link no longer starts a line in
    the word-by-word headlines. Seen on T12: ", in any harness".
  - Paul's uncommitted Glossary heading edit was committed separately under
    his name (d5e79b7).
- **Verified:**
  - every Talk frame fits one screen at 1280x720, 1600x900 and 1920x1080
  - each clip plays and pauses with its frame
  - the slideshow advances, and stops off its frame
  - switching tabs pauses everything
  - all gallery images load
  - no console errors, no em dashes
- **Unverified:**
  - Firefox playback of the new clips. They are H.264 in MP4, which
    Firefox supports.

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
