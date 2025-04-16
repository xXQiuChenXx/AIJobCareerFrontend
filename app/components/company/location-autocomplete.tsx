import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LocationAutocompleteProps {
  id: string
  value: string
  onChange: (value: string) => void
  label?: string
  locations: string[]
}

export default function LocationAutocomplete({ id, value, onChange, label, locations }: LocationAutocompleteProps) {
  // Initialize state from props
  const [inputValue, setInputValue] = useState(value)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredLocations, setFilteredLocations] = useState<string[]>(locations)

  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Update input value when prop changes
  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value)
    }
  }, [value])

  // Filter locations based on input
  useEffect(() => {
    if (inputValue.trim() === "") {
      setFilteredLocations(locations)
    } else {
      const filtered = locations.filter((location) => location.toLowerCase().includes(inputValue.toLowerCase()))
      setFilteredLocations(filtered)
    }
  }, [inputValue, locations])

  // Handle clicks outside the component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    setShowSuggestions(true)
  }

  // Handle selection from dropdown
  const handleSelectLocation = (location: string) => {
    setInputValue(location)
    setShowSuggestions(false)
    onChange(location)
  }

  // Handle input blur
  const handleInputBlur = () => {
    // Delay to allow click on suggestion to register
    setTimeout(() => {
      if (inputValue !== value) {
        onChange(inputValue)
      }
      setShowSuggestions(false)
    }, 200)
  }

  return (
    <div className="grid gap-2 relative">
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input
        ref={inputRef}
        id={id}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        onBlur={handleInputBlur}
        placeholder="Enter or select a location"
      />
      {showSuggestions && filteredLocations.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 z-10 mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {filteredLocations.map((location, index) => (
            <div
              key={index}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              onMouseDown={() => handleSelectLocation(location)}
            >
              {location}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

