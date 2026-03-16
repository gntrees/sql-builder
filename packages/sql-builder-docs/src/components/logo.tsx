import { Link } from "@tanstack/react-router"
import { ImageLogo } from "./image-logo"

type LogoProps = {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className ?? ''}`}>
      <ImageLogo />
      <span className="text-base font-semibold tracking-tight text-foreground">
        Gntrees SQL Builder
      </span>
    </Link>
  )
}
