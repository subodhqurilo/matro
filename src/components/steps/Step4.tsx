'use client';

import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, Mail, Phone } from 'lucide-react';

const Step4Form = ({
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  anyDisability,
  setAnyDisability,
  onBack,
  handleContinueStep4,
}: {
  email: string;
  setEmail: (value: string) => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  anyDisability: boolean;
  setAnyDisability: (value: boolean) => void;
  onBack: () => void;
  handleContinueStep4: () => void;
}) => (
  <>
    <div className="flex items-center space-x-3 mb-6">
      <button onClick={onBack}>
        <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-rose-600 transition-colors" />
      </button>
      <h2 className="text-xl font-semibold text-gray-900">
        Contact Information
      </h2>
    </div>

    <div className="space-y-4 mb-6">
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Email ID *
        </Label>
        <div className="relative">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pr-10 bg-white"
            required
          />
          <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Phone Number *
        </Label>
        <div className="relative">
          <Input
            type="tel"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full pr-10 bg-white"
            required
          />
          <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Any Disability
        </Label>
        <RadioGroup 
          value={anyDisability.toString()} 
          onValueChange={(value) => setAnyDisability(value === 'true')}
          className="flex space-x-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="disability-yes" className="text-rose-600" />
            <Label htmlFor="disability-yes" className="font-medium">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="disability-no" className="text-rose-600" />
            <Label htmlFor="disability-no" className="font-medium">No</Label>
          </div>
        </RadioGroup>
      </div>
    </div>

    <p className="text-sm text-gray-600 mb-6">
      An active email ID and phone number are required to secure your profile.
    </p>

    <Button
      onClick={handleContinueStep4}
      className="w-full bg-rose-700 hover:bg-rose-800 text-white py-3 font-medium text-base shadow-lg hover:shadow-xl transition-all duration-200"
      size="lg"
    >
      Continue
    </Button>
  </>
);

Step4Form.propTypes = {
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  setPhoneNumber: PropTypes.func.isRequired,
  anyDisability: PropTypes.bool.isRequired,
  setAnyDisability: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  handleContinueStep4: PropTypes.func.isRequired,
};

export default Step4Form;