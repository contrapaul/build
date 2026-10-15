/* ============================================================
   build.contrapaul.com: theme
   ------------------------------------------------------------
   Adapted from make/tools/codewithai/js/theme.js.

   - Dark by default: the projector and the showcase look.
   - On a phone-sized screen, follow the phone's light or dark
     setting instead (the light theme is for phones).
   - A manual toggle persists to localStorage('build-theme').
   - Precedence: hash (#light/#dark) > stored choice > default.

   The pre-paint snippet in index.html <head> mirrors
   resolveInitialTheme(): keep the two in step.
   ============================================================ */

export const STORAGE_KEY = 'build-theme';
const NARROW = '(max-width: 760px)';

const isTheme = (v) => v === 'light' || v === 'dark';

/** Pure: 'light' | 'dark'. */
export function resolveInitialTheme({ stored = null, narrow = false, systemDark = true, hash = '' } = {}) {
  const h = String(hash || '').replace(/^#/, '').toLowerCase();
  if (isTheme(h)) return h;
  if (isTheme(stored)) return stored;
  if (narrow) return systemDark ? 'dark' : 'light';
  return 'dark';
}

function read() { try { return localStorage.getItem(STORAGE_KEY); } catch { return null; } }
function write(v) { try { localStorage.setItem(STORAGE_KEY, v); } catch { /* private mode */ } }
const mq = (q) => { try { return matchMedia(q); } catch { return null; } };

export function initTheme(doc = document) {
  const narrowMq = mq(NARROW);
  const darkMq = mq('(prefers-color-scheme: dark)');
  const stored = read();

  let theme = resolveInitialTheme({
    stored,
    narrow: !!narrowMq?.matches,
    systemDark: !!darkMq?.matches,
    hash: location.hash,
  });
  const apply = () => doc.documentElement.setAttribute('data-theme', theme);
  apply();

  const buttons = Array.from(doc.querySelectorAll('[data-theme-toggle]'));
  const label = () => {
    for (const b of buttons) {
      b.textContent = theme === 'dark' ? 'Light' : 'Dark';
      b.setAttribute('aria-label', `Switch to the ${theme === 'dark' ? 'light' : 'dark'} theme`);
    }
  };
  label();

  // Until someone chooses, keep following the device.
  const follow = () => {
    if (isTheme(read())) return;
    theme = resolveInitialTheme({ narrow: !!narrowMq?.matches, systemDark: !!darkMq?.matches });
    apply(); label();
  };
  narrowMq?.addEventListener?.('change', follow);
  darkMq?.addEventListener?.('change', follow);

  for (const b of buttons) {
    b.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      write(theme); apply(); label();
    });
  }
  return { get theme() { return theme; } };
}
