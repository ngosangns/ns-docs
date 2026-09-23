import { renderToString } from "solid-js/web"
import { ConceptPage, type ConceptPageProps } from "./pages/ConceptPage"
import { FolderPage, type FolderPageProps } from "./pages/FolderPage"
import { TagIndexPage, type TagIndexPageProps } from "./pages/TagIndexPage"
import { TagPage, type TagPageProps } from "./pages/TagPage"
import { NotFoundPage } from "./pages/NotFoundPage"
import type { NavNode } from "./content/types"

const DOCTYPE = "<!DOCTYPE html>"

export function renderConceptPage(props: ConceptPageProps): string {
  return DOCTYPE + renderToString(() => <ConceptPage {...props} />)
}

export function renderFolderPage(props: FolderPageProps): string {
  return DOCTYPE + renderToString(() => <FolderPage {...props} />)
}

export function renderTagIndexPage(props: TagIndexPageProps): string {
  return DOCTYPE + renderToString(() => <TagIndexPage {...props} />)
}

export function renderTagPage(props: TagPageProps): string {
  return DOCTYPE + renderToString(() => <TagPage {...props} />)
}

export function renderNotFoundPage(props: { navTree: NavNode; cssHref: string }): string {
  return DOCTYPE + renderToString(() => <NotFoundPage {...props} />)
}
