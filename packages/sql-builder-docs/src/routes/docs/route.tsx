import { Outlet, createFileRoute } from "@tanstack/react-router"

import { AppSidebar } from "#/components/app-sidebar"
import { SidebarProvider } from "#/components/ui/sidebar"

export const Route = createFileRoute("/docs")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <Outlet />
    </SidebarProvider>
  )
}
