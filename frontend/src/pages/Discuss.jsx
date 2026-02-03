import React, { useEffect, useRef, useState } from "react";
import { FaLessThan, FaGreaterThan, FaLongArrowAltRight } from "react-icons/fa";
import { getRelativeTime, handleTabTitle } from "../utils/helper";
import {
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { postList } from "../utils/data";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../store/slices/postSlice";
import Pagination from "../components/ui/Other/Pagination";
import AnimatedButton from "../components/ui/Other/AnimatedButton";
import { RiChat3Line } from "react-icons/ri";
import { TbWorld } from "react-icons/tb";
import PostList from "../components/ui/Post/PostList";
import WorldChat from "../components/ui/Post/WorldChat";
import LoginWarningBanner from "../components/ui/Other/LoginWarningBanner";

const Discuss = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tabValue = location.pathname === "/world" ? "World Chat" : "Discussion";

  return (
    <div className="min-h-screen mx-3 md:mx-0 flex justify-center">
      <div className="flex flex-col gap-4 w-[800px] mt-[30px]">
        <div className="grid grid-cols-2 gap-3">
          <AnimatedButton
            title="Discussion"
            icon={<RiChat3Line className="font-bold" size={25} />}
            both
            onClick={() => {
              navigate("/discuss");
            }}
            className="font-route shadow-hard text-white hover:underline tracking-wide font-medium text-xl rounded-xl py-2 px-24"
          />
          <AnimatedButton
            title="World Chat"
            icon={<TbWorld size={23} />}
            both
            onClick={() => {
              console.log("hello");
              navigate("/world");
              console.log("world");
            }}
            className="font-route shadow-hard text-white hover:underline font-normal tracking-normal text-xl rounded-xl py-2 px-24"
          />
        </div>
        {tabValue === "Discussion" ? (
          <PostList tabValue={tabValue} />
        ) : (
          <>
            <WorldChat tabValue={tabValue} />
          </>
        )}
      </div>
    </div>
  );
};

export default Discuss;
