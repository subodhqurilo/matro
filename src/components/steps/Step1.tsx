'use client';

import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { ArrowLeft } from 'lucide-react';

const profileOptions = [
  { id: 'myself', label: 'Myself' },
  { id: 'son', label: 'Son' },
  { id: 'daughter', label: 'Daughter' },
  { id: 'brother', label: 'Brother' },
  { id: 'sister', label: 'Sister' },
  { id: 'friend', label: 'Friend' },
  { id: 'relative', label: 'Relative' },
];

const Step1Form = ({
  selectedProfile,
  setSelectedProfile,
  selectedGender,
  setSelectedGender,
  handleContinueStep1,
}: {
  selectedProfile: string;
  setSelectedProfile: (value: string) => void;
  selectedGender: string;
  setSelectedGender: (value: string) => void;
  handleContinueStep1: () => void;
}) => (
  <>
    <div className="flex items-center space-x-3 mb-6">
      <ArrowLeft className="h-5 w-5 text-gray-500" />
      <h2 className="text-xl font-semibold text-gray-900">
        Please provide your basic details:
      </h2>
    </div>

    <div className="mb-6">
      <Label className="text-sm font-medium text-gray-700 mb-3 block">
        Select a profile for
      </Label>
      <div className="grid grid-cols-3 gap-2">
        {profileOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setSelectedProfile(option.id)}
            className={`px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
              selectedProfile === option.id
                ? 'bg-rose-700 text-white border-rose-700 shadow-md'
                : 'bg-white text-gray-700 border-gray-300 hover:border-rose-300 hover:bg-rose-50'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>

    <div className="mb-6">
      <Label className="text-sm font-medium text-gray-700 mb-3 block">
        Gender:
      </Label>
      <RadioGroup 
        value={selectedGender} 
        onValueChange={setSelectedGender}
        className="flex space-x-6"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="male" id="male" className="text-rose-600" />
          <Label htmlFor="male" className="font-medium">Male</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="female" id="female" className="text-rose-600" />
          <Label htmlFor="female" className="font-medium">Female</Label>
        </div>
      </RadioGroup>
    </div>

    <Button 
      onClick={handleContinueStep1}
      className="w-full bg-rose-700 hover:bg-rose-800 text-white py-3 font-medium text-base shadow-lg hover:shadow-xl transition-all duration-200"
      size="lg"
    >
      Continue
    </Button>
  </>
);

Step1Form.propTypes = {
  selectedProfile: PropTypes.string.isRequired,
  setSelectedProfile: PropTypes.func.isRequired,
  selectedGender: PropTypes.string.isRequired,
  setSelectedGender: PropTypes.func.isRequired,
  handleContinueStep1: PropTypes.func.isRequired,
};

export default Step1Form;
