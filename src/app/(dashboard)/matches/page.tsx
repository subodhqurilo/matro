"use client"
import { useState, useEffect } from "react"
import NavigationTabs from "./_components/NavigationTabs"
import ProfileCard from "./_components/ProfileCard"
import { getFilteredProfiles } from "@/utils/profileFilters"
import { toast } from "sonner"
import { Profile } from "@/types/Profile"
import Image from "next/image"
import RecommendationCard from "./_components/RecommendedProfile"

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

export default function MatrimonialApp() {
  const [activeTab, setActiveTab] = useState("All Matches")
  const [matches, setMatches] = useState<Profile[]>([])
  const [recommendedProfiles, setRecommendedProfiles] = useState<RecommendedProfile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const tabs = [
    { name: "All Matches", count: matches.length },
    { name: "Recommendation", count: recommendedProfiles.length },
    { name: "Profiles with photo", count: matches.filter(p => p.hasPhoto).length },
    { name: "Mutual Matches", count: matches.filter(p => p.isMutual).length },
    { name: "Verified", count: matches.filter(p => p.isVerified).length },
  ]

  const fetchRecommendedProfiles = async () => {
    try {
      setIsLoadingRecommendations(true)
      const response = await fetch('https://bxcfrrl4-3000.inc1.devtunnels.ms/api/recommendation/daily', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch recommended profiles')
      }

      const data = await response.json()
      if (data.success && Array.isArray(data.profiles)) {
        setRecommendedProfiles(data.profiles.map((profile: any) => ({
          ...profile,
          lastSeen: profile.lastSeen ? new Date(profile.lastSeen).toLocaleString() : 'Recently',
          profileImages: profile.profileImage ? [profile.profileImage] : [],
          profession: profile.designation || profile.profession || ''
        })))
      }
    } catch (error) {
      console.error('Error fetching recommended profiles:', error)
      toast.error('Failed to load recommended profiles')
    } finally {
      setIsLoadingRecommendations(false)
    }
  }

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          throw new Error('No authentication token found')
        }

        const response = await fetch('https://bxcfrrl4-3000.inc1.devtunnels.ms/api/message/allUserGet', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.error('API Error Response:', errorText)
          throw new Error(`Error ${response.status}: ${response.statusText}`)
        }

        const responseData = await response.json()
        
        const data = Array.isArray(responseData) 
          ? responseData 
          : (responseData?.data || [])
        
        if (!Array.isArray(data)) {
          console.error('Unexpected API response format:', responseData)
          throw new Error('Invalid response format: expected an array of users')
        }
        
        const mappedProfiles = data.map((user: any) => ({
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
          isMutual: user.isMutual || false,
          isVerified: user.isVerified || false
        } as Profile)).filter((user: Profile | null): user is Profile => user !== null)
        
        setMatches(mappedProfiles)
      } catch (err) {
        console.error('Failed to fetch matches:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch matches')
        toast.error('Failed to load matches. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMatches()
    fetchRecommendedProfiles()
  }, [])

  const filteredProfiles = getFilteredProfiles(matches, activeTab)

  function handleSendConnection(id: string): void {
    toast.success('Connection request sent!')
  }

  function handleShortlist(id: string): void {
    toast.success('Profile added to shortlist!')
  }

  function handleNotNow(id: string): void {
    toast.info('Profile hidden for now')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NavigationTabs 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            tabs={tabs} 
          />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8 bg-white rounded-lg shadow p-6 text-red-600">
            {error}
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {activeTab === 'Recommendation' ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Your Daily Recommendations</h2>
                {isLoadingRecommendations ? (
                  <div className="grid grid-cols-1 gap-6">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="bg-white rounded-xl shadow-md h-96 animate-pulse"></div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {recommendedProfiles.map((profile) => (
                      <RecommendationCard 
                        key={profile._id} 
                        profile={profile}
                        activeTab={activeTab}
                        handleSendConnection={handleSendConnection}
                        handleShortlist={handleShortlist}
                        handleNotNow={handleNotNow}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {activeTab} ({filteredProfiles.length})
                  </h2>
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Filter
                    </button>
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Sort
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProfiles.length > 0 ? (
                    filteredProfiles.map((profile) => (
                      <ProfileCard key={profile.id} profile={profile} />
                    ))
                  ) : (
                    <div className="col-span-3 py-12 text-center bg-white rounded-xl shadow-sm">
                      <p className="text-gray-500">No profiles found matching your criteria</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}