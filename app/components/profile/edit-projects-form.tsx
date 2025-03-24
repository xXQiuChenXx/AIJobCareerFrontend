import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, X } from "lucide-react"

interface Project {
  id: number
  name: string
  year: string
  description: string
  tags: string[]
}

export function EditProjectsForm() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: "AI-Powered Resume Analyzer",
      year: "2023",
      description: "Built an AI tool that analyzes resumes and provides personalized improvement suggestions.",
      tags: ["Python", "NLP", "GPT-4"],
    },
    {
      id: 2,
      name: "Sentiment Analysis API",
      year: "2022",
      description: "Developed a high-performance API for real-time sentiment analysis of customer feedback.",
      tags: ["FastAPI", "BERT", "Docker"],
    },
    {
      id: 3,
      name: "Job Market Trend Predictor",
      year: "2021",
      description:
        "Created a model to predict emerging job trends based on historical data and current market signals.",
      tags: ["Time Series", "PyTorch", "Data Visualization"],
    },
    {
      id: 4,
      name: "Multilingual Chatbot",
      year: "2020",
      description: "Built a chatbot that can understand and respond in 10 different languages for customer support.",
      tags: ["Transformers", "Flask", "AWS Lambda"],
    },
  ])

  const [newTag, setNewTag] = useState("")

  const addProject = () => {
    const newProj = {
      id: Date.now(),
      name: "",
      year: "",
      description: "",
      tags: [],
    }
    setProjects([newProj, ...projects])
  }

  const removeProject = (id: number) => {
    setProjects(projects.filter((proj) => proj.id !== id))
  }

  const addTag = (projectId: number) => {
    if (newTag.trim()) {
      const updated = projects.map((proj) => (proj.id === projectId ? { ...proj, tags: [...proj.tags, newTag] } : proj))
      setProjects(updated)
      setNewTag("")
    }
  }

  const removeTag = (projectId: number, tag: string) => {
    const updated = projects.map((proj) =>
      proj.id === projectId ? { ...proj, tags: proj.tags.filter((t) => t !== tag) } : proj,
    )
    setProjects(updated)
  }

  return (
    <div className="space-y-4">
      <Button
        onClick={addProject}
        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Project
      </Button>

      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <div key={project.id} className="rounded-lg border p-4">
            <div className="flex justify-between mb-2">
              <div className="flex-1">
                <Input
                  value={project.name}
                  onChange={(e) => {
                    const updated = projects.map((item) =>
                      item.id === project.id ? { ...item, name: e.target.value } : item,
                    )
                    setProjects(updated)
                  }}
                  placeholder="Project Name"
                  className="border-0 p-0 text-lg font-semibold h-7 focus-visible:ring-0"
                />
                <div className="flex items-center mt-1">
                  <Input
                    value={project.year}
                    onChange={(e) => {
                      const updated = projects.map((item) =>
                        item.id === project.id ? { ...item, year: e.target.value } : item,
                      )
                      setProjects(updated)
                    }}
                    placeholder="Year"
                    className="border-0 p-0 h-6 w-16 text-sm text-muted-foreground focus-visible:ring-0"
                  />
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeProject(project.id)}
                className="text-rose-500 hover:text-rose-600 hover:bg-rose-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <Textarea
              value={project.description}
              onChange={(e) => {
                const updated = projects.map((item) =>
                  item.id === project.id ? { ...item, description: e.target.value } : item,
                )
                setProjects(updated)
              }}
              placeholder="Describe your project, its purpose, and your role..."
              className="min-h-20 resize-none mt-2"
            />
            <div className="mt-4">
              <label className="text-sm font-medium">Technologies Used</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tags.map((tag, index) => (
                  <Badge key={index} className="flex items-center gap-1 bg-green-100 text-green-700 hover:bg-green-200">
                    {tag}
                    <button onClick={() => removeTag(project.id, tag)} className="ml-1 rounded-full hover:bg-green-200">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                <div className="flex gap-2">
                  <Input
                    placeholder="Add technology"
                    className="h-7 w-32"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newTag.trim()) {
                        addTag(project.id)
                        e.preventDefault()
                      }
                    }}
                  />
                  <Button size="sm" onClick={() => addTag(project.id)} className="h-7">
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

