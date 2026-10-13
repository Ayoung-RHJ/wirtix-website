# WIRTIX Website — usewirtix.com

Production build of the new WIRTIX website: 12 pages, fully responsive (desktop + mobile),
pre-rendered for speed and SEO, with Google Analytics behind a consent bar.

Lighthouse (mobile, tested before delivery): 100 Accessibility · 100 Best Practices · 100 SEO on
every page; Performance 100 on 11 pages and 98–100 on the homepage (it varies a little per run).

---

## 1. What's inside

```
wirtix-website/
├── dist/        ← THE WEBSITE. Deploy this folder. Nothing to compile.
├── source/      ← Editable source + build script (only needed to make changes)
└── README.md
```

| Page | URL |
|---|---|
| Home | `/` |
| Platform | `/platform` |
| Plan Your Event (planner + simulation) | `/plan-your-event` |
| Company | `/company` |
| Solutions | `/solusi/promotor-eo` · `/solusi/venue-hospitality` · `/solusi/corporate-b2b` · `/solusi/education` |
| Legal (ID) | `/legal/kebijakan-privasi` · `/legal/syarat-ketentuan` |
| Legal (EN) | `/legal/privacy-policy` · `/legal/terms-conditions` |
| Not found | `404.html` (shown automatically by Vercel) |

Also included in `dist/`: `sitemap.xml`, `robots.txt`, link-preview image for WhatsApp/LinkedIn,
favicons, `site.webmanifest`, and `vercel.json` (clean URLs, long-term caching for images/fonts,
security headers).

---

## 2. Deploy to Vercel

**Recommended: via GitHub (easy updates later)**
1. Create a private GitHub repository and upload the whole `wirtix-website` folder.
2. In Vercel: **Add New → Project → Import** that repository.
3. Settings on the import screen:
   - **Framework Preset:** `Other`
   - **Root Directory:** `dist`
   - **Build Command:** leave empty · **Output Directory:** leave empty
4. Click **Deploy**. You get a preview address like `wirtix-website.vercel.app` — check it there first.

**Alternative: Vercel CLI**
```bash
npm i -g vercel
cd wirtix-website/dist
vercel        # preview
vercel --prod # live
```

**Alternative: Netlify** (the site works identically there — `dist/_headers` and `dist/_redirects` are Netlify's
equivalent of `vercel.json`)
1. In Netlify: **Add new site → Import an existing project → GitHub** → choose `wirtix-website`.
2. Settings: **Base directory:** leave empty · **Build command:** leave empty · **Publish directory:** `dist`
3. **Deploy**. Check the preview address (`*.netlify.app`) first.
4. Domain: **Site configuration → Domain management → Add a domain** → `usewirtix.com` (and `www`),
   then create the DNS records Netlify shows at your registrar. Same warning as below: don't touch
   `kontrol.usewirtix.com` or the MX/email records. HTTPS is issued automatically.

---

## 3. Connect the domain (usewirtix.com)

1. Before switching, **back up the current site** files.
2. In Vercel: **Project → Settings → Domains → Add** `usewirtix.com` and `www.usewirtix.com`
   (set one to redirect to the other — Vercel suggests this automatically).
3. Vercel shows the exact DNS records to create at your domain registrar. Typically:
   - `A` record for `@` → `76.76.21.21`
   - `CNAME` record for `www` → `cname.vercel-dns.com`
   **Always use the values Vercel shows on screen.**
4. ⚠️ **Do NOT change** these existing records:
   - `kontrol.usewirtix.com` (client dashboard / login)
   - any **MX** / email records (keeps `mau@usewirtix.com` working)
5. HTTPS is issued automatically by Vercel within minutes.

---

## 4. Google Analytics (G-5SEL7N47JP)

Already installed on every page. It **only loads after the visitor taps "Setuju"** on the cookie bar
(as stated in the privacy policy / UU PDP). Visitors who tap "Tolak" are not tracked.

Leads are tracked automatically: every tap on a WhatsApp button sends a `whatsapp_click` event with:
`page_path`, `button_text`, `button_type` (`demo`, `consult` or `plan`), and — from the planner —
`event_type` and `visitors`.

**After launch:**
1. Open the site, tap **Setuju**, then in Google Analytics open **Reports → Realtime** — you should see
   yourself within a minute.
2. The next day, go to **Admin → Events**, find `whatsapp_click` and switch on **Mark as key event**.
   GA4 will then count every WhatsApp tap as a lead.
3. Optional: register custom dimensions for `button_type` and `event_type`
   (**Admin → Custom definitions**) to see which pages and event types bring demo requests.

**Google Search Console** (recommended): add `usewirtix.com`, verify via DNS, then submit
`https://usewirtix.com/sitemap.xml`.

---

## 5. Making changes

The site is generated from the designs in `source/pages/*.dc.html`. Edit there, then rebuild —
**don't edit the HTML in `dist/` directly** (the interactive script on each page would undo the change).

Requirements: Python 3.9+ and Node.js 18+ (no extra packages needed).

```bash
cd wirtix-website/source
python3 build.py      # rebuilds ../dist from scratch
```
Then upload/commit `dist/` again (with GitHub, Vercel redeploys automatically on every push).

**Common edits**

| Change | Where |
|---|---|
| Any text on a page | `source/pages/<Page>.dc.html` — find the sentence and edit it |
| WhatsApp number (e.g. moving to WhatsApp Business) | Search & replace `6287878781670` in `source/pages/*.dc.html` **and** `source/build.py` |
| Login link | `LOGIN` in `source/build.py` |
| Page titles / Google descriptions | `PAGES` list at the top of `source/build.py` |
| Swap an image | Replace the file in `source/images/` with one of the **same name** (WebP, similar size) |
| Analytics ID | `GA_ID` in `source/js/site.js` and `GA` in `source/build.py` |
| Footer (all pages) | `source/pages/Footer.dc.html` |

Page files: `Main` = Home, `Plan` = Plan Your Event, `Solusi-*` = Solutions, `Legal-*` = legal pages.

**Planner rules** (Plan Your Event): 1 gate scanner = 500 people per 60 minutes; standby = +1 per 5
scanners (rounded up); 1 edge server per venue; 1 POS per tenant. Defined in `source/pages/Plan.dc.html`.

---

## 6. Launch checklist

- [ ] Preview on `*.vercel.app` checked on a phone and a laptop
- [ ] All "Jadwalkan Demo" / WhatsApp buttons open the right chat
- [ ] "Login" opens `https://kontrol.usewirtix.com/login`
- [ ] Cookie bar appears; after "Setuju" you show up in GA Realtime
- [ ] Domain connected; `kontrol.` subdomain and email still working
- [ ] Sitemap submitted in Google Search Console
- [ ] Share `https://usewirtix.com` in WhatsApp to see the link preview

---

## 7. Technical notes

- Pages are pre-rendered HTML (readable instantly, indexable by Google). A small script
  (Preact + htm, ~6 KB, bundled locally — no external CDN) activates menus, accordions, the
  ticket-journey animation and the planner on the visitor's first interaction.
- Font: Montserrat, self-hosted (`/assets/fonts`), subset for Latin text.
- Images: WebP, sized per device (phones get lighter versions of hero images).
- Accessibility: skip link, labelled buttons, keyboard-reachable controls, `prefers-reduced-motion`
  respected (animations stop for users who disable motion).
- Browser support: all current Chrome, Safari (iOS 15+), Edge and Firefox.
