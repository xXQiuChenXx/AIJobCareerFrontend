"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface AvatarUploadProps {
  currentAvatar: string
  onAvatarChange: (newAvatar: string) => void
}

export default function AvatarUpload({ currentAvatar, onAvatarChange }: AvatarUploadProps) {
  const [previewUrl, setPreviewUrl] = useState(currentAvatar)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Create a preview URL for the selected image
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    onAvatarChange(url)
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="avatar-upload">Company Logo</Label>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
          <img
            src={previewUrl || "/placeholder.svg?height=64&width=64"}
            alt="Company Logo"
            width={64}
            height={64}
            className="object-cover w-full h-full"
          />
        </div>
        <Button type="button" variant="outline" size="sm" onClick={handleButtonClick}>
          Change Logo
        </Button>
        <input
          ref={fileInputRef}
          id="avatar-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  )
}

