"use client";

import { useEffect, useState } from "react";
import { Check, Copy, ArrowLeft, Printer, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function PGWSuccess() {
  const router = useRouter();
  const { user } = useAuth();
  const [countdown, setCountdown] = useState(15);
  const [transactionId] = useState(() => `TG-260316F39`);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // router.push('/'); // Auto-redirect logic
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [router]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Transaction ID copied!");
  };

  return (
    <div className="min-h-screen bg-[#F4F7FA] flex items-center justify-center p-4 font-poppins">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-[#E7EAEF] overflow-hidden">
        {/* Status Header */}
        <div className="flex flex-col items-center pt-10 pb-6 px-6">
          <div className="w-16 h-16 bg-[#00C853] rounded-full flex items-center justify-center mb-4 shadow-lg shadow-green-100">
            <Check size={36} className="text-white" strokeWidth={3} />
          </div>
          <h1 className="text-xl font-bold text-[#1E293B]">
            Payment Successful
          </h1>
          <p className="text-sm text-[#64748B] mt-1 text-center">
            Your transaction has been processed securely.
          </p>
        </div>

        {/* Transaction Details Table */}
        <div className="px-6 py-4 bg-[#F8FAFC] border-y border-[#E7EAEF]">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <span className="text-xs font-medium text-[#64748B] uppercase tracking-wider">
                Amount Paid
              </span>
              <span className="text-lg font-bold text-[#1E293B]">
                ฿ 6,460.00
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-[#64748B] uppercase tracking-wider">
                Transaction ID
              </span>
              <div
                className="flex items-center gap-1.5 bg-white border px-2 py-1 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleCopy(transactionId)}
              >
                <span className="text-xs font-mono font-semibold text-[#1E293B]">
                  {transactionId}
                </span>
                <Copy size={12} className="text-[#94A3B8]" />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-[#64748B] uppercase tracking-wider">
                Date & Time
              </span>
              <span className="text-xs font-semibold text-[#1E293B]">
                {new Date().toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-[#64748B] uppercase tracking-wider">
                Status
              </span>
              <span className="text-[10px] font-bold bg-[#DCFCE7] text-[#166534] px-2 py-0.5 rounded-full uppercase tracking-tighter">
                Settled
              </span>
            </div>
          </div>
        </div>

        {/* Action Section */}
        <div className="p-6 flex flex-col gap-4">
          <div className="flex gap-3">
            <button
              onClick={() => window.print()}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-[#E2E8F0] rounded-lg text-sm font-medium text-[#475569] hover:bg-gray-50 transition-all active:scale-95"
            >
              <Printer size={16} /> Print Receipt
            </button>
            <button
              onClick={() => router.push("/")}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#0088FF] rounded-lg text-sm font-medium text-white hover:bg-[#0077E6] transition-all shadow-md shadow-blue-100 active:scale-95"
            >
              Return to Merchant
            </button>
          </div>

          {/* Auto Redirect Info */}
          <div className="text-center">
            <p className="text-[11px] text-[#94A3B8]">
              You will be redirected back to the merchant site in{" "}
              <span className="font-bold text-[#475569]">{countdown}s</span>
            </p>
          </div>
        </div>

        {/* PGW Branding & Security Footer */}
        <div className="px-6 py-4 bg-[#F1F5F9] border-t border-[#E7EAEF] flex justify-between items-center">
          <div className="flex items-center gap-1.5 opacity-60">
            <ShieldCheck size={14} className="text-[#475569]" />
            <span className="text-[10px] font-bold text-[#475569] uppercase tracking-widest">
              Secure Gateway
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
