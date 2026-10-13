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
<div style="display:flex; border:1px solid rgba(255,255,255,0.2); border-radius:999px; padding:3px; font-size:12px; font-weight:800"><a href="/legal/terms-conditions" style="padding:6px 12px; border-radius:999px; text-decoration:none; color:#9AA4B5">EN</a><a href="/legal/syarat-ketentuan" aria-current="page" style="padding:6px 12px; border-radius:999px; text-decoration:none; background:${v.accent}; color:#0A0F18">ID</a></div>
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
<h1 style="margin:0 0 14px; font-size:clamp(34px, 3.6vw, 52px); line-height:1.1; font-weight:900">Syarat & Ketentuan</h1>
<p style="margin:0 0 30px; font-size:14px; color:#9AA4B5">Pembaruan terakhir: 1 Juli 2026 · Tanggal efektif: 1 Juli 2026</p>
<div style="display:flex; flex-wrap:wrap; gap:10px"><a href="/legal/kebijakan-privasi" class="pill" style="border:1px solid rgba(255,255,255,0.25); color:#E5E9F0">Kebijakan Privasi</a><a href="/legal/syarat-ketentuan" aria-current="page" class="pill" style="background:#FFFFFF; color:#0A0F18">Syarat & Ketentuan</a></div>
</div>
</section>
<section style="padding:24px 0 100px">
<div class="wrap">
<div class="lgrid">
<aside class="toc">
<button type="button" class="toc-h" onClick="${v.toggleToc}" aria-expanded="${v.tocAria}"><span>Di halaman ini</span><span class="toc-chev" aria-hidden="true" style="${v.tocChev}">⌄</span></button>
<div class="toc-list ${v.tocCls}"><a href="#s1" class="toc-a" onClick="${v.closeToc}"><span style="color:${v.accent}; font-weight:800; min-width:22px">A.</span><span>Pendahuluan</span></a><a href="#s2" class="toc-a" onClick="${v.closeToc}"><span style="color:${v.accent}; font-weight:800; min-width:22px">B.</span><span>Ketentuan Umum Pembelian Tiket</span></a><a href="#s3" class="toc-a" onClick="${v.closeToc}"><span style="color:${v.accent}; font-weight:800; min-width:22px">C.</span><span>Pengiriman E-Ticket</span></a><a href="#s4" class="toc-a" onClick="${v.closeToc}"><span style="color:${v.accent}; font-weight:800; min-width:22px">D.</span><span>Kebijakan Pembatalan dan Pengembalian Dana</span></a><a href="#s5" class="toc-a" onClick="${v.closeToc}"><span style="color:${v.accent}; font-weight:800; min-width:22px">E.</span><span>Verifikasi E-Ticket & Batasan Tanggung Jawab</span></a><a href="#s6" class="toc-a" onClick="${v.closeToc}"><span style="color:${v.accent}; font-weight:800; min-width:22px">F.</span><span>Pelindungan Data Pribadi</span></a></div>
</aside>
<article>

