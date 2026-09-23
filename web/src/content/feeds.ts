import type { Page } from "./types"

export const SITE_BASE_URL = "https://ngosangns-knowledge-base.pages.dev"
export const SITE_TITLE = "ngosangns Knowledge Base"

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export function buildSitemapXml(pages: Page[]): string {
  const urls = pages
    .map(page => {
      const loc = SITE_BASE_URL + page.route
      const lastmod = page.frontmatter.timestamp
        ? `<lastmod>${page.frontmatter.timestamp.slice(0, 10)}</lastmod>`
        : ""
      return `  <url><loc>${xmlEscape(loc)}</loc>${lastmod}</url>`
    })
    .join("\n")

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  )
}

export function buildRssXml(pages: Page[]): string {
  const items = [...pages]
    .filter(p => p.frontmatter.timestamp)
    .sort((a, b) =>
      (b.frontmatter.timestamp ?? "").localeCompare(
        a.frontmatter.timestamp ?? ""
      )
    )
    .slice(0, 50)
    .map(page => {
      const link = SITE_BASE_URL + page.route
      const pubDate = new Date(page.frontmatter.timestamp!).toUTCString()
      return (
        `  <item>\n` +
        `    <title>${xmlEscape(page.frontmatter.title)}</title>\n` +
        `    <link>${xmlEscape(link)}</link>\n` +
        `    <guid>${xmlEscape(link)}</guid>\n` +
        `    <pubDate>${pubDate}</pubDate>\n` +
        (page.frontmatter.description
          ? `    <description>${xmlEscape(page.frontmatter.description)}</description>\n`
          : "") +
        `  </item>`
      )
    })
    .join("\n")

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<rss version="2.0"><channel>\n` +
    `  <title>${xmlEscape(SITE_TITLE)}</title>\n` +
    `  <link>${xmlEscape(SITE_BASE_URL)}</link>\n` +
    `  <description>${xmlEscape(SITE_TITLE)}</description>\n` +
    `${items}\n` +
    `</channel></rss>\n`
  )
}

export function buildRobotsTxt(): string {
  return `User-agent: *\nAllow: /\nSitemap: ${SITE_BASE_URL}/sitemap.xml\n`
}
