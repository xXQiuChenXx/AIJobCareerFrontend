"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface SalaryRangeInputProps {
  id: string
  value: string
  onChange: (value: string) => void
  label?: string
}

export default function SalaryRangeInput({ id, value, onChange, label }: SalaryRangeInputProps) {
  // Parse the value string into min and max components
  const parseValue = (val: string) => {
    const match = val.match(/\$?([\d,]+)\s*-\s*\$?([\d,]+)/)
    if (match) {
      return {
        min: match[1].replace(/,/g, ""),
        max: match[2].replace(/,/g, ""),
      }
    }
    return { min: "", max: "" }
  }

  // Initialize state from props
  const [minSalary, setMinSalary] = useState(() => parseValue(value).min)
  const [maxSalary, setMaxSalary] = useState(() => parseValue(value).max)

  // Update local state when prop value changes significantly
  useEffect(() => {
    const parsed = parseValue(value)
    // Only update if the parsed values are different from current state
    // and the value doesn't match what we would generate from current state
    const currentFormatted = formatSalaryRange(minSalary, maxSalary)
    if (value !== currentFormatted) {
      setMinSalary(parsed.min)
      setMaxSalary(parsed.max)
    }
  }, [value])

  // Format the salary range for display
  const formatSalaryRange = (min: string, max: string) => {
    const formatNumber = (num: string) => {
      if (!num) return ""
      return Number(num).toLocaleString()
    }

    const formattedMin = min ? `$${formatNumber(min)}` : ""
    const formattedMax = max ? `$${formatNumber(max)}` : ""

    if (formattedMin && formattedMax) {
      return `${formattedMin} - ${formattedMax}`
    } else if (formattedMin) {
      return formattedMin
    } else if (formattedMax) {
      return formattedMax
    }
    return ""
  }

  // Handle min salary input change
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^\d]/g, "")
    setMinSalary(newValue)

    // Update parent with formatted value
    const formatted = formatSalaryRange(newValue, maxSalary)
    if (formatted) {
      onChange(formatted)
    }
  }

  // Handle max salary input change
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^\d]/g, "")
    setMaxSalary(newValue)

    // Update parent with formatted value
    const formatted = formatSalaryRange(minSalary, newValue)
    if (formatted) {
      onChange(formatted)
    }
  }

  return (
    <div className="grid gap-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
          <Input id={`${id}-min`} value={minSalary} onChange={handleMinChange} className="pl-7" placeholder="Min" />
        </div>
        <span className="text-gray-500">-</span>
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
          <Input id={`${id}-max`} value={maxSalary} onChange={handleMaxChange} className="pl-7" placeholder="Max" />
        </div>
      </div>
    </div>
  )
}

