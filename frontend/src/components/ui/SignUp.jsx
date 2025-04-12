import React, { useEffect } from 'react'
import AnimatedButton from '../AnimatedButton';
import { useNavigate } from 'react-router-dom';
import GoolgeAuthButton from './GoolgeAuthButton';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../store/slices/userSlice';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState : { errors }  } = useForm();
  const userData = useSelector((state) => state.user.userData);
  const handleSignUp = async (data) => {
    console.log("handleSignUp", data);
    const response = await dispatch(registerUser(data));
    console.log("response", response);
    if(response?.payload?.status === 200){
      navigate("/");
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(handleSignUp)();
    }
  };
  useEffect(() => {
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleSubmit, handleSignUp]);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-[#2c2c2c] flex flex-col items-center gap-3 pt-7 pb-5 px-5 rounded-2xl shadow-hard">
        <h5 className="text-white tracking-wider font-route text-[26px] font-bold">
          New Account
        </h5>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <p className="font-route text-[21px] text-white font-normal">
                username
              </p>
              <input
                type="text"
                {...register("username", { required: true })}
                className="border-2 border-[#555555] w-[290px] ml-2 lg:ml-0 rounded-md placeholder-white outline-none focus:ring-0 py-2 font-main text-[13px] px-2 bg-transparent text-white"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-route text-[21px] text-white font-normal">
                email
              </p>
              <input
                type="email"
                {...register("email", { required: true })}
                className="border-2 border-[#555555] w-[290px] ml-2 lg:ml-0 rounded-md placeholder-white outline-none focus:ring-0 py-2 font-main text-[13px] px-2 bg-transparent text-white"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-route text-[21px] text-white">password</p>
              <input
                type="password"
                {...register("password", { required: true })}
                className=" border-2 border-[#555555] ml-2 lg:ml-0 w-[290px] rounded-md placeholder-white outline-none focus:ring-0 py-2 font-main text-[13px] px-2  bg-transparent text-white"
              />
            </div>
          </div>
          <AnimatedButton
            onClick={handleSignUp}
            type="submit"
            title={" SIGN UP"}
            className="bg-primary mt-[7px] font-bold rounded-lg w-full py-[5px] text-white font-route text-lg border-4 border-bdshadow"
          />
        </form>
        <GoolgeAuthButton />
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
