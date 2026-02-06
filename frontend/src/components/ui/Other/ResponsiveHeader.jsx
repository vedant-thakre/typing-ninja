import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutUser,
  setShowResponsiveNav,
} from "../../../store/slices/userSlice";
import AnimatedButton from "./AnimatedButton";
import { NavLink, useNavigate } from "react-router-dom";

const ResponsiveHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.userData);
  const navList = [
    {
      name: "Home",
      link: "/",
      isPublic: true,
    },
    {
      name: "Discuss",
      link: "/discuss",
      isPublic: true,
    },
    {
      name: "Highscores",
      link: "/highscores",
      isPublic: true,
    },
    {
      name: "Profile",
      link: `/profile/${user?.username}`,
      isPublic: false,
    },
    {
      name: "Friends",
      link: "/friends",
      isPublic: false,
    },
    {
      name: "Settings",
      link: "/settings",
      isPublic: false,
    },
  ];
  return (
    <div className="absolute block lg:hidden top-[56px] z-20 overflow-hidden left-0 w-full h-[89vh] bg-bgprimary">
      <div className="flex flex-col px-5 items-center gap-3">
        <div className="flex flex-col w-full  items-center pt-4 gap-3">
          {navList
            .filter((item) => {
              if (user) return true;
              return item.isPublic === true;
            })
            .map((item, index) => {
              return (
                <NavLink
                  to={item.link}
                  onClick={() => {
                    dispatch(setShowResponsiveNav(false));
                  }}
                  key={index}
                  className="font-route border-2 border-bprimary w-full px-4 py-1 rounded-lg text-[20px] font-bold text-textcolor"
                >
                  {item.name}
                </NavLink>
              );
            })}
        </div>
        <AnimatedButton
          title={"LOG OUT"}
          onClick={() => {
            dispatch(logoutUser());
            navigate("/login");
          }}
          className={
            "mt-1 font-route text-[20px] font-bold rounded-lg text-white bg-[#4e6edd] border-bdshadow border-4 w-full"
          }
        />
      </div>
    </div>
  );
};

export default ResponsiveHeader;
