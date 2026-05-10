;(() => {
  window.__STATIC_PREVIEW__ = true
  const originalFetch = window.fetch.bind(window)
  let dataPromise = null

  function loadData() {
    if (!dataPromise) {
      dataPromise = originalFetch("/data/preview.json", {
        cache: "no-store"
      }).then(response => {
        if (!response.ok)
          throw new Error(`Preview data failed to load: ${response.status}`)
        return response.json()
      })
    }
    return dataPromise
  }

  function json(value, init = {}) {
    return new Response(JSON.stringify(value, null, 2), {
      status: init.status || 200,
      headers: { "content-type": "application/json; charset=utf-8" }
    })
  }

  function text(value, status = 200) {
    return new Response(value, {
      status,
      headers: { "content-type": "text/plain; charset=utf-8" }
    })
  }

  function tokens(query) {
    return query
      .toLowerCase()
      .split(/[,\s]+/)
      .map(part => part.trim())
      .filter(part => part.length > 1)
  }

  function queryGroups(query) {
    return query
      .split(",")
      .map(part => tokens(part))
      .filter(group => group.length > 0)
  }

  function scoreText(item, fields, includeTokens) {
    const haystack = fields
      .map(field => String(item[field] || ""))
      .join("\n")
      .toLowerCase()
    let score = 0
    const matchedBy = []
    for (const token of includeTokens) {
      const count = haystack.split(token).length - 1
      if (count > 0) {
        score +=
          count +
          (String(item.title || "")
            .toLowerCase()
            .includes(token)
            ? 4
            : 0)
        matchedBy.push(token)
      }
    }
    return { score, matchedBy, haystack }
  }

  function lineFor(content, includeTokens) {
    const lines = String(content || "").split(/\r?\n/)
    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index].toLowerCase()
      if (includeTokens.some(token => line.includes(token))) return index + 1
    }
    return 1
  }

  function excerptFor(content, includeTokens) {
    const lines = String(content || "").split(/\r?\n/)
    const line =
      lines.find(candidate =>
        includeTokens.some(token => candidate.toLowerCase().includes(token))
      ) ||
      lines[0] ||
      ""
    return line.trim().slice(0, 260)
  }

  function searchItems(
    items,
    includeTokens,
    excludeTokens,
    fields,
    limit,
    mapResult
  ) {
    return items
      .map(item => {
        const result = scoreText(item, fields, includeTokens)
        return { item, ...result }
      })
      .filter(
        ({ score, haystack }) =>
          score > 0 && !excludeTokens.some(token => haystack.includes(token))
      )
      .sort(
        (a, b) =>
          b.score - a.score ||
          String(a.item.path || "").localeCompare(String(b.item.path || ""))
      )
      .slice(0, limit)
      .map(({ item, score, matchedBy }) => mapResult(item, score, matchedBy))
  }

  function neighborsFor(edges, nodeId) {
    return edges
      .filter(edge => edge.from === nodeId || edge.to === nodeId)
      .slice(0, 10)
      .map(edge => ({
        id: edge.from === nodeId ? edge.to : edge.from,
        label: edge.from === nodeId ? edge.to : edge.from,
        relation: edge.label || edge.type || "references",
        path: edge.from === nodeId ? edge.to : edge.from
      }))
  }

  function graphResults(anchors, graph, limit) {
    const nodes = new Map((graph.nodes || []).map(node => [node.id, node]))
    const seen = new Set()
    const results = []
    for (const anchor of anchors) {
      const anchorId = anchor.specId || anchor.id
      const queue = [{ id: anchorId, depth: 0 }]
      while (queue.length && results.length < limit) {
        const current = queue.shift()
        if (!current || seen.has(current.id) || current.depth > 1) continue
        seen.add(current.id)
        const node = nodes.get(current.id)
        if (node) {
          results.push({
            id: `docs-graph:${node.id}`,
            title: node.label || node.id,
            path: node.path || node.id,
            specId: node.specId || node.id,
            nodeId: node.id,
            kind: "doc-graph",
            source: "docs-graph",
            score: Math.max(0.1, (anchor.score || 1) - current.depth * 0.1),
            relation: current.depth === 0 ? "anchor" : "neighbor",
            anchor: current.depth === 0,
            anchorId,
            depth: current.depth,
            neighbors: neighborsFor(graph.edges || [], node.id)
          })
        }
        for (const edge of graph.edges || []) {
          if (edge.from === current.id)
            queue.push({ id: edge.to, depth: current.depth + 1 })
          if (edge.to === current.id)
            queue.push({ id: edge.from, depth: current.depth + 1 })
        }
      }
    }
    return results
  }

  function graphifyResults(codeAnchors, graphify, includeTokens, limit) {
    const nodes = Array.isArray(graphify.nodes) ? graphify.nodes : []
    const links = Array.isArray(graphify.links) ? graphify.links : []
    const byId = new Map(nodes.map(node => [String(node.id), node]))
    const seedPaths = new Set(codeAnchors.map(anchor => anchor.path))
    const matched = nodes
      .filter(node => {
        const source = String(
          node.source_file || node.sourceFile || node.file || node.path || ""
        )
        const label = String(node.label || node.name || node.id || "")
        const textValue = `${source}\n${label}`.toLowerCase()
        return (
          seedPaths.has(source) ||
          includeTokens.some(token => textValue.includes(token))
        )
      })
      .slice(0, limit)
    return matched.map(node => {
      const nodeId = String(node.id)
      const related = links
        .filter(
          link =>
            String(link.source) === nodeId || String(link.target) === nodeId
        )
        .slice(0, 10)
        .map(link => {
          const otherId =
            String(link.source) === nodeId
              ? String(link.target)
              : String(link.source)
          const other = byId.get(otherId) || {}
          return {
            id: otherId,
            label: String(other.label || other.name || otherId),
            relation: String(link.relation || link.type || ""),
            confidence: String(link.confidence || ""),
            path: String(other.source_file || other.sourceFile || "")
          }
        })
      return {
        id: `code-graph:${nodeId}`,
        title: String(node.label || node.name || nodeId),
        path: String(node.source_file || node.sourceFile || ""),
        nodeId,
        kind: "code-graph",
        source: "graphify",
        score: 1,
        community: String(node.community || ""),
        relation: "anchor",
        anchor: true,
        anchorId: nodeId,
        depth: 0,
        neighbors: related
      }
    })
  }

  function buildSearch(data, url) {
    const query = url.searchParams.get("q") || ""
    const keywordOperator =
      url.searchParams.get("keywordOp") === "difference" ? "difference" : "sum"
    const limit = Math.max(
      1,
      Math.min(24, Number(url.searchParams.get("limit") || 8))
    )
    const groups = queryGroups(query)
    const includeTokens =
      keywordOperator === "difference" && groups.length
        ? groups[0]
        : tokens(query)
    const excludeTokens =
      keywordOperator === "difference" ? groups.slice(1).flat() : []
    const warnings = [...(data.graphify?.warnings || [])]
    if (!includeTokens.length)
      warnings.push("Enter a query to search docs and code.")

    const docsSemantic = searchItems(
      data.documents || [],
      includeTokens,
      excludeTokens,
      ["title", "path", "description", "raw"],
      limit,
      (doc, score, matchedBy) => ({
        id: `doc:${doc.id}`,
        title: doc.title,
        path: doc.path,
        specId: doc.id,
        kind: "doc",
        source: "keyword",
        line: lineFor(doc.raw, includeTokens),
        score,
        matchedBy,
        description: doc.description,
        excerpt: excerptFor(doc.raw, includeTokens)
      })
    )
    const codeSemantic = searchItems(
      data.codeDocs || [],
      includeTokens,
      excludeTokens,
      ["title", "path", "content"],
      limit,
      (doc, score, matchedBy) => ({
        id: `code:${doc.id}`,
        title: doc.title,
        path: doc.path,
        kind: "code",
        source: "keyword",
        line: lineFor(doc.content, includeTokens),
        score,
        matchedBy,
        excerpt: excerptFor(doc.content, includeTokens)
      })
    )
    const docsGraph = graphResults(docsSemantic, data.graph || {}, limit)
    const codeGraph = graphifyResults(
      codeSemantic,
      data.graphify || {},
      includeTokens,
      limit
    )
    return {
      query,
      mode: "static",
      keywordOperator,
      panels: { docsSemantic, docsGraph, codeSemantic, codeGraph },
      stats: {
        docsSemantic: docsSemantic.length,
        docsGraph: docsGraph.length,
        codeSemantic: codeSemantic.length,
        codeGraph: codeGraph.length
      },
      warnings
    }
  }

  window.fetch = async (input, init) => {
    const requestUrl = typeof input === "string" ? input : input?.url
    const url = new URL(requestUrl, window.location.href)
    if (!url.pathname.startsWith("/api/")) return originalFetch(input, init)
    const data = await loadData()

    if (url.pathname === "/api/project") return json(data.summary)
    if (url.pathname === "/api/docs") {
      return json(
        (data.documents || []).map(doc => ({ ...doc, raw: "", html: "" }))
      )
    }
    if (url.pathname.startsWith("/api/docs/")) {
      const id = decodeURIComponent(url.pathname.slice("/api/docs/".length))
      const doc = (data.documents || []).find(candidate => candidate.id === id)
      return doc ? json(doc) : text("spec not found", 404)
    }
    if (url.pathname === "/api/graph")
      return json(data.graph || { nodes: [], edges: [], relationships: [] })
    if (url.pathname === "/api/search") return json(buildSearch(data, url))
    if (url.pathname === "/api/files") {
      const filePath = url.searchParams.get("path") || ""
      const file = data.files?.[filePath]
      return file ? json(file) : text("file not found", 404)
    }
    return text("not found", 404)
  }
})()
