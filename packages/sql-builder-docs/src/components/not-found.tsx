export function NotFound() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="space-y-2 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          404
        </p>
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <p className="text-sm text-muted-foreground">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  )
}
