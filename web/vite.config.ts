import { defineConfig } from "vite"
import solid from "vite-plugin-solid"

export default defineConfig({
  plugins: [solid({ ssr: true })],
  server: {
    port: 8811,
    strictPort: true
  }
})
