import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { GraduationCap, Plus, Star, Trash2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Education {
  id: number
  degree: string
  school: string
  startYear: string
  endYear: string
  description: string
}

interface Certification {
  id: number
  name: string
  issuer: string
  date: string
}

export function EditEducationForm() {
  const [education, setEducation] = useState<Education[]>([
    {
      id: 1,
      degree: "Master of Science in Computer Science",
      school: "Stanford University",
      startYear: "2016",
      endYear: "2018",
      description:
        'Specialized in Artificial Intelligence and Machine Learning. Thesis: "Improving Transformer Models for Low-Resource Languages"',
    },
    {
      id: 2,
      degree: "Bachelor of Science in Computer Engineering",
      school: "Massachusetts Institute of Technology",
      startYear: "2012",
      endYear: "2016",
      description:
        'Minor in Mathematics. Graduated with honors. Senior Project: "Neural Networks for Image Recognition"',
    },
  ])

  const [certifications, setCertifications] = useState<Certification[]>([
    {
      id: 1,
      name: "AWS Certified Machine Learning - Specialty",
      issuer: "Amazon Web Services",
      date: "2023-01",
    },
    {
      id: 2,
      name: "TensorFlow Developer Certificate",
      issuer: "Google",
      date: "2021-03",
    },
    {
      id: 3,
      name: "Deep Learning Specialization",
      issuer: "Coursera",
      date: "2019-11",
    },
  ])

  const addEducation = () => {
    const newEdu = {
      id: Date.now(),
      degree: "",
      school: "",
      startYear: "",
      endYear: "",
      description: "",
    }
    setEducation([newEdu, ...education])
  }

  const removeEducation = (id: number) => {
    setEducation(education.filter((edu) => edu.id !== id))
  }

  const addCertification = () => {
    const newCert = {
      id: Date.now(),
      name: "",
      issuer: "",
      date: "",
    }
    setCertifications([newCert, ...certifications])
  }

  const removeCertification = (id: number) => {
    setCertifications(certifications.filter((cert) => cert.id !== id))
  }

  return (
    <Tabs defaultValue="education" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="education">Degrees & Education</TabsTrigger>
        <TabsTrigger value="certifications">Certifications</TabsTrigger>
      </TabsList>

      <TabsContent value="education" className="space-y-4 pt-4">
        <Button
          onClick={addEducation}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Education
        </Button>

        {education.map((edu) => (
          <div key={edu.id} className="rounded-lg border p-4">
            <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                  <GraduationCap className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <Input
                    value={edu.degree}
                    onChange={(e) => {
                      const updated = education.map((item) =>
                        item.id === edu.id ? { ...item, degree: e.target.value } : item,
                      )
                      setEducation(updated)
                    }}
                    placeholder="Degree"
                    className="border-0 p-0 text-lg font-semibold h-7 focus-visible:ring-0"
                  />
                  <div className="flex flex-wrap gap-2 mt-1">
                    <div className="flex items-center">
                      <Input
                        value={edu.school}
                        onChange={(e) => {
                          const updated = education.map((item) =>
                            item.id === edu.id ? { ...item, school: e.target.value } : item,
                          )
                          setEducation(updated)
                        }}
                        placeholder="School"
                        className="border-0 p-0 h-6 w-40 text-sm text-muted-foreground focus-visible:ring-0"
                      />
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeEducation(edu.id)}
                  className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 ml-auto"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="ml-0 sm:ml-13 space-y-4">
              <div className="flex items-center gap-2">
                <Input
                  value={edu.startYear}
                  onChange={(e) => {
                    const updated = education.map((item) =>
                      item.id === edu.id ? { ...item, startYear: e.target.value } : item,
                    )
                    setEducation(updated)
                  }}
                  placeholder="Start Year"
                  className="w-20 text-sm"
                />
                <span className="mx-1 text-muted-foreground">-</span>
                <Input
                  value={edu.endYear}
                  onChange={(e) => {
                    const updated = education.map((item) =>
                      item.id === edu.id ? { ...item, endYear: e.target.value } : item,
                    )
                    setEducation(updated)
                  }}
                  placeholder="End Year"
                  className="w-20 text-sm"
                />
              </div>
              <Textarea
                value={edu.description}
                onChange={(e) => {
                  const updated = education.map((item) =>
                    item.id === edu.id ? { ...item, description: e.target.value } : item,
                  )
                  setEducation(updated)
                }}
                placeholder="Describe your studies, achievements, thesis, etc."
                className="min-h-20 resize-none"
              />
            </div>
          </div>
        ))}
      </TabsContent>

      <TabsContent value="certifications" className="space-y-4 pt-4">
        <Button
          onClick={addCertification}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Certification
        </Button>

        {certifications.map((cert) => (
          <div key={cert.id} className="rounded-lg border p-4">
            <div className="flex justify-between mb-2">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                  <Star className="h-4 w-4 text-amber-600" />
                </div>
                <div className="flex-1">
                  <Input
                    value={cert.name}
                    onChange={(e) => {
                      const updated = certifications.map((item) =>
                        item.id === cert.id ? { ...item, name: e.target.value } : item,
                      )
                      setCertifications(updated)
                    }}
                    placeholder="Certification Name"
                    className="border-0 p-0 text-base font-medium h-7 focus-visible:ring-0"
                  />
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <Input
                      value={cert.issuer}
                      onChange={(e) => {
                        const updated = certifications.map((item) =>
                          item.id === cert.id ? { ...item, issuer: e.target.value } : item,
                        )
                        setCertifications(updated)
                      }}
                      placeholder="Issuing Organization"
                      className="border-0 p-0 h-6 text-sm text-muted-foreground focus-visible:ring-0"
                    />
                    <div className="flex items-center">
                      <span className="text-muted-foreground">·</span>
                      <Input
                        type="month"
                        value={cert.date}
                        onChange={(e) => {
                          const updated = certifications.map((item) =>
                            item.id === cert.id ? { ...item, date: e.target.value } : item,
                          )
                          setCertifications(updated)
                        }}
                        placeholder="Issue Date"
                        className="border-0 p-0 h-6 w-32 text-sm text-muted-foreground focus-visible:ring-0"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeCertification(cert.id)}
                className="text-rose-500 hover:text-rose-600 hover:bg-rose-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </TabsContent>
    </Tabs>
  )
}

