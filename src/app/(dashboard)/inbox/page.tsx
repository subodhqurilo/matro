"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, X, Send, PhoneCall, MessageCircleMore, ClockFading } from "lucide-react"
import Image from "next/image"

interface ReceivedProfile {
  _id: string
  firstName: string
  lastName: string
  id: string
  createdAt: string
  updatedAt: string
  annualIncome: string
  caste: string
  city: string
  dateOfBirth: string
  designation: string
  gender: string
  height: string
  highestEducation: string
  motherTongue: string
  profileImage: string
  religion: string
  state: string
}

interface Request {
  requestId: string
  status: string
  createdAt: string
  user: ReceivedProfile
  acceptedBy?: string
}

interface ApiResponse {
  success: boolean
  requests: Request[]
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
  status: "received" | "acceptedByHer" | "acceptedByMe" | "sent" | "deleted"
  requestId?: string // Added to track requestId for delete operations
}

export default function MatrimonialApp() {
  const [activeTab, setActiveTab] = useState("Received")
  const [activeSubTab, setActiveSubTab] = useState<"Accepted by Her" | "Accepted by Me" | null>(null)
  const [receivedProfiles, setReceivedProfiles] = useState<Profile[]>([])
  const [sentProfiles, setSentProfiles] = useState<Profile[]>([])
  const [acceptedByMeProfiles, setAcceptedByMeProfiles] = useState<Profile[]>([])
  const [acceptedByOthersProfiles, setAcceptedByOthersProfiles] = useState<Profile[]>([])
  const [deletedProfileIds, setDeletedProfileIds] = useState<string[]>([]) // Track deleted profiles
  const [loading, setLoading] = useState(false)

  const apiBase = "https://bxcfrrl4-3000.inc1.devtunnels.ms/api/request/"

  // Transform API response to Profile format
  const transformToProfile = (request: Request): Profile => {
    const birthDate = new Date(request.user.dateOfBirth)
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age

    return {
      id: request.user._id,
      name: `${request.user.firstName} ${request.user.lastName}`,
      profileId: request.user.id,
      lastSeen: "Last seen recently",
      age: actualAge,
      height: request.user.height,
      caste: request.user.caste,
      profession: request.user.designation,
      salary: request.user.annualIncome,
      education: request.user.highestEducation,
      location: `${request.user.city}, ${request.user.state}`,
      languages: [request.user.motherTongue],
      image: request.user.profileImage,
             status: (request.acceptedBy === "other" ? "acceptedByHer" : request.status === "accepted" ? "acceptedByMe" : request.status) as "received" | "acceptedByHer" | "acceptedByMe" | "sent" | "deleted",
      requestId: request.requestId
    }
  }

  // Fetch received requests
  const fetchReceivedRequests = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("authToken") || ""
      const response = await fetch(`${apiBase}received`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
             const data: ApiResponse = await response.json()
       const validProfiles = data.requests?.map(transformToProfile).filter(p => !deletedProfileIds.includes(p.id)) || []
       setReceivedProfiles(validProfiles)
    } catch (error) {
      console.error("Error fetching received requests:", error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch sent requests
  const fetchSentRequests = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("authToken") || ""
      const response = await fetch(`${apiBase}getSendRequest`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
             const data: ApiResponse = await response.json()
       const validProfiles = data.requests?.map(transformToProfile).filter(p => !deletedProfileIds.includes(p.id)) || []
       setSentProfiles(validProfiles)
    } catch (error) {
      console.error("Error fetching sent requests:", error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch accepted by me
  const fetchAcceptedByMe = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("authToken") || ""
      const response = await fetch(`${apiBase}accepted-by-me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
             const data: ApiResponse = await response.json()
       const validProfiles = data.requests?.map(transformToProfile).filter(p => !deletedProfileIds.includes(p.id)) || []
       setAcceptedByMeProfiles(validProfiles)
    } catch (error) {
      console.error("Error fetching accepted by me:", error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch accepted by others
  const fetchAcceptedByOthers = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("authToken") || ""
      const response = await fetch(`${apiBase}accepted-by-others`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
             const data: ApiResponse = await response.json()
       const validProfiles = data.requests?.map(transformToProfile).filter(p => !deletedProfileIds.includes(p.id)) || []
       setAcceptedByOthersProfiles(validProfiles)
    } catch (error) {
      console.error("Error fetching accepted by others:", error)
    } finally {
      setLoading(false)
    }
  }

  // Delete request
  const deleteRequest = async (requestId: string, profileId: string) => {
    try {
      const token = localStorage.getItem("token") || ""
      const response = await fetch(`${apiBase}deleteGet`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestId }),
      })
      const data = await response.json()
      if (data.success) {
        setDeletedProfileIds(prev => [...prev, profileId])
        // Update all profile states to filter out the deleted profile
        setReceivedProfiles(prev => prev.filter(p => p.id !== profileId))
        setSentProfiles(prev => prev.filter(p => p.id !== profileId))
        setAcceptedByMeProfiles(prev => prev.filter(p => p.id !== profileId))
        setAcceptedByOthersProfiles(prev => prev.filter(p => p.id !== profileId))
      } else {
        alert("Failed to delete request")
      }
    } catch (error) {
      console.error("Error deleting request:", error)
      alert("Error deleting request")
    }
  }

  // Fetch all data on mount or when activeTab changes
  useEffect(() => {
    fetchReceivedRequests()
    fetchSentRequests()
    fetchAcceptedByMe()
    fetchAcceptedByOthers()
  }, [])

  const tabs = [
    { name: "Received", count: receivedProfiles.length },
    { name: "Accepted", count: acceptedByMeProfiles.length + acceptedByOthersProfiles.length },
    { name: "Sent", count: sentProfiles.length },
    { name: "Deleted", count: deletedProfileIds.length },
  ]

  const handleSendConnection = (profileId: string) => {
    // Note: No API provided for sending connections, so updating state locally
    setReceivedProfiles(prev =>
      prev.map(p => (p.id === profileId ? { ...p, status: "sent" } : p))
    )
         setSentProfiles(prev => [
       ...prev,
       ...receivedProfiles.filter(p => p.id === profileId).map(p => ({ ...p, status: "sent" as const })),
     ])
  }

  const handleShortlist = (profileId: string) => {
    // Note: No API provided for shortlisting, so updating state locally
    setReceivedProfiles(prev =>
      prev.map(p => (p.id === profileId ? { ...p, status: "acceptedByMe" } : p))
    )
         setAcceptedByMeProfiles(prev => [
       ...prev,
       ...receivedProfiles.filter(p => p.id === profileId).map(p => ({ ...p, status: "acceptedByMe" as const })),
     ])
  }

  const handleNotNow = (profileId: string) => {
    const profile = receivedProfiles.find(p => p.id === profileId)
    if (profile?.requestId) {
      deleteRequest(profile.requestId, profileId)
    }
  }

  const handleDecline = (profileId: string) => {
    const profile = [...receivedProfiles, ...sentProfiles, ...acceptedByMeProfiles, ...acceptedByOthersProfiles].find(
      p => p.id === profileId
    )
    if (profile?.requestId) {
      deleteRequest(profile.requestId, profileId)
    }
  }

  const filteredProfiles = () => {
    if (activeTab === "Received") {
      return receivedProfiles.filter(p => p.status === "received")
    } else if (activeTab === "Accepted") {
      if (activeSubTab === "Accepted by Her") {
        return acceptedByOthersProfiles
      } else if (activeSubTab === "Accepted by Me") {
        return acceptedByMeProfiles
      } else {
        return [...acceptedByMeProfiles, ...acceptedByOthersProfiles]
      }
    } else if (activeTab === "Sent") {
      return sentProfiles
    } else if (activeTab === "Deleted") {
      return [...receivedProfiles, ...sentProfiles, ...acceptedByMeProfiles, ...acceptedByOthersProfiles].filter(p =>
        deletedProfileIds.includes(p.id)
      )
    }
    return []
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
        {loading ? (
          <div className="text-center py-8">
            <div className="text-gray-600">Loading profiles...</div>
          </div>
        ) : filteredProfiles().length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-600">No profiles found</div>
          </div>
        ) : (
          filteredProfiles().map((profile) => (
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
                <div className="flex flex-col space-y-3 items-center border-l border-[#757575] w-[268px] px-8">
                  {activeTab === "Received" && (
                    <>
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
                    </>
                  )}
                  {(activeTab === "Accepted") && (
                    <>
                      <div className="group flex gap-3 items-center border-2 border-[#8E2E37] rounded-full px-6 transition-colors hover:bg-[#8E2E37]">
                        <span className="text-black group-hover:text-white font-Lato">Call</span>
                        <Button
                          size="sm"
                          className="bg-transparent border-none p-0 hover:bg-transparent"
                        >
                          <PhoneCall className="w-4 h-4 text-black group-hover:text-white " />
                        </Button>
                      </div>
                      <div className="group flex gap-3 items-center border-2 border-[#8E2E37] rounded-full px-5 transition-colors hover:bg-[#8E2E37]">
                        <span className="text-black group-hover:text-white font-Lato">Chat</span>
                        <Button
                          size="sm"
                          className="bg-transparent border-none p-0 hover:bg-transparent"
                        >
                          <MessageCircleMore className="w-4 h-4 text-black group-hover:text-white " />
                        </Button>
                      </div>
                      <div className="group flex items-center border-2 border-[#8E2E37] rounded-full px-4 transition-colors hover:bg-[#8E2E37]">
                        <span className="text-black group-hover:text-white font-Lato">Decline</span>
                        <Button
                          size="sm"
                          className="bg-transparent border-none p-0 hover:bg-transparent"
                          onClick={() => handleDecline(profile.id)}
                        >
                          <X className="w-4 h-4 text-black group-hover:text-white" />
                        </Button>
                      </div>
                    </>
                  )}
                  {(activeTab === "Sent") && (
                    <>
                      <div className="group flex gap-3 items-center border-2 border-[#8E2E37] rounded-full px-6 transition-colors hover:bg-[#8E2E37]">
                        <span className="text-black group-hover:text-white font-Lato">Call</span>
                        <Button
                          size="sm"
                          className="bg-transparent border-none p-0 hover:bg-transparent"
                        >
                          <PhoneCall className="w-4 h-4 text-black group-hover:text-white " />
                        </Button>
                      </div>
                      <div className="group flex gap-3 items-center border-2 border-[#8E2E37] rounded-full px-2 transition-colors hover:bg-[#8E2E37]">
                        <span className="text-black group-hover:text-white font-Lato">Pending</span>
                        <Button
                          size="sm"
                          className="bg-transparent border-none p-0 hover:bg-transparent"
                        >
                          <ClockFading className="w-4 h-4 text-black group-hover:text-white " />
                        </Button>
                      </div>
                      <div className="group flex items-center border-2 border-[#8E2E37] rounded-full px-4 transition-colors hover:bg-[#8E2E37]">
                        <span className="text-black group-hover:text-white font-Lato">Decline</span>
                        <Button
                          size="sm"
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
          ))
        )}
      </div>
    </div>
  )
}