import { html, mount, DCLogic } from '/assets/js/runtime.js';
class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { menuOpen: false, showCta: false, ben: 0, zoom: false, ph: 0, fl: 0, sc: 0, bl: 0 };
  }
  componentDidMount() {
    this.onScroll = () => { const v = window.scrollY > 520; if (v !== this.state.showCta) this.setState({ showCta: v }); };
    window.addEventListener('scroll', this.onScroll, { passive: true });
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }
  renderVals() {
    const accent = this.props.accent ?? '#D4AF37';
    const mo = this.state.menuOpen;
    const bar = (r) => 'display:block; width:18px; height:2px; border-radius:2px; background:#FFFFFF; transition:transform 0.25s ease, opacity 0.2s ease; ' + r;
    const fdot = (i) => 'display:block; height:8px; border-radius:999px; transition:width 0.3s ease, background 0.3s ease; ' + (i === this.state.fl ? 'width:24px; background:' + accent + ';' : 'width:8px; background:rgba(255,255,255,0.25);');
    return {
      accent,
      menuOpen: mo, menuAria: mo ? 'true' : 'false',
      toggleMenu: () => this.setState({ menuOpen: !this.state.menuOpen }),
      closeMenu: () => this.setState({ menuOpen: false }),
      bar1: bar(mo ? 'transform:translateY(7px) rotate(45deg)' : ''), bar2: bar(mo ? 'opacity:0' : ''), bar3: bar(mo ? 'transform:translateY(-7px) rotate(-45deg)' : ''),
      ...[0, 1, 2].reduce((o, i) => { const open = this.state.ben === i; o['bt' + i] = () => this.setState({ ben: this.state.ben === i ? -1 : i }); o['bA' + i] = open ? 'true' : 'false'; o['bC' + i] = open ? 'is-open' : ''; o['bV' + i] = open ? 'transform:rotate(180deg)' : ''; return o; }, {}),
      ...[0, 1, 2].reduce((o, i) => { const open = this.state.ph === i; o['ph' + i] = () => this.setState({ ph: this.state.ph === i ? -1 : i }); o['phA' + i] = open ? 'true' : 'false'; o['phC' + i] = open ? 'is-open' : ''; o['phV' + i] = open ? 'transform:rotate(180deg)' : ''; return o; }, {}),
      ...[0, 1, 2, 3].reduce((o, i) => { const open = this.state.sc === i; o['sc' + i] = () => this.setState({ sc: this.state.sc === i ? -1 : i }); o['scA' + i] = open ? 'true' : 'false'; o['scC' + i] = open ? 'is-open' : ''; o['scV' + i] = open ? 'transform:rotate(180deg)' : ''; return o; }, {}),
      ...[0, 1, 2, 3].reduce((o, i) => { const open = this.state.bl === i; o['bl' + i] = () => this.setState({ bl: this.state.bl === i ? -1 : i }); o['blA' + i] = open ? 'true' : 'false'; o['blC' + i] = open ? 'is-open' : ''; o['blV' + i] = open ? 'transform:rotate(180deg)' : ''; return o; }, {}),
      fd0: fdot(0), fd1: fdot(1), fd2: fdot(2), fd3: fdot(3),
      onFlow: (e) => { const el = e.currentTarget || e.target; const f = el.firstElementChild; if (!f) return; const step = f.getBoundingClientRect().width + 14; const i = Math.max(0, Math.min(3, Math.round(el.scrollLeft / step))); if (i !== this.state.fl) this.setState({ fl: i }); },
      zoomOn: this.state.zoom,
      zoomOpen: () => this.setState({ zoom: true }),
      zoomClose: () => this.setState({ zoom: false }),
      ctaStyle: 'opacity:1; transform:translateY(0)'
    };
  }
}
Component.view = (v) => html`<div style="font-family:'Montserrat', 'Segoe UI', sans-serif; color:#FFFFFF; background:#070B12; width:100%">
<section class="pgrid" style="padding:0 0 96px">
<header class="wrap" style="width:100%; display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:20px; padding-top:26px; padding-bottom:26px">
<a href="/"><img fetchpriority="high" width="320" height="55" src="/assets/img/logo-320.webp" alt="WIRTIX" style="height:26px; width:auto" /></a>
<nav class="dnav" style="display:flex; flex-wrap:wrap; gap:34px; font-size:13px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase"><a href="/platform" style="color:#E5E9F0; text-decoration:none">Platform</a><a href="/#solusi" style="color:#E5E9F0; text-decoration:none">Solutions</a><a href="/plan-your-event" style="color:#E5E9F0; text-decoration:none">Plan Your Event</a><a href="/company" style="color:#D4AF37; text-decoration:none" aria-current="page">Company</a></nav>
<a href="https://wa.me/6287878781670?text=Halo%20WIRTIX%2C%20saya%20ingin%20menjadwalkan%20demo%20untuk%20acara%20saya." target="_blank" rel="noopener" class="btn dright" style="min-height:44px; padding:0 22px; background:${v.accent}; color:#0A0F18; font-size:12px">Jadwalkan Demo</a>
<button type="button" class="burger" onClick="${v.toggleMenu}" aria-label="Menu" aria-expanded="${v.menuAria}"><span style="${v.bar1}"></span><span style="${v.bar2}"></span><span style="${v.bar3}"></span></button>
</header>
${v.menuOpen ? html`<div class="mmenu"><a href="/platform" onClick="${v.closeMenu}">Platform</a><a href="/#solusi" onClick="${v.closeMenu}">Solutions</a><a href="/plan-your-event" onClick="${v.closeMenu}">Plan Your Event</a><a href="/company" onClick="${v.closeMenu}">Company</a><a href="https://kontrol.usewirtix.com/login" style="color:#D4AF37">Login</a></div>` : null}
<div class="wrap" style="padding-top:56px">
<div style="max-width:980px; margin:0 auto 40px"><svg class="herosvg" viewBox="0 0 1000 300" role="img" aria-label="Dua keahlian bertemu: Enterprise & Smart Commerce Tech dan Live Event Operations menyatu menjadi WIRTIX" style="width:100%; height:auto; display:block; overflow:visible">
<path d="M 0 60 C 260 60, 420 150, 640 150" fill="none" stroke="rgba(110,150,230,0.35)" stroke-width="10" stroke-linecap="round" />
<path class="stream" d="M 0 60 C 260 60, 420 150, 640 150" fill="none" stroke="#7FA6F0" stroke-width="3" stroke-linecap="round" />
<path d="M 0 240 C 260 240, 420 150, 640 150" fill="none" stroke="rgba(212,175,55,0.35)" stroke-width="10" stroke-linecap="round" />
<path class="stream" d="M 0 240 C 260 240, 420 150, 640 150" fill="none" stroke="#D4AF37" stroke-width="3" stroke-linecap="round" />
<text x="0" y="38" fill="#9DB8F2" font-size="17" font-weight="700" font-family="Montserrat, sans-serif">Enterprise & Smart Commerce Tech</text>
<text x="0" y="282" fill="#E6C76A" font-size="17" font-weight="700" font-family="Montserrat, sans-serif">Live Event Operations</text>
<circle cx="770" cy="150" r="130" fill="#0B1528" stroke="#D4AF37" stroke-width="2" />
<circle cx="770" cy="150" r="150" fill="none" stroke="rgba(212,175,55,0.18)" stroke-width="1" />
<image href="/assets/img/logo-320.webp" x="680" y="135" width="180" height="31" />
</svg></div>
<div style="text-align:center"><p class="kicker">Company</p>
<h1 style="margin:0 auto 20px; font-size:clamp(34px, 4.2vw, 60px); line-height:1.08; font-weight:900; letter-spacing:-1px; max-width:880px">Built Where Technology Meets the Gate.</h1>
<p style="margin:0 auto; font-size:18px; line-height:1.7; color:#C9D0DB; max-width:800px">Kami menggabungkan pengalaman teknologi enterprise dan operasional event langsung, agar sistem Anda bekerja sempurna <span style="white-space:nowrap">di hari-H</span>.</p></div>
</div>
</section>
<section class="vision" style="padding:140px 0; text-align:center">
<div class="wrap"><p class="kicker">Our Vision</p>
<h2 style="margin:0 auto; font-size:clamp(28px, 3.4vw, 48px); line-height:1.2; font-weight:900; max-width:900px">Every organizer should own their <span style="color:${v.accent}">stage</span>, their <span style="color:${v.accent}">brand</span>, and their <span style="color:${v.accent}">audience</span>.</h2>
<div style="display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:16px; max-width:820px; margin:64px auto 0">
<div><div class="big">33+</div><p style="margin:10px 0 0; color:#AEB6C4; font-size:14px">tahun pengalaman gabungan</p></div>
<div><div class="big">2</div><p style="margin:10px 0 0; color:#AEB6C4; font-size:14px">dunia keahlian</p></div>
<div><div class="big">1</div><p style="margin:10px 0 0; color:#AEB6C4; font-size:14px">ekosistem</p></div>
</div></div>
</section>
<section class="gbg" style="padding:96px 0; background:#0B111C">
<div class="wrap"><p class="kicker">The Combined Expertise</p><h2 class="h2x">Two Worlds, One Team</h2><p class="sub">Keahlian yang biasanya terpisah di dua perusahaan berbeda, kini bekerja dalam satu tim untuk acara Anda.</p>
<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(min(260px, 100%), 1fr)); gap:16px"><div class="xcard"><div style="width:48px;height:48px;border-radius:14px;background:#12203A;border:1px solid rgba(212,175,55,0.35);display:flex;align-items:center;justify-content:center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${v.accent}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" /></svg></div><div style="flex:1;min-width:0"><button type="button" class="shead" onClick="${v.sc0}" aria-expanded="${v.scA0}"><h3>Enterprise Platforms</h3><span class="phchev schev" aria-hidden="true" style="${v.scV0}">⌄</span></button><div class="sbody ${v.scC0}"><p>Revamp ERP dan arsitektur keamanan akses (IAM) untuk perusahaan.</p></div></div></div><div class="xcard"><div style="width:48px;height:48px;border-radius:14px;background:#12203A;border:1px solid rgba(212,175,55,0.35);display:flex;align-items:center;justify-content:center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${v.accent}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg></div><div style="flex:1;min-width:0"><button type="button" class="shead" onClick="${v.sc1}" aria-expanded="${v.scA1}"><h3>Digital Commerce</h3><span class="phchev schev" aria-hidden="true" style="${v.scV1}">⌄</span></button><div class="sbody ${v.scC1}"><p>Platform B2B yang mendigitalkan distribusi FMCG hingga ke warung, serta integrasi transaksi digital.</p></div></div></div><div class="xcard"><div style="width:48px;height:48px;border-radius:14px;background:#12203A;border:1px solid rgba(212,175,55,0.35);display:flex;align-items:center;justify-content:center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${v.accent}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" /></svg></div><div style="flex:1;min-width:0"><button type="button" class="shead" onClick="${v.sc2}" aria-expanded="${v.scA2}"><h3>AI & IoT Automation</h3><span class="phchev schev" aria-hidden="true" style="${v.scV2}">⌄</span></button><div class="sbody ${v.scC2}"><p>Robotic barista, vending AI dengan telemetri IoT, tol RFID/GNSS, dan face recognition.</p></div></div></div><div class="xcard"><div style="width:48px;height:48px;border-radius:14px;background:#12203A;border:1px solid rgba(212,175,55,0.35);display:flex;align-items:center;justify-content:center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${v.accent}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /><path d="M13 5v2" /><path d="M13 17v2" /><path d="M13 11v2" /></svg></div><div style="flex:1;min-width:0"><button type="button" class="shead" onClick="${v.sc3}" aria-expanded="${v.scA3}"><h3>Large-Scale Event Ops</h3><span class="phchev schev" aria-hidden="true" style="${v.scV3}">⌄</span></button><div class="sbody ${v.scC3}"><p>Ticketing konser, motorsport, dan maraton nasional, dengan kontrol akses untuk ribuan peserta.</p></div></div></div></div></div>
</section>
<section class="gbg" style="padding:96px 0; text-align:center">
<div class="wrap"><p class="kicker">Where Our Experience Comes From</p><h2 class="h2x">Proven Across Industries</h2><p class="sub" style="margin-left:auto; margin-right:auto">Pengalaman dari berbagai industri yang kini kami bawa ke dunia event.</p>
<div class="ind"><div class="indtrack"><div class="indc"><div class="e" aria-hidden="true">🏢</div><b>Enterprise</b><span>ERP & sistem akses</span></div><div class="indc"><div class="e" aria-hidden="true">🛒</div><b>FMCG & Retail</b><span>Distribusi B2B ke warung</span></div><div class="indc"><div class="e" aria-hidden="true">🤖</div><b>Robotics & Vending</b><span>Barista robotik & vending AI</span></div><div class="indc"><div class="e" aria-hidden="true">🛣️</div><b>Smart Toll & Mobility</b><span>RFID, GNSS, pengenalan pelat</span></div><div class="indc"><div class="e" aria-hidden="true">💳</div><b>Digital Payments</b><span>Integrasi transaksi digital</span></div><div class="indc"><div class="e" aria-hidden="true">💬</div><b>Business Messaging</b><span>WhatsApp for Business</span></div><div class="indc"><div class="e" aria-hidden="true">🎫</div><b>Live Events</b><span>Konser, motorsport, maraton</span></div><div class="indc dup" aria-hidden="true"><div class="e">🏢</div><b>Enterprise</b><span>ERP & sistem akses</span></div><div class="indc dup" aria-hidden="true"><div class="e">🛒</div><b>FMCG & Retail</b><span>Distribusi B2B ke warung</span></div><div class="indc dup" aria-hidden="true"><div class="e">🤖</div><b>Robotics & Vending</b><span>Barista robotik & vending AI</span></div><div class="indc dup" aria-hidden="true"><div class="e">🛣️</div><b>Smart Toll & Mobility</b><span>RFID, GNSS, pengenalan pelat</span></div><div class="indc dup" aria-hidden="true"><div class="e">💳</div><b>Digital Payments</b><span>Integrasi transaksi digital</span></div><div class="indc dup" aria-hidden="true"><div class="e">💬</div><b>Business Messaging</b><span>WhatsApp for Business</span></div><div class="indc dup" aria-hidden="true"><div class="e">🎫</div><b>Live Events</b><span>Konser, motorsport, maraton</span></div></div></div></div>
</section>
<section class="gbg" style="padding:96px 0; background:#0B111C">
<div class="wrap"><p class="kicker" style="text-align:center">What We Believe</p><h2 class="h2x" style="text-align:center">Four Promises We Keep</h2>
<p class="sub" style="margin:0 auto 48px; text-align:center">Kami percaya teknologi terbaik bekerja di balik layar. Brand Anda tampil di depan, data audiens tetap menjadi milik Anda, sistem kami dirancang untuk kondisi nyata di lokasi acara, dan setiap hal yang kami janjikan adalah hal yang sanggup kami jalankan.</p>
<div class="belgrid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(min(220px, 100%), 1fr)); gap:36px"><div class="bel"><div style="width:48px;height:48px;border-radius:14px;background:#12203A;border:1px solid rgba(212,175,55,0.35);display:flex;align-items:center;justify-content:center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${v.accent}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg></div><div style="flex:1;min-width:0"><button type="button" class="shead" onClick="${v.bl0}" aria-expanded="${v.blA0}"><h3 style="margin:14px 0 6px;font-size:18px;font-weight:800">Your Brand First</h3><span class="phchev schev" aria-hidden="true" style="${v.blV0}">⌄</span></button><div class="sbody ${v.blC0}"><p style="margin:0;font-size:14px;line-height:1.6;color:#AEB6C4">Kami bekerja di balik layar, brand Anda tetap di depan.</p></div></div></div><div class="bel"><div style="width:48px;height:48px;border-radius:14px;background:#12203A;border:1px solid rgba(212,175,55,0.35);display:flex;align-items:center;justify-content:center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${v.accent}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg></div><div style="flex:1;min-width:0"><button type="button" class="shead" onClick="${v.bl1}" aria-expanded="${v.blA1}"><h3 style="margin:14px 0 6px;font-size:18px;font-weight:800">Your Data Is Yours</h3><span class="phchev schev" aria-hidden="true" style="${v.blV1}">⌄</span></button><div class="sbody ${v.blC1}"><p style="margin:0;font-size:14px;line-height:1.6;color:#AEB6C4">Data audiens tercatat di database Anda.</p></div></div></div><div class="bel"><div style="width:48px;height:48px;border-radius:14px;background:#12203A;border:1px solid rgba(212,175,55,0.35);display:flex;align-items:center;justify-content:center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${v.accent}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" x2="4" y1="22" y2="15" /></svg></div><div style="flex:1;min-width:0"><button type="button" class="shead" onClick="${v.bl2}" aria-expanded="${v.blA2}"><h3 style="margin:14px 0 6px;font-size:18px;font-weight:800">Built for the Field</h3><span class="phchev schev" aria-hidden="true" style="${v.blV2}">⌄</span></button><div class="sbody ${v.blC2}"><p style="margin:0;font-size:14px;line-height:1.6;color:#AEB6C4">Dirancang untuk kondisi nyata di lokasi acara.</p></div></div></div><div class="bel"><div style="width:48px;height:48px;border-radius:14px;background:#12203A;border:1px solid rgba(212,175,55,0.35);display:flex;align-items:center;justify-content:center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${v.accent}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg></div><div style="flex:1;min-width:0"><button type="button" class="shead" onClick="${v.bl3}" aria-expanded="${v.blA3}"><h3 style="margin:14px 0 6px;font-size:18px;font-weight:800">Honest Technology</h3><span class="phchev schev" aria-hidden="true" style="${v.blV3}">⌄</span></button><div class="sbody ${v.blC3}"><p style="margin:0;font-size:14px;line-height:1.6;color:#AEB6C4">Kami hanya menjanjikan yang bisa kami jalankan.</p></div></div></div></div></div>
</section>
<section class="gbg" style="padding:96px 0">
<div class="wrap"><p class="kicker">Founders</p><h2 class="h2x">The People You'll Work With</h2>
<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(min(340px, 100%), 1fr)); gap:16px; margin-top:32px">
<div class="fcard"><img loading="lazy" decoding="async" width="186" height="186" src="/assets/img/septian.webp" alt="Septian Budhi Raharja" /><div><h3 style="margin:0 0 4px; font-size:18px; font-weight:800">Septian Budhi Raharja</h3><p style="margin:0 0 8px; color:${v.accent}; font-size:13px; font-weight:700">President Director</p><p style="margin:0; color:#AEB6C4; font-size:14px; line-height:1.6">Merancang sistem WIRTIX agar mudah terhubung ke kebutuhan klien.</p><a href="https://www.linkedin.com/in/sbraharja/" target="_blank" rel="noopener" class="lnk" aria-label="Let's connect with Septian Budhi Raharja on LinkedIn">Let's connect on <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style="flex:none"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg> LinkedIn</a></div></div>
<div class="fcard"><img loading="lazy" decoding="async" width="186" height="186" src="/assets/img/ody.webp" alt="Muhammad Anindyo Dwinanto" /><div><h3 style="margin:0 0 4px; font-size:18px; font-weight:800">Muhammad Anindyo Dwinanto</h3><p style="margin:0 0 8px; color:${v.accent}; font-size:13px; font-weight:700">Operational Director</p><p style="margin:0; color:#AEB6C4; font-size:14px; line-height:1.6">Mendampingi operasional lapangan dan kemitraan bersama klien.</p><a href="https://www.linkedin.com/in/muhammad-anindyo-2851b610b/" target="_blank" rel="noopener" class="lnk" aria-label="Let's connect with Muhammad Anindyo Dwinanto on LinkedIn">Let's connect on <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style="flex:none"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg> LinkedIn</a></div></div>
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
<a href="https://wa.me/6287878781670?text=Halo%20WIRTIX%2C%20saya%20ingin%20menjadwalkan%20demo%20untuk%20acara%20saya." target="_blank" rel="noopener" class="mcta" style="${v.ctaStyle}">Jadwalkan Demo</a>
</div>`;
mount(Component);
