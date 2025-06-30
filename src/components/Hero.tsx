'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Search, Users, MessageCircle, Star } from 'lucide-react';

export default function Hero() {
  const [searchData, setSearchData] = useState({
    lookingFor: '',
    ageFrom: '',
    ageTo: '',
    religion: '',
    motherTongue: ''
  });

  const features = [
    {
      icon: <Users className="w-8 h-8 text-red-600" />,
      title: "Create your profile",
      description: "Simple, fast, honest and effective"
    },
    {
      icon: <Search className="w-8 h-8 text-red-600" />,
      title: "Browse matches",
      description: "Based on your preferences, not ours"
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-red-600" />,
      title: "Connect genuinely",
      description: "With mutual respect and consent"
    },
    {
      icon: <Heart className="w-8 h-8 text-red-600" />,
      title: "Start your journey",
      description: "When it feels right, not rushed"
    }
  ];

  const benefits = [
    { icon: "💖", title: "100% Free"},
    { icon: "🚫", title: "No Pressure, No Ads"},
    { icon: "✅", title: "Verified Profiles"},
    { icon: "🤝", title: "Respectful Community"},
    { icon: "💑", title: "Focused on Real Marriages"}
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-50 to-pink-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  A Pure Path to Marriage —{" "}
                  <span className="text-red-600">With Love and Trust at Heart</span>
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  This is more than just a matrimonial app. It's a heartfelt journey toward 
                  companionship, built on honesty, care, and community — without pressure or 
                  payment.
                </p>
              </div>

              {/* Search Form */}
              <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      I'm looking for a
                    </label>
                    <Select value={searchData.lookingFor} onValueChange={(value) => setSearchData({...searchData, lookingFor: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={"bride"}>Bride</SelectItem>
                        <SelectItem value={"groom"}>Groom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        placeholder="22" 
                        className="w-16"
                        value={searchData.ageFrom}
                        onChange={(e) => setSearchData({...searchData, ageFrom: e.target.value})}
                      />
                      <span className="text-gray-500">to</span>
                      <Input 
                        placeholder="30" 
                        className="w-16"
                        value={searchData.ageTo}
                        onChange={(e) => setSearchData({...searchData, ageTo: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Of Religion</label>
                    <Select value={searchData.religion} onValueChange={(value) => setSearchData({...searchData, religion: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={"hindu"}>Hindu</SelectItem>
                        <SelectItem value={"muslim"}>Muslim</SelectItem>
                        <SelectItem value={"christian"}>Christian</SelectItem>
                        <SelectItem value={"sikh"}>Sikh</SelectItem>
                        <SelectItem value={"buddhist"}>Buddhist</SelectItem>
                        <SelectItem value={"jain"}>Jain</SelectItem>
                        <SelectItem value={"other"}>Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">And Mother Tongue</label>
                    <Select value={searchData.motherTongue} onValueChange={(value) => setSearchData({...searchData, motherTongue: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="English" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={"english"}>English</SelectItem>
                        <SelectItem value={"hindi"}>Hindi</SelectItem>
                        <SelectItem value={"bengali"}>Bengali</SelectItem>
                        <SelectItem value={"tamil"}>Tamil</SelectItem>
                        <SelectItem value={"telugu"}>Telugu</SelectItem>
                        <SelectItem value={"marathi"}>Marathi</SelectItem>
                        <SelectItem value={"gujarati"}>Gujarati</SelectItem>
                        <SelectItem value={"kannada"}>Kannada</SelectItem>
                        <SelectItem value={"malayalam"}>Malayalam</SelectItem>
                        <SelectItem value={"punjabi"}>Punjabi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3">
                  Let's Begin
                </Button>
              </Card>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Beautiful bride in traditional attire"
                  className="rounded-2xl shadow-2xl w-full h-[600px] object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-red-200 to-pink-200 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your journey to finding the perfect life partner in simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-all duration-300 border-0 bg-white group hover:-translate-y-2">
                <CardContent className="space-y-4">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center group-hover:bg-red-100 transition-colors">
                      {feature.icon}
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
  );
} 