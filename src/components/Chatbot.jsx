import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Link } from "react-router-dom"
import { site, waLink } from "../data/site"
import { LogoMark } from "./Logo"

/* ═══════════════════════════════════════════════════════════════════════
   "Bolt" — an on-site assistant that answers the questions people actually
   ask before enquiring, then captures the lead. Runs fully client-side:
   no API key, no cost per message, instant replies.
   ═══════════════════════════════════════════════════════════════════════ */

const GREETING = {
  text: `Hi 👋 I'm Bolt, ${site.name}'s assistant. Tell me what you're trying to build — or pick one below.`,
  chips: ["What do you build?", "Pricing & timeline", "I run a school/clinic", "Get a free quote"],
}

// keyword → answer. First match wins, so order matters.
const KB = [
  {
    keys: ["price", "pricing", "cost", "quote", "budget", "charge", "rate", "how much"],
    text: "Every build is quoted at a fixed price after a short discovery call — no hourly meter. Marketing sites and landing pages start small; ERP and custom software are quoted module by module. Share your requirement and you'll have a written number, usually within a day.",
    chips: ["Get a free quote", "How long does it take?", "Talk on WhatsApp"],
  },
  {
    keys: ["time", "timeline", "how long", "duration", "fast", "deadline", "urgent", "quick"],
    text: "Websites and landing pages: 2–4 weeks. Custom software, ERP and CRM: 4–8 weeks for a working v1, then weekly sprints. Automations like WhatsApp replies or an AI receptionist can go live in about a week.",
    chips: ["Get a free quote", "What do you build?"],
  },
  {
    keys: ["school", "college", "erp", "student", "admission", "institute", "coaching"],
    text: "We've built an admission management CRM for a college — enquiry capture, stage-wise application tracking, fee status and automatic follow-ups in one dashboard. The full school/college ERP adds attendance, marks, timetable, fee collection and a parent portal.",
    chips: ["See the case study", "Get a free quote"],
  },
  {
    keys: ["clinic", "hospital", "doctor", "patient", "dental", "psycholog", "diagnostic"],
    text: "Our clinic management system covers appointments and doctor schedules, patient records and case history, billing and receipts, plus automated visit reminders over WhatsApp. Add the AI receptionist and missed calls stop costing you appointments.",
    chips: ["Get a free quote", "Tell me about the AI receptionist"],
  },
  {
    keys: ["petrol", "fuel", "bunk", "pump", "diesel"],
    text: "The petrol pump software handles nozzle-wise daily sales entry, shift and tank reconciliation, credit customers with outstanding tracking, and an owner dashboard you can open on your phone.",
    chips: ["Get a free quote", "Talk on WhatsApp"],
  },
  {
    keys: ["restaurant", "cafe", "hotel food", "pos", "menu", "kitchen", "cloud kitchen", "billing counter"],
    text: "For restaurants we build a billing POS with KOT printing, a QR digital menu customers order from, table/delivery/takeaway flows, and daily item-wise sales reports.",
    chips: ["Get a free quote", "See all services"],
  },
  {
    keys: ["room", "booking", "resort", "apartment", "society", "stay", "lodge", "hotel"],
    text: "The hotel and room booking system gives you centralised live availability, fully automated bookings and confirmations, check-in/check-out with folio billing — and an AI receptionist that answers enquiries at 2am too. For apartments we cover maintenance billing, visitors, complaints and a resident app.",
    chips: ["Get a free quote", "Tell me about the AI receptionist"],
  },
  {
    keys: ["whatsapp", "auto reply", "automation", "automate", "reminder", "follow up", "outstanding"],
    text: "WhatsApp automation means every enquiry gets an instant reply, bills and outstanding amounts chase themselves, and cold leads get followed up without anyone remembering to. It plugs into the system we build for you, so replies use real data — not canned text.",
    chips: ["Get a free quote", "Tell me about the AI receptionist"],
  },
  {
    keys: ["ai", "receptionist", "chatbot", "bot", "call", "answer"],
    text: "The AI receptionist answers calls and WhatsApp messages 24/7, captures the caller's name, number and intent, books appointments straight into your calendar, and hands over to a human whenever it's asked. Every missed call becomes a saved lead.",
    chips: ["Get a free quote", "Pricing & timeline"],
  },
  {
    keys: ["app", "android", "ios", "mobile app", "play store"],
    text: "We build Android and iOS apps from one codebase — customer apps, staff and field apps with offline support, ordering, booking and delivery flows — sharing the same backend as your web dashboard. Typically 4–10 weeks including store publishing.",
    chips: ["Get a free quote", "See all services"],
  },
  {
    keys: ["seo", "marketing", "ads", "google", "meta", "instagram", "rank", "traffic", "lead"],
    text: "SEO and ads only pay off when the page they land on is built to convert — so we do both: technical + local SEO, Google Business Profile, Meta and Google Ads setup, and landing pages engineered for the click. With analytics, you see exactly which rupee brought which enquiry.",
    chips: ["Get a free quote", "See all services"],
  },
  {
    keys: ["ecommerce", "e-commerce", "store", "shop", "product", "cart", "payment"],
    text: "We build storefronts wired to an admin panel you actually run yourself: catalogue and variants, online payments plus COD, order lifecycle with customer notifications, stock levels, and automated WhatsApp order updates and abandoned-cart nudges.",
    chips: ["See the case study", "Get a free quote"],
  },
  {
    keys: ["inventory", "stock", "quotation", "invoice", "billing", "gst", "vendor"],
    text: "The inventory and quotation suite tracks stock in/out with batches, turns a quotation into an invoice in one click, handles purchase orders and vendor ledgers, and alerts you on low stock and pending payments.",
    chips: ["Get a free quote", "See all services"],
  },
  {
    keys: ["website", "web", "landing", "build", "what do you", "services", "do you do", "offer"],
    text: "Six things: websites and web apps, custom business software and ERPs, AI and automation, mobile apps, UI/UX design, and SEO with digital marketing. The thread running through all of it — we turn manual operations into digital systems.",
    chips: ["Pricing & timeline", "See all services", "Get a free quote"],
  },
  {
    keys: ["contact", "call you", "phone", "number", "email", "reach", "talk", "meet", "human"],
    text: `Easiest is WhatsApp — you'll usually get a reply within minutes. You can also call ${site.phoneDisplay} or email ${site.email}.`,
    chips: ["Talk on WhatsApp", "Get a free quote"],
  },
  {
    keys: ["portfolio", "work", "case study", "example", "client", "previous", "before"],
    text: "Two recent builds: an admission management CRM for a college, and an e-commerce storefront with a full admin panel. Both replaced registers, spreadsheets and chat threads with one system.",
    chips: ["See the case study", "Get a free quote"],
  },
  {
    keys: ["support", "after", "maintenance", "warranty", "bug"],
    text: "You get 30 days of free support after go-live, then an optional care plan covering hosting, updates, backups and changes. You message a human on WhatsApp — there's no ticket queue.",
    chips: ["Get a free quote", "Talk on WhatsApp"],
  },
  {
    keys: ["hi", "hello", "hey", "vanakkam", "namaste", "good morning", "good evening"],
    text: "Hello! 👋 Tell me about your business and what you'd like to fix — or pick one of these.",
    chips: ["What do you build?", "Pricing & timeline", "Get a free quote"],
  },
]

