"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PhoneCall, X, MessageCircleMore, Check, Send, Heart } from "lucide-react"
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
  isVerified?: boolean
  isMutual?: boolean
  hasPhoto?: boolean
  isNew?: boolean
}

const profiles: Profile[] = [
  {
    id: "1",
    name: "Aaradhya Sharma",
    profileId: "P9876668",
    lastSeen: "Last seen an hour ago",
    age: 28,
    height: "5'5\"",
    caste: "Brahmin",
    profession: "Software Developer",
    salary: "Earns $5-7 Lakh",
    education: "B.Tech in computer science",
    location: "Delhi",
    languages: ["Hindi", "English"],
    image: "https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=400",
    isVerified: true,
    isMutual: true,
    hasPhoto: true,
    isNew: false,
  },
  {
    id: "2",
    name: "Kavya Mehta",
    profileId: "P1234567",
    lastSeen: "Online now",
    age: 27,
    height: "5'3\"",
    caste: "Vaishya",
    profession: "Doctor",
    salary: "Earns $10-12 Lakh",
    education: "MBBS",
    location: "Mumbai",
    languages: ["Gujarati", "English"],
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400",
    isVerified: false,
    isMutual: false,
    hasPhoto: true,
    isNew: true,
  },
]

const tabs = [
  { name: "All Matches", count: null },
  { name: "Newly Matches", count: null },
  { name: "Profiles with photo", count: null },
  { name: "Mutual Matches", count: null },
  { name: "Verified", count: null },
]

export default function VerifiedTabsPage() {
  const [activeTab, setActiveTab] = useState("All Matches")

  const getFilteredProfiles = () => {
    switch (activeTab) {
      case "Newly Matches":
        return profiles.filter((p) => p.isNew)
      case "Profiles with photo":
        return profiles.filter((p) => p.hasPhoto)
      case "Mutual Matches":
        return profiles.filter((p) => p.isMutual)
      case "Verified":
        return profiles.filter((p) => p.isVerified)
      default:
        return profiles
    }
  }

  const filteredProfiles = getFilteredProfiles()

  // Add handler for sending connection
  const handleSendConnection = (profileId: string) => {
    // Implement your logic here (e.g., API call, toast, etc.)
    console.log(`Send connection to profile ${profileId}`)
  }

  // Add handler for shortlist action
  const handleShortlist = (profileId: string) => {
    // Implement your logic here (e.g., API call, toast, etc.)
    console.log(`Shortlisted profile ${profileId}`)
  }

  // Add handler for "Not Now" action
  const handleNotNow = (profileId: string) => {
    // Implement your logic here (e.g., API call, toast, etc.)
    console.log(`Not now for profile ${profileId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex space-x-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`py-4 px-2 whitespace-nowrap text-sm font-medium border-b-2 font-Lato ${activeTab === tab.name
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
              >
                {tab.name}
                {tab.count ? ` (${tab.count})` : ""}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards (mobile + desktop responsive) */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {filteredProfiles.map((profile) => (
          <Card
            key={profile.id}
            className="p-4 sm:p-6 bg-white rounded-lg border border-[#7D0A0A] shadow-sm"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center w-full">
              {/* Left: Profile Image */}
              <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300">
                  <Image
                    src={profile.image || "/placeholder.svg"}
                    alt={profile.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Middle: Profile Info */}
              <div className="flex-1 border-b sm:border-b-0 sm:border-r border-[#757575] pr-0 sm:pr-6 w-full sm:w-auto">
                <div className="mb-1 flex items-center space-x-1">
                  <h3 className="text-lg font-semibold text-[#1E1E1E]">{profile.name}</h3>
                  {activeTab === "Verified" && profile.isVerified && (
                    <img src='/Images/blue tick.png' alt='blue tick' className="w-4 h-4 " />
                  )}
                </div>
                <p className="text-sm text-gray-500 mb-3 border-b border-[#757575] py-2">
                  {profile.profileId} | {profile.lastSeen}
                </p>
                <p className="text-sm text-[#1E1E1E] mb-1">
                  {profile.age} Yrs · {profile.height} · {profile.caste}
                </p>
                <p className="text-sm text-[#1E1E1E] mb-1">
                  {profile.profession} · {profile.salary}
                </p>
                <p className="text-sm text-[#1E1E1E] mb-1">{profile.education}</p>
                <p className="text-sm text-[#1E1E1E] mb-1">{profile.location}</p>
                <p className="text-sm text-[#1E1E1E]">{profile.languages.join(", ")}</p>
              </div>

              {/* Right: Action Buttons */}
              <div className="flex flex-col items-center justify-center space-y-2 mt-4 sm:mt-0 sm:pl-6 w-full sm:w-auto">
                <div className="flex gap-6 items-center">
                  <div className="text-regular text-[#000000] mb-2 font-Lato mt-2">Send Connection</div>
                  <Button
                    className="bg-gradient-to-r from-[#2BFF88] to-[#2BD2FF] text-white rounded-full w-12 h-12 p-0"
                    size="sm"
                    onClick={() => handleSendConnection(profile.id)}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex gap-6 items-center">
                  <div className="text-regular text-[#000000] mb-2 font-Lato ml-16">Shortlist</div>
                  <Button
                    variant="outline"
                    className="border-[#F2F2F2] hover:bg-gray-50 rounded-full w-12 h-12 p-0 bg-transparent "
                    size="sm"
                    onClick={() => handleShortlist(profile.id)}
                  >
                    <Heart className="w-4 h-4 text-[#8E2E37] " />
                  </Button>
                </div>
                <div className="flex gap-6 items-center">
                  <div className="text-regular text-[#000000] font-Lato ml-16">Not Now</div>
                  <Button
                    variant="outline"
                    className="bg-[#ADADAD] hover:bg-gray-50 rounded-full w-12 h-12 p-0"
                    size="sm"
                    onClick={() => handleNotNow(profile.id)}
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
