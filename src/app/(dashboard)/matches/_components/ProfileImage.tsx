// components/ProfileImage.tsx
import Image from "next/image"

interface ProfileImageProps {
  image: string
  name: string
}

export default function ProfileImage({ image, name }: ProfileImageProps) {
  return (
    <div className="flex-shrink-0">
      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 border border-gray-300">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={96}
          height={96}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}