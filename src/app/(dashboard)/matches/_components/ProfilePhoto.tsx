"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Profile } from "@/types/Profile";
import { useRouter } from 'next/navigation';

interface ProfileWithPhoto {
  _id: string;
  firstName: string;
  lastName: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  annualIncome: string;
  caste: string;
  city: string;
  dateOfBirth: string;
  designation: string;
  gender: string;
  height: string;
  highestEducation: string;
  motherTongue: string;
  profileImage: string;
  religion: string;
  state: string;
}

export default function ProfilePhoto({ activeTab }: { activeTab: string }) {
  const [profilesWithPhoto, setProfilesWithPhoto] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (activeTab !== "Profiles with photo") return;

    const fetchProfilesWithPhoto = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('No authentication token found');

        const response = await fetch('https://bxcfrrl4-3000.inc1.devtunnels.ms/api/profile/with-photo', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error Response:', errorText);
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const responseData = await response.json();
        const data = responseData.photo || [];

        const mappedProfiles = data
          .map((user: ProfileWithPhoto) => ({
            id: user._id || '',
            name: `${user.firstName} ${user.lastName}`.trim() || 'Unknown',
            profileId: user.id || '',
            lastSeen: 'recently',
            age: calculateAge(user.dateOfBirth),
            height: user.height || '',
            caste: user.caste || '',
            profession: user.designation || '',
            salary: user.annualIncome || '',
            education: user.highestEducation || '',
            location: `${user.city}, ${user.state}`.trim() || '',
            languages: user.motherTongue ? [user.motherTongue] : [],
            image: user.profileImage || '/default-avatar.png',
            isNew: false,
            hasPhoto: !!user.profileImage,
            isMutual: false,
            isVerified: false,
          }))
          .filter(Boolean);

        setProfilesWithPhoto(mappedProfiles);
      } catch (err) {
        console.error('Failed to fetch profiles with photo:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch profiles with photo');
        toast.error('Failed to load profiles with photo. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfilesWithPhoto();
  }, [activeTab]);

  const calculateAge = (dob: string) => {
    if (!dob) return 0;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (activeTab !== "Profiles with photo") return null;

  return (
    <div className="space-y-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-600">{error}</div>
      ) : profilesWithPhoto.length === 0 ? (
        <div className="text-center py-8 text-gray-600">No profiles with photos found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {profilesWithPhoto.map((profile) => (
            <div key={profile.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
              <img
                src={profile.image}
                alt={profile.name}
                className="w-full h-48 object-cover rounded-md mb-4 cursor-pointer"
                onClick={() => router.push(`/matches/${profile.id}`)}
              />
              <h3 className="text-lg font-semibold">{profile.name}</h3>
              <p className="text-sm text-gray-600">{profile.age} years, {profile.height}</p>
              <p className="text-sm text-gray-600">{profile.education}</p>
              <p className="text-sm text-gray-600">{profile.profession}</p>
              <p className="text-sm text-gray-600">{profile.salary}</p>
              <p className="text-sm text-gray-600">{profile.caste}, {profile.location}</p>
              <p className="text-sm text-gray-600">{profile.languages.join(', ')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}