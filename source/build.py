#!/usr/bin/env python3
"""WIRTIX website build.

Turns the page designs in ./pages (*.dc.html) into the production site in ../dist:
pre-rendered HTML for every page (fast first paint, SEO), plus a small script per page
that makes the interactive parts work (menu, accordions, planner, ...).

Usage:  python3 build.py        (needs Python 3.9+ and Node.js 18+)
"""
import re, os, json, shutil, subprocess, html as H
HERE=os.path.dirname(os.path.abspath(__file__))
SRC=os.path.join(HERE,'pages')+'/'
IMG=os.path.join(HERE,'images')
OUT=os.path.abspath(os.path.join(HERE,'..','dist'))
BLOB=json.load(open(os.path.join(IMG,'blob-map.json')))   # design asset id -> image file name
WA_DEMO='https://wa.me/6287878781670?text=Halo%20WIRTIX%2C%20saya%20ingin%20menjadwalkan%20demo%20untuk%20acara%20saya.'
LOGIN='https://kontrol.usewirtix.com/login'
SITE='https://usewirtix.com'
GA='G-5SEL7N47JP'
PAGES=[ # artboard, url path, out file, lang, title, description, active nav, preload (desktop, mobile)
 ('Main','/','index.html','id','WIRTIX — Event & Venue Management Ecosystem','Ekosistem tiket, akses gerbang, pembayaran cashless, dan data audiens untuk event dan venue, dengan brand Anda di depan.','', ('d180f50ab09748396f042c78953a4769','3fd7a9111eb8f6fc331ad5a0a1bd01ea')),
 ('Platform','/platform','platform.html','id','Platform — WIRTIX','Sepuluh modul yang saling terhubung: ticketing, seating plan, gate access offline-first, POS cashless, settlement otomatis, dan CRM & analytics.','Platform', ('05788629024ac8f2639a41259841f6a5','a611ae235178927aad536700cf2d47f9')),
 ('Plan','/plan-your-event','plan-your-event.html','id','Plan Your Event — WIRTIX','Simulasikan kebutuhan acara Anda: jumlah gate scanner, perangkat, modul, dan skema kemitraan yang tepat dalam 60 detik.','Plan Your Event', ('a10151f2e1291ce6adefa2a45a8da3bb','47c50da77c68f620b964f48177244986')),
 ('Company','/company','company.html','id','Company — WIRTIX','Tim di balik WIRTIX: pengalaman teknologi enterprise dan operasional event langsung dalam satu ekosistem.','Company', None),
 ('Solusi-Promotor','/solusi/promotor-eo','solusi/promotor-eo.html','id','Solusi Promotor & EO — WIRTIX','Jual tiket di halaman ber-brand sendiri dengan data pembeli milik Anda. Solusi WIRTIX untuk konser, festival, dan olahraga.','Solutions', ('7a4dd50797b28faf9387c81179b8f096',None)),
 ('Solusi-Venue','/solusi/venue-hospitality','solusi/venue-hospitality.html','id','Solusi Venue & Hospitality — WIRTIX','POS terpadu untuk tenant, bagi hasil otomatis, dan pemantauan kapasitas untuk venue, expo, dan ruang acara.','Solutions', ('71609c3dd847534209d776335654ae86','/assets/img/food-h-m.webp')),
 ('Solusi-Corporate','/solusi/corporate-b2b','solusi/corporate-b2b.html','id','Solusi Corporate & B2B — WIRTIX','Undangan tertutup, e-tiket QR terenkripsi, dan laporan kehadiran untuk gathering, seminar, dan acara VIP.','Solutions', ('abf5225c6b6ec09f4f5e7c02bec7ac91','/assets/img/seminar-h-m.webp')),
 ('Solusi-Education','/solusi/education','solusi/education.html','id','Solusi Education — WIRTIX','Paket add-on per siswa, kuota tamu, dan pemilihan kursi yang adil untuk wisuda dan acara sekolah.','Solutions', ('6323170da69217bbe6f28807004ebbe4','/assets/img/school-h-m.webp')),
 ('Legal-Privacy-ID','/legal/kebijakan-privasi','legal/kebijakan-privasi.html','id','Kebijakan Privasi — WIRTIX','Kebijakan Privasi WIRTIX: cara kami mengumpulkan, menggunakan, dan melindungi data pribadi.','', None),
 ('Legal-Terms-ID','/legal/syarat-ketentuan','legal/syarat-ketentuan.html','id','Syarat & Ketentuan — WIRTIX','Syarat dan ketentuan pembelian tiket melalui platform WIRTIX.','', None),
 ('Legal-Privacy-EN','/legal/privacy-policy','legal/privacy-policy.html','en','Privacy Policy — WIRTIX','WIRTIX Privacy Policy: how we collect, use and protect personal data.','', None),
 ('Legal-Terms-EN','/legal/terms-conditions','legal/terms-conditions.html','en','Terms & Conditions — WIRTIX','WIRTIX Terms & Conditions for ticket purchases on the WIRTIX platform.','', None),
]
URL={p[0]:p[1] for p in PAGES}
NAV=[('Platform','/platform'),('Solutions','/#solusi'),('Plan Your Event','/plan-your-event'),('Company','/company')]
# ---------- assets ----------
ASSET={}
def asset(bid):
    if bid not in ASSET:
        name=BLOB[bid]; src=os.path.join(IMG,name)
        ASSET[bid]='/assets/img/'+name
        os.makedirs(OUT+'/assets/img',exist_ok=True); shutil.copy(src,OUT+ASSET[bid])
    return ASSET[bid]
