import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const siteUrl = 'https://sqlbuilder.gntrees.com'

const routePaths = [
  '/',
  '/docs',
  '/converter',
  '/docs/mssql',
  '/docs/mysql',
  '/docs/sqlite',
  '/docs/pg/cli',
  '/docs/pg/db-schema',
  '/docs/pg/function-call',
  '/docs/pg/helpers',
  '/docs/pg/insert',
  '/docs/pg/joins',
  '/docs/pg/operators',
  '/docs/pg/ordering',
  '/docs/pg/predicates',
  '/docs/pg/query-builder',
  '/docs/pg/raw',
  '/docs/pg/select',
  '/docs/pg/sql-schema',
  '/docs/pg/transactions',
  '/docs/pg/update-delete',
  '/docs/pg/validation',
  '/docs/pg/installation',
]

const urls = Array.from(new Set(routePaths)).map((routePath) => {
  if (routePath === '/') {
    return `${siteUrl}/`
  }

  return `${siteUrl}${routePath}`
})

const now = new Date().toISOString()

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map(
    (url) =>
      [
        '  <url>',
        `    <loc>${url}</loc>`,
        `    <lastmod>${now}</lastmod>`,
        '  </url>',
      ].join('\n'),
  ),
  '</urlset>',
  '',
].join('\n')

const rootDir = dirname(fileURLToPath(import.meta.url))
const outputDir = resolve(rootDir, '../dist/client')
const outputFile = resolve(outputDir, 'sitemap.xml')

await mkdir(outputDir, { recursive: true })
await writeFile(outputFile, xml, 'utf8')
