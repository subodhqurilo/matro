"use client"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
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
  shortlistType: "theyShortlisted"
  status: "active" | "shortlisted" | "sent" | "notNow"
}

const API_BASE_URL = "http://localhost:3000/api/like/theyShortlist"

export default function TheyShortlisted() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTheyShortlistedProfiles = async () => {
    try {
      setLoading(true)
      setError(null)

      const token = localStorage.getItem("authToken")
      if (!token) throw new Error("No authentication token found. Please log in.")

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }

      const res = await fetch(API_BASE_URL, { method: "GET", headers })
      if (!res.ok) throw new Error("Failed to fetch They Shortlisted profiles")

      const data: ApiResponse = await res.json()
      if (data.success && data.data) {
        setProfiles(
          data.data.map((profile) => ({
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
            languages: profile.languages ? profile.languages.split(",").map(l => l.trim()) : ["Not specified"],
            image:
              profile.profileImage ||
              "https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=400",
            shortlistType: "theyShortlisted",
            status: "shortlisted",
          }))
        )
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTheyShortlistedProfiles()
  }, [])

  if (loading) return <p className="text-center">Loading They Shortlisted profiles...</p>
  if (error) return <p className="text-center text-red-500">{error}</p>
  if (profiles.length === 0)
    return <p className="text-center py-6">No profiles found.</p>

  return (
    <div className="space-y-4">
      {profiles.map((profile) => (
        <Card key={profile.id} className="p-6 bg-white rounded-lg border border-[#7D0A0A]">
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300">
              <Image src={profile.image} alt={profile.name} width={96} height={96} className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold">{profile.name}</h3>
              <p className="text-sm text-gray-500">{profile.profileId} | {profile.lastSeen}</p>
              <p>{profile.age} Yrs · {profile.height} · {profile.caste}</p>
              <p>{profile.profession} · {profile.salary}</p>
              <p>{profile.education}</p>
              <p>{profile.location}</p>
              <p>{profile.languages.join(", ")}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
