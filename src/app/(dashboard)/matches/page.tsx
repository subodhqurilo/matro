"use client"
import { useState, useEffect } from "react"
import NavigationTabs from "./_components/NavigationTabs"
import ProfileCard from "./_components/ProfileCard"
import { getFilteredProfiles } from "@/utils/profileFilters"
import { toast } from "sonner"
import { Profile } from "@/types/Profile"

interface ApiUser {
  _id: string;
  name: string;
  profileId: string;
  lastSeen: string;
  age: number;
  height: string;
  caste: string;
  profession: string;
  salary: string;
  education: string;
  location: string;
  languages: string[];
  image: string;
  // Add any additional fields from the API response here
  [key: string]: any;
}

export default function MatrimonialApp() {
  const [activeTab, setActiveTab] = useState("All Matches")
  const [matches, setMatches] = useState<Profile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const tabs = [
    { name: "All Matches", count: matches.length },
    { name: "Newly Matches", count: null },
    { name: "Profiles with photo", count: null },
    { name: "Mutual Matches", count: null },
    { name: "Verified", count: null },
  ]

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
          : responseData?.data || []
          
        if (!Array.isArray(data)) {
          console.error('Unexpected API response format:', responseData)
          throw new Error('Invalid response format: expected an array of users')
        }
        
        // Map API response to Profile type
        const mappedProfiles: Profile[] = data.map(user => {
          if (!user || typeof user !== 'object') {
            console.warn('Invalid user data:', user)
            return null
          }
          
          return {
            id: user._id || user.id || '',
            name: user.name || 'Unknown',
            profileId: user.profileId || '',
            lastSeen: user.lastSeen || new Date().toISOString(),
            age: typeof user.age === 'number' ? user.age : 0,
            height: user.height || '',
            caste: user.caste || '',
            profession: user.profession || '',
            salary: user.salary || '',
            education: user.education || '',
            location: user.location || '',
            languages: Array.isArray(user.languages) ? user.languages : [],
            image: user.image || '/default-avatar.png',
            // Set default values for filter properties
            isNew: true,
            hasPhoto: !!user.image,
            isMutual: false,
            isVerified: false
          }
        }).filter((user): user is Profile => user !== null)
        
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
        ) : filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No matches found
          </div>
        )}
      </div>
    </div>
  )
}