import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { performance } from 'perf_hooks'

// https://vitejs.dev/config/
export default {
  plugins: [svelte()],
  performance,
}
