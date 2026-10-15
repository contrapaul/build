/* ============================================================
   build.contrapaul.com: bootstrap
   ============================================================ */

import { initTheme } from './theme.js';
import { renderGlossary, initTermCards, focusTerm } from './glossary.js';
import { initDeck } from './deck.js';

initTheme();
renderGlossary(document);
const cards = initTermCards(document);

initDeck({
  onRoute(tab) {
    cards.hide();
    if (tab === 'glossary') requestAnimationFrame(() => focusTerm(document, location.hash));
  },
});
