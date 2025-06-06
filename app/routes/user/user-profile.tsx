import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Loader2,
  Lock,
  MessageSquare,
  Share2,
  ShieldAlert,
} from "lucide-react";
import { ProfileService } from "@/services/profile-service";
import type { CompleteProfile } from "@/types/user";
import { UserService } from "@/services/user-service";
import { WorkExperienceService } from "@/services/work-experience-service";
import type { BasicInfo } from "@/types/user";
import AboutSection from "@/components/profile/sections/about-section";
import SkillsSection from "@/components/profile/sections/skills-section";
import ExperienceSection from "@/components/profile/sections/experience-section";
import EducationSection from "@/components/profile/sections/education-section";
import ProjectsSection from "@/components/profile/sections/projects-section";
import PublicationsSection from "@/components/profile/sections/publications-section";
import ProfileCompletionSection from "@/components/profile/sections/profile-completion-section";
import JobMatchSection from "@/components/profile/sections/job-match-section";
import EndorsementsSection from "@/components/profile/sections/endorsements-section";
import { SkillService } from "@/services/skill-service";
import { EducationService } from "@/services/education-service";
import { ProjectService } from "@/services/project-service";
import { PublicationService } from "@/services/publication-service";
import type { Skill } from "@/types/skill";
import type { Publication } from "@/types/publication";
import type { EducationFormValues } from "@/lib/schemas/education-schema";
import type { ProjectFormValues } from "@/lib/schemas/project-schema";
import type { WorkExperienceFormValues } from "@/lib/schemas/work-experience-schema";
import { useAuth } from "@/components/provider/auth-provider";
import { Navigate } from "react-router";
import type { Route } from "./+types/user-profile";

// Helper to calculate profile completion
const calculateProfileCompletion = (
  profile: CompleteProfile | null
): number => {
  if (!profile) return 0;

  const sections = [
    !!profile.basicInfo,
    profile.workExperiences && profile.workExperiences.length > 0,
    profile.education && profile.education.length > 0,
    profile.skills && profile.skills.length > 0,
    profile.projects && profile.projects.length > 0,
    profile.publications && profile.publications.length > 0,
  ];

  const completedSections = sections.filter(Boolean).length;
  return Math.round((completedSections / sections.length) * 100);
};

