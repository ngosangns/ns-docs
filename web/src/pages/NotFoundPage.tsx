import type { NavNode } from "../content/types"
import { Layout } from "../components/Layout"

export function NotFoundPage(props: {
  navTree: NavNode
  cssHref: string
  jsHref: string
}) {
  return (
    <Layout
      title="Page not found"
      cssHref={props.cssHref}
      jsHref={props.jsHref}
      navTree={props.navTree}
      activeAncestors={new Set([""])}
    >
      <p>The page you were looking for doesn't exist.</p>
      <p>
        <a href="/">Back to the home page</a>
      </p>
    </Layout>
  )
}
