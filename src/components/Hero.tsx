'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Search, Users, MessageCircle, Star, X } from 'lucide-react';
import Step1Form from './steps/Step1';
import Step2Form from './steps/Step2';
import Step3Form from './steps/Step3';
import Step4Form from './steps/Step4';

export default function Hero() {
  const [showStep1, setShowStep1] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [searchData, setSearchData] = useState({
    lookingFor: '',
    ageFrom: '',
    ageTo: '',
    religion: '',
    motherTongue: ''
  });

  // Step1 state
  const [selectedProfile, setSelectedProfile] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [lookingFor, setLookingFor] = useState('');
  const [ageFrom, setAgeFrom] = useState('');
  const [ageTo, setAgeTo] = useState('');

  // Step2 state
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  // Step3 state
  const [religion, setReligion] = useState('');
  const [community, setCommunity] = useState('');
  const [livingIn, setLivingIn] = useState('');

  // Step4 state
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleContinueStep1 = () => {
    setCurrentStep(2);
  };
  const handleBackToStep1 = () => {
    setCurrentStep(1);
  };
  const handleCloseModal = () => {
    setShowStep1(false);
    setCurrentStep(1);
  };

  const handleContinueStep2 = () => {
    setCurrentStep(3);
  };

  const handleContinueStep3 = () => {
    setCurrentStep(4);
  };

  const handleBackToStep2 = () => {
    setCurrentStep(2);
  };

  const handleBackToStep3 = () => {
    setCurrentStep(3);
  };

  const handleContinueStep4 = () => {
    // handle next step or submission for Step4
  };

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

  return (
    <div className="min-h-screen bg-white">
      {/* Step Modal Overlay */}
      {showStep1 && (
        <div className="fixed inset-0 bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
            <div className="p-8">
              {currentStep === 1 && (
                <Step1Form
                  selectedProfile={selectedProfile}
                  setSelectedProfile={setSelectedProfile}
                  selectedGender={selectedGender}
                  setSelectedGender={setSelectedGender}
                  lookingFor={lookingFor}
                  setLookingFor={setLookingFor}
                  ageFrom={ageFrom}
                  setAgeFrom={setAgeFrom}
                  ageTo={ageTo}
                  setAgeTo={setAgeTo}
                  handleContinueStep1={handleContinueStep1}
                />
              )}
              {currentStep === 2 && (
                <Step2Form
                  onBack={handleBackToStep1}
                  firstName={firstName}
                  setFirstName={setFirstName}
                  middleName={middleName}
                  setMiddleName={setMiddleName}
                  lastName={lastName}
                  setLastName={setLastName}
                  dateOfBirth={dateOfBirth}
                  setDateOfBirth={setDateOfBirth}
                  handleContinueStep2={handleContinueStep2}
                />
              )}
              {currentStep === 3 && (
                <Step3Form
                  onBack={handleBackToStep2}
                  religion={religion}
                  setReligion={setReligion}
                  community={community}
                  setCommunity={setCommunity}
                  livingIn={livingIn}
                  setLivingIn={setLivingIn}
                  handleContinueStep3={handleContinueStep3}
                />
              )}
              {currentStep === 4 && (
                <Step4Form
                  email={email}
                  setEmail={setEmail}
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                  onBack={handleBackToStep3}
                  handleContinueStep4={handleContinueStep4}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col lg:flex-row">
        {/* Left Side - Content */}
        <div className="flex-1 bg-gradient-to-r from-red-50 to-pink-50 flex items-center justify-center py-12 lg:py-0">
          <div className="max-w-2xl px-4 sm:px-6 lg:px-8 space-y-8">
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

              <Button 
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3"
                onClick={() => setShowStep1(true)}
              >
                Let's Begin
              </Button>
            </Card>
          </div>
        </div>

        {/* Right Side - Full Height Image */}
        <div className="flex-1 relative hidden lg:block">
          <img
            src="https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Beautiful bride in traditional attire"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-red-200/30 to-pink-200/30"></div>
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