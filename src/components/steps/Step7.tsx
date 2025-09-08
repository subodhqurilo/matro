'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Upload } from 'lucide-react';
import { useUser } from '@/components/ui/UserContext';
import { useState } from 'react';

interface Step7Props {
  profileImage: File | null;
  setProfileImage: (file: File | null) => void;
  adhaarCardFrontImage: File | null;
  setAdhaarCardFrontImage: (file: File | null) => void;
  adhaarCardBackImage: File | null;
  setAdhaarCardBackImage: (file: File | null) => void;
  onBack: () => void;
}

const Step7Form: React.FC<Step7Props> = ({
  profileImage,
  setProfileImage,
  adhaarCardFrontImage,
  setAdhaarCardFrontImage,
  adhaarCardBackImage,
  setAdhaarCardBackImage,
  onBack,
}) => {
  const { setProfileImage: setGlobalProfileImage } = useUser();
  const [loading, setLoading] = useState(false);

  const handleContinueStep7 = async () => {
    try {
      if (!profileImage || !adhaarCardFrontImage || !adhaarCardBackImage) {
        alert('Please upload all required images.');
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append('profileImage', profileImage);
      formData.append('adhaarCardFrontImage', adhaarCardFrontImage);
      formData.append('adhaarCardBackImage', adhaarCardBackImage);

      const token = localStorage.getItem('token');

      const res = await fetch('https://matrimonial-backend-chi.vercel.app/api/basic-details', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const uploadedUrl = data.data.profileImage;
        setGlobalProfileImage(uploadedUrl);
        localStorage.setItem('profileImage', uploadedUrl);
        alert('Profile updated successfully ✅');
      } else {
        console.error('Upload failed', data);
        alert(data.message || 'Something went wrong while uploading');
      }
    } catch (err) {
      console.error('Upload error', err);
      alert('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center space-x-3 mb-6">
        <button type="button" onClick={onBack}>
          <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-rose-600 transition-colors" />
        </button>
        <h2 className="text-xl font-semibold text-gray-900">
          Aadhaar & Photo Verification
        </h2>
      </div>

      <div className="space-y-4 mb-6">
        {/* Profile Image */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Profile Image *
          </Label>
          <div className="relative">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setProfileImage(file);
                  const previewUrl = URL.createObjectURL(file);
                  setGlobalProfileImage(previewUrl);
                }
              }}
              className="w-full bg-white"
              required
            />
            <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
          {profileImage && (
            <p className="text-sm text-gray-600 mt-1">
              Selected: {profileImage.name}
            </p>
          )}
        </div>

        {/* Aadhaar Front */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Aadhaar Card Front Image *
          </Label>
          <div className="relative">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setAdhaarCardFrontImage(file);
              }}
              className="w-full bg-white"
              required
            />
            <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
          {adhaarCardFrontImage && (
            <p className="text-sm text-gray-600 mt-1">
              Selected: {adhaarCardFrontImage.name}
            </p>
          )}
        </div>

        {/* Aadhaar Back */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Aadhaar Card Back Image *
          </Label>
          <div className="relative">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setAdhaarCardBackImage(file);
              }}
              className="w-full bg-white"
              required
            />
            <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
          {adhaarCardBackImage && (
            <p className="text-sm text-gray-600 mt-1">
              Selected: {adhaarCardBackImage.name}
            </p>
          )}
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        Upload your profile image and Aadhaar card images to verify your identity.
      </p>

      <Button
        onClick={handleContinueStep7}
        disabled={loading}
        className="w-full bg-rose-700 hover:bg-rose-800 text-white py-3 font-medium text-base shadow-lg hover:shadow-xl transition-all duration-200"
        size="lg"
      >
        {loading ? 'Uploading...' : 'Submit'}
      </Button>
    </>
  );
};
export default Step7Form;