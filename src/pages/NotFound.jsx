import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { usePageMeta } from "../hooks/usePageMeta"
import { waLink } from "../data/site"

export default function NotFound() {
  usePageMeta({ title: "Page not found", description: "That page doesn't exist.", path: "/404" })

  return (
    <section className="relative grid min-h-[78vh] place-items-center overflow-hidden px-5 pt-24">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
      <div className="relative text-center">
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(5rem,18vw,10rem)] font-extrabold leading-none tracking-tighter text-gradient"
        >
          404
        </motion.p>
        <h1 className="mt-3 text-display-md">This page went missing.</h1>
        <p className="mx-auto mt-4 max-w-md text-[16.5px] leading-relaxed text-ink-500">
          The link is broken or the page moved. Everything else still works — including the part where we build your system.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/" className="btn-primary">Back to home</Link>
          <a href={waLink()} target="_blank" rel="noreferrer" className="btn-ghost">Message us on WhatsApp</a>
        </div>
      </div>
    </section>
  )
}
