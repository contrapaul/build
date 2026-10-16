/* ============================================================
   build.contrapaul.com: tabs, frames, keys, router, motion
   ------------------------------------------------------------
   Routing follows make/localai (#/tab/sub). Key handling
   follows edu/curriculum/presentation.js. Reveal-once motion
   follows make/localai/js/motion/scroll.js.

   Addresses
     #/talk/12            Talk tab, frame 12 (1-based)
     #/glossary/agentic   Glossary tab, scrolled to a term
     #/start              a tab, at the frame it was last on

   Keys (every tab with frames; the Talk tab is the slides)
     Down Right PageDown Space   next frame
     Up Left PageUp Shift+Space  previous frame
     Home End                    first, last frame
     1 to 4                      switch tab
     B or .                      blank the screen (clicker button)
     F or F5                     full screen (F5 never reloads)

   A frame taller than the screen (on the Start tab, or on a
   phone) is scrolled through before the next frame is reached.
   ============================================================ */

export const TABS = ['talk', 'start', 'projects', 'glossary'];
const CANONICAL = 'https://build.contrapaul.com/';

const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const wide = () => matchMedia('(min-width: 900px)').matches;

/** Pure: '#/talk/12' -> { tab: 'talk', sub: '12' } */
export function parseHash(hash) {
  const m = /^#\/([a-z]+)(?:\/([a-z0-9-]+))?/i.exec(String(hash || ''));
  if (!m || !TABS.includes(m[1].toLowerCase())) return { tab: 'talk', sub: null };
  return { tab: m[1].toLowerCase(), sub: m[2] ?? null };
}

/* ---------- smooth scrolling ---------------------------------- */

let tween = null;
let tweening = false;
function scrollToY(y) {
  cancelAnimationFrame(tween);
  const root = document.documentElement;
  const start = scrollY;
  const dist = y - start;
  if (reducedMotion() || Math.abs(dist) < 2) { scrollTo(0, y); return; }
  const dur = Math.min(900, 520 + Math.abs(dist) / innerHeight * 140);
  const t0 = performance.now();
  root.classList.add('is-tweening');
  tweening = true;
  const ease = (t) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const tick = (now) => {
    const t = Math.min(1, (now - t0) / dur);
    scrollTo(0, start + dist * ease(t));
    if (t < 1) tween = requestAnimationFrame(tick);
    else { root.classList.remove('is-tweening'); tweening = false; }
  };
  tween = requestAnimationFrame(tick);
}
const stopTween = () => { cancelAnimationFrame(tween); tweening = false; document.documentElement.classList.remove('is-tweening'); };

/* ---------- headline words ------------------------------------ */

/** Wrap every word of [data-words] in a mask, keeping links and spans. */
function splitWords(root) {
  let i = 0;
  const walk = (node) => {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === 3) {
        const frag = document.createDocumentFragment();
        for (const part of child.textContent.split(/(\s+)/)) {
          if (!part) continue;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); continue; }
          const w = document.createElement('span');
          w.className = 'w';
          const inner = document.createElement('span');
          inner.style.setProperty('--wi', i++);
          inner.textContent = part;
          w.appendChild(inner);
          frag.appendChild(w);
        }
        child.replaceWith(frag);
      } else if (child.nodeType === 1 && child.tagName !== 'BR') {
        walk(child);
      }
    }
  };
  walk(root);

  // Punctuation straight after a link ("model</a>, in") must not start a
  // line: bind it to the word before it.
  for (const w of Array.from(root.querySelectorAll('.w'))) {
    const prev = w.previousSibling;
    if (!/^[,.;:!?)’”]/.test(w.textContent) || !prev || prev.nodeType !== 1) continue;
    const keep = document.createElement('span');
    keep.style.whiteSpace = 'nowrap';
    prev.replaceWith(keep);
    keep.append(prev, w);
  }
}

/* ---------- the deck ------------------------------------------ */

