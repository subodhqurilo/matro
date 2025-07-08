'use client';

import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Phone } from 'lucide-react';

type Level2FormProps = {
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  onBack: () => void;
  handleContinueLevel2: () => void;
};

const Level2Form = ({
  phoneNumber,
  setPhoneNumber,
  onBack,
  handleContinueLevel2,
}: Level2FormProps) => (
  <>
    <button onClick={onBack}>
        <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-rose-600 transition-colors" />
      </button>
     <div className="flex flex-col items-center justify-center space-x-3 gap-3 mb-6">
      
      <h2 className="text-xl  font-Lato  text-gray-900">
        Logo
      </h2>

      <p className='text-xl  font-Lato text-gray-900'>Welcome back! Please Login</p>
    </div>
   

    <div className="space-y-4 mb-6">
      <div>
        <Label htmlFor="phone" className="text-sm font-Inter text-gray-700 mb-2 block">
          Enter Your Number *
        </Label>
        <div className="relative">
          <Input
            id="phone"
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
    </div>

<div className='flex items-center font-Montserrat justify-between text-sm text-gray-600 mb-6'>
  <h2>Login with OTP</h2>
  <h2>Forget Password?</h2>
</div>
   

    <Button
      onClick={handleContinueLevel2}
      className="w-full bg-rose-700 hover:bg-rose-800 text-white py-3 font-Inter text-base shadow-lg hover:shadow-xl transition-all duration-200"
      size="lg"
    >
      Login
    </Button>

    <p className=' text-sm text-gray-600 mt-6'>Don't have account ? Signup here</p>
  </>
);

Level2Form.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  setPhoneNumber: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  handleContinueLevel2: PropTypes.func.isRequired,
};

export default Level2Form;
