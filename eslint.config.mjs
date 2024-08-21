// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  {
    files: ['**/*.vue', '**/*.ts', '**/*.tsx'],
    rules: {
      // 'no-console': ["error", { allow: ["warn", "error"] }]
    }
  }
)
