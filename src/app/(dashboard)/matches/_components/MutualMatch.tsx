"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Profile } from "@/types/Profile";
import { Send, Heart, X } from "lucide-react";
import { useRouter } from "next/navigation";

const callApi = async (
  endpoint: string,
  method: "GET" | "POST",
  body?: any
) => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("No authentication token found.");

  const response = await fetch(endpoint, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "API call failed");
  }

  return data;
};

export default function MutualMatches({ activeTab }: { activeTab: string }) {
  const [mutualMatches, setMutualMatches] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSendingConnection, setIsSendingConnection] = useState<{ [key: string]: boolean }>({});
  const [isSendingLike, setIsSendingLike] = useState<{ [key: string]: boolean }>({});
  const router = useRouter();

  useEffect(() => {
    if (activeTab !== "Mutual Matches") return;

    const fetchMutualMatches = async () => {
      try {
        const data = await callApi(
          "https://matrimonial-backend-7ahc.onrender.com/api/mutual-matches",
          "GET"
        );

        const mappedProfiles = (data.mutualMatches || []).map((match: any) => ({
          id: match._id || "",
          name: `${match.firstName} ${match.lastName}`.trim() || "Unknown",
          profileId: match.id || "",
          lastSeen: "recently",
          age: calculateAge(match.dateOfBirth),
          height: match.height || "",
          caste: match.caste || "",
          profession: match.designation || "",
          salary: match.annualIncome || "",
          education: match.highestEducation || "",
          location: `${match.city}, ${match.state}`.trim() || "",
          languages: match.motherTongue ? [match.motherTongue] : [],
          image: match.profileImage || "/default-avatar.png",
          isNew: false,
          hasPhoto: !!match.profileImage,
          isMutual: true,
          isVerified: false,
        }));

        setMutualMatches(mappedProfiles);
      } catch (err) {
        console.error("Failed to fetch mutual matches:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch mutual matches");
        toast.error("Failed to load mutual matches.");
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

  const handleSendConnection = async (id: string) => {
  try {
    setIsSendingConnection((prev) => ({ ...prev, [id]: true }));

    await callApi("https://matrimonial-backend-7ahc.onrender.com/api/request/send", "POST", {
      receiverId: id,
    });

    toast.success("Connection request sent successfully.");
    setMutualMatches((prev) => prev.filter((p) => p.id !== id));
  } catch (error: any) {
    if (error.message === "Request already exists") {
      toast.info("Connection request already sent.");
      // Remove the card even if request already exists
      setMutualMatches((prev) => prev.filter((p) => p.id !== id));
    } else {
      toast.error(error.message || "Failed to send connection request.");
    }
  } finally {
    setIsSendingConnection((prev) => ({ ...prev, [id]: false }));
  }
};

const handleShortlist = async (id: string) => {
  try {
    setIsSendingLike((prev) => ({ ...prev, [id]: true }));

    await callApi("https://matrimonial-backend-7ahc.onrender.com/api/like/send", "POST", {
      receiverId: id,
    });

    toast.success("Profile shortlisted successfully.");
    setMutualMatches((prev) => prev.filter((p) => p.id !== id));
  } catch (error: any) {
    if (error.message === "Already liked") {
      toast.info("You already liked this profile.");
      // Remove the card even if already liked
      setMutualMatches((prev) => prev.filter((p) => p.id !== id));
    } else {
      toast.error(error.message || "Failed to shortlist profile.");
    }
  } finally {
    setIsSendingLike((prev) => ({ ...prev, [id]: false }));
  }
};

const handleNotNow = async (id: string) => {
  try {
    await callApi("https://matrimonial-backend-7ahc.onrender.com/api/cross/user", "POST", {
      userIdToBlock: id,
    });

    setMutualMatches((prev) => prev.filter((p) => p.id !== id));
    toast.success("Profile skipped.");
  } catch (error: any) {
    toast.error(error.message || "Failed to skip profile.");
    // Also remove the card even on failure? If yes, uncomment below:
    // setMutualMatches((prev) => prev.filter((p) => p.id !== id));
  }
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
        <div className="grid grid-cols-1 gap-4">
          {mutualMatches.map((profile) => (
            <div
              key={profile.id}
              className="flex items-center justify-between p-6 bg-white rounded-lg border border-[#7D0A0A] shadow-sm"
            >
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 border border-gray-300">
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="object-cover w-full h-full cursor-pointer"
                    onClick={() => router.push(`/matches/${profile.id}`)}
                  />
                </div>
              </div>
              <div className="flex-1 px-6 mb-4">
                <h3
                  className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-blue-600"
                  onClick={() => router.push(`/matches/${profile.id}`)}
                >
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
                <p className="text-sm text-gray-700">{profile.languages.join(", ")}</p>
              </div>
              <div className="flex flex-col items-center gap-5 min-w-[300px] border-l border-[#757575]">
                <div className="flex gap-6 items-center">
                  <div className="text-regular text-[#000000] mb-2 font-Lato mt-2">Send Connection</div>
                  <button
                    className="bg-gradient-to-r from-[#2BFF88] to-[#2BD2FF] text-white rounded-full w-12 h-12 flex items-center justify-center"
                    onClick={() => handleSendConnection(profile.id)}
                    disabled={isSendingConnection[profile.id]}
                  >
                    {isSendingConnection[profile.id] ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <div className="flex gap-6 items-center">
                  <div className="text-regular text-[#000000] mb-2 font-Lato ml-16">Shortlist</div>
                  <button
                    className="border-[#F2F2F2] hover:bg-gray-50 rounded-full w-12 h-12 flex items-center justify-center bg-transparent border"
                    onClick={() => handleShortlist(profile.id)}
                    disabled={isSendingLike[profile.id]}
                  >
                    {isSendingLike[profile.id] ? (
                      <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Heart className="w-4 h-4 text-[#8E2E37]" />
                    )}
                  </button>
                </div>
                <div className="flex gap-6 items-center">
                  <div className="text-regular text-[#000000] font-Lato ml-16">Not Now</div>
                  <button
                    className="bg-[#ADADAD] hover:bg-gray-50 rounded-full w-12 h-12 flex items-center justify-center"
                    onClick={() => handleNotNow(profile.id)}
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
