import React, { useEffect, useRef } from "react";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserProfile } from "../../store/slices/userSlice";

const DefaultLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const hasFetchedRef = useRef(false);
  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    const token = localStorage.getItem("accessToken");
    if (token) { 
      dispatch(getUserProfile());
    }
  }, [dispatch]);  

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        background: "linear-gradient(165deg, #202020 55%, #2c2c2c 55%)",
        minHeight: "120vh",
      }}
    >
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
