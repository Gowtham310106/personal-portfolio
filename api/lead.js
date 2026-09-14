import nodemailer from "nodemailer"

/* ═══════════════════════════════════════════════════════════════════════
   Lead delivery → Zoho mailbox.

   Every enquiry (contact form + chatbot) is POSTed here and arrives as an
   email in the Zoho inbox, with Reply-To set to the enquirer so hitting
   Reply in Zoho answers them directly.

   Required environment variables (set in Vercel → Settings → Environment
   Variables — never commit these):
     ZOHO_USER  hello@buildfastweb.in
     ZOHO_PASS  a Zoho app-specific password (NOT the login password)
   Optional:
     ZOHO_HOST  smtp.zoho.in (default) or smtp.zoho.com — match your region
     LEAD_TO    where enquiries land; defaults to ZOHO_USER
   ═══════════════════════════════════════════════════════════════════════ */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i
const PHONE_RE = /^[+]?[\d\s()-]{7,20}$/

const clip = (v, max) => String(v ?? "").trim().slice(0, max)

const escapeHtml = (v) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ))

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ ok: false, error: "Method not allowed" })
  }

  let body = req.body
  if (typeof body === "string") {
    try { body = JSON.parse(body) } catch { body = {} }
  }
  body = body || {}

  // Honeypot: bots fill the hidden field. Answer 200 so they don't retry.
  if (clip(body.company, 200)) return res.status(200).json({ ok: true })

  const name = clip(body.name, 120)
  let email = clip(body.email, 160)
  let phone = clip(body.phone, 40)

  // The chatbot collects one free-text "contact" — sort it into the right slot.
  const contact = clip(body.contact, 160)
  if (contact && !email && !phone) {
    if (EMAIL_RE.test(contact)) email = contact
    else phone = contact
  }

  const service = clip(body.service, 120)
  const message = clip(body.message || body.need, 4000)
  const source = clip(body.source, 120) || "buildfastweb.in"

  if (!name) return res.status(400).json({ ok: false, error: "Name is required" })
  if (!email && !phone) {
    return res.status(400).json({ ok: false, error: "A mobile number or an email is required" })
  }
  if (email && !EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: "That email address doesn't look right" })
  }
  if (phone && !PHONE_RE.test(phone)) {
    return res.status(400).json({ ok: false, error: "That mobile number doesn't look right" })
  }

  const user = process.env.ZOHO_USER
  const pass = process.env.ZOHO_PASS
  if (!user || !pass) {
    // The site falls back to its WhatsApp handoff on a non-2xx, so a
    // misconfigured mailbox still never loses an enquiry.
    console.error("ZOHO_USER / ZOHO_PASS are not set — cannot send the enquiry")
    return res.status(500).json({ ok: false, error: "Mail is not configured" })
  }

  const receivedAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  })

  const rows = [
    ["Name", name],
    ["Mobile", phone],
    ["Email", email],
    ["Interested in", service],
    ["Message", message],
    ["Received", `${receivedAt} IST`],
    ["Source", source],
  ].filter(([, v]) => v)

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n")

  const html = `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px">
  <p style="margin:0 0 4px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#71717A">New enquiry</p>
  <h2 style="margin:0 0 16px;font-size:22px;color:#0B0B0F">${escapeHtml(name)}</h2>
  <table style="border-collapse:collapse;width:100%;font-size:14px;color:#27272A">
    ${rows
      .map(
        ([k, v]) => `<tr>
      <td style="padding:8px 12px 8px 0;color:#71717A;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td>
      <td style="padding:8px 0;border-bottom:1px solid #E8E8E6">${escapeHtml(v).replace(/\n/g, "<br>")}</td>
    </tr>`,
      )
      .join("")}
  </table>
  ${phone
      ? `<p style="margin:20px 0 0"><a href="https://wa.me/${phone.replace(/\D/g, "")}"
      style="display:inline-block;background:#FBC11F;color:#0B0B0F;text-decoration:none;
      padding:10px 18px;border-radius:99px;font-weight:700;font-size:14px">Reply on WhatsApp</a></p>`
      : ""}
</div>`

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.ZOHO_HOST || "smtp.zoho.in",
      port: 465,
      secure: true,
      auth: { user, pass },
    })

    await transporter.sendMail({
      from: `"Build Fast Web enquiries" <${user}>`,
      to: process.env.LEAD_TO || user,
      replyTo: email ? `"${name}" <${email}>` : undefined,
      subject: `New enquiry — ${name}${service ? ` · ${service}` : ""}`,
      text,
      html,
    })

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error("Zoho SMTP send failed:", err?.message)
    return res.status(502).json({ ok: false, error: "Could not send the enquiry" })
  }
}