export function initDeck({ onRoute } = {}) {
  // The address says which frame to show. Left on 'auto', the browser
  // restores its own scroll position after load and wins.
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  const doc = document;
  const root = doc.documentElement;
  const panels = Object.fromEntries(TABS.map((t) => [t, doc.querySelector(`.tab-panel[data-tab="${t}"]`)]));
  const links = Array.from(doc.querySelectorAll('[data-tab-link]'));
  const rail = doc.querySelector('.rail');
  const remembered = Object.fromEntries(TABS.map((t) => [t, 0]));

  let tab = null;
  let frames = [];
  let cur = 0;

  // Number frames, stagger reveals, split headlines. Once, up front.
  for (const t of TABS) {
    const fs = Array.from(panels[t]?.querySelectorAll('.frame') ?? []);
    fs.forEach((f, n) => {
      f.dataset.n = n + 1;
      if (t === 'talk') {
        const no = doc.createElement('div');
        no.className = 'frame-no';
        no.setAttribute('aria-hidden', 'true');
        no.textContent = `${String(n + 1).padStart(2, '0')} / ${fs.length}`;
        f.appendChild(no);
      }
    });
  }
  for (const h of doc.querySelectorAll('[data-words]')) splitWords(h);
  for (const parent of new Set(Array.from(doc.querySelectorAll('[data-reveal]')).map((e) => e.parentElement))) {
    let i = 0;
    for (const c of parent.children) if (c.hasAttribute('data-reveal')) c.style.setProperty('--i', i++);
  }

  // Reveal once: a frame gets .is-in the first time it is mostly on screen.
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }
  }, { threshold: 0.3 });
  for (const f of doc.querySelectorAll('.frame')) io.observe(f);

  /* ----- rail ----- */
  function buildRail() {
    if (!rail) return;
    rail.textContent = '';
    rail.classList.toggle('is-dense', frames.length > 22);
    rail.hidden = frames.length < 2;
    frames.forEach((f, n) => {
      const b = doc.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', `Frame ${n + 1}`);
      b.addEventListener('click', () => go(n));
      rail.appendChild(b);
    });
  }

  function paintRail() {
    if (!rail) return;
    Array.from(rail.children).forEach((b, n) => {
      b.classList.toggle('is-current', n === cur);
      b.classList.toggle('is-past', n < cur);
    });
    root.style.setProperty('--progress', frames.length > 1 ? cur / (frames.length - 1) : 0);
    const f = frames[cur];
    if (f) root.style.setProperty('--hue-cur', getComputedStyle(f).getPropertyValue('--hue'));
  }

  /* ----- which frame is current ----- */
  function currentIndex() {
    let best = 0;
    let bestVis = -1;
    frames.forEach((f, n) => {
      const r = f.getBoundingClientRect();
      const vis = Math.min(r.bottom, innerHeight) - Math.max(r.top, 0);
      if (vis > bestVis + 1) { best = n; bestVis = vis; }
    });
    return best;
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      if (!frames.length) return;
      const n = currentIndex();
      if (n !== cur && !tweening) {
        cur = n;
        remembered[tab] = n;
        paintRail();
        syncMedia();
        const want = `#/${tab}/${n + 1}`;
        if (location.hash !== want && !(tab === 'glossary')) history.replaceState(null, '', want);
      }
      // Drift between frames: wide screens, motion allowed.
      if (wide() && !reducedMotion()) {
        const mid = innerHeight / 2;
        for (const f of frames) {
          const r = f.getBoundingClientRect();
          if (r.bottom < -innerHeight || r.top > innerHeight * 2) continue;
          const p = Math.max(-1, Math.min(1, (r.top + Math.min(r.height, innerHeight) / 2 - mid) / innerHeight));
          f.style.setProperty('--p', p.toFixed(3));
          f.style.setProperty('--pa', Math.abs(p).toFixed(3));
        }
      }
    });
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll, { passive: true });
  addEventListener('wheel', stopTween, { passive: true });
  addEventListener('touchstart', stopTween, { passive: true });

  /* ----- moving ----- */
  function topOf(f) { return Math.round(scrollY + f.getBoundingClientRect().top); }

  function go(n, { instant = false } = {}) {
    if (!frames.length) return;
    cur = Math.max(0, Math.min(frames.length - 1, n));
    remembered[tab] = cur;
    const y = topOf(frames[cur]);
    if (instant) { stopTween(); scrollTo(0, y); } else scrollToY(y);
    frames[cur].classList.add('is-in');
    paintRail();
    syncMedia();
    history.replaceState(null, '', `#/${tab}/${cur + 1}`);
  }

  function step(dir) {
    if (!frames.length) { scrollToY(scrollY + dir * innerHeight * 0.85); return; }
    // A clicker pressed twice quickly: count from where we are heading,
    // not from where the scroll has got to so far.
    if (tweening) { go(cur + dir); return; }
    const n = currentIndex();
    const r = frames[n].getBoundingClientRect();
    // Inside a tall frame: page through it first.
    if (dir > 0 && r.bottom > innerHeight + 8) {
      // Stop at the frame's bottom edge, so the next press lands cleanly
      // on the next frame.
      scrollToY(scrollY + Math.min(innerHeight * 0.85, r.bottom - innerHeight));
      return;
    }
    if (dir < 0 && r.top < -8 && r.height > innerHeight + 8) {
      scrollToY(scrollY + Math.max(-innerHeight * 0.85, r.top));
      return;
    }
    go(n + dir);
  }

  /* ----- tabs and routing ----- */
  function showTab(name) {
    if (tab === name) return;
    tab = name;
    for (const t of TABS) panels[t]?.classList.toggle('is-active', t === name);
    for (const a of links) {
      const on = a.dataset.tabLink === name;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    }
    root.classList.toggle('is-talk', name === 'talk');
    frames = Array.from(panels[name]?.querySelectorAll('.frame') ?? []);
    cur = 0;
    buildRail();
    doc.title = `${{ talk: 'Talk', start: 'Start', projects: 'Projects', glossary: 'Glossary' }[name]}: build.contrapaul.com`;
  }

  function route() {
    const { tab: t, sub } = parseHash(location.hash);
    const switching = t !== tab;
    showTab(t);
    if (t === 'glossary') {
      if (switching) scrollTo(0, 0);
      onRoute?.(t, sub);
      return;
    }
    const n = sub && /^\d+$/.test(sub) ? Number(sub) - 1 : remembered[t];
    // A tab that was hidden has no layout until this frame paints.
    requestAnimationFrame(() => go(n, { instant: switching }));
    onRoute?.(t, sub);
  }
  addEventListener('hashchange', route);

  /* ----- keys ----- */
  const blank = (on) => root.classList.toggle('is-blank', on);
  const presenting = (on) => root.classList.toggle('is-presenting', on && tab === 'talk');

  function fullscreen() {
    if (doc.fullscreenElement) doc.exitFullscreen?.();
    else root.requestFullscreen?.().catch(() => {});
  }

  doc.addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target;
    if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;

    // Any key wakes a blank screen; the blank keys toggle it.
    if (root.classList.contains('is-blank')) {
      e.preventDefault();
      blank(false);
      return;
    }

    const onControl = t && /^(BUTTON|A)$/.test(t.tagName);
    switch (e.key) {
      case 'ArrowDown': case 'ArrowRight': case 'PageDown':
        e.preventDefault(); presenting(true); step(1); break;
      case 'ArrowUp': case 'ArrowLeft': case 'PageUp':
        e.preventDefault(); presenting(true); step(-1); break;
      case ' ':
        if (onControl) return;
        e.preventDefault(); presenting(true); step(e.shiftKey ? -1 : 1); break;
      case 'Home': e.preventDefault(); go(0); break;
      case 'End': e.preventDefault(); go(frames.length - 1); break;
      case 'b': case 'B': case '.':
        e.preventDefault(); blank(true); break;
      case 'f': case 'F': case 'F5':
        e.preventDefault(); fullscreen(); break;
      case '1': case '2': case '3': case '4':
        e.preventDefault(); location.hash = `#/${TABS[Number(e.key) - 1]}`; break;
      default:
    }
  });

  // Moving the mouse brings the bar back.
  let lastXY = null;
  addEventListener('mousemove', (e) => {
    if (lastXY && Math.hypot(e.clientX - lastXY[0], e.clientY - lastXY[1]) > 24) presenting(false);
    lastXY = [e.clientX, e.clientY];
  }, { passive: true });

  /* ----- video and slideshows follow the current frame ----- */
  // A clip loads only when its frame is current or next door, plays while
  // its frame is current, and pauses otherwise, so phones never download
  // video for frames they do not reach.
  const still = reducedMotion();
  function syncMedia() {
    for (const v of doc.querySelectorAll('video[data-clip]')) if (!frames.some((f) => f.contains(v))) v.pause();
    for (const s of doc.querySelectorAll('[data-slides]')) if (!frames.some((f) => f.contains(s))) s.dataset.live = '';
    frames.forEach((f, n) => {
      const near = Math.abs(n - cur) <= 1;
      for (const v of f.querySelectorAll('video[data-clip]')) {
        if (near && v.preload !== 'auto') { v.preload = 'auto'; v.load(); }
        if (n === cur && !still) v.play().catch(() => {});
        else v.pause();
      }
      for (const s of f.querySelectorAll('[data-slides]')) s.dataset.live = n === cur ? '1' : '';
    });
  }
  for (const v of doc.querySelectorAll('video[data-clip]')) {
    v.muted = true;
    if (still) v.controls = true;
  }

  // Slideshows: one screen at a time, advancing while their frame is current.
  for (const s of doc.querySelectorAll('[data-slides]')) {
    const figs = Array.from(s.querySelectorAll('figure'));
    const dots = s.querySelector('.dots');
    let i = 0;
    const show = (n) => {
      i = (n + figs.length) % figs.length;
      figs.forEach((f, k) => f.classList.toggle('is-on', k === i));
      Array.from(dots?.children ?? []).forEach((d, k) => d.classList.toggle('is-on', k === i));
    };
    figs.forEach((_, k) => {
      const b = doc.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', `Screen ${k + 1}`);
      b.addEventListener('click', () => show(k));
      dots?.appendChild(b);
    });
    show(0);
    const ms = Number(s.dataset.slides) || 2600;
    setInterval(() => { if (s.dataset.live === '1' && !doc.hidden) show(i + 1); }, ms);
  }

  /* ----- QR codes: drawn here, nothing fetched ----- */
  for (const box of doc.querySelectorAll('[data-qr]')) {
    try {
      const url = new URL(box.dataset.qr, CANONICAL).href;
      const qr = globalThis.qrcode(0, 'M');
      qr.addData(url);
      qr.make();
      box.innerHTML = qr.createSvgTag({ cellSize: 1, margin: 0, scalable: true });
      box.setAttribute('role', 'img');
      box.setAttribute('aria-label', `QR code for ${url}`);
    } catch { box.remove(); }
  }

  /* ----- copy buttons ----- */
  for (const btn of doc.querySelectorAll('[data-copy]')) {
    btn.addEventListener('click', async () => {
      const src = doc.getElementById(btn.dataset.copy);
      try {
        await navigator.clipboard.writeText(src.textContent);
        btn.textContent = 'Copied';
        btn.classList.add('is-done');
        setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('is-done'); }, 1800);
      } catch { btn.textContent = 'Select and copy'; }
    });
  }

  route();
  return { go, step, route };
}
