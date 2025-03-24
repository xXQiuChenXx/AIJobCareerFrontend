import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, Plus, Trash2 } from "lucide-react"

interface Publication {
  id: number
  title: string
  publisher: string
  year: string
  url: string
}

export function EditPublicationsForm() {
  const [publications, setPublications] = useState<Publication[]>([
    {
      id: 1,
      title: "Improving Few-Shot Learning in LLMs for Technical Domains",
      publisher: "International Conference on Machine Learning",
      year: "2023",
      url: "#",
    },
    {
      id: 2,
      title: "Efficient Transformers for Resource-Constrained Environments",
      publisher: "Neural Information Processing Systems",
      year: "2021",
      url: "#",
    },
  ])

  const addPublication = () => {
    const newPub = {
      id: Date.now(),
      title: "",
      publisher: "",
      year: "",
      url: "",
    }
    setPublications([newPub, ...publications])
  }

  const removePublication = (id: number) => {
    setPublications(publications.filter((pub) => pub.id !== id))
  }

  return (
    <div className="space-y-4">
      <Button
        onClick={addPublication}
        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Publication
      </Button>

      {publications.map((pub) => (
        <div key={pub.id} className="rounded-lg border p-4">
          <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                <FileText className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="flex-1">
                <Input
                  value={pub.title}
                  onChange={(e) => {
                    const updated = publications.map((item) =>
                      item.id === pub.id ? { ...item, title: e.target.value } : item,
                    )
                    setPublications(updated)
                  }}
                  placeholder="Publication Title"
                  className="border-0 p-0 text-lg font-semibold h-7 focus-visible:ring-0"
                />
                <div className="flex flex-wrap gap-2 mt-1">
                  <div className="flex items-center">
                    <Input
                      value={pub.publisher}
                      onChange={(e) => {
                        const updated = publications.map((item) =>
                          item.id === pub.id ? { ...item, publisher: e.target.value } : item,
                        )
                        setPublications(updated)
                      }}
                      placeholder="Publisher/Journal"
                      className="border-0 p-0 h-6 w-40 text-sm text-muted-foreground focus-visible:ring-0"
                    />
                  </div>
                  <div className="flex items-center">
                    <Input
                      value={pub.year}
                      onChange={(e) => {
                        const updated = publications.map((item) =>
                          item.id === pub.id ? { ...item, year: e.target.value } : item,
                        )
                        setPublications(updated)
                      }}
                      placeholder="Year"
                      className="border-0 p-0 h-6 w-16 text-sm text-muted-foreground focus-visible:ring-0"
                    />
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removePublication(pub.id)}
                className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 ml-auto"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="ml-0 sm:ml-11">
            <label className="text-sm font-medium">Publication URL</label>
            <Input
              value={pub.url}
              onChange={(e) => {
                const updated = publications.map((item) =>
                  item.id === pub.id ? { ...item, url: e.target.value } : item,
                )
                setPublications(updated)
              }}
              placeholder="https://example.com/publication"
              className="mt-1"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

