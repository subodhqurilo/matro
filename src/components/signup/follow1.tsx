'use client';

import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

type Follow1FormProps = {
  fullName: string;
  setFullName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  mobileNumber: string;
  setMobileNumber: (value: string) => void;
  createPassword: string;
  setCreatePassword: (value: string) => void;
  onBack: () => void;
  handleContinueFollow2: () => void;
};

const Follow1Form = ({
  fullName,
  setFullName,
  email,
  setEmail,
  mobileNumber,
  setMobileNumber,
  createPassword,
  setCreatePassword,
  onBack,
  handleContinueFollow2,
}: Follow1FormProps) => (
  <>
    <div className="flex items-center space-x-3 mb-6">
      <button onClick={onBack}>
        <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-rose-600 transition-colors" />
      </button>
      <h2 className="text-xl font-semibold text-gray-900">Register</h2>
    </div>

    <div className="space-y-4 mb-6">
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Full Name *
        </Label>
        <Input
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full bg-white"
          required
        />
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Email
        </Label>
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-white"
        />
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Mobile Number
        </Label>
        <Input
          placeholder="Enter your mobile number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          className="w-full bg-white"
          required
        />
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Create Password *
        </Label>
        <Input
          type="password"
          placeholder="Create a secure password"
          value={createPassword}
          onChange={(e) => setCreatePassword(e.target.value)}
          className="w-full bg-white"
          required
        />
      </div>
    </div>

    <Button
      onClick={handleContinueFollow2}
      className="w-full bg-rose-700 hover:bg-rose-800 text-white py-3 font-medium text-base shadow-lg hover:shadow-xl transition-all duration-200"
      size="lg"
    >
      Register Now
    </Button>
  </>
);

Follow1Form.propTypes = {
  fullName: PropTypes.string.isRequired,
  setFullName: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  mobileNumber: PropTypes.string.isRequired,
  setMobileNumber: PropTypes.func.isRequired,
  createPassword: PropTypes.string.isRequired,
  setCreatePassword: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  handleContinueFollow2: PropTypes.func.isRequired,
};

export default Follow1Form;