def blobs(s): return re.sub(r'/_blob/([0-9a-f]{32})',lambda mm: asset(mm.group(1)),s)
# ---------- footer ----------
F=open(SRC+'Footer.dc.html').read()
FCSS=F[F.index('<style>')+7:F.index('</style>')]
FBODY=F[F.index('</helmet>')+9:F.index('</x-dc>')].strip()
FBODY=FBODY[FBODY.index('>')+1:FBODY.rindex('</div>')]  # inner of wrapper div
FBODY=FBODY.replace('{{accent}}','#D4AF37')
for a,b in [('<a href="#">Ticketing &amp; Seating</a>','<a href="/platform">Ticketing &amp; Seating</a>'),('<a href="#">Gate Access</a>','<a href="/platform">Gate Access</a>'),
            ('<a href="#">POS &amp; Payments</a>','<a href="/platform">POS &amp; Payments</a>'),('<a href="#">CRM &amp; Analytics</a>','<a href="/platform">CRM &amp; Analytics</a>'),
            ('<a href="#">About</a>','<a href="/company">Company</a>'),('<a href="#">Showcase</a>','<a href="/plan-your-event">Plan Your Event</a>'),('<a href="#">Contact</a>','<a href="mailto:mau@usewirtix.com">Contact</a>')]:
    assert FBODY.count(a)==1,a; FBODY=FBODY.replace(a,b)
FBODY='<div id="site-footer">'+FBODY+'</div>'
keep=[]
for rule in re.findall(r'(@media[^{]*\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}|[^{}@]+\{[^{}]*\})',FCSS):
    r=rule.strip()
    if re.match(r'^(body|a|\.wrap|\.kicker|\.btn)\b',r) and not r.startswith('@'): continue
    keep.append(r)
