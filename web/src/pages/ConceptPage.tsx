import type { Page } from "../content/types"

export function ConceptPage(props: { page: Page }) {
  const { page } = props
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{page.frontmatter.title}</title>
        {page.frontmatter.description ? (
          <meta name="description" content={page.frontmatter.description} />
        ) : null}
      </head>
      <body>
        <h1>{page.frontmatter.title}</h1>
        <article innerHTML={page.contentHtml} />
      </body>
    </html>
  )
}
