import { Link } from "react-router-dom"
import { motion } from "framer-motion"

import { clients, featuredWork, otherWork } from "../data/work"
import { site, waLink } from "../data/site"
import { usePageMeta } from "../hooks/usePageMeta"

import CTASection from "../components/CTASection"
import ClientLogos from "../components/ClientLogos"
import { DashboardCRM, DashboardERP, BrowserFrame } from "../components/Dashboards"
import { Reveal, SectionHeading, SplitHeading, SpotlightCard, Stagger, StaggerItem } from "../components/primitives"

export default function Work() {
  usePageMeta({
    title: "Our Work — Admission portals, ERPs, CRMs & e-commerce",
    description:
      "Real systems built by Build Fast Web: a college admission portal for Velammal Institute of Technology, petrol pump operations for PSR, a field-service CRM for Asian Pest Control, and e-commerce platforms across India, Russia and the US.",
    path: "/work",
  })

  return (
    <>
      <section className="relative overflow-hidden border-b border-line pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
        <div className="pointer-events-none absolute -left-32 top-10 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[130px]" />

        <div className="container relative">
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-chart animate-pulseDot" />
            Selected work
          </motion.span>

          <SplitHeading text="Built, shipped, and still running." className="mt-6 max-w-3xl text-display-xl" delay={0.12} highlight={[3, 4]} />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-6 max-w-2xl text-[18px] leading-relaxed text-ink-500"
          >
            Every project below started the same way: a business drowning in registers, spreadsheets and
            WhatsApp threads. Here's what replaced them — and most are live right now, so you can go and look.
          </motion.p>
        </div>
      </section>

      <ClientLogos clients={clients} title="Systems we've built and handed over" />

      {featuredWork.map((cs, i) => (
        <CaseStudy key={cs.slug} cs={cs} index={i} />
      ))}

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="More builds"
            title="Storefronts, marketplaces and booking systems."
            sub="Seven more delivered projects — across aquatics, gifting, children's products and student accommodation, in India, Russia and the US."
          />

          <Stagger className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3" gap={0.07}>
            {otherWork.map((cs) => (
              <StaggerItem key={cs.slug}>
                <SpotlightCard className="card card-hover flex h-full flex-col p-6">
                  <div className="flex items-start justify-between gap-4">
                    <img src={cs.logo} alt={cs.client} loading="lazy" className="h-9 w-auto max-w-[120px] object-contain" />
                    <StatusPill status={cs.status} />
                  </div>

                  <p className="mt-5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-400">
                    {cs.industry} · {cs.year}
                  </p>
                  <h3 className="mt-2 text-[20px] font-extrabold tracking-tight">{cs.title}</h3>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-500">{cs.summary}</p>

                  <ul className="mt-4 space-y-1.5">
                    {cs.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-2 text-[13.5px] leading-snug text-ink-700">
                        <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-accent-chart" />
                        {o}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-5">
                    <div className="flex flex-wrap gap-1.5 border-t border-line pt-5">
                      {cs.stack.map((t) => (
                        <span key={t} className="rounded-full bg-paper px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-400 ring-1 ring-line">
                          {t}
                        </span>
                      ))}
                    </div>
                    <VisitLink url={cs.url} className="mt-5" />
                  </div>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.15}>
            <p className="mt-12 text-center text-[15px] text-ink-500">
              Want a walkthrough of a live system?{" "}
              <a href={waLink("Hi, can I see a demo of one of your systems?")} target="_blank" rel="noreferrer" className="font-semibold text-accent-700 link-underline">
                Ask for a demo on WhatsApp
              </a>{" "}
              or call{" "}
              <a href={`tel:${site.phone}`} className="font-semibold text-ink link-underline">{site.phoneDisplay}</a>.
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Your business could be next."
        sub="Tell us what's manual today. We'll show you the version of it that runs on a system."
      />
    </>
  )
}

function StatusPill({ status }) {
  const live = /^live/i.test(status)
  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-1 text-[10.5px] font-semibold leading-tight ${
        live ? "bg-emerald-50 text-emerald-700" : "bg-paper text-ink-400 ring-1 ring-line"
      }`}
    >
      {live && <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 align-middle" />}
      {status}
    </span>
  )
}

function VisitLink({ url, className = "" }) {
  if (!url) return null
  const host = url.replace(/^https?:\/\//, "").replace(/\/$/, "")
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={`group/link inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-ink transition-colors hover:text-accent-700 ${className}`}
    >
      {host}
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
        <path d="M4 10 10 4m0 0H5m5 0v5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  )
}

function CaseStudy({ cs, index }) {
  const flip = index % 2 === 1

  const visual =
    cs.mockup === "screenshot" && cs.screenshot ? (
      <BrowserFrame url={cs.url.replace(/^https?:\/\//, "")}>
        {/* the capture includes the OS taskbar — crop it off with the frame */}
        <div className="overflow-hidden" style={{ aspectRatio: "1.881" }}>
          <img
            src={cs.screenshot}
            alt={`${cs.title} dashboard`}
            loading="lazy"
            className="h-full w-full object-cover object-top"
          />
        </div>
      </BrowserFrame>
    ) : cs.mockup === "erp" ? (
      <DashboardERP url={cs.url.replace(/^https?:\/\//, "")} />
    ) : (
      <DashboardCRM url={cs.url.replace(/^https?:\/\//, "")} />
    )

  return (
    <section className={`border-b border-line py-16 md:py-24 ${flip ? "bg-white" : ""}`}>
      <div className="container">
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div className={flip ? "lg:order-2" : ""}>
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <img src={cs.logo} alt={cs.client} loading="lazy" className="h-11 w-auto max-w-[150px] object-contain" />
                <StatusPill status={cs.status} />
              </div>

              <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-400">
                {cs.client} · {cs.industry} · {cs.year}
              </p>
              <h2 className="mt-3 text-display-md">{cs.title}</h2>
              <p className="mt-4 text-[17.5px] leading-relaxed text-ink-500">{cs.summary}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 rounded-xl2 border-l-2 border-accent-chart bg-paper p-5">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-400">The problem</p>
                <p className="mt-2 text-[15.5px] leading-relaxed text-ink-700">{cs.challenge}</p>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <h3 className="mt-9 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-400">What we built</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-ink-700">{cs.solution}</p>
            </Reveal>

            <Reveal delay={0.18}>
              <h3 className="mt-9 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-400">What changed</h3>
              <ul className="mt-4 space-y-2.5">
                {cs.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2.5 text-[15.5px] font-medium leading-snug text-ink">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-chart" />
                    {o}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-wrap gap-1.5">
                {cs.stack.map((t) => (
                  <span key={t} className="rounded-full border border-line bg-white px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-400">
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <Link to="/contact" className="btn-primary">
                  Build something like this
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M2.5 7h9m0 0L7.6 3.1M11.5 7 7.6 10.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <VisitLink url={cs.url} />
              </div>
            </Reveal>
          </div>

          <div className={`lg:sticky lg:top-28 ${flip ? "lg:order-1" : ""}`}>
            <Reveal delay={0.1}>{visual}</Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
