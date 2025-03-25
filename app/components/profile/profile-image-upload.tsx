import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Loader2, Upload, X } from "lucide-react"
import { FileService } from "@/services/file-service"
import { toast } from "sonner"

interface ProfileImageUploadProps {
  currentImageUrl?: string
  userInitials: string
  onImageUploaded: (fileKey: string) => void
}

export function ProfileImageUpload({ currentImageUrl, userInitials, onImageUploaded }: ProfileImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(currentImageUrl)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB")
      return
    }

    try {
      setUploading(true)

      // Create a preview URL
      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)

      // Upload file to the server
      const result = await FileService.uploadFile(file, 'profile-images')
      
      // Call the callback with the new file key
      onImageUploaded(result.fileKey)
      toast.success("Profile picture updated successfully")
    } catch (error) {
      console.error("Error uploading image:", error)
      toast.error("Failed to upload image. Please try again.")
      // Reset preview if upload failed
      setPreviewUrl(currentImageUrl)
    } finally {
      setUploading(false)
    }
  }

  const clearImage = async () => {
    if (!currentImageUrl) return
    
    try {
      setUploading(true)
      // Extract file key from URL
      const fileKey = currentImageUrl.split('/').pop()
      if (fileKey) {
        await FileService.deleteFile(fileKey)
      }
      setPreviewUrl(undefined)
      onImageUploaded('')
      toast.success("Profile picture removed")
    } catch (error) {
      console.error("Error removing image:", error)
      toast.error("Failed to remove image")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <Avatar className="h-28 w-28">
          <AvatarImage src={previewUrl} alt="Profile picture" />
          <AvatarFallback className="text-lg">{userInitials}</AvatarFallback>
        </Avatar>
        
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full">
            <Loader2 className="h-6 w-6 animate-spin text-white" />
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="relative"
          disabled={uploading}
        >
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
            disabled={uploading}
          />
          <Upload className="mr-2 h-4 w-4" />
          Upload Picture
        </Button>
        
        {previewUrl && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={clearImage}
            disabled={uploading}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <X className="mr-2 h-4 w-4" />
            Remove
          </Button>
        )}
      </div>
    </div>
  )
}
