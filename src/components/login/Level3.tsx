'use client';

import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot,InputOTPSeparator } from '@/components/ui/input-otp';
import { ArrowLeft } from 'lucide-react';

type Level3FormProps = {
  otp: string;
  setOtp: (value: string) => void;
  onBack: () => void;
  handleContinueLevel3: () => void;
};

const Level3Form = ({
  otp,
  setOtp,
  onBack,
  handleContinueLevel3,
}: Level3FormProps) => {
  const handleResendOtp = () => {
 
    console.log('Resending OTP...');
    alert('OTP has been resent.');
  };

  return (
    <>
     
      <button onClick={onBack}>
        <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-rose-600 transition-colors" />
      </button>

      
      <div className="flex flex-col items-center justify-center gap-3 mb-6">
        <h2 className="text-xl font-Lato text-gray-900">LOGO</h2>
        <p className="text-xl font-Lato text-gray-900">OTP VERIFICATION</p>
        <p className="text-sm font-Lato text-gray-900">
          We have sent the OTP to 9********4
        </p>
      </div>

   
      <div className="space-y-4 mb-6">
        <div>
          
          <div className="flex justify-center  ">
           <InputOTP maxLength={4} value={otp} onChange={setOtp}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSeparator/>
    <InputOTPSlot index={1} />
    <InputOTPSeparator/>
    <InputOTPSlot index={2} />
    <InputOTPSeparator/>
    <InputOTPSlot index={3} />
   
  </InputOTPGroup>
</InputOTP>
          </div>
        </div>
      </div>

    
      <p className="text-sm text-gray-600 mb-6 font-Montserrat text-center">
        Didn&apos;t receive OTP?{' '}
        <button
          type="button"
          onClick={handleResendOtp}
          className="text-rose-700 font-medium hover:underline"
        >
          Resend
        </button>
      </p>

      <Button
        onClick={handleContinueLevel3}
        disabled={otp.length !== 4}
        className="w-full bg-[#7D0A0A] hover:bg-[#9e0e0e]"
        size="lg"
      >
        Verify
      </Button>
    </>
  );
};

Level3Form.propTypes = {
  otp: PropTypes.string.isRequired,
  setOtp: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  handleContinueLevel3: PropTypes.func.isRequired,
};

export default Level3Form;