export default function ProfilePage({ params }: Route.ComponentProps) {
  const { id } = params;
  const { user } = useAuth();
  const [profile, setProfile] = useState<CompleteProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const profileData = await ProfileService.getCompleteProfile(id);
        setProfile(profileData);
      } catch (err) {
        console.error("Failed to fetch profile data:", err);
        setError("Failed to load profile data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSaveBasicInfo = async (data: Partial<BasicInfo>) => {
    if (!profile) return;

    // Create or update basic info
    const userId = profile.basicInfo?.user_id;
    if (!userId) return;

    await UserService.updateBasicInfo(data);

    setProfile({
      ...profile,
      basicInfo: {
        ...(profile.basicInfo || {}),
        ...data,
      } as BasicInfo,
    });
  };

  const handleSaveWorkExperiences = async (
    experiences: WorkExperienceFormValues[]
  ) => {
    if (!profile || !profile.basicInfo) return;
    const userId = profile.basicInfo.user_id;

    for (const exp of experiences) {
      if (exp.experience_id.startsWith("temp-")) {
        const { experience_id, ...newExp } = exp;
        // Create new work experience
        await WorkExperienceService.createWorkExperience({
          ...newExp,
          user_id: userId,
        });
      } else {
        await WorkExperienceService.updateWorkExperience(exp.experience_id, {
          ...exp,
          user_id: userId,
        });
      }
    }

    const updatedExperiences =
      await WorkExperienceService.getAllWorkExperiences();
    setProfile({
      ...profile,
      workExperiences: updatedExperiences,
    });
  };

  const handleSaveSkills = async (skills: Skill[]) => {
    if (!profile || !profile.basicInfo) return;

    const userId = profile.basicInfo.user_id;

    // Process each skill (create new ones or update existing ones)
    for (const skill of skills) {
      if (skill.skill_id < 0) {
        // This is a temporary ID, create a new skill
        await SkillService.createSkill(skill);
      } else {
        // Update existing skill
        await SkillService.updateSkill(skill.skill_id, skill);
      }
    }

    // Refresh the skills list
    const updatedSkills = await SkillService.getUserSkills(userId);

    setProfile({
      ...profile,
      skills: updatedSkills,
    });
  };

  const handleSaveEducation = async (educations: EducationFormValues[]) => {
    if (!profile || !profile.basicInfo) return;

    const userId = profile.basicInfo.user_id;

    // Process each education item
    for (const edu of educations) {
      if (edu.education_id.startsWith("temp-")) {
        // Create new education
        const { education_id, ...newEdu } = edu;
        await EducationService.createEducation({
          ...newEdu,
          user_id: userId,
        });
      } else {
        // Update existing education
        await EducationService.updateEducation(edu.education_id, {
          ...edu,
          user_id: userId,
        });
      }
    }

    // Get updated education list
    const updatedEducation = await EducationService.getCurrentUserEducations();

    setProfile({
      ...profile,
      education: updatedEducation,
    });
  };

  const handleSaveProjects = async (projects: ProjectFormValues[]) => {
    if (!profile || !profile.basicInfo) return;

    const userId = profile.basicInfo.user_id;

    // Process each project
    for (const project of projects) {
      if (project.project_id.startsWith("temp-")) {
        // Create new project
        await ProjectService.createProject({
          ...project,
          user_id: userId,
        });
      } else {
        // Update existing project
        await ProjectService.updateProject(project.project_id, {
          ...project,
          user_id: userId,
        });
      }
    }

    // Get updated projects list
    const updatedProjects = await ProjectService.getProjectsByUserId(userId);

    setProfile({
      ...profile,
      projects: updatedProjects,
    });
  };

  const handleSavePublications = async (publications: Publication[]) => {
    if (!profile || !profile.basicInfo) return;

    const userId = profile.basicInfo.user_id;

    // Process each publication
    for (const pub of publications) {
      if (pub.publication_id.startsWith("temp-")) {
        // Create new publication
        const { publication_id, ...newPub } = pub;
        await PublicationService.createPublication({
          ...newPub,
          user_id: userId,
        });
      } else {
        // Update existing publication
        await PublicationService.updatePublication(pub.publication_id, {
          ...pub,
        });
      }
    }

    // Get updated publications list
    const updatedPublications = await PublicationService.getAllPublications();

    setProfile({
      ...profile,
      publications: updatedPublications,
    });
  };

  if (user?.user_company_id)
    return <Navigate to={`/company/${user.user_company_id}`} />;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2 text-lg">Loading profile data...</span>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <Alert variant="destructive" className="max-w-lg mx-auto my-8">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error || "Could not load profile data."}
        </AlertDescription>
      </Alert>
    );
  }

  const isPrivate = profile.basicInfo?.privacy_status === "private";
  const isAdmin = profile.basicInfo.user_id === user?.userId;
  const profileCompletion = calculateProfileCompletion(profile);
  const userInitials = profile.basicInfo?.first_name
    ? (
        profile.basicInfo.first_name[0] + profile.basicInfo.last_name[0]
      ).toUpperCase()
    : "User";

  const user_name = profile.basicInfo?.first_name
    ? `${profile.basicInfo.first_name} ${profile.basicInfo.last_name}`
    : "Unknown";
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      {isPrivate && (
        <Alert className="mb-6 border-amber-500 bg-amber-50 text-amber-800">
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>Private Account</AlertTitle>
          <AlertDescription>
            Your profile is currently set to private. Only you can see all your
            information.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <div className="relative">
            <div className="h-40 w-full rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            <div className="absolute -bottom-20 left-4 flex items-end space-x-4">
              <Avatar className="h-28 w-28 border-4 border-background">
                <AvatarImage src={profile?.basicInfo?.icon} alt="user-avatar" />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
              <div className="mb-2 hidden md:block px-3 py-1 rounded ">
                <h1 className="text-2xl font-bold text-black">{user_name}</h1>
                <p className="text-black/90">
                  {(profile.workExperiences &&
                    profile.workExperiences[0]?.job_title) ||
                    profile.basicInfo?.role ||
                    "Professional"}
                </p>
              </div>
            </div>
            <div className="absolute right-4 top-4 flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                className="bg-white/20 backdrop-blur-sm"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Message
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="bg-white/20 backdrop-blur-sm"
              >
                <Share2 className="h-4 w-4" />
              </Button>
              {isPrivate && (
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white/20 backdrop-blur-sm"
                >
                  <Lock className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="md:hidden pt-14 pb-2 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{user_name}</h1>
              <p className="text-muted-foreground">
                {(profile.workExperiences &&
                  profile.workExperiences[0]?.job_title) ||
                  profile.basicInfo?.role ||
                  "Professional"}
              </p>
            </div>
            {isPrivate && (
              <Badge
                variant="outline"
                className="gap-1 text-amber-600 border-amber-300 bg-amber-50"
              >
                <Lock className="h-3 w-3" />
                Private
              </Badge>
            )}
          </div>

          <Tabs defaultValue="about" className="pt-4 mt-24">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="space-y-6 pt-4">
              <AboutSection
                handleSaveBasicInfo={handleSaveBasicInfo}
                isPrivate={isPrivate}
                isAdmin={isAdmin}
                profile={profile}
                userInitials={userInitials}
              />

              <SkillsSection
                profile={profile}
                isPrivate={isPrivate}
                isAdmin={isAdmin}
                handleSaveSkills={handleSaveSkills}
              />
            </TabsContent>

            <TabsContent value="experience" className="space-y-6 pt-4">
              <ExperienceSection
                profile={profile}
                isAdmin={isAdmin}
                isPrivate={isPrivate}
                handleSaveWorkExperiences={handleSaveWorkExperiences}
              />
            </TabsContent>

            <TabsContent value="education" className="space-y-6 pt-4">
              <EducationSection
                profile={profile}
                isAdmin={isAdmin}
                isPrivate={isPrivate}
                handleSaveEducation={handleSaveEducation}
              />
            </TabsContent>

            <TabsContent value="portfolio" className="space-y-6 pt-4">
              <ProjectsSection
                profile={profile}
                isAdmin={isAdmin}
                isPrivate={isPrivate}
                handleSaveProjects={handleSaveProjects}
              />

              <PublicationsSection
                profile={profile}
                isAdmin={isAdmin}
                isPrivate={isPrivate}
                handleSavePublications={handleSavePublications}
              />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <ProfileCompletionSection
            profile={profile}
            isPrivate={isPrivate}
            profileCompletion={profileCompletion}
          />

          {!isPrivate && (
            <>
              <JobMatchSection />
              <EndorsementsSection profile={profile} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