FCSS2='\n'.join(keep)+'\n#site-footer .btn{min-height:52px;padding:0 30px;font-size:14px}\n#site-footer .kicker{margin:0 0 18px;font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#D4AF37}\n@media (max-width: 760px){.fcta{background-image:linear-gradient(180deg, #070B12 0%, rgba(7,11,18,0.72) 30%, rgba(7,11,18,0.78) 70%, #070B12 100%), url(/_blob/3fd7a9111eb8f6fc331ad5a0a1bd01ea)}}'
# ---------- template normalisation ----------
def normalize(name,body):
    body=re.sub(r'<!--.*?-->','',body,flags=re.S)
    active=[p for p in PAGES if p[0]==name][0][6]
    navlinks=''.join(f'<a href="{u}" style="color:{"#D4AF37" if l==active else "#E5E9F0"}; text-decoration:none"{" aria-current=\"page\"" if l==active else ""}>{l}</a>' for l,u in NAV)
    body,n=re.subn(r'(<nav class="dnav"[^>]*>).*?(</nav>)',lambda mm: mm.group(1)+navlinks+mm.group(2),body,count=1,flags=re.S)
    assert n==1,(name,'nav')
    mlinks=''.join(f'<a href="{u}" onClick="{{{{closeMenu}}}}">{l}</a>' for l,u in NAV)+f'<a href="{LOGIN}" style="color:#D4AF37">Login</a>'
    body,n=re.subn(r'<div class="mmenu">.*?</div>(\s*</sc-if>)',lambda mm: f'<div class="mmenu">{mlinks}</div>'+mm.group(1),body,count=1,flags=re.S)
    assert n==1,(name,'mmenu')
    # footer
    if re.search(r'<div class="fph"[^>]*>.*?</div>',body):
        body=re.sub(r'<div class="fph"[^>]*>.*?</div>',FBODY,body,count=1)
    elif re.search(r'<div style="padding:28px 0;[^"]*">\[Footer[^<]*</div>',body):
        body=re.sub(r'<div style="padding:28px 0;[^"]*">\[Footer[^<]*</div>',FBODY,body,count=1)
    else:
        i=body.index('<a href="#demo" class="mcta"')
        body=body[:i]+FBODY+'\n'+body[i:]
    # demo buttons -> WhatsApp
    body=re.sub(r'<a href="(?:#|#demo)"([^>]*)>(Jadwalkan Demo|Jadwalkan Konsultasi|Schedule a Demo)</a>',lambda mm: f'<a href="{WA_DEMO}" target="_blank" rel="noopener" data-wa="demo"{mm.group(1)}>{mm.group(2)}</a>',body)
    body=body.replace('<a href="#" style="font-weight:700; text-decoration:none">Jelajahi platform','<a href="/platform" style="font-weight:700; text-decoration:none">Jelajahi platform')
    def link(mm):
        page,frag=mm.group(1),mm.group(2) or ''
        base=URL.get(page)
        if base is None: return mm.group(0)
        if page=='Main' and frag: return f'href="/{frag}"'
        return f'href="{base}{frag}"'
    body=re.sub(r'href="([A-Za-z-]+)\.dc\.html(#[\w-]+)?"',link,body)
    if name.startswith('Legal'):
        body=body.replace('<a href="#" class="pill"','<a href="'+URL[name]+'" aria-current="page" class="pill"').replace('<a href="#" style="padding:6px 12px','<a href="'+URL[name]+'" aria-current="page" style="padding:6px 12px')
    body=blobs(body)
    return body
# ---------- htm conversion ----------
VOID_HTML=('img','br','hr','input','source','meta','link','wbr')
SVG_EMPTY=('path','circle','rect','polygon','polyline','line','ellipse','image','stop')
def expr(e,scope):
    e=e.strip()
    if e in ('true','false'): return e
    root=e.split('.')[0]
    return e if root in scope else 'v.'+e
def esc_static(t):
    t=H.unescape(t)
    return t.replace('\\','\\\\').replace('`','\\`').replace('${','\\${')
def holes(t,scope):
    out=[];pos=0
    for mm in re.finditer(r'\{\{([^}]*)\}\}',t):
        out.append(esc_static(t[pos:mm.start()])); out.append('${'+expr(mm.group(1),scope)+'}'); pos=mm.end()
    out.append(esc_static(t[pos:])); return ''.join(out)
