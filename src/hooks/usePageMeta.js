import { useEffect } from "react"
import { site } from "../data/site"

/** Per-page <title>, meta description and canonical — basic SEO hygiene for an SPA. */
export function usePageMeta({ title, description, path = "" }) {
  useEffect(() => {
    document.title = title ? `${title} | ${site.name}` : `${site.name} — ${site.tagline}`

    const setMeta = (selector, attr, value) => {
      let el = document.head.querySelector(selector)
      if (!el) {
        el = document.createElement("meta")
        const [key, val] = selector.replace(/meta\[|\]/g, "").split("=")
        el.setAttribute(key, val.replace(/["']/g, ""))
        document.head.appendChild(el)
      }
      el.setAttribute(attr, value)
    }

    if (description) {
      setMeta('meta[name="description"]', "content", description)
      setMeta('meta[property="og:description"]', "content", description)
    }
    setMeta('meta[property="og:title"]', "content", document.title)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement("link")
      canonical.rel = "canonical"
      document.head.appendChild(canonical)
    }
    canonical.href = `${site.url}${path}`
  }, [title, description, path])
}
