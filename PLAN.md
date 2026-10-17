# build.contrapaul.com: the talk and the guide

Talk title: Not a "prompt talk": How I actually build learning websites with AI.

- **When:** Saturday 17 October 2026
- **Where:** Shenzhen, China, to an international audience
- **Length:** 45 minutes: 35 minutes of talk, then 10 minutes of Q&A
- **Language:** English only
- **Look:** dark background, with a light theme for phones

This file is the plan for build.contrapaul.com, a single site that is both the presentation and a guide the audience keeps afterwards. It is also the first artifact in the site's own story: the talk walks through how this file became that site.

Placeholders in square brackets, like [RESOURCE 1], are for you to fill in. Nothing in them has been invented.

## Brief (Paul, 2026-10-15, verbatim)

> Overhaul presentation.md to remove the live build from the plan- it can be added at the end if there is time. I'll start with cloud.contrapaul.com and a question. Following that I'll switch tabs and jump to build.contrapaul.com, which will be a new website that is both a presentation and a guide. I want to have a multi-tab page, like make/localai or edu/ai- but with the ability to use keyboard shortcuts (arrows) to move between each full screen page element as if they are slides, but the tabs can also be scrolled through conventionally. The existing content structure is not remaining. After the opener/cloud I'll share a few specific resources/pages (to be chosen by me), then dig into structure, then habits/rules/tips for success, before Q&A/play with my sites. Structure includes chatbots vs harnesses- and I want to note that it's AI agnostic, provided the model is agentic. I think it's useful to spend a moment here and throughout explaining terms such as 'agentic', 'reasoning', 'thinking', 'tool use', and more. I want to have a glossary as a separate tab, functioning the same as make/tools/codewithai and make/localai- where the glossary always allows hover to define and clicking takes us to the glossary. Structure works through the concept of repos, working on your device or in the cloud, but permanence being key. The creation of this subdomain (build) is a great example to work through for structure- taking the audience through each step, starting with the plan, then build, personal changes, commits, pushing to GitHub, and creating a static page on Cloudflare.
>
> Habits, rules, and tips come after. One key addition to rules should be avoiding AI art/images, and proper disclosure to students. I want to tell a short story about making quick edits/fixes live in class- which seriously got class buy in.
>
> The style/inspiration is slick motion graphics, with the feel of being sliding through/scrolling through a video showcase.
>
> Tab 1 is the primary presentation, Tab 2 is specific instructions for getting started and producing your first website. Tab 3 is a links to selected website elements I've created. Tab 4 is the glossary.

---

## Part 1: The site

### The four tabs

The tab names are suggestions.

| Tab | Name | What it is | Who uses it |
|---|---|---|---|
| 1 | **Talk** | The presentation: full-screen frames, stepped with the arrow keys | You, on the projector |
| 2 | **Start** | Step-by-step guide to a first website, plus starter files to copy | The audience, afterwards |
| 3 | **Projects** | Links to selected things you've built, grouped, each with one line | The audience, during Q&A and after |
| 4 | **Glossary** | Every technical term on the site, defined once | Everyone; reached by hover and click from any tab |

### How it moves

**Frames.**
- Every tab is a vertical stack of full-screen frames, each exactly one viewport tall.
- On a projector each frame is a slide.
- On a phone or laptop the tab scrolls normally, and the frames read as a long page.

**Keyboard map (Talk tab):**

| Key | Action |
|---|---|
| Down, Right, Page Down, Space | Next frame |
| Up, Left, Page Up | Previous frame |
| Home / End | First / last frame |
| 1 to 4 | Switch tab |
| B or . | Blank the screen (most presentation clickers send one of these from their blank button) |
| Escape | Close a glossary card |

**Clicker.** You'll present with a clicker. Most send Page Up and Page Down, so those must work exactly like the arrows. In P1, press every button on your clicker on a test page that logs the keys it sends, and map them all.

**Scroll and keys stay in sync.**
- Smooth-scroll with CSS scroll snap, so mouse, trackpad and keys all land on whole frames.
- If you scroll halfway and then press an arrow, the next frame is the one after whichever frame is mostly on screen.

**Addresses.**
- Hash routing like localai: `#/talk/12`, `#/start/3`, `#/glossary/agentic`.
- A reload keeps your place, and you can open the projector straight onto a frame.

**Progress.**
- A thin rail at the edge shows the frames in the current tab and fills as you pass them.
- This is the "read receipt" rail from edu/ai/about.

### Glossary behaviour (same as codewithai and localai)

