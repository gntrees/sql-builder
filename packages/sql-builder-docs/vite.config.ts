import { defineConfig } from 'vite'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { devtools } from '@tanstack/devtools-vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

const rootDir = dirname(fileURLToPath(import.meta.url))
const config = defineConfig(({ command }) => ({
  resolve: {
    alias: {
      '@gntrees/sql-builder/pg/builder': resolve(
        rootDir,
        '../sql-builder/pg/builder.ts',
      ),
    },
  },
  plugins: [
    devtools(),
    ...(command === 'build'
      ? [nitro({ rollupConfig: { external: [/^@sentry\//] } })]
      : []),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
}))

export default config
