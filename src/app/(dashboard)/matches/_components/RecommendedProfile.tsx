"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Send, Heart, X, Clock, MapPin, Briefcase, GraduationCap, DollarSign } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface RecommendedProfile {
  _id: string;
  name: string;
  age: number;
  location: string;
  profileImage: string;
  profileImages: string[];
  lastSeen: string;
  height?: string;
  religion?: string;
  profession?: string;
  salary?: string;
  education?: string;
  languages?: string[];
  gender?: string;
  profileId?: string;
  caste?: string;
}

interface RecommendationCardProps {
  profile: RecommendedProfile;
  activeTab?: string;
  handleSendConnection?: (id: string) => void;
  handleShortlist?: (id: string) => void;
  handleNotNow?: (id: string) => void;
}

export default function RecommendationCard({ 
  profile, 
  activeTab, 
  handleSendConnection = () => {},
  handleShortlist = () => {},
  handleNotNow = () => {}
}: RecommendationCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-1/3 h-64 md:h-auto">
          {profile.profileImage ? (
            <Image
              src={profile.profileImage}
              alt={profile.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
              <Clock className="w-3 h-3 mr-1" />
              {profile.lastSeen}
            </Badge>
          </div>
        </div>
        
        <div className="flex-1 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{profile.name}</h3>
              <div className="flex items-center space-x-2 mt-1 text-gray-600">
                <span>{profile.age} years</span>
                <span>•</span>
                <span>{profile.height}</span>
                {profile.caste && (
                  <>
                    <span>•</span>
                    <span>{profile.caste}</span>
                  </>
                )}
              </div>
            </div>
            {profile.profileId && (
              <Badge variant="outline" className="text-gray-500">
                ID: {profile.profileId}
              </Badge>
            )}
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-gray-500" />
              <span className="text-gray-700">{profile.location}</span>
            </div>
            
            {profile.profession && (
              <div className="flex items-center">
                <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
                <span className="text-gray-700">{profile.profession}</span>
              </div>
            )}
            
            {profile.education && (
              <div className="flex items-center">
                <GraduationCap className="w-4 h-4 mr-2 text-gray-500" />
                <span className="text-gray-700">{profile.education}</span>
              </div>
            )}
            
            {profile.salary && (
              <div className="flex items-center">
                <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                <span className="text-gray-700">{profile.salary}</span>
              </div>
            )}
            
            {Array.isArray(profile.languages) && profile.languages.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.languages.map((lang, i) => (
                    <Badge key={i} variant="outline" className="text-gray-700">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-gray-300 hover:bg-gray-50"
              onClick={() => handleNotNow(profile._id)}
            >
              <X className="w-5 h-5 mr-2" />
              Not Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-pink-200 hover:bg-pink-50 text-pink-600"
              onClick={() => handleShortlist(profile._id)}
            >
              <Heart className="w-5 h-5 mr-2" />
              Shortlist
            </Button>
            <Button
              size="lg"
              className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              onClick={() => handleSendConnection(profile._id)}
            >
              <Send className="w-5 h-5 mr-2" />
              Connect
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}