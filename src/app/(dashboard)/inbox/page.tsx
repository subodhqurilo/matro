"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, X, Send, PhoneCall, MessageCircleMore } from "lucide-react"
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
  status: "received" | "acceptedByHer" | "acceptedByMe" | "sent" | "deleted"
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
    status: "received"
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
    status: "acceptedByHer"
  },
  {
    id: "3",
    name: "Neha Gupta",
    profileId: "P9876670",
    lastSeen: "Last seen 30 minutes ago",
    age: 29,
    height: "5'6\"",
    caste: "Vaishya",
    profession: "Doctor",
    salary: "Earns $10-15 Lakh",
    education: "MBBS",
    location: "Bangalore",
    languages: ["Hindi", "English", "Kannada"],
    image: "https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=400",
    status: "acceptedByMe"
  },
  {
    id: "4",
    name: "Sanya Mehra",
    profileId: "P9876671",
    lastSeen: "Last seen 3 hours ago",
    age: 26,
    height: "5'4\"",
    caste: "Brahmin",
    profession: "Teacher",
    salary: "Earns $3-5 Lakh",
    education: "M.Ed",
    location: "Chennai",
    languages: ["Hindi", "English", "Tamil"],
    image: "https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=400",
    status: "sent"
  }
]

export default function MatrimonialApp() {
  const [activeTab, setActiveTab] = useState("Received")
  const [activeSubTab, setActiveSubTab] = useState<"Accepted by Her" | "Accepted by Me" | null>(null)
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles)

  const tabs = [
    { name: "Received", count: profiles.filter(p => p.status === "received").length },
    { name: "Accepted", count: profiles.filter(p => p.status === "acceptedByHer" || p.status === "acceptedByMe").length },
    { name: "Sent", count: profiles.filter(p => p.status === "sent").length },
    { name: "Deleted", count: profiles.filter(p => p.status === "deleted").length }
  ]

  const handleSendConnection = (profileId: string) => {
    setProfiles(profiles.map(p => 
      p.id === profileId ? { ...p, status: "sent" } : p
    ))
  }

  const handleShortlist = (profileId: string) => {
    setProfiles(profiles.map(p => 
      p.id === profileId ? { ...p, status: "acceptedByMe" } : p
    ))
  }

  const handleNotNow = (profileId: string) => {
    setProfiles(profiles.map(p => 
      p.id === profileId ? { ...p, status: "deleted" } : p
    ))
  }

  const handleDecline = (profileId: string) => {
    setProfiles(profiles.map(p => 
      p.id === profileId ? { ...p, status: "deleted" } : p
    ))
  }

  const filteredProfiles = () => {
    if (activeTab === "Received") {
      return profiles.filter(p => p.status === "received")
    } else if (activeTab === "Accepted") {
      if (activeSubTab === "Accepted by Her") {
        return profiles.filter(p => p.status === "acceptedByHer")
      } else if (activeSubTab === "Accepted by Me") {
        return profiles.filter(p => p.status === "acceptedByMe")
      } else {
        return profiles.filter(p => p.status === "acceptedByHer" || p.status === "acceptedByMe")
      }
    } else if (activeTab === "Sent") {
      return profiles.filter(p => p.status === "sent")
    } else if (activeTab === "Deleted") {
      return profiles.filter(p => p.status === "deleted")
    }
    return profiles
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex gap-10 overflow-x-auto items-center justify-evenly">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => {
                  setActiveTab(tab.name)
                  if (tab.name !== "Accepted") setActiveSubTab(null)
                }}
                className={`py-4 px-2 whitespace-nowrap text-sm font-medium border-b-2 transition-colors font-Lato ${
                  activeTab === tab.name
                    ? "border-red-500 text-red-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.name}
                {tab.count !== null && ` (${tab.count})`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sub-tabs for Accepted */}
      {activeTab === "Accepted" && (
        <div className="flex gap-3 items-center justify-center mt-8">
          <Button
            className={`items-center border-2 border-[#8E2E37] rounded-full text-black hover:text-white bg-white transition-colors hover:bg-[#8E2E37] px-8 py-4 ${
              activeSubTab === "Accepted by Her" ? "bg-[#8E2E37] text-white" : ""
            }`}
            onClick={() => setActiveSubTab("Accepted by Her")}
          >
            Accepted by Her
          </Button>
          <Button
            className={`items-center border-2 border-[#8E2E37] rounded-full text-black hover:text-white bg-white transition-colors hover:bg-[#8E2E37] px-8 py-4 ${
              activeSubTab === "Accepted by Me" ? "bg-[#8E2E37] text-white" : ""
            }`}
            onClick={() => setActiveSubTab("Accepted by Me")}
          >
            Accepted by Me
          </Button>
        </div>
      )}

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
                    <span className="font-Lato">{profile.age} Yrs</span> . {profile.height} . {profile.caste}
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
              <div className="flex flex-col space-y-3 items-center border-l border-[#757575] w-[268px] px-8">
                {activeTab === "Received" && (
                  <>
                    <div className="flex gap-6 items-center">
                      <div className="text-regular text-gray-600 mb-2 font-Lato mt-2">Send Connection</div>
                      <Button
                        className="bg-gradient-to-r from-[#2BFF88] to-[#2BD2FF] text-white rounded-full w-12 h-12 p-0"
                        size="sm"
                        onClick={() => handleSendConnection(profile.id)}
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
                      >
                        <Heart className="w-4 h-4 text-[#8E2E37]" />
                      </Button>
                    </div>
                    <div className="flex gap-6 items-center">
                      <div className="text-regular text-gray-600 font-Lato">Not Now</div>
                      <Button
                        variant="outline"
                        className="bg-[#ADADAD] hover:bg-gray-50 rounded-full w-12 h-12 p-0"
                        size="sm"
                        onClick={() => handleNotNow(profile.id)}
                      >
                        <X className="w-4 h-4 text-gray-600" />
                      </Button>
                    </div>
                  </>
                )}
                {(activeTab === "Accepted" || activeTab === "Sent") && (
                  <>
                    <div className="group flex gap-3 items-center border-2 border-[#8E2E37] rounded-full px-6 transition-colors hover:bg-[#8E2E37]">
                      <span className="text-black group-hover:text-white font-Lato">Call</span>
                      <Button
                        size="icon"
                        className="bg-transparent border-none p-0 hover:bg-transparent"
                      >
                        <PhoneCall className="w-4 h-4 text-black group-hover:text-white" />
                      </Button>
                    </div>
                    <div className="group flex gap-3 items-center border-2 border-[#8E2E37] rounded-full px-6 transition-colors hover:bg-[#8E2E37]">
                      <span className="text-black group-hover:text-white font-Lato">
                        {activeTab === "Sent" ? "Pending" : "Chat"}
                      </span>
                      <Button
                        size="icon"
                        className="bg-transparent border-none p-0 hover:bg-transparent"
                      >
                        {activeTab === "Sent" ? (
                          <img
                            src="/assets/pending.png"
                            alt="Pending"
                            className="h-[20px] w-[20px] text-black group-hover:text-white"
                          />
                        ) : (
                          <MessageCircleMore className="w-4 h-4 text-black group-hover:text-white" />
                        )}
                      </Button>
                    </div>
                    <div className="group flex items-center border-2 border-[#8E2E37] rounded-full px-6 transition-colors hover:bg-[#8E2E37]">
                      <span className="text-black group-hover:text-white font-Lato">Decline</span>
                      <Button
                        size="default"
                        className="bg-transparent border-none p-0 hover:bg-transparent"
                        onClick={() => handleDecline(profile.id)}
                      >
                        <X className="w-4 h-4 text-black group-hover:text-white" />
                      </Button>
                    </div>
                  </>
                )}
                {activeTab === "Deleted" && (
                  <div className="text-gray-600 font-Lato">Profile Deleted</div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}