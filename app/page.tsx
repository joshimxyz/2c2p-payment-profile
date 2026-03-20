"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import Footer from "./components/footer";
import Complience from "./components/complience";
import LoginModal from "./components/verify-mobile-modal";
import ViewAllCard from "./components/container/view-all-card";
import PayWithNewCard from "./components/container/pay-with-new-card";

import { useAuth } from "./context/AuthContext";

import { Card } from "./types";

export default function Home() {
  const router = useRouter();
  const { login, saveCard, isLoggedIn } = useAuth();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"view" | "new">("new");
  const [newCardData, setNewCardData] = useState<Card | null>(null);
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const [isPaymentReady, setIsPaymentReady] = useState<boolean>(false);
  const [isRememberChecked, setIsRememberChecked] = useState<boolean>(false);

  const handlePayment = async () => {
    if (isProcessing || !isPaymentReady) return;

    if (isRememberChecked && !isLoggedIn) {
      setOpenLoginModal(true);
      return;
    }

    setIsProcessing(true);

    try {
      if (isRememberChecked && newCardData && isLoggedIn) {
        await saveCard({
          bank: "EBL",
          name: newCardData.name,
          number: newCardData.number,
          expires: newCardData.expires,
        });
      }

      await new Promise((resolve) => setTimeout(resolve, 2500));

      router.push("/success");
    } catch (error) {
      console.error("Transaction failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="font-poppins bg-white w-full max-w-120 min-h-screen sm:min-h-0 shadow-lg flex flex-col relative mx-auto">
      {viewMode === "view" ? (
        <ViewAllCard
          onBack={() => setViewMode("new")}
          setPaymentReady={setIsPaymentReady}
        />
      ) : (
        <PayWithNewCard
          setPaymentReady={setIsPaymentReady}
          onCardDataChange={setNewCardData}
          setOpenLoginModal={setOpenLoginModal}
          isRememberChecked={isRememberChecked}
          onRememberChange={setIsRememberChecked}
          onClickViewAll={() => setViewMode("view")}
        />
      )}

      <div className="px-4 flex-1 flex flex-col gap-6 mt-4 pb-8">
        <button
          onClick={handlePayment}
          disabled={!isPaymentReady || isProcessing}
          className="w-full flex justify-center items-center cursor-pointer font-medium rounded-lg py-3 bg-[#0088FF] text-white disabled:bg-[#E7EAEF] disabled:text-[#A1ABBD] disabled:cursor-not-allowed transition-all active:scale-[0.98]"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            `Pay ฿ 6,460`
          )}
        </button>

        <p className="text-[11px] text-center font-medium text-[#5B6167] leading-relaxed">
          By clicking the &quot;Pay&quot; button you agree to our{" "}
          <span className="text-[#0088FF] cursor-pointer hover:underline">
            Terms of Service
          </span>{" "}
          which is limited to facilitating your payment to Thai Airways.
        </p>

        <Complience />
      </div>

      <Footer />

      <LoginModal
        open={openLoginModal}
        onVerifySuccess={(phoneNumber: string) => {
          login(phoneNumber);
          setOpenLoginModal(false);
        }}
        onClose={() => setOpenLoginModal(false)}
      />
    </div>
  );
}
