// WIRTIX site runtime: tiny component layer on top of Preact + htm (bundled locally).
import { html, render, Component } from './vendor/preact-htm.js';

// Base class used by every page component (same API the designs were built with).
export class DCLogic extends Component {
  render() {
    return this.constructor.view(this.renderVals());
  }
}

// Hydrates the server-rendered markup inside <main id="main"> with the page component.
// Hydration starts on the visitor's first interaction (or after a few seconds), so the
// first paint and first tap are never blocked by JavaScript. The page is fully readable before that.
export function mount(PageComponent) {
  const root = document.getElementById('main');
  if (!root) return;
  let done = false;
  const events = ['pointerdown', 'touchstart', 'keydown', 'scroll', 'wheel', 'mousemove'];
  const go = () => {
    if (done) return;
    done = true;
    events.forEach((e) => window.removeEventListener(e, go, true));
    render(html`<${PageComponent} />`, root);
  };
  events.forEach((e) => window.addEventListener(e, go, { capture: true, passive: true }));
  const later = () => setTimeout(go, 4000);
  if (document.readyState === 'complete') later();
  else window.addEventListener('load', later, { once: true });
}

export { html };
