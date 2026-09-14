import { useRef } from "react"
import { Link } from "react-router-dom"
import { motion, useScroll, useTransform } from "framer-motion"

import { site, stats, waLink } from "../data/site"
import { serviceGroups, industrySolutions, process } from "../data/services"
import { caseStudies, clients, faqs } from "../data/work"
import { usePageMeta } from "../hooks/usePageMeta"

import Icon from "../components/Icon"
import LeadForm from "../components/LeadForm"
import CTASection from "../components/CTASection"
import ClientLogos from "../components/ClientLogos"
import { DashboardCRM, DashboardShop, DashboardERP, PhoneWhatsApp, AICallCard } from "../components/Dashboards"
import { Counter, Magnetic, Marquee, Reveal, SectionHeading, SplitHeading, SpotlightCard, Stagger, StaggerItem } from "../components/primitives"
import Faq from "../components/Faq"

export default function Home() {
  usePageMeta({
    title: "Websites, Custom Software & AI Automation",
    description: site.description,
    path: "/",
  })

  return (
    <>
      <Hero />
      <ClientLogos clients={clients} />
      <TrustStrip />
      <PainSection />
      <ServicesOverview />
      <Showcase />
      <Industries />
      <RecentWork />
      <Process />
      <StatsBand />
      <WhyUs />
      <FaqSection />
      <LeadSection />
      <CTASection />
    </>
  )
}

