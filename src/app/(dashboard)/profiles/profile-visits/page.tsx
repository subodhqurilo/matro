"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, X, Send } from "lucide-react"
import Image from "next/image"

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
  visitorType: "visitor" | "visited"
  status: "active" | "shortlisted" | "sent" | "notNow"
}

interface ApiProfile {
  id: string
  _id: string
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
}

export default function MatrimonialApp() {
  const [activeTab, setActiveTab] = useState("Profile Visitors")
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [token, setToken] = useState<string>("") // Added token state

  const tabs = [
    { name: "Profile Visitors", count: profiles.filter(p => p.visitorType === "visitor" && p.status !== "notNow").length },
    { name: "Profile I Visitors", count: profiles.filter(p => p.visitorType === "visited" && p.status !== "notNow").length }
  ]

  const fetchProfiles = async () => {
    setLoading(true)
    setError(null)
    try {
      setLoading(true)
      setError(null)
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }

      // Fetch profiles I viewed
      const viewedResponse = await fetch("https://bxcfrrl4-3000.inc1.devtunnels.ms/api/profile/view/i-viewed", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      
      const viewedData = await viewedResponse.json()
      
      // Fetch profiles who viewed me
      const visitorsResponse = await fetch("https://bxcfrrl4-3000.inc1.devtunnels.ms/api/profile/view/viewed-me", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      const visitorsData = await visitorsResponse.json()

      // Map API data to Profile interface
      const mapApiProfile = (apiProfile: ApiProfile, visitorType: "visitor" | "visited"): Profile => ({
        id: apiProfile._id,
        name: apiProfile.name,
        profileId: apiProfile.id,
        lastSeen: new Date(apiProfile.lastSeen).toLocaleString(),
        age: apiProfile.age,
        height: apiProfile.height,
        caste: apiProfile.caste,
        profession: apiProfile.designation,
        salary: apiProfile.salary,
        education: apiProfile.education,
        location: apiProfile.location,
        languages: apiProfile.languages.split(",").map(lang => lang.trim()),
        image: apiProfile.profileImage,
        visitorType,
        status: "active"
      })

      const viewedProfiles = viewedData.data.map((profile: ApiProfile) => mapApiProfile(profile, "visited"))
      const visitorProfiles = visitorsData.data.map((profile: ApiProfile) => mapApiProfile(profile, "visitor"))

      setProfiles([...viewedProfiles, ...visitorProfiles])
    } catch (err) {
      setError("Failed to fetch profiles. Please try again later.")
      console.error(err);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfiles()
  }, [])

  const handleSendConnection = (profileId: string) => {
    setProfiles(profiles.map(p => 
      p.id === profileId ? { ...p, status: "sent" } : p
    ))
  }

  const handleShortlist = (profileId: string) => {
    setProfiles(profiles.map(p => 
      p.id === profileId ? { ...p, status: "shortlisted" } : p
    ))
  }

  const handleNotNow = (profileId: string) => {
    setProfiles(profiles.map(p => 
      p.id === profileId ? { ...p, status: "notNow" } : p
    ))
  }

  const filteredProfiles = () => {
    if (activeTab === "Profile Visitors") {
      return profiles.filter(p => p.visitorType === "visitor" && p.status !== "notNow")
    } else if (activeTab === "Profile I Visitors") {
      return profiles.filter(p => p.visitorType === "visited" && p.status !== "notNow")
    }
    return profiles
  }

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading profiles...</div>
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-evenly overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`py-4 px-2 whitespace-nowrap text-sm font-medium border-b-2 transition-colors font-Lato  ${
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
      {/* Profile Cards */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {filteredProfiles().map((profile) => (
          <Card key={profile.id} className="p-6 bg-white rounded-lg border border-[#7D0A0A]">
            <div className="flex items-start space-x-6">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 border border-gray-300">
                  <Image
                    src={profile.image || "/placeholder.svg"}
                    alt={profile.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Profile Details */}
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
                    <span className="font-Lato">{profile.age} Yrs</span> . {profile.height.replace(/"/g, '&quot;')} . {profile.caste}
                  </p>
                  <p className="text-[#1E1E1E]">
                    {profile.profession} . {profile.salary}
                  </p>
                  <p className="text-[#1E1E1E]">{profile.education}</p>
                  <p className="text-[#1E1E1E]">{profile.location}</p>
                  <p className="text-[#1E1E1E]">{profile.languages.join(",")}</p>
                </div>
              </div>
              {/* Action Buttons */}
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
                    disabled={profile.status === "shortlisted" || profile.status === "sent"}
                  >
                    <Heart className={`w-4 h-4 ${profile.status === "shortlisted" ? "text-red-500 fill-red-500" : "text-[#8E2E37]"}`} />
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
        ))}
      </div>
    </div>
  )
}