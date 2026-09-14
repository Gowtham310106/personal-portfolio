import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion"

/* ── Scroll reveal ─────────────────────────────────────────────────────── */
export function Reveal({ children, delay = 0, y = 28, className = "", once = true }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* Staggered children — pair <Stagger> with <StaggerItem> */
export function Stagger({ children, className = "", delay = 0, gap = 0.08 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-70px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = "", y = 24 }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
      }}
    >
      {children}
    </motion.div>
  )
}

/* ── Word-by-word masked headline ──────────────────────────────────────── */
export function SplitHeading({ text, className = "", delay = 0, as = "h1", highlight = [] }) {
  const Tag = motion[as] || motion.h1
  const reduce = useReducedMotion()
  const words = text.split(" ")

  if (reduce) return <Tag className={className}>{text}</Tag>

  return (
    <Tag
      className={className}
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.055, delayChildren: delay } } }}
      aria-label={text}
    >
      {words.map((word, i) => {
        const marked = highlight.includes(i)
        return (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom" aria-hidden>
            <motion.span
              className="relative inline-block"
              variants={{
                hidden: { y: "105%", opacity: 0 },
                show: { y: "0%", opacity: 1, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              {/* brand marker: a yellow swipe drawn behind the word */}
              {marked && (
                <motion.span
                  className="absolute inset-x-[-0.06em] bottom-[0.1em] top-[0.14em] -z-10 origin-left rounded-[0.06em] bg-accent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: delay + words.length * 0.055 + 0.15 + i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
              {word}
            </motion.span>
            {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        )
      })}
    </Tag>
  )
}

/* ── Infinite marquee ──────────────────────────────────────────────────── */
export function Marquee({ items, duration = 38, reverse = false, className = "", renderItem }) {
  const list = [...items, ...items]
  return (
    <div className={`mask-fade-x overflow-hidden ${className}`}>
      <div
        className="flex w-max animate-marquee items-center gap-3 sm:gap-4"
        style={{ "--marquee-duration": `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {list.map((item, i) => (
          <div key={i} className="shrink-0">
            {renderItem ? (
              renderItem(item, i)
            ) : (
              <span className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink-500 shadow-card">
                {item}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Count-up number ───────────────────────────────────────────────────── */
/* Deliberately not using framer-motion's useInView: its observer failed to
   fire on mobile viewports, leaving every stat frozen at 0. This drives the
   count from a plain IntersectionObserver, with a rect check on mount and on
   scroll as a backstop — so the number is always right whether the band is
   already on screen, scrolled to gently, or flicked straight past. */
export function Counter({ to, suffix = "", duration = 1600, className = "" }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let raf
    let started = false

    const animate = () => {
      if (started) return
      started = true
      if (reduce) return setValue(to)
      const startedAt = performance.now()
      const tick = (now) => {
        const p = Math.min((now - startedAt) / duration, 1)
        setValue(Math.round(to * (1 - Math.pow(1 - p, 4))))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    // true once the number is settled and nothing more needs watching
    const check = () => {
      if (started) return true
      const r = el.getBoundingClientRect()
      if (r.bottom <= 0) { started = true; setValue(to); return true } // already scrolled past
      if (r.top < window.innerHeight) { animate(); return true }       // on screen
      return false
    }

    if (check()) return () => cancelAnimationFrame(raf)

    const stop = () => {
      io.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
    const onScroll = () => { if (check()) stop() }
    const io = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) { animate(); stop() } },
      { threshold: 0 },
    )

    io.observe(el)
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => { cancelAnimationFrame(raf); stop() }
  }, [to, duration, reduce])

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  )
}

/* ── Magnetic hover wrapper (desktop only) ─────────────────────────────── */
export function Magnetic({ children, strength = 0.35, className = "" }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 })

  const onMove = (e) => {
    if (reduce || window.matchMedia("(pointer: coarse)").matches) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }
  const reset = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  )
}

/* ── Card with a cursor-following spotlight ────────────────────────────── */
export function SpotlightCard({ children, className = "", tint = "251,193,31" }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: -300, y: -300 })

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setPos({ x: -300, y: -300 })}
      className={`group relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(340px circle at ${pos.x}px ${pos.y}px, rgba(${tint},.09), transparent 70%)` }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}

/* ── Section heading ───────────────────────────────────────────────────── */
export function SectionHeading({ eyebrow, title, sub, align = "left", className = "" }) {
  const centered = align === "center"
  return (
    <div className={`${centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}>
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-chart animate-pulseDot" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2 className="mt-5 text-display-md">{title}</h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.14}>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-500">{sub}</p>
        </Reveal>
      )}
    </div>
  )
}