def convert(t,scope=()):
    out=[];pos=0
    tag=re.compile(r'<sc-(if|for)\s([^>]*)>')
    while True:
        mm=tag.search(t,pos)
        if not mm: out.append(holes(t[pos:],scope)); break
        out.append(holes(t[pos:mm.start()],scope))
        kind=mm.group(1); attrs=mm.group(2)
        # find matching close
        depth=1; i=mm.end(); op=f'<sc-{kind}'; cl=f'</sc-{kind}>'
        while depth:
            a=t.find(op,i); b=t.find(cl,i)
            if a!=-1 and a<b: depth+=1; i=a+len(op)
            else: depth-=1; i=b+len(cl)
        inner=t[mm.end():i-len(cl)]
        if kind=='if':
            cond=re.search(r'value="\{\{([^}]*)\}\}"',attrs).group(1)
            out.append('${'+expr(cond,scope)+' ? html`'+convert(inner,scope)+'` : null}')
        else:
            lst=re.search(r'list="\{\{([^}]*)\}\}"',attrs).group(1); var=re.search(r'as="(\w+)"',attrs).group(1)
            out.append('${('+expr(lst,scope)+' || []).map(('+var+') => html`'+convert(inner,scope+(var,))+'`)}')
        pos=i
    return ''.join(out)
def prep_for_htm(t):
    t=re.sub(r'<('+'|'.join(SVG_EMPTY)+r')(\s[^>]*?)?>\s*</\1>',lambda mm: '<'+mm.group(1)+(mm.group(2) or '')+' />',t)
    t=re.sub(r'<('+'|'.join(VOID_HTML)+r')(\s[^>]*?)?\s*/?>',lambda mm: '<'+mm.group(1)+(mm.group(2) or '')+' />',t)
    t=re.sub(r'\shint-placeholder-[a-z]+="[^"]*"','',t)
    return t
# ---------- SSR via node ----------
def ssr_values(js):
    code='globalThis.window={scrollY:0,addEventListener(){},removeEventListener(){},scrollTo(){}};class DCLogic{constructor(p){this.props=p||{};this.state={}}setState(o){Object.assign(this.state,o)}}\n'+js+'\nconst c=new Component({});const v=c.renderVals();console.log(JSON.stringify(v,(k,x)=>typeof x==="function"?"fn":x))'
    return json.loads(subprocess.run(['node','-e',code],capture_output=True,text=True,check=True).stdout)
# --- tiny template evaluator used for pre-rendering ---
def get(ctx,path):
    path=path.strip()
    if path in('true','false'): return path=='true'
    cur=ctx
    for k in path.split('.'): cur=cur.get(k) if isinstance(cur,dict) else None
    return cur
def expand(t,ctx):
    def sub_for(mm):
        lst=get(ctx,mm.group(1)) or []; name=mm.group(2); body=mm.group(3)
        return ''.join(expand(body,{**ctx,name:it}) for it in lst)
    while True:
        n=re.sub(r'<sc-for list="\{\{([^}]+)\}\}" as="(\w+)"[^>]*>((?:(?!<sc-for).)*?)</sc-for>',sub_for,t,count=1,flags=re.S)
        if n==t: break
        t=n
    t=re.sub(r'<sc-if value="\{\{([^}]+)\}\}"[^>]*>(.*?)</sc-if>',lambda mm: mm.group(2) if get(ctx,mm.group(1)) else '',t,flags=re.S)
    t=re.sub(r'\{\{([^}]+)\}\}',lambda mm: str(get(ctx,mm.group(1))),t)
    return t
def ssr(body,v):
    h=expand(body,v)
    h=re.sub(r'\shint-placeholder-[a-z]+="[^"]*"','',h)
    h=re.sub(r'\s(onClick|onScroll|onInput)="[^"]*"','',h)
    h=h.replace('="None"','=""').replace('>None<','><')
    return h
