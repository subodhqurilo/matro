'use client';

import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ProfileCardProps {
  name: string;
  age: number;
  height: string;
  caste: string;
  profession: string;
  salary: string;
  education: string;
  location: string;
  languages: string;
  profileId: string;
  lastSeen: string;
  timeAgo: string;
  imageUrl: string;
  onAccept: (profileId: string) => void;
  onDecline: (profileId: string) => void;
}

export default function ProfileCard({
  name,
  age,
  height,
  caste,
  profession,
  salary,
  education,
  location,
  languages,
  profileId,
  lastSeen,
  timeAgo,
  imageUrl,
  onAccept,
  onDecline,
}: ProfileCardProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto mb-6 overflow-hidden border border-pink-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-0">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-start space-x-4">
            <div className="relative">
              <img
                src={imageUrl}
                alt={name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
                <span className="text-sm text-gray-500">{timeAgo}</span>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <div className="text-blue-600 font-medium">
                  {profileId} | {lastSeen}
                </div>
                <div className="border-b border-gray-200 pb-1"></div>
                <div className="font-medium">
                  {age} Yrs . {height} . {caste}
                </div>
                <div>
                  {profession} . {salary}
                </div>
                <div>{education}</div>
                <div>{location}</div>
                <div>{languages}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-3 ml-6">
            <Button
              onClick={() => onAccept(profileId)}
              className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              size="icon"
            >
              <Check className="w-6 h-6" />
            </Button>
            <span className="text-xs text-center text-gray-600 font-medium">Accept</span>

            <Button
              onClick={() => onDecline(profileId)}
              className="w-16 h-16 rounded-full bg-gray-400 hover:bg-gray-500 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              size="icon"
            >
              <X className="w-6 h-6" />
            </Button>
            <span className="text-xs text-center text-gray-600 font-medium">Decline</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}