// ---------------------------------------------------------------------------
// Real client work, carried over from the portfolio at gk.buildfastweb.in.
// Every project below is a delivered build — the copy describes what was made
// and what changed operationally, with no invented metrics.
// ---------------------------------------------------------------------------

// Logo wall. Order matters — strongest recognition first.
export const clients = [
  { name: "Velammal Institute of Technology", logo: "/clients/velammal-logo.png", system: "Online Admission Portal" },
  { name: "PSR Petrol Pump", logo: "/clients/petrosaas-logo.png", system: "Petrol Pump Operations" },
  { name: "Asian Pest Control", logo: "/clients/apcm-logo.png", system: "Field-Service CRM" },
  { name: "Guppy's World", logo: "/clients/guppys-world-logo.png", system: "E-commerce + Payments" },
  { name: "AntHands", logo: "/clients/anthands-logo.png", system: "Store + Workshop Booking" },
  { name: "Royal Fins", logo: "/clients/royal-fins-logo.png", system: "E-commerce Store" },
  { name: "Lobes", logo: "/clients/lobes-logo.svg", system: "E-commerce Platform" },
  { name: "Snap Tales", logo: "/clients/snap-tales-logo.jpg", system: "Gifts + Event Booking" },
  { name: "Sticky Moments", logo: "/clients/sticky-moments-logo.jpeg", system: "Custom Gift Store" },
  { name: "Tvoy Dom", logo: "/clients/tvoydom-logo.png", system: "Rental Marketplace" },
]

