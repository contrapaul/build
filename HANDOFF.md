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
- [ ] Paul: glance at the three new clips (taskanalysis, centralmiddlezhong,
      edusite). The OCR checks found no student data, but they have not been
      watched.
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

### 2026-10-17: the five Talk resources

- **Asked:** taskanalysis, centralmiddlezhong and edusite get the same
  treatment as easyfea. Order in the Talk: taskanalysis first,
  centralmiddlezhong second, easyfea third, infinitefoodtruck fourth (clip
  reused), edusite fifth.
- **Built:**
  - `media/taskanalysis.mp4` (11.1 MB, 85s) and `media/edusite.mp4`
    (20.2 MB, 78s): re-encoded with the working export-session recipe, both
    under the 25 MiB cap, H.264, no audio. The `.mov` files are gitignored.
  - Talk tab: T5 is Task Analysis, T7b is Infinite Food Truck (reuses
    `media/infinitefoodtruck.mp4`), T7c is the edu site. All three are
    showcase frames like EasyFEA, kickers 01, 04 and 05.
  - T6 is Central Middlezhong: name, one line and address are in, but the
    frame keeps a dashed box because the recording never arrived. It
    becomes a showcase frame when the clip lands.
  - PLAN.md: the T5 to T7c section now lists all five slots and their
    state; the checklists follow.
- **Media check:** OCR at 25, 50 and 75 percent of both clips. Task
  Analysis shows the example scenario (coffee shop, Didi), edusite shows
  curriculum pages and the quiz builder. No names, no student work.
- **Blocked:** the centralmiddlezhong recording is not in `media/` or
  anywhere else on the Mac that I could find. Paul to drop it in. (It
  arrived later; see the next entry.)
- **Verified:** file sizes, codec and durations; OCR of both clips; no em
  dashes; kickers 01 to 05 are in order.
- **Unverified:** the three new frames in a browser, and Firefox.

### 2026-10-17: Central Middlezhong lands, edusite joins Projects

- **Asked:** the centralmiddlezhong recording has arrived. edusite also gets
  a Projects tab feature; taskanalysis and centralmiddlezhong do not.
- **Built:**
  - `media/centralmiddlezhong.mp4`: the 131 MB `.mov` re-encoded to 20.3 MB,
    70.8s, under the 25 MiB cap, H.264, no audio.
  - T6 is now a full showcase frame: clip, name, one line, address, QR.
    All five Talk resources are done.
  - Projects tab: the edu site is Project 12 of 12. All eleven existing
    kickers renumbered to "of 12". Task Analysis and Central Middlezhong
    stay Talk-only, as asked.
  - PLAN.md: T6 marked done, the resource checklists ticked, the edu site
    ticked in the Part 4 candidates.
- **Media check:** OCR at 25, 50 and 75 percent. Game content only: the
  footbridge project, Mayor Chen, Councillor Zhang, materials and budget
  decisions. Fictional characters, no student names or work.
- **Verified:** file size, codec, duration; OCR of the clip; kickers 01 to
  12 all say "of 12"; no em dashes.
- **Unverified:** T6 and Project 12 in a browser, and Firefox.

### 2026-10-17: EasyFEA on both pages

- **Asked:** EasyFEA joins the site. A showcase slide on the Projects tab, and
  a showcase frame in the Talk, as the third of five resources. Four more
  resources come later.
- **Built:**
  - `media/easyfea.mp4`: the 62 MB `.mov` re-encoded to 19.2 MB, 1280x716,
    H.264, 56.65s, no audio, under the 25 MiB cap. The `.mov` is gitignored
    like the rest.
  - Projects tab: EasyFEA is Project 11 of 11, same showcase slide as the
    other ten. All ten existing kickers renumbered to "of 11".
  - Talk tab: EasyFEA takes the third resource slot (T7) with the reusable
    showcase layout, clip left, name, one line, address and QR right. Two
    new placeholder frames, T7b and T7c, make it five resources. T8 and
    after keep their numbers; on-screen frame numbers for everything after
    T7 shift by two, so deep links past frame 7 move.
  - The Talk one-liner is written for the room (what students use it for),
    not the site's meta description, which the Projects slide keeps.
  - PLAN.md: the T5 to T7 section is now T5 to T7c with the five slots
    listed; the cut list, timing table and checklists follow. EasyFEA is
    ticked in the Part 4 candidates.
- **Media check:** this model cannot view images, so the still check was
  done by OCR instead. Frames at 11s, 28s and 45s contain site content
  only: products, materials, results and challenges, all "NOT YET". No
  names, no student work. Paul should still glance at the clip.
