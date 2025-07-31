"use client"
import { useState, useEffect } from "react"
import NavigationTabs from "./_components/NavigationTabs"
import ProfileCard from "./_components/ProfileCard"
import { getFilteredProfiles } from "@/utils/profileFilters"
import { toast } from "sonner"
import { Profile } from "@/types/Profile"
import Image from "next/image"

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
    { name: "Recommendation", count: null },
    { name: "Profiles with photo", count: null },
    { name: "Mutual Matches", count: null },
    { name: "Verified", count: null },
  ]

  const fetchRecommendedProfiles = async () => {
    try {
      setIsLoadingRecommendations(true)
      // No authentication required for daily recommendations

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
        console.log('API Response Data:', responseData) // Debug log
        
        // Handle case where response might be an object with a data property
        const data = Array.isArray(responseData) 
          ? responseData 
          : (responseData?.data || [])
        
        if (!Array.isArray(data)) {
          console.error('Unexpected API response format:', responseData)
          throw new Error('Invalid response format: expected an array of users')
        }
        
        // Map API response to Profile type
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
          // Explicitly type the object to match Profile interface
          isNew: true as boolean,
          hasPhoto: !!user.image,
          isMutual: false,
          isVerified: false
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

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationTabs 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        tabs={tabs} 
      />
      
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-600">
            {error}
          </div>
        ) : (
          <div>
            {activeTab === 'Recommendation' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {isLoadingRecommendations ? (
                  <div>Loading recommendations...</div>
                ) : recommendedProfiles.length > 0 ? (
                  recommendedProfiles.map((profile) => (
                    <div key={profile._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="relative h-64 w-full">
                        {profile.profileImage ? (
                          <Image
                            src={profile.profileImage}
                            alt={profile.name}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-t-lg"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">No image</span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-semibold">{profile.name}, {profile.age}</h3>
                          <span className="text-sm text-gray-500">{profile.lastSeen}</span>
                        </div>
                        <p className="text-gray-600">{profile.location}</p>
                        
                        <div className="mt-4 space-y-2">
                          {profile.profession && (
                            <p className="text-sm"><span className="font-medium">Profession:</span> {profile.profession}</p>
                          )}
                          {profile.education && (
                            <p className="text-sm"><span className="font-medium">Education:</span> {profile.education}</p>
                          )}
                          {profile.height && (
                            <p className="text-sm"><span className="font-medium">Height:</span> {profile.height}</p>
                          )}
                          {profile.religion && (
                            <p className="text-sm"><span className="font-medium">Religion:</span> {profile.religion}</p>
                          )}
                          {profile.salary && (
                            <p className="text-sm"><span className="font-medium">Salary:</span> {profile.salary}</p>
                          )}
                          {profile.languages && (
                            <p className="text-sm">
                              <span className="font-medium">Languages:</span> {
                                Array.isArray(profile.languages) 
                                  ? profile.languages.join(', ')
                                  : String(profile.languages || '')
                              }
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">No recommended profiles found</div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {isLoading ? (
                  <div>Loading matches...</div>
                ) : error ? (
                  <div className="text-red-500">{error}</div>
                ) : (
                  filteredProfiles.map((profile) => (
                    <ProfileCard key={profile.id} profile={profile} />
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}