'use client';

import Image from 'next/image';

const Hero: React.FC = () => {


  return (
    <div className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center">
        <div className="w-full flex flex-col justify-center pl-16 pr-8 py-24 mb-40">
          <h1 className="text-5xl font-medium text-[#343434] leading-tight font-Lato">
            A Pure Path to Marriage — <br />
            With Love and Trust at Heart
          </h1>
          <p className="text-1xl font-light text-[#757575] mt-6 font-Lato">
            This is more than just a matrimonial app. It's a heartfelt journey toward companionship, built on honesty, care, and community — without pressure or payment.
          </p>
        </div>
      </div>
      <div className="relative flex items-center justify-end">
        <Image
          src="/assets/heroimage.png"
          alt="hero"
          layout="fill"
          objectFit="cover"
          className="w-full h-full object-cover"
          priority
        />
      </div>
      {/* Mobile Search Form */}
      <div className="block lg:hidden w-full px-4 mt-6">
        <div className="flex flex-col gap-4 bg-white p-4 shadow-xl border border-gray-200 rounded-md">
          <div className="flex flex-col">
            <label className="text-sm mb-1 font-medium text-[#757575] font-sans">I'm looking for a</label>
            <select className="border-[#6F0000] border p-2 text-md font-medium rounded w-full font-Mulish">
              <option>Women</option>
              <option>Men</option>
            </select>
          </div>
          <div className="flex gap-2 items-end">
            <div className="flex flex-col">
              <label className="text-sm mb-1 font-medium text-[#757575] font-sans">Age</label>
              <input type="number" min="18" max="99" defaultValue="22" className="border border-[#6F0000] p-2 text-md font-medium rounded w-20 font-Mulish" />
            </div>
            <div className="pb-2 text-md font-medium font-Mulish">to</div>
            <div className="flex flex-col">
              <label className="invisible font-medium">Age</label>
              <input type="number" min="18" max="99" defaultValue="27" className="border border-[#6F0000] p-2 text-md font-medium rounded w-20 font-Mulish" />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm mb-1 font-medium text-[#757575] font-sans">Of Religion</label>
            <select className="border-[#6F0000] border p-2 text-md font-medium rounded w-full font-Mulish">
              <option>Hindu</option>
              <option>Muslim</option>
              <option>Christian</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm mb-1 font-medium text-[#757575] font-sans">And Mother Tongue</label>
            <select className="border-[#6F0000] border p-2 text-md font-medium rounded w-full font-Mulish">
              <option>English</option>
              <option>Hindi</option>
            </select>
          </div>
          <button
            type="button"
            className="bg-[#7D0A0A] text-white w-full py-3 rounded text-md font-semibold font-Mulish shadow-md hover:bg-[#5A0707] transition-colors duration-200"
            
          >
            Let's Begin
          </button>
        </div>
      </div>
      {/* Desktop Search Form */}
      <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 top-[440px] z-20 w-full max-w-4xl">
        <div className="flex items-center justify-evenly gap-6 bg-white px-6 py-5 shadow-2xl border border-gray-200 w-full">
          <div className="flex flex-col">
            <label className="text-sm mb-1 font-medium text-[#757575] font-sans">I'm looking for a</label>
            <select className="border-[#6F0000] border p-2 text-md font-medium rounded min-w-[120px] font-Mulish">
              <option>Women</option>
              <option>Men</option>
            </select>
          </div>
          <div className="flex items-end gap-2 text-md font-medium font-Mulish">
            <div className="flex flex-col">
              <label className="text-sm mb-1 font-medium text-[#757575] font-sans">Age</label>
              <input type="number" min="18" max="99" defaultValue="22" className="border border-[#6F0000] p-2 text-md font-medium rounded w-16 font-Mulish" />
            </div>
            <div className="pb-2">to</div>
            <div className="flex flex-col">
              <label className="invisible font-medium">Age</label>
              <input type="number" min="18" max="99" defaultValue="27" className="border border-[#6F0000] p-2 text-md font-medium rounded w-16 font-Mulish" />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm mb-1 font-medium text-[#757575] font-sans">Of Religion</label>
            <select className="border-[#6F0000] border p-2 text-md font-medium rounded min-w-[120px] font-Mulish">
              <option>Hindu</option>
              <option>Muslim</option>
              <option>Christian</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm mb-1 font-medium text-[#757575] font-sans">And Mother Tongue</label>
            <select className="border-[#6F0000] border p-2 text-md font-medium rounded min-w-[120px] font-Mulish">
              <option>English</option>
              <option>Hindi</option>
            </select>
          </div>
          <button
            type="button"
            className="bg-[#7D0A0A] text-white px-7 py-3 rounded text-md font-semibold font-Mulish shadow-md hover:bg-[#5A0707] transition-colors duration-200"
          
          >
            Let's Begin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;