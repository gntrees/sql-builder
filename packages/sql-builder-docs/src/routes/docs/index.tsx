import { createFileRoute, Navigate } from "@tanstack/react-router"

export const Route = createFileRoute("/docs/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <Navigate to="/docs/pg/installation" replace />
}
