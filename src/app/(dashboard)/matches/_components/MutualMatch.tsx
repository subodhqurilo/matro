"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Profile } from "@/types/Profile";

interface MutualMatch {
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
  company: string;
}

export default function MutualMatches({ activeTab }: { activeTab: string }) {
  const [mutualMatches, setMutualMatches] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (activeTab !== "Mutual Matches") return;

    const fetchMutualMatches = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('No authentication token found');

        const response = await fetch('https://bxcfrrl4-3000.inc1.devtunnels.ms/api/mutual-matches', {
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
        const data = responseData.mutualMatches || [];

        const mappedProfiles = data
          .map((match: MutualMatch) => ({
            id: match._id || '',
            name: `${match.firstName} ${match.lastName}`.trim() || 'Unknown',
            profileId: match.id || '',
            lastSeen: 'recently',
            age: calculateAge(match.dateOfBirth),
            height: match.height || '',
            caste: match.caste || '',
            profession: match.designation || '',
            salary: match.annualIncome || '',
            education: match.highestEducation || '',
            location: `${match.city}, ${match.state}`.trim() || '',
            languages: match.motherTongue ? [match.motherTongue] : [],
            image: match.profileImage || '/default-avatar.png',
            isNew: false,
            hasPhoto: !!match.profileImage,
            isMutual: true,
            isVerified: false,
          }))
          .filter(Boolean);

        setMutualMatches(mappedProfiles);
      } catch (err) {
        console.error('Failed to fetch mutual matches:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch mutual matches');
        toast.error('Failed to load mutual matches. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMutualMatches();
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

  if (activeTab !== "Mutual Matches") return null;

  return (
    <div className="space-y-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-600">{error}</div>
      ) : mutualMatches.length === 0 ? (
        <div className="text-center py-8 text-gray-600">No mutual matches found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mutualMatches.map((profile) => (
            <div key={profile.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
              <img
                src={profile.image}
                alt={profile.name}
                className="w-full h-48 object-cover rounded-md mb-4"
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