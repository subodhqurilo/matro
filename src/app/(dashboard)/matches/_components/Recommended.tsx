"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Send, Heart, X } from "lucide-react";

interface RecommendedProfile {
  _id: string;
  name: string;
  age: number;
  location: string;
  profileImage: string;
  profileImages: string[];
  lastSeen: string;
  height?: string;
  religion?: string;
  profession?: string;
  salary?: string;
  education?: string;
  languages?: string[];
  gender?: string;
}

interface RecommendationProps {
  activeTab: string;
}

export default function Recommendation({ activeTab }: RecommendationProps) {
  const [recommendedProfiles, setRecommendedProfiles] = useState<RecommendedProfile[]>([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  const [isSendingConnection, setIsSendingConnection] = useState<{ [key: string]: boolean }>({});

  const fetchRecommendedProfiles = async () => {
    try {
      setIsLoadingRecommendations(true);
      const response = await fetch('https://bxcfrrl4-3000.inc1.devtunnels.ms/api/recommendation/daily', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch recommended profiles');
      }
      const data = await response.json();
      if (data.success && Array.isArray(data.profiles)) {
        const cleanedProfiles = data.profiles.map((profile: any) => {
          let languages: string[] = [];
          if (Array.isArray(profile.languages)) {
            languages = profile.languages;
          } else if (typeof profile.languages === "string") {
            languages = profile.languages.split(",").map((lang: string) => lang.trim());
          }
          return {
            ...profile,
            lastSeen: profile.lastSeen ? new Date(profile.lastSeen).toLocaleString() : 'Recently',
            profileImages: profile.profileImage ? [profile.profileImage] : [],
            profession: profile.designation || profile.profession || '',
            languages,
          };
        });
        setRecommendedProfiles(cleanedProfiles);
      }
    } catch (error) {
      console.error('Error fetching recommended profiles:', error);
      toast.error('Failed to load recommended profiles');
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  useEffect(() => {
    if (activeTab === "Recommendation") {
      fetchRecommendedProfiles();
    }
  }, [activeTab]);

  const handleSendConnection = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }

      setIsSendingConnection((prev) => ({ ...prev, [id]: true }));

      const response = await fetch('https://bxcfrrl4-3000.inc1.devtunnels.ms/api/request/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          receiverId: id,
          // Add any additional required fields here
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to send connection request: ${errorText}`);
      }

      const data = await response.json();

      if (data.success) {
        toast.success('Connection request sent successfully');
        // Optionally remove the profile from the list
        setRecommendedProfiles((prev) => prev.filter((profile) => profile._id !== id));
      } else {
        throw new Error(data.message || 'Failed to send connection request');
      }
    } catch (error) {
      console.error('Error sending connection request:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to send connection request');
    } finally {
      setIsSendingConnection((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleShortlist = (id: string) => toast.success(`Shortlisted ${id}`);
  const handleNotNow = (id: string) => {
    toast.success(`Skipped ${id}`);
    // Optionally remove the profile from the list
    setRecommendedProfiles((prev) => prev.filter((profile) => profile._id !== id));
  };

  if (activeTab !== "Recommendation") {
    return null;
  }

  return (
    <div className="space-y-6 mt-6">
      {isLoadingRecommendations ? (
        <div className="text-center text-gray-500">Loading recommendations...</div>
      ) : recommendedProfiles.length > 0 ? (
        recommendedProfiles.map((profile) => (
          <div
            key={profile._id}
            className="flex items-center justify-between p-6 bg-white rounded-lg border border-[#7D0A0A] shadow-sm"
          >
            {/* Left: Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 border border-gray-300">
                {profile.profileImage ? (
                  <Image
                    src={profile.profileImage}
                    alt={profile.name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                    No image
                  </div>
                )}
              </div>
            </div>
            {/* Middle: Info */}
            <div className="flex-1 px-6 mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{profile.name}</h3>
              <p className="text-sm text-gray-500 mb-1 border-b border-[#757575] mt-2">
                {profile._id} | Last seen {profile.lastSeen}
              </p>
              <p className="text-sm text-gray-700">
                {profile.age} Yrs · {profile.height} · {profile.religion}
              </p>
              <p className="text-sm text-gray-700">
                {profile.profession} · Earns {profile.salary}
              </p>
              <p className="text-sm text-gray-700">{profile.education}</p>
              <p className="text-sm text-gray-700">{profile.location}</p>
              <p className="text-sm text-gray-700">
                {Array.isArray(profile.languages) ? profile.languages.join(", ") : ""}
              </p>
            </div>
            {/* Right: Actions */}
            <div className="flex flex-col items-center gap-5 min-w-[300px] border-l border-[#757575]">
              <div className="flex gap-6 items-center">
                <div className="text-regular text-[#000000] mb-2 font-Lato mt-2">Send Connection</div>
                <Button
                  className={`bg-gradient-to-r from-[#2BFF88] to-[#2BD2FF] text-white rounded-full w-12 h-12 p-0 ${
                    isSendingConnection[profile._id] ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  size="sm"
                  onClick={() => !isSendingConnection[profile._id] && handleSendConnection(profile._id)}
                  disabled={isSendingConnection[profile._id]}
                >
                  {isSendingConnection[profile._id] ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <div className="flex gap-6 items-center">
                <div className="text-regular text-[#000000] mb-2 font-Lato ml-16">Shortlist</div>
                <Button
                  variant="outline"
                  className="border-[#F2F2F2] hover:bg-gray-50 rounded-full w-12 h-12 p-0 bg-transparent"
                  size="sm"
                  onClick={() => handleShortlist(profile._id)}
                >
                  <Heart className="w-4 h-4 text-[#8E2E37]" />
                </Button>
              </div>
              <div className="flex gap-6 items-center">
                <div className="text-regular text-[#000000] font-Lato ml-16">Not Now</div>
                <Button
                  variant="outline"
                  className="bg-[#ADADAD] hover:bg-gray-50 rounded-full w-12 h-12 p-0"
                  size="sm"
                  onClick={() => handleNotNow(profile._id)}
                >
                  <X className="w-4 h-4 text-gray-600" />
                </Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-gray-500 text-center">No recommended profiles found.</div>
      )}
    </div>
  );
}