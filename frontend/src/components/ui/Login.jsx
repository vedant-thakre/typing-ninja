import React from 'react'
import AnimatedButton from '../AnimatedButton';
import google from '../../assets/icons/google.png'
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from "@react-oauth/google";
import axiosInstance from '../../services/axiosInstance';
import axios from 'axios';


const Login = () => {
  const navigate = useNavigate();
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google login successful", tokenResponse);
      try {
        // const response = await axiosInstance.post("/users/google-auth", {
        //   token: tokenResponse.access_token,
        // });
        const response2 = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse?.access_token}`,
            },
          }
        );
        // Handle the response from your backend as needed
        // console.log("Backend response:", response.data);
        console.log("Backend response:", response2);
      } catch (error) {
        console.error("Error sending code to backend", error);
      }
    },
    onError: async () => {
      console.error("Google login failed");
      // Handle login errors here
    },
    flow: "implicit", // Use 'auth-code' for the authorization code flow
    ux_mode: "popup",
  });
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-[#2c2c2c] flex flex-col items-center gap-3 pt-7 pb-5 px-5 rounded-2xl shadow-hard">
        <h5 className="text-white tracking-wider font-route text-[26px] font-bold">
          Existing Account
        </h5>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <p className="font-route text-[21px] text-white font-normal">
              username
            </p>
            <input
              type="text"
              className="border-2 border-[#555555] w-[290px] ml-2 lg:ml-0 rounded-md placeholder-white outline-none focus:ring-0 py-2 font-main text-[13px] px-2 bg-transparent text-white"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-route text-[21px] text-white">password</p>
            <input
              type="password"
              className=" border-2 border-[#555555] ml-2 lg:ml-0 w-[290px] rounded-md placeholder-white outline-none focus:ring-0 py-2 font-main text-[13px] px-2  bg-transparent text-white"
            />
          </div>
        </div>
        <AnimatedButton
          title={"LOG IN"}
          className="font-bold border-4 mt-[6px] rounded-lg w-full py-[5px] font-route text-lg "
        >
          LOG IN
        </AnimatedButton>
        <motion.div
          onClick={googleLogin}
          whileHover={{
            y: -2,
            transition: { duration: 0.3, ease: "easeOut" },
          }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 mt-1 cursor-pointer bg-white text-gray-700 w-full text-xl border-gray-200 border-4 font-route justify-center font-bold rounded-lg px-4 py-[3px]"
        >
          <img src={google} alt="" className="w-7 h-7 mr-2" />
          <span className="mt-[2px]">GOOGLE</span>
        </motion.div>
        <p className="text-textsecond font-route tracking-wider text-[18px] ">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")} className="hover:text-white cursor-pointer">Sign Up</span>
        </p>
      </div>
    </div>
  );
}

export default Login
