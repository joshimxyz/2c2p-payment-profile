"use client";

import { CircleQuestionMark } from 'lucide-react';
import { useEffect, useState, ChangeEvent } from 'react';;
import { Card } from '../types';

interface PayByNewCardProps {
  setPaymentReady: (ready: boolean) => void;
  onRememberChange: (checked: boolean) => void;
  onCardDataChange: (data: Card | null) => void;
}

const PayByNewCard = ({ 
  setPaymentReady, 
  onRememberChange, 
  onCardDataChange 
}: PayByNewCardProps) => {
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [isRemembered, setIsRemembered] = useState(false);

  // 1. Logic to format Card Number (1234 5678...)
  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 16);
    const matched = value.match(/.{1,4}/g);
    setCardNumber(matched ? matched.join(' ') : value);
  };

  // 2. Logic to format Expiry (MM/YY)
  const handleExpiryChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (value.length >= 3) {
      value = `${value.substring(0, 2)}/${value.substring(2, 4)}`;
    }
    setExpiry(value);
  };

  // 3. Validation Logic
  const rawCardNumber = cardNumber.replace(/\s/g, '');
  const isValid = 
    rawCardNumber.length >= 15 && 
    expiry.length === 5 && 
    cvv.length === 3 && 
    name.trim().length > 3;

  useEffect(() => {
    setPaymentReady(isValid);

    if (isValid) {
      onCardDataChange({
        name,
        expires: expiry,
        number: rawCardNumber,
      });
    } else {
      if (isRemembered) {
        setIsRemembered(false);
        onRememberChange(false);
      }
      onCardDataChange(null);
    }

    return () => setPaymentReady(false);
  }, [cardNumber, expiry, cvv, name, isValid, setPaymentReady, onCardDataChange, onRememberChange, isRemembered, rawCardNumber]);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsRemembered(checked);
    onRememberChange(checked);
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex justify-between items-end'>
        <h3 className='font-medium text-[14px] text-[#5B6167]'>Pay with New Cards</h3>
      </div>

      <div className='border border-[#E7EAEF] rounded-lg overflow-hidden bg-white shadow-sm'>
        <div className='border-b border-[#E7EAEF]'>
          <input
            type='text'
            value={cardNumber}
            placeholder='Card Number'
            onChange={handleCardNumberChange}
            className='w-full p-3 text-[13px] font-medium outline-none placeholder-[#A1ABBD]'
          />
        </div>
        
        <div className='flex border-b border-[#E7EAEF]'>
          <div className='w-1/2 border-r border-[#E7EAEF]'>
            <input
              type='text'
              placeholder='MM/YY'
              value={expiry}
              onChange={handleExpiryChange}
              className='w-full p-3 text-[13px] font-medium outline-none placeholder-[#A1ABBD]'
            />
          </div>
          <div className='w-1/2 relative'>
            <input
              type='text'
              placeholder='CVC/CVV'
              maxLength={3}
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
              className='w-full p-3 text-[13px] font-medium outline-none placeholder-[#A1ABBD]'
            />
          </div>
        </div>

        <div>
          <input
            type='text'
            placeholder='Card Holder Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full p-3 text-[13px] font-medium outline-none placeholder-[#A1ABBD]'
          />
        </div>
      </div>

      {/* Remember Me Logic */}
      <div className={`flex items-center gap-2 mt-1 transition-all duration-200 ${!isValid ? 'opacity-40' : 'opacity-100'}`}>
        <input
          id='remember'
          type='checkbox'
          checked={isRemembered}
          disabled={!isValid}
          onChange={handleCheckboxChange}
          className='w-4 h-4 accent-[#0088FF] cursor-pointer disabled:cursor-not-allowed rounded'
        />
        <label
          htmlFor='remember'
          className={`text-[#5B6167] font-medium text-[13px] flex items-center gap-1 ${isValid ? 'cursor-pointer' : 'cursor-not-allowed'}`}
        >
          Remember this Card
          <CircleQuestionMark className='w-4 h-4 text-[#A1ABBD]' />
        </label>
      </div>
    </div>
  );
};

export default PayByNewCard;