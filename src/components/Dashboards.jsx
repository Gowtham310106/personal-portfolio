import { motion } from "framer-motion"

/* ═══════════════════════════════════════════════════════════════════════
   Product mockups rendered as real UI (SVG + CSS) instead of flat images:
   crisp on every screen, weightless to load, and always on-brand.
   ═══════════════════════════════════════════════════════════════════════ */

const ease = [0.16, 1, 0.3, 1]
const inView = { once: true, margin: "-60px" }

/* ── Chrome ────────────────────────────────────────────────────────────── */
export function BrowserFrame({ children, url = "app.buildfastweb.in", className = "", tone = "light" }) {
  return (
    <div className={`overflow-hidden rounded-xl2 border border-line bg-white shadow-lift ${className}`}>
      <div className="flex items-center gap-2 border-b border-line bg-[#F7F7F6] px-3 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="mx-auto flex max-w-[60%] items-center gap-1.5 truncate rounded-md bg-white px-2.5 py-1 text-[10px] text-ink-400 ring-1 ring-line">
          <svg width="8" height="10" viewBox="0 0 8 10" fill="none" aria-hidden>
            <path d="M2 4V2.8a2 2 0 1 1 4 0V4" stroke="#22C55E" strokeWidth="1.1" strokeLinecap="round" />
            <rect x="1" y="4" width="6" height="5" rx="1.2" fill="#22C55E" opacity=".18" stroke="#22C55E" strokeWidth=".8" />
          </svg>
          {url}
        </div>
        <div className="hidden w-10 sm:block" />
      </div>
      <div className={tone === "dark" ? "bg-ink" : "bg-white"}>{children}</div>
    </div>
  )
}

/* ── Shared bits ───────────────────────────────────────────────────────── */
function Sidebar({ items, active = 0, label = "BFW" }) {
  return (
    <aside className="hidden w-[124px] shrink-0 border-r border-line bg-[#FCFCFB] p-3 sm:block">
      <div className="mb-4 flex items-center gap-1.5">
        <span className="grid h-5 w-5 place-items-center rounded-md bg-ink text-[9px] font-bold text-white">{label[0]}</span>
        <span className="font-display text-[11px] font-bold tracking-tight">{label}</span>
      </div>
      <nav className="space-y-0.5">
        {items.map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inView}
            transition={{ delay: 0.25 + i * 0.06, duration: 0.5, ease }}
            className={`flex items-center gap-1.5 rounded-md px-2 py-[7px] text-[10px] font-medium ${
              i === active ? "bg-accent/10 text-accent-700" : "text-ink-400"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-[3px] ${i === active ? "bg-accent-chart" : "bg-ink-300"}`} />
            {item}
          </motion.div>
        ))}
      </nav>
      <div className="mt-5 rounded-lg border border-line bg-white p-2">
        <p className="text-[9px] font-semibold text-ink">Live sync</p>
        <p className="mt-0.5 flex items-center gap-1 text-[8px] text-ink-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulseDot" /> Updated now
        </p>
      </div>
    </aside>
  )
}

function TopBar({ title, chips = [] }) {
  return (
    <div className="flex items-center justify-between border-b border-line px-3.5 py-2.5">
      <div>
        <h4 className="font-display text-[12px] font-bold tracking-tight">{title}</h4>
        <p className="text-[9px] text-ink-400">Updated a few seconds ago</p>
      </div>
      <div className="flex items-center gap-1.5">
        {chips.map((c) => (
          <span key={c} className="hidden rounded-full border border-line px-2 py-[3px] text-[9px] text-ink-400 sm:inline">{c}</span>
        ))}
        <span className="h-5 w-5 rounded-full bg-gradient-to-br from-accent to-[#FFB199]" />
      </div>
    </div>
  )
}

