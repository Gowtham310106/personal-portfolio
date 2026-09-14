import { useRef } from "react"
import { Link } from "react-router-dom"
import { motion, useScroll, useTransform } from "framer-motion"

import { serviceGroups, industrySolutions } from "../data/services"
import { site, waLink } from "../data/site"
import { usePageMeta } from "../hooks/usePageMeta"

import Icon from "../components/Icon"
import CTASection from "../components/CTASection"
import { DashboardCRM, DashboardShop, DashboardERP, PhoneWhatsApp, AICallCard } from "../components/Dashboards"
import { Magnetic, Reveal, SectionHeading, SplitHeading, SpotlightCard, Stagger, StaggerItem } from "../components/primitives"

const ICONS = { web: "code", software: "layers", ai: "ai", apps: "mobile", design: "spark", growth: "search" }

const VISUALS = {
  web: <DashboardShop />,
  software: <DashboardERP />,
  ai: (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:justify-center">
      <AICallCard className="w-full max-w-[280px]" />
      <PhoneWhatsApp className="!w-[210px]" />
    </div>
  ),
  apps: <PhoneWhatsApp />,
  design: <DashboardCRM />,
  growth: <DashboardShop />,
}

export default function Services() {
  usePageMeta({
    title: "Services — Web, Software, ERP, AI Automation & Marketing",
    description:
      "Websites and web apps, custom business software and ERPs, AI receptionists and WhatsApp automation, mobile apps, UI/UX design and SEO — built by Build Fast Web.",
    path: "/services",
  })

  return (
    <>
      <ServicesHero />
      <CategoryNav />
      {serviceGroups.map((s, i) => (
        <ServiceBlock key={s.id} service={s} index={i} />
      ))}
      <SolutionsGrid />
      <CTASection
        title="Not sure which one you need?"
        sub="Tell us how your business runs today and we'll tell you exactly what to build first — and what's not worth your money yet."
      />
    </>
  )
}

/* ── Hero ──────────────────────────────────────────────────────────────── */
function ServicesHero() {
  return (
    <section className="relative overflow-hidden border-b border-line pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
      <div className="pointer-events-none absolute -right-32 top-0 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[130px]" />

      <div className="container relative">
        <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="eyebrow">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-chart animate-pulseDot" />
          Services
        </motion.span>

        <SplitHeading
          text="Everything your business needs to run online."
          className="mt-6 max-w-4xl text-display-xl"
          delay={0.12}
          highlight={[6]}
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-2xl text-[18px] leading-relaxed text-ink-500"
        >
          Design, development, software, automation and marketing under one roof — so your website,
          your dashboard and your WhatsApp replies are finally talking to each other.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: 0.8 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <Magnetic strength={0.22}>
            <Link to="/contact" className="btn-accent !py-4 !px-7">Get a free quote</Link>
          </Magnetic>
          <a href={waLink()} target="_blank" rel="noreferrer" className="btn-ghost !py-4 !px-7">Ask on WhatsApp</a>
        </motion.div>
      </div>
    </section>
  )
}

/* ── Sticky category jump bar ──────────────────────────────────────────── */
function CategoryNav() {
  return (
    <div className="sticky top-[62px] z-30 border-b border-line bg-white/85 glass">
      <div className="container flex gap-1.5 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {serviceGroups.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="flex shrink-0 items-center gap-2 rounded-full border border-line px-3.5 py-2 text-[13.5px] font-medium text-ink-500 transition-all duration-300 hover:border-ink hover:bg-ink hover:text-white"
          >
            <span className="font-mono text-[10px] text-ink-300">{s.number}</span>
            {s.title}
          </a>
        ))}
      </div>
    </div>
  )
}

/* ── One service block ─────────────────────────────────────────────────── */
function ServiceBlock({ service, index }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const flip = index % 2 === 1

  return (
    <section
      id={service.id}
      ref={ref}
      className={`scroll-mt-28 border-b border-line py-16 md:py-24 ${flip ? "bg-white" : ""}`}
    >
      <div className="container">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className={flip ? "lg:order-2" : ""}>
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink text-white">
                  <Icon name={ICONS[service.id]} size={24} />
                </span>
                <span className="font-display text-[40px] font-extrabold leading-none tracking-tighter text-line">
                  {service.number}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="mt-6 text-display-md">{service.title}</h2>
              <p className="mt-2 text-[16px] font-bold text-accent-700">{service.kicker}</p>
              <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-ink-500">{service.summary}</p>
            </Reveal>

            <Stagger className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2" gap={0.06}>
              {service.deliverables.map((d) => (
                <StaggerItem key={d}>
                  <div className="flex items-start gap-2.5 text-[15px] leading-snug text-ink-700">
                    <span className="mt-[3px] grid h-4.5 w-[18px] shrink-0 place-items-center">
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <path d="m3.5 8.5 3 3 6-7" stroke="#8F6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {d}
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2.5 rounded-xl border border-line bg-paper px-4 py-3">
                  <Icon name="clock" size={17} className="text-accent-700" />
                  <div className="leading-tight">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400">Typical timeline</p>
                    <p className="text-[14.5px] font-bold">{service.timeline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 rounded-xl border border-line bg-paper px-4 py-3">
                  <Icon name="chart" size={17} className="text-accent-700" />
                  <div className="leading-tight">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400">What you get</p>
                    <p className="text-[14.5px] font-bold">{service.outcome}</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <Link to="/contact" className="btn-primary mt-8">
                Get a quote for {service.title}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M2.5 7h9m0 0L7.6 3.1M11.5 7 7.6 10.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </Reveal>
          </div>

          <motion.div style={{ y }} className={flip ? "lg:order-1" : ""}>
            <Reveal delay={0.1}>{VISUALS[service.id]}</Reveal>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ── Ready-made solutions ──────────────────────────────────────────────── */
function SolutionsGrid() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          align="center"
          eyebrow="Industry solutions"
          title="Software shaped for your niche, not a generic template."
          sub="Each of these starts from a system we've already built — which is why yours launches in weeks."
        />

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" gap={0.06}>
          {industrySolutions.map((s) => (
            <StaggerItem key={s.name}>
              <SpotlightCard className="card card-hover h-full p-5">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-paper text-ink ring-1 ring-line transition-all duration-500 group-hover:bg-accent group-hover:text-ink group-hover:ring-accent">
                  <Icon name={s.icon} size={20} />
                </span>
                <h3 className="mt-5 text-[17px] font-extrabold leading-snug tracking-tight">{s.name}</h3>
                <p className="mt-1 text-[12.5px] text-ink-400">{s.for}</p>
                <ul className="mt-4 space-y-1.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-[13px] leading-snug text-ink-500">
                      <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-accent-chart" />
                      {p}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.15}>
          <p className="mt-10 text-center text-[15px] text-ink-500">
            Working in a niche we haven't listed? Call{" "}
            <a href={`tel:${site.phone}`} className="font-semibold text-accent-700 link-underline">{site.phoneDisplay}</a> — we've probably built something close.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