# ---------- page assembly ----------
FONT_CSS='@font-face{font-family:"Montserrat";src:url(/assets/fonts/montserrat.woff2) format("woff2");font-weight:400 900;font-style:normal;font-display:swap}\n'
CONSENT_CSS='''#consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:200;max-width:560px;margin:0 auto;display:none;align-items:center;gap:14px;flex-wrap:wrap;padding:14px 16px;border-radius:14px;background:rgba(11,21,40,0.97);border:1px solid rgba(212,175,55,0.45);box-shadow:0 14px 40px rgba(0,0,0,0.5);font-family:Montserrat,"Segoe UI",sans-serif;color:#E5E9F0;font-size:13px;line-height:1.5}
#consent.show{display:flex}#consent p{margin:0;flex:1 1 220px}#consent a{color:#F2D27A}
#consent button{min-height:40px;padding:0 16px;border-radius:10px;font-family:inherit;font-weight:800;font-size:12px;letter-spacing:1px;text-transform:uppercase;cursor:pointer}
#consent .ok{background:#D4AF37;color:#0A0F18;border:0}#consent .no{background:transparent;color:#E5E9F0;border:1px solid rgba(255,255,255,0.3)}
.skip{position:absolute;left:-9999px;top:8px;z-index:300;padding:10px 14px;background:#D4AF37;color:#0A0F18;font-weight:800;border-radius:8px}.skip:focus{left:8px}
'''
def consent_html(lang):
    if lang=='en':
        return '<div id="consent" role="dialog" aria-live="polite" aria-label="Cookie consent"><p>We use analytics cookies to improve this site. <a href="/legal/privacy-policy">Privacy Policy</a></p><button type="button" class="no" data-consent="denied">Decline</button><button type="button" class="ok" data-consent="granted">Accept</button></div>'
    return '<div id="consent" role="dialog" aria-live="polite" aria-label="Persetujuan cookie"><p>Kami menggunakan cookie untuk analitik agar situs ini makin baik. <a href="/legal/kebijakan-privasi">Kebijakan Privasi</a></p><button type="button" class="no" data-consent="denied">Tolak</button><button type="button" class="ok" data-consent="granted">Setuju</button></div>'
def head(p,css,preload):
    name,path,out,lang,title,desc,active,_=p
    canon=SITE+(path if path!='/' else '/')
    pl=''
    if preload:
        d,mo=preload
        if d and mo:
            mop=mo if mo.startswith('/') else asset(mo)
            pl+=f'<link rel="preload" as="image" href="{asset(d)}" media="(min-width: 761px)" fetchpriority="high">\n<link rel="preload" as="image" href="{mop}" media="(max-width: 760px)" fetchpriority="high">\n'
        elif d: pl+=f'<link rel="preload" as="image" href="{asset(d)}" fetchpriority="high">\n'
    ld=''
    if name=='Main':
        ld='<script type="application/ld+json">'+json.dumps({"@context":"https://schema.org","@type":"Organization","name":"WIRTIX","legalName":"PT Wahana Insan Raharja","url":SITE,"logo":SITE+"/assets/brand/icon-512.png","email":"mau@usewirtix.com","telephone":"+62-21-2271-6290","address":{"@type":"PostalAddress","streetAddress":"Kemang Point, Lt. 3, Jl. Kemang Raya No. 12","addressLocality":"Jakarta Selatan","postalCode":"12720","addressCountry":"ID"},"sameAs":["https://www.linkedin.com/company/wirtix/"]},ensure_ascii=False)+'</script>\n'
    alt=''
    pair={'Legal-Privacy-ID':'Legal-Privacy-EN','Legal-Privacy-EN':'Legal-Privacy-ID','Legal-Terms-ID':'Legal-Terms-EN','Legal-Terms-EN':'Legal-Terms-ID'}
    if name in pair:
        other=[q for q in PAGES if q[0]==pair[name]][0]
        alt=f'<link rel="alternate" hreflang="{lang}" href="{canon}">\n<link rel="alternate" hreflang="{other[3]}" href="{SITE+other[1]}">\n'
    return f'''<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{H.escape(title)}</title>
<meta name="description" content="{H.escape(desc)}">
<meta name="theme-color" content="#070B12">
<link rel="canonical" href="{canon}">
{alt}<meta property="og:type" content="website">
<meta property="og:site_name" content="WIRTIX">
<meta property="og:title" content="{H.escape(title)}">
<meta property="og:description" content="{H.escape(desc)}">
<meta property="og:url" content="{canon}">
<meta property="og:image" content="{SITE}/assets/brand/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="{'en_US' if lang=='en' else 'id_ID'}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/brand/icon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/assets/brand/icon-180.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/assets/fonts/montserrat.woff2" as="font" type="font/woff2" crossorigin>
{pl}<link rel="modulepreload" href="/assets/js/runtime.js">
{ld}<style>{css}</style>
</head>
'''
def page_css(src):
    c=src[src.index('<style>')+7:src.index('</style>')]
    return c
