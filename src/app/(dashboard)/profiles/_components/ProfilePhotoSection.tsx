"use client";

import React, { useRef } from "react";
import Image from "next/image";

interface ProfilePhotoSectionProps {
  imageUrl?: string | null;
  onPhotoChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  photoUploading?: boolean;
  fallbackUrl?: string;
}

const ProfilePhotoSection: React.FC<ProfilePhotoSectionProps> = ({
  imageUrl,
  onPhotoChange,
  photoUploading = false,
  fallbackUrl = "https://res.cloudinary.com/dppe3ni5z/image/upload/v1234567890/default-profile.png",
}) => {
  const validImageUrl =
    typeof imageUrl === "string" && imageUrl.trim() !== ""
      ? imageUrl
      : fallbackUrl;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current && !photoUploading) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="bg-white shadow rounded p-4 flex flex-col items-center">
      {/* Profile Image */}
      <div className="w-40 h-40 relative rounded-full overflow-hidden border border-gray-300 mb-4">
        {validImageUrl ? (
          <Image
            src={validImageUrl}
            alt="Profile Photo"
            fill
            className="object-cover"
            sizes="160px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
            No Photo
          </div>
        )}
      </div>

      {/* File Upload */}
      {onPhotoChange && (
        <>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => {
              console.log("File selected:", e.target.files);
              onPhotoChange(e);
            }}
            disabled={photoUploading}
          />
          <button
            onClick={handleButtonClick}
            disabled={photoUploading}
            className={`px-4 py-2 text-white text-sm rounded ${
              photoUploading
                ? "bg-red-300 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {photoUploading ? "Uploading..." : "Add Photo"}
          </button>
        </>
      )}
    </div>
  );
};

export default ProfilePhotoSection;
