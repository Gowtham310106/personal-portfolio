/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: { center: true, padding: "1.25rem", screens: { "2xl": "1240px" } },
    extend: {
      colors: {
        paper: "#FBFBFA",
        ink: {
          DEFAULT: "#0B0B0F",
          700: "#27272A",
          500: "#52525B",
          400: "#71717A",
          300: "#A1A1AA",
        },
        line: "#E8E8E6",
        // Yellow brand accent. Large fills use DEFAULT; anything that must be
        // READ on white (text, thin strokes, icons) uses 700 — pure yellow on
        // white fails contrast.
        accent: {
          DEFAULT: "#FFC800",
          600: "#F0B800",
          700: "#8F6B00",
          chart: "#D9A400",
          100: "#FFF1C2",
          50: "#FFFBEB",
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(2.6rem, 6.2vw, 4.7rem)", { lineHeight: "0.98", letterSpacing: "-0.035em" }],
        "display-lg": ["clamp(2.1rem, 4.6vw, 3.5rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(1.75rem, 3.4vw, 2.6rem)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,11,15,.04), 0 8px 24px -12px rgba(11,11,15,.10)",
        lift: "0 24px 60px -28px rgba(11,11,15,.28)",
        glow: "0 0 0 1px rgba(255,200,0,.35), 0 18px 50px -22px rgba(255,200,0,.55)",
      },
      borderRadius: { xl2: "1.25rem", "4xl": "2rem" },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        pulseDot: { "0%,100%": { opacity: 1, transform: "scale(1)" }, "50%": { opacity: .35, transform: "scale(.82)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        shimmer: { "100%": { transform: "translateX(100%)" } },
        gridfade: { "0%,100%": { opacity: .15 }, "50%": { opacity: .5 } },
      },
      animation: {
        marquee: "marquee var(--marquee-duration, 38s) linear infinite",
        pulseDot: "pulseDot 1.8s ease-in-out infinite",
        float: "float 7s ease-in-out infinite",
        gridfade: "gridfade 6s ease-in-out infinite",
        shimmer: "shimmer 3.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
