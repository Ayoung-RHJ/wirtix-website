import { html, mount, DCLogic } from '/assets/js/runtime.js';
class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { menuOpen: false, tocOpen: false, showTop: false };
  }
  componentDidMount() {
    this.onScroll = () => { const v = window.scrollY > 600; if (v !== this.state.showTop) this.setState({ showTop: v }); };
    window.addEventListener('scroll', this.onScroll, { passive: true });
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }
  renderVals() {
    const mo = this.state.menuOpen, to = this.state.tocOpen;
    const bar = (r) => 'display:block; width:18px; height:2px; border-radius:2px; background:#FFFFFF; transition:transform 0.25s ease, opacity 0.2s ease; ' + r;
    return {
      accent: this.props.accent ?? '#D4AF37',
      menuOpen: mo, menuAria: mo ? 'true' : 'false',
      toggleMenu: () => this.setState({ menuOpen: !this.state.menuOpen }),
      closeMenu: () => this.setState({ menuOpen: false }),
      bar1: bar(mo ? 'transform:translateY(7px) rotate(45deg)' : ''), bar2: bar(mo ? 'opacity:0' : ''), bar3: bar(mo ? 'transform:translateY(-7px) rotate(-45deg)' : ''),
      toggleToc: () => this.setState({ tocOpen: !this.state.tocOpen }),
      closeToc: () => this.setState({ tocOpen: false }),
      toTop: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
      topStyle: this.state.showTop ? 'opacity:1; transform:translateY(0)' : 'opacity:0; transform:translateY(16px); pointer-events:none',
      tocAria: to ? 'true' : 'false', tocCls: to ? 'is-open' : '', tocChev: to ? 'transform:rotate(180deg)' : ''
    };
  }
}
Component.view = (v) => html`<div style="font-family:'Montserrat', 'Segoe UI', sans-serif; color:#FFFFFF; background:#070B12; width:100%">
<header style="border-bottom:1px solid rgba(255,255,255,0.08)">
<div class="wrap" style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:20px; padding-top:22px; padding-bottom:22px">
<a href="/"><img fetchpriority="high" width="320" height="55" src="/assets/img/logo-320.webp" alt="WIRTIX" style="height:24px; width:auto" /></a>
<nav class="dnav" style="display:flex; flex-wrap:wrap; gap:30px; font-size:13px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase"><a href="/platform" style="color:#E5E9F0; text-decoration:none">Platform</a><a href="/#solusi" style="color:#E5E9F0; text-decoration:none">Solutions</a><a href="/plan-your-event" style="color:#E5E9F0; text-decoration:none">Plan Your Event</a><a href="/company" style="color:#E5E9F0; text-decoration:none">Company</a></nav>
<div style="display:flex; align-items:center; gap:14px">
<div style="display:flex; border:1px solid rgba(255,255,255,0.2); border-radius:999px; padding:3px; font-size:12px; font-weight:800"><a href="/legal/privacy-policy" aria-current="page" style="padding:6px 12px; border-radius:999px; text-decoration:none; background:${v.accent}; color:#0A0F18">EN</a><a href="/legal/kebijakan-privasi" style="padding:6px 12px; border-radius:999px; text-decoration:none; color:#9AA4B5">ID</a></div>
<a href="https://wa.me/6287878781670?text=Halo%20WIRTIX%2C%20saya%20ingin%20menjadwalkan%20demo%20untuk%20acara%20saya." target="_blank" rel="noopener" data-wa="demo" class="btn dright" style="background:${v.accent}; color:#0A0F18">Schedule a Demo</a>
<button type="button" class="burger" onClick="${v.toggleMenu}" aria-label="Menu" aria-expanded="${v.menuAria}"><span style="${v.bar1}"></span><span style="${v.bar2}"></span><span style="${v.bar3}"></span></button>
</div>
</div>
</header>
${v.menuOpen ? html`
<div class="mmenu"><a href="/platform" onClick="${v.closeMenu}">Platform</a><a href="/#solusi" onClick="${v.closeMenu}">Solutions</a><a href="/plan-your-event" onClick="${v.closeMenu}">Plan Your Event</a><a href="/company" onClick="${v.closeMenu}">Company</a><a href="https://kontrol.usewirtix.com/login" style="color:#D4AF37">Login</a></div>
` : null}
<section style="padding:84px 0 48px; background-image:radial-gradient(ellipse 60% 100% at 20% 0%, rgba(212,175,55,0.08), rgba(212,175,55,0) 70%)">
<div class="wrap">
<p style="margin:0 0 16px; font-size:12px; font-weight:700; letter-spacing:3px; text-transform:uppercase; color:${v.accent}">Legal</p>
<h1 style="margin:0 0 14px; font-size:clamp(34px, 3.6vw, 52px); line-height:1.1; font-weight:900">Privacy Policy</h1>
<p style="margin:0 0 30px; font-size:14px; color:#9AA4B5">Last updated: 1 July 2026 · Effective: 1 July 2026</p>
<div style="display:flex; flex-wrap:wrap; gap:10px"><a href="/legal/privacy-policy" aria-current="page" class="pill" style="background:#FFFFFF; color:#0A0F18">Privacy Policy</a><a href="/legal/terms-conditions" class="pill" style="border:1px solid rgba(255,255,255,0.25); color:#E5E9F0">Terms & Conditions</a></div>
</div>
</section>
<section style="padding:24px 0 100px">
<div class="wrap">
<div class="lgrid">
<aside class="toc">
<button type="button" class="toc-h" onClick="${v.toggleToc}" aria-expanded="${v.tocAria}"><span>On this page</span><span class="toc-chev" aria-hidden="true" style="${v.tocChev}">⌄</span></button>
<div class="toc-list ${v.tocCls}"><a href="#s1" class="toc-a" onClick="${v.closeToc}"><span style="color:${v.accent}; font-weight:800; min-width:22px">1.</span><span>Data Collection Categories</span></a><a href="#s2" class="toc-a" onClick="${v.closeToc}"><span style="color:${v.accent}; font-weight:800; min-width:22px">2.</span><span>Legal Framework & Purpose</span></a><a href="#s3" class="toc-a" onClick="${v.closeToc}"><span style="color:${v.accent}; font-weight:800; min-width:22px">3.</span><span>Data Disclosure, Transfer & Liability</span></a><a href="#s4" class="toc-a" onClick="${v.closeToc}"><span style="color:${v.accent}; font-weight:800; min-width:22px">4.</span><span>Security Protocols & Retention</span></a><a href="#s5" class="toc-a" onClick="${v.closeToc}"><span style="color:${v.accent}; font-weight:800; min-width:22px">5.</span><span>Data Subject Rights</span></a><a href="#s6" class="toc-a" onClick="${v.closeToc}"><span style="color:${v.accent}; font-weight:800; min-width:22px">6.</span><span>Cookie Policy</span></a><a href="#s7" class="toc-a" onClick="${v.closeToc}"><span style="color:${v.accent}; font-weight:800; min-width:22px">7.</span><span>Inquiries</span></a></div>
</aside>
<article>
<p class="lp" style="font-size:17px; color:#E5E9F0; margin-bottom:40px">This policy outlines our protocols for collecting, utilizing, and safeguarding your personal data. By accessing the WIRTIX platform for account creation, ticket purchasing, or event registration, you acknowledge and agree to the terms detailed herein. WIRTIX (PT Wahana Insan Raharja) acts as a Technology Provider (Software as a Service); therefore, we process your data strictly to facilitate the event managed by the respective Event Organizer.</p>
<section id="s1" class="lsec"><h2 class="lh"><span style="color:${v.accent}">1.</span> Data Collection Categories</h2><p class="lp">We process only the information essential for service delivery, specifically:</p><ul class="ll"><li><strong style="color:#FFFFFF">Personal Identification:</strong> Full name, email address, and contact number.</li><li><strong style="color:#FFFFFF">Official Documentation:</strong> National ID numbers or Passports (as per your country of origin), processed specifically for registration verification and security protocols at the event.</li><li><strong style="color:#FFFFFF">Financial Transactions:</strong> Payments are managed via secure, third-party encrypted payment gateways. WIRTIX does not retain or store full credit card or banking information.</li><li><strong style="color:#FFFFFF">Technical Information:</strong> Data such as IP addresses and browser types are used for system security, fraud prevention, and analytical purposes.</li><li><strong style="color:#FFFFFF">Protection of Minors:</strong> We do not knowingly process data for individuals under age 18 without verified and documented consent from a parent or legal guardian.</li></ul></section>
<section id="s2" class="lsec"><h2 class="lh"><span style="color:${v.accent}">2.</span> Legal Framework & Purpose</h2><p class="lp">In compliance with legal obligations, contractual requirements, and your explicit consent, we utilize data to:</p><ul class="ll"><li>Facilitate and confirm event registrations, ticketing, and payment routing.</li><li>Communicate critical updates regarding e-tickets, event logistics, and platform security.</li><li>Provide necessary data to the Event Organizer for venue check-in and identity verification.</li><li>Optimize platform performance and enhance the user experience.</li></ul></section>
<section id="s3" class="lsec"><h2 class="lh"><span style="color:${v.accent}">3.</span> Data Disclosure, Transfer & Liability</h2><ul class="ll"><li><strong style="color:#FFFFFF">Transfer of Liability (Event Organizer Handover):</strong> WIRTIX provides 100% of the collected attendee data directly to the respective Event Organizer via our secure dashboard. Upon this handover or access, the Event Organizer assumes full legal responsibility as the Data Controller. WIRTIX is strictly indemnified and holds no legal liability for any data breaches, misuse, unauthorized marketing, or negligence conducted by the Event Organizer or their third parties post-event.</li><li><strong style="color:#FFFFFF">Authorized Sharing:</strong> Data is shared exclusively with the Event Organizer and essential official payment partners. WIRTIX maintains a strict zero-tolerance policy against the unauthorized sale of personal information.</li><li><strong style="color:#FFFFFF">International Processing:</strong> Data may be processed on secure cloud servers outside of Indonesia. All cross-border transfers strictly adhere to Indonesia’s Personal Data Protection Law (UU PDP).</li></ul></section>
<section id="s4" class="lsec"><h2 class="lh"><span style="color:${v.accent}">4.</span> Security Protocols & Retention</h2><p class="lp">We employ industry-standard technical and organizational measures (including encryption and secure offline-first architectures) to prevent unauthorized access. Personal data is retained on WIRTIX servers only for the duration necessary to fulfill platform service objectives or as mandated by Indonesian statutory record-keeping laws.</p></section>
<section id="s5" class="lsec"><h2 class="lh"><span style="color:${v.accent}">5.</span> Data Subject Rights</h2><p class="lp">Pursuant to the laws and regulations regarding personal data protection in Indonesia, you are entitled to:</p><ul class="ll"><li><strong style="color:#FFFFFF">Access & Rectification:</strong> Request a copy of your personal data or correct inaccurate information within the WIRTIX platform.</li><li><strong style="color:#FFFFFF">Withdrawal & Erasure:</strong> Rescind your consent or request the permanent deletion of your data from our systems. (Note: For data already transferred to the Event Organizer, requests must be directed to them.)</li><li><strong style="color:#FFFFFF">Portability & Objection:</strong> Request your data in a structured format or contest automated processing activities.</li><li><strong style="color:#FFFFFF">Marketing Preferences:</strong> Manage or opt out of promotional communications via account settings or provided links.</li></ul></section>
<section id="s6" class="lsec"><h2 class="lh"><span style="color:${v.accent}">6.</span> Cookie Policy</h2><p class="lp">Our platform utilizes cookies for session management, security, and traffic analysis. While you may disable cookies via your browser settings, please note that this may limit certain functional features of the ticketing platform.</p></section>
<section id="s7" class="lsec"><h2 class="lh"><span style="color:${v.accent}">7.</span> Inquiries</h2><p class="lp">To exercise your rights or for further clarification regarding WIRTIX data practices, please contact us at:</p><ul class="ll"><li><strong style="color:#FFFFFF">Email:</strong> mau@usewirtix.com</li><li><strong style="color:#FFFFFF">Address:</strong> PT Wahana Insan Raharja, Kemang Point, Lt. 3, Jl. Kemang Raya No. 12, Jakarta Selatan 12720</li></ul></section>

<div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:16px; border:1px solid rgba(212,175,55,0.35); border-radius:16px; padding:24px 28px; background:#0B1324">
<div><p style="margin:0 0 4px; font-size:17px; font-weight:800">Questions about this policy?</p><p style="margin:0; font-size:14px; color:#AEB6C4">Our team is happy to help.</p></div>
<a href="mailto:mau@usewirtix.com" style="font-weight:800; text-decoration:none">mau@usewirtix.com →</a>
</div>
<div class="endnav"><a href="/">← Back to Home</a><a href="/legal/terms-conditions" style="text-align:right">Read the Terms & Conditions →</a></div>
</article>
</div>
</div>
</section>
<div id="site-footer">
<section id="demo" class="fcta" style="padding:150px 0 120px">
<div class="wrap fcta-grid">
<div style="min-width:0">
<p class="kicker">Get Started</p>
<h2 style="margin:0 0 18px; font-size:clamp(32px, 3.6vw, 52px); line-height:1.1; font-weight:900; letter-spacing:-0.5px">Take Full Control of Your Event Ecosystem</h2>
<p style="margin:0; font-size:17px; line-height:1.7; color:#C9D0DB">Untuk kebutuhan standar, halaman tiket ber-brand Anda bisa siap jual dalam 48 jam setelah informasi acara Anda lengkap kami terima.</p>
</div>
<div style="display:flex; flex-wrap:wrap; gap:14px">
<a href="https://wa.me/6287878781670?text=Halo%20WIRTIX%2C%20saya%20ingin%20menjadwalkan%20demo%20untuk%20acara%20saya." target="_blank" rel="noopener" data-wa="demo" class="btn" style="background:#D4AF37; color:#0A0F18">Jadwalkan Demo</a>
<a href="https://wa.me/6287878781670?text=Halo%20WIRTIX%2C%20saya%20ingin%20konsultasi%20untuk%20acara%20saya." target="_blank" rel="noopener" class="btn" style="border:1px solid rgba(255,255,255,0.35); color:#FFFFFF">Chat via WhatsApp</a>
</div>
</div>
</section>
<footer style="padding:0 0 36px">
<div class="wrap">
<div aria-hidden="true" style="height:1px; background:linear-gradient(90deg, rgba(212,175,55,0), rgba(212,175,55,0.5) 50%, rgba(212,175,55,0)); margin-bottom:64px"></div>
<div class="fgrid">
<div style="min-width:0">
<img loading="lazy" decoding="async" width="520" height="89" src="/assets/img/logo-320.webp" alt="WIRTIX" style="height:28px; width:auto; margin-bottom:20px" />
<p style="margin:0 0 24px; font-size:15px; line-height:1.7; color:#AEB6C4; max-width:380px">Teknologi andal di balik layar, untuk acara yang sepenuhnya milik Anda.</p>
<div style="display:flex; flex-direction:column; gap:12px; font-size:14px; color:#C9D0DB">
<span style="display:flex; gap:10px; align-items:flex-start"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg><span>Kemang Point, Lt. 3, Jl. Kemang Raya No. 12<br />Jakarta Selatan 12720</span></span>
<span style="display:flex; gap:10px; align-items:center"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg><span>mau@usewirtix.com</span></span>
<span style="display:flex; gap:10px; align-items:center"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg><a href="tel:+622122716290" style="color:#C9D0DB; text-decoration:none">+62 21 2271 6290</a></span>
</div>
</div>
<div class="fcol"><strong style="color:#FFFFFF; font-size:13px; letter-spacing:2px; text-transform:uppercase">Platform</strong><a href="/platform">Ticketing & Seating</a><a href="/platform">Gate Access</a><a href="/platform">POS & Payments</a><a href="/platform">CRM & Analytics</a></div>
<div class="fcol"><strong style="color:#FFFFFF; font-size:13px; letter-spacing:2px; text-transform:uppercase">Solutions</strong><a href="/solusi/promotor-eo">Promotor & EO</a><a href="/solusi/venue-hospitality">Venue & Hospitality</a><a href="/solusi/corporate-b2b">Corporate & B2B</a><a href="/solusi/education">Education</a></div>
<div class="fcol"><strong style="color:#FFFFFF; font-size:13px; letter-spacing:2px; text-transform:uppercase">Company</strong><a href="/company">Company</a><a href="/plan-your-event">Plan Your Event</a><a href="mailto:mau@usewirtix.com">Contact</a><a href="https://kontrol.usewirtix.com/login">Login</a></div>
</div>
<div class="fbot" style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:16px; padding-top:28px; border-top:1px solid rgba(255,255,255,0.08); font-size:13px; color:#7E889A">
<span>© 2026 PT Wahana Insan Raharja</span>
<span style="display:flex; gap:20px"><a href="/legal/kebijakan-privasi" style="color:#9AA4B5; text-decoration:none">Kebijakan Privasi</a><a href="/legal/syarat-ketentuan" style="color:#9AA4B5; text-decoration:none">Syarat & Ketentuan</a></span>
<span style="display:flex; gap:10px"><a href="https://www.linkedin.com/company/wirtix/" target="_blank" rel="noopener" class="soc" aria-label="LinkedIn WIRTIX"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9D0DB" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg></a></span>
</div>
</div>
</footer>
</div>
<button type="button" class="totop" onClick="${v.toTop}" aria-label="Back to top" title="Back to top" style="${v.topStyle}"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A0F18" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m18 15-6-6-6 6" /></svg></button>
</div>`;
mount(Component);
