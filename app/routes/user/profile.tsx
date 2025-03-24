import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Briefcase,
  Building2,
  Calendar,
  Edit,
  Eye,
  EyeOff,
  FileText,
  GraduationCap,
  Lock,
  MapPin,
  MessageSquare,
  Share2,
  ShieldAlert,
  Star,
  ThumbsUp,
  Users,
} from "lucide-react"
import { NavLink } from "react-router"

// This would typically come from a database or API
const profileData = {
  isPrivate: false,
  showEmail: true,
  showConnections: true,
}

export default function ProfilePage() {
  const isPrivate = profileData.isPrivate
  const showEmail = !isPrivate && profileData.showEmail
  const showConnections = !isPrivate && profileData.showConnections

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      {isPrivate && (
        <Alert className="mb-6 border-amber-500 bg-amber-50 text-amber-800">
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>Private Account</AlertTitle>
          <AlertDescription>
            Your profile is currently set to private. Only you can see all your information.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* Main Content */}
        <div className="space-y-6">
          {/* Profile Header */}
          <div className="relative">
            <div className="h-40 w-full rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            <div className="absolute -bottom-12 left-4 flex items-end space-x-4">
              <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Sarah Johnson" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div className="mb-2 hidden md:block">
                <h1 className="text-2xl font-bold text-white drop-shadow-md">Sarah Johnson</h1>
                <p className="text-white/90 drop-shadow-md">Senior AI Engineer</p>
              </div>
            </div>
            <div className="absolute right-4 top-4 flex space-x-2">
              <Button size="sm" variant="outline" className="bg-white/20 backdrop-blur-sm">
                <MessageSquare className="mr-2 h-4 w-4" />
                Message
              </Button>
              <Button size="sm" variant="outline" className="bg-white/20 backdrop-blur-sm">
                <Share2 className="h-4 w-4" />
              </Button>
              {isPrivate && (
                <Button size="sm" variant="outline" className="bg-white/20 backdrop-blur-sm">
                  <Lock className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Profile Info */}
          <div className="md:hidden pt-14 pb-2 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Sarah Johnson</h1>
              <p className="text-muted-foreground">Senior AI Engineer</p>
            </div>
            {isPrivate && (
              <Badge variant="outline" className="gap-1 text-amber-600 border-amber-300 bg-amber-50">
                <Lock className="h-3 w-3" />
                Private
              </Badge>
            )}
          </div>

          {/* Profile Tabs */}
          <Tabs defaultValue="about" className="pt-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="space-y-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span>About Me</span>
                      {isPrivate && (
                        <Badge variant="outline" className="ml-2 gap-1 text-amber-600 border-amber-200 bg-amber-50">
                          <EyeOff className="h-3 w-3" />
                          Private
                        </Badge>
                      )}
                    </div>
                    <Button variant="ghost" size="icon" asChild>
                      <NavLink to="/profile/edit">
                        <Edit className="h-4 w-4" />
                      </NavLink>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isPrivate ? (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <div className="mb-4 rounded-full bg-amber-100 p-3">
                        <Lock className="h-6 w-6 text-amber-600" />
                      </div>
                      <h3 className="text-lg font-medium">This information is private</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        The account owner has set this profile to private.
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className="text-muted-foreground">
                        Experienced AI Engineer with 7+ years specializing in machine learning models and natural
                        language processing. Passionate about developing AI solutions that solve real-world problems and
                        improve user experiences. Currently focused on large language models and their applications in
                        career development.
                      </p>
                      <div className="mt-6 grid gap-4 md:grid-cols-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>San Francisco, CA</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <span>TechAI Solutions</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{showConnections ? "500+ connections" : "Connections hidden"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Joined January 2020</span>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span>Skills</span>
                      {isPrivate && (
                        <Badge variant="outline" className="ml-2 gap-1 text-amber-600 border-amber-200 bg-amber-50">
                          <EyeOff className="h-3 w-3" />
                          Private
                        </Badge>
                      )}
                    </div>
                    <Button variant="ghost" size="icon" asChild>
                      <NavLink to="/profile/edit">
                        <Edit className="h-4 w-4" />
                      </NavLink>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isPrivate ? (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <div className="mb-4 rounded-full bg-amber-100 p-3">
                        <Lock className="h-6 w-6 text-amber-600" />
                      </div>
                      <h3 className="text-lg font-medium">Skills are private</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        The account owner has set this profile to private.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">Machine Learning</span>
                            <span className="text-sm text-muted-foreground">Expert</span>
                          </div>
                          <Progress value={95} className="h-2 bg-blue-100"  />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">Natural Language Processing</span>
                            <span className="text-sm text-muted-foreground">Expert</span>
                          </div>
                          <Progress value={90} className="h-2 bg-purple-100" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">Python</span>
                            <span className="text-sm text-muted-foreground">Expert</span>
                          </div>
                          <Progress value={95} className="h-2 bg-green-100"  />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">TensorFlow/PyTorch</span>
                            <span className="text-sm text-muted-foreground">Advanced</span>
                          </div>
                          <Progress value={85} className="h-2 bg-amber-100" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">Computer Vision</span>
                            <span className="text-sm text-muted-foreground">Intermediate</span>
                          </div>
                          <Progress value={75} className="h-2 bg-rose-100" />
                        </div>
                      </div>
                      <div className="mt-6 flex flex-wrap gap-2">
                        <Badge className="bg-blue-500 hover:bg-blue-600">Deep Learning</Badge>
                        <Badge className="bg-purple-500 hover:bg-purple-600">GPT Models</Badge>
                        <Badge className="bg-green-500 hover:bg-green-600">Data Science</Badge>
                        <Badge className="bg-amber-500 hover:bg-amber-600">Neural Networks</Badge>
                        <Badge className="bg-rose-500 hover:bg-rose-600">Transformers</Badge>
                        <Badge className="bg-cyan-500 hover:bg-cyan-600">Scikit-learn</Badge>
                        <Badge className="bg-indigo-500 hover:bg-indigo-600">Pandas</Badge>
                        <Badge className="bg-emerald-500 hover:bg-emerald-600">Docker</Badge>
                        <Badge className="bg-orange-500 hover:bg-orange-600">Kubernetes</Badge>
                        <Badge className="bg-violet-500 hover:bg-violet-600">AWS</Badge>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience" className="space-y-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span>Work Experience</span>
                      {isPrivate && (
                        <Badge variant="outline" className="ml-2 gap-1 text-amber-600 border-amber-200 bg-amber-50">
                          <EyeOff className="h-3 w-3" />
                          Private
                        </Badge>
                      )}
                    </div>
                    <Button variant="ghost" size="icon" asChild>
                      <NavLink to="/profile/edit">
                        <Edit className="h-4 w-4" />
                      </NavLink>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isPrivate ? (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <div className="mb-4 rounded-full bg-amber-100 p-3">
                        <Lock className="h-6 w-6 text-amber-600" />
                      </div>
                      <h3 className="text-lg font-medium">Work history is private</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        The account owner has set this profile to private.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Experience Item */}
                      <div className="flex gap-4">
                        <div className="mt-1 flex-shrink-0">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                            <Briefcase className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-semibold">Senior AI Engineer</h3>
                          <div className="text-sm text-muted-foreground">TechAI Solutions</div>
                          <div className="text-sm text-muted-foreground">Jan 2022 - Present · San Francisco, CA</div>
                          <p className="mt-2 text-sm">
                            Leading a team of 5 engineers to develop and deploy large language models for enterprise
                            clients. Improved model performance by 35% and reduced inference time by 50%.
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <Badge variant="outline">LLMs</Badge>
                            <Badge variant="outline">Team Leadership</Badge>
                            <Badge variant="outline">MLOps</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="mt-1 flex-shrink-0">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                            <Briefcase className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-semibold">AI Engineer</h3>
                          <div className="text-sm text-muted-foreground">DataMind Inc.</div>
                          <div className="text-sm text-muted-foreground">Mar 2020 - Dec 2021 · Remote</div>
                          <p className="mt-2 text-sm">
                            Developed NLP models for sentiment analysis and text classification. Created a
                            recommendation system that increased user engagement by 28%.
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <Badge variant="outline">NLP</Badge>
                            <Badge variant="outline">Recommendation Systems</Badge>
                            <Badge variant="outline">Python</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="mt-1 flex-shrink-0">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                            <Briefcase className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-semibold">Machine Learning Engineer</h3>
                          <div className="text-sm text-muted-foreground">InnoTech Solutions</div>
                          <div className="text-sm text-muted-foreground">Jun 2018 - Feb 2020 · Boston, MA</div>
                          <p className="mt-2 text-sm">
                            Built and deployed machine learning models for predictive analytics. Collaborated with data
                            scientists to improve model accuracy by 25%.
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <Badge variant="outline">Machine Learning</Badge>
                            <Badge variant="outline">Data Analysis</Badge>
                            <Badge variant="outline">TensorFlow</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education" className="space-y-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span>Education</span>
                      {isPrivate && (
                        <Badge variant="outline" className="ml-2 gap-1 text-amber-600 border-amber-200 bg-amber-50">
                          <EyeOff className="h-3 w-3" />
                          Private
                        </Badge>
                      )}
                    </div>
                    <Button variant="ghost" size="icon" asChild>
                      <NavLink to="/profile/edit">
                        <Edit className="h-4 w-4" />
                      </NavLink>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isPrivate ? (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <div className="mb-4 rounded-full bg-amber-100 p-3">
                        <Lock className="h-6 w-6 text-amber-600" />
                      </div>
                      <h3 className="text-lg font-medium">Education is private</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        The account owner has set this profile to private.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Education Item */}
                      <div className="flex gap-4">
                        <div className="mt-1 flex-shrink-0">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                            <GraduationCap className="h-5 w-5 text-purple-600" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-semibold">Master of Science in Computer Science</h3>
                          <div className="text-sm text-muted-foreground">Stanford University</div>
                          <div className="text-sm text-muted-foreground">2016 - 2018</div>
                          <p className="mt-2 text-sm">
                            Specialized in Artificial Intelligence and Machine Learning. Thesis: "Improving Transformer
                            Models for Low-Resource Languages"
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="mt-1 flex-shrink-0">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                            <GraduationCap className="h-5 w-5 text-purple-600" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-semibold">Bachelor of Science in Computer Engineering</h3>
                          <div className="text-sm text-muted-foreground">Massachusetts Institute of Technology</div>
                          <div className="text-sm text-muted-foreground">2012 - 2016</div>
                          <p className="mt-2 text-sm">
                            Minor in Mathematics. Graduated with honors. Senior Project: "Neural Networks for Image
                            Recognition"
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span>Certifications</span>
                      {isPrivate && (
                        <Badge variant="outline" className="ml-2 gap-1 text-amber-600 border-amber-200 bg-amber-50">
                          <EyeOff className="h-3 w-3" />
                          Private
                        </Badge>
                      )}
                    </div>
                    <Button variant="ghost" size="icon" asChild>
                      <NavLink to="/profile/edit">
                        <Edit className="h-4 w-4" />
                      </NavLink>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isPrivate ? (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <div className="mb-4 rounded-full bg-amber-100 p-3">
                        <Lock className="h-6 w-6 text-amber-600" />
                      </div>
                      <h3 className="text-lg font-medium">Certifications are private</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        The account owner has set this profile to private.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="mt-1 flex-shrink-0">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                            <Star className="h-4 w-4 text-amber-600" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium">AWS Certified Machine Learning - Specialty</h3>
                          <div className="text-sm text-muted-foreground">Amazon Web Services · Issued Jan 2023</div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="mt-1 flex-shrink-0">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                            <Star className="h-4 w-4 text-amber-600" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium">TensorFlow Developer Certificate</h3>
                          <div className="text-sm text-muted-foreground">Google · Issued Mar 2021</div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="mt-1 flex-shrink-0">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                            <Star className="h-4 w-4 text-amber-600" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium">Deep Learning Specialization</h3>
                          <div className="text-sm text-muted-foreground">Coursera · Issued Nov 2019</div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="portfolio" className="space-y-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span>Projects</span>
                      {isPrivate && (
                        <Badge variant="outline" className="ml-2 gap-1 text-amber-600 border-amber-200 bg-amber-50">
                          <EyeOff className="h-3 w-3" />
                          Private
                        </Badge>
                      )}
                    </div>
                    <Button variant="ghost" size="icon" asChild>
                      <NavLink to="/profile/edit">
                        <Edit className="h-4 w-4" />
                      </NavLink>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isPrivate ? (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <div className="mb-4 rounded-full bg-amber-100 p-3">
                        <Lock className="h-6 w-6 text-amber-600" />
                      </div>
                      <h3 className="text-lg font-medium">Projects are private</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        The account owner has set this profile to private.
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-6 sm:grid-cols-2">
                      {/* Project Card */}
                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-base">AI-Powered Resume Analyzer</CardTitle>
                          <CardDescription>2023</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm text-muted-foreground">
                            Built an AI tool that analyzes resumes and provides personalized improvement suggestions.
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <Badge variant="outline">Python</Badge>
                            <Badge variant="outline">NLP</Badge>
                            <Badge variant="outline">GPT-4</Badge>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-base">Sentiment Analysis API</CardTitle>
                          <CardDescription>2022</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm text-muted-foreground">
                            Developed a high-performance API for real-time sentiment analysis of customer feedback.
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <Badge variant="outline">FastAPI</Badge>
                            <Badge variant="outline">BERT</Badge>
                            <Badge variant="outline">Docker</Badge>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-base">Job Market Trend Predictor</CardTitle>
                          <CardDescription>2021</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm text-muted-foreground">
                            Created a model to predict emerging job trends based on historical data and current market
                            signals.
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <Badge variant="outline">Time Series</Badge>
                            <Badge variant="outline">PyTorch</Badge>
                            <Badge variant="outline">Data Visualization</Badge>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-base">Multilingual Chatbot</CardTitle>
                          <CardDescription>2020</CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm text-muted-foreground">
                            Built a chatbot that can understand and respond in 10 different languages for customer
                            support.
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <Badge variant="outline">Transformers</Badge>
                            <Badge variant="outline">Flask</Badge>
                            <Badge variant="outline">AWS Lambda</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span>Publications</span>
                      {isPrivate && (
                        <Badge variant="outline" className="ml-2 gap-1 text-amber-600 border-amber-200 bg-amber-50">
                          <EyeOff className="h-3 w-3" />
                          Private
                        </Badge>
                      )}
                    </div>
                    <Button variant="ghost" size="icon" asChild>
                      <NavLink to="/profile/edit">
                        <Edit className="h-4 w-4" />
                      </NavLink>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isPrivate ? (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <div className="mb-4 rounded-full bg-amber-100 p-3">
                        <Lock className="h-6 w-6 text-amber-600" />
                      </div>
                      <h3 className="text-lg font-medium">Publications are private</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        The account owner has set this profile to private.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="mt-1 flex-shrink-0">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                            <FileText className="h-4 w-4 text-emerald-600" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium">Improving Few-Shot Learning in LLMs for Technical Domains</h3>
                          <div className="text-sm text-muted-foreground">
                            International Conference on Machine Learning · 2023
                          </div>
                          <NavLink to="#" className="mt-1 inline-block text-sm text-primary hover:underline">
                            View publication
                          </NavLink>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="mt-1 flex-shrink-0">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                            <FileText className="h-4 w-4 text-emerald-600" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium">Efficient Transformers for Resource-Constrained Environments</h3>
                          <div className="text-sm text-muted-foreground">
                            Neural Information Processing Systems · 2021
                          </div>
                          <NavLink to="#" className="mt-1 inline-block text-sm text-primary hover:underline">
                            View publication
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Profile Completion</span>
                {isPrivate && (
                  <Badge variant="outline" className="gap-1 text-amber-600 border-amber-200 bg-amber-50">
                    <Eye className="h-3 w-3" />
                    Only You
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">85% Complete</span>
                    <span className="text-sm text-muted-foreground">85/100</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                      <span className="text-sm">Basic Info</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Complete</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                      <span className="text-sm">Work Experience</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Complete</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                      <span className="text-sm">Education</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Complete</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                      <span className="text-sm">Skills</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Complete</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                      <span className="text-sm">Portfolio</span>
                    </div>
                    <span className="text-xs text-muted-foreground">85%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-rose-500"></div>
                      <span className="text-sm">Recommendations</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Missing</span>
                  </div>
                </div>
                <Button size="sm" className="w-full" asChild>
                  <NavLink to="/profile/edit">Complete Your Profile</NavLink>
                </Button>
              </div>
            </CardContent>
          </Card>

          {!isPrivate && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Job Match Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center">
                    <div className="relative h-32 w-32">
                      <svg className="h-full w-full" viewBox="0 0 100 100">
                        <circle
                          className="stroke-muted-foreground/20"
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          strokeWidth="10"
                        />
                        <circle
                          className="stroke-primary"
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          strokeWidth="10"
                          strokeDasharray="251.2"
                          strokeDashoffset="50.24"
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold">80%</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">AI Engineer at Google</span>
                      <span className="text-sm font-medium">92% match</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">ML Engineer at Meta</span>
                      <span className="text-sm font-medium">88% match</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Data Scientist at Amazon</span>
                      <span className="text-sm font-medium">75% match</span>
                    </div>
                  </div>
                  <Button size="sm" className="mt-4 w-full">
                    View All Matches
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Endorsements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Machine Learning</span>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">24</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Python</span>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">19</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Natural Language Processing</span>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">15</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>TensorFlow</span>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">12</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Team Leadership</span>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">8</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

