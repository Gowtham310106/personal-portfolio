// ---------------------------------------------------------------------------
// Service catalogue. Grouped into the 6 buying decisions a customer actually
// makes — not a flat list of 30 technologies.
// ---------------------------------------------------------------------------

export const serviceGroups = [
  {
    id: "web",
    number: "01",
    title: "Websites & Web Apps",
    kicker: "Be found. Be believed. Be booked.",
    summary:
      "Fast, search-ready sites built to convert traffic into enquiries — not brochures that sit there looking pretty.",
    deliverables: [
      "Custom marketing websites & landing pages",
      "Business & corporate websites",
      "E-commerce stores with payments + logistics",
      "Web applications and customer portals",
      "Landing pages built specifically for ad traffic",
      "Speed, Core Web Vitals & technical SEO baked in",
    ],
    outcome: "A site that loads in under 2s and turns visitors into enquiries.",
    timeline: "2–4 weeks",
  },
  {
    id: "software",
    number: "02",
    title: "Custom Business Software",
    kicker: "Your operations, finally in one place.",
    summary:
      "Registers, WhatsApp groups and twelve Excel files replaced by one system your whole team logs into.",
    deliverables: [
      "Inventory & stock management systems",
      "Quotation, invoicing & billing software",
      "CRM and lead management dashboards",
      "Admission & enquiry management systems",
      "Role-based dashboards for owners, staff & admins",
      "Reports, exports and audit trails",
    ],
    outcome: "One dashboard that shows what's really happening in the business.",
    timeline: "4–8 weeks",
  },
  {
    id: "ai",
    number: "03",
    title: "AI & Automation",
    kicker: "Work that runs while you sleep.",
    summary:
      "AI receptionists, WhatsApp automation and follow-up bots that answer instantly — every time, at 2am included.",
    deliverables: [
      "AI receptionist that answers calls & captures details",
      "WhatsApp auto-replies and instant lead response",
      "Website chatbots trained on your business",
      "Automated bill & outstanding-payment reminders",
      "Follow-up sequences that chase cold leads for you",
      "Workflow automation between your existing tools",
    ],
    outcome: "Every enquiry answered in seconds, every payment chased on time.",
    timeline: "1–3 weeks",
  },
  {
    id: "apps",
    number: "04",
    title: "Mobile App Development",
    kicker: "Android & iOS from one codebase.",
    summary:
      "Customer apps, staff apps and delivery apps — connected to the same system as your web dashboard.",
    deliverables: [
      "Customer-facing Android & iOS apps",
      "Staff / field-team apps with offline support",
      "Ordering, booking & delivery apps",
      "Push notifications and in-app messaging",
      "Play Store & App Store publishing",
      "One backend shared with your web dashboard",
    ],
    outcome: "Your service in your customer's pocket, not just their browser.",
    timeline: "4–10 weeks",
  },
  {
    id: "design",
    number: "05",
    title: "UI/UX Design",
    kicker: "Software people don't need training to use.",
    summary:
      "Interface design for dashboards and apps, so your staff stop asking 'where do I click?' on day two.",
    deliverables: [
      "Product & dashboard UI design",
      "Website and landing page design systems",
      "Mobile app UI/UX",
      "Clickable prototypes before a line of code",
      "Brand kit: colours, type, components",
      "Design handoff your future developers can read",
    ],
    outcome: "Interfaces so obvious that training takes ten minutes.",
    timeline: "1–3 weeks",
  },
  {
    id: "growth",
    number: "06",
    title: "SEO & Digital Marketing",
    kicker: "Traffic that pays for itself.",
    summary:
      "Rank for what your buyers actually search, and run ads that land on pages engineered to convert.",
    deliverables: [
      "Technical SEO & on-page optimisation",
      "Local SEO and Google Business Profile",
      "Meta & Google Ads campaign setup",
      "Conversion-focused landing pages",
      "Analytics, call tracking & lead attribution",
      "Content and social media systems",
    ],
    outcome: "You know exactly which rupee brought which enquiry.",
    timeline: "Ongoing",
  },
]

// Ready-made products — the fastest way to explain "we've built this before".
export const industrySolutions = [
  {
    name: "School & College ERP",
    for: "Schools, colleges, coaching institutes",
    points: ["Admissions & enquiry CRM", "Attendance, marks & timetable", "Fee collection + auto reminders", "Parent portal & notifications"],
    icon: "school",
  },
  {
    name: "Clinic & Hospital Management",
    for: "Clinics, dentists, psychology & diagnostic centres",
    points: ["Appointments & doctor schedules", "Patient records and case history", "Billing, insurance & receipts", "Automated visit reminders"],
    icon: "clinic",
  },
  {
    name: "Petrol Pump Software",
    for: "Fuel stations & bunk owners",
    points: ["Nozzle-wise daily sales entry", "Credit customers & outstanding", "Shift, stock & tank reconciliation", "Owner dashboard on mobile"],
    icon: "fuel",
  },
  {
    name: "Restaurant POS & Digital Menu",
    for: "Restaurants, cafés, cloud kitchens",
    points: ["Billing POS + KOT printing", "QR digital menu & ordering", "Table, delivery & takeaway flows", "Daily sales and item reports"],
    icon: "pos",
  },
  {
    name: "Hotel & Room Booking System",
    for: "Hotels, resorts, service apartments",
    points: ["Centralised live room availability", "Automated bookings & confirmations", "Check-in / check-out & folio billing", "AI receptionist for enquiries"],
    icon: "hotel",
  },
  {
    name: "Apartment & Society Management",
    for: "Apartments, gated communities, builders",
    points: ["Maintenance billing & collection", "Visitor and gate management", "Complaint tracking with SLAs", "Resident app & announcements"],
    icon: "apartment",
  },
  {
    name: "Inventory & Quotation Suite",
    for: "Traders, distributors, manufacturers",
    points: ["Stock in / out with batch tracking", "Quotation to invoice in one click", "Purchase orders & vendor ledger", "Low-stock and payment alerts"],
    icon: "inventory",
  },
  {
    name: "AI Receptionist",
    for: "Any business that misses calls",
    points: ["Answers calls & WhatsApp 24/7", "Captures name, number & intent", "Books appointments into your calendar", "Hands over to a human on demand"],
    icon: "ai",
  },
]

export const process = [
  {
    step: "01",
    title: "Discovery call",
    body: "30 minutes on how your business actually runs today — the registers, the WhatsApp groups, the Excel sheets. We map every manual step worth killing.",
    duration: "Day 1",
  },
  {
    step: "02",
    title: "Blueprint & fixed quote",
    body: "You get a written scope, screen-by-screen plan and a fixed price. No hourly surprises, no 'that's extra' halfway through the build.",
    duration: "Day 2–4",
  },
  {
    step: "03",
    title: "Design you approve first",
    body: "Clickable screens before any code is written. You click through the real flow and change your mind while changes are still free.",
    duration: "Week 1",
  },
  {
    step: "04",
    title: "Build in weekly sprints",
    body: "Every week you get a live link and a short video walkthrough. You watch the system grow instead of waiting in the dark for two months.",
    duration: "Week 2+",
  },
  {
    step: "05",
    title: "Launch & train your team",
    body: "We migrate your existing data, go live, and train your staff on a call they can record. Handover documents included.",
    duration: "Go-live",
  },
  {
    step: "06",
    title: "Support that answers",
    body: "30 days of free post-launch support, then an optional care plan. You message a human on WhatsApp, not a ticket queue.",
    duration: "Ongoing",
  },
]
