import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Briefcase, Plus, X } from "lucide-react"

interface Experience {
  id: number
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  tags: string[]
}

export function EditExperienceForm() {
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: 1,
      title: "Senior AI Engineer",
      company: "TechAI Solutions",
      location: "San Francisco, CA",
      startDate: "2022-01",
      endDate: "",
      current: true,
      description:
        "Leading a team of 5 engineers to develop and deploy large language models for enterprise clients. Improved model performance by 35% and reduced inference time by 50%.",
      tags: ["LLMs", "Team Leadership", "MLOps"],
    },
    {
      id: 2,
      title: "AI Engineer",
      company: "DataMind Inc.",
      location: "Remote",
      startDate: "2020-03",
      endDate: "2021-12",
      current: false,
      description:
        "Developed NLP models for sentiment analysis and text classification. Created a recommendation system that increased user engagement by 28%.",
      tags: ["NLP", "Recommendation Systems", "Python"],
    },
    {
      id: 3,
      title: "Machine Learning Engineer",
      company: "InnoTech Solutions",
      location: "Boston, MA",
      startDate: "2018-06",
      endDate: "2020-02",
      current: false,
      description:
        "Built and deployed machine learning models for predictive analytics. Collaborated with data scientists to improve model accuracy by 25%.",
      tags: ["Machine Learning", "Data Analysis", "TensorFlow"],
    },
  ])

  const [newTag, setNewTag] = useState("")

  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      tags: [],
    }
    setExperiences([newExp, ...experiences])
  }

  const removeExperience = (id: number) => {
    setExperiences(experiences.filter((exp) => exp.id !== id))
  }

  const addTag = (experienceId: number) => {
    if (newTag.trim()) {
      const updated = experiences.map((exp) =>
        exp.id === experienceId ? { ...exp, tags: [...exp.tags, newTag] } : exp,
      )
      setExperiences(updated)
      setNewTag("")
    }
  }

  const removeTag = (experienceId: number, tag: string) => {
    const updated = experiences.map((exp) =>
      exp.id === experienceId ? { ...exp, tags: exp.tags.filter((t) => t !== tag) } : exp,
    )
    setExperiences(updated)
  }

  return (
    <div className="space-y-6">
      <Button
        onClick={addExperience}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Experience
      </Button>

      {experiences.map((exp) => (
        <div key={exp.id} className="rounded-lg border p-4">
          <div className="flex flex-col sm:flex-row justify-between mb-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Briefcase className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <Input
                  value={exp.title}
                  onChange={(e) => {
                    const updated = experiences.map((item) =>
                      item.id === exp.id ? { ...item, title: e.target.value } : item,
                    )
                    setExperiences(updated)
                  }}
                  placeholder="Job Title"
                  className="border-0 p-0 text-lg font-semibold h-7 focus-visible:ring-0"
                />
                <div className="flex flex-wrap items-center mt-1">
                  <div className="flex items-center mr-4 mb-2">
                    <Input
                      value={exp.company}
                      onChange={(e) => {
                        const updated = experiences.map((item) =>
                          item.id === exp.id ? { ...item, company: e.target.value } : item,
                        )
                        setExperiences(updated)
                      }}
                      placeholder="Company"
                      className="border-0 p-0 h-6 w-32 text-sm text-muted-foreground focus-visible:ring-0"
                    />
                  </div>
                  <div className="flex items-center mb-2">
                    <Input
                      value={exp.location}
                      onChange={(e) => {
                        const updated = experiences.map((item) =>
                          item.id === exp.id ? { ...item, location: e.target.value } : item,
                        )
                        setExperiences(updated)
                      }}
                      placeholder="Location"
                      className="border-0 p-0 h-6 w-32 text-sm text-muted-foreground focus-visible:ring-0"
                    />
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeExperience(exp.id)}
                className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 mt-2 sm:mt-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="ml-0 sm:ml-13 space-y-4">
            <div className="flex flex-wrap items-center mt-1">
              <div className="flex items-center mr-4 mb-2">
                <Input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => {
                    const updated = experiences.map((item) =>
                      item.id === exp.id ? { ...item, startDate: e.target.value } : item,
                    )
                    setExperiences(updated)
                  }}
                  placeholder="Start Date"
                  className="w-32 text-sm"
                />
              </div>
              {!exp.current && (
                <div className="flex items-center mb-2">
                  <span className="mx-1 text-muted-foreground">-</span>
                  <Input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => {
                      const updated = experiences.map((item) =>
                        item.id === exp.id ? { ...item, endDate: e.target.value } : item,
                      )
                      setExperiences(updated)
                    }}
                    placeholder="End Date"
                    className="w-32 text-sm"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id={`current-${exp.id}`}
                checked={exp.current}
                onCheckedChange={(checked) => {
                  const updated = experiences.map((item) =>
                    item.id === exp.id
                      ? { ...item, current: checked as boolean, endDate: checked ? "" : item.endDate }
                      : item,
                  )
                  setExperiences(updated)
                }}
              />
              <Label htmlFor={`current-${exp.id}`} className="text-sm">
                I currently work here
              </Label>
            </div>

            <Textarea
              value={exp.description}
              onChange={(e) => {
                const updated = experiences.map((item) =>
                  item.id === exp.id ? { ...item, description: e.target.value } : item,
                )
                setExperiences(updated)
              }}
              placeholder="Describe your responsibilities and achievements..."
              className="min-h-24 resize-none"
            />

            <div>
              <Label className="text-sm font-medium">Skills Used</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {exp.tags.map((tag, index) => (
                  <Badge key={index} className="flex items-center gap-1 bg-blue-100 text-blue-700 hover:bg-blue-200">
                    {tag}
                    <button onClick={() => removeTag(exp.id, tag)} className="ml-1 rounded-full hover:bg-blue-200">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                <div className="flex gap-2">
                  <Input
                    placeholder="Add skill"
                    className="h-7 w-32"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newTag.trim()) {
                        addTag(exp.id)
                        e.preventDefault()
                      }
                    }}
                  />
                  <Button size="sm" onClick={() => addTag(exp.id)} className="h-7">
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