function Kpi({ label, value, delta, i = 0, up = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease }}
      className="rounded-lg border border-line bg-white p-2.5"
    >
      <p className="text-[9px] uppercase tracking-wider text-ink-400">{label}</p>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className="font-display text-[17px] font-extrabold tracking-tight">{value}</span>
        <span className={`text-[9px] font-semibold ${up ? "text-emerald-600" : "text-accent-700"}`}>{delta}</span>
      </div>
      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-[#F1F1EF]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${55 + i * 12}%` }}
          viewport={inView}
          transition={{ delay: 0.5 + i * 0.08, duration: 1, ease }}
          className={`h-full rounded-full ${i % 2 ? "bg-ink" : "bg-accent-chart"}`}
        />
      </div>
    </motion.div>
  )
}

/* Animated line + area chart */
export function LineChart({ points = "0,52 26,44 52,47 78,30 104,34 130,18 156,22 182,8", w = 190, h = 62 }) {
  const lastX = points.trim().split(/\s+/).pop().split(",")[0]
  const area = `${points} ${lastX},${h} 0,${h}`
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-full w-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="bfw-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D19A05" stopOpacity=".22" />
          <stop offset="100%" stopColor="#D19A05" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1="0" x2={w} y1={h * g} y2={h * g} stroke="#EFEFED" strokeWidth="1" />
      ))}
      <motion.polygon
        points={area}
        fill="url(#bfw-area)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={inView}
        transition={{ delay: 1, duration: 0.8 }}
      />
      <motion.polyline
        points={points}
        fill="none"
        stroke="#8A6408"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={inView}
        transition={{ delay: 0.45, duration: 1.4, ease }}
      />
      <motion.circle
        cx="182" cy="8" r="3.2" fill="#D19A05"
        initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={inView}
        transition={{ delay: 1.6, type: "spring", stiffness: 300 }}
      />
    </svg>
  )
}

