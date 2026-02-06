import React, { useEffect } from "react";
import AnimatedButton from "../Other/AnimatedButton";
import { useNavigate } from "react-router-dom";
import GoolgeAuthButton from "../Other/GoolgeAuthButton";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../store/slices/userSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const userData = useSelector((state) => state.user.userData);
  const handleSignUp = async (data) => {
    console.log("handleSignUp", data);
    const response = await dispatch(registerUser(data));
    console.log("response", response);
    if (response?.payload?.status === 200) {
      navigate("/");
    }
  };

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
      <div className="bg-bgprimary flex flex-col items-center gap-3 pt-5 pb-5 px-5 rounded-2xl shadow-hard">
        <h5 className="text-textcolor tracking-wider font-route text-[22px] font-bold">
          New Account
        </h5>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-0.6">
              <p className="font-route text-title2 text-textcolor font-normal">
                username
              </p>
              <input
                type="text"
                {...register("username", { required: true })}
                className="border-2 border-bprimary w-[290px] ml-2 lg:ml-0 rounded-md placeholder-white outline-none focus:ring-0 py-2 font-main text-[13px] px-2 bg-transparent text-textcolor"
              />
            </div>
            <div className="flex flex-col gap-0.6">
              <p className="font-route text-title2 text-textcolor font-normal">
                email
              </p>
              <input
                type="email"
                {...register("email", { required: true })}
                className="border-2 border-bprimary w-[290px] ml-2 lg:ml-0 rounded-md placeholder-white outline-none focus:ring-0 py-2 font-main text-[13px] px-2 bg-transparent text-textcolor"
              />
            </div>
            <div className="flex flex-col gap-0.6">
              <p className="font-route text-title2 text-textcolor">password</p>
              <input
                type="password"
                {...register("password", { required: true })}
                className=" border-2 border-bprimary ml-2 lg:ml-0 w-[290px] rounded-md placeholder-white outline-none focus:ring-0 py-2 font-main text-[13px] px-2  bg-transparent text-textcolor"
              />
            </div>
          </div>
          <AnimatedButton
            onClick={handleSignUp}
            type="submit"
            title={" SIGN UP"}
            className="bg-primary  font-bold rounded-lg w-full py-[5px] text-white font-route mb-3 mt-6 text-body1 border-4 border-bdshadow"
          />
          <GoolgeAuthButton />
        </form>
        <p className="text-textsecond font-route tracking-wider text-body1 ">
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
};

export default SignUp;
