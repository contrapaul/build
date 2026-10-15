/* ============================================================
   build.contrapaul.com: glossary data (single source of truth)
   ------------------------------------------------------------
   Every technical word on the site is defined once, here.

     short: 1 to 2 sentences, shown in the hover card. Must stand
            alone: the reader is mid sentence somewhere else.
     full:  the entry on the Glossary tab.

   Terms marked "from codewithai" were copied from
   make/tools/codewithai/js/data/glossary.js (English only). The
   rest were written for this talk.

   Rules (from make/localai's style guide):
     - No em dash. No middot inside a sentence.
     - Expand every abbreviation on its first appearance.
     - Never define a term using another undefined term.

   No "learn more" links: the talk is in Shenzhen, where the
   usual reference sites do not load.

   `id` is the anchor on the glossary page and the value of
   data-term in the markup: <a class="gloss" data-term="repo">.
   Keep ids kebab-case and stable; they are linkable URLs.
   ============================================================ */

export const GROUPS = [
  {
    "id": "ai",
    "title": "AI, models and agents"
  },
  {
    "id": "agent",
    "title": "Working with an agent"
  },
  {
    "id": "git",
    "title": "Repos and version control"
  },
  {
    "id": "web",
    "title": "Web pages"
  },
  {
    "id": "publish",
    "title": "Putting it online"
  },
  {
    "id": "ethics",
    "title": "Using AI well"
  }
];

