import { renderToString } from "solid-js/web"
import { ConceptPage } from "./pages/ConceptPage"
import type { Page } from "./content/types"

export function renderConceptPage(page: Page): string {
  return "<!DOCTYPE html>" + renderToString(() => <ConceptPage page={page} />)
}
