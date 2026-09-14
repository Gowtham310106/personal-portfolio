// ---------------------------------------------------------------------------
// Case studies.
// NOTE: "outcomes" below describe what the system DOES, not invented metrics.
// When you have the client's real numbers (enquiries handled, hours saved,
// collection %, revenue) drop them into `metrics` and they'll render as proof.
// ---------------------------------------------------------------------------

export const caseStudies = [
  {
    slug: "college-admission-crm",
    title: "Admission Management CRM",
    client: "Arts & science college",
    sector: "Education",
    year: "2025",
    mockup: "crm",
    summary:
      "A full admissions pipeline that replaced enquiry registers and scattered counsellor follow-ups with one dashboard the management can open any morning.",
    challenge:
      "Enquiries arrived from walk-ins, phone calls, agents and social media. Each counsellor tracked their own list, follow-ups were forgotten, and nobody could answer a simple question: how many applications are actually in progress right now?",
    build: [
      "Enquiry capture from web form, phone and walk-in — all into one pipeline",
      "Stage-wise application tracking: enquiry → application → documents → fee → admitted",
      "Counsellor assignment with follow-up reminders and call logs",
      "Document upload and verification checklist per applicant",
      "Fee payment status with automatic pending-payment reminders",
      "Management dashboard: course-wise demand, source-wise enquiries, conversion at each stage",
    ],
    outcomes: [
      "Every enquiry lands in one pipeline with an owner and a next action",
      "Management sees live course-wise and stage-wise numbers without asking anyone",
      "Follow-ups fire automatically instead of depending on memory",
    ],
    metrics: [], // e.g. [{ value: "3,200+", label: "Applications processed" }]
    stack: ["React", "Node.js", "PostgreSQL", "Role-based auth", "WhatsApp API"],
    accent: "#FFC800",
  },
  {
    slug: "ecommerce-platform",
    title: "E-commerce Storefront & Admin",
    client: "Retail brand",
    sector: "E-commerce",
    year: "2025",
    mockup: "shop",
    summary:
      "A storefront built for conversion, wired to an admin panel where the owner runs catalogue, orders and stock without calling a developer.",
    challenge:
      "The brand was selling through DMs and screenshots. Orders were lost in chat, stock counts lived in someone's head, and there was no way to run ads to a page that could actually take payment.",
    build: [
      "Fast product catalogue with search, filters and variant handling",
      "Checkout with online payments, COD and order confirmation flow",
      "Admin panel for products, pricing, offers and stock levels",
      "Order lifecycle: placed → packed → shipped → delivered, with customer notifications",
      "Automated WhatsApp order updates and abandoned-cart nudges",
      "Sales dashboard with best-sellers, low stock and daily revenue",
    ],
    outcomes: [
      "Orders are captured and tracked by the system, not in chat threads",
      "The owner updates products and prices without touching code",
      "Ad traffic finally has a page built to take money, not just enquiries",
    ],
    metrics: [],
    stack: ["React", "Payment gateway", "Inventory sync", "WhatsApp API", "Analytics"],
    accent: "#0B0B0F",
  },
]

export const faqs = [
  {
    q: "How much does a project cost?",
    a: "It depends on scope, so we quote a fixed price after a short discovery call — never an open hourly meter. Marketing websites and landing pages start small; full ERP and custom software builds are quoted per module. You'll have the number in writing before anything starts.",
  },
  {
    q: "How fast can you actually launch?",
    a: "A marketing website or landing page typically goes live in 2–4 weeks. Custom software and ERP builds start at 4–8 weeks for a working v1, then grow in weekly sprints. We ship a usable version early instead of disappearing for six months.",
  },
  {
    q: "We already have software / a website. Can you work with it?",
    a: "Yes. We audit what you have, keep what works and replace what doesn't. We also integrate with tools you already run — Tally, Google Sheets, payment gateways, WhatsApp and existing databases.",
  },
  {
    q: "Will my staff be able to use it?",
    a: "That's a design problem, and we treat it as one. Screens are designed for the person who'll actually use them, and we train your team on a recorded call at handover. If a screen needs a manual, it's badly designed.",
  },
  {
    q: "What happens after launch?",
    a: "30 days of free support after go-live, then an optional care plan covering hosting, updates, backups and changes. You message a human on WhatsApp — no ticket queue.",
  },
  {
    q: "Do you own my data and code?",
    a: "You do. Source code, database and hosting accounts are handed over in your name. No lock-in, no hostage situations.",
  },
]
