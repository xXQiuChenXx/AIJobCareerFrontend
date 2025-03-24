import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"

// Define the skill proficiency levels
type ProficiencyLevel = "beginner" | "intermediate" | "proficient" | "advanced" | "expert"

interface Skill {
  id: number
  name: string
  level: ProficiencyLevel
}

// Helper function to get a human-readable label for the level
const getLevelLabel = (level: ProficiencyLevel): string => {
  return level.charAt(0).toUpperCase() + level.slice(1)
}

// Helper function to get percentage equivalent for progress bars
const getLevelPercentage = (level: ProficiencyLevel): number => {
  const percentages: Record<ProficiencyLevel, number> = {
    beginner: 20,
    intermediate: 40,
    proficient: 60,
    advanced: 80,
    expert: 100,
  }
  return percentages[level]
}

export function EditSkillsForm() {
  const [skills, setSkills] = useState<Skill[]>([
    { id: 1, name: "Machine Learning", level: "expert" },
    { id: 2, name: "Natural Language Processing", level: "expert" },
    { id: 3, name: "Python", level: "expert" },
    { id: 4, name: "TensorFlow/PyTorch", level: "advanced" },
    { id: 5, name: "Computer Vision", level: "proficient" },
  ])

  const [skillTags, setSkillTags] = useState([
    "Deep Learning",
    "GPT Models",
    "Data Science",
    "Neural Networks",
    "Transformers",
    "Scikit-learn",
    "Pandas",
    "Docker",
    "Kubernetes",
    "AWS",
  ])

  const [newSkill, setNewSkill] = useState("")
  const [newSkillLevel, setNewSkillLevel] = useState<ProficiencyLevel>("intermediate")
  const [newTag, setNewTag] = useState("")

  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, { id: Date.now(), name: newSkill, level: newSkillLevel }])
      setNewSkill("")
      setNewSkillLevel("intermediate")
    }
  }

  const removeSkill = (id: number) => {
    setSkills(skills.filter((skill) => skill.id !== id))
  }

  const addTag = () => {
    if (newTag.trim() && !skillTags.includes(newTag)) {
      setSkillTags([...skillTags, newTag])
      setNewTag("")
    }
  }

  const removeTag = (tag: string) => {
    setSkillTags(skillTags.filter((t) => t !== tag))
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Skill Proficiency</h3>
        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.id} className="flex items-center gap-4">
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-sm text-muted-foreground">{getLevelLabel(skill.level)}</span>
                </div>
                <Select
                  defaultValue={skill.level}
                  onValueChange={(value: ProficiencyLevel) => {
                    const updated = skills.map((s) =>
                      s.id === skill.id ? { ...s, level: value as ProficiencyLevel } : s,
                    )
                    setSkills(updated)
                  }}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="proficient">Proficient</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeSkill(skill.id)}
                className="text-rose-500 hover:text-rose-600 hover:bg-rose-50"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="Add a new skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="flex-1"
          />
          <div className="flex gap-2 mt-2 sm:mt-0">
            <Select defaultValue={newSkillLevel} onValueChange={(value) => setNewSkillLevel(value as ProficiencyLevel)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="proficient">Proficient</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
            <Button
              type="button"
              onClick={addSkill}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              Add
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-lg font-medium mb-4">Skill Tags</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {skillTags.map((tag) => (
            <Badge
              key={tag}
              className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            >
              {tag}
              <button onClick={() => removeTag(tag)} className="ml-1 rounded-full hover:bg-white/20">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="Add a new tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="flex-1"
          />
          <Button
            type="button"
            onClick={addTag}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}

