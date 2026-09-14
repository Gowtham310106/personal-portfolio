import { Link } from "react-router-dom"
import { motion } from "framer-motion"

import { site, waLink } from "../data/site"
import { faqs } from "../data/work"
import { usePageMeta } from "../hooks/usePageMeta"

import Icon from "../components/Icon"
import LeadForm from "../components/LeadForm"
import Faq from "../components/Faq"
import { AICallCard } from "../components/Dashboards"
import { Reveal, SectionHeading, SplitHeading, SpotlightCard, Stagger, StaggerItem } from "../components/primitives"

export default function Contact() {
  usePageMeta({
    title: "Contact — Get a free quote",
    description: `Tell us what you need built. Call ${site.phoneDisplay}, message us on WhatsApp, or send an enquiry — a mobile number or an email is all we need to get back to you.`,
    path: "/contact",
  })

  const channels = [
    {
      icon: "phone",
      label: "WhatsApp",
      value: "Fastest reply — usually minutes",
      href: waLink(),
      external: true,
      primary: true,
    },
    { icon: "phone", label: "Call us", value: site.phoneDisplay, href: `tel:${site.phone}` },
    { icon: "mail", label: "Email", value: site.email, href: `mailto:${site.email}` },
  ]

  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
        <div className="pointer-events-none absolute -left-32 -top-10 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[130px]" />

        <div className="container relative grid items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* Left: pitch + channels */}
          <div>
            <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulseDot" />
              Taking projects for this month
            </motion.span>

            <SplitHeading text="Tell us what's still manual." className="mt-6 text-display-lg" delay={0.12} highlight={[4]} />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="mt-5 max-w-lg text-[17.5px] leading-relaxed text-ink-500"
            >
              Send a mobile number <span className="font-semibold text-ink">or</span> an email — whichever you prefer.
              You'll get a straight answer on what to build, what it costs, and how long it takes.
            </motion.p>

            <Stagger className="mt-9 space-y-3" gap={0.08}>
              {channels.map((c) => (
                <StaggerItem key={c.label}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className={`group flex items-center gap-4 rounded-xl2 border p-4 transition-all duration-400 hover:-translate-y-0.5 hover:shadow-lift ${
                      c.primary ? "border-accent/30 bg-accent/[0.04]" : "border-line bg-white"
                    }`}
                  >
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors duration-400 ${
                      c.primary ? "bg-[#25D366] text-white" : "bg-paper text-ink ring-1 ring-line group-hover:bg-ink group-hover:text-white"
                    }`}>
                      {c.primary ? (
                        <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.13c-.25.69-1.45 1.33-1.99 1.37-.53.05-1.03.24-3.47-.72-2.92-1.15-4.77-4.13-4.91-4.32-.14-.19-1.17-1.56-1.17-2.97s.74-2.11 1-2.4c.26-.29.57-.36.76-.36h.55c.17 0 .42-.07.65.5.25.6.84 2.08.91 2.23.07.15.12.32.02.51-.09.19-.14.31-.28.48l-.42.49c-.14.14-.28.3-.12.58.16.29.71 1.17 1.52 1.89 1.04.93 1.92 1.22 2.2 1.36.28.14.44.12.6-.07.17-.19.7-.82.89-1.1.19-.29.37-.24.63-.14.25.09 1.61.76 1.89.9.28.14.46.21.53.33.07.12.07.69-.18 1.37Z" />
                        </svg>
                      ) : (
                        <Icon name={c.icon} size={19} />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[12px] font-mono uppercase tracking-[0.14em] text-ink-400">{c.label}</span>
                      <span className="block truncate text-[16px] font-bold tracking-tight">{c.value}</span>
                    </span>
                    <svg className="ml-auto shrink-0 transition-transform duration-300 group-hover:translate-x-1" width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden>
                      <path d="M2.5 7h9m0 0L7.6 3.1M11.5 7 7.6 10.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.3}>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <InfoTile icon="clock" title="Working hours" body="Mon–Sat · 9am to 8pm IST" />
                <InfoTile icon="users" title="Where we work" body={site.serving} />
              </div>
            </Reveal>

            <Reveal delay={0.36}>
              <div className="mt-8">
                <p className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-400">
                  Prefer not to type? Our AI receptionist handles calls like this
                </p>
                <AICallCard />
              </div>
            </Reveal>
          </div>

          {/* Right: the form */}
          <div className="lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <LeadForm id="contact-form" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section border-t border-line bg-white">
        <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading eyebrow="Before you ask" title="Answers to the usual questions." />
            <Reveal delay={0.2}>
              <p className="mt-5 text-[15px] text-ink-500">
                Anything else — ask Bolt, our chatbot in the corner, or{" "}
                <Link to="/services" className="font-semibold text-accent-700 link-underline">browse the services</Link>.
              </p>
            </Reveal>
          </div>
          <Faq items={faqs} />
        </div>
      </section>
    </>
  )
}

function InfoTile({ icon, title, body }) {
  return (
    <SpotlightCard className="card p-4">
      <span className="flex items-center gap-2 text-[13px] font-mono uppercase tracking-[0.12em] text-ink-400">
        <Icon name={icon} size={15} className="text-accent-700" />
        {title}
      </span>
      <p className="mt-1.5 text-[15px] font-semibold tracking-tight">{body}</p>
    </SpotlightCard>
  )
}
