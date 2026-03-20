import { useRef, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const VerifyWithMobile = () => {
  const { isLoggedIn, login } = useAuth(); // Assuming login is available in your context

  const inputs = useRef([]);
  const [showOtp, setShowOtp] = useState(false);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }

    // TRIGGER LOGIN: Check if all 6 boxes are filled
    const fullOtp = newOtp.join("");
    if (fullOtp.length === 6) {
      handleVerifyOtp(fullOtp);
    }
  };

  const handleVerifyOtp = async (code) => {
    try {
      console.log("Verifying OTP:", code, "for mobile:", mobile);
      await login(mobile);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleGetOtp = () => {
    if (!/^0\d{9}$/.test(mobile)) {
      return;
    }
    setShowOtp(true);
  };

  if (isLoggedIn) return null;

  return (
    <>
      {!showOtp ? (
        <div className="w-full flex flex-col gap-1">
          <p className="text-[#5B6167] text-sm">Please verify your Mobile Number</p>
          <div className="relative flex flex-row gap-1 items-center">
            <div className="absolute left-3">
              <svg width="24" height="18" viewBox="0 0 30 18">
                <rect width="30" height="18" fill="#A51931" />
                <rect y="3.6" width="30" height="10.8" fill="#FFFFFF" />
                <rect y="6.3" width="30" height="5.4" fill="#2D2A4A" />
              </svg>
            </div>
            <input
              type="tel"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full rounded-lg text-sm py-2.5 border shadow-sm font-medium border-[#E7EAEF] placeholder:text-[#A1ABBD] pl-12 pr-20 focus:outline-none"
            />
            <button
              onClick={handleGetOtp}
              className="absolute right-3 text-[#0088FF] font-medium text-xs hover:underline"
            >
              Get OTP
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <p className="text-sm text-[#5B6167]">
            We just sent you a secure One-Time Password (OTP) to <b>{mobile}</b>.
          </p>

          <div className="w-full grid grid-cols-6 border border-[#E7EAEF] rounded-lg overflow-hidden bg-white">
            {otp.map((digit, i) => (
              <input
                key={i}
                maxLength={1}
                type="text"
                placeholder="-"
                inputMode="numeric"
                value={digit}
                ref={(el) => (inputs.current[i] = el)}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="w-full h-12 text-center text-lg font-semibold placeholder:text-[#A1ABBD] focus:outline-none border-r last:border-r-0 border-[#E7EAEF] focus:bg-blue-50 transition-colors"
              />
            ))}
          </div>

          <div className="flex justify-between text-sm">
            <button
              onClick={() => { setShowOtp(false); setOtp(new Array(6).fill("")); }}
              className="text-[#0088FF] font-medium text-xs hover:underline"
            >
              Change Number?
            </button>
            <button className="text-[#0088FF] font-medium text-xs hover:underline">
              Resend OTP
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default VerifyWithMobile;