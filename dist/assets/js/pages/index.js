import { html, mount, DCLogic } from '/assets/js/runtime.js';
class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { tab: 0, menuOpen: false, showCta: false, card: 0, lc: 0, seg: 0, scr: 0, zoom: '' };
    this.pausedUntil = 0;
  }
  componentDidMount() {
    this.onScroll = () => { const v = window.scrollY > 640; if (v !== this.state.showCta) this.setState({ showCta: v }); };
    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.timer = setInterval(() => {
      if (Date.now() < this.pausedUntil) return;
      this.setState({ tab: (this.state.tab + 1) % 4 });
    }, 4200);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
    window.removeEventListener('scroll', this.onScroll);
  }
  renderVals() {
    const accent = this.props.accent ?? '#D4AF37';
    const F = (arr) => arr.map((x, i) => ({ n: String(i + 1), title: x[0], note: x[1],
      dot: 'box-sizing:border-box; width:28px; height:28px; border-radius:999px; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:800; background:' + (i === arr.length - 1 ? accent + '; color:#0A0F18;' : '#12203A; color:' + accent + '; border:1px solid rgba(212,175,55,0.5);'),
      line: i === arr.length - 1 ? 'display:none' : 'flex:1; width:2px; min-height:14px; background:rgba(212,175,55,0.3)' }));
    const data = [
      { becomes: 'tiket ber-brand Anda', label: 'Sell', phase: 'Pre-Event', module: 'Ticketing & Seating', title: 'Sell Under Your Own Brand', body: 'Pembeli memilih kursi dari denah, dengan harga bertahap dari early bird hingga reguler.',
        flow: F([['Branded ticket page', 'Domain & logo Anda'], ['Pick seats from the map', 'Kursi dikunci sementara selama checkout'], ['Secure payment', 'QRIS · VA · kartu'], ['E-ticket delivered', 'Via WhatsApp & email']]) },
      { becomes: 'akses gerbang', label: 'Enter', phase: 'Event Day', module: 'Gate Access', title: 'Gates Keep Running, Even Offline', body: 'Server lokal di venue memvalidasi tiket tanpa internet, lalu menyinkronkan semuanya otomatis.',
        flow: F([['Scan dynamic QR', 'Mencegah tiket palsu & duplikat'], ['Validate on edge server', 'Tetap berjalan saat internet terputus'], ['Guest enters', 'Kehadiran tercatat per gerbang'], ['Sync to cloud', 'Otomatis saat kembali online']]) },
      { becomes: 'transaksi cashless', label: 'Spend', phase: 'Event Day', module: 'POS & Payments', title: 'Cashless F&B, Automatic Revenue Split', body: 'Kasir Android untuk setiap tenant, dengan stok dan bagi hasil yang tercatat di setiap transaksi.',
        flow: F([['Order F&B / merch', 'Di kasir tenant'], ['Cashless payment', 'QRIS · EDC · kartu'], ['Real-time auto-split', 'Stok tercatat di setiap transaksi'], ['Shares calculated', 'Tenant · promotor · biaya layanan, sesuai jadwal settlement']]) },
      { becomes: 'data milik Anda', label: 'Insight', phase: 'Post-Event', module: 'CRM & Analytics', title: 'Know Your Audience, Show Sponsors the Value', body: 'Semua data tiket, gerbang, dan kasir menyatu di satu dasbor milik Anda.',
        flow: F([['Data unified', 'Tiket · gerbang · kasir'], ['Real-time dashboard', 'Penjualan per kanal & kategori'], ['Export buyer database', 'Untuk kampanye berikutnya'], ['Sponsor report', 'Profil & kehadiran audiens']]) }
    ];
    const tab = this.state.tab;
    const tabs = data.map((d, i) => ({
      label: d.label, phase: d.phase, num: '0' + (i + 1),
      pick: () => { this.pausedUntil = Date.now() + 15000; this.setState({ tab: i }); },
      dot: 'box-sizing:border-box; width:56px; height:56px; border-radius:999px; display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:900; ' + (i === tab ? 'background:' + accent + '; color:#0A0F18; box-shadow:0 0 0 8px rgba(212,175,55,0.15), 0 0 40px rgba(212,175,55,0.45);' : (i < tab ? 'background:#1A2C4E; color:' + accent + '; border:1px solid ' + accent + ';' : 'background:#0E1A30; color:#9AA4B5; border:1px solid rgba(255,255,255,0.18);')),
      labelStyle: 'font-size:17px; font-weight:800; color:' + (i === tab ? '#FFFFFF' : '#AEB6C4')
    }));
    const bars = [18,22,30,44,62,85,100,92,74,60,52,46].map((h) => 'flex:1; height:' + h + '%; min-height:6px; border-radius:4px 4px 0 0; background:' + accent + '; opacity:' + (0.45 + h / 200) + ';');
    const ease = 'cubic-bezier(0.65, 0, 0.35, 1)';
    const token = 'position:absolute; top:28px; left:calc(12.5% + ' + (tab * 25) + '%); transform:translate(-50%, -50%); z-index:2; transition:left 0.9s ' + ease + '; pointer-events:none';
    const fill = 'position:absolute; left:12.5%; top:27px; height:2px; width:' + (tab * 25) + '%; background:' + accent + '; box-shadow:0 0 12px ' + accent + '; transition:width 0.9s ' + ease;
    const morph = (i) => 'position:absolute; inset:0; display:flex; align-items:center; justify-content:center; transition:opacity 0.5s ease 0.35s, transform 0.6s ' + ease + ' 0.3s; opacity:' + (i === tab ? 1 : 0) + '; transform:' + (i === tab ? 'scale(1) rotate(0deg)' : 'scale(0.3) rotate(-90deg)');
    const mo = this.state.menuOpen;
    const bar = (r) => 'display:block; width:18px; height:2px; border-radius:2px; background:#FFFFFF; transition:transform 0.25s ease, opacity 0.2s ease; ' + r;
    const ui = { menuOpen: mo, menuAria: mo ? 'true' : 'false', toggleMenu: () => this.setState({ menuOpen: !this.state.menuOpen }), closeMenu: () => this.setState({ menuOpen: false }),
      bar1: bar(mo ? 'transform:translateY(7px) rotate(45deg)' : ''), bar2: bar(mo ? 'opacity:0' : ''), bar3: bar(mo ? 'transform:translateY(-7px) rotate(-45deg)' : '') };
    const dot = (i) => 'display:block; height:8px; border-radius:999px; transition:width 0.3s ease, background 0.3s ease; ' + (i === this.state.card ? 'width:24px; background:' + accent + ';' : 'width:8px; background:rgba(255,255,255,0.25);');
    ui.cd0 = dot(0); ui.cd1 = dot(1); ui.cd2 = dot(2);
    const sdot = (i) => 'display:block; height:8px; border-radius:999px; transition:width 0.3s ease, background 0.3s ease; ' + (i === this.state.seg ? 'width:24px; background:' + accent + ';' : 'width:8px; background:rgba(255,255,255,0.25);');
    const xdot = (i) => 'display:block; height:8px; border-radius:999px; transition:width 0.3s ease, background 0.3s ease; ' + (i === this.state.scr ? 'width:24px; background:' + accent + ';' : 'width:8px; background:rgba(255,255,255,0.25);');
    ui.xd0 = xdot(0); ui.xd1 = xdot(1); ui.xd2 = xdot(2); ui.xd3 = xdot(3);
    ui.onScr = (e) => { const el = e.currentTarget || e.target; const kids = Array.from(el.children); if (!kids.length) return; let best = 0, bd = Infinity; kids.forEach((k, i) => { const d = Math.abs(k.offsetLeft - el.offsetLeft - 20 - el.scrollLeft); if (d < bd) { bd = d; best = i; } }); if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) best = kids.length - 1; if (best !== this.state.scr) this.setState({ scr: best }); };
    ui.sd0 = sdot(0); ui.sd1 = sdot(1); ui.sd2 = sdot(2); ui.sd3 = sdot(3);
    ui.onSegs = (e) => { const el = e.currentTarget || e.target; const first = el.firstElementChild; if (!first) return; const step = first.getBoundingClientRect().width + 14; const i = Math.max(0, Math.min(3, Math.round(el.scrollLeft / step))); if (i !== this.state.seg) this.setState({ seg: i }); };
    ui.onCards = (e) => { const el = e.currentTarget || e.target; const first = el.firstElementChild; if (!first) return; const step = first.getBoundingClientRect().width + 14; const i = Math.max(0, Math.min(2, Math.round(el.scrollLeft / step))); if (i !== this.state.card) this.setState({ card: i }); };
    for (let i = 0; i < 3; i++) {
      const open = this.state.lc === i;
      ui['lc' + i] = () => this.setState({ lc: this.state.lc === i ? -1 : i });
      ui['lcA' + i] = open ? 'true' : 'false';
      ui['lcC' + i] = open ? 'is-open' : '';
      ui['lcV' + i] = open ? 'transform:rotate(180deg)' : '';
    }
    ui.z_wheel = () => this.setState({ zoom: 'wheel' }); ui.zo_wheel = this.state.zoom === 'wheel'; ui.z_gate = () => this.setState({ zoom: 'gate' }); ui.zo_gate = this.state.zoom === 'gate'; ui.z_pos = () => this.setState({ zoom: 'pos' }); ui.zo_pos = this.state.zoom === 'pos'; ui.z_buyer = () => this.setState({ zoom: 'buyer' }); ui.zo_buyer = this.state.zoom === 'buyer'; ui.z_laptop = () => this.setState({ zoom: 'laptop' }); ui.zo_laptop = this.state.zoom === 'laptop'; 
    ui.zoomClose = () => this.setState({ zoom: '' });
    ui.ctaStyle = this.state.showCta ? 'opacity:1; transform:translateY(0)' : 'opacity:0; transform:translateY(140%); pointer-events:none';
    return { ...ui, accent, tabs, cur: data[tab], bars, token, fill, m0: morph(0), m1: morph(1), m2: morph(2), m3: morph(3), isJual: tab === 0, isMasuk: tab === 1, isBelanja: tab === 2, isAnalisis: tab === 3 };
  }
}
Component.view = (v) => html`<div style="font-family:'Montserrat', 'Segoe UI', sans-serif; color:#FFFFFF; background:#070B12; width:100%">


<section class="hero" style="min-height:860px; display:flex; flex-direction:column">
<header class="wrap" style="width:100%; display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:20px; padding-top:26px; padding-bottom:26px">
<img fetchpriority="high" width="320" height="55" src="/assets/img/logo-320.webp" alt="WIRTIX" style="height:26px; width:auto" />
<nav class="dnav" style="display:flex; flex-wrap:wrap; gap:34px; font-size:13px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase"><a href="/platform" style="color:#E5E9F0; text-decoration:none">Platform</a><a href="/#solusi" style="color:#E5E9F0; text-decoration:none">Solutions</a><a href="/plan-your-event" style="color:#E5E9F0; text-decoration:none">Plan Your Event</a><a href="/company" style="color:#E5E9F0; text-decoration:none">Company</a></nav>
<div class="dright" style="display:flex; align-items:center; gap:18px; font-size:13px; font-weight:700">
<a href="https://kontrol.usewirtix.com/login" style="color:#E5E9F0; text-decoration:none">Login</a>
<a href="https://wa.me/6287878781670?text=Halo%20WIRTIX%2C%20saya%20ingin%20menjadwalkan%20demo%20untuk%20acara%20saya." target="_blank" rel="noopener" data-wa="demo" class="btn" style="min-height:44px; padding:0 22px; background:${v.accent}; color:#0A0F18; font-size:12px">Jadwalkan Demo</a>
</div>
<button type="button" class="burger" onClick="${v.toggleMenu}" aria-label="Menu" aria-expanded="${v.menuAria}"><span style="${v.bar1}"></span><span style="${v.bar2}"></span><span style="${v.bar3}"></span></button>
</header>
${v.menuOpen ? html`
<div class="mmenu"><a href="/platform" onClick="${v.closeMenu}">Platform</a><a href="/#solusi" onClick="${v.closeMenu}">Solutions</a><a href="/plan-your-event" onClick="${v.closeMenu}">Plan Your Event</a><a href="/company" onClick="${v.closeMenu}">Company</a><a href="https://kontrol.usewirtix.com/login" style="color:#D4AF37">Login</a></div>
` : null}
<div class="wrap herobody" style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding-top:40px; padding-bottom:56px">
<p class="kicker">Event & Venue Management Ecosystem</p>
<h1 style="margin:0 0 22px; font-size:clamp(40px, 4.72vw, 68px); line-height:1.05; font-weight:900; letter-spacing:-1px; max-width:900px">Empowering The Vision Behind Every Event</h1>
<p style="margin:0 0 36px; font-size:19px; line-height:1.6; color:#C9D0DB; max-width:620px">Tiket, akses gerbang, pembayaran, dan data audiens — dalam satu ekosistem dengan brand Anda.</p>
<div class="herocta" style="display:flex; flex-wrap:wrap; gap:14px; justify-content:center">
<a href="https://wa.me/6287878781670?text=Halo%20WIRTIX%2C%20saya%20ingin%20menjadwalkan%20demo%20untuk%20acara%20saya." target="_blank" rel="noopener" data-wa="demo" class="btn" style="background:${v.accent}; color:#0A0F18">Jadwalkan Demo</a>
<a href="#platform" class="btn" style="border:1px solid rgba(255,255,255,0.35); color:#FFFFFF">Lihat Platform</a>
</div>
</div>
<div class="evrow" style="overflow:hidden; padding-bottom:56px">
<div class="evtrack" style="display:flex; gap:16px; width:max-content">
<div class="ev" role="img" aria-label="Music Concert" style="background-position:0% 0"><div class="ev-shade"></div><span>Music Concert</span></div>
<div class="ev" role="img" aria-label="Otomotif" style="background-position:14.2857% 0"><div class="ev-shade"></div><span>Otomotif</span></div>
<div class="ev" role="img" aria-label="Standup Comedy" style="background-position:28.5714% 0"><div class="ev-shade"></div><span>Standup Comedy</span></div>
<div class="ev" role="img" aria-label="E-Sports" style="background-position:42.8571% 0"><div class="ev-shade"></div><span>E-Sports</span></div>
<div class="ev" role="img" aria-label="Seminar" style="background-position:57.1429% 0"><div class="ev-shade"></div><span>Seminar</span></div>
<div class="ev" role="img" aria-label="Fashion Show" style="background-position:71.4286% 0"><div class="ev-shade"></div><span>Fashion Show</span></div>
<div class="ev" role="img" aria-label="Food Festival" style="background-position:85.7143% 0"><div class="ev-shade"></div><span>Food Festival</span></div>
<div class="ev" role="img" aria-label="School Event" style="background-position:100% 0"><div class="ev-shade"></div><span>School Event</span></div>
<div class="ev" aria-hidden="true" style="background-position:0% 0"><div class="ev-shade"></div><span>Music Concert</span></div>
<div class="ev" aria-hidden="true" style="background-position:14.2857% 0"><div class="ev-shade"></div><span>Otomotif</span></div>
<div class="ev" aria-hidden="true" style="background-position:28.5714% 0"><div class="ev-shade"></div><span>Standup Comedy</span></div>
<div class="ev" aria-hidden="true" style="background-position:42.8571% 0"><div class="ev-shade"></div><span>E-Sports</span></div>
<div class="ev" aria-hidden="true" style="background-position:57.1429% 0"><div class="ev-shade"></div><span>Seminar</span></div>
<div class="ev" aria-hidden="true" style="background-position:71.4286% 0"><div class="ev-shade"></div><span>Fashion Show</span></div>
<div class="ev" aria-hidden="true" style="background-position:85.7143% 0"><div class="ev-shade"></div><span>Food Festival</span></div>
<div class="ev" aria-hidden="true" style="background-position:100% 0"><div class="ev-shade"></div><span>School Event</span></div>
</div>
</div>
</section>


<section class="promise" style="position:relative; overflow:hidden; padding:140px 0 150px">
<svg viewBox="0 0 1440 400" preserveAspectRatio="none" aria-hidden="true" style="position:absolute; left:0; right:0; bottom:0; width:100%; height:300px; pointer-events:none"><path d="M0 330 C 420 250, 900 300, 1440 90" fill="none" stroke="rgba(212,175,55,0.35)" stroke-width="1.5" /><path d="M0 380 C 500 320, 1000 340, 1440 170" fill="none" stroke="rgba(212,175,55,0.18)" stroke-width="1" /></svg>
<div class="wrap" style="position:relative">
<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(min(420px, 100%), 1fr)); gap:40px; align-items:end; margin-bottom:64px">
<div>
<p class="kicker">Why WIRTIX</p>
<h2 style="margin:0; font-size:clamp(38px, 4.44vw, 64px); line-height:1.06; font-weight:900; letter-spacing:-1px">Your Event.<br /><span style="color:${v.accent}">Your Brand.<br />Your Data.</span></h2>
</div>
<div style="border-left:1px solid rgba(212,175,55,0.4); padding-left:28px">
<p style="margin:0 0 20px; font-size:18px; line-height:1.7; color:#C9D0DB">Banyak platform tiket menampilkan logo mereka dan menyimpan data penonton di sistem mereka. WIRTIX bekerja di balik layar, untuk acara yang sepenuhnya milik Anda.</p>
<a href="#ekosistem" style="font-weight:700; text-decoration:none">Lihat cara kerjanya →</a>
</div>
</div>
<div class="cardrow" onScroll="${v.onCards}" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(min(300px, 100%), 1fr)); gap:20px">
<div class="pcard">
<div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:22px"><div style="width:52px; height:52px; border-radius:14px; background:#12203A; border:1px solid rgba(212,175,55,0.35); display:flex; align-items:center; justify-content:center; flex:none"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${v.accent}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg></div><span style="font-size:13px; font-weight:800; letter-spacing:2px; color:rgba(255,255,255,0.35)">01</span></div>
<h3 style="margin:0 0 10px; font-size:22px; font-weight:800">Your Brand, Front and Center</h3>
<p style="margin:0 0 22px; font-size:15px; line-height:1.7; color:#AEB6C4">Halaman tiket, e-tiket, dan notifikasi tampil dengan nama dan logo Anda — bukan logo vendor.</p>
<div class="pvis"><div style="display:flex; align-items:center; gap:8px; background:#0A1426; border:1px solid rgba(255,255,255,0.12); border-radius:999px; padding:9px 14px; font-size:13px; color:#C9D0DB"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7E889A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg><span><strong style="color:#FFFFFF">tiket.brandanda</strong>.com</span></div><div style="display:flex; gap:8px; margin-top:12px"><span style="background:${v.accent}; color:#0A0F18; font-size:10px; font-weight:900; letter-spacing:1px; padding:6px 10px; border-radius:6px">YOUR BRAND</span><span style="border:1px dashed rgba(255,255,255,0.25); color:#7E889A; font-size:10px; font-weight:800; letter-spacing:1px; padding:6px 10px; border-radius:6px; text-decoration:line-through">LOGO VENDOR</span></div></div>
</div>
<div class="pcard">
<div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:22px"><div style="width:52px; height:52px; border-radius:14px; background:#12203A; border:1px solid rgba(212,175,55,0.35); display:flex; align-items:center; justify-content:center; flex:none"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${v.accent}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" /></svg></div><span style="font-size:13px; font-weight:800; letter-spacing:2px; color:rgba(255,255,255,0.35)">02</span></div>
<h3 style="margin:0 0 10px; font-size:22px; font-weight:800">100% Data Ownership</h3>
<p style="margin:0 0 22px; font-size:15px; line-height:1.7; color:#AEB6C4">Data pembeli dan pengunjung tercatat di database Anda, dikelola sesuai prinsip UU PDP, dan siap dipakai untuk acara berikutnya.</p>
<div class="pvis" style="display:flex; align-items:center; gap:16px"><span style="font-size:52px; line-height:1; font-weight:900; color:${v.accent}">100%</span><span style="font-size:13px; line-height:1.5; color:#C9D0DB">data pembeli & pengunjung<br />tersimpan di database Anda</span></div>
</div>
<div class="pcard">
<div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:22px"><div style="width:52px; height:52px; border-radius:14px; background:#12203A; border:1px solid rgba(212,175,55,0.35); display:flex; align-items:center; justify-content:center; flex:none"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${v.accent}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3v18h18" /><path d="M8 17V10" /><path d="M13 17V6" /><path d="M18 17v-4" /></svg></div><span style="font-size:13px; font-weight:800; letter-spacing:2px; color:rgba(255,255,255,0.35)">03</span></div>
<h3 style="margin:0 0 10px; font-size:22px; font-weight:800">Full Control, One Dashboard</h3>
<p style="margin:0 0 22px; font-size:15px; line-height:1.7; color:#AEB6C4">Penjualan, gerbang, kasir, dan dana terpantau real-time dari satu dasbor.</p>
<div class="pvis"><div style="display:flex; justify-content:space-between; margin-bottom:10px"><span style="font-size:10px; font-weight:800; letter-spacing:1.5px; color:${v.accent}">● LIVE</span><span style="font-size:10px; color:#7E889A">One dashboard</span></div><div style="display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:8px; text-align:center"><div style="background:#0A1426; border-radius:8px; padding:8px 4px"><p style="margin:0; font-size:9px; color:#7E889A">TICKETS</p><p style="margin:2px 0 0; font-size:13px; font-weight:800">3.250</p></div><div style="background:#0A1426; border-radius:8px; padding:8px 4px"><p style="margin:0; font-size:9px; color:#7E889A">GATE</p><p style="margin:2px 0 0; font-size:13px; font-weight:800">1.284</p></div><div style="background:#0A1426; border-radius:8px; padding:8px 4px"><p style="margin:0; font-size:9px; color:#7E889A">POS</p><p style="margin:2px 0 0; font-size:13px; font-weight:800">Rp31rb</p></div></div></div>
</div>
</div>
<div class="cnav" aria-hidden="true">
<div style="display:flex; gap:8px"><span style="${v.cd0}"></span><span style="${v.cd1}"></span><span style="${v.cd2}"></span></div>
<span style="font-size:12px; font-weight:700; letter-spacing:1px; color:#9AA4B5">Geser untuk melihat lainnya →</span>
</div>
</div>
</section>


<section id="ekosistem" class="life" style="padding:150px 0 130px">
<div class="wrap">
<div style="text-align:center; margin-bottom:64px">
<p class="kicker">Pre-Event · Event Day · Post-Event</p>
<h2 class="h2">One Ecosystem, Full Event Lifecycle</h2>
</div>
<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(min(360px, 100%), 1fr)); gap:56px; align-items:center">
<div style="display:flex; justify-content:center">
<div style="position:relative; width:100%; max-width:620px"><div aria-hidden="true" style="position:absolute; left:50%; top:50%; width:110%; aspect-ratio:1; transform:translate(-50%, -50%); background:radial-gradient(closest-side, rgba(212,175,55,0.16), rgba(212,175,55,0)); pointer-events:none"></div>
<button type="button" class="zoomable" onClick="${v.z_wheel}"><img loading="lazy" decoding="async" width="821" height="568" src="/assets/img/wheel2.webp" srcset="/assets/img/wheel2-560.webp 560w, /assets/img/wheel2.webp 821w" sizes="(max-width: 760px) 92vw, 600px" alt="Roda ekosistem WIRTIX: Pre-Event (Ticketing, Seating Plan, Affiliate, WhatsApp Bot), Event Day (Gate Access, POS & Payments, Commerce, Facility), Post-Event (Settlement, CRM & Analytics)" style="position:relative; width:100%; height:auto; display:block" /><span class="zhint" aria-hidden="true">⤢ Ketuk untuk perbesar</span></button>
</div>
</div>
<div style="display:flex; flex-direction:column; gap:26px">
<div style="position:relative; display:flex; gap:22px">
<div style="position:absolute; left:23px; top:52px; bottom:-26px; width:2px; background:rgba(212,175,55,0.35)"></div><div style="width:48px; height:48px; border-radius:999px; background:#F2D27A; color:#0A0F18; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:15px; flex:none; box-shadow:0 0 0 6px rgba(212,175,55,0.12)">01</div>
<div class="glass" style="flex:1; min-width:0">
<button type="button" class="lc-head" onClick="${v.lc0}" aria-expanded="${v.lcA0}"><h3 style="margin:0; font-size:22px; font-weight:800">Pre-Event</h3><span style="font-size:12px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#9AA4B5">Before the Event</span><span class="lc-chev" aria-hidden="true" style="${v.lcV0}">⌄</span></button>
<div class="lc-body ${v.lcC0}">
<p style="margin:0 0 14px; font-size:15px; line-height:1.7; color:#C9D0DB">Jual tiket di halaman ber-brand Anda, atur denah kursi dan harga bertahap, serta lacak penjualan afiliasi.</p>
<div style="display:flex; flex-wrap:wrap; gap:8px"><span class="mchip">Ticketing</span><span class="mchip">Seating Plan</span><span class="mchip">Affiliate</span><span class="mchip">WhatsApp Bot</span></div>
</div>
</div>
</div>
<div style="position:relative; display:flex; gap:22px">
<div style="position:absolute; left:23px; top:52px; bottom:-26px; width:2px; background:rgba(212,175,55,0.35)"></div><div style="width:48px; height:48px; border-radius:999px; background:#D4AF37; color:#0A0F18; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:15px; flex:none; box-shadow:0 0 0 6px rgba(212,175,55,0.12)">02</div>
<div class="glass" style="flex:1; min-width:0">
<button type="button" class="lc-head" onClick="${v.lc1}" aria-expanded="${v.lcA1}"><h3 style="margin:0; font-size:22px; font-weight:800">Event Day</h3><span style="font-size:12px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#9AA4B5">Event Day</span><span class="lc-chev" aria-hidden="true" style="${v.lcV1}">⌄</span></button>
<div class="lc-body ${v.lcC1}">
<p style="margin:0 0 14px; font-size:15px; line-height:1.7; color:#C9D0DB">Dengan server lokal di venue, validasi tiket tetap berjalan saat internet terputus, dan transaksi F&B serta merchandise tercatat otomatis.</p>
<div style="display:flex; flex-wrap:wrap; gap:8px"><span class="mchip">Gate Access</span><span class="mchip">POS & Payments</span><span class="mchip">Commerce</span><span class="mchip">Facility</span></div>
</div>
</div>
</div>
<div style="position:relative; display:flex; gap:22px">
<div style="width:48px; height:48px; border-radius:999px; background:#B8902A; color:#0A0F18; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:15px; flex:none; box-shadow:0 0 0 6px rgba(212,175,55,0.12)">03</div>
<div class="glass" style="flex:1; min-width:0">
<button type="button" class="lc-head" onClick="${v.lc2}" aria-expanded="${v.lcA2}"><h3 style="margin:0; font-size:22px; font-weight:800">Post-Event</h3><span style="font-size:12px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#9AA4B5">After the Event</span><span class="lc-chev" aria-hidden="true" style="${v.lcV2}">⌄</span></button>
<div class="lc-body ${v.lcC2}">
<p style="margin:0 0 14px; font-size:15px; line-height:1.7; color:#C9D0DB">Rekap settlement otomatis, laporan lengkap, dan data audiens siap dipakai untuk pemasaran dan sponsor berikutnya.</p>
<div style="display:flex; flex-wrap:wrap; gap:8px"><span class="mchip">Settlement</span><span class="mchip">CRM & Analytics</span></div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>


<section id="platform" class="plat" style="position:relative; overflow:hidden; padding:110px 0 130px">
<div class="wrap" style="position:relative">
<div style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:flex-end; gap:24px; margin-bottom:56px">
<div><p class="kicker">Platform</p><h2 class="h2">Follow One Ticket’s Journey</h2><p style="margin:14px 0 0; font-size:17px; line-height:1.7; color:#AEB6C4; max-width:560px">Dari tiket, menjadi akses masuk, transaksi cashless, hingga data — semuanya dalam satu sistem.</p></div>
<a href="/platform" style="font-weight:700; text-decoration:none">Jelajahi platform →</a>
</div>

<div style="position:relative; margin-bottom:36px">
<div aria-hidden="true" style="position:absolute; left:12.5%; right:12.5%; top:27px; height:2px; background:rgba(255,255,255,0.12)"></div>
<div aria-hidden="true" style="${v.fill}"></div>
<div aria-hidden="true" class="tok" style="${v.token}">
<div style="position:absolute; right:50%; top:50%; width:140px; height:4px; margin-top:-2px; border-radius:4px; background:linear-gradient(90deg, rgba(212,175,55,0), rgba(212,175,55,0.8))"></div>
<div class="tok-pulse" style="position:absolute; inset:-10px; border-radius:999px; border:2px solid rgba(212,175,55,0.6)"></div>
<div style="position:relative; width:72px; height:72px; border-radius:999px; background:${v.accent}; box-shadow:0 0 0 8px rgba(212,175,55,0.15), 0 0 50px rgba(212,175,55,0.55)"><span style="${v.m0}"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#0A0F18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /><path d="M13 5v2" /><path d="M13 17v2" /><path d="M13 11v2" /></svg></span><span style="${v.m1}"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#0A0F18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 14h3v3h-3z" /><path d="M21 14v7h-4" /></svg></span><span style="${v.m2}"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#0A0F18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /><path d="M6 15h4" /></svg></span><span style="${v.m3}"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#0A0F18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3v18h18" /><path d="m7 15 4-4 3 3 5-6" /></svg></span></div>
</div>
<div style="position:relative; display:grid; grid-template-columns:repeat(4, minmax(0, 1fr)); gap:0">
${(v.tabs || []).map((t) => html`
<button type="button" onClick="${t.pick}" style="background:transparent; border:0; padding:0; cursor:pointer; font-family:inherit; color:#FFFFFF; display:flex; flex-direction:column; align-items:center; gap:12px; min-height:44px">
<span style="${t.dot}">${t.num}</span>
<span style="${t.labelStyle}">${t.label}</span>
<span class="phase" style="font-size:11px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#7E889A">${t.phase}</span>
</button>
`)}
</div>
<p style="margin:22px 0 0; text-align:center; font-size:13px; color:#9AA4B5">Tiket yang sama, berubah peran di setiap tahap: <span style="color:${v.accent}; font-weight:700">${v.cur.becomes}</span></p>
</div>

<div class="pglass" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(min(380px, 100%), 1fr)); gap:40px; align-items:center">
<div>
<div style="display:flex; align-items:center; gap:16px; margin-bottom:18px">${v.isJual ? html`<div style="width:52px; height:52px; border-radius:14px; background:#12203A; border:1px solid rgba(212,175,55,0.35); display:flex; align-items:center; justify-content:center; flex:none"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${v.accent}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /><path d="M13 5v2" /><path d="M13 17v2" /><path d="M13 11v2" /></svg></div>` : null}${v.isMasuk ? html`<div style="width:52px; height:52px; border-radius:14px; background:#12203A; border:1px solid rgba(212,175,55,0.35); display:flex; align-items:center; justify-content:center; flex:none"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${v.accent}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="7.5" cy="15.5" r="5.5" /><path d="m21 2-9.6 9.6" /><path d="m15.5 7.5 3 3L22 7l-3-3" /></svg></div>` : null}${v.isBelanja ? html`<div style="width:52px; height:52px; border-radius:14px; background:#12203A; border:1px solid rgba(212,175,55,0.35); display:flex; align-items:center; justify-content:center; flex:none"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${v.accent}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg></div>` : null}${v.isAnalisis ? html`<div style="width:52px; height:52px; border-radius:14px; background:#12203A; border:1px solid rgba(212,175,55,0.35); display:flex; align-items:center; justify-content:center; flex:none"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${v.accent}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3v18h18" /><path d="M8 17V10" /><path d="M13 17V6" /><path d="M18 17v-4" /></svg></div>` : null}<p style="margin:0; font-size:13px; font-weight:700; letter-spacing:2px; color:#9AA4B5; text-transform:uppercase">${v.cur.module}</p></div>
<h3 style="margin:0 0 14px; font-size:clamp(24px, 2.2vw, 32px); line-height:1.2; font-weight:800">${v.cur.title}</h3>
<p style="margin:0 0 28px; font-size:16px; line-height:1.7; color:#AEB6C4">${v.cur.body}</p>
<p style="margin:0 0 14px; font-size:11px; font-weight:800; letter-spacing:2px; color:${v.accent}">THE FLOW</p>
<div style="display:flex; flex-direction:column">
${(v.cur.flow || []).map((f) => html`
<div style="display:flex; gap:14px; align-items:stretch">
<div style="display:flex; flex-direction:column; align-items:center; flex:none; width:28px">
<span style="${f.dot}">${f.n}</span>
<span style="${f.line}"></span>
</div>
<div style="padding:3px 0 18px"><p style="margin:0; font-size:15px; font-weight:700">${f.title}</p><p style="margin:2px 0 0; font-size:13px; color:#9AA4B5">${f.note}</p></div>
</div>
`)}
</div>
</div>
<div style="position:relative; display:flex; align-items:center; justify-content:center; min-height:clamp(260px, 29vw, 420px)">
<div aria-hidden="true" style="position:absolute; inset:0; background:radial-gradient(closest-side, rgba(212,175,55,0.16), rgba(212,175,55,0))"></div>
<div style="position:relative; width:100%">
${v.isJual ? html`<img loading="lazy" decoding="async" width="1120" height="673" src="/assets/img/sell.webp" alt="Ilustrasi live seat map WIRTIX di tablet" style="width:100%; max-width:560px; height:auto; display:block; margin:0 auto; animation:popIn 0.6s ease" />` : null}
${v.isMasuk ? html`<img loading="lazy" decoding="async" width="309" height="638" src="/assets/img/gate.webp" alt="Gate App WIRTIX" style="width:230px; height:auto; display:block; margin:0 auto; animation:popIn 0.6s ease" />` : null}
${v.isBelanja ? html`<img loading="lazy" decoding="async" width="309" height="638" src="/assets/img/pos.webp" alt="POS Kasir WIRTIX" style="width:230px; height:auto; display:block; margin:0 auto; animation:popIn 0.6s ease" />` : null}
${v.isAnalisis ? html`<img loading="lazy" decoding="async" width="760" height="1055" src="/assets/img/know.webp" alt="Ilustrasi dasbor analitik WIRTIX" style="width:100%; max-width:380px; height:auto; display:block; margin:0 auto; animation:popIn 0.6s ease" />` : null}
</div>
</div>
</div>
</div>
</section>


