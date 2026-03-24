import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const rootDir = dirname(fileURLToPath(import.meta.url))
const config = defineConfig({
  resolve: {
    alias: {
      '@gntrees/sql-builder-cli/src/convert': resolve(rootDir, '../sql-builder-cli/src/convert.ts'),
      '@gntrees/sql-builder/src/dialects/pg/generated/function-list.json': resolve(rootDir, '../sql-builder/src/dialects/pg/generated/function-list.json'),
      '@gntrees/sql-builder/pg/builder': resolve(
        rootDir,
        '../sql-builder/pg/builder.ts',
      ),
    },
  },
  plugins: [
    devtools(),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
})

export default config
