import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PencilIcon } from "lucide-react";
import { FileService } from "@/services/file-service";

interface ProfileImageUploadProps {
  currentImageUrl?: string;
  userInitials: string;
  onImageUploaded: (imageKey: string) => void;
  onImageSelected?: (file: File) => void;
}

export function ProfileImageUpload({
  currentImageUrl,
  userInitials,
  onImageUploaded,
  onImageSelected,
}: ProfileImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    currentImageUrl
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a local preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Notify parent about the selected file
    if (onImageSelected) {
      onImageSelected(file);
    }

    try {
      setIsLoading(true);
      const response = await FileService.uploadFile(file, "avatar");
      onImageUploaded(response.fileKey);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <Avatar className="h-24 w-24">
        <AvatarImage src={previewUrl} alt="Profile picture" />
        <AvatarFallback className="text-lg">{userInitials}</AvatarFallback>
      </Avatar>

      <label
        htmlFor="profile-image-upload"
        className="absolute bottom-0 right-0 rounded-full bg-primary p-1 text-primary-foreground shadow-sm cursor-pointer hover:bg-primary/90 transition-colors"
      >
        <PencilIcon className="h-4 w-4" />
        <span className="sr-only">Change profile picture</span>
      </label>

      <input
        id="profile-image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="sr-only"
        disabled={isLoading}
      />
    </div>
  );
}
