'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

export default function SuccessStories() {
  const stories = [
    {
      id: 1,
      image: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400",
      quote: "We found each other through this wonderful platform. The process was smooth, respectful, and we felt safe throughout our journey.",
      names: "Raj & Priya",
      year: "2024"
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=400",
      quote: "The genuine connections and verified profiles made all the difference. We're grateful for finding our perfect match here.",
      names: "Amit & Sneha",
      year: "2024"
    },
    {
      id: 3,
      image: "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=400",
      quote: "A platform that truly understands the importance of marriage. We couldn't be happier with our journey together.",
      names: "Vikram & Kavya",
      year: "2023"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-r from-red-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real couples who found their perfect match through our platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <div className="aspect-video relative">
                <img
                  src={story.image}
                  alt={`Success story of ${story.names}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6 space-y-4">
               
                <p className="text-gray-600 italic text-sm leading-relaxed">
                  "{story.quote}"
                </p>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="font-semibold text-gray-900">{story.names}</p>
                 
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}