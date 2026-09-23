import { defineConfig, type Plugin, type ViteDevServer } from "vite"
import solid from "vite-plugin-solid"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { createRequire } from "node:module"
import type { DevResponse } from "./src/dev/ssg-runtime.ts"

const webRoot = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(webRoot, "..")

// A plain require of a small, dependency-free CJS file is safe at
// config-load time (unlike importing the content pipeline - see
// src/dev/ssg-runtime.ts's own comment for why that has to go through
// server.ssrLoadModule instead).
const require = createRequire(import.meta.url)
const okfConstants = require(
  path.join(repoRoot, "scripts/okf-core/constants.js")
) as {
  IGNORED_PATHS: string[]
}

const MIME_TYPES: Record<string, string> = {
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp"
}

/** Top-level content directories to watch for live-reload, derived from
 * okf-core's own IGNORED_PATHS rather than a hardcoded list so a new
 * top-level content directory is picked up automatically. */
function contentDirsToWatch(): string[] {
  return fs
    .readdirSync(repoRoot, { withFileTypes: true })
    .filter(
      e =>
        e.isDirectory() &&
        !e.name.startsWith(".") &&
        !okfConstants.IGNORED_PATHS.includes(e.name)
    )
    .map(e => path.join(repoRoot, e.name))
}

const publicDir = path.join(webRoot, "public")

function serveStaticFile(
  baseDir: string,
  pathname: string,
  res: import("node:http").ServerResponse
): boolean {
  const rel = pathname.replace(/^\/+/, "")
  const abs = path.join(baseDir, rel)
  if (
    !abs.startsWith(baseDir) ||
    !fs.existsSync(abs) ||
    !fs.statSync(abs).isFile()
  )
    return false
  const ext = path.extname(abs).toLowerCase()
  res.setHeader("Content-Type", MIME_TYPES[ext] ?? "application/octet-stream")
  fs.createReadStream(abs).pipe(res)
  return true
}

/**
 * Dev-mode equivalent of build.ts: renders pages on demand through Vite's
 * own SSR module graph (so JSX/CSS changes get normal Vite HMR) instead of
 * prebuilding all ~700 pages on every keystroke, and full-reloads the
 * browser whenever a content .md file under the bundle changes.
 */
function ssgDevPlugin(): Plugin {
  return {
    name: "ssg-dev",
    configureServer: {
      // Runs after Vite's own built-in middlewares (static/public-dir
      // serving, etc.) are installed, so a request for e.g. /favicon.svg is
      // served straight from web/public/ instead of falling through to our
      // catch-all content-page renderer below.
      order: "post",
      handler(server: ViteDevServer) {
        for (const dir of contentDirsToWatch()) server.watcher.add(dir)

        const onContentChange = async (file: string) => {
          if (
            file.endsWith(".md") &&
            file.startsWith(repoRoot) &&
            !file.startsWith(webRoot)
          ) {
            const mod = await server.ssrLoadModule("/src/dev/ssg-runtime.ts")
            mod.invalidateGraph()
            server.ws.send({ type: "full-reload" })
          }
        }
        server.watcher.on("change", onContentChange)
        server.watcher.on("add", onContentChange)
        server.watcher.on("unlink", onContentChange)

        server.middlewares.use(async (req, res, next) => {
          if (req.method !== "GET" || !req.url) return next()
          const pathname = decodeURIComponent(req.url.split("?")[0])

          if (
            pathname.startsWith("/@") ||
            pathname.startsWith("/src/") ||
            pathname.startsWith("/node_modules/") ||
            pathname === "/favicon.ico"
          ) {
            return next()
          }

          if (pathname.startsWith("/Attachments/")) {
            if (serveStaticFile(repoRoot, pathname, res)) return
            return next()
          }

          if (serveStaticFile(publicDir, pathname, res)) return

          try {
            const mod = await server.ssrLoadModule("/src/dev/ssg-runtime.ts")
            const response: DevResponse = await mod.handleRequest(
              pathname,
              repoRoot
            )

            if (response.contentType === "text/html") {
              const transformed = await server.transformIndexHtml(
                pathname,
                response.body
              )
              res.statusCode = response.status
              res.setHeader("Content-Type", "text/html")
              res.end(transformed)
            } else {
              res.statusCode = response.status
              res.setHeader("Content-Type", response.contentType)
              res.end(response.body)
            }
          } catch (err) {
            server.ssrFixStacktrace(err as Error)
            next(err)
          }
        })
      }
    }
  }
}

export default defineConfig({
  plugins: [solid({ ssr: true }), ssgDevPlugin()],
  server: {
    port: 8811,
    strictPort: true
  }
})
