import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string | undefined): string {
  if (!date) return '';
  
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  
  return d.toLocaleDateString(undefined, {
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });
}
