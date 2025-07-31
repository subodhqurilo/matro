'use client';

import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';


interface Step3FormProps {
  height: string;
  setHeight: (value: string) => void;
  weight: string;
  setWeight: (value: string) => void;
  complexion: string;
  setComplexion: (value: string) => void;
  anyDisability: string;
  setAnyDisability: (value: string) => void;
  diet: string;
  setDiet: (value: string) => void;
  onBack: () => void;
  handleContinueStep3: () => void;
}
const Step3Form: React.FC<Step3FormProps> = ({
  height,
  setHeight,
  weight,
  setWeight,
  complexion,
  setComplexion,
  anyDisability,
  setAnyDisability,
  diet,
  setDiet,
  onBack,
  handleContinueStep3,
}) => {
  const heightOptions = [
    '4ft 8in', '4ft 9in', '4ft 10in', '4ft 11in', '5ft', '5ft 1in', '5ft 2in', 
    '5ft 3in', '5ft 4in', '5ft 5in', '5ft 6in', '5ft 7in', '5ft 8in', '5ft 9in', 
    '5ft 10in', '5ft 11in', '6ft', '6ft 1in', '6ft 2in', '6ft 3in'
  ];

  const complexionOptions = [
    'Fair', 'Wheatish', 'Dark', 'Medium', 'Very Fair'
  ];

  const dietOptions = [
    'Vegetarian', 'Non-Vegetarian', 'Vegan', 'Other'
  ];

  return (
    <>
      <div className="flex items-center space-x-3 mb-6">
        <button onClick={onBack}>
          <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-rose-600 transition-colors" />
        </button>
        <h2 className="text-xl font-semibold text-gray-900">
          Physical Attributes
        </h2>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Height *
          </Label>
          <Select value={height} onValueChange={setHeight}>
            <SelectTrigger>
              <SelectValue placeholder="Select your height" />
            </SelectTrigger>
            <SelectContent>
              {heightOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Weight (kg) *
          </Label>
          <Input
            type="number"
            placeholder="Enter your weight in kg"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full bg-white"
            min="0"
            required
          />
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Complexion *
          </Label>
          <Select value={complexion} onValueChange={setComplexion}>
            <SelectTrigger>
              <SelectValue placeholder="Select your complexion" />
            </SelectTrigger>
            <SelectContent>
              {complexionOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Any Disability
          </Label>
          <RadioGroup 
            value={anyDisability} 
            onValueChange={setAnyDisability}
            className="flex space-x-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Yes" id="disability-yes" className="text-rose-600" />
              <Label htmlFor="disability-yes" className="font-medium">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="No" id="disability-no" className="text-rose-600" />
              <Label htmlFor="disability-no" className="font-medium">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Diet *
          </Label>
          <Select value={diet} onValueChange={setDiet}>
            <SelectTrigger>
              <SelectValue placeholder="Select your diet" />
            </SelectTrigger>
            <SelectContent>
              {dietOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
  height: PropTypes.string.isRequired,
  setHeight: PropTypes.func.isRequired,
  weight: PropTypes.string.isRequired,
  setWeight: PropTypes.func.isRequired,
  complexion: PropTypes.string.isRequired,
  setComplexion: PropTypes.func.isRequired,
  anyDisability: PropTypes.string.isRequired,
  setAnyDisability: PropTypes.func.isRequired,
  diet: PropTypes.string.isRequired,
  setDiet: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  handleContinueStep3: PropTypes.func.isRequired,
};

export default Step3Form;