'use client';

import { Card } from '@/components/ui/card';

export default function WhyChooseUs() {
  const benefits = [
    { icon: "💖", title: "100% Free" },
    { icon: "🚫", title: "No Pressure, No Ads" },
    { icon: "✅", title: "Verified Profiles" },
    { icon: "🤝", title: "Respectful Community" },
    { icon: "💑", title: "Focused on Real Marriages" }
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Us?
              </h2>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="text-2xl flex-shrink-0 transform group-hover:scale-110 transition-transform">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {benefit.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Happy couple in traditional attire"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 w-full h-full bg-gradient-to-tr from-yellow-200 to-orange-200 rounded-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}