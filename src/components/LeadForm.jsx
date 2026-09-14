import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { site, waLink } from "../data/site"

const SERVICES = [
  "Website / Landing page",
  "E-commerce store",
  "Custom software / ERP",
  "Mobile app",
  "AI receptionist / Chatbot",
  "WhatsApp automation",
  "UI/UX design",
  "SEO & digital marketing",
  "Not sure yet — advise me",
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i
const PHONE_RE = /^[+]?[\d\s()-]{7,16}$/

const empty = { name: "", email: "", phone: "", service: "", message: "", company: "" }

export default function LeadForm({ compact = false, id = "lead-form" }) {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [state, setState] = useState("idle") // idle | sending | done | error

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    if (errors[key] || errors.contact) setErrors((err) => ({ ...err, [key]: null, contact: null }))
  }

  const validate = () => {
    const err = {}
    if (!values.name.trim()) err.name = "Please tell us your name"
    else if (values.name.trim().length < 2) err.name = "That name looks too short"

    const hasEmail = values.email.trim().length > 0
    const hasPhone = values.phone.trim().length > 0

    // Either one is enough — neither field is individually compulsory.
    if (!hasEmail && !hasPhone) err.contact = "Add a mobile number or an email — either one is fine"
    if (hasEmail && !EMAIL_RE.test(values.email.trim())) err.email = "Check this email address"
    if (hasPhone && !PHONE_RE.test(values.phone.trim())) err.phone = "Check this mobile number"

    return err
  }

  const summary = () =>
    [
      `New enquiry from ${site.domain}`,
      `Name: ${values.name}`,
      values.phone && `Mobile: ${values.phone}`,
      values.email && `Email: ${values.email}`,
      values.service && `Interested in: ${values.service}`,
      values.message && `Message: ${values.message}`,
    ]
      .filter(Boolean)
      .join("\n")

  const onSubmit = async (e) => {
    e.preventDefault()
    if (values.company) return // honeypot: bots fill hidden fields

    const err = validate()
    setErrors(err)
    if (Object.keys(err).length) {
      document.getElementById(`${id}-${Object.keys(err)[0] === "contact" ? "phone" : Object.keys(err)[0]}`)?.focus()
      return
    }

    setState("sending")

    if (site.leadEndpoint) {
      try {
        const res = await fetch(site.leadEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...values, company: undefined, source: site.domain, submittedAt: new Date().toISOString() }),
        })
        if (!res.ok) throw new Error(res.statusText)
        setState("done")
        return
      } catch {
        // Never lose a lead: fall through to the WhatsApp handoff.
        window.open(waLink(summary()), "_blank", "noopener")
        setState("done")
        return
      }
    }

    // No endpoint configured yet → hand the enquiry straight to WhatsApp.
    window.open(waLink(summary()), "_blank", "noopener")
    setState("done")
  }

  if (state === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="card flex min-h-[380px] flex-col items-center justify-center p-8 text-center"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 220, damping: 14 }}
          className="grid h-16 w-16 place-items-center rounded-full bg-emerald-50"
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
            <motion.path
              d="M5 12.5 10 17.5 19 7"
              stroke="#059669" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" }}
            />
          </svg>
        </motion.span>
        <h3 className="mt-5 text-[26px] font-extrabold tracking-tight">Got it, {values.name.split(" ")[0]}.</h3>
        <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-ink-500">
          Your enquiry is with us. We reply within a few working hours — usually much faster on WhatsApp.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={waLink(`Hi, I'm ${values.name}. I just submitted an enquiry on your site.`)} target="_blank" rel="noreferrer" className="btn-accent">
            Continue on WhatsApp
          </a>
          <button onClick={() => { setValues(empty); setState("idle") }} className="btn-ghost">
            Send another
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate id={id} className="card p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="text-[24px] font-extrabold tracking-tight">Tell us what you need</h3>
        <p className="mt-1.5 text-[14.5px] text-ink-500">
          Takes 30 seconds. Leave a <span className="font-semibold text-ink">mobile number or an email</span> — whichever you prefer.
        </p>
      </div>

      <div className="space-y-4">
        <Field label="Your name" required error={errors.name} htmlFor={`${id}-name`}>
          <input
            id={`${id}-name`} name="name" type="text" autoComplete="name" placeholder="e.g. Gowtham R"
            value={values.name} onChange={set("name")}
            className={`field ${errors.name ? "border-accent ring-4 ring-accent/10" : ""}`}
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Mobile number" error={errors.phone} htmlFor={`${id}-phone`} hint="or email →">
            <input
              id={`${id}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210"
              value={values.phone} onChange={set("phone")}
              className={`field ${errors.phone ? "border-accent ring-4 ring-accent/10" : ""}`}
            />
          </Field>
          <Field label="Email address" error={errors.email} htmlFor={`${id}-email`} hint="either is fine">
            <input
              id={`${id}-email`} name="email" type="email" autoComplete="email" placeholder="you@company.com"
              value={values.email} onChange={set("email")}
              className={`field ${errors.email ? "border-accent ring-4 ring-accent/10" : ""}`}
            />
          </Field>
        </div>

        <AnimatePresence>
          {errors.contact && (
            <motion.p
              initial={{ opacity: 0, y: -6, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-1.5 text-[13px] font-medium text-accent-700"
            >
              <span aria-hidden>!</span> {errors.contact}
            </motion.p>
          )}
        </AnimatePresence>

        {!compact && (
          <Field label="What do you need?" htmlFor={`${id}-service`} hint="optional">
            <div className="relative">
              <select id={`${id}-service`} name="service" value={values.service} onChange={set("service")} className="field appearance-none pr-10">
                <option value="">Select a service</option>
                {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden>
                <path d="m1 1.5 5 5 5-5" stroke="#71717A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Field>
        )}

        <Field label="Anything we should know?" htmlFor={`${id}-message`} hint="optional">
          <textarea
            id={`${id}-message`} name="message" rows={compact ? 2 : 3}
            placeholder="A line or two about your business or the problem you want solved."
            value={values.message} onChange={set("message")} className="field resize-none"
          />
        </Field>

        {/* honeypot — hidden from humans, irresistible to bots */}
        <input
          type="text" name="company" value={values.company} onChange={set("company")}
          tabIndex={-1} autoComplete="off" aria-hidden="true"
          className="pointer-events-none absolute h-0 w-0 opacity-0"
        />
      </div>

      <button type="submit" disabled={state === "sending"} className="btn-accent mt-6 w-full !py-4 disabled:opacity-70">
        {state === "sending" ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/25 border-t-ink" />
            Sending…
          </>
        ) : (
          <>
            Get my free quote
            <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M2.5 7h9m0 0L7.6 3.1M11.5 7 7.6 10.9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </>
        )}
      </button>

      <p className="mt-3 text-center text-[12.5px] text-ink-400">
        No spam, no sales calls at odd hours. Your details stay with us.
      </p>
    </form>
  )
}

function Field({ label, children, required, error, hint, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="text-[13px] font-semibold text-ink">
          {label} {required && <span className="text-accent-700">*</span>}
        </span>
        {hint && !error && <span className="text-[11.5px] text-ink-300">{hint}</span>}
      </span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mt-1.5 block text-[12.5px] font-medium text-accent-700"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  )
}
