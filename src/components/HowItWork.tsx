import React from 'react'
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
const HowItWork = () => {
    const features = [
    {
      icon: "/assets/icon1.png",
      title: "Create your profile",
      description: "Simple, fast, honest and effective"
    },
    {
      icon: "/assets/icon2.png",
      title: "Browse matches",
      description: "Based on your preferences, not ours"
    },
    {
      icon: "/assets/icon3.png",
      title: "Connect genuinely",
      description: "With mutual respect and consent"
    },
    {
      icon: "/assets/icon4.png",
      title: "Start your journey",
      description: "When it feels right, not rushed"
    }
  ];
  return (
    <div>
    <section className="py-16 lg:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
              <div className="text-center mb-16 ">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  How It Works
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Your journey to finding the perfect life partner in simple steps
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
                {features.map((feature, index) => (
                  <Card key={index} className="text-center p-8 hover:shadow-lg transition-all duration-300 border-0  hover:-translate-y-2"
                  style={{ backgroundColor: 'rgba(235, 87, 87, 0.15)' }}>
                    <CardContent className="space-y-4">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16  rounded-full flex items-center justify-center  transition-colors">
                         <Image
                         src={feature.icon}
                         alt={`icons`}
                         width={50}
                         height={50}
                         />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
    </div>
  )
}
export default HowItWork
