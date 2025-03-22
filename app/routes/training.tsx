import CategoryCard from "@/components/training/category-card";
import { InnovationHubs } from "@/components/training/innovation-hub";
import { LearningPlatforms } from "@/components/training/learning-platform";
import { LocalUniversities } from "@/components/training/local-universities";
import { Button } from "@/components/ui/button";
import React from "react";

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
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8"
              >
                Explore Programs
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 text-lg px-8"
              >
                For Organizations
              </Button>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        {/* Categories Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Explore Categories
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <CategoryCard
              title="Digital Skills & Tech Training"
              description="Courses on AI, coding, e-commerce, and digital literacy"
              icon="laptop"
              color="bg-blue-500"
              count={15}
            />
            <CategoryCard
              title="Industry-Specific Skills"
              description="Training for agriculture, tourism, renewable energy, and more"
              icon="briefcase"
              color="bg-green-500"
              count={24}
            />
            <CategoryCard
              title="Traditional & Heritage Skills"
              description="Preserve and learn handicrafts, boat-making, and culinary arts"
              icon="paintbrush"
              color="bg-amber-500"
              count={12}
            />
            <CategoryCard
              title="Language & Communication"
              description="English, Mandarin, and Iban language courses for business"
              icon="message-circle"
              color="bg-purple-500"
              count={8}
            />
          </div>
        </section>

        {/* Featured Courses */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Courses & Learning Platform
          </h2>
          <LearningPlatforms />
        </section>

        <section className="mb-16"> 
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Local Universities
          </h2>
          <LocalUniversities />
        </section>
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Sarawak Digital Innovation Hub
          </h2>
          <InnovationHubs />
        </section>
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            For Organisations
          </h2>
        </section>
      </main>
    </div>
  );
};

export default TrainingPage;
