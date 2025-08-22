"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Send, Heart, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Profile {
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
  languages: string[] | string;
  lastSeen?: string;
  profession?: string;
  age?: number;
  salary?: string;
  education?: string;
  location?: string;
}

export default function ProfilePhoto({ activeTab }: { activeTab: string }) {
  const [profilesWithPhoto, setProfilesWithPhoto] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSendingConnection, setIsSendingConnection] = useState<{ [key: string]: boolean }>({});
  const [isSendingLike, setIsSendingLike] = useState<{ [key: string]: boolean }>({});
  const router = useRouter();

  useEffect(() => {
    if (activeTab === "Profiles with photo") {
      fetchProfilesWithPhoto();
    }
  }, [activeTab]);

  const fetchProfilesWithPhoto = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No authentication token found");

      const res = await fetch("https://393rb0pp-3000.inc1.devtunnels.ms/api/profile/with-photo", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch profiles");

      const data = await res.json();

      if (data.success && Array.isArray(data.photo)) {
        const cleanedProfiles = data.photo.map((p: Profile) => {
          const birthDate = new Date(p.dateOfBirth);
          const age = new Date().getFullYear() - birthDate.getFullYear();
          const languages = Array.isArray(p.languages)
            ? p.languages
            : typeof p.languages === "string"
            ? p.languages.split(",").map((lang) => lang.trim())
            : [];

          return {
            ...p,
            age,
            location: `${p.city}, ${p.state}`,
            profession: p.designation || "",
            salary: p.annualIncome || "",
            education: p.highestEducation || "",
            languages,
          };
        });

        setProfilesWithPhoto(cleanedProfiles);
      }
    } catch (err) {
      console.error("Error fetching profiles:", err);
      toast.error("Failed to load profiles with photos");
      setError("Failed to load profiles");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendConnection = async (id: string) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No authentication token");

      setIsSendingConnection((prev) => ({ ...prev, [id]: true }));

      const res = await fetch("https://393rb0pp-3000.inc1.devtunnels.ms/api/request/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ receiverId: id }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.message === "Request already exists") {
          toast.success("Connection already sent.");
        } else {
          toast.error(data.message || "Failed to send connection request");
          return;
        }
      } else {
        toast.success("Connection request sent successfully.");
      }

      // Remove profile from UI
      setProfilesWithPhoto((prev) => prev.filter((profile) => profile._id !== id));
    } catch (error) {
      console.error("Send Connection Error:", error);
      toast.error("Failed to send connection request");
    } finally {
      setIsSendingConnection((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleShortlist = async (id: string) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No authentication token");

      setIsSendingLike((prev) => ({ ...prev, [id]: true }));

      const res = await fetch("https://393rb0pp-3000.inc1.devtunnels.ms/api/like/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ receiverId: id }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.message === "Already liked") {
          toast.success("Profile already liked.");
        } else {
          toast.error(data.message || "Failed to like profile");
        }
      } else {
        toast.success("Profile shortlisted.");
      }
    } catch (error) {
      console.error("Shortlist Error:", error);
      toast.error("Failed to shortlist profile");
    } finally {
      setIsSendingLike((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleNotNow = async (id: string) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No authentication token");

      const res = await fetch("https://393rb0pp-3000.inc1.devtunnels.ms/api/cross/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userIdToBlock: id }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to skip profile");

      toast.success("Profile skipped");
      setProfilesWithPhoto((prev) => prev.filter((profile) => profile._id !== id));
    } catch (error) {
      console.error("Not Now Error:", error);
      toast.error("Failed to skip profile");
    }
  };

  if (activeTab !== "Profiles with photo") return null;

  return (
    <div className="space-y-4 mt-6">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : profilesWithPhoto.length === 0 ? (
        <div className="text-center text-gray-600">No profiles with photos found.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {profilesWithPhoto.map((photo) => (
            <div
              key={photo._id}
              className="flex items-center justify-between p-6 bg-white rounded-lg border border-[#7D0A0A] shadow-sm"
            >
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 border border-gray-300">
                  {photo.profileImage ? (
                    <Image
                      src={photo.profileImage}
                      alt={photo.firstName}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full cursor-pointer"
                      onClick={() => router.push(`/matches/${photo._id}`)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
                      No Image
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 px-6">
                <h3 className="text-lg font-semibold">{photo.firstName} {photo.lastName}</h3>
                <p className="text-sm text-gray-500 border-b border-gray-300 mt-2">
                  {photo._id} | Last seen {photo.lastSeen || "recently"}
                </p>
                <p className="text-sm text-gray-700">
                  {photo.age} Yrs · {photo.height} · {photo.religion}
                </p>
                <p className="text-sm text-gray-700">
                  {photo.profession} · Earns {photo.salary}
                </p>
                <p className="text-sm text-gray-700">{photo.education}</p>
                <p className="text-sm text-gray-700">{photo.location}</p>
                <p className="text-sm text-gray-700">
                  {Array.isArray(photo.languages) ? photo.languages.join(", ") : ""}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 items-center min-w-[250px] border-l pl-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm">Connection</span>
                  <Button
                    disabled={isSendingConnection[photo._id]}
                    onClick={() => handleSendConnection(photo._id)}
                    className="bg-gradient-to-r from-green-400 to-blue-400 text-white w-10 h-10 rounded-full"
                  >
                    {isSendingConnection[photo._id] ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm">Shortlist</span>
                  <Button
                    variant="outline"
                    disabled={isSendingLike[photo._id]}
                    onClick={() => handleShortlist(photo._id)}
                    className="w-10 h-10 rounded-full"
                  >
                    {isSendingLike[photo._id] ? (
                      <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Heart className="w-4 h-4 text-red-600" />
                    )}
                  </Button>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm">Not Now</span>
                  <Button
                    variant="outline"
                    onClick={() => handleNotNow(photo._id)}
                    className="w-10 h-10 rounded-full bg-gray-200"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