- Terms are marked `<a class="gloss" data-term="agentic">agentic</a>`.
- **Hover or keyboard focus** shows a small card with the term's short definition.
- **Click** goes to `#/glossary/<id>` and highlights the full entry.
- **On touch screens:** the first tap shows the card and a second tap goes to the entry.
- **Escape** closes the card.
- Each Talk frame below lists its glossed terms. Link a term on its first use in each frame, not every time it appears.
- Data shape, copied from `make/tools/codewithai/js/data/glossary.js`: `{ id, term, short, full, links }`.
  - `short` must make sense on its own, mid-sentence.
  - `full` is the glossary page entry.

### Look and motion: "scrolling through a video showcase"

**Frames:**
- Full-bleed: no cards floating in white space.
- Large type that is readable from the back row.
- Each section has its own colour, like the screens in edu/ai/about.

**Motion:**
- Headlines arrive word by word or line by line.
- Media slides or scales in.
- Frames cross-fade or push as you step.
- Things arrive once and then stay put (the reveal-once rule from `localai/js/motion/scroll.js`).

**Showcase frames:**
- A short, muted, looping screen recording fills the frame, with one line of text over it.
- Store clips locally as `.mp4` (H.264) for broad support, kept small. Cloudflare Pages caps each file at 25 MiB, and a hall of phones on shared wifi will load them.

**Theme.**
- Dark by default: it suits the video-showcase look and projects well.
- A light theme for phones: on narrow screens the site follows the phone's light or dark setting, with a toggle. Reuse `make/localai/js/theme.js`.
- The poster on T25 and the screenshots keep their own colours in both themes.

**Reduced motion:** honour `prefers-reduced-motion` with instant, opacity-only changes and no autoplaying loops.

### House rules for the build repo (its CLAUDE.md)

1. **Nothing is fetched from another host.** Fonts, scripts, video and QR codes are all committed locally. Why: anything blocked in China, or on the venue wifi, stops the page in front of the room.
2. **No em dashes.** Why: to you they read as AI writing.
3. **Legible from the back of the room.** Every Talk frame is judged on a projector at a distance. Nothing important depends on hover.
4. **No AI-generated images, except as labelled examples of slop.** Media is screen recordings of real work, your own drawings and photos, or diagrams built in code. The one exception is the slop poster on T25, which appears clearly labelled as an example of what not to do. Why: the talk argues for this rule, so the site has to follow it.
5. **Every technical word is a glossary link on its first use in a frame, and every glossary entry has a short and a full definition.** Why: the audience did not come to learn jargon.
6. **The agent keeps HANDOFF.md current** after every change that works, before saying it is finished.
7. **Disclose AI use.** The footer says the site was built with an AI coding agent, and the Talk tab tells the story of how.

### Reuse map (this is habit 5, demonstrated)

| Piece | Reuse from | Notes |
|---|---|---|
| Tab shell, hash router | `make/localai/js/app.js` | `TABS` list and the `#/tab/sub` routing |
| Glossary page, hover cards | `make/tools/codewithai/js/tabs/glossary.js` and `js/data/glossary.js` | Many terms already written; see Tab 4 |
| Reveal-once motion | `make/localai/js/motion/scroll.js` | No library, testable in Node |
| Key handling for frames | `edu/curriculum/presentation.js`, keydown handler near line 1292 | Arrow and Page Down stepping already works there |
| Progress rail | edu/ai about page | The read-receipt dots |
| QR codes | `cloud/public/js/vendor/qrcode.js` | MIT; already vendored so nothing is fetched |
| Fonts | Already on disk (see your site conventions) | Commit the woff2; check the license before publishing any font |

### Deploying it

**Decided (2026-10-15):** Cloudflare Pages, connected to a new public GitHub repo `contrapaul/build`, with no build step and the custom domain build.contrapaul.com. It's what you use for everything, and it's the exact path the talk teaches: push, and it's live.

**Public from day one.** Keep student data, school documents and anything copyrighted out of the repo. The edu audit is the cautionary tale.

### Build phases (checkpoints are yours to sign off)

The talk is on 17 October and this plan was written on 15 October, so these are split into what is essential and what can wait.

- **Day 1 (15 Oct):** P0 to P2.
- **Day 2 (16 Oct):** P3, P4 and P7, with P5 and P6 as time allows.

