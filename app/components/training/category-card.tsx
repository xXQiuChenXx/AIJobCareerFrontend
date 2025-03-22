import type { LucideIcon } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { NavLink } from "react-router"
interface CategoryCardProps {
  title: string
  description: string
  icon: string
  color: string
  count: number
}

export default function CategoryCard({ title, description, icon, color, count }: CategoryCardProps) {
  // Dynamically get the icon from Lucide
  const Icon = LucideIcons[icon as keyof typeof LucideIcons] as LucideIcon

  return (
    <NavLink
      to="#"
      className="block p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col h-full">
        <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center mb-4`}>
          {Icon && <Icon className="h-6 w-6 text-white" />}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-sm font-medium text-gray-500">{count} courses</span>
          <div className="flex items-center text-blue-600 hover:text-blue-800">
            <span className="text-sm font-medium">Explore</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 ml-1"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </NavLink>
  )
}