export const GLOSSARY = [
  // from codewithai
  {
    "id": "model",
    "group": "ai",
    "term": "Model",
    "short": "The AI itself. It is a very large file of numbers that turns the text you send into the text it sends back.",
    "full": "A model is a file that holds billions of numbers, called weights. They were set during a long training process, and they do not change after that. Running a model means doing math with your words and those numbers. The math finds which piece of text should come next. Then the model does the same thing again for the piece after that. There is no thinking behind the screen, and no list of stored answers."
  },
  // from codewithai
  {
    "id": "llm",
    "group": "ai",
    "term": "LLM",
    "short": "Large Language Model. The kind of AI behind ChatGPT, Claude and coding assistants. It predicts text.",
    "full": "LLM stands for large language model. It is a model trained on a huge amount of text to predict what comes next. Everything it seems to do comes from that one ability. It can write code because code is text with strong patterns. Keep two facts in mind together. Prediction at this scale is truly useful. But prediction is not understanding, so a fluent answer does not prove a correct one."
  },
  // from codewithai
  {
    "id": "prompt",
    "group": "ai",
    "term": "Prompt",
    "short": "What you type to an AI. The clearer and more exact it is, the more useful the answer is.",
    "full": "A prompt is the text you give a model. It is the only thing the model knows about your situation. Unless you tell it, it cannot see your files, your screen or what you tried an hour ago. A useful prompt for coding says what you are building. It shows the real code and the real error message. It also says what you expected to happen instead. Fix my code is not a prompt. It is a hope."
  },
  // from codewithai
  {
    "id": "token",
    "group": "ai",
    "term": "Token",
    "short": "The small piece of text a model actually works with. It is usually a word or part of a word, not a letter.",
    "full": "A model does not read letters or words. It reads tokens, which are common pieces of text. A short English word is usually one token. A long or unusual word is split into several. A Chinese character is often one token by itself. Tokens matter for two practical reasons. The limit on how much a model can remember at once is counted in tokens. So is the bill when you use a paid service."
  },
  // from codewithai
  {
    "id": "context-window",
    "group": "ai",
    "term": "Context window",
    "short": "The most text a model can remember at once. Everything in the conversation has to fit inside it.",
    "full": "The context window is the total number of tokens a model can use at one time. It covers the whole conversation so far, plus the answer it is writing. When a conversation grows too long, the earliest part is dropped. The model truly forgets it. This explains something common. An assistant follows your project perfectly, then starts to contradict itself an hour later. Starting a new conversation and repeating the key points often works better than arguing with it."
  },
  // from codewithai
  {
    "id": "hallucination",
    "group": "ai",
    "term": "Hallucination",
    "short": "When a model says something with confidence that is not true, such as a function or library that does not exist.",
    "full": "A hallucination is a fluent, confident, wrong answer. It happens because a model predicts text that sounds right. It does not search for checked facts. A made-up function name can sound more right than the real one. In coding, this is easier to catch than in most subjects, because you can run the code and see. Treat every suggestion as a draft from a fast, well-read colleague who never says I am not sure."
  },
  // from codewithai
  {
    "id": "agent",
    "group": "ai",
    "term": "Agent",
    "short": "An AI that can take actions by itself, such as reading your files, running commands and editing code.",
    "full": "An agent is a model that has tools, and permission to use them without asking each time. It does not only print an answer for you to copy. It can open files, run a program, read the error and try again. That makes it far more capable. It also makes it more risky, because it can now change your project. The habits that keep this safe are simple. They are normal version control. Work on a branch, commit before the agent starts, and read the change before you keep it."
  },
  {
    "id": "chatbot",
    "group": "ai",
    "term": "Chatbot",
    "short": "A chat window where you type and an AI replies. It can only give you text: you do the copying, pasting and testing yourself.",
    "full": "A chatbot is the most familiar way to use AI: a box where you type a message and a model writes a reply. It is useful for questions, explanations and drafts. For building a website it has one big limit. It cannot touch your files or see your page, so every change goes through you. You copy its code into a file, open the page, find the problem, and paste the error back. You are the hands."
  },
  {
    "id": "agentic",
    "group": "ai",
    "term": "Agentic",
    "short": "Describes an AI that works in a loop on its own: it plans, takes an action with a tool, checks the result, and decides what to do next, until the job is done.",
    "full": "An agentic AI does not stop after one reply. It is given a goal, then repeats a loop: make a plan, use a tool to do one step, look at what happened, and choose the next step. A coding agent might read three files, change one, open the page in a browser, notice the button is in the wrong place, and fix it, all before it reports back. Whether a model can work this way well is the single most important thing to check before using it to build. Most recent large models can."
  },
  {
    "id": "tool-use",
    "group": "ai",
    "term": "Tool use",
    "short": "When an AI does something besides writing a reply, such as reading a file, running code, searching the web or opening a browser. Tools let it act, not just answer.",
    "full": "A model on its own can only produce text. Tool use is how it does things. The program around the model offers it a list of tools, such as read this file, edit that file, run this command, search the web, or take a screenshot of a page. The model decides when to use one, the program carries it out, and the result goes back to the model to read. Every useful coding agent depends on tool use. It is the difference between being told how to fix a page and having the page fixed."
  },
  {
    "id": "reasoning",
    "group": "ai",
    "term": "Reasoning model",
    "short": "A model trained to work through a problem in steps before it answers. Slower and costlier than a quick reply, but much better at long, careful jobs.",
    "full": "A reasoning model writes out its working before giving an answer, much like a student showing their method. This takes longer and uses more of your allowance, because the working counts too. In return it makes far fewer careless mistakes on tasks with many parts, such as planning a website or tracking down why a page breaks. Many tools let you choose how much reasoning to allow. For building, more is usually worth it."
  },
  {
    "id": "thinking",
    "group": "ai",
    "term": "Thinking",
    "short": "The step-by-step working a reasoning model does before it answers. Many tools let you read it, which shows you what the AI understood.",
    "full": "Thinking is the name many tools give to a reasoning model's working. It often appears as a collapsed panel above the answer. It is worth opening when something goes wrong. You can usually see the exact moment the model misread your request, which tells you what to say more precisely next time. Thinking is a summary of how the model got there, not a perfect record of it, so treat it as a clue rather than a confession."
  },
  {
    "id": "harness",
    "group": "ai",
    "term": "Harness",
    "short": "The program wrapped around an AI model that gives it tools and permissions, such as Claude Code or Codex. The model thinks; the harness lets it act.",
    "full": "A harness is the software that connects a model to the real world. It gives the model its tools, decides what it is allowed to do without asking, shows you what it is doing, and keeps track of the conversation. Claude Code, OpenAI Codex, GitHub Copilot in agent mode, Cursor and Gemini CLI are all harnesses. Most can run on your own computer, and many can also run in the cloud. The same model can feel very different in different harnesses."
  },
  {
    "id": "coding-agent",
    "group": "ai",
    "term": "Coding agent",
    "short": "An agentic AI, inside a harness, that can read and change the files of a project, run it and check its own work.",
    "full": "A coding agent is what you get when an agentic model is placed in a harness with access to a project. You describe what you want in plain language. It reads the project to understand it, makes the changes, runs the result, and checks it, often in a real browser. Then it tells you what it did. Your job moves from typing code to describing clearly, checking carefully, and deciding."
  },
  {
    "id": "generative-ai",
    "group": "ai",
    "term": "Generative AI",
    "short": "AI that makes new content, such as text, images, audio or code, rather than only sorting or searching content that already exists.",
    "full": "Generative AI produces something new each time you ask: a paragraph, a picture, a song, a page of code. The models behind chatbots and coding agents are generative. So are image and music generators. The same technology that writes a useful function can also fill the world with careless images and text, which is why how it is used matters as much as what it can do."
  },
  // from codewithai
  {
    "id": "live-preview",
    "group": "agent",
    "term": "Live Preview",
    "short": "A VS Code extension from Microsoft that shows your webpage next to your code. The page updates as you type.",
    "full": "Live Preview is an extension made by Microsoft. It opens your webpage inside VS Code, beside your code. When you change the file, the preview changes too. You do not need to save and reload. It works by running a small server on your computer. The address starts with `localhost`. That address only works on your own computer."
  },
  // from codewithai
  {
    "id": "diff",
    "group": "agent",
    "term": "Diff",
    "short": "A view that shows exactly what changed in a file. Removed lines are red and added lines are green.",
    "full": "A diff shows the difference between two versions of a file. Removed lines are red. Added lines are green. In VS Code, click a changed file in Source Control to see its diff. Read the diff before every commit. Read it before you keep a change from Copilot, too. It is the fastest way to see what really changed."
  },
  // from codewithai
  {
    "id": "terminal",
    "group": "agent",
    "term": "Terminal",
    "short": "The window where you type commands to the computer, instead of clicking.",
    "full": "The terminal is a program that opens a text window into your computer. You type a command and press Enter. Then the computer prints its answer. The name comes from the old physical terminals. Before screens had windows, those were the only way to use a computer. Almost every developer tool expects you to run it this way. So if you learn about a dozen commands, you can use most of the software you will meet."
  },
  // from codewithai
  {
    "id": "localhost",
    "group": "agent",
    "term": "localhost",
    "short": "A name that always means this computer. A web address that starts with `localhost` is a site on your own machine, not on the internet.",
    "full": "`localhost` is the address a computer uses to talk to itself. When you start a website you are building, it usually appears at an address such as `localhost:3000`. The number is the port. It says which door on the machine the program is listening at. Only you can see it. That is the point. You can break things freely before anything is published on the internet."
  },
  {
    "id": "local-session",
    "group": "agent",
    "term": "Local session",
    "short": "Running a coding agent on your own computer, where it works on the files in a folder there and can open a live preview.",
    "full": "In a local session the harness runs on your laptop. The agent works directly on a project folder on that machine, can start a small web server, and can open the page in a browser so you both see the same thing. It is the fastest way to work when you are at your desk. The project still needs to be pushed to an online repo if you want it safe, shared or published."
  },
  {
    "id": "cloud-session",
    "group": "agent",
    "term": "Cloud session",
    "short": "Running a coding agent on a server from a browser or phone. It works on a copy of your repo and sends its changes back.",
    "full": "In a cloud session the harness runs on a computer somewhere else. You start it from a web page or a phone app and point it at a repo. It makes its own copy, does the work, and offers the changes back to the repo for you to accept. Nothing needs to be installed, and you can start a job at lunch and check it after class. It only works on projects that live in a repo, which is one more reason to keep them there."
  },
  {
    "id": "house-rules",
    "group": "agent",
    "term": "Rules file",
    "short": "A file in a project, often called CLAUDE.md or AGENTS.md, that the agent reads before it does anything. It holds the project's rules and the reasons for them.",
    "full": "A rules file is class rules for the agent. It sits in the top folder of a project and is read at the start of every session. Good rules say what to do and why: \"Nothing is loaded from another website, because blocked sites stop the page loading\" lets the agent handle situations the rule never named. Different harnesses look for different file names, so check which one yours reads. When the agent makes the same mistake twice, add a rule."
  },
  {
    "id": "brief",
    "group": "agent",
    "term": "Brief",
    "short": "A short document saying who a project is for, where it is used, what done looks like and what it must never do. Written before any code.",
    "full": "A brief is the specification for a project, written in plain language before anything is built. It answers four questions: who uses it, where (a projector, a phone, a school laptop), what done looks like, and what it must never do. With a brief, the first thing you ask the agent for is a plan, not code. The brief is also what every later session reads to remember what the project is for."
  },
  {
    "id": "plan",
    "group": "agent",
    "term": "Plan",
    "short": "The agent's proposal for how to build what the brief describes, written down and agreed before any code is written.",
    "full": "A plan turns a brief into steps. The agent proposes it; you read it, change it and approve it. Large projects get phases with checkpoints, so you can test each stage before the next begins. A written plan also survives the end of a session, which a conversation does not."
  },
  {
    "id": "handoff",
    "group": "agent",
    "term": "Handoff file",
    "short": "A running record the agent updates after every change: what was asked, built and decided. It is the project's memory between sessions.",
    "full": "An agent remembers nothing from one session to the next. A handoff file, often called HANDOFF.md, is how the next session catches up. It holds the current status, open items, problems that have already been solved, and a dated log of every change. The important habit is to make the agent keep it up to date, as a rule in the rules file, rather than writing it yourself. Then you can switch tools, switch models, or come back after a holiday and carry on."
  },
  {
    "id": "permanence",
    "group": "agent",
    "term": "Permanence",
    "short": "Work saved in a repo stays, with its full history. A chat can be closed or forgotten; a repo can be picked up by any session, on any day.",
    "full": "Conversations with an AI are temporary. They fill up, get closed, or are lost when you change tools. A project kept in a repo is permanent: every file, every change and every note is saved with its history. That is what makes it safe to let an agent work on your project, and what lets a cloud session, a local session and you all work on the same thing."
  },
  // from codewithai
  {
    "id": "repo",
    "group": "git",
    "term": "Repository",
    "short": "Usually shortened to repo. A project folder that Git is tracking. It holds the files and their full history.",
    "full": "Repository is a long word, so people almost always say repo. A repo is a project under version control. It is a normal folder plus a hidden folder named `.git`. That hidden folder holds every version of every file you have committed. People say send me the repo, or the repo is on GitHub. They mean the project and its history together, not only the current files."
  },
  // from codewithai
  {
    "id": "commit",
    "group": "git",
    "term": "Commit",
    "short": "One saved point in the history of a project, with a short message that says what changed.",
    "full": "A commit is a snapshot of the project at a moment you choose, with a message that explains the change. Good commits are small and do one thing. Their messages say why, not what, because the change itself already shows what. Committing often costs nothing. It gives you many safe points to return to. It is also the habit that makes AI help safe. Commit before you accept a large suggested change, and you can always undo it."
  },
  // from codewithai
  {
    "id": "revert",
    "group": "git",
    "term": "Revert",
    "short": "To undo a commit by making a new commit that does the opposite. The history keeps both.",
    "full": "In Git, revert has a special meaning. It does not delete a commit. It makes a new commit that does the exact opposite. Your history then shows both the change and the undo. This is the safe way to undo work you have already pushed, because nobody else loses anything. In everyday speech, people also say revert to mean undo any change."
  },
  // from codewithai
  {
    "id": "branch",
    "group": "git",
    "term": "Branch",
    "short": "A separate line of work inside a repository. You can try something without changing the main version.",
    "full": "A branch is a parallel copy of the project history, where you can work freely. The version everyone shares is usually called `main`. To add a feature, you make a branch and do the work there. When it works, you add it back into `main`. Nothing you do on a branch can break the main version. That is why branching is the normal way to work, not an advanced skill."
  },
  // from codewithai
  {
    "id": "merge",
    "group": "git",
    "term": "Merge",
    "short": "To bring the work from one branch into another, so both sets of changes are combined.",
    "full": "Merging joins two lines of work together. Git does it automatically when the changes are in different parts of the files. Sometimes two people changed the same lines. Then Git cannot decide who is right, so it stops with a merge conflict. It marks the section in question, so a person can choose. A conflict is not an error, and nothing is lost. It is Git refusing to guess."
  },
  // from codewithai
  {
    "id": "push-pull",
    "group": "git",
    "term": "Push and pull",
    "short": "Push sends your commits to the shared copy online. Pull brings commits from other people to your copy.",
    "full": "Your repository and the shared one online are two separate copies. Neither one updates itself. Push uploads the commits you made. Pull downloads the commits other people made. Working with anyone else has a rhythm: pull, work, commit, push. In group projects, most trouble comes from forgetting to pull before you start. Then you have to merge a whole day of different work by hand."
  },
  // from codewithai
  {
    "id": "clone",
    "group": "git",
    "term": "Clone",
    "short": "To download a complete copy of a repository, with its whole history, onto your own machine.",
    "full": "Cloning makes your own full copy of a repository. It is different from downloading a zip file. A clone brings the whole history with it. It also stays connected to where it came from. So you can pull later updates, and push your own work back if you have permission. It is usually the first command you run when you join a project that already exists."
  },
  // from codewithai
  {
    "id": "github",
    "group": "git",
    "term": "GitHub",
    "short": "A website that keeps Git repositories online, so people can share code and work on it together.",
    "full": "GitHub is a service that stores repositories on the internet. It adds tools for working together. Each project gets a page. There is a place to report problems. People can also review each other’s changes before they are merged. It is the most popular of several sites like this. Remember that GitHub is not Git. Git is the program on your computer. GitHub is one company’s website for hosting what Git makes."
  },
  // from codewithai
  {
    "id": "pull-request",
    "group": "git",
    "term": "Pull request",
    "short": "A request to merge your branch into the main one. Other people can read and discuss the change first.",
    "full": "A pull request, often shortened to PR, is how a change gets reviewed before it joins the shared project. You open one on a site such as GitHub. It shows exactly which lines you added and removed. Then others can comment, ask questions or ask for changes. This habit is worth learning early. When you explain your change to another person, you often find problems that tests miss."
  },
  // from codewithai
  {
    "id": "version-control",
    "group": "git",
    "term": "Version control",
    "short": "A system that records every change to a project over time. You can see what changed, and go back if you need to.",
    "full": "Version control keeps the history of a project. Each time you save an important change, it records what changed, when and why. It lets you return to any earlier version. You no longer need files named essay-final-v3-really-final. It also makes it safe to try something big. If the experiment fails, the earlier version is still there, exactly as it was."
  },
  // from codewithai
  {
    "id": "html",
    "group": "web",
    "term": "HTML",
    "short": "HyperText Markup Language. It describes what is on a web page: the headings, the paragraphs, the images and the buttons.",
    "full": "HTML stands for HyperText Markup Language. It is not a programming language, because it gives no instructions and makes no decisions. Instead, it labels content, so the browser knows what each part is. This is a heading, this is a paragraph, this is a link. The labels are tags in angle brackets, such as `<p>` for a paragraph. Every web page you have opened is HTML underneath. You can see it yourself with the View Source command in any browser."
  },
  // from codewithai
  {
    "id": "css",
    "group": "web",
    "term": "CSS",
    "short": "Cascading Style Sheets. It decides how a web page looks: colors, spacing, fonts and layout.",
    "full": "CSS stands for Cascading Style Sheets. HTML says what is on the page. CSS says how it should look. You write rules that choose part of the page and change how it looks. Make every heading dark blue. Put 16 pixels of space under every paragraph. Put these three boxes in a row. Cascading means that rules sit on top of each other, and a more specific rule wins over a general one. Every style on this page is CSS."
  },
  // from codewithai
  {
    "id": "javascript",
    "group": "web",
    "term": "JavaScript",
    "short": "The programming language that runs inside a web browser. It makes a page respond when you click, type or scroll.",
    "full": "JavaScript is the programming language built into every web browser. HTML puts content on the page, and CSS makes it look right. But neither of them can react when you press a button. JavaScript can. It reads what you did and changes the page in response. It can also send and receive information over the internet without reloading the page. Despite its name, it has nothing to do with the Java language. The name was a marketing decision in 1995."
  },
  // from codewithai
  {
    "id": "static-site",
    "group": "web",
    "term": "Static site",
    "short": "A website made only of ready files, such as HTML, CSS and images. Every visitor gets the same files.",
    "full": "A static site is made of files that are complete before anyone visits. The server sends them as they are. Every visitor gets the same page. The opposite is a site that builds each page when you ask for it. A shop that shows your own cart works this way. Static sites are fast, safe and often free to host. Everything you build here is a static site."
  },
  {
    "id": "viewport",
    "group": "web",
    "term": "Viewport",
    "short": "The visible area of a web page on a screen. A phone's viewport is narrow; a projector's is wide.",
    "full": "The viewport is the part of a page you can see without scrolling. Its size depends on the device: tall and narrow on a phone, wide and short on a projector. Saying which viewport matters (\"this must fit a 16:9 projector without scrolling\") is one of the most useful pieces of precision you can give an agent."
  },
  {
    "id": "autoplay",
    "group": "web",
    "term": "Autoplay",
    "short": "Media that starts playing by itself when a page or section opens.",
    "full": "Autoplay means a video or sound begins without anyone pressing play. Browsers usually only allow it when the media is muted, so a page that relies on autoplay with sound will often stay silent. Saying exactly when something should play, and whether it should play again, saves several rounds of fixes."
  },
  // from codewithai
  {
    "id": "hosting",
    "group": "publish",
    "term": "Hosting",
    "short": "Keeping your website on a computer that is always on and online, so anyone can visit it.",
    "full": "Hosting means keeping your website on a server that is always online. Your own laptop sleeps and moves, so it cannot host a site for others. A hosting service keeps your files and sends them to every visitor. For a site made of HTML and CSS files, good hosting is free. GitHub Pages and Cloudflare Pages are two examples."
  },
  // from codewithai
  {
    "id": "deploy",
    "group": "publish",
    "term": "Deploy",
    "short": "To publish your project so other people can reach it, not only you on your own machine.",
    "full": "Deploying means putting your finished code where the public can use it. That can be a web host, a server or a service that does it for you. The big change is that a deployed project is no longer only yours. People can see your mistakes. Anything private you added by accident, such as a password or a key, is now on the internet. Check what you are publishing before you publish it."
  },
  // from codewithai
  {
    "id": "domain",
    "group": "publish",
    "term": "Domain name",
    "short": "The name of a website, such as `example.com`. You rent it by the year from a company called a registrar.",
    "full": "A domain name is the address people type to reach a website, like `example.com`. You do not own it forever. You rent it, usually one year at a time, from a company called a registrar. A plain `.com` is the safest choice. Free addresses that end in `pages.dev` do not load in China. A domain you buy fixes this. If you stop paying, someone else can buy the name."
  },
  // from codewithai
  {
    "id": "dns",
    "group": "publish",
    "term": "DNS",
    "short": "Domain Name System. The address book of the internet. It turns a name like `example.com` into the address of a server.",
    "full": "DNS stands for Domain Name System. Computers find each other by number, not by name. DNS turns a domain name into the number of the server that hosts the site. You control this with DNS records, at the company where you bought your domain. A record says which server your name points to. After you change a record, it can take from minutes to a day to work everywhere."
  },
  // from codewithai
  {
    "id": "https",
    "group": "publish",
    "term": "HTTPS",
    "short": "The safe way a browser and a website talk. The connection is encrypted, so other people cannot read it.",
    "full": "HTTPS stands for HyperText Transfer Protocol Secure. It is the set of rules a browser and a server follow to send a page, with encryption added. Encryption scrambles the data. Nobody in between can read it or change it. Browsers warn visitors about sites without it. GitHub Pages and Cloudflare give your site HTTPS for free. Check that it is turned on."
  },
  // from codewithai
  {
    "id": "url",
    "group": "publish",
    "term": "URL",
    "short": "Uniform Resource Locator. The full address of one page or file, such as `https://example.com/about.html`.",
    "full": "URL stands for Uniform Resource Locator. It is the complete address of one thing on the web. In `https://example.com/about.html`, `https` is how to connect, `example.com` is the domain, and `/about.html` is the file. Links in your HTML use URLs. A URL that starts with a folder name, like `images/cat.jpg`, is relative. It starts from the current page."
  },
  {
    "id": "subdomain",
    "group": "publish",
    "term": "Subdomain",
    "short": "A name in front of your domain, such as build.contrapaul.com, that can point at a separate site.",
    "full": "A subdomain lets one domain hold many sites. Once you own a domain, you can create as many subdomains as you like, at no extra cost, and point each one at a different project. Every site in this talk lives on its own subdomain of contrapaul.com."
  },
  {
    "id": "cloudflare-pages",
    "group": "publish",
    "term": "Cloudflare Pages",
    "short": "A free service that publishes a website straight from a GitHub repo, and updates it each time you push.",
    "full": "Cloudflare Pages connects to a repo once, then publishes it as a website. Each time you push a change, it puts the new version online, usually within a minute. A static site needs no build settings at all. It is free for this kind of use, and on your own domain it loads in mainland China, which many hosting services do not."
  },
  {
    "id": "slop",
    "group": "ethics",
    "term": "Slop",
    "short": "Low-effort AI-generated content, such as images, music, text or video, made quickly and with little care. Students increasingly spot it and trust it less.",
    "full": "Slop is the name for AI-generated content made carelessly and in bulk: the over-smooth poster, the background music nobody chose, the paragraph full of \"in today's fast-paced world\". Students are quick to notice it, and they judge both the content and whoever put it in front of them. Avoiding slop is not about avoiding AI. It is about not handing people things nobody cared enough to make."
  },
  {
    "id": "disclosure",
    "group": "ethics",
    "term": "AI disclosure",
    "short": "Saying clearly which parts of a work an AI produced or helped with. Schools ask it of students; teachers can model it.",
    "full": "AI disclosure means telling your audience how AI was used: what it made, what it helped with, and what you did yourself. It can be one line in a footer or a full account of the process. Teachers who disclose their own use make it much easier to ask the same of students, and students who understand how a tool was made, and see what it made possible, are far more likely to value it."
  },
];

export function glossaryTerm(id) {
  return GLOSSARY.find((t) => t.id === id);
}

export function termsInGroup(groupId, terms = GLOSSARY) {
  return terms.filter((t) => t.group === groupId);
}
