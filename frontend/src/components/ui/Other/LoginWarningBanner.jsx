import React from "react";
import { useNavigate } from "react-router-dom";

const LoginWarningBanner = ({ warning }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-danger w-full rounded-lg px-4 py-2 flex justify-between items-center">
      <div className=" font-route text-title3 text-white ">{warning}</div>
      <span
        onClick={() => navigate("/login")}
        className="font-route text-title3 text-white underline cursor-pointer"
      >
        Login
      </span>
    </div>
  );
};

export default LoginWarningBanner;