<section id="solusi" class="stage" style="position:relative; overflow:hidden; padding:130px 0 140px">
<div aria-hidden="true" class="keylight"></div>
<div aria-hidden="true" class="stage-floor"></div>
<div aria-hidden="true" class="stage-edge"></div>
<div aria-hidden="true" class="stage-glow"></div>
<div class="wrap" style="position:relative; z-index:1">
<p class="kicker">Solutions</p>
<h2 class="h2" style="margin-bottom:44px">Built for Every Stage.</h2>
<div class="segrow" onScroll="${v.onSegs}" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(min(250px, 100%), 1fr)); gap:18px">
<a href="/solusi/promotor-eo" class="seg"><img loading="lazy" decoding="async" width="900" height="502" src="/assets/img/concert.webp" alt="" /><div class="seg-shade"></div><div class="seg-body"><div style="width:46px; height:46px; border-radius:14px; background:#12203A; border:1px solid rgba(212,175,55,0.35); display:flex; align-items:center; justify-content:center; margin-bottom:14px"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${v.accent}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg></div><h3 style="margin:0 0 6px; font-size:22px; font-weight:800">Promotor & EO</h3><p style="margin:0 0 14px; font-size:14px; color:#C9D0DB">Konser, festival, olahraga</p><span style="font-size:13px; font-weight:700; color:${v.accent}">Lihat solusi →</span></div></a>
<a href="/solusi/venue-hospitality" class="seg"><img loading="lazy" decoding="async" width="900" height="491" src="/assets/img/food.webp" alt="" /><div class="seg-shade"></div><div class="seg-body"><div style="width:46px; height:46px; border-radius:14px; background:#12203A; border:1px solid rgba(212,175,55,0.35); display:flex; align-items:center; justify-content:center; margin-bottom:14px"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${v.accent}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg></div><h3 style="margin:0 0 6px; font-size:22px; font-weight:800">Venue & Hospitality</h3><p style="margin:0 0 14px; font-size:14px; color:#C9D0DB">Arena, gedung, pameran, F&B</p><span style="font-size:13px; font-weight:700; color:${v.accent}">Lihat solusi →</span></div></a>
<a href="/solusi/corporate-b2b" class="seg"><img loading="lazy" decoding="async" width="900" height="502" src="/assets/img/seminar.webp" alt="" /><div class="seg-shade"></div><div class="seg-body"><div style="width:46px; height:46px; border-radius:14px; background:#12203A; border:1px solid rgba(212,175,55,0.35); display:flex; align-items:center; justify-content:center; margin-bottom:14px"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${v.accent}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="m9 12 2 2 4-4" /></svg></div><h3 style="margin:0 0 6px; font-size:22px; font-weight:800">Corporate & B2B</h3><p style="margin:0 0 14px; font-size:14px; color:#C9D0DB">Gathering, seminar, acara VIP</p><span style="font-size:13px; font-weight:700; color:${v.accent}">Lihat solusi →</span></div></a>
<a href="/solusi/education" class="seg"><img loading="lazy" decoding="async" width="900" height="491" src="/assets/img/school.webp" alt="" /><div class="seg-shade"></div><div class="seg-body"><div style="width:46px; height:46px; border-radius:14px; background:#12203A; border:1px solid rgba(212,175,55,0.35); display:flex; align-items:center; justify-content:center; margin-bottom:14px"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${v.accent}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg></div><h3 style="margin:0 0 6px; font-size:22px; font-weight:800">Education</h3><p style="margin:0 0 14px; font-size:14px; color:#C9D0DB">Wisuda, pentas seni, acara sekolah</p><span style="font-size:13px; font-weight:700; color:${v.accent}">Lihat solusi →</span></div></a>
</div>
<div class="cnav" aria-hidden="true">
<div style="display:flex; gap:8px"><span style="${v.sd0}"></span><span style="${v.sd1}"></span><span style="${v.sd2}"></span><span style="${v.sd3}"></span></div>
<span style="font-size:12px; font-weight:700; letter-spacing:1px; color:#9AA4B5">Geser untuk melihat lainnya →</span>
</div>
</div>
</section>


