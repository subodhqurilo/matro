"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from 'next/navigation';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Profile } from "@/types/Profile";

interface AllMatchesProps {
  activeTab: string;
}

export default function AllMatches({ activeTab }: AllMatchesProps) {
  const [matches, setMatches] = useState<Profile[]>([]);
  const [isLoadingMatches, setIsLoadingMatches] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("Success");

  const router = useRouter();

  const fetchAllMatches = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }
      
      setIsLoadingMatches(true);
      
      const response = await fetch(
        "https://matrimonial-backend-7ahc.onrender.com/api/like/allMatches",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch matches: ${response.status} ${response.statusText}`);
      }
      
      const responseData = await response.json();
      
      // Log the actual response to debug
      console.log('API Response:', responseData);
      
      // Handle different possible response structures
      let profilesArray = [];
      
      if (responseData.success && responseData.allMatches) {
        profilesArray = responseData.allMatches;
      } else if (responseData.success && responseData.profiles) {
        profilesArray = responseData.profiles;
      } else if (responseData.data && responseData.data.profiles) {
        profilesArray = responseData.data.profiles;
      } else if (responseData.matches) {
        profilesArray = responseData.matches;
      } else if (Array.isArray(responseData)) {
        profilesArray = responseData;
      } else if (responseData.profiles) {
        profilesArray = responseData.profiles;
      } else {
        // If none of the expected structures match, throw an error with details
        console.error('Unexpected response structure:', responseData);
        throw new Error(`Unexpected response format. Expected profiles array but got: ${JSON.stringify(responseData)}`);
      }
      
      if (!Array.isArray(profilesArray)) {
        throw new Error(`Expected profiles to be an array, but got: ${typeof profilesArray}`);
      }
      
      const cleanedProfiles: Profile[] = profilesArray.map((profile: any) => {
        // Handle different possible field names and structures
        let languages: string[] = [];
        if (Array.isArray(profile.languages)) {
          languages = profile.languages;
        } else if (typeof profile.languages === "string") {
          languages = profile.languages.split(",").map((lang: string) => lang.trim());
        }

        return {
          id: profile._id || profile.id || "",
          name: profile.name || "Unknown",
          profileId: profile.profileId || profile.profile_id || "",
          lastSeen: profile.lastSeen
            ? new Date(profile.lastSeen).toLocaleString()
            : "Recently",
          age: profile.age || 0,
          height: profile.height || "",
          caste: profile.caste || profile.religion || "",
          profession: profile.designation || profile.profession || "",
          salary: profile.salary || "",
          education: profile.education || "",
          location: profile.location || "",
          languages: languages,
          image: profile.profileImage || profile.image || "/default-avatar.png",
          profileImages: profile.profileImage ? [profile.profileImage] : [],
          isNew: true,
          hasPhoto: !!(profile.image || profile.profileImage),
          isMutual: false,
          isVerified: false,
          requestSent: false,
        };
      });
      
      setMatches(cleanedProfiles);
      console.log('Processed matches:', cleanedProfiles);
      
    } catch (error) {
      console.error("Error fetching all matches:", error);
      toast.error("Failed to load matches");
      setDialogTitle("Error");
      setDialogMessage(
        error instanceof Error ? error.message : "Failed to load matches"
      );
      setDialogOpen(true);
    } finally {
      setIsLoadingMatches(false);
    }
  };

  useEffect(() => {
    if (activeTab === "All Matches") {
      fetchAllMatches();
    }
  }, [activeTab]);

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogMessage}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {activeTab !== "All Matches" ? null : (
        <div className="space-y-6 mt-6">
          {isLoadingMatches ? (
            <div className="text-center text-gray-500">Loading matches...</div>
          ) : matches.length > 0 ? (
            matches.map((profile) => (
              <div
                key={profile.id}
                className="flex items-center justify-between p-6 bg-white rounded-lg border border-[#7D0A0A] shadow-sm"
              >
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 border border-gray-300">
                    {profile.image ? (
                      <Image
                        src={profile.image}
                        alt={profile.name}
                        width={96}
                        height={96}
                        className="object-cover w-full h-full cursor-pointer"
                        onClick={() => router.push(`/matches/${profile.id}`)}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                        No image
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-1 px-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {profile.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-1 border-b border-[#757575] mt-2">
                    {profile.id} | Last seen {profile.lastSeen}
                  </p>
                  <p className="text-sm text-gray-700">
                    {profile.age} Yrs · {profile.height} · {profile.caste}
                  </p>
                  <p className="text-sm text-gray-700">
                    {profile.profession} · Earns {profile.salary}
                  </p>
                  <p className="text-sm text-gray-700">{profile.education}</p>
                  <p className="text-sm text-gray-700">{profile.location}</p>
                  <p className="text-sm text-gray-700">
                    {Array.isArray(profile.languages)
                      ? profile.languages.join(", ")
                      : ""}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-5 min-w-[300px] border-l border-[#757575]">
                  <div className="text-sm text-gray-600 text-center">
                    Matched Profile
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center">No matches found.</div>
          )}
        </div>
      )}
    </>
  );
}