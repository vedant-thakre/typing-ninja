import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OtpInput from "react-otp-input";
import AnimatedButton from "../components/ui/Other/AnimatedButton";
import { verifyEmailOTP } from "../store/slices/userSlice";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const userdata = useSelector((state) => state?.user?.userData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 4) {
      setError("Please enter a valid 4-digit OTP");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await dispatch(verifyEmailOTP({ otp }));
      if (response?.payload?.status === 200) {
        navigate("/settings");
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userdata?.isVerified) {
      navigate("/");
    }
  }, [userdata]);

  //   const handleResendOTP = () => {
  //     if (!canResend) return;

  //     setTimer(60);
  //     setCanResend(false);
  //     setOtp("");
  //     setError("");

  //     // Dispatch resend OTP action (using your existing loginUser or resendOTP action)
  //     dispatch(loginUser())
  //       .unwrap()
  //       .then(() => {
  //         // Success - OTP sent
  //       })
  //       .catch((err) => {
  //         setError(err.message || "Failed to resend OTP");
  //       });
  //   };

  // Timer for resend OTP
  // useEffect(() => {
  //   let interval;
  //   if (timer > 0) {
  //     interval = setInterval(() => {
  //       setTimer((prev) => {
  //         if (prev <= 1) {
  //           setCanResend(true);
  //           return 0;
  //         }
  //         return prev - 1;
  //       });
  //     }, 1000);
  //   }
  //   return () => clearInterval(interval);
  // }, [timer]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  // useEffect(() => {
  //   document.addEventListener("keydown", handleKeyPress);
  //   return () => {
  //     document.removeEventListener("keydown", handleKeyPress);
  //   };
  // }, [otp]);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-bgprimary flex flex-col items-center gap-3 pt-7 pb-5 px-5 rounded-2xl shadow-hard">
        <h5 className="text-textcolor tracking-wider font-route text-[26px] font-bold">
          Verify OTP
        </h5>

        <p className="text-textcolor flex flex-col font-route text-content mb-4 text-center">
          <span>Enter the 4-digit verification code sent to email below.</span>
          <span className="font-semibold">
            {" "}
            {userdata?.email || "your email"}
          </span>
        </p>

        <form onSubmit={handleSubmit} className="w-full">
          {/* OTP Input using react-otp-input */}
          <div className="mb-6 flex justify-center">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<span className="mx-2" />}
              renderInput={(props) => (
                <input
                  {...props}
                  className="!w-12 !h-12 text-textcolor font-route text-center text-xl font-bold bg-bgprimary border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:border-0 focus:ring-2 focus:ring-blue-400 transition-all appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
              )}
              inputType="number"
              shouldAutoFocus
            />
          </div>

          <AnimatedButton
            type="submit"
            disabled={isLoading || otp.length !== 4}
            title={isLoading ? "VERIFYING..." : "VERIFY"}
            className={`font-bold border-bdshadow border-4 mt-[6px] text-white rounded-lg w-full py-[5px] font-route text-body1 ${
              isLoading || otp.length !== 4
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {isLoading ? "Verifying..." : "Verify"}
          </AnimatedButton>
        </form>

        {/* Resend OTP Section
        <div className="mt-4 text-center">
          <p className="text-textcolor text-sm">
            Didn't receive code?{" "}
            {canResend ? (
              <button
                type="button"
                onClick={handleResendOTP}
                className="text-blue-500 font-medium hover:text-blue-600 hover:underline"
              >
                Resend OTP
              </button>
            ) : (
              <span className="text-gray-500">
                Resend in <span className="font-bold">{timer}s</span>
              </span>
            )}
          </p>
          
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-textcolor text-xs mt-2 hover:text-gray-700 hover:underline"
          >
            ← Back to previous page
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default VerifyEmail;
