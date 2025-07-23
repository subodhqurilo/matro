"use client"
import { useState } from "react"
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
  shortlistType: "theyShortlisted" | "iShortlisted" // Profiles shortlisted by others or by the user
  status: "active" | "shortlisted" | "sent" | "notNow"
}

const initialProfiles: Profile[] = [
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
    shortlistType: "theyShortlisted",
    status: "active"
  },
  {
    id: "2",
    name: "Priya Verma",
    profileId: "P9876669",
    lastSeen: "Last seen 2 hours ago",
    age: 27,
    height: "5'3\"",
    caste: "Kshatriya",
    profession: "Marketing Manager",
    salary: "Earns $7-10 Lakh",
    education: "MBA",
    location: "Mumbai",
    languages: ["Hindi", "English", "Marathi"],
    image: "https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=400",
    shortlistType: "iShortlisted",
    status: "shortlisted"
  }
]

export default function MatrimonialApp() {
  const [activeTab, setActiveTab] = useState("They Shortlisted")
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles)

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
        ))}
      </div>
    </div>
  )
}