- **Gotcha:** this sandbox's Swift SDK is a partial AVFoundation.
  `AVAssetWriterOutput`, `videoSettings` and `AVVideoBitRateKey` do not
  resolve, and `export()` is async only. The working recipe is
  `AVAssetExportSession` with `AVAssetExportPreset1280x720` and
  `fileLengthLimit` set to 20 MiB, top-level `await` on `export()`.
  No ffmpeg and `afconvert` is audio only.
- **Verified:** file size, codec and duration; OCR of three frames; no em
  dashes; the kickers all say "of 11".
- **Unverified:** the two new frames in a browser, the EasyFEA clip
  playing, and Firefox.

### 2026-10-17: T3 loses the numbers, gains the four verbs

- **Asked:** remove the stat numbers from T3, keep "Design Technology
  Teacher", and replace "Not a developer" with a creative line that says
  Paul is also a designer, a maker, a video creator and a tech person.
- **Built:**
  - New headline: "Design Technology Teacher. I design it. I make it. I
    film it. I fix it." Each verb is one role. The second sentence keeps
    the existing outline styling.
  - The three stats and their CSS (`.stats`, `.stat` in `css/frames.css`)
    are removed; nothing else used them.
  - PLAN.md T3 updated: the on-screen line, the say note, and the old
    "the numbers earn the next half hour" line, which no longer applies.
- **Decided:** verb beats over a job-title list. "Designer. Maker.
  Filmmaker. Tech person." reads like a CV; "I design it. I make it. I
    film it. I fix it." reads from the back of the room and the "it" is
    the website, which the whole talk is about. Paul may reword.
- **Verified:** no references to `.stats` or `.stat` remain. Paul should
  check the frame in a browser: the headline is now the only content, so
  the frame is sparser than before.

### 2026-10-17: Projects tab is showcase slides

- **Asked:**
  - replace the Projects tab's card style with slides like the Talk and
    Start tabs
  - one slide per recording, with name, address, brief details and a QR
    code
  - Paul will reuse the style for the Talk's showcase frames (T5 to T7)
- **Built:**
  - Ten showcase slides, one per recording in `media/`: AI in Education,
    Breadboard, Electronics Parts Catalog, Infinite Food Truck, Game
    Mechanics Catalog, Game Bench, Recommended Games, How Local AI Works,
    Auditorium Seating Planner and Tome of Secrets.
  - Each slide has the video playing large on the left. The right side has
    "Project NN of 10", the name, a one-line description, the address as a
    link, and a QR code.
  - On phones the slide stacks, and the QR code becomes an "Open" button.
  - The descriptions are taken from each site's own page description,
    trimmed.
  - Hues rotate through the palette slide by slide.
  - A final "More to explore" slide keeps the links without a video.
  - **Reusable markup:** documented at the top of the showcase block in
    `css/frames.css`. Copy one `<section class="frame showcase">` into the
    Talk tab.
- **Media:**
  - The `.mov` recordings (34 to 268 MB, 1.1 GB in all) were re-encoded to
    `.mp4`: full speed, 1280 wide, 1.5 Mbps, 4.5 to 14.7 MB each.
  - `media/*.mov` and `*.sb-*` are now gitignored. The originals stay on
    Paul's Mac only. Each is over Cloudflare's 25 MiB per-file limit and
    would break the deploy.
  - Stills from every recording were checked before publishing: site
    content only, and the seating planner shows grade blocks, no names.
- **Verified:**
  - all 12 Projects slides fit one screen at 1280x720, 1600x900 and
    1920x1080
  - only the current slide's video plays, the next preloads, and the rest
    never load
  - all 10 QR codes render
  - the phone layout works with no sideways scroll
- **Unverified:** Firefox. Rehearse there.

### 2026-10-16: T25 uses the rainbow goop advert

- **Asked:** replace the AI poster on T25 with `slop-goop.webp`.
- **Built:**
  - `media/slop-goop.webp`, copied from `edu/tools/slop/img/`. The old
    `spot-ai-slop.webp` is removed.
  - Four new rings, placed by hand and checked on the image:
    - the "Less effort. More slop." slogan
    - the Brainrot label
    - the ingredients panel
    - "4 flavors"
- **Decided:**
  - The old headline and tells described the old poster's slogans in
    threes, em dash and QR code, so they had to change with it.
  - New headline: "An AI advert, selling AI slop." Paul to reword.
  - The four tells are shortened from Paul's own lesson notes in
    `edu/tools/slop/data/posters.json`.
  - PLAN.md T25 updated to match. Its speaker line is now a placeholder for
    Paul.
  - Paul's text edits were committed first, separately, under his name
    (edaf1bf).
- **Verified:** T25 fits one screen at 1280x720, 1600x900 and 1920x1080, and
  the image loads.

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
