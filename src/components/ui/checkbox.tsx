"use client"

import * as React from "react"
import { Check } from "lucide-react"

interface CheckboxProps {
  id?: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  className?: string
  disabled?: boolean
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked,
  onCheckedChange,
  className = "",
  disabled = false
}) => {
  return (
    <button
      id={id}
      type="button"
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={`
        h-4 w-4 shrink-0 rounded-sm border border-gray-300 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        disabled:cursor-not-allowed disabled:opacity-50
        ${checked ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white'}
        flex items-center justify-center
        ${className}
      `}
    >
      {checked && <Check className="h-3 w-3" />}
    </button>
  )
}
