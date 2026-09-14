import { Marquee, Reveal } from "./primitives"

/**
 * Client logo wall. Renders nothing until `clients` has entries — an empty
 * strip is worse than no strip, and a fake one is worse than both.
 * Under 7 logos it centres them; beyond that it scrolls.
 */
export default function ClientLogos({ clients = [], title = "Trusted by teams who run on our systems", className = "" }) {
  if (!clients.length) return null

  const Logo = (c) => (
    <span key={c.name} className="group flex shrink-0 flex-col items-center gap-1.5 px-6">
      <img
        src={c.logo}
        alt={c.name}
        loading="lazy"
        className="h-9 w-auto max-w-[150px] object-contain opacity-55 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
      />
      {c.system && (
        <span className="text-[11px] text-ink-300 transition-colors duration-500 group-hover:text-ink-500">{c.system}</span>
      )}
    </span>
  )

  return (
    <section className={`border-y border-line bg-white py-10 ${className}`}>
      <div className="container">
        <Reveal>
          <p className="mb-7 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-ink-400">{title}</p>
        </Reveal>
      </div>

      {clients.length > 6 ? (
        <Marquee items={clients} duration={46} renderItem={(c) => Logo(c)} />
      ) : (
        <Reveal delay={0.1}>
          <div className="container flex flex-wrap items-center justify-center gap-y-6">
            {clients.map((c) => Logo(c))}
          </div>
        </Reveal>
      )}
    </section>
  )
}
