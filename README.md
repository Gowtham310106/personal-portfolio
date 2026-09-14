# Build Fast Web — buildfastweb.in

Marketing site for **Build Fast Web**: websites, custom business software, ERPs,
mobile apps, AI automation and digital marketing.

React + Vite + Tailwind, with Framer Motion for the scroll/reveal animation work.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
npm run preview  # serve the production build
npm run lint
```

## Where to edit things

Copy and content live in `src/data/` — you can update the site without touching
components:

| File | What's in it |
| --- | --- |
| `src/data/site.js` | Brand name, phone, email, WhatsApp number, Instagram/LinkedIn URLs, stats |
| `src/data/services.js` | The six service groups, the industry solutions grid, the 6-step process |
| `src/data/work.js` | Case studies and the FAQ list |

Pages are in `src/pages/` (Home, Services, Work, About, Contact, NotFound) and
shared components in `src/components/`.

### Lead form → Zoho inbox

`src/components/LeadForm.jsx` requires a name plus **either** a mobile number
or an email — neither one alone is compulsory. The message box is optional.

Submissions (from both the form and the chatbot) are POSTed to `/api/lead`,
a Vercel serverless function that emails them to the Zoho mailbox. Reply-To is
set to the enquirer, so hitting Reply in Zoho answers them directly.

**Environment variables** — set these in Vercel → Settings → Environment
Variables. Never commit them.

| Variable | Value |
| --- | --- |
| `ZOHO_USER` | `hello@buildfastweb.in` |
| `ZOHO_PASS` | a Zoho **app-specific password**, not the login password |
| `ZOHO_HOST` | optional — `smtp.zoho.in` (default) or `smtp.zoho.com`, match your region |
| `LEAD_TO` | optional — where enquiries land; defaults to `ZOHO_USER` |

To create the app password: Zoho Mail → your avatar → My Account → Security →
App Passwords → Generate New Password. Copy it once; Zoho won't show it again.

If the endpoint is unreachable or the mailbox is misconfigured, the form falls
back to opening a pre-filled WhatsApp message, so an enquiry is never lost.

To use a third-party form service instead, set `VITE_LEAD_ENDPOINT` to its URL
and it takes over from `/api/lead`.

### Chatbot

`src/components/Chatbot.jsx` is a rule-based assistant — no API key, no per
message cost, instant replies. Answers live in the `KB` array: each entry has
`keys` (keywords to match) and the reply text plus quick-reply chips. Add
entries there as new questions come up.

### Brand

Colours and type are defined in `tailwind.config.js`:

- `accent` `#FBC11F` — the brand yellow, sampled straight from the logo; used
  for fills, buttons and the headline marker
- `accent-700` `#8A6408` — for text and thin strokes on white (pure yellow fails
  contrast at small sizes)
- `accent-chart` `#D19A05` — chart lines, small dots and indicators

Anything with a yellow background uses **black** type, never white.

The logo is vector, in `src/components/Logo.jsx` — `<Logo />` for the full
lockup, `<LogoMark />` for the mark alone. `public/favicon.svg` is the same
geometry. Nothing is a bitmap, so it stays sharp at any size.

## Deploying

`vercel.json` contains the SPA rewrite rule and asset caching headers. Point the
domain `buildfastweb.in` at the deployment, and update `site.url` in
`src/data/site.js` if the domain ever changes.

Before launching ad traffic, replace the placeholder proof numbers in
`stats` (`src/data/site.js`) with your real, verifiable figures.
