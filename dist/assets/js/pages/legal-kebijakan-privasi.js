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
<div style="display:flex; border:1px solid rgba(255,255,255,0.2); border-radius:999px; padding:3px; font-size:12px; font-weight:800"><a href="/legal/privacy-policy" style="padding:6px 12px; border-radius:999px; text-decoration:none; color:#9AA4B5">EN</a><a href="/legal/kebijakan-privasi" aria-current="page" style="padding:6px 12px; border-radius:999px; text-decoration:none; background:${v.accent}; color:#0A0F18">ID</a></div>
<a href="https://wa.me/6287878781670?text=Halo%20WIRTIX%2C%20saya%20ingin%20menjadwalkan%20demo%20untuk%20acara%20saya." target="_blank" rel="noopener" data-wa="demo" class="btn dright" style="background:${v.accent}; color:#0A0F18">Jadwalkan Demo</a>
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
<h1 style="margin:0 0 14px; font-size:clamp(34px, 3.6vw, 52px); line-height:1.1; font-weight:900">Kebijakan Privasi</h1>
<p style="margin:0 0 30px; font-size:14px; color:#9AA4B5">Pembaruan terakhir: 1 Juli 2026 · Tanggal efektif: 1 Juli 2026</p>
<div style="display:flex; flex-wrap:wrap; gap:10px"><a href="/legal/kebijakan-privasi" aria-current="page" class="pill" style="background:#FFFFFF; color:#0A0F18">Kebijakan Privasi</a><a href="/legal/syarat-ketentuan" class="pill" style="border:1px solid rgba(255,255,255,0.25); color:#E5E9F0">Syarat & Ketentuan</a></div>
</div>
</section>
<section style="padding:24px 0 100px">
<div class="wrap">
<div class="lgrid">
<aside class="toc">
<button type="button" class="toc-h" onClick="${v.toggleToc}" aria-expanded="${v.tocAria}"><span>Di halaman ini</span><span class="toc-chev" aria-hidden="true" style="${v.tocChev}">⌄</span></button>
<div class="toc-list ${v.tocCls}"><a href="#s1" class="toc-a" onClick="${v.closeToc}"><span style="color:${v.accent}; font-weight:800; min-width:22px">1.</span><span>Kategori Pengumpulan Data</span></a><a href="#s2" class="toc-a" onClick="${v.closeToc}"><span style="color:${v.accent}; font-weight:800; min-width:22px">2.</span><span>Kerangka Hukum & Tujuan</span></a><a href="#s3" class="toc-a" onClick="${v.closeToc}"><span style="color:${v.accent}; font-weight:800; min-width:22px">3.</span><span>Pengungkapan Data, Transfer & Tanggung Jawab Hukum</span></a><a href="#s4" class="toc-a" onClick="${v.closeToc}"><span style="color:${v.accent}; font-weight:800; min-width:22px">4.</span><span>Protokol Keamanan & Retensi</span></a><a href="#s5" class="toc-a" onClick="${v.closeToc}"><span style="color:${v.accent}; font-weight:800; min-width:22px">5.</span><span>Hak Subjek Data</span></a><a href="#s6" class="toc-a" onClick="${v.closeToc}"><span style="color:${v.accent}; font-weight:800; min-width:22px">6.</span><span>Kebijakan Cookie</span></a><a href="#s7" class="toc-a" onClick="${v.closeToc}"><span style="color:${v.accent}; font-weight:800; min-width:22px">7.</span><span>Pertanyaan & Layanan Bantuan</span></a></div>
</aside>
<article>
<p class="lp" style="font-size:17px; color:#E5E9F0; margin-bottom:40px">Kebijakan ini menguraikan protokol kami dalam mengumpulkan, menggunakan, dan melindungi data pribadi Anda. Dengan mengakses platform WIRTIX untuk pembuatan akun, pembelian tiket, atau registrasi acara, Anda mengakui dan menyetujui ketentuan yang terperinci di sini. WIRTIX (PT Wahana Insan Raharja) bertindak sebagai Penyedia Teknologi (Software as a Service); oleh karena itu, kami memproses data Anda murni untuk memfasilitasi acara yang dikelola oleh Penyelenggara Acara (Event Organizer) terkait.</p>
<section id="s1" class="lsec"><h2 class="lh"><span style="color:${v.accent}">1.</span> Kategori Pengumpulan Data</h2><p class="lp">Kami hanya memproses informasi yang esensial untuk pemberian layanan, khususnya:</p><ul class="ll"><li><strong style="color:#FFFFFF">Identifikasi Pribadi:</strong> Nama lengkap, alamat email, dan nomor kontak.</li><li><strong style="color:#FFFFFF">Dokumentasi Resmi:</strong> Nomor Induk Kependudukan (NIK) atau Paspor, yang diproses khusus untuk keperluan verifikasi registrasi dan protokol keamanan di lokasi acara.</li><li><strong style="color:#FFFFFF">Transaksi Keuangan:</strong> Pembayaran dikelola melalui gerbang pembayaran (payment gateway) pihak ketiga yang terenkripsi dan aman. WIRTIX tidak menyimpan informasi kartu kredit atau perbankan Anda secara lengkap.</li><li><strong style="color:#FFFFFF">Informasi Teknis:</strong> Data seperti alamat IP dan jenis peramban (browser) digunakan untuk keamanan sistem, pencegahan penipuan, dan tujuan analisis.</li><li><strong style="color:#FFFFFF">Perlindungan Anak di Bawah Umur:</strong> Kami tidak dengan sengaja memproses data individu di bawah usia 18 tahun tanpa persetujuan yang terverifikasi dan terdokumentasi dari orang tua atau wali sah.</li></ul></section>
<section id="s2" class="lsec"><h2 class="lh"><span style="color:${v.accent}">2.</span> Kerangka Hukum & Tujuan</h2><p class="lp">Sesuai dengan kewajiban hukum, persyaratan kontraktual, dan persetujuan eksplisit Anda, kami menggunakan data untuk:</p><ul class="ll"><li>Memfasilitasi dan mengonfirmasi registrasi acara, penerbitan tiket elektronik, dan perutean pembayaran.</li><li>Mengomunikasikan pembaruan penting terkait e-ticket, logistik acara, dan keamanan platform.</li><li>Menyediakan data yang diperlukan kepada Penyelenggara Acara untuk proses masuk (check-in) dan verifikasi identitas di lokasi.</li><li>Mengoptimalkan performa platform dan meningkatkan pengalaman pengguna.</li></ul></section>
<section id="s3" class="lsec"><h2 class="lh"><span style="color:${v.accent}">3.</span> Pengungkapan Data, Transfer & Tanggung Jawab Hukum</h2><ul class="ll"><li><strong style="color:#FFFFFF">Peralihan Tanggung Jawab Hukum (Event Organizer Handover):</strong> WIRTIX memberikan akses 100% (seratus persen) atas data pengunjung yang terkumpul secara langsung kepada Penyelenggara Acara terkait melalui dasbor sistem kami yang aman. Seketika setelah penyerahan atau akses data ini terjadi, Penyelenggara Acara mengambil alih peran dan tanggung jawab hukum mutlak sebagai Pengendali Data. WIRTIX dibebaskan dan tidak memikul tanggung jawab hukum apa pun atas kebocoran data, penyalahgunaan, pemasaran tanpa izin, atau kelalaian yang dilakukan oleh Penyelenggara Acara atau pihak ketiga mereka setelah acara berlangsung.</li><li><strong style="color:#FFFFFF">Berbagi Data Berizin:</strong> Data dibagikan secara eksklusif kepada Penyelenggara Acara dan mitra pembayaran resmi yang esensial. WIRTIX menerapkan kebijakan tanpa toleransi terhadap penjualan informasi pribadi.</li><li><strong style="color:#FFFFFF">Pemrosesan Internasional:</strong> Data dapat diproses pada peladen (server) cloud aman di luar Indonesia. Semua transfer lintas batas dilakukan dengan kepatuhan ketat terhadap Undang-Undang Pelindungan Data Pribadi (UU PDP) Republik Indonesia.</li></ul></section>
<section id="s4" class="lsec"><h2 class="lh"><span style="color:${v.accent}">4.</span> Protokol Keamanan & Retensi</h2><p class="lp">Kami menerapkan standar teknis dan langkah-langkah organisasional industri (termasuk enkripsi dan arsitektur offline-first yang aman) untuk mencegah akses tidak sah. Data pribadi disimpan di peladen WIRTIX hanya selama jangka waktu yang diperlukan untuk memenuhi tujuan layanan platform atau sebagaimana diamanatkan oleh hukum penyimpanan catatan menurut perundang-undangan di Indonesia.</p></section>
<section id="s5" class="lsec"><h2 class="lh"><span style="color:${v.accent}">5.</span> Hak Subjek Data</h2><p class="lp">Berdasarkan hukum dan peraturan mengenai pelindungan data pribadi (UU PDP) di Indonesia, Anda berhak untuk:</p><ul class="ll"><li><strong style="color:#FFFFFF">Akses & Perbaikan:</strong> Meminta salinan data pribadi Anda atau memperbaiki informasi yang tidak akurat di dalam platform WIRTIX.</li><li><strong style="color:#FFFFFF">Penarikan & Penghapusan:</strong> Menarik kembali persetujuan Anda atau meminta penghapusan data Anda secara permanen dari sistem kami. (Catatan: Untuk data yang telah diserahkan kepada Penyelenggara Acara, permohonan harus ditujukan langsung kepada mereka.)</li><li><strong style="color:#FFFFFF">Portabilitas & Keberatan:</strong> Meminta data Anda dalam format terstruktur atau mengajukan keberatan terhadap aktivitas pemrosesan otomatis.</li><li><strong style="color:#FFFFFF">Preferensi Pemasaran:</strong> Mengelola atau memilih keluar (opt-out) dari komunikasi promosi melalui pengaturan akun atau tautan yang tersedia.</li></ul></section>
<section id="s6" class="lsec"><h2 class="lh"><span style="color:${v.accent}">6.</span> Kebijakan Cookie</h2><p class="lp">Platform kami menggunakan cookie untuk pengelolaan sesi, keamanan, dan analisis trafik. Meskipun Anda dapat menonaktifkan cookie melalui pengaturan peramban Anda, mohon perhatikan bahwa hal ini dapat membatasi fitur fungsional tertentu pada sistem manajemen tiket.</p></section>
<section id="s7" class="lsec"><h2 class="lh"><span style="color:${v.accent}">7.</span> Pertanyaan & Layanan Bantuan</h2><p class="lp">Untuk menggunakan hak Anda atau untuk klarifikasi lebih lanjut mengenai praktik data WIRTIX, silakan hubungi kami di:</p><ul class="ll"><li><strong style="color:#FFFFFF">Email:</strong> mau@usewirtix.com</li><li><strong style="color:#FFFFFF">Alamat:</strong> PT Wahana Insan Raharja, Kemang Point, Lt. 3, Jl. Kemang Raya No. 12, Jakarta Selatan 12720</li></ul></section>

<div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:16px; border:1px solid rgba(212,175,55,0.35); border-radius:16px; padding:24px 28px; background:#0B1324">
<div><p style="margin:0 0 4px; font-size:17px; font-weight:800">Ada pertanyaan tentang kebijakan ini?</p><p style="margin:0; font-size:14px; color:#AEB6C4">Tim kami siap membantu.</p></div>
<a href="mailto:mau@usewirtix.com" style="font-weight:800; text-decoration:none">mau@usewirtix.com →</a>
</div>
<div class="endnav"><a href="/">← Kembali ke Beranda</a><a href="/legal/syarat-ketentuan" style="text-align:right">Baca Syarat & Ketentuan →</a></div>
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
<button type="button" class="totop" onClick="${v.toTop}" aria-label="Kembali ke atas" title="Kembali ke atas" style="${v.topStyle}"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A0F18" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m18 15-6-6-6 6" /></svg></button>
</div>`;
mount(Component);
