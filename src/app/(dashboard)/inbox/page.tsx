
"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, X, Send, MessageCircleMore, ClockFading, Check } from "lucide-react"
import Image from "next/image"
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


interface ReceivedProfile {
  _id: string
  name: string
  id: string
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

interface Request {
  requestId: string
  status: string
  createdAt: string
  user: ReceivedProfile | {
    _id: string
    firstName: string
    lastName: string
    id: string
    createdAt: string
    updatedAt: string
    annualIncome?: string
    caste?: string
    city?: string
    dateOfBirth?: string
    designation?: string
    gender?: string
    height?: string
    highestEducation?: string
    motherTongue?: string
    profileImage?: string
    religion?: string
    state?: string
  }
  acceptedBy?: string
}

interface ApiResponse {
  success: boolean
  data?: ReceivedProfile[]
  requests?: Request[]
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
  status: "received" | "acceptedByHer" | "acceptedByMe" | "sent" | "rejected" | "deleted"
  requestId?: string
}
interface RejectedProfile extends Profile {
  originalStatus: Profile["status"];
  status: "rejected" | "deleted"; // override status to only allow rejected/deleted
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  isOnline: boolean;
  unreadCount?: number;
  messages?: { sender: string; text: string }[];
}

export default function MatrimonialApp() {
  const [activeTab, setActiveTab] = useState("Received")
  const [activeSubTab, setActiveSubTab] = useState<"Accepted by Her" | "Accepted by Me" | null>(null)
  const [receivedProfiles, setReceivedProfiles] = useState<Profile[]>([])
  const [sentProfiles, setSentProfiles] = useState<Profile[]>([])
  const [acceptedByMeProfiles, setAcceptedByMeProfiles] = useState<Profile[]>([])
  const [acceptedByOthersProfiles, setAcceptedByOthersProfiles] = useState<Profile[]>([])
  const [deletedProfiles, setDeletedProfiles] = useState<RejectedProfile[]>([]);
  const [rejectedProfiles, setRejectedProfiles] = useState<RejectedProfile[]>([]);
  const [selectedChatUser, setSelectedChatUser] = useState<Profile | null>(null);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [messagesMap, setMessagesMap] = useState<Record<string, { sender: string; text: string }[]>>({});
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
const router = useRouter();

  const [loading, setLoading] = useState(false)


  const apiBase = "https://matrimonial-backend-7ahc.onrender.com/api/request";

  const transformToProfile = (
    item: Request | ReceivedProfile,
    requestId?: string
  ): Profile | null => {
    if (!item) return null;

    const profileData: any = "user" in item ? item.user : item;
    if (!profileData) return null; // skip if null

    const birthDate = profileData.dateOfBirth
      ? new Date(profileData.dateOfBirth)
      : null;
    const age =
      profileData.age ||
      (birthDate
        ? Math.floor(
          (new Date().getTime() - birthDate.getTime()) /
          (365.25 * 24 * 60 * 60 * 1000)
        )
        : 0);

    // Determine status
    let status: Profile["status"] = "received";

    if ("acceptedBy" in item) {
      status = item.acceptedBy === "me" ? "acceptedByMe" : "acceptedByHer";
    } else if ("status" in item) {
      switch (item.status) {
        case "accepted":
          status = "acceptedByMe";
          break;
        case "sent":
          status = "sent";
          break;
        case "pending":
        case "received":
          status = "received";
          break;
        default:
          status = "received";
      }
    }


    return {
      id: profileData._id || "",
      name:
        profileData.name ||
        [profileData.firstName, profileData.lastName].filter(Boolean).join(" ") ||
        "Unknown",
      profileId: profileData.id || "",
      lastSeen: profileData.lastSeen || "Last seen recently",
      age,
      height: profileData.height || "Not specified",
      caste: profileData.caste || "Not specified",
      profession: profileData.designation || "Not specified",
      salary: profileData.salary || profileData.annualIncome || "Not specified",
      education:
        profileData.education || profileData.highestEducation || "Not specified",
      location:
        profileData.location ||
        (profileData.city && profileData.state
          ? `${profileData.city}, ${profileData.state}`
          : "Not specified"),
      languages:
        typeof profileData.languages === "string"
          ? profileData.languages.split(",")
          : [profileData.motherTongue || "Not specified"],
      image: profileData.profileImage || "/placeholder.svg",
      status,
      requestId:
        "requestId" in item
          ? item.requestId
          : (item as any)._id || requestId,
    };

  };


  const removeProfileFromAllTabs = (profileId: string) => {
    setReceivedProfiles(prev => prev.filter(p => p.id !== profileId));
    setSentProfiles(prev => prev.filter(p => p.id !== profileId));
    setAcceptedByMeProfiles(prev => prev.filter(p => p.id !== profileId));
    setAcceptedByOthersProfiles(prev => prev.filter(p => p.id !== profileId));
  };
  const fetchReceivedRequests = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken") || "";
      const response = await fetch(`${apiBase}/received`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("Received API data:", data);

      const requestsArray: Request[] = data.requests || data.data || [];
      const validProfiles = requestsArray
        .map((item: Request) => transformToProfile(item))
        .filter((p): p is Profile => p !== null)
        .filter(p => !deletedProfiles.find(d => d.id === p.id));

      setReceivedProfiles(validProfiles);
    } catch (error) {
      console.error("Error fetching received requests:", error);
    } finally {
      setLoading(false);
    }
  };


