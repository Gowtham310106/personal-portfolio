export default function Logo({ className = "", mark = false, invert = false }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        className={`relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-[11px] ${
          invert ? "bg-white" : "bg-ink"
        }`}
      >
        <svg width="19" height="19" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path d="M4 10.6h4.1L6.6 16.5 15.5 8.4h-4.3L12.9 3 4 10.6Z" fill="#FFC800" />
        </svg>
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" />
      </span>
      {!mark && (
        <span
          className={`font-display text-[17px] font-extrabold leading-none tracking-[-0.035em] ${
            invert ? "text-white" : "text-ink"
          }`}
        >
          Build<span className={invert ? "text-accent" : "text-accent-700"}>Fast</span>Web
        </span>
      )}
    </span>
  )
}
