import { Card } from "@/components/ui/card"
import ProfileImage from './ProfileImage'
import ProfileDetails from './ProfileDetails'
import ActionButtons from './ActionButtons'
import { Profile } from "@/types/Profile"

interface ProfileCardProps {
  profile: Profile
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Card className="p-6 bg-white rounded-lg border border-[#7D0A0A]">
      <div className="flex items-start space-x-6">
        <ProfileImage image={profile.image} name={profile.name} />
        <ProfileDetails profile={profile} />
        <ActionButtons />
      </div>
    </Card>
  )
}