// components/ProfileDetails.tsx

import { Profile } from "@/types/Profile"


interface ProfileDetailsProps {
  profile: Profile
}

export default function ProfileDetails({ profile }: ProfileDetailsProps) {
  return (
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
  )
}