/* ============================================================
   build.contrapaul.com: glossary tab and hover cards
   ------------------------------------------------------------
   Adapted from make/tools/codewithai/js/tabs/glossary.js,
   English only. One data file (js/data/glossary.js) feeds:

     1. The Glossary tab: every term, grouped and anchored.
     2. Hover cards: any word marked up as
          <a class="gloss" data-term="repo" href="#/glossary/repo">
        shows the short definition on hover or keyboard focus,
        and the link goes to the full entry.

   Touch screens have no hover: the first tap shows the card,
   a second tap on the same word follows the link.

   Code in the data is marked with backticks and is always
   rendered as text inside <code>, never as markup.
   ============================================================ */

import { GLOSSARY, GROUPS, glossaryTerm, termsInGroup } from './data/glossary.js';

/** '#/glossary/repo' -> 'repo' */
export function termIdFromHash(hash) {
  const m = /^#\/glossary\/([a-z0-9-]+)/i.exec(String(hash || ''));
  return m ? m[1].toLowerCase() : null;
}

function appendRich(doc, parent, text) {
  String(text ?? '').split('`').forEach((part, i) => {
    if (!part) return;
    if (i % 2) {
      const c = doc.createElement('code');
      c.textContent = part;
      parent.appendChild(c);
    } else {
      parent.appendChild(doc.createTextNode(part));
    }
  });
}

function el(doc, tag, cls, text) {
  const e = doc.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) appendRich(doc, e, text);
  return e;
}

/* ---------- the Glossary tab ---------------------------------- */

export function renderGlossary(doc) {
  const list = doc.getElementById('glossary-list');
  const index = doc.getElementById('glossary-index');
  if (!list) return 0;
  list.textContent = '';
  if (index) index.textContent = '';

  let n = 0;
  for (const g of GROUPS) {
    const terms = termsInGroup(g.id);
    if (!terms.length) continue;

    const h = el(doc, 'h2', 'gloss-group', g.title);
    h.id = `group-${g.id}`;
    list.appendChild(h);

    if (index) {
      const li = doc.createElement('li');
      const a = doc.createElement('a');
      a.href = `#/glossary/group-${g.id}`;
      a.textContent = g.title;
      li.appendChild(a);
      index.appendChild(li);
    }

    for (const t of terms) {
      const art = el(doc, 'article', 'gloss-entry');
      art.id = t.id;
      art.appendChild(el(doc, 'h3', null, t.term));
      art.appendChild(el(doc, 'p', 'short', t.short));
      art.appendChild(el(doc, 'p', 'full', t.full));
      list.appendChild(art);
      n += 1;
    }
  }
  return n;
}

/* ---------- hover cards --------------------------------------- */

export function initTermCards(doc = document) {
  const card = doc.getElementById('gloss-tip');
  if (!card) return { hide() {} };

  let current = null;
  let touchArmed = null; // the word a first tap opened

  function hide() {
    if (current) current.removeAttribute('aria-describedby');
    current = null;
    card.classList.remove('is-visible');
    card.setAttribute('aria-hidden', 'true');
  }

  function show(a) {
    const t = glossaryTerm(a.dataset.term);
    if (!t) return hide();
    card.textContent = '';
    card.appendChild(el(doc, 'strong', null, t.term));
    card.appendChild(el(doc, 'span', null, t.short));
    card.appendChild(el(doc, 'span', 'tip-more', touchArmed === a ? 'Tap again for the full entry' : 'Click for the full entry'));
    card.setAttribute('aria-hidden', 'false');
    card.classList.add('is-visible');
    a.setAttribute('aria-describedby', 'gloss-tip');
    current = a;

    // Under the word, or above it when there is no room below.
    const r = a.getBoundingClientRect();
    const w = card.offsetWidth;
    const h = card.offsetHeight;
    const left = Math.max(12, Math.min(r.left, innerWidth - w - 12));
    const below = r.bottom + 10;
    const top = below + h > innerHeight - 12 ? Math.max(12, r.top - h - 10) : below;
    card.style.left = `${Math.round(left)}px`;
    card.style.top = `${Math.round(top)}px`;
  }

  const target = (ev) => ev.target?.closest?.('a.gloss[data-term]') ?? null;

  doc.addEventListener('mouseover', (ev) => { const a = target(ev); if (a) show(a); });
  doc.addEventListener('mouseout', (ev) => { if (target(ev)) hide(); });
  doc.addEventListener('focusin', (ev) => { const a = target(ev); if (a) show(a); });
  doc.addEventListener('focusout', (ev) => { if (target(ev)) hide(); });
  doc.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') hide(); });
  addEventListener('scroll', () => { if (current) hide(); }, { passive: true });

  // Touch: first tap shows the card, second tap follows the link.
  doc.addEventListener('click', (ev) => {
    const a = target(ev);
    if (!a) { touchArmed = null; return; }
    const touch = ev.pointerType === 'touch' || (matchMedia('(hover: none)').matches && ev.pointerType !== 'mouse');
    if (touch && touchArmed !== a) {
      ev.preventDefault();
      touchArmed = a;
      show(a);
      return;
    }
    touchArmed = null;
    hide();
  });

  return { hide };
}

/* ---------- deep links ---------------------------------------- */

let lastTarget = null;

/** Scroll to '#/glossary/<id>' and mark it. Returns the element or null. */
export function focusTerm(doc, hash) {
  const id = termIdFromHash(hash);
  if (!id) return null;
  const target = doc.getElementById(id);
  if (!target) return null;
  if (lastTarget && lastTarget !== target) lastTarget.classList.remove('is-target');
  lastTarget = target;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  if (target.classList.contains('gloss-entry')) target.classList.add('is-target');
  return target;
}

export const TERM_COUNT = GLOSSARY.length;
