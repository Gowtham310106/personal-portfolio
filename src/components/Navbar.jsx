import { useEffect, useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import Logo from "./Logo"
import { nav, site, waLink } from "../data/site"
import { Magnetic } from "./primitives"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "border-b border-line bg-white/80 glass py-2.5" : "border-b border-transparent py-4"
        }`}
      >
        <div className="container flex items-center justify-between gap-4">
          <Link to="/" aria-label={`${site.name} home`} className="transition-transform duration-300 hover:scale-[1.02]">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative rounded-full px-4 py-2 text-[14.5px] font-medium transition-colors duration-300 ${
                    isActive ? "text-ink" : "text-ink-400 hover:text-ink"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-[#F2F2F0]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:${site.phone}`}
              className="link-underline text-[14px] font-semibold text-ink-500 hover:text-ink"
            >
              {site.phoneDisplay}
            </a>
            <Magnetic strength={0.22}>
              <Link to="/contact" className="btn-primary !py-3 !px-5 !text-[14px]">
                Get a free quote
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M2.5 7h9m0 0L7.6 3.1M11.5 7 7.6 10.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </Magnetic>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative z-50 grid h-11 w-11 place-items-center rounded-full border border-line bg-white lg:hidden"
          >
            <span className="flex w-5 flex-col gap-[5px]">
              <motion.span animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }} className="h-[1.8px] w-full rounded bg-ink" />
              <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }} className="h-[1.8px] w-full rounded bg-ink" />
              <motion.span animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }} className="h-[1.8px] w-full rounded bg-ink" />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-paper lg:hidden"
          >
            <div className="container flex h-full flex-col pt-28 pb-10">
              <nav className="flex flex-col" aria-label="Mobile">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `flex items-baseline gap-3 border-b border-line py-4 font-display text-[30px] font-extrabold tracking-tight ${
                          isActive ? "text-accent-700" : "text-ink"
                        }`
                      }
                    >
                      <span className="font-mono text-[11px] font-normal text-ink-300">0{i + 1}</span>
                      {item.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="mt-auto space-y-3"
              >
                <a href={waLink()} target="_blank" rel="noreferrer" className="btn-accent w-full">
                  Chat on WhatsApp
                </a>
                <Link to="/contact" className="btn-ghost w-full">Get a free quote</Link>
                <div className="flex flex-col gap-1 pt-2 text-center text-sm text-ink-400">
                  <a href={`tel:${site.phone}`} className="font-semibold text-ink">{site.phoneDisplay}</a>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
