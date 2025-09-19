'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';

interface Step4FormProps {
  familyType: string;
  setFamilyType: (value: string) => void;
  familyStatus: string;
  setFamilyStatus: (value: string) => void;
  onBack: () => void;
  handleContinue: () => void;
}

const Step4Form: React.FC<Step4FormProps> = ({
  familyType,
  setFamilyType,
  familyStatus,
  setFamilyStatus,
  onBack,
  handleContinue,
}) => (
  <>
    <div className="flex items-center space-x-3 mb-6">
      <button onClick={onBack}>
        <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-rose-600 transition-colors" />
      </button>
      <h2 className="text-xl font-semibold text-gray-900">
        Family Background
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
            <SelectItem value="Nuclear">Nuclear</SelectItem>
            <SelectItem value="Joint">Joint</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
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
            <SelectItem value="Upper Middle Class">Upper Middle Class</SelectItem>
            <SelectItem value="High Class">High Class</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    <p className="text-sm text-gray-600 mb-6">
      Please provide details about your family background to help us find better matches.
    </p>

    <Button
      onClick={handleContinue}
      className="w-full bg-rose-700 hover:bg-rose-800 text-white py-3 font-medium text-base shadow-lg hover:shadow-xl transition-all duration-200"
      size="lg"
    >
      Continue
    </Button>
  </>
);

export default Step4Form;
