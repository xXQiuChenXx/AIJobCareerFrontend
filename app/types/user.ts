import type { Certification } from "./certification";
import type { Education } from "./education";
import type { Project } from "./project";
import type { Publication } from "./publication";
import type { Skill } from "./skill";
import type { WorkExperience } from "./work-experience";

export interface BasicInfo {
  user_id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  age?: number;
  intro: string;
  contact_number: string;
  icon: string;
  privacy_status: string;
  role: string;
  account_created_time: string;
  last_login_at?: string;
  location: string;
}

export interface CompleteProfile {
  basicInfo: BasicInfo;
  workExperiences: WorkExperience[];
  education: Education[];
  projects: Project[];
  publications: Publication[];
  skills: Skill[];
  certifications: Certification[];
}
