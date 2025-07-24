'use client';

import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Calendar } from 'lucide-react';

const Step2Form = ({
  firstName,
  setFirstName,
  middleName,
  setMiddleName,
  lastName,
  setLastName,
  dateOfBirth,
  setDateOfBirth,
  height,
  setHeight,
  diet,
  setDiet,
  onBack,
  handleContinueStep2,
}: {
  firstName: string;
  setFirstName: (value: string) => void;
  middleName: string;
  setMiddleName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  dateOfBirth: string;
  setDateOfBirth: (value: string) => void;
  height: string;
  setHeight: (value: string) => void;
  diet: string;
  setDiet: (value: string) => void;
  onBack: () => void;
  handleContinueStep2: () => void;
}) => (
  <>
    <div className="flex items-center space-x-3 mb-6">
      <button onClick={onBack}>
        <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-rose-600 transition-colors" />
      </button>
      <h2 className="text-xl font-semibold text-gray-900">
        Personal Information
      </h2>
    </div>

    <div className="space-y-4 mb-6">
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          First Name *
        </Label>
        <Input
          placeholder="Enter your first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full bg-white"
          required
        />
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Middle Name
        </Label>
        <Input
          placeholder="Enter your middle name (optional)"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
          className="w-full bg-white"
        />
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Last Name *
        </Label>
        <Input
          placeholder="Enter your last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full bg-white"
          required
        />
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Date of Birth *
        </Label>
        <div className="relative">
          <Input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="w-full pr-10 bg-white"
            required
          />
          <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Height *
        </Label>
        <Select value={height} onValueChange={setHeight}>
          <SelectTrigger>
            <SelectValue placeholder="Select your height" />
          </SelectTrigger>
          <SelectContent>
            {['4ft 8in', '4ft 9in', '4ft 10in', '4ft 11in', '5ft', '5ft 1in', '5ft 2in', '5ft 3in', '5ft 4in', '5ft 5in', '5ft 6in', '5ft 7in', '5ft 8in', '5ft 9in', '5ft 10in', '5ft 11in', '6ft', '6ft 1in', '6ft 2in', '6ft 3in'].map((h) => (
              <SelectItem key={h} value={h}>{h}</SelectItem>
            ))}
          </SelectContent>
        </Select>
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
            <SelectItem value="Vegetarian">Vegetarian</SelectItem>
            <SelectItem value="Non-Vegetarian">Non-Vegetarian</SelectItem>
            <SelectItem value="Vegan">Vegan</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    <Button 
      onClick={handleContinueStep2}
      className="w-full bg-rose-700 hover:bg-rose-800 text-white py-3 font-medium text-base shadow-lg hover:shadow-xl transition-all duration-200"
      size="lg"
    >
      Continue
    </Button>
  </>
);

Step2Form.propTypes = {
  firstName: PropTypes.string.isRequired,
  setFirstName: PropTypes.func.isRequired,
  middleName: PropTypes.string.isRequired,
  setMiddleName: PropTypes.func.isRequired,
  lastName: PropTypes.string.isRequired,
  setLastName: PropTypes.func.isRequired,
  dateOfBirth: PropTypes.string.isRequired,
  setDateOfBirth: PropTypes.func.isRequired,
  height: PropTypes.string.isRequired,
  setHeight: PropTypes.func.isRequired,
  diet: PropTypes.string.isRequired,
  setDiet: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  handleContinueStep2: PropTypes.func.isRequired,
};

export default Step2Form;