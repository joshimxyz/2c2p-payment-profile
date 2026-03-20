"use client";

import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

export default function VerifyMobileSheet({ open, onClose, onVerifySuccess }) {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  
  // Ref to manage focus between the 6 OTP inputs
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Reset state when modal closes/opens
  useEffect(() => {
    if (!open) {
      setStep('phone');
      setOtp(new Array(6).fill(""));
    }
  }, [open]);

  if (!open) return null;

  const handleConfirmNumber = () => {
    // Basic validation: ensure number is long enough (e.g., Thai mobile 10 digits)
    if (phoneNumber.replace(/\D/g, '').length >= 9) {
      setStep('otp');
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    // Only allow single numeric digits
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input if a value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify if the last digit is filled
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === 6) {
      onVerifySuccess(phoneNumber);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move focus back on Backspace if current field is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className='absolute inset-0 z-50 bg-black/40 flex flex-col justify-start'>
      <div className='bg-white rounded-b-2xl shadow-xl transition-all duration-300'>
        <div className='p-6 w-full mx-auto relative'>
          
          <div className='flex justify-end mb-2'>
            <button onClick={onClose} className='flex items-center gap-1 text-sm font-medium border-b border-dashed border-black pb-0.5 hover:opacity-70 transition-opacity'>
              Close <X size={16} />
            </button>
          </div>

          {step === 'phone' ? (
            <div className="animate-in fade-in slide-in-from-top-4 duration-300">
              <div className='flex flex-col gap-2 mb-4'>
                <h2 className='text-[16px] font-bold'>
                  Welcome Back, <span className='font-normal text-gray-600'>Please Verify Your Mobile Number.</span>
                </h2>
                <p className='text-[11px] text-gray-500 leading-relaxed'>
                  Enter your mobile number to receive an OTP and continue your payment; log in to use existing cards.
                </p>
              </div>

              <div className='relative flex flex-col gap-3 mb-6'>
                <div className='relative'>
                  <div className='absolute left-3 top-1/2 -translate-y-1/2'>
                    <FlagIcon />
                  </div>
                  <input
                    type='tel'
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder='Mobile Number'
                    className='w-full rounded-lg text-sm py-3 border border-[#E7EAEF] pl-12 focus:border-[#0088FF] outline-none transition-colors'
                  />
                </div>
                <button onClick={onClose} className='text-[#0088FF] text-[12px] font-semibold self-end hover:underline'>
                  Pay without login
                </button>
              </div>

              <button 
                onClick={handleConfirmNumber}
                className='w-full py-3.5 bg-[#0088FF] text-white rounded-lg font-bold text-sm shadow-md active:scale-[0.98] transition-all'
              >
                Confirm Number
              </button>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h2 className='text-xl font-bold mb-4'>OTP Verification...</h2>
              <p className='text-sm text-gray-600 mb-6 leading-relaxed'>
                We just sent you a secure One-Time Password (OTP) to your mobile number 
                <span className="font-bold text-black ml-1">
                  {phoneNumber.length > 5 ? phoneNumber.replace(/(\d{3})\d+(\d{2})/, "$1 XXX XX $2") : phoneNumber}
                </span> via text message.
              </p>

              {/* OTP Input Grid - Matches your reference styling */}
              <div className='grid grid-cols-6 border border-[#E7EAEF] rounded-lg overflow-hidden bg-white mb-6'>
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => (inputRefs.current[idx] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    placeholder="-"
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    onChange={(e) => handleOtpChange(e, idx)}
                    className='w-full h-14 text-center text-lg font-bold border-r last:border-r-0 border-[#E7EAEF] focus:bg-blue-50 outline-none transition-colors'
                  />
                ))}
              </div>

              <div className="flex justify-between text-sm font-medium mb-8">
                <button onClick={() => setStep('phone')} className="text-[#0088FF] text-xs hover:underline">Change Number ?</button>
                <button className="text-[#0088FF] text-xs hover:underline">Resend OTP</button>
              </div>

              <button 
                onClick={() => onVerifySuccess(phoneNumber)}
                className='w-full py-3.5 bg-[#0088FF] text-white rounded-lg font-bold text-sm shadow-md active:scale-[0.98] transition-all'
              >
                Verify OTP
              </button>
            </div>
          )}

          <p className='text-[11px] text-gray-400 text-center mt-4'>
            By clicking <span className='font-medium'>&quot;{step === 'phone' ? 'Confirm Number' : 'Verify OTP'}&quot;</span> we will match your OTP and proceed to the Payment page.
          </p>

          <div className='flex justify-center mt-6'>
            <div className='w-12 h-1.5 bg-gray-200 rounded-full'></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlagIcon() {
  return (
    <svg width='22' height='14' viewBox='0 0 30 18' className="rounded-sm shadow-sm">
      <rect width='30' height='18' fill='#A51931' />
      <rect y='3.6' width='30' height='10.8' fill='#FFFFFF' />
      <rect y='6.3' width='30' height='5.4' fill='#2D2A4A' />
    </svg>
  );
}