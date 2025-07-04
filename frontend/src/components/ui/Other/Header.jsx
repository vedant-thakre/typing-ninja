import React, { useEffect, useRef, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { RxChatBubble } from "react-icons/rx";
import { RxRocket } from "react-icons/rx";
import { FiSun } from "react-icons/fi";
import { RxMoon } from "react-icons/rx";
import { BsCart3 } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import { LuMenu } from "react-icons/lu";
import AnimatedButton from "../Other/AnimatedButton";
import { handleTabTitle } from "../../../utils/helper";
import {
  logoutUser,
  setShowResponsiveNav,
  setTheme,
} from "../../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const showResponsiveNav = useSelector(
    (state) => state.user.showResponsiveNav
  );
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const loading = useSelector((state) => state.user.loading);
  const status = useSelector((state) => state.user.status);
  const user = useSelector((state) => state.user.userData);
  const theme = useSelector((state) => state.user.theme);
  const authStatus = status;

  // Ref for the profile menu
  const menuRef = useRef(null);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  // Handle clicks outside the settings menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileMenu]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (search.trim() === "") return;
      navigate(`/search/${search}`);
      setSearch("");
    }
  };

  return (
    <div className="bg-[#4e6edd] py-2 flex items-center w-full mx-auto px-4 sm:px-4 lg:px-8">
      <div className="md:w-[80rem] w-full 2xl:w-[85rem] mx-auto flex justify-between">
        <div className="flex gap-4 lg:gap-6 xl:gap-10 items-center">
          <NavLink onClick={() => handleTabTitle("Home")} to="/">
            <h2 className="text-2xl xl:text-4xl cursor-pointer text-bold text-white tracking-wider font-small font-logo">
              TYPING NINJA
            </h2>
          </NavLink>
          <div className="hidden lg:flex gap-3 xl:gap-6">
            <NavLink to="/" onClick={() => handleTabTitle("Home")}>
              <div className="flex items-center justify-center gap-1.5 xl:gap-3">
                <AiOutlineHome
                  size={27}
                  className="mb-1 text-white font-medium cursor-pointer"
                />
                <h5 className="text-white text-[19px] font-bold tracking-wider  font-route cursor-pointer hover:underline">
                  HOME
                </h5>
              </div>
            </NavLink>
            <NavLink to="/discuss" onClick={() => handleTabTitle("Discuss")}>
              <div className="flex items-center justify-center gap-1.5 xl:gap-3">
                <RxChatBubble
                  size={26}
                  className="mb-1 text-white font-medium cursor-pointer"
                />
                <h5 className="text-white text-[19px] font-bold tracking-wider font-route cursor-pointer hover:underline">
                  DISCUSS
                </h5>
              </div>
            </NavLink>
            <NavLink
              to="/highscores"
              onClick={() => handleTabTitle("Highscores")}
            >
              <div className="flex items-center justify-center gap-1 xl:gap-3">
                <RxRocket
                  size={27}
                  className="mb-1 text-white font-medium cursor-pointer"
                />
                <h5 className="text-white text-[19px] font-bold tracking-wider font-route cursor-pointer hover:underline">
                  HIGHSCORES
                </h5>
              </div>
            </NavLink>
            {/* {authStatus && (
              <NavLink to="/store" onClick={() => handleTabTitle("Store")}>
                <div className="flex items-center justify-center gap-1 xl:gap-3">
                  <BsCart3
                    size={24}
                    className="mb-1 text-white font-medium cursor-pointer"
                  />
                  <h5 className="text-white text-[19px] font-bold tracking-wider font-route cursor-pointer hover:underline">
                    STORE
                  </h5>
                </div>
              </NavLink>
            )} */}
          </div>
        </div>
        <div
          className={`hidden lg:flex gap-7 lg:gap-10 ${
            authStatus ? "xl:gap-6" : "xl:gap-16"
          } items-center`}
        >
          <input
            type="text"
            className=" border-none ml-2 lg:ml-0 rounded-md placeholder-white outline-none focus:ring-0 h-[35px] font-main text-[13px] px-3 xl:px-8 bg-[#4865cd] text-white"
            placeholder="Search for players..."
            value={search}
            onKeyPress={handleKeyPress}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div
            className={`flex gap-2 lg:gap-5 ${
              authStatus ? "xl:gap-5" : "xl:gap-9"
            } items-center`}
          >
            <div>
              {theme === "light" ? ( // dark mode icon
                <RxMoon
                  size={24}
                  className="text-white font-medium cursor-pointer"
                  onClick={() => {
                    dispatch(setTheme("dark"));
                    localStorage.setItem("theme", "dark");
                  }}
                />
              ) : (
                <FiSun
                  size={24}
                  className="text-white font-medium cursor-pointer"
                  onClick={() => {
                    dispatch(setTheme("light"));
                    localStorage.setItem("theme", "light");
                  }}
                />
              )}
            </div>
            {authStatus ? (
              <div className="flex relative items-center cursor-pointer">
                <div className="bg-[#4865cd] pl-6 pr-10 py-1 rounded-lg flex flex-col items-center">
                  <p className="text-white font-main text-sm">
                    {user?.username}
                  </p>
                  <h5 className="text-white font-main text-[14px]">
                    Daily Goal:{" "}
                    <span className="font-route ml-1 font-bold text-[18px]">
                      0&nbsp;/&nbsp;&nbsp;5
                    </span>
                  </h5>
                </div>
                <div
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-[65px] ml-[-23px] cursor-pointer h-[65px] bg-[#4e6edd] border-4 border-[#4e6edd] rounded-full "
                >
                  <div className="relative group cursor-pointer w-[60px] h-[60px]">
                    <img
                      src={user?.avatar}
                      alt="Profile"
                      loading="lazy"
                      crossOrigin="anonymous"
                      className="w-full h-full border-2 p-1 border-[#f1f1f1] rounded-full object-cover"
                    />
                  </div>
                </div>
                {showProfileMenu && (
                  <div
                    ref={menuRef}
                    className="px-5 pt-4 pb-2 z-40 absolute top-[73px] shadow-hard bg-bgprimary rounded-b-2xl"
                  >
                    <div className="flex flex-col gap-3 items-center">
                      <NavLink
                        to={`/profile/${user?.username}`}
                        onClick={() =>
                          handleTabTitle(`Profile - ${user?.username}`)
                        }
                        className="px-3 cursor-pointer font-route text-[20px] py-1 text-textcolor w-full rounded-lg border-2 border-bprimary"
                      >
                        <p>Profile</p>
                      </NavLink>
                      <NavLink
                        to="/friends"
                        className="px-3 cursor-pointer font-route text-[20px] py-1 text-textcolor w-full rounded-lg border-2 border-bprimary"
                        onClick={() => handleTabTitle("Friends")}
                      >
                        <p>Friends</p>
                      </NavLink>
                      <NavLink
                        to="/settings"
                        className="px-3 cursor-pointer font-route text-[20px] py-1 text-textcolor w-full rounded-lg border-2 border-bprimary"
                        onClick={() => handleTabTitle("Settings")}
                      >
                        <p>Settings</p>
                      </NavLink>

                      <AnimatedButton
                        title={"LOG OUT"}
                        onClick={handleLogout}
                        className={
                          "mt-1 font-route text-[20px] font-bold rounded-lg text-white bg-[#4e6edd] border-bdshadow border-4 w-[200px]"
                        }
                      />
                      <div className=""></div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <NavLink to="/login" onClick={() => handleTabTitle("Login")}>
                  <h5 className="text-white text-[19px] my-4 cursor-pointer font-bold tracking-wider font-route">
                    LOGIN
                  </h5>
                </NavLink>
                <NavLink to="/signup" onClick={() => handleTabTitle("Signup")}>
                  <h5 className="text-white text-[19px] cursor-pointer font-bold tracking-wider font-route">
                    SIGNUP
                  </h5>
                </NavLink>
              </>
            )}
          </div>
        </div>
        <div className=" flex items-center gap-4 lg:hidden  ">
          <div>
            {theme === "light" ? ( // dark mode icon
              <RxMoon
                size={25}
                className="text-white font-medium cursor-pointer"
                onClick={() => {
                  dispatch(setTheme("dark"));
                  localStorage.setItem("theme", "dark");
                }}
              />
            ) : (
              <FiSun
                size={25}
                className="text-white font-medium cursor-pointer"
                onClick={() => {
                  dispatch(setTheme("light"));
                  localStorage.setItem("theme", "light");
                }}
              />
            )}
          </div>
          <img
            src={user?.avatar}
            alt="Profile"
            onClick={() => {
              dispatch(setShowResponsiveNav(!showResponsiveNav));
            }}
            loading="lazy"
            crossOrigin="anonymous"
            className="w-[40px] h-[40px] border-2 bg-bdshadow p-1 border-[] rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;

// fonts - capriola, klee One, alveria sans libre
