import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "#/components/ui/breadcrumb"
import {
  SidebarInset,
  SidebarTrigger,
} from "#/components/ui/sidebar"

type DocsLayoutProps = {
  breadcrumbHref: string
  pageLabel: string
  toc?: Array<{ label: string; href: string; level?: number }>
  children: React.ReactNode
}

export function DocsLayout({
  breadcrumbHref,
  pageLabel,
  toc,
  children,
}: DocsLayoutProps) {
  const tocItems = toc ?? []
  return (
    <SidebarInset>
      <header className="flex h-14 items-center gap-2 border-b border-border px-4">
        <SidebarTrigger />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={breadcrumbHref}>Docs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{pageLabel}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 gap-8 p-6 w-full">
        <main className="flex min-w-0 flex-1 flex-col gap-6">{children}</main>
        {tocItems.length > 0 ? (
          <aside className="hidden w-64 shrink-0 xl:block">
            <div className="sticky top-20 space-y-4 rounded-xl border border-border bg-card/70 p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                On this page
              </p>
              <nav className="space-y-2 text-sm">
                {tocItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`block transition text-foreground/50 hover:text-foreground/80 ${
                      item.level === 3
                        ? "pl-3 text-xs text-muted-foreground"
                        : "text-sm text-foreground"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        ) : null}
      </div>
    </SidebarInset>
  )
}
