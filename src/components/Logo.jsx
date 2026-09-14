/* ═══════════════════════════════════════════════════════════════════════
   Brand lockup, rebuilt as vector from the Build Fast logo: a rounded
   square outline, code brackets, and a lightning bolt knocked out of them.
   Stays sharp at any size, from a 16px favicon to a billboard.
   ═══════════════════════════════════════════════════════════════════════ */

export function LogoMark({ size = 36, className = "", tile = "#0B0B0F" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      role="img"
      aria-label="Build Fast"
    >
      <rect x="5.5" y="5.5" width="89" height="89" rx="23" fill={tile} />
      <rect x="5.5" y="5.5" width="89" height="89" rx="23" stroke="#FBC11F" strokeWidth="6" />

      {/* code brackets */}
      <g stroke="#FFFFFF" strokeWidth="6.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M34 32.4 17 50.4 34 68.5" />
        <path d="M66 32.4 83 50.4 66 68.5" />
      </g>

      {/* bolt — drawn twice: a thick tile-coloured stroke knocks a gap out of
          the brackets, then the yellow fill sits inside it */}
      <path
        d="M40.2 15H65.9L56.7 43.2H65.3L37.2 87.6L45.7 58H32.9L40.2 15Z"
        fill={tile}
        stroke={tile}
        strokeWidth="7.5"
        strokeLinejoin="round"
      />
      <path
        d="M40.2 15H65.9L56.7 43.2H65.3L37.2 87.6L45.7 58H32.9L40.2 15Z"
        fill="#FBC11F"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Logo({ className = "", mark = false, invert = false, size = 36 }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} className="shrink-0" />
      {!mark && (
        <span
          className={`font-display text-[17px] font-extrabold uppercase leading-none tracking-[-0.02em] ${
            invert ? "text-white" : "text-ink"
          }`}
        >
          Build Fast
        </span>
      )}
    </span>
  )
}
