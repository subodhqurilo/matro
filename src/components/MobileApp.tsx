'use client';

import { Button } from '@/components/ui/button';

import { Heart, Star, Apple, Play, MessageCircle, Badge } from 'lucide-react';

export default function MobileApp() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-pink-100 via-red-50 to-orange-100 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-20"></div>
      <div className="absolute top-32 right-20 w-16 h-16 bg-red-300 rounded-full opacity-20"></div>
      <div className="absolute bottom-20 left-32 w-12 h-12 bg-pink-300 rounded-full opacity-20"></div>
      <div className="absolute bottom-32 right-10 w-24 h-24 bg-orange-300 rounded-full opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-red-100 text-red-700 hover:bg-red-100 px-4 py-2 text-sm font-medium">
                DOWNLOAD OUR APP
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Your Journey to Marriage, Now in Your Pocket
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Love, trust, and meaningful connections — all within reach. Download our app and take the first step towards finding your perfect life partner, anywhere.
              </p>
            </div>

           

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center space-x-3">
                <Apple className="w-5 h-5" />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </Button>
              
              <Button className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center space-x-3">
                <Play className="w-5 h-5" />
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </Button>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="flex items-center space-x-1">
                <span>50k+ Downloads</span>
              </span>
              <span className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>4.8 Rating</span>
              </span>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="relative">
              {/* Phone Mockup */}
              <div className="w-80 h-[600px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="bg-red-600 h-12 flex items-center justify-center">
                    <div className="text-white text-sm font-medium">Pure Hearts</div>
                  </div>
                  
                  {/* App Content */}
                  <div className="p-6 space-y-6">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Heart className="w-10 h-10 text-red-600" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">Find Your Perfect Match</h3>
                      <p className="text-sm text-gray-600 mt-2">Connect with genuine people looking for meaningful relationships</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-red-200 rounded-full"></div>
                          <div className="flex-1">
                            <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-pink-200 rounded-full"></div>
                          <div className="flex-1">
                            <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
                            <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-red-600 text-white p-4 rounded-lg text-center">
                      <div className="text-sm font-medium">Start Your Journey</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements for the phone mockup */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center shadow-lg">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

