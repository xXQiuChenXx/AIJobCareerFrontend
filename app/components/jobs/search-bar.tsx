import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const [location, setLocation] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching for:", { query, location })
    // Here you would typically trigger a search action
  }

  return (
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row w-full items-center gap-3 bg-white p-2 rounded-lg shadow-lg">
      {/* Job Search Input */}
      <div className="relative flex-grow w-full">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Job title or keywords"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 h-12 border-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>

      <Button type="submit" className="h-12 px-8 w-full sm:w-auto">
        Search Jobs
      </Button>
    </form>
  )
}
