import type { Page, NavNode } from "../content/types"
import { Layout } from "../components/Layout"
import type { BacklinkEntry } from "../components/Backlinks"
import { breadcrumbSegments } from "../lib/routes"
import { ancestorPaths } from "../content/nav"

export interface ConceptPageProps {
  page: Page
  navTree: NavNode
  backlinks: BacklinkEntry[]
  cssHref: string
  jsHref: string
}

export function ConceptPage(props: ConceptPageProps) {
  const { page } = props
  return (
    <Layout
      title={page.frontmatter.title}
      description={page.frontmatter.description}
      cssHref={props.cssHref}
      jsHref={props.jsHref}
      navTree={props.navTree}
      activeId={page.id}
      activeAncestors={new Set(ancestorPaths(page.id))}
      crumbs={breadcrumbSegments(page.id)}
      toc={page.toc}
      backlinks={props.backlinks}
      frontmatter={page.frontmatter}
    >
      <article innerHTML={page.contentHtml} />
    </Layout>
  )
}
