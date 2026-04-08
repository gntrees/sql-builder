import * as React from "react"
import { Link } from "@tanstack/react-router"

import { VersionSwitcher } from "#/components/version-switcher"
import { ImageLogo } from "#/components/image-logo"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "#/components/ui/sidebar"

const data = {
  databases: [
    {
      label: "PostgreSQL",
      value: "postgresql",
      to: "/docs/pg/installation",
    },
    {
      label: "MySQL (Coming Soon)",
      value: "mysql",
      to: "/docs/mysql",
      disabled: true,
    },
    {
      label: "MSSQL (Coming Soon)",
      value: "mssql",
      to: "/docs/mssql",
      disabled: true,
    },
    {
      label: "SQLite (Coming Soon)",
      value: "sqlite",
      to: "/docs/sqlite",
      disabled: true,
    },
  ],
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Installation",
          url: "/docs/pg/installation",
        },
      ],
    },
    {
      title: "Basics",
      url: "#",
      items: [
        {
          title: "Raw Query",
          url: "/docs/pg/raw",
        },
        {
          title: "Query Builder",
          url: "/docs/pg/query-builder",
        },
        {
          title: "Operators",
          url: "/docs/pg/operators",
        },
        {
          title: "Function Call",
          url: "/docs/pg/function-call",
        },
        {
          title: "Transactions",
          url: "/docs/pg/transactions",
        },
        {
          title: "Select Variants",
          url: "/docs/pg/select",
        },
        {
          title: "Insert & Upsert",
          url: "/docs/pg/insert",
        },
        {
          title: "Update & Delete",
          url: "/docs/pg/update-delete",
        },
        {
          title: "Joins",
          url: "/docs/pg/joins",
        },
        {
          title: "Predicates",
          url: "/docs/pg/predicates",
        },
        {
          title: "Ordering & Fetch",
          url: "/docs/pg/ordering",
        },
        {
          title: "Helpers",
          url: "/docs/pg/helpers",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link
          to="/"
          className="flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-sidebar-accent/50"
        >
          <span className="flex size-8 items-center justify-center rounded-md border border-sidebar-border/70 bg-sidebar-accent/20">
            <ImageLogo />
          </span>
          <span className="text-sm font-semibold tracking-tight text-sidebar-foreground">
            Gntrees SQL Builder
          </span>
        </Link>
        <VersionSwitcher options={data.databases} />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