const FALLBACK = {
  text: "Good question — that one's better answered by a human. Leave your number or email and we'll come back to you, or message us on WhatsApp for an instant reply.",
  chips: ["Get a free quote", "Talk on WhatsApp"],
}

const answerFor = (input) => {
  const q = input.toLowerCase()
  return KB.find((entry) => entry.keys.some((k) => q.includes(k))) || FALLBACK
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [nudge, setNudge] = useState(false)
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState("")
  const [lead, setLead] = useState(null) // null | "name" | "contact" | "need" | "done"
  const [draft, setDraft] = useState({ name: "", contact: "", need: "" })
  const [messages, setMessages] = useState([{ from: "bot", ...GREETING }])
  const scroller = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setNudge(true), 9000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" })
  }, [messages, typing, open])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 350)
  }, [open])

  const push = (msg) => setMessages((m) => [...m, msg])

  const botSay = (payload, delay = 620) => {
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      push({ from: "bot", ...payload })
    }, delay)
  }

  const startLeadCapture = () => {
    setLead("name")
    botSay({ text: "Happy to help. What's your name?" })
  }

  const handleLeadStep = (value) => {
    if (lead === "name") {
      setDraft((d) => ({ ...d, name: value }))
      setLead("contact")
      botSay({ text: `Thanks ${value.split(" ")[0]}. What's the best way to reach you — a mobile number or an email? Either one works.` })
      return
    }
    if (lead === "contact") {
      setDraft((d) => ({ ...d, contact: value }))
      setLead("need")
      botSay({ text: "Got it. In one line, what do you need built?" })
      return
    }
    if (lead === "need") {
      const complete = { ...draft, need: value }
      setDraft(complete)
      setLead("done")

      if (site.leadEndpoint) {
        fetch(site.leadEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...complete, source: `${site.domain} · chatbot`, submittedAt: new Date().toISOString() }),
        }).catch((err) => console.warn(`[lead] chatbot enquiry not delivered by email (${err.message}) — the WhatsApp handoff still applies.`))
      }

      botSay(
        {
          text: `Perfect — noted. ${complete.name.split(" ")[0]}, we'll reach out on ${complete.contact} shortly. Want an answer right now? Send it across on WhatsApp.`,
          chips: ["Talk on WhatsApp"],
          lead: complete,
        },
        800,
      )
    }
  }

  const send = (raw) => {
    const text = (raw ?? input).trim()
    if (!text) return
    push({ from: "user", text })
    setInput("")

    if (text === "Get a free quote") return startLeadCapture()
    if (text === "Talk on WhatsApp") {
      window.open(waLink(), "_blank", "noopener")
      return botSay({ text: "Opening WhatsApp — we'll see you there 👋" }, 400)
    }
    if (lead && lead !== "done") return handleLeadStep(text)

    botSay(answerFor(text), 560 + Math.random() * 400)
  }

  return (
    <>
      {/* Floating action stack */}
      <div className="fixed bottom-5 right-4 z-[55] flex flex-col items-end gap-2.5 sm:bottom-6 sm:right-6">
        <AnimatePresence>
          {nudge && !open && (
            <motion.button
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              onClick={() => { setOpen(true); setNudge(false) }}
              className="max-w-[220px] rounded-2xl rounded-br-md border border-line bg-white px-3.5 py-2.5 text-left text-[13px] leading-snug text-ink shadow-lift"
            >
              <span className="font-semibold">Need a quote?</span> Ask me anything — I reply instantly.
            </motion.button>
          )}
        </AnimatePresence>

        <a
          href={waLink()}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform duration-300 hover:scale-110"
        >
          <svg width="23" height="23" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.13c-.25.69-1.45 1.33-1.99 1.37-.53.05-1.03.24-3.47-.72-2.92-1.15-4.77-4.13-4.91-4.32-.14-.19-1.17-1.56-1.17-2.97s.74-2.11 1-2.4c.26-.29.57-.36.76-.36h.55c.17 0 .42-.07.65.5.25.6.84 2.08.91 2.23.07.15.12.32.02.51-.09.19-.14.31-.28.48l-.42.49c-.14.14-.28.3-.12.58.16.29.71 1.17 1.52 1.89 1.04.93 1.92 1.22 2.2 1.36.28.14.44.12.6-.07.17-.19.7-.82.89-1.1.19-.29.37-.24.63-.14.25.09 1.61.76 1.89.9.28.14.46.21.53.33.07.12.07.69-.18 1.37Z" />
          </svg>
        </a>

        <motion.button
          onClick={() => { setOpen((v) => !v); setNudge(false) }}
          whileTap={{ scale: 0.92 }}
          aria-label={open ? "Close chat" : "Open chat"}
          aria-expanded={open}
          className="relative grid h-14 w-14 place-items-center rounded-full bg-ink text-white shadow-lift transition-colors duration-300 hover:bg-accent hover:text-ink"
        >
          {!open && <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-paper bg-accent animate-pulseDot" />}
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.svg key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </motion.svg>
            ) : (
              <motion.svg key="c" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} width="23" height="23" viewBox="0 0 24 24" fill="none">
                <path d="M21 11.5a8.38 8.38 0 0 1-9 8.34 8.5 8.5 0 0 1-3.8-.9L3 20.5l1.6-4.9A8.38 8.38 0 0 1 3.7 11.5a8.5 8.5 0 0 1 8.6-8.34h.5A8.48 8.48 0 0 1 21 11v.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            role="dialog"
            aria-label="Chat with Bolt"
            className="fixed bottom-[92px] right-4 z-[56] flex h-[min(560px,72vh)] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-lift sm:right-6"
          >
            <header className="flex items-center gap-3 border-b border-line bg-ink px-4 py-3.5 text-white">
              <span className="relative grid h-9 w-9 place-items-center">
                <LogoMark size={34} tile="#16161B" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-ink bg-emerald-400" />
              </span>
              <div className="leading-tight">
                <p className="font-display text-[14px] font-bold">Bolt</p>
                <p className="text-[11px] text-white/60">Usually replies instantly</p>
              </div>
              <a href={waLink()} target="_blank" rel="noreferrer" className="ml-auto rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold transition hover:bg-white/20">
                WhatsApp
              </a>
            </header>

            <div ref={scroller} className="flex-1 space-y-3 overflow-y-auto bg-paper px-4 py-4">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={m.from === "user" ? "flex justify-end" : ""}
                >
                  <div
                    className={`max-w-[86%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed ${
                      m.from === "user"
                        ? "rounded-br-md bg-ink text-white"
                        : "rounded-bl-md border border-line bg-white text-ink-700"
                    }`}
                  >
                    {m.text}
                  </div>

                  {m.chips && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {m.chips.map((chip) =>
                        chip === "See all services" || chip === "See the case study" ? (
                          <Link
                            key={chip}
                            to={chip === "See all services" ? "/services" : "/work"}
                            onClick={() => setOpen(false)}
                            className="rounded-full border border-line bg-white px-3 py-1.5 text-[12.5px] font-medium text-ink transition hover:border-accent hover:text-accent-700"
                          >
                            {chip}
                          </Link>
                        ) : (
                          <button
                            key={chip}
                            onClick={() => send(chip)}
                            className="rounded-full border border-line bg-white px-3 py-1.5 text-[12.5px] font-medium text-ink transition hover:border-accent hover:text-accent-700"
                          >
                            {chip}
                          </button>
                        ),
                      )}
                    </div>
                  )}
                </motion.div>
              ))}

              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex w-fit gap-1 rounded-2xl rounded-bl-md border border-line bg-white px-4 py-3">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="h-1.5 w-1.5 rounded-full bg-ink-300 animate-pulseDot" style={{ animationDelay: `${d * 0.18}s` }} />
                  ))}
                </motion.div>
              )}
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); send() }}
              className="flex items-center gap-2 border-t border-line bg-white px-3 py-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={lead && lead !== "done" ? "Type your answer…" : "Ask about pricing, timelines…"}
                aria-label="Message"
                className="flex-1 rounded-full border border-line bg-paper px-4 py-2.5 text-[13.5px] outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-ink transition hover:bg-ink hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M2 8h11m0 0L8.5 3.5M13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
