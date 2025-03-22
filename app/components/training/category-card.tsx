import type { LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { NavLink } from "react-router";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  count: number;
  href: string;
}

export default function CategoryCard({
  title,
  description,
  icon,
  color,
  count,
  href,
}: CategoryCardProps) {
  // Dynamically get the icon from Lucide
  const Icon = LucideIcons[icon as keyof typeof LucideIcons] as LucideIcon;

  return (
    <NavLink
      to={href}
      className="block rounded-xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex flex-col h-full bg-white border border-gray-100 rounded-xl overflow-hidden">
        {/* Card Header with Gradient Background */}
        <div className={`p-6 bg-gradient-to-br ${color} relative`}>
          <div className="absolute top-0 right-0 w-32 h-32 -mt-10 -mr-10 rounded-full bg-white opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 -mb-8 -ml-8 rounded-full bg-white opacity-10"></div>

          {/* Icon with improved presentation */}
          <div className=" bg-opacity-20 w-14 h-14 rounded-lg flex items-center justify-center backdrop-blur-sm mb-4 shadow-lg">
            {Icon && <Icon className="h-7 w-7 text-white" strokeWidth={1.5} />}
          </div>

          <h3 className="text-xl font-semibold mb-1 text-white">{title}</h3>
        </div>

        {/* Card Body */}
        <div className="p-6 flex flex-col flex-grow">
          <p className="text-gray-600 mb-6 flex-grow">{description}</p>

          {/* Explore Button with Animation */}
          <div className="flex items-center text-emerald-600 group-hover:text-emerald-700 transition-colors">
            <span className="text-sm font-semibold">Explore category</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </NavLink>
  );
}
