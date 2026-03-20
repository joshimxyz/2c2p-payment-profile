"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import SavedCard from "../../shared/saved-card";
import { useAuth } from "@/app/context/AuthContext";

const ViewAllCard = ({
  onBack,
  setPaymentReady,
}: {
  onBack: () => void;
  setPaymentReady: (ready: boolean) => void;
}) => {
  // Use deleteCards from context instead of saveCard
  const { cards, deleteCards } = useAuth();

  const [cvv, setCvv] = useState("");
  const [isManageMode, setIsManageMode] = useState(false);
  const [selectedCardsForDelete, setSelectedCardsForDelete] = useState<
    number[]
  >([]);
  const [selectedCardForPayment, setSelectedCardForPayment] = useState<
    number | null
  >(null);

  const cardListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !isManageMode &&
        cardListRef.current &&
        !cardListRef.current.contains(event.target as Node)
      ) {
        setSelectedCardForPayment(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isManageMode]);

  useEffect(() => {
    if (selectedCardForPayment !== null && cvv.length === 3) {
      setPaymentReady(true);
    } else {
      setPaymentReady(false);
    }
  }, [selectedCardForPayment, cvv, setPaymentReady]);

  const handleCardClick = (id: number) => {
    if (isManageMode) {
      setSelectedCardsForDelete((prev) =>
        prev.includes(id)
          ? prev.filter((cardId) => cardId !== id)
          : [...prev, id]
      );
    } else {
      setSelectedCardForPayment(id === selectedCardForPayment ? null : id);
    }
  };

  const handleCancelManageMode = () => {
    setIsManageMode(false);
    setSelectedCardsForDelete([]);
  };

  // FIXED: Now uses the deleteCards method from Context to sync UI
  const handleDelete = async () => {
    if (selectedCardsForDelete.length === 0) return;
    
    await deleteCards(selectedCardsForDelete);

    setSelectedCardsForDelete([]);
    setIsManageMode(false);
    setPaymentReady(false);
  };

  return (
    <div className="w-full bg-white p-4 flex flex-col font-poppins">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#0088FF] font-medium text-[12px]"
        >
          <ArrowLeft size={16} /> Go Back
        </button>
      </div>

      <div className="flex justify-between items-center mb-2">
        <h2 className="text-[#5B6167] text-[14px] font-medium">
          {isManageMode ? "Manage Saved Cards" : "Pay with Saved Cards"}
        </h2>

        {isManageMode ? (
          <div className="flex gap-4 items-center">
            <button
              onClick={handleDelete}
              disabled={selectedCardsForDelete.length === 0}
              className={`text-[14px] font-medium transition-colors ${
                selectedCardsForDelete.length > 0
                  ? "text-[#E63946]"
                  : "text-gray-300"
              }`}
            >
              Delete
            </button>
            <button
              onClick={handleCancelManageMode}
              className="text-[#0088FF] text-[14px] font-medium"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setIsManageMode(true);
              setSelectedCardForPayment(null);
            }}
            className="text-[#0088FF] text-[14px] font-medium"
          >
            Manage Card
          </button>
        )}
      </div>

      <div ref={cardListRef} className="flex flex-col gap-3">
        {cards.map((card) => (
          <SavedCard
            key={card.id}
            card={card}
            isManageMode={isManageMode}
            isSelectedForPayment={selectedCardForPayment === card.id}
            isSelectedForDelete={selectedCardsForDelete.includes(card.id)}
            onCardClick={(id) => {
              handleCardClick(id);
              if (!isManageMode) setPaymentReady(false);
            }}
            onCvvChange={(val) => {
              setCvv(val); // Added this to track CVV state locally
              if (val.length === 3) {
                setPaymentReady(true);
              } else {
                setPaymentReady(false);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ViewAllCard;