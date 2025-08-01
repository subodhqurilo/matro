"use client";
import { useState, useEffect } from "react";
import NavigationTabs from "./_components/NavigationTabs";

import { getFilteredProfiles } from "@/utils/profileFilters";
import { toast } from "sonner";
import { Profile } from "@/types/Profile";
import Recommendation from "./_components/Recommended";
import AllMatches from "./_components/allMatches";
import MutualMatch from "./_components/MutualMatch";

export default function MatrimonialApp() {
  const [activeTab, setActiveTab] = useState("All Matches");
  const [matches, setMatches] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tabs = [
    { name: "All Matches", count: matches.length },
    { name: "Recommendation", count: null }, // Count can be updated if needed
    { name: "Profiles with photo", count: null },
    { name: "Mutual Matches", count: null },
    { name: "Verified", count: null },
  ];

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('No authentication token found');
        const response = await fetch('https://bxcfrrl4-3000.inc1.devtunnels.ms/api/message/allUserGet', {
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
        const data = Array.isArray(responseData) ? responseData : (responseData?.data || []);
        const mappedProfiles = data
          .map((user: any) => ({
            id: user._id || '',
            name: user.name || 'Unknown',
            profileId: user.profileId || '',
            lastSeen: user.lastSeen || 'recently',
            age: user.age || 0,
            height: user.height || '',
            caste: user.caste || '',
            profession: user.profession || '',
            salary: user.salary || '',
            education: user.education || '',
            location: user.location || '',
            languages: user.languages || [],
            image: user.image || '/default-avatar.png',
            isNew: true,
            hasPhoto: !!user.image,
            isMutual: false,
            isVerified: false,
          }))
          .filter(Boolean);
        setMatches(mappedProfiles);
      } catch (err) {
        console.error('Failed to fetch matches:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch matches');
        toast.error('Failed to load matches. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchMatches();
  }, []);

  const filteredProfiles = getFilteredProfiles(matches, activeTab);

  return (
    <div className="min-h-screen bg-gray-50 border border-blue-800">
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-600">{error}</div>
        ) : (
          <>
            <Recommendation activeTab={activeTab} />
           <AllMatches activeTab={activeTab} />
           <MutualMatch activeTab={activeTab} />
          </>
        )}
      </div>
    </div>
  );
}