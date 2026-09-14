import { Link } from "react-router-dom"
import Logo from "./Logo"
import { site, waLink } from "../data/site"
import { serviceGroups } from "../data/services"
import { Reveal } from "./primitives"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-accent/20 blur-[110px]" />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.07]" style={{ "--grid-line": "rgba(255,255,255,.5)" }} />

      <div className="container relative py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <Reveal>
            <div>
              <Logo invert />
              <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-white/55">
                We turn manual operations into digital systems — websites, custom software, ERPs and AI automation, built fast and built to last.
              </p>
              <a href={waLink()} target="_blank" rel="noreferrer" className="btn mt-6 bg-white px-5 py-3 text-ink hover:bg-accent hover:text-ink">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulseDot" />
                Chat on WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <FooterCol title="Services">
              {serviceGroups.map((s) => (
                <FooterLink key={s.id} to={`/services#${s.id}`}>{s.title}</FooterLink>
              ))}
            </FooterCol>
          </Reveal>

          <Reveal delay={0.14}>
            <FooterCol title="Company">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/work">Our work</FooterLink>
              <FooterLink to="/about">About us</FooterLink>
              <FooterLink to="/services">All services</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </FooterCol>
          </Reveal>

          <Reveal delay={0.2}>
            <div>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">Get in touch</h4>
              <ul className="mt-5 space-y-3.5 text-[15px]">
                <li>
                  <a href={`tel:${site.phone}`} className="link-underline font-semibold text-white">{site.phoneDisplay}</a>
                  <p className="mt-0.5 text-[12.5px] text-white/40">Mon–Sat, 9am–8pm IST</p>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className="link-underline text-white/70 hover:text-white">{site.email}</a>
                </li>
                <li className="text-white/50">{site.location}</li>
              </ul>

              {(site.instagram || site.linkedin) && (
                <div className="mt-5 flex gap-2.5">
                  {site.instagram && <Social href={site.instagram} label="Instagram" d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2a3.8 3.8 0 0 1-.9 1.4c-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4a3.8 3.8 0 0 1-1.4-.9 3.8 3.8 0 0 1-.9-1.4c-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 5.1a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.8a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2Zm6-8a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Z" />}
                  {site.linkedin && <Social href={site.linkedin} label="LinkedIn" d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3 0-2.95-1.8-2.95s-2.08 1.4-2.08 2.85V21h-4V9Z" />}
                </div>
              )}
            </div>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-[13px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p className="font-mono text-[11.5px] uppercase tracking-[0.16em]">{site.domain}</p>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }) {
  return (
    <div>
      <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">{title}</h4>
      <ul className="mt-5 space-y-2.5 text-[15px]">{children}</ul>
    </div>
  )
}

function FooterLink({ to, children }) {
  return (
    <li>
      <Link to={to} className="link-underline text-white/60 transition-colors hover:text-white">{children}</Link>
    </li>
  )
}

function Social({ href, label, d }) {
  return (
    <a
      href={href} target="_blank" rel="noreferrer" aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-all hover:border-accent hover:bg-accent hover:text-ink"
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d={d} /></svg>
    </a>
  )
}