<section class="sys" style="position:relative; overflow:hidden; padding:130px 0 140px">
<div class="wrap" style="position:relative; z-index:1">
<div style="text-align:center; margin-bottom:56px">
<p class="kicker">One Platform, Four Screens</p>
<h2 class="h2">See It in Action</h2>
<p style="margin:16px auto 0; font-size:17px; line-height:1.7; color:#AEB6C4; max-width:600px">Pembeli, penyelenggara, petugas gerbang, dan kasir bekerja di atas data yang sama — secara real-time.</p>
</div>
<div style="position:relative">
<div aria-hidden="true" class="dline"><span class="pkt" style="animation-delay:0s"></span><span class="pkt" style="animation-delay:1.3s"></span><span class="pkt" style="animation-delay:2.6s"></span></div>
<div aria-hidden="true" style="position:absolute; left:50%; bottom:40px; width:90%; height:120px; transform:translateX(-50%); border-radius:50%; background:radial-gradient(closest-side, rgba(70,110,200,0.28), rgba(70,110,200,0))"></div>
<div class="scr" onScroll="${v.onScr}">
<div style="display:flex; flex-direction:column; align-items:center"><button type="button" class="zoomable" onClick="${v.z_buyer}"><img loading="lazy" decoding="async" width="309" height="638" src="/assets/img/buyer.webp" alt="Buyer Page WIRTIX" style="width:100%; max-width:176px; height:auto; display:block" /><span class="zhint" aria-hidden="true">⤢ Ketuk untuk perbesar</span></button><p style="margin:18px 0 4px; font-size:16px; font-weight:800; text-align:center; display:flex; align-items:center; gap:8px"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${v.accent}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" /></svg>Buyer Page</p><p style="margin:0; font-size:13px; color:#AEB6C4; text-align:center; max-width:220px">Halaman tiket ber-brand Anda.</p></div>
<div style="display:flex; flex-direction:column; align-items:center"><button type="button" class="zoomable" onClick="${v.z_laptop}"><img loading="lazy" decoding="async" width="998" height="570" src="/assets/img/laptop.webp" alt="Organizer Dashboard WIRTIX" style="width:100%; max-width:520px; height:auto; display:block" /><span class="zhint" aria-hidden="true">⤢ Ketuk untuk perbesar</span></button><p style="margin:18px 0 4px; font-size:16px; font-weight:800; text-align:center; display:flex; align-items:center; gap:8px"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${v.accent}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" /></svg>Organizer Dashboard</p><p style="margin:0; font-size:13px; color:#AEB6C4; text-align:center; max-width:220px">Penjualan, kuota, dan data secara real-time.</p></div>
<div style="display:flex; flex-direction:column; align-items:center"><button type="button" class="zoomable" onClick="${v.z_gate}"><img loading="lazy" decoding="async" width="309" height="638" src="/assets/img/gate.webp" alt="Gate App WIRTIX" style="width:100%; max-width:176px; height:auto; display:block" /><span class="zhint" aria-hidden="true">⤢ Ketuk untuk perbesar</span></button><p style="margin:18px 0 4px; font-size:16px; font-weight:800; text-align:center; display:flex; align-items:center; gap:8px"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${v.accent}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /><path d="M7 12h10" /></svg>Gate App</p><p style="margin:0; font-size:13px; color:#AEB6C4; text-align:center; max-width:220px">Validasi tiket di pintu masuk.</p></div>
<div style="display:flex; flex-direction:column; align-items:center"><button type="button" class="zoomable" onClick="${v.z_pos}"><img loading="lazy" decoding="async" width="309" height="638" src="/assets/img/pos.webp" alt="POS Kasir WIRTIX" style="width:100%; max-width:176px; height:auto; display:block" /><span class="zhint" aria-hidden="true">⤢ Ketuk untuk perbesar</span></button><p style="margin:18px 0 4px; font-size:16px; font-weight:800; text-align:center; display:flex; align-items:center; gap:8px"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${v.accent}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>POS Kasir</p><p style="margin:0; font-size:13px; color:#AEB6C4; text-align:center; max-width:220px">Transaksi F&B dan merchandise.</p></div>
</div>
</div>
<div class="cnav" aria-hidden="true">
<div style="display:flex; gap:8px"><span style="${v.xd0}"></span><span style="${v.xd1}"></span><span style="${v.xd2}"></span><span style="${v.xd3}"></span></div>
<span style="font-size:12px; font-weight:700; letter-spacing:1px; color:#9AA4B5">Geser untuk melihat lainnya →</span>
</div>
<p style="margin:40px 0 0; text-align:center; font-size:12px; color:#7E889A; letter-spacing:1px">Tampilan aplikasi WIRTIX dengan data demo</p>
</div>
</section>