<section id="s1" class="lsec"><h2 class="lh"><span style="color:${v.accent}">A.</span> Pendahuluan</h2><ol class="ll"><li>Syarat dan Ketentuan (“S&K”) ini merupakan perjanjian yang sah dan mengikat antara Anda (“Pengguna” atau “Pembeli Tiket”) dengan PT Wahana Insan Raharja (“WIRTIX” atau “Penyedia Platform”) mengenai tata cara pembelian e-ticket melalui sistem WIRTIX untuk setiap acara (“Event”) yang diselenggarakan oleh penyelenggara acara atau promotor yang menggunakan platform WIRTIX (“Penyelenggara”).</li><li>Dengan mengakses platform, melakukan registrasi, dan menyelesaikan transaksi, Pengguna menyatakan telah membaca, memahami, dan menyetujui seluruh isi S&K ini. WIRTIX bertindak murni sebagai penyedia infrastruktur perangkat lunak (SaaS - Software as a Service). Seluruh kewajiban perizinan, pelaksanaan teknis acara, dan manajemen pengunjung di lapangan merupakan tanggung jawab eksklusif Penyelenggara.</li></ol></section>
<section id="s2" class="lsec"><h2 class="lh"><span style="color:${v.accent}">B.</span> Ketentuan Umum Pembelian Tiket</h2><ol class="ll"><li>Pengguna wajib mengisi data registrasi secara akurat, lengkap, dan valid pada halaman pemesanan sebelum melakukan pembayaran.</li><li>Harga tiket, kategori, dan fase penjualan (misal: Early Bird, Normal) ditentukan sepenuhnya oleh Penyelenggara. WIRTIX tidak bertanggung jawab atas perubahan harga yang dilakukan Penyelenggara sebelum transaksi selesai.</li><li>Transaksi dinyatakan berhasil dan tiket dinyatakan sah apabila pembayaran telah diverifikasi secara efektif oleh Payment Gateway dan Pengguna telah menerima E-Ticket/QR Code resmi.</li><li>Tiket hanya sah jika dibeli melalui tautan/platform resmi WIRTIX atau halaman tiket resmi Penyelenggara yang menggunakan sistem WIRTIX. WIRTIX tidak bertanggung jawab atas penipuan, pemalsuan, atau kerugian yang timbul akibat pembelian tiket dari pihak ketiga atau sumber tidak resmi.</li><li>Jumlah maksimal tiket per akun/transaksi mengikuti batas yang ditetapkan oleh Penyelenggara untuk masing-masing Event dan diterapkan oleh sistem.</li></ol></section>
<section id="s3" class="lsec"><h2 class="lh"><span style="color:${v.accent}">C.</span> Pengiriman E-Ticket</h2><ol class="ll"><li>E-Ticket yang memuat QR Code unik dan nomor referensi transaksi akan dikirimkan secara otomatis oleh sistem melalui nomor WhatsApp dan/atau email yang didaftarkan oleh Pengguna.</li><li>E-Ticket ini bersifat rahasia. Kerugian yang diakibatkan oleh kelalaian Pengguna dalam menjaga kerahasiaan QR Code (seperti membagikan tangkapan layar ke media sosial) sepenuhnya menjadi tanggung jawab Pengguna.</li><li>Apabila terjadi kendala pengiriman E-Ticket setelah pembayaran berhasil, Pengguna dapat menghubungi layanan bantuan WIRTIX melalui email mau@usewirtix.com.</li></ol></section>
<section id="s4" class="lsec"><h2 class="lh"><span style="color:${v.accent}">D.</span> Kebijakan Pembatalan dan Pengembalian Dana</h2><ol class="ll"><li>Kecuali diatur lain secara tertulis dalam S&K ini, seluruh transaksi pembelian tiket bersifat final. Tiket tidak dapat dikembalikan (non-refundable), dibatalkan, atau ditukar dengan alasan apa pun dari pihak Pengguna.</li><li>Apabila Event dibatalkan, ditunda, atau diubah formatnya oleh Penyelenggara akibat kondisi tertentu, kebijakan Pengembalian Dana (Refund) akan diumumkan secara resmi oleh Penyelenggara.</li><li>Ketentuan Potongan Biaya: dalam hal terjadinya Refund yang disetujui, dana yang dikembalikan kepada Pengguna hanya terbatas pada Harga Pokok Tiket. Biaya Layanan Platform (Platform Fee) dan Biaya Transaksi Pembayaran (Payment Gateway/Transfer Fee) bersifat hangus dan tidak dapat dikembalikan.</li><li>WIRTIX hanya akan memproses pencairan Refund kepada Pengguna setelah WIRTIX menerima pengembalian dana acara secara penuh dari pihak Penyelenggara. WIRTIX tidak bertindak sebagai penjamin dana (talangan) atas pembatalan acara oleh Penyelenggara.</li></ol></section>
<section id="s5" class="lsec"><h2 class="lh"><span style="color:${v.accent}">E.</span> Verifikasi E-Ticket & Batasan Tanggung Jawab</h2><ol class="ll"><li>E-Ticket wajib ditunjukkan (melalui perangkat seluler atau cetak fisik yang jelas) beserta kartu identitas asli (KTP/Paspor) saat proses verifikasi di lokasi acara. Satu QR Code hanya berlaku untuk 1 (satu) kali pemindaian (scan).</li><li>Infrastruktur WIRTIX telah dilengkapi dengan fitur pemindaian Offline-First sebagai mitigasi teknis. Namun, segala bentuk keterlambatan, gangguan scan, atau kerugian Pengguna yang secara langsung disebabkan oleh terputusnya jaringan internet penyedia pihak ketiga (ISP) di lokasi acara, kegagalan listrik vendor lokal, bencana alam, atau kondisi kahar (Force Majeure), berada di luar tanggung jawab finansial dan hukum WIRTIX.</li></ol></section>
<section id="s6" class="lsec"><h2 class="lh"><span style="color:${v.accent}">F.</span> Pelindungan Data Pribadi</h2><ol class="ll"><li>Pengumpulan Data: dengan melakukan registrasi, Pengguna memberikan persetujuan eksplisit kepada WIRTIX untuk mengumpulkan dan memproses data pribadi (termasuk namun tidak terbatas pada Nama, NIK/Paspor, Email, dan Nomor WhatsApp) untuk keperluan penerbitan tiket dan manajemen operasional acara.</li><li>Peralihan Tanggung Jawab Data: mengingat sifat platform WIRTIX yang meneruskan 100% data pembeli tiket kepada Penyelenggara melalui dasbor sistem, maka seketika setelah data tersebut diserahkan atau dapat diakses oleh Penyelenggara, seluruh tanggung jawab hukum atas keamanan, penyimpanan, dan pelindungan data pribadi (sesuai UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi) beralih secara mutlak kepada Penyelenggara.</li><li>Pembebasan Tuntutan: Pengguna secara sadar melepaskan dan membebaskan WIRTIX dari segala tuntutan hukum, denda, atau ganti rugi yang timbul akibat kelalaian, kebocoran, eksploitasi, atau penyalahgunaan pemasaran (seperti spamming) atas data pribadi Pengguna yang dilakukan oleh Penyelenggara atau mitra pihak ketiga Penyelenggara setelah acara berakhir.</li></ol></section>

<div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:16px; border:1px solid rgba(212,175,55,0.35); border-radius:16px; padding:24px 28px; background:#0B1324">
<div><p style="margin:0 0 4px; font-size:17px; font-weight:800">Ada pertanyaan tentang kebijakan ini?</p><p style="margin:0; font-size:14px; color:#AEB6C4">Tim kami siap membantu.</p></div>
<a href="mailto:mau@usewirtix.com" style="font-weight:800; text-decoration:none">mau@usewirtix.com →</a>
</div>
<div class="endnav"><a href="/">← Kembali ke Beranda</a><a href="/legal/kebijakan-privasi" style="text-align:right">Baca Kebijakan Privasi →</a></div>
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
