import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { site, waLink } from "../data/site"
import { Magnetic, Reveal, SplitHeading } from "./primitives"

export default function CTASection({
  title = "Let's put your business on a system.",
  sub = "One short call. We'll tell you what to build first, what to skip, and what it costs — whether or not you hire us.",
}) {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="relative overflow-hidden rounded-4xl bg-ink px-6 py-16 text-center sm:px-12 md:py-24">
            <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.08]" style={{ "--grid-line": "rgba(255,255,255,.6)" }} />
            <motion.div
              animate={{ scale: [1, 1.18, 1], opacity: [0.25, 0.4, 0.25] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-[120px]"
            />

            <div className="relative mx-auto max-w-3xl">
              <span className="eyebrow !border-white/15 !bg-white/10 !text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulseDot" />
                Taking projects for this month
              </span>

              <SplitHeading
                as="h2"
                text={title}
                className="mt-6 text-display-lg text-white"
              />

              <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-white/60">{sub}</p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Magnetic strength={0.25}>
                  <Link to="/contact" className="btn bg-accent px-7 py-4 text-ink hover:bg-white hover:text-ink">
                    Get a free quote
                    <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden>
                      <path d="M2.5 7h9m0 0L7.6 3.1M11.5 7 7.6 10.9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </Magnetic>
                <a href={waLink()} target="_blank" rel="noreferrer" className="btn border border-white/20 px-7 py-4 text-white hover:bg-white hover:text-ink">
                  Message on WhatsApp
                </a>
              </div>

              <p className="mt-7 text-[13.5px] text-white/40">
                Or call <a href={`tel:${site.phone}`} className="link-underline font-semibold text-white/80">{site.phoneDisplay}</a> · Replies within a few working hours
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
