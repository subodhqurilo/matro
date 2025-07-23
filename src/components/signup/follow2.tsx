'use client';

import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp';
import { ArrowLeft } from 'lucide-react';

type Follow2FormProps = {
  otp: string;
  setOtp: (value: string) => void;
  onBack: () => void;
  handleContinueFollow1Form: () => void;
};

const Follow2Form = ({
  otp,
  setOtp,
  onBack,
  handleContinueFollow1Form,
}: Follow2FormProps) => {
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
        <div className="flex justify-center">
          <InputOTP maxLength={4} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSeparator />
              <InputOTPSlot index={1} />
              <InputOTPSeparator />
              <InputOTPSlot index={2} />
              <InputOTPSeparator />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-6 font-Montserrat text-center">
        Didn't receive OTP?{' '}
        <button
          type="button"
          onClick={handleResendOtp}
          className="text-rose-700 font-medium hover:underline"
        >
          Resend
        </button>
      </p>

      <Button
        onClick={handleContinueFollow1Form}
        disabled={otp.length !== 4}
        className="w-full bg-[#7D0A0A] hover:bg-[#9e0e0e]"
        size="lg"
      >
        Verify
      </Button>
    </>
  );
};

Follow2Form.propTypes = {
  otp: PropTypes.string.isRequired,
  setOtp: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  handleContinueFollow1Form: PropTypes.func.isRequired,
};

export default Follow2Form;
