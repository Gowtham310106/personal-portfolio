import { Link } from "react-router-dom"
import { motion } from "framer-motion"

import { site, stats, waLink } from "../data/site"
import { process } from "../data/services"
import { usePageMeta } from "../hooks/usePageMeta"

import Icon from "../components/Icon"
import CTASection from "../components/CTASection"
import { DashboardERP } from "../components/Dashboards"
import { Counter, Reveal, SectionHeading, SplitHeading, SpotlightCard, Stagger, StaggerItem } from "../components/primitives"

/* NOTE: edit the story below in your own words — it reads best when it's
   actually yours. Everything else on the page is data-driven. */

export default function About() {
  usePageMeta({
    title: "About — A studio that turns manual work into software",
    description:
      "Build Fast Web is a product studio building websites, custom software, ERPs and AI automation for businesses that still run on registers, spreadsheets and WhatsApp groups.",
    path: "/about",
  })

  const principles = [
    { icon: "bolt", title: "Ship early, then improve", body: "A working v1 in weeks beats a perfect plan in months. You start getting value while we keep building." },
    { icon: "users", title: "Design for the least technical person", body: "The person entering data at 8am decides whether software succeeds. We design for them first." },
    { icon: "shield", title: "Say the uncomfortable thing", body: "If a feature won't earn its cost, we'll tell you before you pay for it — even when it shrinks our invoice." },
    { icon: "layers", title: "Build systems, not screens", body: "Anyone can deliver a page. We connect website, dashboard, WhatsApp and payments into one working loop." },
    { icon: "code", title: "No lock-in, ever", body: "Code, data and hosting are yours from day one. Our retention comes from results, not hostage-taking." },
    { icon: "clock", title: "Answer fast", body: "Fast replies during the project. Faster after launch. Slow support is just a bug with better manners." },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
        <div className="pointer-events-none absolute -right-24 top-0 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[130px]" />

        <div className="container relative grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-chart animate-pulseDot" />
              About {site.name}
            </motion.span>

            <SplitHeading text="We build the software your business keeps doing by hand." className="mt-6 text-display-lg" delay={0.12} highlight={[8, 9, 10]} />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-6 space-y-4 text-[17px] leading-relaxed text-ink-500"
            >
              <p>
                Most businesses we meet aren't behind because they lack ambition. They're behind because the day
                runs on a register at the front desk, four Excel files, and a WhatsApp group nobody can search.
              </p>
              <p>
                {site.name} exists to close that gap. We design and build the websites, dashboards, ERPs and
                automations that take those manual steps and turn them into a system — one your team logs into
                every morning, and one you can actually see from your phone.
              </p>
              <p className="font-medium text-ink">
                Small studio, senior hands. The person who scopes your project is the person who builds it.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62, duration: 0.8 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <Link to="/contact" className="btn-accent !py-4 !px-7">Work with us</Link>
              <a href={waLink()} target="_blank" rel="noreferrer" className="btn-ghost !py-4 !px-7">Say hi on WhatsApp</a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 1.5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <DashboardERP />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-line bg-white py-14">
        <div className="container">
          <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" gap={0.1}>
            {stats.map((s) => (
              <StaggerItem key={s.label}>
                <div>
                  <p className="font-display text-[42px] font-extrabold leading-none tracking-tighter">
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

      {/* Principles */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="How we think"
            title="Six rules we don't break."
            sub="They cost us money sometimes. They've never cost us a client."
          />

          <Stagger className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3" gap={0.07}>
            {principles.map((p) => (
              <StaggerItem key={p.title}>
                <SpotlightCard className="card card-hover h-full p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-paper text-accent-700 ring-1 ring-line transition-all duration-500 group-hover:bg-accent group-hover:text-ink group-hover:ring-accent">
                    <Icon name={p.icon} size={20} />
                  </span>
                  <h3 className="mt-5 text-[17.5px] font-extrabold tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-500">{p.body}</p>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Process */}
      <section className="section border-y border-line bg-white">
        <div className="container">
          <SectionHeading align="center" eyebrow="The process" title="From first call to live system." sub="No black box, no month-long silences. You see progress every single week." />

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.06}>
                <SpotlightCard className="card card-hover h-full p-6">
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-[28px] font-extrabold leading-none tracking-tighter text-line transition-colors duration-500 group-hover:text-accent-700">
                      {p.step}
                    </span>
                    <span className="rounded-full bg-paper px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-400 ring-1 ring-line">
                      {p.duration}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[17.5px] font-extrabold tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-500">{p.body}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="The stack"
              title="Boring technology. Exciting results."
              sub="We pick tools that will still be maintainable in five years — not whatever trended last month."
            />
          </div>

          <Stagger className="grid gap-4 sm:grid-cols-2" gap={0.07}>
            {[
              ["code", "Front end", "React, Next.js, Tailwind CSS, Framer Motion"],
              ["layers", "Back end", "Node.js, PostgreSQL, MySQL, REST APIs"],
              ["mobile", "Mobile", "React Native for Android & iOS from one codebase"],
              ["ai", "AI & automation", "OpenAI, WhatsApp Business API, workflow automation"],
              ["chart", "Payments & data", "Razorpay, Stripe, analytics and reporting"],
              ["shield", "Infrastructure", "AWS, Vercel, automated backups, SSL by default"],
            ].map(([icon, title, body]) => (
              <StaggerItem key={title}>
                <div className="card h-full p-5">
                  <span className="flex items-center gap-2.5 text-[14.5px] font-extrabold tracking-tight">
                    <Icon name={icon} size={18} className="text-accent-700" />
                    {title}
                  </span>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-500">{body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CTASection
        title="Let's see if we're a fit."
        sub="One call, no deck, no pressure. You'll leave knowing what to build first — even if you build it elsewhere."
      />
    </>
  )
}
