'use client';

import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock } from 'lucide-react';

type Level1FormProps = {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  handleContinueLevel1: () => void;
};

const Level1Form = ({
  email,
  setEmail,
  password,
  setPassword,
  handleContinueLevel1,
}: Level1FormProps) => (
  <>
    <div className="flex flex-col  items-center justify-center space-x-3 gap-3 mb-6">
      
      <h2 className="text-xl  font-Lato text-gray-900">
        Logo
      </h2>

      <p className='text-xl  font-Lato text-gray-900'>Welcome back! Please Login</p>
    </div>

    <div className="space-y-4 mb-6">
      <div>
        <Label className="text-sm font-Inter text-gray-700 mb-2 block">
          Email ID *
        </Label>
        <div className="relative">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pr-10 font-Inter bg-white"
            required
          />
          <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div>
        <Label className="text-sm font-Inter text-gray-700 mb-2 block">
          Password *
        </Label>
        <div className="relative">
          <Input
            type="password"
            placeholder="Please Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pr-10 font-Inter bg-white"
            required
          />
          <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>

<div className='flex items-center justify-between text-sm font-Montserrat text-gray-600 mb-6'>
  <h2>Login with OTP</h2>
  <h2>Forget Password?</h2>
</div>

    <Button
      onClick={handleContinueLevel1}
      className="w-full bg-rose-700 hover:bg-rose-800 text-white py-3 font-inter text-base shadow-lg hover:shadow-xl transition-all duration-200"
      size="lg"
    >
      Login
    </Button>

    <p className=' items-center justify-center text-sm text-gray-600 mt-6 font-Inter'>Don&apos;t have account ?  Signup here</p>
  </>
);

Level1Form.propTypes = {
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleContinueLevel1: PropTypes.func.isRequired,
};

export default Level1Form;