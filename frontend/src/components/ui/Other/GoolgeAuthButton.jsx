import React from 'react'
import google from '../../../assets/icons/google.png';
import { motion } from "framer-motion";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { googleAuth } from '../../../store/slices/userSlice';
import toast from 'react-hot-toast';

const GoolgeAuthButton = () => {
    const dispatch = useDispatch();
    const googleLogin = useGoogleLogin({
      onSuccess: async (tokenResponse) => {
        try {
            const response = await axios.get(
              "https://www.googleapis.com/oauth2/v3/userinfo",
              {
                headers: {
                  Authorization: `Bearer ${tokenResponse?.access_token}`,
                },
              }
            );
          // Handle the response from your backend as needed
        if(response?.status === 200){
            const { email, name } = response.data;
            dispatch(googleAuth({ email, name }));
            console.log("Backend response:", response.data);
        }
        } catch (error) {
          console.error("Error sending code to backend", error);
          toast.error("Google login failed");
        }
      },
      onError: async () => {
        console.error("Google login failed");
        // Handle login errors here
      },
      flow: "implicit",
      ux_mode: "popup",
    });

  return (
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
  );
}

export default GoolgeAuthButton
