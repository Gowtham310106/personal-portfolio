// ---------------------------------------------------------------------------
// Single source of truth for brand + contact details.
// Update here and it changes everywhere (nav, footer, forms, chatbot, SEO).
// ---------------------------------------------------------------------------

export const site = {
  name: "Build Fast Web",
  domain: "buildfastweb.in",
  url: "https://buildfastweb.in",
  tagline: "Manual work in, digital systems out.",
  description:
    "Build Fast Web designs and builds websites, custom business software, ERPs and AI automations that turn manual operations into digital systems.",

  // Professional inbox to create on the domain. Aliases worth adding later:
  // sales@buildfastweb.in (ads + quotes)  |  support@buildfastweb.in (existing clients)
  email: "hello@buildfastweb.in",

  phoneDisplay: "+91 97895 02278",
  phone: "+919789502278",
  whatsapp: "919789502278", // wa.me number, digits only

  // Paste the Instagram URL here once it is live — the icon stays hidden while empty.
  instagram: "",
  linkedin: "",

  location: "Tamil Nadu, India",
  serving: "Working with businesses across India, UAE & the US",

  // Where enquiries are POSTed. /api/lead is our own serverless function,
  // which emails them to the Zoho inbox (see api/lead.js). Override with
  // VITE_LEAD_ENDPOINT to use Formspree/Web3Forms instead. If the endpoint
  // is unreachable the form falls back to a WhatsApp handoff, so an enquiry
  // is never lost.
  leadEndpoint: import.meta.env.VITE_LEAD_ENDPOINT || "/api/lead",
}

export const waLink = (message = "Hi Build Fast Web, I'd like to discuss a project.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`

export const nav = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Work", to: "/work" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
]

// ⚠️ Placeholder proof points — swap these for your real, verifiable numbers
// before you spend money on ads. Wrong claims kill trust faster than no claims.
export const stats = [
  { value: 14, suffix: "+", label: "Systems shipped", sub: "Web, ERP, CRM & automation builds" },
  { value: 21, suffix: " days", label: "Typical go-live", sub: "From kickoff to a working v1" },
  { value: 9, suffix: "", label: "Industries served", sub: "Education, retail, clinics, hospitality" },
  { value: 100, suffix: "%", label: "Built in-house", sub: "No outsourcing, no template dumps" },
]
