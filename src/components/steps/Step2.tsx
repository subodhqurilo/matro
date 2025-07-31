'use client';

import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';

interface Step2FormProps {
  religion: string;
  setReligion: (value: string) => void;
  willingToMarryOtherCaste: string;
  setWillingToMarryOtherCaste: (value: string) => void;
  caste: string;
  setCaste: (value: string) => void;
  community: string;
  setCommunity: (value: string) => void;
  gotra: string;
  setGotra: (value: string) => void;
  motherTongue: string;
  setMotherTongue: (value: string) => void;
  onBack: () => void;
  handleContinueStep2: () => void;
}

const Step2Form: React.FC<Step2FormProps> = ({
  religion,
  setReligion,
  willingToMarryOtherCaste,
  setWillingToMarryOtherCaste,
  caste,
  setCaste,
  community,
  setCommunity,
  gotra,
  setGotra,
  motherTongue,
  setMotherTongue,
  onBack,
  handleContinueStep2,
}) => (
  <>
    <div className="flex items-center space-x-3 mb-6">
      <button onClick={onBack}>
        <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-rose-600 transition-colors" />
      </button>
      <h2 className="text-xl font-semibold text-gray-900">
        Religion & Community
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
            <SelectItem value="Hindu">Hindu</SelectItem>
            <SelectItem value="Muslim">Muslim</SelectItem>
            <SelectItem value="Christian">Christian</SelectItem>
            <SelectItem value="Sikh">Sikh</SelectItem>
            <SelectItem value="Jain">Jain</SelectItem>
            <SelectItem value="Buddhist">Buddhist</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Willing to Marry Other Caste *
        </Label>
        <Select value={willingToMarryOtherCaste} onValueChange={setWillingToMarryOtherCaste}>
          <SelectTrigger>
            <SelectValue placeholder="Select preference" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Yes">Yes</SelectItem>
            <SelectItem value="No">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Caste
        </Label>
        <Input
          placeholder="Enter your caste (optional)"
          value={caste}
          onChange={(e) => setCaste(e.target.value)}
          className="w-full bg-white"
        />
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Community
        </Label>
        <Input
          placeholder="Enter your community (optional)"
          value={community}
          onChange={(e) => setCommunity(e.target.value)}
          className="w-full bg-white"
        />
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Gotra
        </Label>
        <Input
          placeholder="Enter your gotra (optional)"
          value={gotra}
          onChange={(e) => setGotra(e.target.value)}
          className="w-full bg-white"
        />
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Mother Tongue *
        </Label>
        <Select value={motherTongue} onValueChange={setMotherTongue}>
          <SelectTrigger>
            <SelectValue placeholder="Select your mother tongue" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Hindi">Hindi</SelectItem>
            <SelectItem value="Bengali">Bengali</SelectItem>
            <SelectItem value="Telugu">Telugu</SelectItem>
            <SelectItem value="Marathi">Marathi</SelectItem>
            <SelectItem value="Tamil">Tamil</SelectItem>
            <SelectItem value="Urdu">Urdu</SelectItem>
            <SelectItem value="Gujarati">Gujarati</SelectItem>
            <SelectItem value="Malayalam">Malayalam</SelectItem>
            <SelectItem value="Kannada">Kannada</SelectItem>
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
  religion: PropTypes.string.isRequired,
  setReligion: PropTypes.func.isRequired,
  willingToMarryOtherCaste: PropTypes.string.isRequired,
  setWillingToMarryOtherCaste: PropTypes.func.isRequired,
  caste: PropTypes.string,
  setCaste: PropTypes.func.isRequired,
  community: PropTypes.string,
  setCommunity: PropTypes.func.isRequired,
  gotra: PropTypes.string,
  setGotra: PropTypes.func.isRequired,
  motherTongue: PropTypes.string.isRequired,
  setMotherTongue: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  handleContinueStep2: PropTypes.func.isRequired,
};

export default Step2Form;