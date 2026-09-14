import { Link } from "react-router-dom"
import { motion } from "framer-motion"

import { caseStudies } from "../data/work"
import { industrySolutions } from "../data/services"
import { site, waLink } from "../data/site"
import { usePageMeta } from "../hooks/usePageMeta"

import Icon from "../components/Icon"
import CTASection from "../components/CTASection"
import { DashboardCRM, DashboardShop } from "../components/Dashboards"
import { Reveal, SectionHeading, SplitHeading, SpotlightCard, Stagger, StaggerItem } from "../components/primitives"

const VISUALS = { crm: <DashboardCRM />, shop: <DashboardShop /> }

export default function Work() {
  usePageMeta({
    title: "Our Work — Admission CRM, E-commerce & Custom Systems",
    description:
      "Case studies from Build Fast Web: a college admission management CRM and an e-commerce storefront with full admin panel — plus the systems we build for schools, clinics, hotels and retail.",
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
            Every project below started the same way: a business drowning in registers, spreadsheets and chat threads.
            Here's what replaced them.
          </motion.p>
        </div>
      </section>

      {caseStudies.map((cs, i) => (
        <CaseStudy key={cs.slug} cs={cs} index={i} />
      ))}

      <section className="section">
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow="Also in our toolkit"
            title="Systems we can shape for you next."
            sub="The hard parts are already built and battle-tested. Your version gets customised to how you actually work."
          />

          <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" gap={0.06}>
            {industrySolutions.map((s) => (
              <StaggerItem key={s.name}>
                <SpotlightCard className="card card-hover h-full p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-paper text-ink ring-1 ring-line transition-all duration-500 group-hover:bg-accent group-hover:text-ink group-hover:ring-accent">
                    <Icon name={s.icon} size={20} />
                  </span>
                  <h3 className="mt-5 text-[16.5px] font-extrabold leading-snug tracking-tight">{s.name}</h3>
                  <p className="mt-1 text-[12.5px] text-ink-400">{s.for}</p>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.15}>
            <p className="mt-10 text-center text-[15px] text-ink-500">
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

function CaseStudy({ cs, index }) {
  const flip = index % 2 === 1

  return (
    <section className={`border-b border-line py-16 md:py-24 ${flip ? "bg-white" : ""}`}>
      <div className="container">
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div className={flip ? "lg:order-2" : ""}>
            <Reveal>
              <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-400">
                <span className="rounded-full bg-accent/10 px-2.5 py-1 text-accent-700">{cs.sector}</span>
                <span>{cs.client}</span>
                <span className="h-1 w-1 rounded-full bg-ink-300" />
                <span>{cs.year}</span>
              </div>
              <h2 className="mt-5 text-display-md">{cs.title}</h2>
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
            </Reveal>
            <Stagger className="mt-4 space-y-2.5" gap={0.06}>
              {cs.build.map((b) => (
                <StaggerItem key={b}>
                  <div className="flex items-start gap-2.5 text-[15px] leading-snug text-ink-700">
                    <span className="mt-[3px]">
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <path d="m3.5 8.5 3 3 6-7" stroke="#8F6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {b}
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

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

            {cs.metrics.length > 0 && (
              <Reveal delay={0.2}>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {cs.metrics.map((m) => (
                    <div key={m.label} className="card p-4">
                      <p className="font-display text-[28px] font-extrabold tracking-tighter">{m.value}</p>
                      <p className="mt-1 text-[13px] text-ink-400">{m.label}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

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
              <Link to="/contact" className="btn-primary mt-9">
                Build something like this
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M2.5 7h9m0 0L7.6 3.1M11.5 7 7.6 10.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </Reveal>
          </div>

          <div className={`lg:sticky lg:top-28 ${flip ? "lg:order-1" : ""}`}>
            <Reveal delay={0.1}>{VISUALS[cs.mockup]}</Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
