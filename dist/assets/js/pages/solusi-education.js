import { html, mount, DCLogic } from '/assets/js/runtime.js';
class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { menuOpen: false, showCta: false, ben: 0, zoom: false };
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
    return {
      accent,
      menuOpen: mo, menuAria: mo ? 'true' : 'false',
      toggleMenu: () => this.setState({ menuOpen: !this.state.menuOpen }),
      closeMenu: () => this.setState({ menuOpen: false }),
      bar1: bar(mo ? 'transform:translateY(7px) rotate(45deg)' : ''), bar2: bar(mo ? 'opacity:0' : ''), bar3: bar(mo ? 'transform:translateY(-7px) rotate(-45deg)' : ''),
      ...[0, 1, 2].reduce((o, i) => { const open = this.state.ben === i; o['bt' + i] = () => this.setState({ ben: this.state.ben === i ? -1 : i }); o['bA' + i] = open ? 'true' : 'false'; o['bC' + i] = open ? 'is-open' : ''; o['bV' + i] = open ? 'transform:rotate(180deg)' : ''; return o; }, {}),
      zoomOn: this.state.zoom,
      zoomOpen: () => this.setState({ zoom: true }),
      zoomClose: () => this.setState({ zoom: false }),
      ctaStyle: 'opacity:1; transform:translateY(0)'
    };
  }
}
Component.view = (v) => html`<div style="font-family:'Montserrat', 'Segoe UI', sans-serif; color:#FFFFFF; background:#070B12; width:100%">

<section class="shero" style="min-height:640px; display:flex; flex-direction:column">
<header class="wrap" style="width:100%; display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:20px; padding-top:26px; padding-bottom:26px">
<a href="/"><img fetchpriority="high" width="320" height="55" src="/assets/img/logo-320.webp" alt="WIRTIX" style="height:26px; width:auto" /></a>
<nav class="dnav" style="display:flex; flex-wrap:wrap; gap:34px; font-size:13px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase"><a href="/platform" style="color:#E5E9F0; text-decoration:none">Platform</a><a href="/#solusi" style="color:#D4AF37; text-decoration:none" aria-current="page">Solutions</a><a href="/plan-your-event" style="color:#E5E9F0; text-decoration:none">Plan Your Event</a><a href="/company" style="color:#E5E9F0; text-decoration:none">Company</a></nav>
<a href="https://wa.me/6287878781670?text=Halo%20WIRTIX%2C%20saya%20ingin%20menjadwalkan%20demo%20untuk%20acara%20saya." target="_blank" rel="noopener" data-wa="demo" class="btn dright" style="min-height:44px; padding:0 22px; background:${v.accent}; color:#0A0F18; font-size:12px">Jadwalkan Demo</a>
<button type="button" class="burger" onClick="${v.toggleMenu}" aria-label="Menu" aria-expanded="${v.menuAria}"><span style="${v.bar1}"></span><span style="${v.bar2}"></span><span style="${v.bar3}"></span></button>
</header>
${v.menuOpen ? html`
<div class="mmenu"><a href="/platform" onClick="${v.closeMenu}">Platform</a><a href="/#solusi" onClick="${v.closeMenu}">Solutions</a><a href="/plan-your-event" onClick="${v.closeMenu}">Plan Your Event</a><a href="/company" onClick="${v.closeMenu}">Company</a><a href="https://kontrol.usewirtix.com/login" style="color:#D4AF37">Login</a></div>
` : null}
<div class="wrap" style="flex:1; display:flex; flex-direction:column; justify-content:center; padding-bottom:80px">
<p class="kicker">Solutions · Education</p>
<h1 style="margin:0 0 22px; font-size:clamp(36px, 4.2vw, 60px); line-height:1.07; font-weight:900; letter-spacing:-1px; max-width:860px">Graduation Day, Fairly Managed.</h1>
<p style="margin:0 0 34px; font-size:19px; line-height:1.6; color:#C9D0DB; max-width:620px">Untuk wisuda, pentas seni, dan acara sekolah — paket add-on per siswa, kuota tamu yang terkendali, dan pemilihan kursi yang adil.</p>
</div>
</section>

<section style="padding:110px 0">
<div class="wrap">
<p class="kicker">Why It Works</p>
<h2 style="margin:0 0 48px; font-size:clamp(28px, 3vw, 42px); line-height:1.15; font-weight:800">Less Paperwork, Fairer Seats, Happier Parents</h2>
<div class="benrow" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(min(260px, 100%), 1fr)); gap:48px"><div class="bcard" style="border-top:1px solid rgba(255,255,255,0.15); padding-top:24px"><button type="button" class="bhead" onClick="${v.bt0}" aria-expanded="${v.bA0}"><div style="width:52px; height:52px; border-radius:14px; background:#12203A; border:1px solid rgba(212,175,55,0.35); display:flex; align-items:center; justify-content:center; margin-bottom:18px"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${v.accent}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="8" width="18" height="4" rx="1" /><path d="M12 8v13" /><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" /><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" /></svg></div><h3 style="margin:0 0 10px; font-size:22px; font-weight:800">Add-On Packages per Student</h3><span class="bchev" aria-hidden="true" style="${v.bV0}">⌄</span></button><div class="bbody ${v.bC0}"><p style="margin:0; font-size:16px; line-height:1.7; color:#AEB6C4">Paket foto, buku tahunan, dan merchandise dipesan per siswa — tanpa formulir manual dan uang tunai.</p></div></div><div class="bcard" style="border-top:1px solid rgba(255,255,255,0.15); padding-top:24px"><button type="button" class="bhead" onClick="${v.bt1}" aria-expanded="${v.bA1}"><div style="width:52px; height:52px; border-radius:14px; background:#12203A; border:1px solid rgba(212,175,55,0.35); display:flex; align-items:center; justify-content:center; margin-bottom:18px"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${v.accent}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg></div><h3 style="margin:0 0 10px; font-size:22px; font-weight:800">Guest Quota per Student</h3><span class="bchev" aria-hidden="true" style="${v.bV1}">⌄</span></button><div class="bbody ${v.bC1}"><p style="margin:0; font-size:16px; line-height:1.7; color:#AEB6C4">Kuota orang tua dan tamu per siswa terkendali; tamu tambahan bisa berbayar.</p></div></div><div class="bcard" style="border-top:1px solid rgba(255,255,255,0.15); padding-top:24px"><button type="button" class="bhead" onClick="${v.bt2}" aria-expanded="${v.bA2}"><div style="width:52px; height:52px; border-radius:14px; background:#12203A; border:1px solid rgba(212,175,55,0.35); display:flex; align-items:center; justify-content:center; margin-bottom:18px"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${v.accent}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 18v-6a5 5 0 1 1 10 0v6" /><path d="M5 21a1 1 0 0 0 1-1v-1a2 2 0 0 0-4 0v1a1 1 0 0 0 1 1z" /><path d="M21 21a1 1 0 0 0 1-1v-1a2 2 0 0 0-4 0v1a1 1 0 0 0 1 1z" /><path d="M5 19h14" /></svg></div><h3 style="margin:0 0 10px; font-size:22px; font-weight:800">Fair Seat Selection</h3><span class="bchev" aria-hidden="true" style="${v.bV2}">⌄</span></button><div class="bbody ${v.bC2}"><p style="margin:0; font-size:16px; line-height:1.7; color:#AEB6C4">Kursi dipilih saat kuota dibuka, dengan sistem yang dirancang untuk tetap stabil saat permintaan memuncak.</p></div></div></div>
</div>
</section>

<section style="padding:0 0 110px">
<div class="wrap">
<div class="case">
<div style="padding:clamp(28px, 4vw, 52px); display:flex; flex-direction:column; gap:20px">
<div style="display:flex; flex-wrap:wrap; align-items:center; gap:12px"><p class="kicker" style="margin:0">Showcase · School Event</p><span style="font-size:10px; font-weight:900; letter-spacing:2px; padding:5px 10px; border-radius:999px; border:1px solid ${v.accent}; background:transparent; color:${v.accent}">SOLUTION DESIGN</span></div>
<div><h3 style="margin:0 0 8px; font-size:clamp(24px, 2.4vw, 32px); line-height:1.2; font-weight:800">Graduation Add-Ons & Guest Access</h3><p style="margin:0; font-size:15px; font-weight:700; color:${v.accent}">Sell packages per student, control guests and seats fairly</p></div>
<div><p style="margin:0 0 6px; font-size:11px; font-weight:800; letter-spacing:2px; color:#7E889A; text-transform:uppercase">Challenge</p><p style="margin:0; font-size:15px; line-height:1.7; color:#C9D0DB">Wisuda menjual paket foto, buku tahunan, dan merchandise; orang tua berebut kursi depan, dan jumlah tamu harus terkendali.</p></div><div><p style="margin:0 0 6px; font-size:11px; font-weight:800; letter-spacing:2px; color:#7E889A; text-transform:uppercase">Solution</p><p style="margin:0; font-size:15px; line-height:1.7; color:#C9D0DB">Data siswa (NIS) terhubung ke WIRTIX: add-on dipesan per siswa, 2 orang tua + 2 tamu gratis, tamu tambahan berbayar, dan kursi dipilih saat kuota dibuka.</p></div><div><p style="margin:0 0 6px; font-size:11px; font-weight:800; letter-spacing:2px; color:#7E889A; text-transform:uppercase">Expected Outcome</p><p style="margin:0; font-size:15px; line-height:1.7; color:#C9D0DB">Sekolah berjualan tanpa formulir manual dan uang tunai, kursi terbagi adil, dan sistem tetap stabil saat permintaan memuncak.</p></div>
</div>
<div style="background:#0A182F; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:24px"><button type="button" class="zoomable" onClick="${v.zoomOpen}" style="position:relative; width:100%"><img loading="lazy" decoding="async" width="1337" height="880" src="/assets/img/uc04.webp" alt="Ilustrasi add-on store, guest quota 2+2, dan denah kursi panggung" style="width:100%; height:auto; display:block" /><span class="zhint" aria-hidden="true">⤢ Ketuk untuk perbesar</span></button></div>
</div>
</div>
</section>

<section class="ending" style="padding:20px 0 100px">
<div class="wrap" style="text-align:center">
<p class="kicker" style="color:#7E889A">Other Solutions</p>
<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(min(240px, 100%), 1fr)); gap:14px; max-width:900px; margin:0 auto"><a href="/solusi/promotor-eo" style="display:flex; justify-content:space-between; align-items:center; gap:12px; padding:20px 24px; border:1px solid rgba(255,255,255,0.12); border-radius:14px; text-decoration:none; color:#FFFFFF; font-weight:800">Promotor & EO<span style="color:${v.accent}">→</span></a><a href="/solusi/venue-hospitality" style="display:flex; justify-content:space-between; align-items:center; gap:12px; padding:20px 24px; border:1px solid rgba(255,255,255,0.12); border-radius:14px; text-decoration:none; color:#FFFFFF; font-weight:800">Venue & Hospitality<span style="color:${v.accent}">→</span></a><a href="/solusi/corporate-b2b" style="display:flex; justify-content:space-between; align-items:center; gap:12px; padding:20px 24px; border:1px solid rgba(255,255,255,0.12); border-radius:14px; text-decoration:none; color:#FFFFFF; font-weight:800">Corporate & B2B<span style="color:${v.accent}">→</span></a></div>
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
${v.zoomOn ? html`
<div class="lb" role="dialog" aria-modal="true" aria-label="Ilustrasi add-on store, guest quota 2+2, dan denah kursi panggung">
<div class="lb-top"><span>Cubit atau geser untuk melihat detail</span><button type="button" class="lb-x" onClick="${v.zoomClose}" aria-label="Tutup">✕</button></div>
<div class="lb-scroll"><img loading="lazy" decoding="async" width="1337" height="880" src="/assets/img/uc04.webp" alt="Ilustrasi add-on store, guest quota 2+2, dan denah kursi panggung" /></div>
</div>
` : null}
<a href="https://wa.me/6287878781670?text=Halo%20WIRTIX%2C%20saya%20ingin%20menjadwalkan%20demo%20untuk%20acara%20saya." target="_blank" rel="noopener" data-wa="demo" class="mcta" style="${v.ctaStyle}">Jadwalkan Demo</a>

</div>`;
mount(Component);
