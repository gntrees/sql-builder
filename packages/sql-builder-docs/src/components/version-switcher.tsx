import { useNavigate, useRouterState } from "@tanstack/react-router"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#/components/ui/select"

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
    <Select
      value={selectedOption.value}
      onValueChange={(nextValue) => {
        const nextOption = options.find((option) => option.value === nextValue)
        if (!nextOption || nextOption.disabled) {
          return
        }

        navigate({ to: nextOption.to })
      }}
    >
      <SelectTrigger className="h-10 w-full bg-sidebar-accent/40">
        <SelectValue placeholder="Select database" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
