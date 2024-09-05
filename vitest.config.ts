import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    deps: {
      inline: [/@nuxt\/test-utils-edge/],
    },
  },
  resolve: {
    alias: {
      '~~': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
})
