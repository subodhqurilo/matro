'use client';

import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Upload } from 'lucide-react';

const Step6Form = ({
  profileImage,
  setProfileImage,
  imageProfileArray,
  setImageProfileArray,
  verificationType,
  setVerificationType,
  verificationValue,
  setVerificationValue,
  onBack,
  handleContinueStep6,
}: {
  profileImage: string;
  setProfileImage: (value: string) => void;
  imageProfileArray: string[];
  setImageProfileArray: (value: string[]) => void;
  verificationType: string;
  setVerificationType: (value: string) => void;
  verificationValue: string;
  setVerificationValue: (value: string) => void;
  onBack: () => void;
  handleContinueStep6: () => void;
}) => (
  <>
    <div className="flex items-center space-x-3 mb-6">
      <button onClick={onBack}>
        <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-rose-600 transition-colors" />
      </button>
      <h2 className="text-xl font-semibold text-gray-900">
        Profile Images and Verification
      </h2>
    </div>

    <div className="space-y-4 mb-6">
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Profile Image *
        </Label>
        <div className="relative">
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setProfileImage(file.name);
            }}
            className="w-full bg-white"
            required
          />
          <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
        {profileImage && <p className="text-sm text-gray-600 mt-1">Selected: {profileImage}</p>}
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Additional Profile Images
        </Label>
        <div className="relative">
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              const files = e.target.files;
              if (files) {
                const fileNames = Array.from(files).map((file) => file.name);
                setImageProfileArray(fileNames);
              }
            }}
            className="w-full bg-white"
          />
          <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
        {imageProfileArray.length > 0 && (
          <p className="text-sm text-gray-600 mt-1">Selected: {imageProfileArray.join(', ')}</p>
        )}
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Verification Type *
        </Label>
        <Select value={verificationType} onValueChange={setVerificationType}>
          <SelectTrigger>
            <SelectValue placeholder="Select verification type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pan Card">Pan Card</SelectItem>
            <SelectItem value="Aadhar Card">Aadhar Card</SelectItem>
            <SelectItem value="Passport">Passport</SelectItem>
            <SelectItem value="Driving License">Driving License</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Verification Value *
        </Label>
        <Input
          placeholder="Enter verification value"
          value={verificationValue}
          onChange={(e) => setVerificationValue(e.target.value)}
          className="w-full bg-white"
          required
        />
      </div>
    </div>

    <Button
      onClick={handleContinueStep6}
      className="w-full bg-rose-700 hover:bg-rose-800 text-white py-3 font-medium text-base shadow-lg hover:shadow-xl transition-all duration-200"
      size="lg"
    >
      Submit
    </Button>
  </>
);

Step6Form.propTypes = {
  profileImage: PropTypes.string.isRequired,
  setProfileImage: PropTypes.func.isRequired,
  imageProfileArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  setImageProfileArray: PropTypes.func.isRequired,
  verificationType: PropTypes.string.isRequired,
  setVerificationType: PropTypes.func.isRequired,
  verificationValue: PropTypes.string.isRequired,
  setVerificationValue: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  handleContinueStep6: PropTypes.func.isRequired,
};

export default Step6Form;