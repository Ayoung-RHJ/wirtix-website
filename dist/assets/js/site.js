// Consent-aware Google Analytics 4 + lead tracking for WhatsApp buttons.
const GA_ID = 'G-5SEL7N47JP';
const KEY = 'wirtix-consent';

function store(value) {
  try { localStorage.setItem(KEY, value); } catch (e) { /* storage unavailable */ }
}
function read() {
  try { return localStorage.getItem(KEY); } catch (e) { return null; }
}

let gaLoaded = false;
function loadGA() {
  if (gaLoaded) return;
  gaLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { anonymize_ip: true });
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);
}

function initConsent() {
  const bar = document.getElementById('consent');
  const choice = read();
  if (choice === 'granted') { loadGA(); return; }
  if (choice === 'denied' || !bar) return;
  bar.classList.add('show');
  bar.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-consent]');
    if (!btn) return;
    const value = btn.getAttribute('data-consent');
    store(value);
    bar.classList.remove('show');
    if (value === 'granted') loadGA();
  });
}

// Track every WhatsApp tap as a lead ("whatsapp_click"), tagged with page and button.
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href*="wa.me/"]');
  if (!a || typeof window.gtag !== 'function') return;
  const params = {
    page_path: location.pathname,
    button_text: (a.textContent || '').trim().slice(0, 60),
    button_type: a.getAttribute('data-wa') || (a.href.includes('menjadwalkan%20demo') ? 'demo' : 'consult'),
  };
  if (a.href.includes('merencanakan%20acara')) {
    const msg = decodeURIComponent(a.href.split('text=')[1] || '');
    const type = msg.match(/acara (.+?) untuk/);
    const visitors = msg.match(/±([\d.]+) pengunjung/);
    params.button_type = 'plan';
    if (type) params.event_type = type[1];
    if (visitors) params.visitors = Number(visitors[1].replace(/\./g, ''));
  }
  window.gtag('event', 'whatsapp_click', params);
}, { capture: true });

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initConsent);
} else {
  initConsent();
}
