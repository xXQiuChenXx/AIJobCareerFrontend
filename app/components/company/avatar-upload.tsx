import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface AvatarUploadProps {
  currentAvatar: string;
  onAvatarChange: (file: File) => void;
  label?: string;
}

export default function AvatarUpload({
  currentAvatar,
  onAvatarChange,
  label = "Upload Company Logo",
}: AvatarUploadProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      // Create a preview URL for the selected file
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      
      // Store the file reference in the parent component
      onAvatarChange(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Cleanup object URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative w-20 h-20 rounded-full overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <img
          src={previewUrl || currentAvatar}
          alt="Avatar"
          className="w-full h-full object-cover"
        />
        {isHovering && (
          <div
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer"
            onClick={handleButtonClick}
          >
            <Upload className="h-6 w-6 text-white" />
          </div>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleButtonClick}
      >
        {label}
      </Button>
    </div>
  );
}
