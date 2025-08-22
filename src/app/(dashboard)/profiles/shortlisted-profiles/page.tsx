"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, X, Send } from "lucide-react"
import Image from "next/image"

interface ShortlistedProfile {
  _id: string
  id: string
  name: string
  age: number
  height: string
  caste: string
  designation: string
  religion: string
  salary: string
  education: string
  location: string
  languages: string
  gender: string
  profileImage: string
  lastSeen: string
  viewedAt: string
}

interface ApiResponse {
  success: boolean
  data: ShortlistedProfile[]
}

interface Profile {
  id: string
  name: string
  profileId: string
  lastSeen: string
  age: number
  height: string
  caste: string
  profession: string
  salary: string
  education: string
  location: string
  languages: string[]
  image: string
  shortlistType: "theyShortlisted" | "iShortlisted"
  status: "active" | "shortlisted" | "sent" | "notNow"
}

const API_BASE_URL = 'https://393rb0pp-3000.inc1.devtunnels.ms/api/like/'

export default function MatrimonialApp() {
  const [activeTab, setActiveTab] = useState("They Shortlisted")
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchShortlistedProfiles = async () => {
    try {
      setLoading(true)
      setError(null)
      const token = localStorage.getItem('authToken')
      if (!token) {
        throw new Error('No authentication token found. Please log in.')
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }

      const [iShortlistResponse, theyShortlistResponse] = await Promise.all([
        fetch(`${API_BASE_URL}iShortlist`, { method: 'GET', headers }),
        fetch(`${API_BASE_URL}theyShortlist`, { method: 'GET', headers })
      ])

      if (!iShortlistResponse.ok || !theyShortlistResponse.ok) {
        throw new Error('Failed to fetch shortlisted profiles')
      }

      const iShortlistData: ApiResponse = await iShortlistResponse.json()
      const theyShortlistData: ApiResponse = await theyShortlistResponse.json()

      const transformedProfiles: Profile[] = []

      // Transform I Shortlisted profiles
      if (iShortlistData.success && iShortlistData.data) {
        transformedProfiles.push(...iShortlistData.data.map(profile => ({
          id: profile._id,
          name: profile.name || "Not specified",
          profileId: profile.id,
          lastSeen: profile.lastSeen ? new Date(profile.lastSeen).toLocaleString() : "Recently active",
          age: profile.age || 0,
          height: profile.height || "Not specified",
          caste: profile.caste || "Not specified",
          profession: profile.designation || "Not specified",
          salary: profile.salary || "Not specified",
          education: profile.education || "Not specified",
          location: profile.location || "Not specified",
          languages: profile.languages ? profile.languages.split(",") : ["Not specified"],
          image: profile.profileImage || "https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=400",
          shortlistType: "iShortlisted" as const,
          status: "shortlisted" as const
        })))
      }

      // Transform They Shortlisted profiles
      if (theyShortlistData.success && theyShortlistData.data) {
        transformedProfiles.push(...theyShortlistData.data.map(profile => ({
          id: profile._id,
          name: profile.name || "Not specified",
          profileId: profile.id,
          lastSeen: profile.lastSeen ? new Date(profile.lastSeen).toLocaleString() : "Recently active",
          age: profile.age || 0,
          height: profile.height || "Not specified",
          caste: profile.caste || "Not specified",
          profession: profile.designation || "Not specified",
          salary: profile.salary || "Not specified",
          education: profile.education || "Not specified",
          location: profile.location || "Not specified",
          languages: profile.languages ? profile.languages.split(",") : ["Not specified"],
          image: profile.profileImage || "https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=400",
          shortlistType: "theyShortlisted" as const,
          status: "active" as const
        })))
      }

      setProfiles(transformedProfiles)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching shortlisted profiles:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchShortlistedProfiles()
  }, [])

  const tabs = [
    { name: "They Shortlisted", count: profiles.filter(p => p.shortlistType === "theyShortlisted" && p.status !== "notNow").length },
    { name: "I Shortlisted", count: profiles.filter(p => p.shortlistType === "iShortlisted" && p.status !== "notNow").length }
  ]

  const handleSendConnection = (profileId: string) => {
    setProfiles(profiles.map(p => 
      p.id === profileId ? { ...p, status: "sent" } : p
    ))
  }

  const handleShortlist = (profileId: string) => {
    setProfiles(profiles.map(p => 
      p.id === profileId ? { ...p, status: "shortlisted", shortlistType: "iShortlisted" } : p
    ))
  }

  const handleNotNow = (profileId: string) => {
    setProfiles(profiles.map(p => 
      p.id === profileId ? { ...p, status: "notNow" } : p
    ))
  }

  const filteredProfiles = () => {
    if (activeTab === "They Shortlisted") {
      return profiles.filter(p => p.shortlistType === "theyShortlisted" && p.status !== "notNow")
    } else if (activeTab === "I Shortlisted") {
      return profiles.filter(p => p.shortlistType === "iShortlisted" && p.status !== "notNow")
    }
    return profiles
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7D0A0A] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading shortlisted profiles...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchShortlistedProfiles} className="bg-[#7D0A0A] text-white">
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-evenly overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`py-4 px-2 whitespace-nowrap text-sm font-medium border-b-2 transition-colors font-Lato ${
                  activeTab === tab.name
                    ? "border-[#7D0A0A] text-[#7D0A0A]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.name} {tab.count !== null && `(${tab.count})`}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {filteredProfiles().length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No {activeTab.toLowerCase()} profiles found.</p>
          </div>
        ) : (
          filteredProfiles().map((profile) => (
            <Card key={profile.id} className="p-6 bg-white rounded-lg border border-[#7D0A0A]">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 border border-gray-300">
                    <Image
                      src={profile.image}
                      alt={profile.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="border-b border-[#757575] w-full font-Lato">
                      <h3 className="text-lg font-semibold font-Lato text-[#1E1E1E] mb-1">{profile.name}</h3>
                      <p className="text-sm text-[#7A7A7A] mb-3">
                        {profile.profileId} | {profile.lastSeen}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm mt-2 text-regular">
                    <p className="text-[#1E1E1E]">
                      <span className="font-Lato">{profile.age} Yrs</span> . {profile.height} . {profile.caste}
                    </p>
                    <p className="text-[#1E1E1E]">
                      {profile.profession} . {profile.salary}
                    </p>
                    <p className="text-[#1E1E1E]">{profile.education}</p>
                    <p className="text-[#1E1E1E]">{profile.location}</p>
                    <p className="text-[#1E1E1E]">{profile.languages.join(", ")}</p>
                  </div>
                </div>
                <div className="flex flex-col space-y-3 items-end border-l border-[#757575] w-[268px] px-8">
                  <div className="flex gap-6">
                    <div className="text-regular text-gray-600 mb-2 font-Lato mt-2">Send Connection</div>
                    <Button
                      className="bg-gradient-to-r from-[#2BFF88] to-[#2BD2FF] text-white rounded-full w-12 h-12 p-0"
                      size="sm"
                      onClick={() => handleSendConnection(profile.id)}
                      disabled={profile.status === "sent" || profile.status === "shortlisted"}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex gap-6 items-center">
                    <div className="text-regular text-gray-600 mb-2 font-Lato">Shortlist</div>
                    <Button
                      variant="outline"
                      className="border-[#F2F2F2] hover:bg-gray-50 rounded-full w-12 h-12 p-0 bg-transparent"
                      size="sm"
                      onClick={() => handleShortlist(profile.id)}
                      disabled={profile.status === "shortlisted" || profile.shortlistType === "iShortlisted"}
                    >
                      <Heart className={`w-4 h-4 ${profile.shortlistType === "iShortlisted" || profile.status === "shortlisted" ? "text-red-500 fill-red-500" : "text-[#8E2E37]"}`} />
                    </Button>
                  </div>
                  <div className="flex gap-6 items-center">
                    <div className="text-regular text-gray-600 font-Lato">Not Now</div>
                    <Button
                      variant="outline"
                      className="bg-[#ADADAD] hover:bg-gray-50 rounded-full w-12 h-12 p-0"
                      size="sm"
                      onClick={() => handleNotNow(profile.id)}
                      disabled={profile.status === "notNow"}
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}