export const caseStudies = [
  {
    slug: "velammal-admission-portal",
    featured: true,
    mockup: "crm",
    title: "Online Admission Portal",
    client: "Velammal Institute of Technology",
    logo: "/clients/velammal-logo.png",
    url: "https://admission.velammalitech.edu.in",
    industry: "Education",
    year: "2024",
    status: "Live",
    summary:
      "The first digital admission system in the institution's history — a paper process replaced by an online application portal and an admin review panel.",
    challenge:
      "Velammal Institute of Technology had no online admission system. Every application was submitted on paper, collected at the office and reviewed by hand — slow, error-prone, and impossible to scale during peak admission season.",
    solution:
      "A full-stack admission portal: a public application form with document uploads and validation, and a backend admin panel where the admissions team reviews, filters and updates application statuses. PWA support was added so it works properly on a phone.",
    outcomes: [
      "First digital admission system in the institution's history",
      "Paper collection and manual tracking eliminated entirely",
      "Admissions team reviews and updates applications in real time",
      "Running through live intake cycles",
    ],
    stack: ["React", "Vite", "Node.js", "MongoDB", "Tailwind CSS", "PWA"],
  },
  {
    slug: "mypetrolpump",
    featured: true,
    mockup: "screenshot",
    screenshot: "/clients/petrosaas-screenshot-1.png",
    title: "MyPetrolPump — Operations System",
    client: "PSR Petrol Pump",
    logo: "/clients/petrosaas-logo.png",
    url: "https://psr.mypetrolpump.in",
    industry: "Fuel Retail",
    year: "2025",
    status: "Live",
    summary:
      "A petrol pump operations system covering daily shifts, fuel sales, staff, automated salary calculation, expenses and financial reports.",
    challenge:
      "Shift records, fuel dispensing tallies, staff attendance, salary calculations and expenses all lived in notebooks and spreadsheets. There was no single place to see the day's numbers, track staff, or produce a monthly report.",
    solution:
      "An operations dashboard covering shift management, daily sales and expense tracking, customer records, staff management with salary calculated automatically from shift data, system logs, settings and a full reports module.",
    outcomes: [
      "Daily shifts and fuel sales tracked in real time — no end-of-day notebook reconciliation",
      "Staff salary calculated automatically from attendance and shift records",
      "Monthly reports generated in seconds instead of compiled by hand",
      "Live and in daily use",
    ],
    stack: ["React", "Vite", "Supabase", "PostgreSQL", "Tailwind CSS", "Vercel"],
  },
  {
    slug: "asian-pest-control",
    featured: true,
    mockup: "erp",
    title: "Field-Service CRM + Landing Page",
    client: "Asian Pest Control",
    logo: "/clients/apcm-logo.png",
    url: "https://asianpestcontrol.com",
    industry: "Field Services",
    year: "2025",
    status: "Live",
    summary:
      "Two connected products: a lead-capture landing page, and a full field-service CRM replacing paper job management, billing and technician coordination.",
    challenge:
      "Everything was manual: jobs assigned over WhatsApp, paper service certificates, handwritten invoices, no way to track technicians or client payments, and no structured follow-up on enquiries.",
    solution:
      "A marketing landing page to capture service enquiries, plus a field-service CRM covering customers, enquiries, quotations, work orders, invoices, payments, a service tracker, technician checklists, certificates, staff management and reporting — deployed on AWS EC2.",
    outcomes: [
      "Paper-based job tracking, billing and technician coordination replaced entirely",
      "Service certificates generated and stored digitally — no printing or filing",
      "Quotation-to-invoice pipeline fully digitised",
      "Technician checklists enforce consistent service quality in the field",
      "Live dashboard tracks jobs, payments and staff performance",
    ],
    stack: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS", "AWS EC2", "Nginx"],
  },
  {
    slug: "guppys-world",
    featured: false,
    title: "Guppy's World",
    client: "Guppy's World",
    logo: "/clients/guppys-world-logo.png",
    url: "https://guppysworld.com",
    industry: "E-commerce · Aquatics",
    year: "2024",
    status: "Live",
    summary:
      "A live-fish store with Razorpay payments and failed-payment lead capture, built for a 60,000-follower Instagram seller shipping across India.",
    outcomes: [
      "60K+ Instagram followers moved into a structured buying flow",
      "Failed payments captured as leads instead of lost sales",
      "Cart, checkout and order tracking fully automated",
    ],
    stack: ["React", "Vite", "Node.js", "MongoDB", "Razorpay", "Vercel"],
  },
  {
    slug: "anthands",
    featured: false,
    title: "AntHands",
    client: "AntHands",
    logo: "/clients/anthands-logo.png",
    url: "https://anthands.in",
    industry: "E-commerce",
    year: "2024",
    status: "Live",
    summary:
      "A custom magnetic-product store with a workshop booking system. Checkout hands over to WhatsApp or a QR code rather than a payment gateway, keeping high-value conversations human.",
    outcomes: [
      "Intent-based buyers captured — low-quality pricing enquiries out of the DMs",
      "Workshop bookings moved from manual WhatsApp to a live calendar",
      "Pricing, categories and availability updated without a developer",
    ],
    stack: ["React", "Vite", "TypeScript", "Node.js", "Tailwind CSS", "Vercel"],
  },
  {
    slug: "royal-fins",
    featured: false,
    title: "Royal Fins",
    client: "Royal Fins",
    logo: "/clients/royal-fins-logo.png",
    url: "https://royalfins.shop",
    industry: "E-commerce · Aquatics",
    year: "2024",
    status: "Live",
    summary:
      "A second live-fish storefront, delivered far faster on the proven architecture from Guppy's World, with a customer review system added.",
    outcomes: [
      "Production-ready store delivered in a fraction of the first build's time",
      "Reusable e-commerce architecture validated across multiple clients",
      "Customer review system added",
    ],
    stack: ["React", "Vite", "Node.js", "MongoDB", "Tailwind CSS", "Vercel"],
  },
  {
    slug: "lobes",
    featured: false,
    title: "Lobes",
    client: "Lobes",
    logo: "/clients/lobes-logo.svg",
    url: "https://lobes.in",
    industry: "E-commerce · Children's Products",
    year: "2025",
    status: "Live — paused pending US licensing",
    summary:
      "An e-commerce platform for a children's slate brand selling into the US, with an AI-generated product video standing in for a photoshoot.",
    outcomes: [
      "Production-ready and deployed, waiting only on licensing",
      "Product video communicates the product without a photoshoot",
      "Admin panel lets the client manage products independently",
    ],
    stack: ["React", "Vite", "Supabase", "PostgreSQL", "Tailwind CSS", "Vercel"],
  },
  {
    slug: "snap-tales",
    featured: false,
    title: "Snap Tales",
    client: "Snap Tales",
    logo: "/clients/snap-tales-logo.jpg",
    url: "https://snaptalesmagnet.in",
    industry: "E-commerce · Photography & Gifts",
    year: "2025",
    status: "Built — awaiting client launch",
    summary:
      "A photo-gift platform combining a custom product creation flow, workshop booking, event registration and a full user dashboard.",
    outcomes: [
      "One platform handles e-commerce, workshop booking and event registration",
      "Custom creation flow gives buyers a tailored product",
      "User dashboard cuts post-purchase support queries",
    ],
    stack: ["React", "Vite", "Node.js", "MongoDB", "Tailwind CSS", "Vercel"],
  },
  {
    slug: "sticky-moments",
    featured: false,
    title: "Sticky Moments",
    client: "Sticky Moments",
    logo: "/clients/sticky-moments-logo.jpeg",
    url: "https://stickymoments.in",
    industry: "E-commerce · Personalised Gifts",
    year: "2025",
    status: "Built — awaiting client launch",
    summary:
      "A custom photo magnet and personalised gift store — the brand's first online presence, with a Google Shopping feed prepared for launch traffic.",
    outcomes: [
      "First digital storefront for the brand, zero to launch-ready",
      "Google Shopping feed ready for post-launch traffic",
      "Admin panel lets the client manage products and orders",
    ],
    stack: ["React", "Vite", "Node.js", "MongoDB", "Tailwind CSS", "Vercel"],
  },
  {
    slug: "tvoy-dom",
    featured: false,
    title: "Tvoy Dom",
    client: "Tvoy Dom — Volgograd, Russia",
    logo: "/clients/tvoydom-logo.png",
    url: "https://tvoydom-dev.vercel.app",
    industry: "Real Estate · Student Accommodation",
    year: "2026",
    status: "In active development",
    summary:
      "A multilingual student accommodation marketplace: Yandex Maps, a 15-language interface, WhatsApp-first enquiries and a full property management panel.",
    outcomes: [
      "International students browse and enquire in 15 languages without a curator",
      "WhatsApp share auto-formats listings to match how landlords already post",
      "Admin panel replaces an entirely WhatsApp-based workflow",
    ],
    stack: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS", "Vercel"],
  },
]

export const featuredWork = caseStudies.filter((c) => c.featured)
export const otherWork = caseStudies.filter((c) => !c.featured)

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