  const fetchSentRequests = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("authToken") || ""
      const response = await fetch(`https://matrimonial-backend-7ahc.onrender.com/api/request/getSendRequest`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      const data: ApiResponse = await response.json()
      console.log("Accepted by me raw data:", data);

      const validProfiles =
        data.requests
          ?.map((item: Request) => transformToProfile(item))
          .filter((p): p is Profile => p !== null) // null profiles हटा दिए
          .filter(p => !deletedProfiles.find(d => d.id === p.id)) || [];

      setSentProfiles(validProfiles);


    } catch (error) {
      console.error("Error fetching sent requests:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchAcceptedByMe = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken") || "";
      const response = await fetch(`https://matrimonial-backend-7ahc.onrender.com/api/request/accepted-by-me`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      const data: ApiResponse = await response.json();
      console.log("Raw accepted-by-me API data:", data);

      const validProfiles =
        data.requests
          ?.map((item: Request) => transformToProfile(item))
          .filter((p): p is Profile => p !== null)
          .filter(p => !rejectedProfiles.find(d => d.id === p.id)) || [];

      console.log("Accepted by me profiles:", validProfiles);
      setAcceptedByMeProfiles(validProfiles); // ✅ Set state
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAcceptedByOthers = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("authToken") || ""
      const response = await fetch(`https://matrimonial-backend-7ahc.onrender.com/api/request/accepted-by-others`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      const data: ApiResponse = await response.json()
      const validProfiles =
        data.requests
          ?.map((item: Request) => transformToProfile(item))
          .filter((p): p is Profile => p !== null)
          .filter(p => !rejectedProfiles.find(d => d.id === p.id)) || [];

      // ✅ Add console.log here
      console.log("Accepted by others profiles:", validProfiles);

      setAcceptedByOthersProfiles(validProfiles);
    } catch (error) {
      console.error("Error fetching accepted by others:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchRejectedProfiles = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken") || "";
      const response = await fetch(`${apiBase}/rejected`, { // make sure your backend has this endpoint
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data: ApiResponse = await response.json();
      const validProfiles =
        data.requests
          ?.map((item: Request) => transformToProfile(item))
          .filter((p): p is Profile => p !== null) || [];

      setRejectedProfiles(validProfiles);
    } catch (err) {
      console.error("Error fetching rejected profiles:", err);
    } finally {
      setLoading(false);
    }
  };


  const deleteRequest = async (requestId: string, profileId: string) => {
    try {
      const token = localStorage.getItem("authToken") || "";
      const profileToDelete = [...receivedProfiles, ...sentProfiles, ...acceptedByMeProfiles, ...acceptedByOthersProfiles].find(p => p.id === profileId);

      const response = await fetch(`https://matrimonial-backend-7ahc.onrender.com/api/request/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestId }),
      });
      const data = await response.json();
      if (data.success) {
        // Remove from all tabs
        removeProfileFromAllTabs(profileId);

        // Add to deletedProfiles
        if (profileToDelete) {
          setDeletedProfiles(prev => [
            ...prev,
            { ...profileToDelete, status: "deleted", originalStatus: profileToDelete.status }
          ]);
        }

      } else {
        alert("Failed to delete request");
      }
    } catch (error) {
      console.error("Error deleting request:", error);
      alert("Error deleting request");
    }
  };

  const restoreProfile = async (profileId: string) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const res = await fetch(
        "https://matrimonial-backend-7ahc.onrender.com/api/request/restore",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ requestId: profileId }),
        }
      );

      const data = await res.json();

      if (data.success) {
        // remove from rejected list
        setRejectedProfiles(prev => prev.filter(p => p.id !== profileId));

        // push back to Sent list
        setSentProfiles(prev => [
          ...prev,
          { ...data.profile, status: "sent", requestId: data.requestId }
        ]);

        toast.success("Profile restored & request sent again!");
      } else {
        toast.error("Failed to restore profile");
      }
    } catch (err) {
      console.error("Error restoring profile:", err);
      toast.error("Something went wrong while restoring profile");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return;
    fetchReceivedRequests();
    fetchSentRequests();
    fetchAcceptedByMe();
    fetchAcceptedByOthers();
    fetchRejectedProfiles()
  }, []);


  const tabs = [
    { name: "Received", count: receivedProfiles.length },
    { name: "Accepted", count: acceptedByMeProfiles.length + acceptedByOthersProfiles.length },
    { name: "Sent", count: sentProfiles.length },
    { name: "Rejected", count: rejectedProfiles.length }
  ];



  const handleSendConnection = async (profileId: string, requestId?: string) => {
    try {
      const token = localStorage.getItem("authToken") || "";
      const response = await fetch(`https://matrimonial-backend-7ahc.onrender.com/api/request/send`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ receiverId: profileId }),
      });

      const data = await response.json();
      if (data.success) {
        setReceivedProfiles(prev =>
          prev.map(p => (p.id === profileId ? { ...p, status: "sent" } : p))
        );
        setSentProfiles(prev => [
          ...prev,
          ...receivedProfiles.filter(p => p.id === profileId).map(p => ({ ...p, status: "sent" as const })),
        ]);
        toast.success("Connection sent!");
      } else {
        toast.error(data.message || "Failed to send connection.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error sending connection");
    }
  };



  const handleShortlist = async (profileId: string, requestId: string) => {
    try {
      const token = localStorage.getItem("authToken") || "";
      const response = await fetch(
        `https://matrimonial-backend-7ahc.onrender.com/api/request/update-status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ requestId, status: "accepted" }), // ✅ Must be 'accepted'
        }
      );

      const data = await response.json();

      if (data.success) {
        const profileToAccept = receivedProfiles.find(p => p.id === profileId);
        if (!profileToAccept) {
          toast.error("Profile not found in received list.");
          return;
        }

        const updatedProfile = { ...profileToAccept, status: "acceptedByMe" as const };

        setReceivedProfiles(prev => prev.filter(p => p.id !== profileId));
        setAcceptedByMeProfiles(prev => [...prev, updatedProfile]);

        toast.success("Profile shortlisted!");
      } else {
        toast.error(data.message || "Failed to accept request.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error accepting request");
    }
  };


  const handleReject = async (profileId: string, requestId: string) => {
    try {
      const token = localStorage.getItem("authToken") || "";
      const response = await fetch(
        "https://matrimonial-backend-7ahc.onrender.com/api/request/update-status",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ requestId, status: "rejected" }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        const profileToReject =
          [...receivedProfiles, ...acceptedByMeProfiles, ...acceptedByOthersProfiles]
            .find(p => p.id === profileId);

        // Remove from all relevant tabs
        removeProfileFromAllTabs(profileId);

        // Add to rejectedProfiles with original status
        if (profileToReject) {
          setRejectedProfiles(prev => [
            ...prev,
            { ...profileToReject, status: "rejected", originalStatus: profileToReject.status },
          ]);
        }

        toast.success("Request rejected successfully");
      } else {
        toast.error(data.message || "Failed to reject request");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

const handleChatClick = (profile: Profile) => {
  localStorage.setItem("chatUser", JSON.stringify(profile));
  router.push(`https://matro-m6d5.vercel.app/messages?userId=${profile.id}&name=${profile.name}`);
};





  const handleDecline = async (profileId: string, requestId?: string) => {
    console.log("Decline clicked", profileId, requestId);
    if (!requestId) {
      toast.error("Request ID missing for this profile.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken") || "";
      const response = await fetch(`${apiBase}/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestId }),
      });

      const data = await response.json();
      if (data.success) {

        const declinedProfile =
          [...receivedProfiles, ...sentProfiles, ...acceptedByMeProfiles, ...acceptedByOthersProfiles]
            .find(p => p.id === profileId);

        setReceivedProfiles(prev => prev.filter(p => p.id !== profileId));
        setSentProfiles(prev => prev.filter(p => p.id !== profileId));
        setAcceptedByMeProfiles(prev => prev.filter(p => p.id !== profileId));
        setAcceptedByOthersProfiles(prev => prev.filter(p => p.id !== profileId));


        if (declinedProfile) {
          setDeletedProfiles(prev => [
            ...prev,
            { ...declinedProfile, status: "deleted", originalStatus: declinedProfile.status }
          ]);
        }

        toast.success("Request declined (moved to Deleted).");
      } else {
        toast.error(data.message || "Failed to decline request.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error declining request");
    }
  };

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
    }
    else if (activeTab === "Rejected") {
      return rejectedProfiles;
    }


    return []
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
                className={`py-4 px-2 whitespace-nowrap text-sm font-medium border-b-2 transition-colors font-Lato ${activeTab === tab.name
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

      {activeTab === "Accepted" && (
        <div className="flex gap-3 items-center justify-center mt-8">
          <Button
            className={`items-center border-2 border-[#8E2E37] rounded-full text-black hover:text-white bg-white transition-colors hover:bg-[#8E2E37] px-8 py-4 ${activeSubTab === "Accepted by Her" ? "bg-[#8E2E37] text-white" : ""
              }`}
            onClick={() => setActiveSubTab("Accepted by Her")}
          >
            Accepted by Her
          </Button>
          <Button
            className={`items-center border-2 border-[#8E2E37] rounded-full text-black hover:text-white bg-white transition-colors hover:bg-[#8E2E37] px-8 py-4 ${activeSubTab === "Accepted by Me" ? "bg-[#8E2E37] text-white" : ""
              }`}
            onClick={() => setActiveSubTab("Accepted by Me")}
          >
            Accepted by Me
          </Button>
        </div>
      )}

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
          filteredProfiles().map((profile, index) => (
            <Card
              key={`${profile.id}-${profile.requestId || "noReq"}-${activeTab}-${activeSubTab || "none"}-${index}`}
              className="p-6 bg-white rounded-lg border border-[#7D0A0A]"
            >

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
                <div className="flex flex-col space-y-3 items-center border-l border-[#757575] w-[268px] px-8">
                  {activeTab === "Received" && (
                    <>
                      <div className="flex gap-6 items-center">
                        <div className="text-regular text-[#000000] mb-2 font-Lato ml-16">Accept</div>
                        <Button
                          variant="outline"
                          size="icon"
                          className="group h-12 w-12 rounded-full border-2 border-[#4bb65b] bg-transparent hover:bg-[#4bb65b]"
                          onClick={() => {
                            if (!profile.requestId) {
                              toast.error("Request ID missing for this profile.");
                              return;
                            }
                            handleShortlist(profile.id, profile.requestId);
                          }}
                        >
                          <Check className="h-5 w-5 text-[#4bb65b] group-hover:text-white" />
                        </Button>
                      </div>

                      <div className="flex gap-6 items-center">
                        <div className="text-regular text-[#000000] font-Lato ml-16">Reject</div>
                        <Button
                          variant="outline"
                          className="bg-[#ADADAD] hover:bg-gray-50 rounded-full w-12 h-12 p-0"
                          size="sm"
                          onClick={() => {
                            if (!profile.requestId) {
                              toast.error("Request ID missing for this profile.");
                              return;
                            }
                            handleReject(profile.id, profile.requestId);
                          }}
                        >
                          <X className="w-4 h-4 text-gray-600" />
                        </Button>
                      </div>
                    </>
                  )}

                  {activeTab === "Accepted" && (
                    <>
                      {/* Optional placeholder group */}
                      <div className="group flex gap-3 items-center border-2 border-[#8E2E37] rounded-full px-6 transition-colors hover:bg-[#8E2E37]">
                        {/* You can add extra buttons or info here */}
                      </div>

                      {/* Chat button */}
                      <div className="group flex gap-3 items-center border-2 border-[#8E2E37] rounded-full px-5 transition-colors hover:bg-[#8E2E37]">
                        <span className="text-black group-hover:text-white font-Lato">Chat</span>
                        <Button
                          size="sm"
                          className="bg-transparent border-none p-0 hover:bg-transparent"
                          onClick={() => handleChatClick(profile)}
                        >
                          <MessageCircleMore className="w-4 h-4 text-black group-hover:text-white" />
                        </Button>


                      </div>

                      {/* Reject button */}
                      <div className="group flex items-center border-2 border-[#8E2E37] rounded-full px-4 transition-colors hover:bg-[#8E2E37]">
                        <span className="text-black group-hover:text-white font-Lato">Rejected</span>
                        <Button
                          size="sm"
                          className="bg-transparent border-none p-0 hover:bg-transparent"
                          onClick={() => {
                            if (!profile.requestId) {
                              toast.error("Request ID missing for this profile.");
                              return;
                            }
                            handleReject(profile.id, profile.requestId);
                          }}
                        >
                          <X className="w-4 h-4 text-black group-hover:text-white" />
                        </Button>
                      </div>
                    </>
                  )}


                  {(activeTab === "Sent") && (
                    <>
                      <div className="group flex gap-3 items-center border-2 border-[#8E2E37] rounded-full px-6 transition-colors hover:bg-[#8E2E37]">
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
                          onClick={() => {
                            if (!profile.requestId) {
                              toast.error("Request ID missing for this profile.");
                              return;
                            }
                            handleDecline(profile.id, profile.requestId);
                          }}
                        >
                          <X className="w-4 h-4 text-black group-hover:text-white" />
                        </Button>
                      </div>
                    </>
                  )}
{activeTab === "Rejected" && (
  <div className="flex flex-col items-center space-y-2">
    <div className="text-gray-600 font-Lato">Profile Rejected</div>
    <Button
      size="sm"
      className="bg-red-500 hover:bg-red-600 text-white rounded-full px-4 py-2"
      onClick={() => restoreProfile(profile.id)} // ✅ Pass only profile.id
    >
      Restore
    </Button>
  </div>
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