"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

type Profile = {
  _id: string;
  name: string;
  age?: number;
  profileImage?: string;
};

export default function NotNowPage() {
  const [blockedProfiles, setBlockedProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlockedUsers = async () => {
    try {
      const res = await fetch("https://matrimonial-backend-7ahc.onrender.com/api/cross/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setBlockedProfiles(data.data || []);
      } else {
        toast.error("Failed to load blocked users");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleUnblock = async (userId: string) => {
    try {
      const res = await fetch("https://matrimonial-backend-7ahc.onrender.com/api/cross/user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
        },
        body: JSON.stringify({ userIdToBlock: userId }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("User unblocked");
        setBlockedProfiles((prev) => prev.filter((p) => p._id !== userId));
      } else {
        toast.error("Failed to unblock user");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchBlockedUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Loading blocked users...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Blocked Users
      </h1>

      {blockedProfiles.length === 0 ? (
        <p className="text-center text-gray-500">No blocked users found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blockedProfiles.map((profile) => (
            <div
              key={profile._id}
              className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-5 flex flex-col items-center text-center"
            >
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-red-400 mb-4">
                {profile.profileImage ? (
                  <Image
                    src={profile.profileImage}
                    alt={profile.name}
                    width={112}
                    height={112}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 text-2xl font-bold">
                    ?
                  </div>
                )}
              </div>
              <h2 className="text-xl font-semibold text-gray-800">{profile.name}</h2>
              {profile.age && (
                <p className="text-gray-500 mt-1">{profile.age} yrs</p>
              )}
              <button
                onClick={() => handleUnblock(profile._id)}
                className="mt-4 px-6 py-2 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-colors"
              >
                Unblock
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
