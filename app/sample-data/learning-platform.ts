import type { LearningPlatform } from "@/types/training";

export const platforms: LearningPlatform[] = [
  {
    name: "Coursera",
    description:
      "Access thousands of courses from top universities and companies worldwide. Learn at your own pace with flexible schedules.",
    imageUrl: "/platform-logo/coursera-logo.png",
    url: "https://www.coursera.org/",
  },
  {
    name: "MyFutureJobs",
    description:
      "Connect with employers and find career opportunities tailored to your skills and experience.",
    imageUrl: "/platform-logo/MYFutureJobs.png",
    url: "https://www.myfuturejobs.gov.my/",
  },
  {
    name: "eLatih",
    description:
      "A comprehensive digital learning platform offering courses across multiple disciplines and professional fields.",
    imageUrl: "/platform-logo/e-latih.png",
    url: "https://elatih.hrdcorp.gov.my/courses",
  },
  {
    name: "OpenLearning",
    description:
      "An innovative social learning platform designed to provide a rich and collaborative educational experience.",
    imageUrl: "/platform-logo/OpenLearning_Logo.png",
    url: "https://www.openlearning.com/",
  },
];
