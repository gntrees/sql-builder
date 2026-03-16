import { useNavigate, useRouterState } from "@tanstack/react-router"
import { Check, ChevronsUpDown } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "#/components/ui/sidebar"
import { ImageLogo } from "./image-logo"

type DatabaseOption = {
  label: string
  value: string
  to: string
  disabled?: boolean
}

export function VersionSwitcher({
  options,
}: {
  options: DatabaseOption[]
}) {
  const navigate = useNavigate()
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const selectedOption =
    options.find((option) => option.to === pathname) ?? options[0]

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex size-8 items-center justify-center">
                <ImageLogo />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-medium text-xs">Gntrees Sql Builder</span>
                <span className="font-bold">{selectedOption.label}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width)"
            align="start"
          >
            {options.map((option) => (
              <DropdownMenuItem
                key={option.value}
                disabled={option.disabled}
                onSelect={() => {
                  if (option.disabled) {
                    return
                  }
                  navigate({ to: option.to })
                }}
              >
                {option.label}
                {option.value === selectedOption.value && (
                  <Check className="ml-auto" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
