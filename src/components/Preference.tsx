'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, User, MapPin, Heart, Briefcase } from 'lucide-react';

interface PreferenceData {
  gender: string;
  minAge: number;
  maxAge: number;
  minHeight: number;
  maxHeight: number;
  minWeight: number;
  maxWeight: number;
  religion: string;
  caste: string;
  community: string;
  maritalStatus: string;
  designation: string;
  gotra: string;
  highestEducation: string;
  income: string;
  state: string;
  city: string;
}

interface PreferenceFormProps {
  onSubmit?: (data: PreferenceData) => void | Promise<void>;
  onCancel?: () => void;
  initialData?: Partial<PreferenceData>;
}

const ProfilePreferenceForm: React.FC<PreferenceFormProps> = ({ 
  onSubmit, 
  onCancel,
  initialData = {}
}): React.JSX.Element => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PreferenceData>({
    gender: initialData.gender || 'Female',
    minAge: initialData.minAge || 22,
    maxAge: initialData.maxAge || 35,
    minHeight: initialData.minHeight || 150,
    maxHeight: initialData.maxHeight || 200,
    minWeight: initialData.minWeight || 40,
    maxWeight: initialData.maxWeight || 100,
    religion: initialData.religion || 'Hindu',
    caste: initialData.caste || '',
    community: initialData.community || '',
    maritalStatus: initialData.maritalStatus || 'Never Married',
    designation: initialData.designation || '',
    gotra: initialData.gotra || '',
    highestEducation: initialData.highestEducation || '',
    income: initialData.income || '',
    state: initialData.state || '',
    city: initialData.city || '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (field: keyof PreferenceData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSubmit?.(formData);
    } catch (error) {
      console.error('Error submitting preferences:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return Boolean(formData.gender) && 
               Boolean(formData.minAge) && 
               Boolean(formData.maxAge) && 
               formData.minAge <= formData.maxAge &&
               formData.minHeight <= formData.maxHeight &&
               formData.minWeight <= formData.maxWeight;
      case 2:
        return Boolean(formData.religion) && 
               Boolean(formData.caste) && 
               Boolean(formData.community) &&
               Boolean(formData.gotra);
      case 3:
        return Boolean(formData.maritalStatus) && 
               Boolean(formData.designation) && 
               Boolean(formData.highestEducation);
      case 4:
        return Boolean(formData.state) && Boolean(formData.city);
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="text-[#7D0A0A]" size={24} />
              <h3 className="text-xl font-semibold text-[#343434] font-Lato">Basic Preferences</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm mb-2 font-medium text-[#757575] font-sans">Looking for</label>
                <select 
                  value={formData.gender}
                  onChange={(e) => updateFormData('gender', e.target.value)}
                  className="border-[#6F0000] border p-3 text-md font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-[#7D0A0A] focus:border-transparent font-Mulish"
                >
                  <option value="Female">Women</option>
                  <option value="Male">Men</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm mb-2 font-medium text-[#757575] font-sans">Age Range</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="number" 
                    min="18" 
                    max="99" 
                    value={formData.minAge}
                    onChange={(e) => updateFormData('minAge', Number(e.target.value))}
                    className="border border-[#6F0000] p-3 text-md font-medium rounded-md w-20 focus:outline-none focus:ring-2 focus:ring-[#7D0A0A] focus:border-transparent font-Mulish" 
                    placeholder="22"
                  />
                  <span className="text-md font-medium font-Mulish text-[#757575]">to</span>
                  <input 
                    type="number" 
                    min="18" 
                    max="99" 
                    value={formData.maxAge}
                    onChange={(e) => updateFormData('maxAge', Number(e.target.value))}
                    className="border border-[#6F0000] p-3 text-md font-medium rounded-md w-20 focus:outline-none focus:ring-2 focus:ring-[#7D0A0A] focus:border-transparent font-Mulish" 
                    placeholder="35"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm mb-2 font-medium text-[#757575] font-sans">Height Range (cm)</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="number" 
                    min="100" 
                    max="250" 
                    value={formData.minHeight}
                    onChange={(e) => updateFormData('minHeight', Number(e.target.value))}
                    className="border border-[#6F0000] p-3 text-md font-medium rounded-md w-20 focus:outline-none focus:ring-2 focus:ring-[#7D0A0A] focus:border-transparent font-Mulish" 
                    placeholder="150"
                  />
                  <span className="text-md font-medium font-Mulish text-[#757575]">to</span>
                  <input 
                    type="number" 
                    min="100" 
                    max="250" 
                    value={formData.maxHeight}
                    onChange={(e) => updateFormData('maxHeight', Number(e.target.value))}
                    className="border border-[#6F0000] p-3 text-md font-medium rounded-md w-20 focus:outline-none focus:ring-2 focus:ring-[#7D0A0A] focus:border-transparent font-Mulish" 
                    placeholder="200"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm mb-2 font-medium text-[#757575] font-sans">Weight Range (kg)</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="number" 
                    min="30" 
                    max="200" 
                    value={formData.minWeight}
                    onChange={(e) => updateFormData('minWeight', Number(e.target.value))}
                    className="border border-[#6F0000] p-3 text-md font-medium rounded-md w-20 focus:outline-none focus:ring-2 focus:ring-[#7D0A0A] focus:border-transparent font-Mulish" 
                    placeholder="40"
                  />
                  <span className="text-md font-medium font-Mulish text-[#757575]">to</span>
                  <input 
                    type="number" 
                    min="30" 
                    max="200" 
                    value={formData.maxWeight}
                    onChange={(e) => updateFormData('maxWeight', Number(e.target.value))}
                    className="border border-[#6F0000] p-3 text-md font-medium rounded-md w-20 focus:outline-none focus:ring-2 focus:ring-[#7D0A0A] focus:border-transparent font-Mulish" 
                    placeholder="100"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="text-[#7D0A0A]" size={24} />
              <h3 className="text-xl font-semibold text-[#343434] font-Lato">Religious & Cultural Preferences</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm mb-2 font-medium text-[#757575] font-sans">Religion</label>
                <select 
                  value={formData.religion}
                  onChange={(e) => updateFormData('religion', e.target.value)}
                  className="border-[#6F0000] border p-3 text-md font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-[#7D0A0A] focus:border-transparent font-Mulish"
                >
                  <option value="">Select Religion</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Muslim">Muslim</option>
                  <option value="Christian">Christian</option>
                  <option value="Sikh">Sikh</option>
                  <option value="Buddhist">Buddhist</option>
                  <option value="Jain">Jain</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm mb-2 font-medium text-[#757575] font-sans">Gotra</label>
                <input 
                  type="text"
                  value={formData.gotra}
                  onChange={(e) => updateFormData('gotra', e.target.value)}
                  className="border border-[#6F0000] p-3 text-md font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-[#7D0A0A] focus:border-transparent font-Mulish"
                  placeholder="Enter Gotra"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm mb-2 font-medium text-[#757575] font-sans">Caste</label>
                <input 
                  type="text"
                  value={formData.caste}
                  onChange={(e) => updateFormData('caste', e.target.value)}
                  className="border border-[#6F0000] p-3 text-md font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-[#7D0A0A] focus:border-transparent font-Mulish" 
                  placeholder="e.g., Brahmin, Kshatriya"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm mb-2 font-medium text-[#757575] font-sans">Community</label>
                <input 
                  type="text"
                  value={formData.community}
                  onChange={(e) => updateFormData('community', e.target.value)}
                  className="border border-[#6F0000] p-3 text-md font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-[#7D0A0A] focus:border-transparent font-Mulish" 
                  placeholder="e.g., Deshastha, Agarwal"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="text-[#7D0A0A]" size={24} />
              <h3 className="text-xl font-semibold text-[#343434] font-Lato">Professional & Educational Preferences</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm mb-2 font-medium text-[#757575] font-sans">Marital Status</label>
                <select 
                  value={formData.maritalStatus}
                  onChange={(e) => updateFormData('maritalStatus', e.target.value)}
                  className="border-[#6F0000] border p-3 text-md font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-[#7D0A0A] focus:border-transparent font-Mulish"
                >
                  <option value="">Select Status</option>
                  <option value="Never Married">Never Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Separated">Separated</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm mb-2 font-medium text-[#757575] font-sans">Designation</label>
                <input 
                  type="text"
                  value={formData.designation}
                  onChange={(e) => updateFormData('designation', e.target.value)}
                  className="border border-[#6F0000] p-3 text-md font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-[#7D0A0A] focus:border-transparent font-Mulish" 
                  placeholder="e.g., Software Engineer, Doctor"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm mb-2 font-medium text-[#757575] font-sans">Highest Education</label>
                <input 
                  type="text"
                  value={formData.highestEducation}
                  onChange={(e) => updateFormData('highestEducation', e.target.value)}
                  className="border border-[#6F0000] p-3 text-md font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-[#7D0A0A] focus:border-transparent font-Mulish" 
                  placeholder="e.g., B.Tech, MBBS, MBA"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm mb-2 font-medium text-[#757575] font-sans">Annual Income</label>
                <select 
                  value={formData.income}
                  onChange={(e) => updateFormData('income', e.target.value)}
                  className="border-[#6F0000] border p-3 text-md font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-[#7D0A0A] focus:border-transparent font-Mulish"
                >
                  <option value="">Select Income Range</option>
                  <option value="0-3 LPA">0-3 LPA</option>
                  <option value="3-5 LPA">3-5 LPA</option>
                  <option value="5-10 LPA">5-10 LPA</option>
                  <option value="10-15 LPA">10-15 LPA</option>
                  <option value="15-25 LPA">15-25 LPA</option>
                  <option value="25-50 LPA">25-50 LPA</option>
                  <option value="50+ LPA">50+ LPA</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="text-[#7D0A0A]" size={24} />
              <h3 className="text-xl font-semibold text-[#343434] font-Lato">Location Preferences</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm mb-2 font-medium text-[#757575] font-sans">State</label>
                <input 
                  type="text"
                  value={formData.state}
                  onChange={(e) => updateFormData('state', e.target.value)}
                  className="border border-[#6F0000] p-3 text-md font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-[#7D0A0A] focus:border-transparent font-Mulish" 
                  placeholder="Enter State"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm mb-2 font-medium text-[#757575] font-sans">City</label>
                <input 
                  type="text"
                  value={formData.city}
                  onChange={(e) => updateFormData('city', e.target.value)}
                  className="border border-[#6F0000] p-3 text-md font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-[#7D0A0A] focus:border-transparent font-Mulish" 
                  placeholder="Enter City"
                />
              </div>
            </div>

            {/* Summary Section */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-lg font-semibold text-[#343434] mb-3 font-Lato">Preference Summary</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="font-medium">Looking for:</span> {formData.gender}</div>
                <div><span className="font-medium">Age Range:</span> {formData.minAge}-{formData.maxAge} years</div>
                <div><span className="font-medium">Height Range:</span> {formData.minHeight}-{formData.maxHeight} cm</div>
                <div><span className="font-medium">Weight Range:</span> {formData.minWeight}-{formData.maxWeight} kg</div>
                <div><span className="font-medium">Religion:</span> {formData.religion}</div>
                <div><span className="font-medium">Caste:</span> {formData.caste}</div>
                <div><span className="font-medium">Community:</span> {formData.community}</div>
                <div><span className="font-medium">Gotra:</span> {formData.gotra}</div>
                <div><span className="font-medium">Marital Status:</span> {formData.maritalStatus}</div>
                <div><span className="font-medium">Designation:</span> {formData.designation}</div>
                <div><span className="font-medium">Highest Education:</span> {formData.highestEducation}</div>
                <div><span className="font-medium">Income:</span> {formData.income}</div>
                <div><span className="font-medium">Location:</span> {formData.city}, {formData.state}</div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#343434] font-Lato">Set Your Preferences</h2>
            <button
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ×
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-[#757575]">Step {currentStep} of 4</span>
              <span className="text-sm font-medium text-[#757575]">{Math.round((currentStep / 4) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-[#7D0A0A] h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-lg">
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-4 py-2 text-[#7D0A0A] font-medium rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-Mulish"
            >
              <ChevronLeft size={20} />
              Previous
            </button>

            <div className="flex gap-3">
              {currentStep < 4 ? (
                <button
                  onClick={handleNext}
                  disabled={!isStepValid(currentStep)}
                  className="flex items-center gap-2 bg-[#7D0A0A] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#5A0707] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-Mulish"
                >
                  Next
                  <ChevronRight size={20} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!isStepValid(currentStep) || isSubmitting}
                  className="bg-[#7D0A0A] text-white px-8 py-2 rounded-md font-semibold hover:bg-[#5A0707] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-Mulish"
                >
                  {isSubmitting ? 'Saving...' : 'Save Preferences'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePreferenceForm;