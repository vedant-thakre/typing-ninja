import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear(); // #555555 #e5e5e5 border
  return (
    <div className="sticky top-0 bg-transparent py-12 border border-t-2 border-r-0 border-l-0 border-b-0 border-[#555555] gap-[40px] flex items-center justify-center">
      <div className="flex flex-col gap-[4px] justify-center">
        <h5 className="text-white text-[16px] font-main">
          © <span className="font-route text-[22px]"> {year}</span> TyperX.io
        </h5>
        <p className="text-[#999999] text-[16px] font-main font-normal">
          created by <span className="underline cursor-pointer">Vedant</span>
        </p>
      </div>
      <div className="flex gap-6 justify-center">
        <div className="flex text-white flex-col gap-2 justify-center">
          <h4 className="text-lg mb-2 font-medium">Races</h4>
          <NavLink to="">
            <h4 className="font-normal text-[15px] cursor-pointer hover:underline">
              Quick Play
            </h4>
          </NavLink>
          <NavLink to="">
            <h4 className="font-normal text-[15px] cursor-pointer hover:underline">
              Solo Play
            </h4>
          </NavLink>
          <NavLink to="">
            <h4 className="font-normal text-[15px] cursor-pointer hover:underline">
              Custom Play
            </h4>
          </NavLink>
        </div>
        <div className="flex text-white flex-col gap-2 justify-center">
          <h4 className="text-lg  mb-2 font-medium">Forums</h4>
          <NavLink to="">
            {" "}
            <h4 className="font-normal text-[15px] cursor-pointer hover:underline">
              Posts
            </h4>
          </NavLink>
          <NavLink to="">
            {" "}
            <h4 className="font-normal text-[15px] cursor-pointer hover:underline">
              Created Post
            </h4>
          </NavLink>
          <NavLink to="">
            <h4 className="font-normal text-[15px] cursor-pointer hover:underline">
              Discord
            </h4>
          </NavLink>
        </div>
        <div className="flex text-white flex-col gap-2 justify-center">
          <h4 className="text-lg mb-2 font-medium">Account</h4>
          <NavLink to="">
            <h4 className="font-normal text-[15px] cursor-pointer hover:underline">
              Log In
            </h4>
          </NavLink>
          <NavLink to="">
            <h4 className="font-normal text-[15px] cursor-pointer hover:underline">
              Sign Up
            </h4>
          </NavLink>
          <NavLink to="">
            <h4 className="font-normal text-[15px] cursor-pointer hover:underline">
              Recover
            </h4>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Footer;
