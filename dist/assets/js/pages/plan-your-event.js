import { html, mount, DCLogic } from '/assets/js/runtime.js';
class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { menuOpen: false, type: 'corporate', visitors: 2000, win: 60, needs: ['gate', 'wa'], tenants: 10, scan: null, step: 1 };
  }
  renderVals() {
    const accent = this.props.accent ?? '#D4AF37';
    const st = this.state;
    const T = { concert: ['Concert / Festival', 90], sports: ['Sports', 90], corporate: ['Corporate', 60], school: ['School', 60], expo: ['Expo / Venue', 180] };
    const N = { ticket: 'Ticket sales', seat: 'Seating plan', gate: 'Gate access', pos: 'F&B / merch POS', wa: 'WhatsApp e-ticket', data: 'Sponsor data' };
    const MOD = { ticket: 'Ticketing', seat: 'Seating Plan', gate: 'Gate Access', pos: 'POS & Payments', wa: 'WhatsApp Bot', data: 'CRM & Analytics' };
    const SIM = { concert: 'Motorsport — White-Label Ticketing', sports: 'Motorsport — White-Label Ticketing', corporate: 'Corporate — QR Wristband 4.5K+', school: 'School — Graduation Add-Ons', expo: 'Lifestyle Expo — Closed-Loop POS' };
    const on = 'background:' + accent + '; color:#0A0F18; border:1px solid ' + accent + ';';
    const off = 'background:transparent; color:#E5E9F0; border:1px solid rgba(255,255,255,0.25);';
    const rec = Math.max(1, Math.ceil(st.visitors / (500 * st.win / 60)));
    const scan = st.scan == null ? rec : st.scan;
    const timeMin = Math.ceil(st.visitors / (500 * scan) * 60);
    const ok = timeMin <= st.win;
    const standby = Math.max(1, Math.ceil(scan / 5));
    const hasPos = st.needs.includes('pos');
    const scheme = (st.needs.includes('ticket') ? 'Transaction-Based' : 'Data Acquisition') + (hasPos ? ' + POS & Merchant' : '');
    const modules = st.needs.map((k) => MOD[k]);
    const over = Math.max(0, timeMin - st.win);
    const qn = Math.min(60, Math.round(over / Math.max(st.win, 1) * 30));
    const laneCount = Math.min(scan, 10);
    const fmt = (n) => n.toLocaleString('id-ID');
    const msg = 'Halo WIRTIX, saya merencanakan acara ' + T[st.type][0] + ' untuk ±' + fmt(st.visitors) + ' pengunjung, waktu masuk ' + st.win + ' menit. Rekomendasi: ' + scan + ' scanner + ' + standby + ' cadangan, 1 edge server' + (hasPos ? ', ' + st.tenants + ' POS' : '') + '. Skema: ' + scheme + '. Saya ingin konsultasi.';
    const mo = st.menuOpen;
    const bar = (r) => 'display:block; width:18px; height:2px; border-radius:2px; background:#FFFFFF; transition:transform 0.25s ease, opacity 0.2s ease; ' + r;
    const step = st.step;
    return {
      accent,
      w1: step === 1 ? 'is-cur' : '', w2: step === 2 ? 'is-cur' : '', w3: step === 3 ? 'is-cur' : '', w4: step === 4 ? 'is-cur' : '',
      stepNo: Math.min(step, 4), progStyle: 'width:' + (Math.min(step, 4) * 25) + '%',
      nextLabel: step >= 4 ? 'Lihat Rekomendasi →' : 'Lanjut →',
      backStyle: step > 1 ? '' : 'visibility:hidden',
      wNext: () => this.setState({ step: Math.min(5, this.state.step + 1) }),
      wBack: () => this.setState({ step: Math.max(1, this.state.step - 1) }),
      wEdit: () => this.setState({ step: 1 }),
      resCls: step >= 5 ? 'is-cur' : '', doneCls: step >= 5 ? 'wdone' : '',
      menuOpen: mo, menuAria: mo ? 'true' : 'false',
      toggleMenu: () => this.setState({ menuOpen: !this.state.menuOpen }),
      closeMenu: () => this.setState({ menuOpen: false }),
      bar1: bar(mo ? 'transform:translateY(7px) rotate(45deg)' : ''), bar2: bar(mo ? 'opacity:0' : ''), bar3: bar(mo ? 'transform:translateY(-7px) rotate(-45deg)' : ''),
      types: Object.keys(T).map((k) => ({ label: T[k][0], style: k === st.type ? on : off, pick: () => this.setState({ type: k, win: T[k][1], scan: null }) })),
      needs: Object.keys(N).map((k) => ({ label: N[k], on: st.needs.includes(k) ? 'true' : 'false', style: st.needs.includes(k) ? on : off,
        pick: () => this.setState({ needs: this.state.needs.includes(k) ? this.state.needs.filter((x) => x !== k) : Object.keys(N).filter((x) => x === k || this.state.needs.includes(x)) }) })),
      visitors: st.visitors, visitorsLabel: fmt(st.visitors), win: st.win, tenants: st.tenants, hasPos,
      setVisitors: (e) => this.setState({ visitors: Number(e.target.value), scan: null }),
      setWin: (e) => this.setState({ win: Number(e.target.value), scan: null }),
      tenMinus: () => this.setState({ tenants: Math.max(1, this.state.tenants - 1) }),
      tenPlus: () => this.setState({ tenants: Math.min(200, this.state.tenants + 1) }),
      rec, scan, standby, timeMin, timeMark: ok ? '✓' : '',
      scMinus: () => this.setState({ scan: Math.max(1, scan - 1) }),
      scPlus: () => this.setState({ scan: Math.min(200, scan + 1) }),
      timeBox: 'padding:12px 16px; border-radius:12px; ' + (ok ? 'background:rgba(212,175,55,0.14); color:' + accent + '; border:1px solid ' + accent + ';' : 'background:rgba(224,168,75,0.12); color:#E0A84B; border:1px solid #E0A84B;'),
      queueBox: qn > 0 ? '' : 'min-height:0',
      qdots: Array.from({ length: qn }, (_, i) => i),
      lanes: Array.from({ length: laneCount }, (_, i) => i),
      laneNote: scan > laneCount ? 'Menampilkan 10 dari ' + scan + ' gerbang' : (qn > 0 ? 'Antrean menumpuk — tambah scanner untuk mempercepat' : 'Arus masuk lancar'),
      typeLabel: T[st.type][0], scheme, modules: modules.length ? modules : ['Pilih kebutuhan di langkah 4'],
      similar: SIM[st.type],
      waLink: 'https://wa.me/6287878781670?text=' + encodeURIComponent(msg)
    };
  }
}
Component.view = (v) => html`<div style="font-family:'Montserrat', 'Segoe UI', sans-serif; color:#FFFFFF; background:#070B12; width:100%">
<section class="planhero" style="padding:0 0 110px">
<header class="wrap" style="width:100%; display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:20px; padding-top:26px; padding-bottom:26px">
<a href="/"><img fetchpriority="high" width="320" height="55" src="/assets/img/logo-320.webp" alt="WIRTIX" style="height:26px; width:auto" /></a>
<nav class="dnav" style="display:flex; flex-wrap:wrap; gap:34px; font-size:13px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase"><a href="/platform" style="color:#E5E9F0; text-decoration:none">Platform</a><a href="/#solusi" style="color:#E5E9F0; text-decoration:none">Solutions</a><a href="/plan-your-event" style="color:#D4AF37; text-decoration:none" aria-current="page">Plan Your Event</a><a href="/company" style="color:#E5E9F0; text-decoration:none">Company</a></nav>
<a href="https://wa.me/6287878781670?text=Halo%20WIRTIX%2C%20saya%20ingin%20menjadwalkan%20demo%20untuk%20acara%20saya." target="_blank" rel="noopener" class="btn dright" style="min-height:44px; padding:0 22px; background:${v.accent}; color:#0A0F18; font-size:12px">Jadwalkan Demo</a>
<button type="button" class="burger" onClick="${v.toggleMenu}" aria-label="Menu" aria-expanded="${v.menuAria}"><span style="${v.bar1}"></span><span style="${v.bar2}"></span><span style="${v.bar3}"></span></button>
</header>
${v.menuOpen ? html`<div class="mmenu"><a href="/platform" onClick="${v.closeMenu}">Platform</a><a href="/#solusi" onClick="${v.closeMenu}">Solutions</a><a href="/plan-your-event" onClick="${v.closeMenu}">Plan Your Event</a><a href="/company" onClick="${v.closeMenu}">Company</a><a href="https://kontrol.usewirtix.com/login" style="color:#D4AF37">Login</a></div>` : null}
<div class="wrap" style="padding-top:56px; text-align:center">
<p class="kicker">Plan Your Event</p>
<h1 style="margin:0 auto 18px; font-size:clamp(34px, 4.2vw, 58px); line-height:1.08; font-weight:900; letter-spacing:-1px; max-width:860px">Plan Your Event in 60 Seconds.</h1>
<p style="margin:0 auto; font-size:18px; line-height:1.7; color:#C9D0DB; max-width:640px">Jawab 4 pertanyaan singkat dan lihat rekomendasi modul, perangkat, serta skema kemitraan untuk acara Anda.</p>
</div>
</section>
<section class="gbg" style="padding:56px 0 110px">
<div class="wrap ${v.doneCls}" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(min(440px, 100%), 1fr)); gap:28px; align-items:start">
<div style="display:grid; gap:16px">
<div class="wprog"><span>Langkah ${v.stepNo} dari 4</span><div class="wbar"><i style="${v.progStyle}"></i></div></div>
<div class="pbox wstep ${v.w1}"><div class="pstep"><b>1</b><h2>Event Type</h2></div>
<div style="display:flex; flex-wrap:wrap; gap:8px">${(v.types || []).map((t) => html`<button type="button" class="opt" onClick="${t.pick}" style="${t.style}">${t.label}</button>`)}</div></div>
<div class="pbox wstep ${v.w2}"><div class="pstep"><b>2</b><h2>Expected Visitors</h2></div>
<div style="display:flex; align-items:baseline; gap:10px; margin-bottom:6px"><span class="big2">${v.visitorsLabel}</span><span style="color:#9AA4B5">pengunjung</span></div>
<input type="range" min="100" max="50000" step="100" value="${v.visitors}" onInput="${v.setVisitors}" aria-label="Jumlah pengunjung" /></div>
<div class="pbox wstep ${v.w3}"><div class="pstep"><b>3</b><h2>Entry Window</h2></div>
<p style="margin:0 0 10px; color:#AEB6C4; font-size:14px">Berapa lama semua tamu harus sudah masuk?</p>
<div style="display:flex; align-items:baseline; gap:10px; margin-bottom:6px"><span class="big2">${v.win}</span><span style="color:#9AA4B5">menit</span></div>
<input type="range" min="30" max="180" step="15" value="${v.win}" onInput="${v.setWin}" aria-label="Waktu masuk dalam menit" /></div>
<div class="pbox wstep ${v.w4}"><div class="pstep"><b>4</b><h2>What Do You Need?</h2></div>
<div style="display:flex; flex-wrap:wrap; gap:8px">${(v.needs || []).map((n) => html`<button type="button" class="opt" onClick="${n.pick}" style="${n.style}" aria-pressed="${n.on}">${n.label}</button>`)}</div>
${v.hasPos ? html`<div style="margin-top:16px"><p style="margin:0 0 8px; color:#AEB6C4; font-size:14px">Jumlah tenant / kasir</p><div class="stepper"><button type="button" onClick="${v.tenMinus}" aria-label="Kurangi tenant">−</button><span class="big2" style="min-width:56px; text-align:center">${v.tenants}</span><button type="button" onClick="${v.tenPlus}" aria-label="Tambah tenant">+</button></div></div>` : null}
</div>
<div class="wnav"><button type="button" class="wback" onClick="${v.wBack}" style="${v.backStyle}">← Kembali</button><button type="button" class="wnext" onClick="${v.wNext}">${v.nextLabel}</button></div>
</div>
<div class="wres ${v.resCls}" style="display:grid; gap:16px">
<div class="wedit"><span>Rekomendasi untuk acara Anda</span><button type="button" onClick="${v.wEdit}">Ubah jawaban</button></div>
<div class="pbox" style="border-color:rgba(212,175,55,0.45)">
<p class="kicker" style="margin-bottom:10px">Entrance Simulation</p>
<div class="sim">
<div style="display:flex; justify-content:space-between; font-size:11px; letter-spacing:1.5px; text-transform:uppercase; color:#7E889A; margin-bottom:6px"><span>Antrean</span><span>Gerbang</span></div>
<div class="queue" style="${v.queueBox}">${(v.qdots || []).map((q) => html`<span></span>`)}</div>
${(v.lanes || []).map((l) => html`<div class="lane"><i></i><i></i><i></i></div>`)}
<p style="margin:8px 0 0; font-size:12px; color:#7E889A">${v.laneNote}</p>
</div>
<div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:16px; margin-top:18px">
<div><p style="margin:0 0 6px; font-size:13px; color:#AEB6C4">Gate scanner</p><div class="stepper"><button type="button" onClick="${v.scMinus}" aria-label="Kurangi scanner">−</button><span class="big2" style="min-width:56px; text-align:center">${v.scan}</span><button type="button" onClick="${v.scPlus}" aria-label="Tambah scanner">+</button></div></div>
<div style="${v.timeBox}"><p style="margin:0; font-size:13px">Semua tamu masuk dalam</p><p style="margin:4px 0 0; font-size:28px; font-weight:900">±${v.timeMin} menit ${v.timeMark}</p></div>
</div>
<p style="margin:12px 0 0; font-size:13px; color:#9AA4B5">Asumsi: 1 scanner memproses ±500 orang per jam. Rekomendasi untuk acara Anda: <strong style="color:#FFFFFF">${v.rec} scanner</strong>.</p>
</div>
<div class="pbox">
<p class="kicker" style="margin-bottom:6px">Your Recommended Setup</p>
<h3 style="margin:0 0 14px; font-size:20px; font-weight:800">${v.typeLabel} · ${v.visitorsLabel} pengunjung</h3>
<div style="margin-bottom:10px">${(v.modules || []).map((md) => html`<span class="mchip2">${md}</span>`)}</div>
<div class="kitrow"><span>Partnership scheme</span><strong>${v.scheme}</strong></div>
<div class="kitrow"><span>Gate scanner</span><strong>${v.scan} + ${v.standby} cadangan</strong></div>
<div class="kitrow"><span>Edge server</span><strong>1 unit</strong></div>
${v.hasPos ? html`<div class="kitrow"><span>Android EDC / POS</span><strong>${v.tenants} unit</strong></div>` : null}
<div class="kitrow" style="border-bottom:0"><span>Similar project</span><strong>${v.similar}</strong></div>
<p style="margin:10px 0 18px; font-size:12px; line-height:1.6; color:#7E889A">Estimasi awal untuk perencanaan. Kebutuhan final kami pastikan bersama saat konsultasi.</p>
<a href="${v.waLink}" target="_blank" rel="noopener" class="btn" style="width:100%; background:${v.accent}; color:#0A0F18">Kirim rencana ini via WhatsApp</a>
</div>
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
</div>`;
mount(Component);
