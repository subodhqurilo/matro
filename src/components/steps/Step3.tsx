'use client';

import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';

const Step3Form = ({
  religion,
  setReligion,
  willingToMarryOtherCaste,
  setWillingToMarryOtherCaste,
  caste,
  setCaste,
  community,
  setCommunity,
  subCommunity,
  setSubCommunity,
  motherTongue,
  setMotherTongue,
  onBack,
  handleContinueStep3,
}: {
  religion: string;
  setReligion: (value: string) => void;
  willingToMarryOtherCaste: boolean;
  setWillingToMarryOtherCaste: (value: boolean) => void;
  caste: string;
  setCaste: (value: string) => void;
  community: string;
  setCommunity: (value: string) => void;
  subCommunity: string;
  setSubCommunity: (value: string) => void;
  motherTongue: string;
  setMotherTongue: (value: string) => void;
  onBack: () => void;
  handleContinueStep3: () => void;
}) => {
  const religionOptions = [
    { value: 'Hindu', label: 'Hindu' },
    { value: 'Muslim', label: 'Muslim' },
    { value: 'Christian', label: 'Christian' },
    { value: 'Sikh', label: 'Sikh' },
    { value: 'Jain', label: 'Jain' },
    { value: 'Buddhist', label: 'Buddhist' },
    { value: 'Other', label: 'Other' },
  ];

  return (
    <>
      <div className="flex items-center space-x-3 mb-6">
        <button onClick={onBack}>
          <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-rose-600 transition-colors" />
        </button>
        <h2 className="text-xl font-semibold text-gray-900">
          Cultural Information
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
            Willing to Marry Other Caste
          </Label>
          <RadioGroup 
            value={willingToMarryOtherCaste.toString()} 
            onValueChange={(value) => setWillingToMarryOtherCaste(value === 'true')}
            className="flex space-x-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id="caste-yes" className="text-rose-600" />
              <Label htmlFor="caste-yes" className="font-medium">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id="caste-no" className="text-rose-600" />
              <Label htmlFor="caste-no" className="font-medium">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Caste (Optional)
          </Label>
          <Input
            placeholder="Enter your caste"
            value={caste}
            onChange={(e) => setCaste(e.target.value)}
            className="w-full bg-white"
          />
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Community (Optional)
          </Label>
          <Input
            placeholder="Enter your community"
            value={community}
            onChange={(e) => setCommunity(e.target.value)}
            className="w-full bg-white"
          />
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Sub-Community (Optional)
          </Label>
          <Input
            placeholder="Enter your sub-community"
            value={subCommunity}
            onChange={(e) => setSubCommunity(e.target.value)}
            className="w-full bg-white"
          />
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Mother Tongue *
          </Label>
          <Input
            placeholder="Enter your mother tongue"
            value={motherTongue}
            onChange={(e) => setMotherTongue(e.target.value)}
            className="w-full bg-white"
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
  willingToMarryOtherCaste: PropTypes.bool.isRequired,
  setWillingToMarryOtherCaste: PropTypes.func.isRequired,
  caste: PropTypes.string.isRequired,
  setCaste: PropTypes.func.isRequired,
  community: PropTypes.string.isRequired,
  setCommunity: PropTypes.func.isRequired,
  subCommunity: PropTypes.string.isRequired,
  setSubCommunity: PropTypes.func.isRequired,
  motherTongue: PropTypes.string.isRequired,
  setMotherTongue: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  handleContinueStep3: PropTypes.func.isRequired,
};

export default Step3Form;