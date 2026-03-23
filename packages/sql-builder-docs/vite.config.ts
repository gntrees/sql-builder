import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'


const rootDir = dirname(fileURLToPath(import.meta.url))
const config = defineConfig(({ command }) => ({
  resolve: {
    alias: {
      // '@gntrees/sql-builder-cli': resolve(rootDir, '../sql-builder-cli/index.ts'),
      '@gntrees/sql-builder/pg/builder': resolve(
        rootDir,
        '../sql-builder/pg/builder.ts',
      ),
    },
  },
  // server: {
  //   fs: {
  //     allow: [resolve(rootDir, '..')],
  //   },
  // },
  plugins: [
    // devtools(),
    // ...(command === 'build'
    //   ? [nitro({ rollupConfig: { external: [/^@sentry\//] } })]
    //   : []),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
}))

export default config
