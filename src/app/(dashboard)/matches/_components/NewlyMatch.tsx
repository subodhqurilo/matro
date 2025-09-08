"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { Send, Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewlyMatchedUser {
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

export default function NewlyMatched({ activeTab }: { activeTab: string }) {
  const [newlyMatched, setNewlyMatched] = useState<NewlyMatchedUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSendingConnection, setIsSendingConnection] = useState<{ [key: string]: boolean }>({});
  const [isSendingLike, setIsSendingLike] = useState<{ [key: string]: boolean }>({});
  const router = useRouter();

  useEffect(() => {
    if (activeTab !== "Newly Matched") return;

    const fetchNewlyMatched = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No authentication token found");

        const response = await fetch("https://matrimonial-backend-chi.vercel.app/api/profile/newly-user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch newly matched users");

        const data = await response.json();
        setNewlyMatched(data.users || []);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to load newly matched users.");
        toast.error("Failed to load newly matched users.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewlyMatched();
  }, [activeTab]);

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleSendConnection = async (id: string) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No auth token");

      setIsSendingConnection((prev) => ({ ...prev, [id]: true }));

      const res = await fetch("https://matrimonial-backend-chi.vercel.app/api/request/send", {
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
          return;
        }
      } else {
        toast.success("Connection request sent successfully.");
      }

      // Remove profile from list
      setNewlyMatched((prev) => prev.filter((user) => user._id !== id));
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

      const res = await fetch("https://matrimonial-backend-chi.vercel.app/api/like/send", {
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

      const res = await fetch("https://matrimonial-backend-chi.vercel.app/api/cross/user", {
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
      setNewlyMatched((prev) => prev.filter((user) => user._id !== id));
    } catch (err) {
      console.error("Not Now Error:", err);
      toast.error("Failed to skip profile.");
    }
  };

  if (activeTab !== "Newly Matched") return null;

  return (
    <div className="space-y-4 mt-6">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : newlyMatched.length === 0 ? (
        <div className="text-center text-gray-600">No newly matched users found.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {newlyMatched.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between p-6 bg-white rounded-lg border border-[#7D0A0A] shadow-sm"
            >
              {/* Image */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 border border-gray-300">
                  {user.profileImage ? (
                    <Image
                      src={user.profileImage}
                      alt={user.firstName}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full cursor-pointer"
                      onClick={() => router.push(`/matches/${user._id}`)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
                      No Image
                    </div>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 px-6">
                <h3 className="text-lg font-semibold">{user.firstName} {user.lastName}</h3>
                <p className="text-sm text-gray-500 border-b border-gray-300 mt-2">{user._id} | Last seen recently</p>
                <p className="text-sm text-gray-700">{calculateAge(user.dateOfBirth)} Yrs · {user.height} · {user.religion}</p>
                <p className="text-sm text-gray-700">{user.designation} · Earns {user.annualIncome}</p>
                <p className="text-sm text-gray-700">{user.highestEducation}</p>
                <p className="text-sm text-gray-700">{user.city}, {user.state}</p>
                <p className="text-sm text-gray-700">{user.motherTongue}</p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-4 items-center min-w-[250px] border-l pl-4">
                {/* Connect */}
                <div className="flex items-center gap-4">
                  <span className="text-sm">Connection</span>
                  <Button
                    disabled={isSendingConnection[user._id]}
                    onClick={() => handleSendConnection(user._id)}
                    className="bg-gradient-to-r from-green-400 to-blue-400 text-white w-10 h-10 rounded-full"
                  >
                    {isSendingConnection[user._id] ? (
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
                    disabled={isSendingLike[user._id]}
                    onClick={() => handleShortlist(user._id)}
                    className="w-10 h-10 rounded-full"
                  >
                    {isSendingLike[user._id] ? (
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
                    onClick={() => handleNotNow(user._id)}
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
