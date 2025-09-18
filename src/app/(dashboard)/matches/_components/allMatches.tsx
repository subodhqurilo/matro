"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Send, Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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

  const [isSendingConnection, setIsSendingConnection] = useState<{ [key: string]: boolean }>({});
  const [isSendingLike, setIsSendingLike] = useState<{ [key: string]: boolean }>({});

  const router = useRouter();

  const fetchAllMatches = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No authentication token found. Please log in.");

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
      console.log("API Response:", responseData);

      let profilesArray = [];
      if (responseData.success && responseData.allMatches) {
        profilesArray = responseData.allMatches;
      } else if (responseData.profiles) {
        profilesArray = responseData.profiles;
      } else if (responseData.matches) {
        profilesArray = responseData.matches;
      } else if (Array.isArray(responseData)) {
        profilesArray = responseData;
      } else {
        console.error("Unexpected response structure:", responseData);
        throw new Error(`Unexpected response format`);
      }

      const cleanedProfiles: Profile[] = profilesArray.map((profile: any) => ({
        id: profile._id || profile.id || "",
        name: profile.name || profile.firstName || "Unknown",
        profileId: profile.profileId || profile.profile_id || "",
        lastSeen: profile.lastSeen
          ? new Date(profile.lastSeen).toLocaleString()
          : "Recently",
        age: profile.age || (profile.dateOfBirth ? new Date().getFullYear() - new Date(profile.dateOfBirth).getFullYear() : 0),
        height: profile.height || "",
        caste: profile.caste || profile.religion || "",
        profession: profile.designation || profile.profession || "",
        salary: profile.salary || profile.annualIncome || "",
        education: profile.education || profile.highestEducation || "",
        location: profile.location || profile.city || "",
        languages: Array.isArray(profile.languages)
          ? profile.languages
          : profile.motherTongue
          ? [profile.motherTongue]
          : [],
        image: profile.profileImage || profile.image || "/default-avatar.png",
        profileImages: profile.profileImage ? [profile.profileImage] : [],
        isNew: true,
        hasPhoto: !!(profile.image || profile.profileImage),
        isMutual: false,
        isVerified: false,
        requestSent: false,
      }));

      setMatches(cleanedProfiles);
    } catch (error) {
      console.error("Error fetching all matches:", error);
      toast.error("Failed to load matches");
      setDialogTitle("Error");
      setDialogMessage(error instanceof Error ? error.message : "Failed to load matches");
      setDialogOpen(true);
    } finally {
      setIsLoadingMatches(false);
    }
  };

  // ACTIONS
  const handleSendConnection = async (id: string) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No auth token");

      setIsSendingConnection((prev) => ({ ...prev, [id]: true }));

      const res = await fetch("https://matrimonial-backend-7ahc.onrender.com/api/request/send", {
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
          toast.error(data.message || "Connection request failed.");
        }
      } else {
        toast.success("Connection request sent successfully.");
      }

      setMatches((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Send Connection Error:", err);
      toast.error("Failed to send connection request.");
    } finally {
      setIsSendingConnection((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleShortlist = async (id: string) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No auth token");

      setIsSendingLike((prev) => ({ ...prev, [id]: true }));

      const res = await fetch("https://matrimonial-backend-7ahc.onrender.com/api/like/send", {
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
          toast.success("You already liked this profile.");
        } else {
          toast.error(data.message || "Shortlist failed.");
        }
      } else {
        toast.success("Profile shortlisted.");
      }
    } catch (err) {
      console.error("Shortlist Error:", err);
      toast.error("Failed to shortlist profile.");
    } finally {
      setIsSendingLike((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleNotNow = async (id: string) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No auth token");

      const res = await fetch("https://matrimonial-backend-7ahc.onrender.com/api/cross/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userIdToBlock: id }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Skip failed");
      }

      toast.success("Profile skipped");
      setMatches((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Not Now Error:", err);
      toast.error("Failed to skip profile.");
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
                {/* Image */}
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

                {/* Info */}
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

                {/* Buttons */}
                <div className="flex flex-col gap-4 items-center min-w-[250px] border-l pl-4">
                  {/* Connect */}
                  <div className="flex items-center gap-4">
                    <span className="text-sm">Connection</span>
                    <Button
                      disabled={isSendingConnection[profile.id]}
                      onClick={() => handleSendConnection(profile.id)}
                      className="bg-gradient-to-r from-green-400 to-blue-400 text-white w-10 h-10 rounded-full"
                    >
                      {isSendingConnection[profile.id] ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                  </div>

                  {/* Shortlist */}
                  <div className="flex items-center gap-4">
                    <span className="text-sm">Shortlist</span>
                    <Button
                      variant="outline"
                      disabled={isSendingLike[profile.id]}
                      onClick={() => handleShortlist(profile.id)}
                      className="w-10 h-10 rounded-full"
                    >
                      {isSendingLike[profile.id] ? (
                        <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Heart className="w-4 h-4 text-red-600" />
                      )}
                    </Button>
                  </div>

                  {/* Not Now */}
                  <div className="flex items-center gap-4">
                    <span className="text-sm">Not Now</span>
                    <Button
                      variant="outline"
                      onClick={() => handleNotNow(profile.id)}
                      className="w-10 h-10 rounded-full bg-gray-200"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </Button>
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
