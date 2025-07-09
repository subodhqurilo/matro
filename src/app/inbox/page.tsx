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
  timeAgo: string
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
    timeAgo: "Few hours ago",
  },
  {
    id: "2",
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
    timeAgo: "Two hours ago",
  },
]

export default function MatrimonialApp() {
  const [activeTab, setActiveTab] = useState("All Matches")

  const tabs = [
    { name: "All Matches", count: 32 },
    { name: "Newly Matches", count: null },
    { name: "Profiles with photo", count: null },
    { name: "Mutual Matches", count: null },
    { name: "Verified", count: null },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`py-4 px-2 whitespace-nowrap text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.name
                    ? "border-red-500 text-red-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.name}
                {tab.count && `(${tab.count})`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Cards */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {profiles.map((profile) => (
          <Card key={profile.id} className="p-6 bg-white rounded-lg border border-gray-200">
            <div className="flex items-start space-x-6">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
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
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{profile.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">
                      {profile.profileId} | {profile.lastSeen}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap ml-4">{profile.timeAgo}</span>
                </div>

                <div className="space-y-1 text-sm">
                  <p className="text-gray-700">
                    <span className="font-medium">{profile.age} Yrs</span> . {profile.height}&quot; . {profile.caste}
                  </p>
                  <p className="text-gray-700">
                    {profile.profession} . {profile.salary}
                  </p>
                  <p className="text-gray-700">{profile.education}</p>
                  <p className="text-gray-700">{profile.location}</p>
                  <p className="text-gray-700">{profile.languages.join(",")}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-3 items-end">
                <Button className="bg-green-500 hover:bg-green-600 text-white rounded-full w-12 h-12 p-0" size="sm">
                  <Send className="w-4 h-4" />
                </Button>
                <div className="text-xs text-gray-600 mb-2">Send Connection</div>

                <Button
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-50 rounded-full w-12 h-12 p-0 bg-transparent"
                  size="sm"
                >
                  <Heart className="w-4 h-4 text-gray-600" />
                </Button>
                <div className="text-xs text-gray-600 mb-2">Shortlist</div>

                <Button
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-50 rounded-full w-12 h-12 p-0 bg-gray-100"
                  size="sm"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </Button>
                <div className="text-xs text-gray-600">Not Now</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
