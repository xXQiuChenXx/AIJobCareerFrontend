import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Settings, ExternalLink, Calendar, Users, MapPin, Clock, Briefcase, FileText } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import LocationAutocomplete from "../../components/company/location-autocomplete"
import AvatarUpload from "@/components/company/avatar-upload"
import SalaryRangeInput from "../../components/company/salary-range-input"

const LOCATIONS = [
  "Kuching",
  "Miri",
  "Sibu",
  "Bintulu",
  "Samarahan",
  "Sri Aman",
  "Kapit",
  "Limbang",
  "Sarikei",
  "Betong",
]

export default function CompanyProfile() {
  const [activeTab, setActiveTab] = useState("about")
  const [isEditingAbout, setIsEditingAbout] = useState(false)
  const [isAddingJob, setIsAddingJob] = useState(false)
  const [isEditingJob, setIsEditingJob] = useState(false)
  const [editingJobId, setEditingJobId] = useState<number | null>(null)
  const [avatarUrl, setAvatarUrl] = useState("/placeholder.svg?height=80&width=80")

  const [companyInfo, setCompanyInfo] = useState({
    name: "TechInnovate AI",
    tagline: "AI Solutions Provider",
    description:
      "TechInnovate AI is a leading artificial intelligence company focused on developing cutting-edge solutions for businesses across various industries. Our mission is to make AI accessible and beneficial for organizations of all sizes.",
    founded: "2018",
    size: "50-200 employees",
    location: "Kuching",
    website: "https://techinnovate.ai",
    specialties: ["Machine Learning", "Natural Language Processing", "Computer Vision", "Predictive Analytics"],
  })

  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior AI Engineer",
      department: "Engineering",
      location: "Kuching",
      posted: "Posted 2 days ago",
      salary: "$120,000 - $180,000",
      description:
        "We're looking for a Senior AI Engineer to join our team and help develop our next generation of AI products.",
      jobType: "Full-time",
      remote: true,
    },
    {
      id: 2,
      title: "Machine Learning Researcher",
      department: "Research",
      location: "Miri",
      posted: "Posted 1 week ago",
      salary: "$110,000 - $150,000",
      description:
        "Join our research team to push the boundaries of machine learning and develop innovative solutions.",
      jobType: "Full-time",
      remote: false,
    },
    {
      id: 3,
      title: "AI Product Manager",
      department: "Product",
      location: "Sibu",
      posted: "Posted 3 days ago",
      salary: "$100,000 - $130,000",
      description:
        "Lead the development of our AI products from conception to launch, working closely with engineering and design teams.",
      jobType: "Full-time",
      remote: true,
    },
  ])

  // Use separate state objects for editing to avoid direct binding
  const [newJob, setNewJob] = useState({
    title: "",
    department: "",
    location: "Kuching",
    salary: "",
    description: "",
    jobType: "Full-time",
    remote: false,
  })

  const [editedCompanyInfo, setEditedCompanyInfo] = useState({ ...companyInfo })
  const [editedJob, setEditedJob] = useState({
    id: 0,
    title: "",
    department: "",
    location: "Kuching",
    salary: "",
    description: "",
    jobType: "Full-time",
    remote: false,
  })

  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
  const [jobToDelete, setJobToDelete] = useState<number | null>(null)

  const handleSaveCompanyInfo = () => {
    setCompanyInfo({ ...editedCompanyInfo })
    setIsEditingAbout(false)
  }

  const handleAddJob = () => {
    const newJobWithId = {
      id: jobs.length > 0 ? Math.max(...jobs.map((job) => job.id)) + 1 : 1,
      ...newJob,
      posted: `Posted just now`,
    }
    setJobs([...jobs, newJobWithId])
    setIsAddingJob(false)
    setNewJob({
      title: "",
      department: "",
      location: "Kuching",
      salary: "",
      description: "",
      jobType: "Full-time",
      remote: false,
    })
  }

  const handleEditJob = (jobId: number) => {
    const jobToEdit = jobs.find((job) => job.id === jobId)
    if (jobToEdit) {
      // Create a new object to avoid reference issues
      setEditedJob({ ...jobToEdit })
      setEditingJobId(jobId)
      setIsEditingJob(true)
    }
  }

  const handleSaveEditedJob = () => {
    setJobs(jobs);
    setIsEditingJob(false)
    setEditingJobId(null)
  }

  const handleDeleteJob = (jobId: number) => {
    // 设置要删除的职位ID并打开确认对话框
    setJobToDelete(jobId)
    setIsConfirmingDelete(true)
  }

  const confirmDeleteJob = () => {
    if (jobToDelete !== null) {
      // 过滤掉要删除的职位
      setJobs(jobs.filter((job) => job.id !== jobToDelete))
      // 关闭确认对话框并重置jobToDelete
      setIsConfirmingDelete(false)
      setJobToDelete(null)
    }
  }

  const cancelDeleteJob = () => {
    setIsConfirmingDelete(false)
    setJobToDelete(null)
  }

  const handleAvatarChange = (newAvatarUrl: string) => {
    setAvatarUrl(newAvatarUrl)
  }

  // Reset edit forms when dialogs close
  const handleEditDialogOpenChange = (open: boolean) => {
    setIsEditingAbout(open)
    if (open) {
      setEditedCompanyInfo({ ...companyInfo })
    }
  }

  const handleAddJobDialogOpenChange = (open: boolean) => {
    setIsAddingJob(open)
    if (open) {
      setNewJob({
        title: "",
        department: "",
        location: "Kuching",
        salary: "",
        description: "",
        jobType: "Full-time",
        remote: false,
      })
    }
  }

  const handleEditJobDialogOpenChange = (open: boolean) => {
    setIsEditingJob(open)
    if (!open) {
      setEditingJobId(null)
    }
  }

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto py-6 px-4 md:px-6 mb-12">
        {/* Header with padding */}
        <div className="w-full bg-white p-4">
          <div className="w-full bg-gradient-to-r from-blue-500 to-pink-500 p-6 relative rounded-lg h-52">
            <div className="absolute top-4 right-4">
              <Button variant="secondary" size="sm" onClick={() => setIsEditingAbout(true)}>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
            {/* Text positioned to the right of the avatar */}
            <div className="absolute bottom-6 left-48 text-white">
              <h1 className="text-4xl font-bold">{companyInfo.name}</h1>
              <p className="text-base mt-1">{companyInfo.tagline}</p>
            </div>
            {/* Avatar positioned to extend 25% outside the background */}
            <div className="absolute bottom-0 left-10 transform translate-y-1/4">
              <div className="w-32 h-32 rounded-full bg-white p-1 border-2 border-white shadow-lg">
                <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={avatarUrl || "/placeholder.svg"}
                    alt="Company Logo"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Tabs - aligned with the colored background */}
        <div className="w-full px-4 mt-12">
          <Tabs defaultValue="about" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="jobs">Job Openings</TabsTrigger>
            </TabsList>
            {/* About Tab */}
            <TabsContent value="about" className="mt-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4">About</h2>
                <p className="text-gray-700 mb-6">{companyInfo.description}</p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <Button variant="outline" className="gap-2" onClick={() => window.open(companyInfo.website, "_blank")}>
                    <ExternalLink className="h-4 w-4" />
                    Visit Website
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Founded</h3>
                      <p>{companyInfo.founded}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Users className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Company Size</h3>
                      <p>{companyInfo.size}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Location</h3>
                      <p>{companyInfo.location}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="font-medium mb-3">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {companyInfo.specialties.map((specialty, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            {/* Jobs Tab */}
            <TabsContent value="jobs" className="mt-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Open Positions at {companyInfo.name}</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{jobs.length} jobs available</span>
                    <Button onClick={() => setIsAddingJob(true)}>Post</Button>
                  </div>
                </div>
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-6">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold">{job.title}</h3>
                        <div className="text-lg font-semibold">{job.salary}</div>
                      </div>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span>{job.department}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Briefcase className="h-4 w-4 text-gray-500" />
                          <span>{job.jobType}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>{job.location}</span>
                        </div>
                        {job.remote && (
                          <div className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-sm">Remote</div>
                        )}
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>{job.posted}</span>
                        </div>
                      </div>
                      <p className="mt-4 mb-6 text-gray-700">{job.description}</p>
                      <div className="flex justify-end gap-2">
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteJob(job.id)}>
                          Delete Post
                        </Button>
                        <Button variant="outline" onClick={() => handleEditJob(job.id)}>
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        {/* Edit Company Info Dialog */}
        <Dialog open={isEditingAbout} onOpenChange={handleEditDialogOpenChange}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Company Information</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <AvatarUpload currentAvatar={avatarUrl} onAvatarChange={handleAvatarChange} />
              <div className="grid gap-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input
                  id="company-name"
                  value={editedCompanyInfo.name}
                  onChange={(e) =>
                    setEditedCompanyInfo({
                      ...editedCompanyInfo,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  value={editedCompanyInfo.tagline}
                  onChange={(e) =>
                    setEditedCompanyInfo({
                      ...editedCompanyInfo,
                      tagline: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="website">Website URL</Label>
                <Input
                  id="website"
                  value={editedCompanyInfo.website}
                  onChange={(e) =>
                    setEditedCompanyInfo({
                      ...editedCompanyInfo,
                      website: e.target.value,
                    })
                  }
                  placeholder="https://example.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editedCompanyInfo.description}
                  onChange={(e) =>
                    setEditedCompanyInfo({
                      ...editedCompanyInfo,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="founded">Founded</Label>
                  <Input
                    id="founded"
                    value={editedCompanyInfo.founded}
                    onChange={(e) =>
                      setEditedCompanyInfo({
                        ...editedCompanyInfo,
                        founded: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="size">Company Size</Label>
                  <Input
                    id="size"
                    value={editedCompanyInfo.size}
                    onChange={(e) =>
                      setEditedCompanyInfo({
                        ...editedCompanyInfo,
                        size: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <LocationAutocomplete
                id="company-location"
                label="Location"
                value={editedCompanyInfo.location}
                onChange={(value) =>
                  setEditedCompanyInfo({
                    ...editedCompanyInfo,
                    location: value,
                  })
                }
                locations={LOCATIONS}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditingAbout(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveCompanyInfo}>Save Changes</Button>
            </div>
          </DialogContent>
        </Dialog>
        {/* Add Job Dialog */}
        <Dialog open={isAddingJob} onOpenChange={handleAddJobDialogOpenChange}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Post New Job</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="job-title">Job Title</Label>
                <Input
                  id="job-title"
                  value={newJob.title}
                  onChange={(e) =>
                    setNewJob({
                      ...newJob,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={newJob.department}
                  onChange={(e) =>
                    setNewJob({
                      ...newJob,
                      department: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="job-type">Job Type</Label>
                <select
                  id="job-type"
                  value={newJob.jobType}
                  onChange={(e) =>
                    setNewJob({
                      ...newJob,
                      jobType: e.target.value,
                    })
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remote"
                  checked={newJob.remote}
                  onChange={(e) =>
                    setNewJob({
                      ...newJob,
                      remote: e.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="remote">Remote Position</Label>
              </div>
              <LocationAutocomplete
                id="job-location"
                label="Location"
                value={newJob.location}
                onChange={(value) =>
                  setNewJob({
                    ...newJob,
                    location: value,
                  })
                }
                locations={LOCATIONS}
              />
              <SalaryRangeInput
                id="salary"
                label="Salary Range"
                value={newJob.salary}
                onChange={(value) =>
                  setNewJob({
                    ...newJob,
                    salary: value,
                  })
                }
              />
              <div className="grid gap-2">
                <Label htmlFor="job-description">Job Description</Label>
                <Textarea
                  id="job-description"
                  value={newJob.description}
                  onChange={(e) =>
                    setNewJob({
                      ...newJob,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddingJob(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddJob}>Post Job</Button>
            </div>
          </DialogContent>
        </Dialog>
        {/* Edit Job Dialog */}
        <Dialog open={isEditingJob} onOpenChange={handleEditJobDialogOpenChange}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Job</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-job-title">Job Title</Label>
                <Input
                  id="edit-job-title"
                  value={editedJob.title}
                  onChange={(e) =>
                    setEditedJob({
                      ...editedJob,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-department">Department</Label>
                <Input
                  id="edit-department"
                  value={editedJob.department}
                  onChange={(e) =>
                    setEditedJob({
                      ...editedJob,
                      department: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-job-type">Job Type</Label>
                <select
                  id="edit-job-type"
                  value={editedJob.jobType}
                  onChange={(e) =>
                    setEditedJob({
                      ...editedJob,
                      jobType: e.target.value,
                    })
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="edit-remote"
                  checked={editedJob.remote}
                  onChange={(e) =>
                    setEditedJob({
                      ...editedJob,
                      remote: e.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="edit-remote">Remote Position</Label>
              </div>
              <LocationAutocomplete
                id="edit-job-location"
                label="Location"
                value={editedJob.location}
                onChange={(value) =>
                  setEditedJob({
                    ...editedJob,
                    location: value,
                  })
                }
                locations={LOCATIONS}
              />
              <SalaryRangeInput
                id="edit-salary"
                label="Salary Range"
                value={editedJob.salary}
                onChange={(value) =>
                  setEditedJob({
                    ...editedJob,
                    salary: value,
                  })
                }
              />
              <div className="grid gap-2">
                <Label htmlFor="edit-job-description">Job Description</Label>
                <Textarea
                  id="edit-job-description"
                  value={editedJob.description}
                  onChange={(e) =>
                    setEditedJob({
                      ...editedJob,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditingJob(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEditedJob}>Save Changes</Button>
            </div>
          </DialogContent>
        </Dialog>
        {/* Delete Confirmation Dialog */}
        <Dialog open={isConfirmingDelete} onOpenChange={setIsConfirmingDelete}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>Are you sure you want to delete this job posting? This action cannot be undone.</p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={cancelDeleteJob}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDeleteJob}>
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

