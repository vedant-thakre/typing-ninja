import React, { useEffect } from "react";
import Header from "../ui/Other/Header";
import Footer from "../ui/Other/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserProfile, setShowResponsiveNav } from "../../store/slices/userSlice";
import { useSelector } from "react-redux";
import ResponsiveHeader from "../ui/Other/ResponsiveHeader";
import { TimerProvider } from "../../context/TimerContext";


const DefaultLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const theme = useSelector((state) => state.user.theme);
  const show = useSelector((state) => state.user.showResponsiveNav);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) { 
      dispatch(getUserProfile());
    }
  }, [dispatch]);  


  useEffect(() => {
     const width = window.innerWidth;
      if (width > 1023 && show) {
        dispatch(setShowResponsiveNav(false));
      }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div
      className={`flex flex-col ${
        !location.pathname?.includes("chats") ? `min-h-screen` : ""
      } "`}
      style={{
        background:
          theme === "dark"
            ? `linear-gradient(165deg, #202020 55%, #2c2c2c 55%)`
            : "linear-gradient(165deg, #e8ecf3 55%, #ffffff 55%)",
        minHeight: !location.pathname?.includes("chats")
          ? !show
            ? "120vh"
            : "90vh"
          : "",
      }}
    >
      <Header />
      {show ? (
        <ResponsiveHeader />
      ) : (
        <TimerProvider>
          <div
            className={!location.pathname?.includes("chats") ? `flex-grow` : ""}
          >
            <Outlet />
          </div>
        </TimerProvider>
      )}
      <div className="pt-10">
        <Footer />
      </div>
    </div>
  );
};

export default DefaultLayout;