function Bars({ data = [38, 54, 42, 70, 58, 88, 66] }) {
  return (
    <div className="flex h-full items-end gap-1.5">
      {data.map((v, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${v}%` }}
          viewport={inView}
          transition={{ delay: 0.4 + i * 0.07, duration: 0.8, ease }}
          className={`flex-1 rounded-t-[3px] ${i === 5 ? "bg-accent" : "bg-[#E9E9E6]"}`}
        />
      ))}
    </div>
  )
}

function Row({ cols, i, status }) {
  const tone = {
    Paid: "bg-emerald-50 text-emerald-700",
    Admitted: "bg-emerald-50 text-emerald-700",
    Pending: "bg-amber-50 text-amber-700",
    "Follow-up": "bg-accent/10 text-accent-700",
    Shipped: "bg-blue-50 text-blue-700",
  }[status]
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ delay: 0.6 + i * 0.09, duration: 0.5, ease }}
      className="grid grid-cols-[1.4fr_1fr_auto] items-center gap-2 border-t border-line px-3 py-2 text-[10px]"
    >
      <span className="flex items-center gap-1.5 truncate font-medium text-ink">
        <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#F2F2F0] text-[7px] font-bold text-ink-400">
          {cols[0].slice(0, 1)}
        </span>
        {cols[0]}
      </span>
      <span className="truncate text-ink-400">{cols[1]}</span>
      <span className={`rounded-full px-1.5 py-[2px] text-[8px] font-semibold ${tone}`}>{status}</span>
    </motion.div>
  )
}

/* ── 1. Admission / CRM dashboard ──────────────────────────────────────── */
export function DashboardCRM({ className = "" }) {
  return (
    <BrowserFrame url="admissions.yourcollege.edu" className={className}>
      <div className="flex min-h-[292px]">
        <Sidebar items={["Dashboard", "Enquiries", "Applications", "Fees", "Reports"]} active={0} label="Admissions" />
        <div className="min-w-0 flex-1">
          <TopBar title="Admission pipeline" chips={["This month", "All courses"]} />
          <div className="grid grid-cols-3 gap-2 p-3">
            <Kpi label="Enquiries" value="428" delta="+18%" i={0} />
            <Kpi label="Applications" value="196" delta="+9%" i={1} />
            <Kpi label="Fees paid" value="112" delta="+24%" i={2} />
          </div>
          <div className="grid gap-2 px-3 sm:grid-cols-[1.55fr_1fr]">
            <div className="rounded-lg border border-line p-2.5">
              <p className="mb-1 text-[9px] font-semibold text-ink-500">Enquiries → Admissions</p>
              <div className="h-[62px]"><LineChart /></div>
            </div>
            <div className="hidden rounded-lg border border-line p-2.5 sm:block">
              <p className="mb-1.5 text-[9px] font-semibold text-ink-500">Source-wise</p>
              <div className="h-[62px]"><Bars /></div>
            </div>
          </div>
          <div className="mt-2.5">
            <Row cols={["Priya R.", "B.Sc Computer Science"]} status="Admitted" i={0} />
            <Row cols={["Karthik M.", "B.Com · Docs pending"]} status="Pending" i={1} />
            <Row cols={["Anitha S.", "BBA · Call scheduled"]} status="Follow-up" i={2} />
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}

/* ── 2. E-commerce admin ───────────────────────────────────────────────── */
export function DashboardShop({ className = "" }) {
  return (
    <BrowserFrame url="admin.yourstore.in" className={className}>
      <div className="flex min-h-[268px]">
        <Sidebar items={["Overview", "Orders", "Products", "Stock", "Customers"]} active={1} label="Store" />
        <div className="min-w-0 flex-1">
          <TopBar title="Orders & revenue" chips={["Last 7 days"]} />
          <div className="grid grid-cols-3 gap-2 p-3">
            <Kpi label="Revenue" value="₹4.8L" delta="+31%" i={0} />
            <Kpi label="Orders" value="312" delta="+12%" i={1} />
            <Kpi label="Low stock" value="7" delta="alert" i={2} up={false} />
          </div>
          <div className="px-3">
            <div className="rounded-lg border border-line p-2.5">
              <div className="mb-1 flex items-center justify-between">
                <p className="text-[9px] font-semibold text-ink-500">Daily sales</p>
                <span className="flex items-center gap-1 text-[8px] text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulseDot" /> live
                </span>
              </div>
              <div className="h-[58px]"><Bars data={[44, 62, 50, 78, 60, 92, 72]} /></div>
            </div>
          </div>
          <div className="mt-2.5">
            <Row cols={["#10428", "2 items · ₹2,340"]} status="Shipped" i={0} />
            <Row cols={["#10429", "1 item · ₹899"]} status="Paid" i={1} />
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}

/* ── 3. Inventory / ERP ────────────────────────────────────────────────── */
export function DashboardERP({ className = "" }) {
  return (
    <BrowserFrame url="erp.yourbusiness.in" className={className}>
      <div className="flex min-h-[250px]">
        <Sidebar items={["Dashboard", "Inventory", "Quotations", "Invoices", "Vendors"]} active={2} label="Ops" />
        <div className="min-w-0 flex-1">
          <TopBar title="Quotations & stock" chips={["Auto-sync"]} />
          <div className="grid grid-cols-2 gap-2 p-3">
            <Kpi label="Open quotes" value="38" delta="+6" i={0} />
            <Kpi label="Outstanding" value="₹2.1L" delta="-14%" i={1} />
          </div>
          <div className="px-3">
            <div className="rounded-lg border border-line p-2.5">
              <p className="mb-1 text-[9px] font-semibold text-ink-500">Collection trend</p>
              <div className="h-[54px]"><LineChart points="0,48 30,40 60,44 90,26 120,30 150,14 182,10" /></div>
            </div>
          </div>
          <div className="mt-2.5">
            <Row cols={["QTN-2291", "Sri Traders · ₹48,200"]} status="Pending" i={0} />
            <Row cols={["INV-1188", "Metro Stores · ₹1,12,000"]} status="Paid" i={1} />
          </div>
        </div>
      </div>
    </BrowserFrame>
  )
}

/* ── 4. WhatsApp automation, on a phone ────────────────────────────────── */
export function PhoneWhatsApp({ className = "" }) {
  const msgs = [
    { from: "them", text: "Hi, do you have rooms free this Saturday?", t: "9:41 PM" },
    { from: "us", text: "Yes! 2 deluxe rooms are open for Sat. Shall I hold one for you?", t: "9:41 PM", bot: true },
    { from: "them", text: "Please hold it 👍", t: "9:42 PM" },
    { from: "us", text: "Done ✅ Booking #BK-4471 held for 2 hrs. Pay here to confirm: pay.link/bk4471", t: "9:42 PM", bot: true },
  ]
  return (
    <div className={`relative mx-auto w-[236px] rounded-[2rem] border-[7px] border-ink bg-ink shadow-lift ${className}`}>
      <div className="absolute left-1/2 top-1.5 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-ink" />
      <div className="overflow-hidden rounded-[1.5rem] bg-[#ECE5DD]">
        <div className="flex items-center gap-2 bg-[#075E54] px-3 py-2.5 pt-5 text-white">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 text-[10px] font-bold">B</span>
          <div className="leading-tight">
            <p className="text-[10px] font-semibold">Your Business</p>
            <p className="text-[8px] text-white/70">online · replies instantly</p>
          </div>
        </div>
        <div className="space-y-1.5 px-2.5 py-3">
          {msgs.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={inView}
              transition={{ delay: 0.3 + i * 0.45, duration: 0.5, ease }}
              className={`flex ${m.from === "us" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[82%] rounded-lg px-2 py-1.5 text-[9.5px] leading-snug shadow-sm ${
                  m.from === "us" ? "bg-[#DCF8C6] text-ink" : "bg-white text-ink"
                }`}
              >
                {m.text}
                <span className="mt-0.5 flex items-center justify-end gap-1 text-[7px] text-ink-400">
                  {m.bot && <span className="rounded-sm bg-ink/5 px-1 py-[1px] font-semibold text-ink-500">auto</span>}
                  {m.t} {m.from === "us" && <span className="text-sky-500">✓✓</span>}
                </span>
              </div>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={inView}
            transition={{ delay: 2.3 }}
            className="flex justify-start"
          >
            <div className="flex gap-1 rounded-lg bg-white px-2.5 py-2 shadow-sm">
              {[0, 1, 2].map((d) => (
                <span key={d} className="h-1 w-1 rounded-full bg-ink-300 animate-pulseDot" style={{ animationDelay: `${d * 0.2}s` }} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

/* ── 5. AI receptionist call card ──────────────────────────────────────── */
export function AICallCard({ className = "" }) {
  return (
    <div className={`card p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-[11px] font-semibold text-ink">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Live call · 00:42
        </span>
        <span className="rounded-full bg-ink px-2 py-0.5 text-[9px] font-semibold text-white">AI receptionist</span>
      </div>

      <div className="mt-3 flex h-10 items-end gap-[3px]">
        {Array.from({ length: 34 }).map((_, i) => (
          <motion.span
            key={i}
            className="flex-1 rounded-full bg-accent-chart/80"
            initial={{ height: 5 + ((i * 13) % 26) }}
            whileInView={{ height: [5 + ((i * 13) % 26), 6 + ((i * 17) % 30), 4 + ((i * 7) % 20), 5 + ((i * 13) % 26)] }}
            viewport={{ once: false }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.045, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="mt-3 space-y-2">
        {[
          ["Caller", "Is the clinic open on Sunday?"],
          ["AI", "Yes, 9am–1pm. Shall I book you at 10:30?"],
          ["Caller", "Yes, book it."],
        ].map(([who, line], i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: who === "AI" ? 12 : -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inView}
            transition={{ delay: 0.3 + i * 0.35, duration: 0.5, ease }}
            className="flex gap-2 text-[11px]"
          >
            <span className={`w-12 shrink-0 font-mono text-[9px] uppercase ${who === "AI" ? "text-accent-700" : "text-ink-400"}`}>{who}</span>
            <span className="text-ink-700">{line}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={inView}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="mt-3 flex items-center gap-2 rounded-lg border border-dashed border-emerald-300 bg-emerald-50/60 px-2.5 py-2 text-[10px] font-medium text-emerald-800"
      >
        ✓ Appointment created · Sun 10:30 AM · Lead saved to CRM
      </motion.div>
    </div>
  )
}
