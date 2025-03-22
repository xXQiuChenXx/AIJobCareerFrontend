import CategoryCard from "@/components/training/category-card";
import { InnovationHubs } from "@/components/training/innovation-hub";
import { LearningPlatforms } from "@/components/training/learning-platform";
import { LocalUniversities } from "@/components/training/local-universities";
import OrganizationTraining from "@/components/training/organization-training";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";

const TrainingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-100 z-0"></div>
        <div className="absolute -right-40 top-10 w-96 h-96 bg-emerald-300 rounded-full opacity-20"></div>
        <div className="absolute -left-20 bottom-10 w-72 h-72 bg-teal-300 rounded-full opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
              Upskills for Sarawak's Future
            </h1>
            <p className="text-xl text-gray-700 mb-10 leading-relaxed">
              Access training programs, certifications, and resources to enhance
              your career opportunities across traditional and emerging
              industries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NavLink to="#courses-platform">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 cursor-pointer"
                >
                  Explore Programs
                </Button>
              </NavLink>
              <NavLink to="#organization-training">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-800 text-lg px-8 cursor-pointer"
                >
                  For Organizations
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        {/* Categories Section */}
        <section className="mb-20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-white opacity-70 -z-10 rounded-xl"></div>
          <div className="bg-dot-pattern bg-repeat opacity-10 absolute inset-0 -z-10 rounded-xl"></div>

          <div className="p-8 rounded-xl">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Explore Training Categories
              </h2>
              <p className="text-gray-600 ">
                Discover a wide range of skill development opportunities
                tailored for Sarawak's growing industries and future workforce
                needs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              <CategoryCard
                title="Courses & Learning Platform"
                description="Access online learning platforms with diverse courses to enhance your skills and knowledge"
                icon="GraduationCap"
                color="from-blue-500 to-indigo-600"
                count={15}
                href="#courses-platform"
              />
              <CategoryCard
                title="Local Universities"
                description="Discover local universities offering career-focused programs and certifications"
                icon="Building2"
                color="from-green-500 to-emerald-600"
                count={12}
                href="#local-universities"
              />
              <CategoryCard
                title="Sarawak Digital Innovation Hub"
                description="Explore tech training and innovation programs at Sarawak's digital innovation centers"
                icon="Cpu"
                color="from-purple-500 to-violet-600"
                count={8}
                href="#innovation-hub"
              />
              <CategoryCard
                title="Organization Training Program"
                description="Find enterprise training solutions designed for Sarawak's dynamic business landscape"
                icon="Users"
                color="from-amber-500 to-orange-600"
                count={24}
                href="#organization-training"
              />
            </div>
          </div>
        </section>

        {/* Featured Courses */}
        <section id="courses-platform" className="mb-16 pt-16 -mt-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Courses & Learning Platform
            </h2>
            <p className="text-gray-600">
              Discover courses that sharpen your skills for landing a better
              job.
            </p>
          </div>
          <LearningPlatforms />
        </section>

        {/* Local Universities */}
        <section id="local-universities" className="mb-16 pt-16 -mt-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Local Universities
            </h2>
            <p className="text-gray-600">
              Discover local universities offering career-focused programs and
              gain a certificate to help you secure a better job.
            </p>
          </div>
          <LocalUniversities />
        </section>

        {/* Innovation Hubs */}
        <section id="innovation-hub" className="mb-16 pt-16 -mt-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Sarawak Digital Innovation Hub
            </h2>
            <p className="text-gray-600">
              Dive into the Sarawak Digital Innovation Hub for cutting-edge
              training, tech insights, and career growth.
            </p>
          </div>
          <InnovationHubs />
        </section>

        {/* Organization Training */}
        <section id="organization-training" className="mb-16 pt-16 -mt-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Organization Training Program
            </h2>
            <p className="text-gray-600">
              Elevate local skills with training designed for Sarawak's dynamic
              economy.
            </p>
          </div>

          <OrganizationTraining />
        </section>
      </main>
    </div>
  );
};

export default TrainingPage;
