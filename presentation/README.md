# Build Fast Web — capability presentation

A 32-slide deck for in-person pitches: what Build Fast Web builds, for which
industry, and what each system's dashboard actually looks like.

| File | What it is |
| --- | --- |
| `Build-Fast-Web-Capabilities.pptx` | The deck. Editable in PowerPoint, Keynote or Google Slides. |
| `Build-Fast-Web-Capabilities.pdf` | Same deck, fixed layout — use this to present if fonts shift. |
| `mockups/*.png` | The 14 dashboard screens used in the deck (2800×1680, reusable on the site). |
| `src/` | The generator: slide code plus the HTML/CSS the dashboards are rendered from. |

## What's in the deck

1. Cover, positioning, delivered work, before/after
2. **Systems** — school ERP, college ERP, admission system, clinic, petrol pump,
   restaurant POS, hotel & booking, inventory & billing, society, agency/projects
3. **Websites** — marketing sites, landing pages, e-commerce, portals, SEO
4. **AI** — AI receptionist (with the inbound call flow), outbound AI calling,
   chatbot, online booking, automations
5. **Anything else** — the parts every custom system is assembled from, mobile
   apps and UI/UX
6. Process, three case studies in detail, what's included, tech stack, contact

Slide notes carry the talking points for the cover, the case-study slides and
the close.

## Rebuilding it

Dashboards are real HTML rendered in headless Chromium, so a number or a label
is changed in the HTML — never by editing a PNG.

```bash
cd presentation/src
npm install pptxgenjs                 # the only dependency
node render.cjs mock1.html mock2.html mock3.html mock4.html mock5.html   # mockups → ../mockups
node logo.cjs                          # logo mark → mockups/logo.png
node build.cjs                         # → Build-Fast-Web-Capabilities.pptx
```

`render.cjs`, `logo.cjs` and `build.cjs` expect Playwright's Chromium and write
into the directories named at the top of each file — adjust the paths there if
you move things around.

## Editing the content

- **Slide copy** lives in `src/build.cjs`, one object per slide (`featureSlide`,
  `flowSlide`, `cardGrid`, `sectionSlide`).
- **Dashboard data** lives in `src/mock/mock*.html`; shared styling is in
  `src/mock/mock.css`.
- Contact details, the palette and the fonts are constants at the top of
  `build.cjs` — change them in one place and every slide follows.

The screens use sample data that reflects how these systems are actually used.
Client names on the delivered-work slides are real; the figures on the
dashboards are illustrative.