def minify_css(c):
    c=re.sub(r'/\*.*?\*/','',c,flags=re.S)
    c=re.sub(r'\s*\n\s*','',c); c=re.sub(r'\s*([{};,])\s*',r'\1',c)
    return c.replace(';}','}')
def build_page(p):
    name,path,out,lang,title,desc,active,preload=p
    s=open(SRC+name+'.dc.html').read()
    body=s[s.index('</helmet>')+9:s.index('</x-dc>')].strip()
    js=s[s.index('class Component'):s.rindex('</script>')].strip()
    body=normalize(name,body)
    js=blobs(js)
    v=ssr_values(js)
    pre=ssr(body,v)
    if name=='Platform':
        body=body.replace('<h4>','<h3>').replace('</h4>','</h3>')
    if name=='Plan':
        body=re.sub(r'<div class="pstep"><b>(\d)</b><h3>(.*?)</h3></div>',r'<div class="pstep"><b>\1</b><h2>\2</h2></div>',body)
    pre=ssr(body,v)
    tpl=convert(prep_for_htm(body))
    pjs=f"import {{ html, mount, DCLogic }} from '/assets/js/runtime.js';\n{js}\nComponent.view = (v) => html`{tpl}`;\nmount(Component);\n"
    jsname=out.replace('/','-').replace('.html','')+'.js'
    os.makedirs(OUT+'/assets/js/pages',exist_ok=True)
    open(OUT+'/assets/js/pages/'+jsname,'w').write(pjs)
    css=FONT_CSS+blobs(page_css(s))+'\n'+blobs(FCSS2)+'\n'+CONSENT_CSS
    MOBHERO={'Solusi-Venue':('71609c3dd847534209d776335654ae86','food-h-m.webp','o_food_h_m.webp'),'Solusi-Corporate':('abf5225c6b6ec09f4f5e7c02bec7ac91','seminar-h-m.webp','o_seminar_h_m.webp'),'Solusi-Education':('6323170da69217bbe6f28807004ebbe4','school-h-m.webp','o_school_h_m.webp')}
    if name in MOBHERO:
        bid,fn,srcf=MOBHERO[name]; shutil.copy(os.path.join(IMG,fn),OUT+'/assets/img/'+fn)
        css+='\n@media (max-width: 760px){.shero{background-image:linear-gradient(180deg, rgba(7,11,18,0.62) 0%, rgba(7,11,18,0.80) 60%, #070B12 100%), url(/assets/img/'+fn+')}}'
    if name=='Main':
        shutil.copy(os.path.join(IMG,'strip-m.webp'),OUT+'/assets/img/strip-m.webp')
        css+='\n@media (max-width: 760px){.ev{background-image:url(/assets/img/strip-m.webp)}}'
    css+='\n#site-footer{content-visibility:auto;contain-intrinsic-size:auto 1000px}'
    if name=='Platform':
        css=re.sub(r'\bh4\b','h3',css)
    if name=='Plan':
        css=css.replace('.pstep h3','.pstep h2')
    doc=head(p,minify_css(css),preload)+f'''<body>
<a class="skip" href="#main">{'Skip to content' if lang=='en' else 'Lewati ke konten'}</a>
<div id="app"><main id="main">{pre}</main></div>
{consent_html(lang)}
<script type="module" src="/assets/js/pages/{jsname}"></script>
<script type="module" src="/assets/js/site.js"></script>
</body>
</html>
'''
    os.makedirs(os.path.dirname(OUT+'/'+out),exist_ok=True)
    open(OUT+'/'+out,'w').write(doc)
    return out,len(doc)
