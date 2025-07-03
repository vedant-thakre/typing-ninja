import React, { useEffect } from "react";
import AnimatedButton from "../Other/AnimatedButton";
import { useNavigate } from "react-router-dom";
import GoolgeAuthButton from "../Other/GoolgeAuthButton";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { loginUser } from "../../../store/slices/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const userdata = useSelector((state) => state.user);
  const handleLogin = async (data) => {
    const response = await dispatch(loginUser(data));
    if (response?.payload?.status === 200) {
      localStorage.setItem("username", response?.payload?.data?.user?.username);
      localStorage.setItem("accessToken", response?.payload?.data?.accessToken);
      navigate("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(handleLogin)();
    }
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-bgprimary flex flex-col items-center gap-3 pt-7 pb-5 px-5 rounded-2xl shadow-hard">
        <h5 className="text-textcolor tracking-wider font-route text-[26px] font-bold">
          Existing Account
        </h5>
        <form action="" onSubmit={handleSubmit(handleLogin)}>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <p className="font-route text-[21px] text-textcolor font-normal">
                username or email
              </p>
              <input
                {...register("credentials")}
                type="text"
                className="border-2 border-bprimary w-[290px] ml-2 lg:ml-0 rounded-md placeholder-white outline-none focus:ring-0 py-2 font-main text-[13px] px-2 bg-transparent text-textcolor"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-route text-[21px] text-textcolor">password</p>
              <input
                {...register("password")}
                type="password"
                className=" border-2 border-bprimary ml-2 lg:ml-0 w-[290px] rounded-md placeholder-white outline-none focus:ring-0 py-2 font-main text-[13px] px-2  bg-transparent text-textcolor"
              />
            </div>
          </div>
          <AnimatedButton
            title={"LOGI N"}
            className="font-bold border-bdshadow border-4 mt-[6px] text-white rounded-lg w-full py-[5px] font-route text-lg "
          >
            LOG IN
          </AnimatedButton>
        </form>
        <GoolgeAuthButton />
        <p className="text-textsecond font-route tracking-wider text-[18px] ">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="hover:text-white cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