| Phase | What | Needed for the talk? |
|---|---|---|
| P0 | Repo, CLAUDE.md, HANDOFF.md, this file as PLAN.md, first commit, Pages connected, domain live | Yes |
| P1 | Shell: four tabs, frames, keyboard map, router, rail, light theme | Yes |
| P2 | Glossary: port codewithai's, add the new terms below | Yes |
| P3 | Talk tab content and media | Yes |
| P4 | Projects tab links | Yes (it's short) |
| P5 | Start tab guide and starter files | A first version; can grow after |
| P6 | Motion polish, frame transitions, video loops | As time allows |
| P7 | Rehearsal: projector at 16:9, phone, clicker, venue wifi, a China connection | Yes |

**Capture as you go.** Screenshot every P0 step: the plan, the first session, your edits, the commit list, the push, the Cloudflare screens. Those screenshots are frames T16 to T21.

---

## Part 2: Tab 1, Talk

### Timing at a glance

| Min | Section | Frames |
|---|---|---|
| 0 to 3 | Opener on cloud.contrapaul.com | C1 |
| 3 to 5 | Switch tabs: title, the cloud, who I am | T1 to T3 |
| 5 to 11 | Things I've made | T4 to T7c |
| 11 to 22 | Structure: how it actually works, then this site, step by step | T8 to T21 |
| 22 to 33 | Habits, rules and tips | T22 to T29 |
| 33 to 35 | Your turn | T30 |
| 35 to 45 | Q&A, and the room plays with the sites | T30 stays up (T31 optional) |

The 35 minutes of talk are tight. If you're running late, these frames can be cut:
- T4 (the montage)
- one of the resources (T5 to T7c, EasyFEA is done)
- T11 (reasoning and thinking: move "thinking" into T10 as one sentence)
- T27 (reuse: mention it in one line on T26)

Before you start, have two browser tabs open:
1. cloud.contrapaul.com, with the room open and the question set.
2. build.contrapaul.com at `#/talk/1`.

### C1: The question (on cloud.contrapaul.com, 0:00)

**On screen:** "When I say AI, what do you picture?" and the room's QR code.

**Say:**
- "One or two words. If someone already wrote yours, tap it and it grows."
- Give it about two minutes and let it fill. The whole opener, including reading it out on T2, is three minutes.

**Media:** the live cloud. Before the talk:
- set entries per person to 2
- test it with 50 or more phones or tabs
- keep a screenshot of a filled rehearsal cloud as a backup

### T1: Title (3:00)

**On screen:**
- Not a "prompt talk": How I actually build learning websites with AI
- A QR code to build.contrapaul.com, with the line "Everything in this talk, plus a guide to your first site"

**Say:**
- "Switch to this if you like. It's the slides, the guide, links to everything I'll show, and a glossary. Hover any underlined word and it explains itself."

**Gloss:** none on this frame.

### T2: What the room said (3:20)

**On screen:**
- "You said: [top three words from the cloud]" (type them in live, or leave the frame generic)
- "Most of us picture a chat window."

**Say:**
- Read the biggest bubbles. Expect ChatGPT, chatbot, cheating.
- "A chat window is real, and it's the smallest version of this. The word cloud you just used is something I built with AI in an evening. Anyone in the room could build it."

**Gloss:** chatbot.

### T3: Who I am (4:10)

**On screen:**
- Design Technology Teacher. I design it. I make it. I film it. I fix it.

**Say:**
- Keep this to under a minute. The four verbs are the designer, the maker, the video creator and the tech person, in one breath.
- "This isn't a talk about magic wording. It's about structure and habits, which are teaching skills you already have."

**Gloss:** none.

**Media:** a screenshot of the GitHub contribution graph. Use the screenshot, not a link: edu is now private.

### T4: Divider: Things I've made (5:00)

**On screen:** a fast montage: three to five seconds each of four or five sites, cut together like a showreel.

**Say:** "A few things, then how they're made."

**Media:** one looping montage clip, under 10 MB.

### T5 to T7c: five resources, EasyFEA is the third (5:20)

You choose four of the five. Spend under two minutes on each.

- T5: [Resource 1], placeholder.
- T6: [Resource 2], placeholder.
- T7: EasyFEA, done. Same showcase layout as the Projects tab: clip on the left, name, one line, address and QR on the right.
- T7b: [Resource 4], placeholder.
- T7c: [Resource 5], placeholder.

**Each frame:**
- A full-bleed looping clip of the resource in use.
- One line: the problem it solves.
- One line: how long it took.
- A small QR code to the live page.

**Say:**
- What it is.
- The problem it solved.
- One honest number (time taken, or how many students used it).
- Avoid going through features one by one.

**Candidates** (live as of 2026-10-10). Check for student names before recording:
- `edu.contrapaul.com/curriculum/dp/a1.1-ergonomics`: curriculum as interactive pages, with a sourced data curve.
- `edu.contrapaul.com/tools/papers/` ("Regulatory Papers, Please") or `tools/tolerance/`: ideas you'd never build as a worksheet.
- `edu.contrapaul.com/ai/`: AI literacy, built with AI.
- The trivia night, as a clip only (the site is password protected).
- `games.contrapaul.com` or `blurt.contrapaul.com`: ambition, phones in a room.

**Gloss:** as needed per resource.

### T8: Divider: How it actually works (11:00)

**On screen:** "Not prompts. Structure."

**Say:** "Here's the part nobody showed me. The difference isn't how you word things. It's what the AI is allowed to do, and where the work lives."

### T9: Chatbot vs harness (11:15)

**On screen:** two animated loops side by side.

*Chatbot:*
1. You ask.
2. It answers.
3. You copy and paste.
4. You test it.
5. You paste back the error.
6. Repeat.

*Agent in a harness:*
1. You describe the goal.
2. It reads your project.
3. It writes the files.
4. It runs the page and looks at it.
5. It fixes what's broken.
6. It saves a change you can undo.

**Say:**
- "On the left, you're the hands. On the right, you're the editor."
- "A harness is the program around the AI that gives it hands. It can open files, run things, use a browser and see what happened."

**Gloss:** chatbot, harness, agent.

**Media:** the diagram, animated. Optional: a 10-second clip of a real session editing a file and refreshing a preview.

### T10: What "agentic" means (12:15)

**On screen:**
- "Agentic: it works in a loop until the job is done."
- A circular diagram: plan → use a tool → check the result → decide what's next.

**Say:**
- "A tool is anything the AI can use besides talking: reading a file, running code, searching the web, opening a browser. Tool use is what turns an answer into an action."
- "Agentic means it chains those actions itself. It doesn't stop after one reply."

**Gloss:** agentic, tool use.

### T11: Reasoning and thinking (13:00)

**On screen:**
- "It plans before it types."
- A collapsed "thinking" panel expanding to show steps.

**Say:**
- "Reasoning models work through a problem step by step before answering. Many tools show this as 'thinking', and you can often read it."
- "Read it when something goes wrong. It shows you what it misunderstood, which tells you what to say more precisely next time."
- "More thinking means slower and costlier, but far fewer silly mistakes on big jobs."

**Gloss:** reasoning, thinking, token.

### T12: It's AI-agnostic (13:50)

**On screen:**
- "Any agentic model, in any harness."
- Logos are not allowed (no external images, and it shouldn't read as an ad), so use plain text: Claude Code, OpenAI Codex, GitHub Copilot agent mode, Cursor, Gemini CLI.

**Say:**
- "I use Claude Code. Everything I'll show works with any of these, as long as the model is agentic and the harness gives it tools."
- "Tools change every few months. The habits don't."
- A note for the room in Shenzhen: most of these tools need a VPN in mainland China. Say this plainly, since half the audience will be wondering.

**Gloss:** model, harness, agentic.

### T13: The repo: permanence is the point (14:40)

**On screen:**
- "A chat disappears. A repo remembers."
- A folder icon, with its history shown as a stack of saved changes.

**Say:**
- "A chat has a memory limit, and when it's full or closed, it's gone. A repository is a project folder with its whole history. Every saved change has a note, and any of them can be undone."
- "The work lives in the repo, not in the chat. Any session, on any day, with any tool, can pick it up."

**Gloss:** repo, commit, context window.

### T14: On your device or in the cloud (15:30)

**On screen:** two panels, "My laptop" and "The cloud", with the same repo between them.

**Say:**
- "I can run the agent on my laptop, where it sees my files and opens a preview. Or I can start a cloud session from a browser, or my phone at lunch, and it works on a copy of the repo on a server."
- "Either way the result ends up in the same repo. That's why permanence matters: the repo is the meeting point."

**Gloss:** local session, cloud session, clone, push.

### T15: Divider: Let's build this site (16:20)

**On screen:**
- "You're looking at the example."
- build.contrapaul.com, framed.

**Say:** "This site didn't exist [N] days ago. Here's every step, using the real files."

### T16: Step 1: The plan (16:40)

**On screen:**
- The first version of this file, then your brief added at the top, then the rewritten plan.
- Time it like a before-and-after video.

**Say:**
- "It started as a rough talk plan. I wrote what I actually wanted at the top, in plain English, and asked the agent to rewrite the plan around it. Before any code."
- "That brief is quoted word for word in the plan. Any future session reads it first."

**Gloss:** brief, plan.

**Media:** screenshots of PLAN.md before and after (capture during P0).

### T17: Step 2: The build (17:30)

**On screen:** the first working version, sped up, from empty folder to first frame.

**Say:** "First session: the shell, the tabs and the keys. It ran the page, looked at it, and fixed its own mistakes before showing me."

**Gloss:** preview, diff.

**Media:** a sped-up screen recording of the first build session (capture during P1).

### T18: Step 3: My changes (18:20)

**On screen:** [two or three real before-and-after pairs from building this site].

**Say:**
- "Then it's mine. Some changes I typed myself, some I described. [Example of each.]"
- "This is where you spend most of your time, and it's the fun part."

**Media:** capture these during P1 to P3. Don't invent them.

### T19: Step 4: Commits (19:20)

**On screen:** the build repo's commit list, scrolling.

**Say:** "Every change that works gets saved with a note: a commit. That's my undo button and my diary."

**Gloss:** commit, revert.

### T20: Step 5: Push to GitHub (20:00)

**On screen:** the push, then the repo on github.com.

**Say:** "Pushing copies the commits up to GitHub. Now the project lives online, not just on my laptop."

**Gloss:** push, GitHub.

### T21: Step 6: Live on Cloudflare (20:40)

**On screen:**
1. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.
2. Pick the repo.
3. Build settings blank.
4. Deploy.
5. Add the custom domain.

**Say:**
- "A static site is just files, so there's nothing to build. I connected the repo once. Since then, every push goes live by itself in about a minute."
- "It's free, and with your own domain it works in China, which github.io often doesn't."

**Gloss:** static site, deploy, domain, subdomain.

**Media:** screenshots of each Cloudflare screen (capture during P0).

### T22: Divider: Habits, rules and tips (22:00)

**On screen:** "What matters more than prompts."

**Say:** "If you take one section home, take this one."

### T23: Language specificity (22:15)

**On screen:**

*Vague:*

> Make the video bigger and nicer.

*Specific (from my trivia project):*

> The video should load first in a player that fills ~90+% of either horizontal or vertical dimensions, depending on video size. Once it ends I'd like it to dissolve/fade... and have the question load in, filling much of the screen but leaving breathing room.

**Say:**
- **Name the thing.** If you don't know what something is called, ask the agent. Then use that word forever.
- **Describe symptoms precisely.** For example: "The first paragraph runs full width; the five after it stop at about 60%."
- **Say what done looks like.**
- "It's exactly what we ask of students writing a design specification."

**Gloss:** viewport, autoplay.

### T24: House rules (23:45)

**On screen:** an excerpt from `trivia/CLAUDE.md`:

> **Nothing is fetched from another host, ever.** ... a blocking request to a dead host stops the page in front of a room full of people.
>
> **Do not add questions.** `TBD` in the data means Paul has not settled it.

**Say:**
- "Every project has a rules file the agent reads first. It's class rules for the agent."
- "Every rule carries its *why*, so the agent can apply it to situations I didn't predict."
- "If it makes the same mistake twice, it becomes a rule. I never say it a third time."

**Gloss:** house rules file.

### T25: Students notice slop (25:00)

**On screen:**
- The "AI Slop" rainbow goop advert, filling the frame and labelled "AI-generated, shown as an example". (Changed from the "Can You Spot AI Slop?" poster on 2026-10-16, at Paul's request.)
- Then four hand-drawn rings land on its tells, one at a time:
  - every line is a pair of fragments: "Less effort. More slop."
  - "Harmlessly addictve", and a brain icon that falls apart up close
  - "Ingredients" decays into "Ingredieats"
  - four flavors promised, one mixed rainbow in the tub
- Finally a single line arrives: "Students notice. Students know. Students judge."

**Say:**
- [Paul's line introducing the goop advert. The tells come from his slop lesson notes in `edu/tools/slop/data/posters.json`.]
- "Students notice AI art, AI music and every other kind of slop. They know what it is, and they judge it, and they judge whoever put it in front of them."
- "So my rule is no AI art in anything I make. The AI writes code; the pictures, sound and words students see are mine, theirs, or properly credited."
- Optional: in Tome of Secrets, contributed art ships in the game with credit.

**Gloss:** generative AI, slop.

**Media:**
- `media/slop-goop.webp`, copied from `edu/tools/slop/img/` (347 KB). These posters were generated deliberately for the slop lesson, and `data/posters.json` records each prompt.
- The rings are positioned by hand in `index.html` (`--x`, `--y`, `--w`, `--h` as percentages of the poster), drawn in code.
- `edu.contrapaul.com/tools/slop/` can also go on the Projects tab, since it's a lesson the audience can use.

### T25b: Explain it, and they buy in (26:15)

**On screen:**
- "Tell students what AI made, and why."
- The contrast to the slop poster: a real tool of yours with its AI disclosure line visible.

**Say:**
- "The other side: when I explain how I used AI, and students see what it made possible, they buy in."
- "Every site I make says it was built with an AI agent. The AI site records exactly how. We ask students to declare their AI use, so we should model it."
- [Your example: a moment when explaining it changed how a class saw a tool. This leads straight into the story on T28.]

**Gloss:** disclosure.

**Media:** a screenshot of the "how it was made" section of `edu.contrapaul.com/ai/about`, or a tool footer showing its disclosure line.

### T26: Briefs, plans and handoffs (27:15)

**On screen:**
- The section headings of `trivia/HANDOFF.md` (506 lines): Status at a glance, Ground rules, Gotchas that have already bitten, Open items, Working with Paul.
- The rule, set apart below:

> After every change that works, add a dated entry to the top of HANDOFF.md: what was asked, what was built, what was decided and why, and what is still unverified. Do this before telling me you are finished.

**Say:**
- "Brief first: who, where, what done looks like, what it must never do. Then ask for a plan, not code. It proposes, I decide."
- "The agent forgets everything between sessions. The handoff is its memory, like a cover note for a substitute who starts every day fresh."
- "I don't write it; I make the agent write it, every time. If it isn't written down, it didn't happen."

**Gloss:** brief, handoff.

### T27: Reuse (28:45)

**On screen:**
- `curriculum.js`: 35 pages
- `drag-sort.js`: 10 activities
- This site's glossary: borrowed from my student coding guide

**Say:**
- "The first drag-and-sort took an evening. The tenth took a sentence: 'like the one in A3.3'."
- "This site's glossary, hover cards and key handling all came from things I'd already built. The agent's instinct is to write something new. Your job is to say 'we already have one of those'."

**Gloss:** none new.

### T28: The story: fixing it live in class (29:45)

**On screen:** one image or a short clip, if you have one. Otherwise just a single line in large type: [THE LINE STUDENTS SAID, OR THE CHANGE YOU MADE].

**Say:** [YOUR STORY. Prompts to shape it in about 90 seconds:]
- **What class and what tool?**
- **What happened:** a broken thing, or a student's request?
- **What you did:** said it out loud, typed it, and the page changed while they watched.
- **How long it took.**
- **What the room did,** and what changed afterwards (buy-in, more requests, students asking how).
- **The point:** when a fix takes a minute, students see the resource as theirs, not the teacher's.

### T29: Quick tips (31:30)

**On screen:** six short lines, arriving one at a time.

1. Start with something you need, not something impressive.
2. One change at a time. Check it yourself.
3. When it works, commit.
4. Ask "what is this called?" and "explain what you just did."
5. No student data, ever. No accounts, no names.
6. Read the thinking when it goes wrong.

**Say:** one sentence each, then stop.

### T30: Your turn, then Q&A (33:00)

**On screen:**
- QR codes to build.contrapaul.com Start (Tab 2) and Projects (Tab 3)
- "Questions, or play."

**Say:**
- "The Start tab walks you from nothing to a live site. Projects has everything I showed. Play with them while we talk."
- Optional: switch back to the cloud for "What will you build?" (one minute, taken from Q&A).
- Leave this frame up for the full 10 minutes of Q&A, from 35:00 to 45:00, so latecomers can scan the codes.

**Likely questions to prepare for:**
- What does it cost?
- What about student data?
- Do students use this to cheat? (Point to edu/ai.)
- How long did X take?
- Which AI should I use?
- Does this work in China? (Yes for the sites, since nothing loads from blocked hosts. Most AI tools need a VPN here; see T12.)

### T31: Optional live build (only if time)

Use this only if there's time left over. Make one small, rehearsed change to build.contrapaul.com itself, live. For example: "Add a frame thanking [conference name]". Then commit and push, and the room reloads to see it within a minute. This is the T19 to T21 story, done in front of them.

---

## Part 3: Tab 2, Start

The audience's guide. It reads as a page; the frames scroll. Simple English throughout. It follows codewithai's "time to first webpage" approach: the first win comes before anything that can go wrong.

1. **What you'll make.** A one-page site, live at your own address, built with an AI agent. About an hour the first time.
2. **What you need.**
   - A GitHub account (free).
   - A Cloudflare account (free).
   - An AI coding agent. Most need a paid plan; name the options without recommending one.
   - Optionally, a domain (about the price of a coffee a year).
3. **Pick something you need.**
   - Ideas: a quiz, a sorting activity, a countdown, a marking helper.
   - "Need makes you specific."
4. **Write a one-page brief.**
   - Who uses it, where (projector, phone, laptop), what done looks like, what it must never do.
   - Include the BRIEF.md template below.
5. **Route A: everything in the browser (recommended first).**
   1. Create an empty repo on GitHub.
   2. Open a cloud session on it (for example claude.ai/code).
   3. Paste the brief and ask for a plan.
   4. Approve the plan.
   5. Ask it to build, and to add CLAUDE.md and HANDOFF.md.
   6. Review it, then merge or push.
6. **Route B: on your own computer.** Install a harness, clone the repo, then follow the same steps with a live preview.
7. **Publish.** Cloudflare Pages: Connect to Git, choose the repo, leave the build settings blank, Deploy. Optionally add a custom domain. Use the same screenshots as frames T21.
8. **Make it yours.**
   - One change at a time.
   - Commit when it works.
   - Ask "what's this called?" whenever you're unsure.
9. **Before you share it.**
   - No student data.
   - Add a license.
   - Add an AI disclosure line.
   - Check it on a phone.
10. **Where next.** Links to the Projects tab, and to codewithai for students.
11. **Working from mainland China.**
    - Most AI coding tools need a VPN.
    - GitHub works but can be slow.
    - A Cloudflare Pages site on your own domain loads normally; `*.pages.dev` and `github.io` addresses often don't.
    - Keep everything in the project itself: no Google Fonts, no CDNs.

### Starter files (shown on the page with a copy button)

**BRIEF.md**

```markdown
# Brief: [name]

## Who uses it
[Students in grade X / colleagues / me on a projector]

## Where
[Projector at 16:9 / phones / school laptops]

## What it does
[Two or three sentences]

## Done looks like
- [A student can ... without ...]
- [It loads in under ... on school wifi]

## Must never
- Ask for names or accounts
- Load anything from another website
```

**CLAUDE.md**

```markdown
# Rules for this project

Read BRIEF.md and HANDOFF.md before changing anything.

- No student data. No names, no accounts, no tracking. Why: this is public.
- Nothing is loaded from another website. Fonts and scripts are saved in
  the project. Why: blocked sites stop the page loading.
- One change at a time, and say what you changed. Why: I need to check it.
- Ask before guessing. If the brief does not say, ask me.
- After every change that works, add a dated entry to the top of
  HANDOFF.md: what was asked, what was built, what was decided, and what
  is still unchecked. Do this before telling me you are finished.
```

**HANDOFF.md**

```markdown
# Handoff

Newest entry at the top. The agent updates this after every working change.

## Status
[One paragraph: what works, what does not yet]

## Open items
- [ ]

## Gotchas that have already bitten

## Log
### [date]: [what changed]
```

Tell the audience that these files are for agents and work with any tool. Some harnesses look for their own filename instead of CLAUDE.md (for example AGENTS.md), so they should check which one theirs reads.

---

## Part 4: Tab 3, Projects

Links, grouped, with one line each and a small looping preview where available. You choose the final list. The candidates below were live on 2026-10-10.

**For teaching content**
- [x] `edu.contrapaul.com/tools/easyfea/` (EasyFEA, the FEA sandbox; already a showcase slide)
- [ ] `edu.contrapaul.com/curriculum/dp/` (all 24 DP subtopics)
- [ ] `edu.contrapaul.com/curriculum/myp/`
- [ ] `edu.contrapaul.com/ai/`
- [ ] `edu.contrapaul.com/tools/slop/` (spotting AI slop)

**For activities and play**
- [ ] `edu.contrapaul.com/tools/` (the full tools index)
- [ ] `edu.contrapaul.com/tools/papers/`
- [ ] `edu.contrapaul.com/tools/tolerance/`
- [ ] `edu.contrapaul.com/tools/AshbyChart/`
- [ ] `games.contrapaul.com`

**For a room full of phones**
- [ ] `cloud.contrapaul.com`
- [ ] `blurt.contrapaul.com`

**For students learning to code**
- [ ] `make.contrapaul.com/tools/codewithai/`
- [ ] `make.contrapaul.com/localai/`

Rules for this tab:
- Link to sites, never to repos. edu is private now.
- Leave out trivia (password protected) and tomeofsecrets.contrapaul.com (doesn't respond). Use tome.contrapaul.com instead.
- Check each page for student names before the talk.

---

## Part 5: Tab 4, Glossary

Start from codewithai's glossary (about 90 terms with short and full definitions) and add the terms this talk needs. Group them on the page in the order the talk meets them.

**Already written in codewithai** (copy, then trim the wording for adults if needed):
agent, model, llm, prompt, token, context-window, hallucination, repo, commit, diff, branch, revert, push-pull, clone, github, pull-request, deploy, static-site, hosting, domain, dns, https, localhost, live-preview, terminal, html, css, javascript.

**New, with short definitions drafted.** These are for you to check; each needs a `full` entry too.

| id | Term | Short definition (hover card) |
|---|---|---|
| `agentic` | Agentic | An AI that works in a loop on its own: it plans, takes an action with a tool, checks the result, and decides what to do next, until the job is done. |
| `tool-use` | Tool use | When an AI does something besides writing a reply, such as reading a file, running code, searching the web or opening a browser. Tools are what let it act, not just answer. |
| `reasoning` | Reasoning model | A model trained to work through a problem in steps before it answers. Slower and costlier than a quick reply, but much better at long, careful jobs. |
| `thinking` | Thinking | The step-by-step working a reasoning model does before answering. Many tools let you read it, which shows you what the AI understood. |
| `chatbot` | Chatbot | A chat window where you type and an AI replies. It can only give you text; you do the copying, pasting and testing. |
| `harness` | Harness | The program wrapped around an AI model that gives it tools and permissions, such as Claude Code or Codex. The model thinks; the harness lets it act. |
| `coding-agent` | Coding agent | An agentic AI, inside a harness, that can read and change the files of a project, run it and check its own work. |
| `local-session` | Local session | Running a coding agent on your own computer, where it works on the files in a folder there and can open a live preview. |
| `cloud-session` | Cloud session | Running a coding agent on a server from a browser or phone. It works on a copy of your repo and sends its changes back. |
| `house-rules` | Rules file | A file in a project, often called CLAUDE.md or AGENTS.md, that the agent reads before doing anything. It holds the project's rules and the reasons for them. |
| `brief` | Brief | A short document saying who a project is for, where it is used, what done looks like and what it must never do. Written before any code. |
| `handoff` | Handoff file | A running record the agent updates after every change: what was asked, built and decided. It is the project's memory between sessions. |
| `permanence` | Permanence | Work saved in a repo stays, with its full history. A chat can be closed or forgotten; a repo can be picked up by any session, on any day. |
| `subdomain` | Subdomain | A name in front of your domain, such as build.contrapaul.com, that can point at a separate site. |
| `cloudflare-pages` | Cloudflare Pages | A free service that publishes a website straight from a GitHub repo, and updates it each time you push. |
| `generative-ai` | Generative AI | AI that makes new content, such as text, images, audio or code, rather than only sorting or searching existing content. |
| `slop` | Slop | Low-effort AI-generated content, such as images, music, text or video, made quickly and with little care. Audiences, students included, increasingly spot it and trust it less. |
| `disclosure` | AI disclosure | Saying clearly which parts of a work an AI produced or helped with. Schools ask it of students; teachers can model it. |
| `viewport` | Viewport | The visible area of a web page on a screen. A phone's viewport is narrow; a projector's is wide. |
| `autoplay` | Autoplay | Media that starts playing by itself when a page or section opens. |

Glossary rules, kept from localai's style guide:
- No em dashes.
- Expand an abbreviation the first time it appears.
- Never define a term using another undefined term.
- Check every "learn more" link loads, including from China.

---

## Before the talk

- [ ] **Decide:**
  - [ ] the four resources for T5, T6, T7b and T7c
  - [ ] the final Projects list
- [ ] **Build P0 to P4 and P7.** Capture screenshots at every P0 step for T16 to T21.
- [ ] **Write your pieces:**
  - [ ] the in-class story (T28)
  - [ ] the buy-in example (T25b)
  - [ ] which rings to show on the slop poster (T25)
- [ ] **Record clips,** each small enough for 25 MiB and shared wifi:
  - [ ] the montage (T4)
  - [ ] one loop per resource (T5 to T7c; the EasyFEA loop is done)
  - [ ] the first build session (T17)
  - [ ] the cloud filling (a backup for C1)
- [ ] **Prepare the word cloud:**
  - [ ] set entries per person to 2
  - [ ] set the question in advance
  - [ ] test with 50 or more devices
- [ ] **Rehearse on the real setup:**
  - [ ] your clicker (Page Down must step frames)
  - [ ] a 16:9 projector from the back row
  - [ ] a phone on mobile data
  - [ ] Firefox and Chrome
- [ ] **Check the build repo,** which is public from day one:
  - [ ] no student data, school documents or copyrighted text
  - [ ] fonts licensed for publishing
  - [ ] a license file
- [ ] **Add the "update HANDOFF.md" rule** to your own CLAUDE.md files, so T26 describes what you actually do.