${v.zo_wheel ? html`
<div class="lb" role="dialog" aria-modal="true" aria-label="Roda ekosistem WIRTIX: Pre-Event (Ticketing, Seating Plan, Affiliate, WhatsApp Bot), Event Day (Gate Access, POS & Payments, Commerce, Facility), Post-Event (Settlement, CRM & Analytics)">
<div class="lb-top"><span>Cubit atau geser untuk melihat detail</span><button type="button" class="lb-x" onClick="${v.zoomClose}" aria-label="Tutup">✕</button></div>
<div class="lb-scroll"><img src="/assets/img/wheel2.webp" alt="Roda ekosistem WIRTIX: Pre-Event (Ticketing, Seating Plan, Affiliate, WhatsApp Bot), Event Day (Gate Access, POS & Payments, Commerce, Facility), Post-Event (Settlement, CRM & Analytics)" /></div>
</div>
` : null}
${v.zo_gate ? html`
<div class="lb" role="dialog" aria-modal="true" aria-label="Gate App WIRTIX">
<div class="lb-top"><span>Cubit atau geser untuk melihat detail</span><button type="button" class="lb-x" onClick="${v.zoomClose}" aria-label="Tutup">✕</button></div>
<div class="lb-scroll"><img src="/assets/img/gate.webp" alt="Gate App WIRTIX" /></div>
</div>
` : null}
${v.zo_pos ? html`
<div class="lb" role="dialog" aria-modal="true" aria-label="POS Kasir WIRTIX">
<div class="lb-top"><span>Cubit atau geser untuk melihat detail</span><button type="button" class="lb-x" onClick="${v.zoomClose}" aria-label="Tutup">✕</button></div>
<div class="lb-scroll"><img src="/assets/img/pos.webp" alt="POS Kasir WIRTIX" /></div>
</div>
` : null}
${v.zo_buyer ? html`
<div class="lb" role="dialog" aria-modal="true" aria-label="Buyer Page WIRTIX">
<div class="lb-top"><span>Cubit atau geser untuk melihat detail</span><button type="button" class="lb-x" onClick="${v.zoomClose}" aria-label="Tutup">✕</button></div>
<div class="lb-scroll"><img src="/assets/img/buyer.webp" alt="Buyer Page WIRTIX" /></div>
</div>
` : null}
${v.zo_laptop ? html`
<div class="lb" role="dialog" aria-modal="true" aria-label="Organizer Dashboard WIRTIX">
<div class="lb-top"><span>Cubit atau geser untuk melihat detail</span><button type="button" class="lb-x" onClick="${v.zoomClose}" aria-label="Tutup">✕</button></div>
<div class="lb-scroll"><img src="/assets/img/laptop.webp" alt="Organizer Dashboard WIRTIX" /></div>
</div>
` : null}
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
<a href="https://wa.me/6287878781670?text=Halo%20WIRTIX%2C%20saya%20ingin%20menjadwalkan%20demo%20untuk%20acara%20saya." target="_blank" rel="noopener" data-wa="demo" class="mcta" style="${v.ctaStyle}">Jadwalkan Demo</a>
</div>`;
mount(Component);
