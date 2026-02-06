import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import AnimatedButton from "../components/ui/Other/AnimatedButton";
import axiosInstance from "../services/axiosInstance";
import { useDispatch } from "react-redux";
import { RiLoader4Fill } from "react-icons/ri";
import { forgotPasswordSendOtp } from "../store/slices/userSlice";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getInitialStep = () => {
    const params = new URLSearchParams(location.search);
    const stepFromUrl = params.get("step");

    const emailSubmitted = sessionStorage.getItem("email_submitted");
    const otpVerified = sessionStorage.getItem("otp_verified");

    if (stepFromUrl === "reset-password") {
      return otpVerified ? "reset-password" : "forgot-password";
    }

    if (stepFromUrl === "enter-otp") {
      return emailSubmitted ? "enter-otp" : "forgot-password";
    }

    return "forgot-password";
  };

  const [state, setState] = useState(getInitialStep);

  useEffect(() => {
    sessionStorage.setItem("reset_step", state);

    const params = new URLSearchParams(location.search);
    params.set("step", state);
    window.history.replaceState(null, "", `?${params.toString()}`);
  }, [state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // STEP 1: SEND OTP
      if (state === "forgot-password") {
        if (!email) {
          setError("Email is required");
          toast.error("Email is required");
          return;
        }

        const response = await dispatch(forgotPasswordSendOtp(email));

        if (response?.status === 200) {
          // Persist flow state
          sessionStorage.setItem("email_submitted", "true");
          sessionStorage.setItem("email", email);
          sessionStorage.removeItem("otp_verified");

          setState("enter-otp");
        }

        return;
      }

      // STEP 2: VERIFY OTP
      if (state === "enter-otp") {
        if (otp.length !== 4) {
          setError("Please enter a valid 4-digit OTP");
          toast.error("Please enter a valid 4 digit OTP");
          return;
        }

        const { data } = await axiosInstance.post("/api/users/verify-otp", {
          email: sessionStorage.getItem("email"),
          otp,
        });

        toast.success(data.message || "OTP verified");

        // Persist verification
        sessionStorage.setItem("otp_verified", "true");

        setState("reset-password");
        return;
      }

      // STEP 3: RESET PASSWORD
      if (state === "reset-password") {
        if (!password || !confirmPassword) {
          setError("All fields are required");
          toast.error("All fields are required");
          return;
        }

        if (password !== confirmPassword) {
          setError("Passwords do not match");
          toast.error("Passwords do not match");
          return;
        }

        const { data } = await axiosInstance.post("/api/users/reset-password", {
          email: sessionStorage.getItem("email"),
          newPassword: password,
        });

        toast.success(data.message || "Password reset successfully");

        // Cleanup
        sessionStorage.clear();

        navigate("/login");
      }
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error.message;
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    switch (state) {
      case "forgot-password":
        return "Forgot Password";
      case "enter-otp":
        return "Verify OTP";
      case "reset-password":
        return "Reset Password";
      default:
        return "Forgot Password";
    }
  };

  const getSubtitle = () => {
    const storedEmail = sessionStorage.getItem("email") || email;

    switch (state) {
      case "forgot-password":
        return "Enter your registered email address.";
      case "enter-otp":
        return (
          <>
            <span>
              Enter the 4-digit verification code sent to email below.
            </span>
            <span className="font-semibold"> {storedEmail}</span>
          </>
        );
      case "reset-password":
        return "Enter your new password below.";
      default:
        return "";
    }
  };

  const getButtonText = () => {
    switch (state) {
      case "forgot-password":
        return { buttonText: "Send OTP", loadingText: "Sending OTP" };
      case "enter-otp":
        return { buttonText: "Verify OTP", loadingText: "Verifying OTP" };
      case "reset-password":
        return {
          buttonText: "Reset Password",
          loadingText: "Resetting Password",
        };
      default:
        return "Continue";
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-bgprimary flex flex-col items-center gap-2 pt-7 pb-5 px-5 rounded-2xl shadow-hard max-w-sm w-full mx-4">
        <h5 className="text-textcolor tracking-wider font-route text-[26px] font-bold text-center">
          {getTitle()}
        </h5>

        <p className="text-textcolor flex flex-col font-route text-content mb-4 text-center">
          {getSubtitle()}
        </p>

        <form onSubmit={handleSubmit} className="w-full">
          {/* 🔹 EMAIL INPUT */}
          {state === "forgot-password" && (
            <div className="mb-6">
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 border-bprimary w-full ml-2 lg:ml-0 rounded-md placeholder-gray-400 outline-none focus:ring-0 py-2 font-main text-[13px] px-2 bg-transparent text-textcolor"
                // required
              />
            </div>
          )}

          {/* 🔹 OTP INPUT */}
          {state === "enter-otp" && (
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
          )}

          {/* 🔹 PASSWORD INPUTS */}
          {state === "reset-password" && (
            <div className="space-y-4 mb-6">
              <input
                type="password"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-textcolor font-route px-4 py-3 bg-bgprimary border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                required
              />
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full text-textcolor font-route px-4 py-3 bg-bgprimary border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                required
              />
            </div>
          )}

          <AnimatedButton
            type="submit"
            animated={loading ? false : true}
            // title={loading ? "Processing..." : getButtonText()}
            disabled={
              loading ||
              (state === "forgot-password" && !email) ||
              (state === "enter-otp" && otp.length !== 4) ||
              (state === "reset-password" && (!password || !confirmPassword))
            }
            title={
              loading ? (
                <div className="flex items-center justify-center">
                  <RiLoader4Fill className="animate-spin size-6 text-white" />
                  <span className="ml-2 mb-[-2px]">
                    {getButtonText().loadingText.toUpperCase()}
                  </span>
                </div>
              ) : (
                getButtonText().buttonText.toUpperCase()
              )
            }
            className={`font-bold border-bdshadow border-4 mt-1 text-white rounded-lg w-full py-[5px] font-route text-body1 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          />
        </form>

        <div className="mt-2 text-center">
          <p className="text-textsecond text-sm font-route">
            Back to{" "}
            <span
              className=" font-medium hover:text-textcolor hover:underline hover:cursor-pointer"
              onClick={() => navigate("/login")}
            >
              login
            </span>{" "}
            page
          </p>

          {/* Back button for OTP step */}
          {state === "enter-otp" && (
            <button
              type="button"
              onClick={() => {
                sessionStorage.removeItem("email_submitted");
                setState("forgot-password");
              }}
              className="text-textcolor text-xs mt-2 hover:text-gray-700 hover:underline font-route"
            >
              ← Use different email
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