# ---------- static extras ----------
def extras():
    os.makedirs(OUT+'/assets/js/vendor',exist_ok=True); os.makedirs(OUT+'/assets/fonts',exist_ok=True); os.makedirs(OUT+'/assets/brand',exist_ok=True)
    J=os.path.join(HERE,'js')
    shutil.copy(os.path.join(J,'vendor','preact-htm.js'),OUT+'/assets/js/vendor/preact-htm.js')
    shutil.copy(os.path.join(J,'runtime.js'),OUT+'/assets/js/runtime.js')
    shutil.copy(os.path.join(J,'site.js'),OUT+'/assets/js/site.js')
    shutil.copy(os.path.join(HERE,'fonts','montserrat.woff2'),OUT+'/assets/fonts/montserrat.woff2')
    for f in ('icon-32.png','icon-180.png','icon-512.png','og-image.jpg'): shutil.copy(os.path.join(HERE,'brand',f),OUT+'/assets/brand/'+f)
    shutil.copy(os.path.join(HERE,'404.html'),OUT+'/404.html')
    open(OUT+'/site.webmanifest','w').write(json.dumps({"name":"WIRTIX","short_name":"WIRTIX","icons":[{"src":"/assets/brand/icon-180.png","sizes":"180x180","type":"image/png"},{"src":"/assets/brand/icon-512.png","sizes":"512x512","type":"image/png"}],"theme_color":"#070B12","background_color":"#070B12","display":"standalone"},indent=1))
    open(OUT+'/robots.txt','w').write(f'User-agent: *\nAllow: /\n\nSitemap: {SITE}/sitemap.xml\n')
    urls=''.join(f'  <url><loc>{SITE+p[1]}</loc><changefreq>monthly</changefreq><priority>{"1.0" if p[1]=="/" else ("0.8" if not p[1].startswith("/legal") else "0.3")}</priority></url>\n' for p in PAGES)
    open(OUT+'/sitemap.xml','w').write(f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{urls}</urlset>\n')
    vercel={"cleanUrls":True,"trailingSlash":False,
      "headers":[
        {"source":"/assets/(.*)","headers":[{"key":"Cache-Control","value":"public, max-age=31536000, immutable"}]},
        {"source":"/(.*)","headers":[{"key":"X-Content-Type-Options","value":"nosniff"},{"key":"Referrer-Policy","value":"strict-origin-when-cross-origin"},{"key":"X-Frame-Options","value":"SAMEORIGIN"},{"key":"Permissions-Policy","value":"camera=(), microphone=(), geolocation=()"},{"key":"Strict-Transport-Security","value":"max-age=31536000; includeSubDomains"}]}
      ],
      "redirects":[{"source":"/index","destination":"/","permanent":True}]}
    open(OUT+'/vercel.json','w').write(json.dumps(vercel,indent=2))
    # Netlify equivalents of vercel.json (Netlify serves /platform -> platform.html automatically)
    open(OUT+'/_headers','w').write("""/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: SAMEORIGIN
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains
""")
    open(OUT+'/_redirects','w').write("/index      /     301\n/index.html /     301\n")
if __name__=='__main__':
    if os.path.exists(OUT): shutil.rmtree(OUT)
    os.makedirs(OUT)
    extras()
    for p in PAGES: print(build_page(p))
    print('assets',len(ASSET))
