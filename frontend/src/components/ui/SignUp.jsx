import React from 'react'
import AnimatedButton from '../AnimatedButton';
import google from '../../assets/icons/google.png'
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-[#2c2c2c] flex flex-col items-center gap-3 pt-7 pb-5 px-5 rounded-2xl shadow-hard">
        <h5 className="text-white tracking-wider font-route text-[26px] font-bold">
          New Account
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
            <p className="font-route text-[21px] text-white font-normal">
              email
            </p>
            <input
              type="email"
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
          title={" SIGN UP"}
          className="bg-primary mt-[7px] font-bold rounded-lg w-full py-[5px] text-white font-route text-lg border-4 border-bdshadow"
        />
        <motion.div
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
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="hover:text-white cursor-pointer"
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUp
