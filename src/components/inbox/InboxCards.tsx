// components/InboxCard.tsx
interface Profile {
  avatar: string;
  name: string;
  id: string | number;
  lastSeen: string;
  age: string | number;
  height: string | number;
  religion: string;
  profession: string;
  salary: string;
  degree: string;
  city: string;
  languages: string;
}

interface InboxCardProps {
  profile: Profile;
}

export default function InboxCard({ profile }: InboxCardProps) {
  return (
    <div className="border rounded-xl p-4 flex justify-between items-center shadow-sm bg-white mb-4">
    
      <div className="flex gap-4">
        <img
          src={profile.avatar}
          alt={profile.name}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-blue-400 object-cover"
        />
        <div className="text-sm sm:text-base">
          <h3 className="font-bold">{profile.name}</h3>
          <p className="text-gray-500 text-xs">#{profile.id} | Last seen {profile.lastSeen}</p>
          <p>{profile.age} • {profile.height} • {profile.religion}</p>
          <p>{profile.profession} • {profile.salary}</p>
          <p>{profile.degree}</p>
          <p>{profile.city}</p>
          <p>{profile.languages}</p>
        </div>
      </div>

      {/* Right - Buttons */}
      <div className="flex flex-col items-center gap-2 ">
        <button className="bg-green-100 text-green-600 rounded-full p-2 hover:bg-green-200">
          ✅
        </button>
        <span className="text-xs text-green-600">Accept</span>

        <button className="bg-red-100 text-red-600 rounded-full p-2 hover:bg-red-200">
          ❌
        </button>
        <span className="text-xs text-red-600">Decline</span>
      </div>
    </div>
  );
}
