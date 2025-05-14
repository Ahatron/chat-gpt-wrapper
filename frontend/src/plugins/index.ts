/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { createPinia } from 'pinia'
import vuetify from './vuetify'
// Types
import type { App } from 'vue'

const pinia = createPinia()

export function registerPlugins(app: App) {
  app.use(vuetify)
  app.use(pinia)
}
