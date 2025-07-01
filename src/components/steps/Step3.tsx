'use client';

import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';

type Step3FormProps = {
  religion: string;
  setReligion: (value: string) => void;
  community: string;
  setCommunity: (value: string) => void;
  livingIn: string;
  setLivingIn: (value: string) => void;
  onBack: () => void;
  handleContinueStep3: () => void;
};

const Step3Form = ({
  religion,
  setReligion,
  community,
  setCommunity,
  livingIn,
  setLivingIn,
  onBack,
  handleContinueStep3,
}: Step3FormProps) => {
  const religionOptions = [
    { value: 'hindu', label: 'Hindu' },
    { value: 'muslim', label: 'Muslim' },
    { value: 'christian', label: 'Christian' },
    { value: 'sikh', label: 'Sikh' },
    { value: 'jain', label: 'Jain' },
    { value: 'buddhist', label: 'Buddhist' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <>
      <div className="flex items-center space-x-3 mb-6">
        <button onClick={onBack}>
          <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-rose-600 transition-colors" />
        </button>
        <h2 className="text-xl font-semibold text-gray-900">
          Additional Information
        </h2>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Religion *
          </Label>
          <Select value={religion} onValueChange={setReligion}>
            <SelectTrigger>
              <SelectValue placeholder="Select your religion" />
            </SelectTrigger>
            <SelectContent>
              {religionOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Community (Optional)
          </Label>
          <Input
            placeholder="Enter your community"
            value={community}
            onChange={(e) => setCommunity(e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Living In *
          </Label>
          <Input
            placeholder="Enter your city or country"
            value={livingIn}
            onChange={(e) => setLivingIn(e.target.value)}
            className="w-full"
            required
          />
        </div>
      </div>

      <Button
        onClick={handleContinueStep3}
        className="w-full bg-rose-700 hover:bg-rose-800 text-white py-3 font-medium text-base shadow-lg hover:shadow-xl transition-all duration-200"
        size="lg"
      >
        Continue
      </Button>
    </>
  );
};

Step3Form.propTypes = {
  religion: PropTypes.string.isRequired,
  setReligion: PropTypes.func.isRequired,
  community: PropTypes.string.isRequired,
  setCommunity: PropTypes.func.isRequired,
  livingIn: PropTypes.string.isRequired,
  setLivingIn: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  handleContinueStep3: PropTypes.func.isRequired,
};

export default Step3Form;