import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

export default function Faq({ items }) {
  const [open, setOpen] = useState(0)

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors duration-300 hover:text-accent-700"
            >
              <span className="text-[17px] font-bold tracking-tight">{item.q}</span>
              <span className="relative mt-1.5 grid h-6 w-6 shrink-0 place-items-center">
                <motion.span animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.35 }} className="absolute h-[1.8px] w-3.5 rounded bg-current" />
                <motion.span animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1 }} transition={{ duration: 0.35 }} className="absolute h-3.5 w-[1.8px] rounded bg-current" />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 pr-10 text-[15.5px] leading-relaxed text-ink-500">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
