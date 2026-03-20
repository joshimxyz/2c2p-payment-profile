"use client";

import { useState } from "react";
import Header from "../header";
import WithGPay from "../with-gpay";
import SavedCard from "../shared/saved-card";
import PayByNewCard from "../pay-by-new-card";
import VerifyWithMobile from "../verify-with-mobile";
import SelectPaymentType from "../select-payment-type";

import { useAuth } from "@/app/context/AuthContext";
import { Card } from "@/app/types";

interface PayWithNewCardProps {
  isRememberChecked: boolean;
  onClickViewAll: () => void;
  setPaymentReady: (ready: boolean) => void;
  setOpenLoginModal: (open: boolean) => void;
  onCardDataChange: (data: Card | null) => void;
  onRememberChange: (checked: boolean) => void;
}

const PayWithNewCard = ({
  isRememberChecked,
  onClickViewAll,
  setPaymentReady,
  setOpenLoginModal,
  onCardDataChange,
  onRememberChange,
}: PayWithNewCardProps) => {
  const { cards, isLoggedIn } = useAuth();
  const [isCardSelected, setIsCardSelected] = useState(false);

  // We only show the first card as a "quick select" option
  const firstCard = cards.length > 0 ? cards[0] : null;

  const handleCardClick = () => {
    // If selecting a saved card, we might want to disable the "New Card" ready state
    setIsCardSelected(!isCardSelected);
    setPaymentReady(!isCardSelected); 
  };

  const handleCvvChange = (cvv: string) => {
    // Basic CVV validation for saved cards
    if (cvv.length === 3) {
      setPaymentReady(true);
    } else {
      setPaymentReady(false);
    }
  };

  return (
    <>
      <Header setOpenLoginModal={setOpenLoginModal} />
      <div className="p-4 flex-1 flex flex-col gap-6">
        {/* Price Display */}
        <div className="bg-[#E6F2FF] rounded-xl py-2 px-4">
          <p className="text-[12px] text-[#64748B] font-medium mb-1">
            You are paying
          </p>
          <p className="text-[22px] font-bold flex items-baseline leading-tight">
            <span className="font-normal text-[18px]">฿</span>6,460
          </p>
        </div>

        <WithGPay />

        <div className="relative flex items-center justify-center">
          <div className="border-t border-gray-300 w-full"></div>
          <span className="bg-white px-3 text-gray-500 text-sm absolute">
            Or
          </span>
        </div>

        <SelectPaymentType />

        {/* Saved Cards Section - Only show if logged in and has cards */}
        {isLoggedIn && firstCard && (
          <div className="max-w-md w-full flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h3 className="text-[14px] font-medium text-[#5B6167]">
                Pay with Saved Cards
              </h3>
              <button
                onClick={onClickViewAll}
                type="button"
                className="text-[#0088FF] text-[14px] font-medium hover:underline cursor-pointer"
              >
                View All
              </button>
            </div>

            <SavedCard
              card={firstCard}
              isManageMode={false}
              isSelectedForDelete={false}
              onCardClick={handleCardClick}
              onCvvChange={handleCvvChange}
              isSelectedForPayment={isCardSelected}
            />
          </div>
        )}

        {/* New Card Form */}
        <PayByNewCard
          setPaymentReady={setPaymentReady}
          onCardDataChange={onCardDataChange}
          onRememberChange={onRememberChange}
        />

        {/* Logic: Show Mobile Verification ONLY if:
          1. User checked "Remember this card"
          2. User is NOT already logged in
        */}
        {isRememberChecked && !isLoggedIn && (
          <div className="mt-2 animate-in fade-in slide-in-from-top-4 duration-300">
            <VerifyWithMobile />
          </div>
        )}
      </div>
    </>
  );
};

export default PayWithNewCard;