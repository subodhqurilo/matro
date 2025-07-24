'use client';

import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';

const Step5Form = ({
  familyType,
  setFamilyType,
  familyStatus,
  setFamilyStatus,
  familyIncome,
  setFamilyIncome,
  city,
  setCity,
  state,
  setState,
  education,
  setEducation,
  employedIn,
  setEmployedIn,
  occupation,
  setOccupation,
  annualIncome,
  setAnnualIncome,
  workLocation,
  setWorkLocation,
  onBack,
  handleContinueStep5,
}: {
  familyType: string;
  setFamilyType: (value: string) => void;
  familyStatus: string;
  setFamilyStatus: (value: string) => void;
  familyIncome: string;
  setFamilyIncome: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  state: string;
  setState: (value: string) => void;
  education: string;
  setEducation: (value: string) => void;
  employedIn: string;
  setEmployedIn: (value: string) => void;
  occupation: string;
  setOccupation: (value: string) => void;
  annualIncome: string;
  setAnnualIncome: (value: string) => void;
  workLocation: string;
  setWorkLocation: (value: string) => void;
  onBack: () => void;
  handleContinueStep5: () => void;
}) => (
  <>
    <div className="flex items-center space-x-1 mb-10">
      <button onClick={onBack}>
        <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-rose-600 transition-colors" />
      </button>
      <h2 className="text-xl font-semibold text-gray-900">
        Family and Professional Information
      </h2>
    </div>

    <div className="space-y-4 mb-6">
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Family Type *
        </Label>
        <Select value={familyType} onValueChange={setFamilyType}>
          <SelectTrigger>
            <SelectValue placeholder="Select family type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Middle Class">Middle Class</SelectItem>
            <SelectItem value="Upper Class">Upper Class</SelectItem>
            <SelectItem value="Lower Class">Lower Class</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Family Status *
        </Label>
        <Select value={familyStatus} onValueChange={setFamilyStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Select family status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Middle Class">Middle Class</SelectItem>
            <SelectItem value="Upper Class">Upper Class</SelectItem>
            <SelectItem value="Lower Class">Lower Class</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Family Income *
        </Label>
        <Select value={familyIncome} onValueChange={setFamilyIncome}>
          <SelectTrigger>
            <SelectValue placeholder="Select family income" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-5 LPA">0-5 LPA</SelectItem>
            <SelectItem value="5-10 LPA">5-10 LPA</SelectItem>
            <SelectItem value="10-20 LPA">10-20 LPA</SelectItem>
            <SelectItem value="20+ LPA">20+ LPA</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          City *
        </Label>
        <Input
          placeholder="Enter your city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full bg-white"
          required
        />
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          State *
        </Label>
        <Input
          placeholder="Enter your state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="w-full bg-white"
          required
        />
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Education *
        </Label>
        <Input
          placeholder="Enter your education (e.g., B.Tech)"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          className="w-full bg-white"
          required
        />
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Employed In *
        </Label>
        <Select value={employedIn} onValueChange={setEmployedIn}>
          <SelectTrigger>
            <SelectValue placeholder="Select employment type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Private">Private</SelectItem>
            <SelectItem value="Government">Government</SelectItem>
            <SelectItem value="Self-Employed">Self-Employed</SelectItem>
            <SelectItem value="Not Employed">Not Employed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Occupation *
        </Label>
        <Input
          placeholder="Enter your occupation"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
          className="w-full bg-white"
          required
        />
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Annual Income *
        </Label>
        <Select value={annualIncome} onValueChange={setAnnualIncome}>
          <SelectTrigger>
            <SelectValue placeholder="Select annual income" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-5 LPA">0-5 LPA</SelectItem>
            <SelectItem value="5-10 LPA">5-10 LPA</SelectItem>
            <SelectItem value="10-20 LPA">10-20 LPA</SelectItem>
            <SelectItem value="20+ LPA">20+ LPA</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Work Location *
        </Label>
        <Input
          placeholder="Enter your work location"
          value={workLocation}
          onChange={(e) => setWorkLocation(e.target.value)}
          className="w-full bg-white"
          required
        />
      </div>
    </div>

    <Button
      onClick={handleContinueStep5}
      className="w-full bg-rose-700 hover:bg-rose-800 text-white py-3 font-medium text-base shadow-lg hover:shadow-xl transition-all duration-200"
      size="lg"
    >
      Continue
    </Button>
  </>
);

Step5Form.propTypes = {
  familyType: PropTypes.string.isRequired,
  setFamilyType: PropTypes.func.isRequired,
  familyStatus: PropTypes.string.isRequired,
  setFamilyStatus: PropTypes.func.isRequired,
  familyIncome: PropTypes.string.isRequired,
  setFamilyIncome: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
  setCity: PropTypes.func.isRequired,
  state: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
  education: PropTypes.string.isRequired,
  setEducation: PropTypes.func.isRequired,
  employedIn: PropTypes.string.isRequired,
  setEmployedIn: PropTypes.func.isRequired,
  occupation: PropTypes.string.isRequired,
  setOccupation: PropTypes.func.isRequired,
  annualIncome: PropTypes.string.isRequired,
  setAnnualIncome: PropTypes.func.isRequired,
  workLocation: PropTypes.string.isRequired,
  setWorkLocation: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  handleContinueStep5: PropTypes.func.isRequired,
};

export default Step5Form;