import React from 'react'
import AnimatedButton from '../AnimatedButton';

const Login = () => {
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
              className="border-2 border-[#555555] w-[260px] ml-2 lg:ml-0 rounded-md placeholder-white outline-none focus:ring-0 py-2 font-main text-[13px] px-2 bg-transparent text-white"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-route text-[21px] text-white">password</p>
            <input
              type="password"
              className=" border-2 border-[#555555] ml-2 lg:ml-0 w-[260px] rounded-md placeholder-white outline-none focus:ring-0 py-2 font-main text-[13px] px-2  bg-transparent text-white"
            />
          </div>
        </div>
        <AnimatedButton title={"LOG IN"} className="font-bold border-4 rounded-lg w-full py-[5px] font-route text-lg ">
          LOG IN
        </AnimatedButton>
      </div>
    </div>
  );
}

export default Login