/* ── Hero ──────────────────────────────────────────────────────────────── */
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 110])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
      <div className="pointer-events-none absolute -left-40 top-10 h-[440px] w-[440px] rounded-full bg-accent/10 blur-[130px]" />
      <div className="pointer-events-none absolute right-0 top-40 h-[360px] w-[360px] rounded-full bg-[#C7D2FE]/30 blur-[120px]" />

      <div className="container relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_1fr] lg:gap-10">
          {/* Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="eyebrow">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulseDot" />
                Available for new projects
              </span>
            </motion.div>

            <SplitHeading
              text="Manual work in. Digital systems out."
              className="mt-6 max-w-[13ch] text-display-xl lg:max-w-none"
              delay={0.15}
              highlight={[3, 4]}
            />

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-xl text-[17.5px] leading-relaxed text-ink-500 md:text-[19px]"
            >
              We build the websites, custom software, ERPs and AI automations that replace your registers,
              spreadsheets and missed calls — so your business runs on a system instead of on memory.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.68, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Magnetic strength={0.25}>
                <Link to="/contact" className="btn-accent w-full !py-4 !px-7 sm:w-auto">
                  Get a free quote
                  <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M2.5 7h9m0 0L7.6 3.1M11.5 7 7.6 10.9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </Magnetic>
              <a href={waLink()} target="_blank" rel="noreferrer" className="btn-ghost !py-4 !px-7">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                WhatsApp us
              </a>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-[13.5px] text-ink-400"
            >
              {["Fixed price, quoted upfront", "Live link every week", "You own the code"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="m3.5 8.5 3 3 6-7" stroke="#8A6408" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Product collage */}
          <motion.div style={{ y, scale, opacity: fade }} className="relative">
            <motion.div
              initial={{ opacity: 0, y: 40, rotate: -1.5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 0.35, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <DashboardCRM />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.9, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-16 -left-4 hidden w-[224px] sm:block lg:-left-14"
            >
              <div className="animate-float">
                <AICallCard />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -right-3 -top-7 hidden rounded-2xl border border-line bg-white px-4 py-3 shadow-lift md:block"
            >
              <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400">Response time</p>
              <p className="mt-0.5 font-display text-[22px] font-extrabold tracking-tight">
                <Counter to={9} suffix="s" /> <span className="text-[12px] font-semibold text-emerald-600">avg</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ── Trust strip ───────────────────────────────────────────────────────── */
function TrustStrip() {
  const sectors = ["Schools & Colleges", "Clinics & Hospitals", "Petrol Pumps", "Restaurants & Cafés", "Hotels & Resorts", "Apartments", "Retail & E-commerce", "Distributors", "Real Estate", "Salons & Spas"]
  const stack = ["React", "Node.js", "React Native", "PostgreSQL", "WhatsApp API", "OpenAI", "Razorpay", "AWS", "Next.js", "Firebase"]

  return (
    <section className="border-y border-line bg-white py-8">
      <div className="container">
        <p className="mb-5 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-ink-400">
          Systems built for
        </p>
      </div>
      <Marquee items={sectors} duration={44} />
      <div className="h-3" />
      <Marquee
        items={stack}
        duration={52}
        reverse
        renderItem={(item) => (
          <span className="px-4 py-2 font-mono text-[12.5px] uppercase tracking-[0.12em] text-ink-300">{item}</span>
        )}
      />
    </section>
  )
}

/* ── Pain → outcome ────────────────────────────────────────────────────── */
function PainSection() {
  const pains = [
    { before: "Enquiries live in WhatsApp groups", after: "Every lead in one pipeline with an owner", icon: "users" },
    { before: "Stock and billing in six Excel files", after: "One dashboard, updated as work happens", icon: "inventory" },
    { before: "Calls missed after 7pm are lost", after: "AI receptionist answers and books, 24/7", icon: "phone" },
    { before: "Payments chased by memory", after: "Reminders fire automatically until paid", icon: "clock" },
  ]

  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="The real problem"
          title="Your business isn't slow. Your paperwork is."
          sub="Most businesses we meet aren't short of customers — they're short of a system. Here's what changes in the first month."
        />

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2">
          {pains.map((p) => (
            <StaggerItem key={p.before}>
              <SpotlightCard className="card card-hover h-full p-6">
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-paper text-ink-500 ring-1 ring-line transition-colors duration-500 group-hover:bg-accent group-hover:text-ink group-hover:ring-accent">
                    <Icon name={p.icon} size={20} />
                  </span>
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 text-[14px] text-ink-400 line-through decoration-accent/50">
                      {p.before}
                    </p>
                    <p className="mt-2 text-[17px] font-bold leading-snug tracking-tight text-ink">{p.after}</p>
                  </div>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

/* ── Services overview ─────────────────────────────────────────────────── */
function ServicesOverview() {
  const icons = { web: "code", software: "layers", ai: "ai", apps: "mobile", design: "spark", growth: "search" }

  return (
    <section className="section bg-white border-y border-line">
      <div className="container">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="What we do"
            title="Six services. One outcome: work that runs itself."
            sub="Pick one, or let us wire them together into a single system your whole team logs into."
          />
          <Reveal delay={0.2}>
            <Link to="/services" className="btn-ghost shrink-0">
              All services
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M2.5 7h9m0 0L7.6 3.1M11.5 7 7.6 10.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3" gap={0.07}>
          {serviceGroups.map((s) => (
            <StaggerItem key={s.id}>
              <Link to={`/services#${s.id}`} className="block h-full">
                <SpotlightCard className="card card-hover flex h-full flex-col p-6">
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-ink text-white transition-colors duration-500 group-hover:bg-accent group-hover:text-ink">
                      <Icon name={icons[s.id]} size={21} />
                    </span>
                    <span className="font-mono text-[11px] text-ink-300">{s.number}</span>
                  </div>

                  <h3 className="mt-6 text-[20px] font-extrabold tracking-tight">{s.title}</h3>
                  <p className="mt-1 text-[13.5px] font-semibold text-accent-700">{s.kicker}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-500">{s.summary}</p>

                  <ul className="mt-5 space-y-1.5 border-t border-line pt-5">
                    {s.deliverables.slice(0, 3).map((d) => (
                      <li key={d} className="flex items-start gap-2 text-[13.5px] text-ink-500">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent-chart" />
                        {d}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-auto pt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-ink transition-all duration-300 group-hover:gap-2.5 group-hover:text-accent-700">
                    Explore
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
                      <path d="M2.5 7h9m0 0L7.6 3.1M11.5 7 7.6 10.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </SpotlightCard>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

/* ── Product showcase with parallax ────────────────────────────────────── */
function ShowcaseRow({ eyebrow, title, body, points, visual, flip = false }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <div ref={ref} className="grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">
      <Reveal className={flip ? "lg:order-2" : ""}>
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h3 className="mt-5 text-display-md">{title}</h3>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-500">{body}</p>
          <ul className="mt-7 space-y-3">
            {points.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: 0.1 + i * 0.09, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-3 text-[15.5px] text-ink-700"
              >
                <span className="mt-[3px] grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/10">
                  <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="m3.5 8.5 3 3 6-7" stroke="#8A6408" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {p}
              </motion.li>
            ))}
          </ul>
        </div>
      </Reveal>

      <motion.div style={{ y }} className={flip ? "lg:order-1" : ""}>
        <Reveal delay={0.1}>{visual}</Reveal>
      </motion.div>
    </div>
  )
}

function Showcase() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          align="center"
          eyebrow="Inside the systems"
          title="This is what your business looks like on a screen."
          sub="Not stock photos of people pointing at laptops — the actual kind of dashboards we build and hand over."
        />

        <div className="mt-8 divide-y divide-line">
          <ShowcaseRow
            eyebrow="CRM & Admissions"
            title="Every enquiry, tracked to the rupee."
            body="One pipeline for walk-ins, calls, ads and agents. Assign an owner, set a follow-up, and watch conversion stage by stage."
            points={[
              "Lead capture from website, phone and walk-in",
              "Stage-wise tracking with automatic follow-up reminders",
              "Fee and payment status with pending-amount alerts",
              "Management view: source-wise, course-wise, staff-wise",
            ]}
            visual={<DashboardCRM />}
          />

          <ShowcaseRow
            flip
            eyebrow="E-commerce & Retail"
            title="Sell without living inside your DMs."
            body="A storefront built for ad traffic, wired to an admin panel your team runs without calling a developer."
            points={[
              "Catalogue, variants, offers and stock in one place",
              "Online payments, COD and full order lifecycle",
              "Automated WhatsApp order updates and cart nudges",
              "Daily revenue, best-sellers and low-stock alerts",
            ]}
            visual={<DashboardShop />}
          />

          <ShowcaseRow
            eyebrow="ERP & Operations"
            title="Quotation to payment, without the paperwork."
            body="Stock, quotations, invoices and outstanding amounts in a single system — with reminders that chase money for you."
            points={[
              "Stock in/out with batch and low-stock alerts",
              "Quotation to invoice in one click",
              "Outstanding tracking with automated reminders",
              "Owner dashboard that opens on a phone",
            ]}
            visual={
              <div className="relative">
                <DashboardERP />
                <div className="absolute -bottom-14 -left-10 hidden w-[172px] xl:block">
                  <div className="animate-float"><PhoneWhatsApp className="!w-[172px]" /></div>
                </div>
              </div>
            }
          />
        </div>
      </div>
    </section>
  )
}

/* ── Industry solutions ────────────────────────────────────────────────── */
function Industries() {
  return (
    <section className="section border-y border-line bg-white">
      <div className="container">
        <SectionHeading
          eyebrow="Ready to deploy"
          title="Built before. Ready to shape around your business."
          sub="These aren't ideas on a slide — they're systems we've already built the hard parts of. Yours gets customised, not copy-pasted."
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
            Don't see your industry?{" "}
            <Link to="/contact" className="font-semibold text-accent-700 link-underline">Tell us how you work today</Link> — we'll map it.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ── Recent work ───────────────────────────────────────────────────────── */
function RecentWork() {
  const visuals = { crm: <DashboardCRM />, shop: <DashboardShop /> }

  return (
    <section className="section">
      <div className="container">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Recent work"
            title="Systems already running in the real world."
            sub="Two builds that replaced registers, spreadsheets and chat threads with software people actually log into."
          />
          <Reveal delay={0.2}>
            <Link to="/work" className="btn-ghost shrink-0">See the case studies</Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.slug} delay={i * 0.1}>
              <Link to="/work" className="block h-full">
                <SpotlightCard className="card card-hover flex h-full flex-col overflow-hidden">
                  <div className="relative h-[218px] overflow-hidden border-b border-line bg-paper px-5 pt-5">
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-paper to-transparent" />
                    <motion.div
                      initial={{ y: 18, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="origin-top scale-[0.97] transition-transform duration-700 group-hover:scale-100"
                    >
                      {visuals[cs.mockup]}
                    </motion.div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-400">
                      <span>{cs.sector}</span>
                      <span className="h-1 w-1 rounded-full bg-ink-300" />
                      <span>{cs.year}</span>
                    </div>
                    <h3 className="mt-3 text-[21px] font-extrabold tracking-tight">{cs.title}</h3>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-ink-500">{cs.summary}</p>
                    <div className="mt-5 flex flex-wrap gap-1.5 pt-5 border-t border-line">
                      {cs.stack.map((t) => (
                        <span key={t} className="rounded-full bg-paper px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider text-ink-400 ring-1 ring-line">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Process ───────────────────────────────────────────────────────────── */
function Process() {
  return (
    <section className="section">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="How we work"
              title="Six steps. No black box."
              sub="You'll always know what's being built, what it costs, and when it lands. Every week, not every quarter."
            />
            <Reveal delay={0.2}>
              <Link to="/contact" className="btn-primary mt-8">Start with a discovery call</Link>
            </Reveal>
          </div>

          <div className="space-y-3">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.06}>
                <SpotlightCard className="card card-hover p-6">
                  <div className="flex items-start gap-5">
                    <span className="font-display text-[30px] font-extrabold leading-none tracking-tighter text-line transition-colors duration-500 group-hover:text-accent-700">
                      {p.step}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="text-[18px] font-extrabold tracking-tight">{p.title}</h3>
                        <span className="rounded-full bg-paper px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-400 ring-1 ring-line">
                          {p.duration}
                        </span>
                      </div>
                      <p className="mt-2 text-[15px] leading-relaxed text-ink-500">{p.body}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Stats ─────────────────────────────────────────────────────────────── */
function StatsBand() {
  return (
    <section className="border-y border-line bg-white py-16">
      <div className="container">
        <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" gap={0.1}>
          {stats.map((s) => (
            <StaggerItem key={s.label}>
              <div className="text-center sm:text-left">
                <p className="font-display text-[44px] font-extrabold leading-none tracking-tighter text-ink">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2.5 text-[15px] font-bold tracking-tight">{s.label}</p>
                <p className="mt-1 text-[13.5px] leading-snug text-ink-400">{s.sub}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

/* ── Why us ────────────────────────────────────────────────────────────── */
function WhyUs() {
  const reasons = [
    { icon: "bolt", title: "Shipped in weeks, not quarters", body: "A working v1 goes live while other agencies are still sending you a proposal deck." },
    { icon: "shield", title: "Fixed price, written scope", body: "You approve a number and a screen list before work starts. No mid-project surprises." },
    { icon: "users", title: "Built for the person using it", body: "Your staff shouldn't need training to find a button. If a screen needs a manual, we redesigned it wrong." },
    { icon: "code", title: "You own everything", body: "Source code, database and hosting in your name. Leave whenever you want — you won't want to." },
    { icon: "chart", title: "Numbers, not vibes", body: "Analytics and lead tracking on every build, so you know which ad, page and follow-up actually earns." },
    { icon: "phone", title: "A human on WhatsApp", body: "Post-launch you message a person who knows your project, not a ticket queue that forgets it." },
  ]

  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          align="center"
          eyebrow="Why teams pick us"
          title="Agency polish. Founder-level urgency."
          sub="We're small on purpose: the person who scopes your project is the person who builds it."
        />

        <Stagger className="mt-14 grid gap-x-10 gap-y-9 md:grid-cols-2 lg:grid-cols-3" gap={0.07}>
          {reasons.map((r) => (
            <StaggerItem key={r.title}>
              <div className="group">
                <span className="inline-grid h-11 w-11 place-items-center rounded-xl border border-line bg-white text-accent-700 transition-all duration-500 group-hover:-translate-y-1 group-hover:bg-accent group-hover:text-ink">
                  <Icon name={r.icon} size={20} />
                </span>
                <h3 className="mt-4 text-[17.5px] font-extrabold tracking-tight">{r.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-500">{r.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

/* ── FAQ ───────────────────────────────────────────────────────────────── */
function FaqSection() {
  return (
    <section className="section border-y border-line bg-white">
      <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow="FAQ" title="The questions everyone asks first." />
          <Reveal delay={0.2}>
            <p className="mt-5 text-[15px] text-ink-500">
              Still unsure? Ask our chatbot bottom-right, or{" "}
              <a href={waLink()} target="_blank" rel="noreferrer" className="font-semibold text-accent-700 link-underline">message us on WhatsApp</a>.
            </p>
          </Reveal>
        </div>
        <Faq items={faqs} />
      </div>
    </section>
  )
}

/* ── Lead form ─────────────────────────────────────────────────────────── */
function LeadSection() {
  return (
    <section id="quote" className="section">
      <div className="container grid items-start gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Free quote"
            title="Tell us the problem. We'll tell you what to build."
            sub="Share your requirement and you'll get a straight answer: what's worth building first, roughly what it costs, and how long it takes."
          />

          <Stagger className="mt-10 space-y-4" gap={0.08}>
            {[
              ["clock", "Reply within a few working hours", "Faster on WhatsApp — usually minutes."],
              ["shield", "No pushy sales calls", "One honest conversation, then you decide."],
              ["chart", "A quote you can compare", "Written scope and fixed price, not a vague range."],
            ].map(([icon, title, body]) => (
              <StaggerItem key={title}>
                <div className="flex items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-accent-700 ring-1 ring-line">
                    <Icon name={icon} size={18} />
                  </span>
                  <div>
                    <p className="text-[15.5px] font-bold tracking-tight">{title}</p>
                    <p className="text-[14px] text-ink-400">{body}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.25}>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-8 text-[14.5px]">
              <a href={`tel:${site.phone}`} className="font-bold text-ink link-underline">{site.phoneDisplay}</a>
              <a href={`mailto:${site.email}`} className="text-ink-500 link-underline">{site.email}</a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <LeadForm id="home-form" />
        </Reveal>
      </div>
    </section>
  )
}
