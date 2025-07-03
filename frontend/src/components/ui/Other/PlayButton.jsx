import { motion } from "framer-motion";
import clsx from "clsx";
import { FaLongArrowAltRight } from "react-icons/fa";
import React from "react";
import { useNavigate } from "react-router-dom";

const PlayButton = ({ title, className, subTitle, route }) => {
  const [mode, setMode] = React.useState("1v1");
  const navigate = useNavigate();
  const handleClick = () => {
    if (title === "Quick Play") {
      navigate(mode === "1v1" ? "/duel" : "/multiplayer");
    } else {
      navigate(route);
    }
  }
  return (
    <motion.div
      whileHover={
        title === "Quick Play"
          ? {}
          : { y: -2, transition: { duration: 0.3, ease: "easeOut" } }
      }
      whileTap={title === "Quick Play" ? {} : { scale: 0.99 }}
      onClick={handleClick}
      className={clsx(
        !className.includes("bg-") && "bg-primary",
        "flex cursor-pointer h-full relative flex-col gap-2 border-4 text-white rounded-2xl px-6 pt-4 shadow-lg",
        className
      )}
    >
      <h4 className="text-white w-max flex gap-[2px] cursor-pointer items-center font-main text-[16px] font-bold">
        {title} <FaLongArrowAltRight color={"white"} />
      </h4>
      <p className="font-main tracking-wide text-[14px]">{subTitle}</p>
      {title === "Quick Play" && (
        <div className="absolute flex flex-col gap-2 top-[10px] right-[10px]">
          <p
            onClick={(e) => {
              e.stopPropagation();
              setMode("1v1");
            }}
            className={` ${
              mode !== "1v1" ? "bg-primary text-white" : "bg-white text-primary"
            } border-2 rounded-[5px] pt-[3px] border-white font-route font-bold px-1 tracking-widest leading-5 text-[18px]`}
          >
            1V1
          </p>
          <p
            onClick={(e) => {
              e.stopPropagation();
              setMode("1v5");
            }}
            className={` ${
              mode !== "1v5" ? "bg-primary text-white" : "bg-white text-primary"
            } border-2 rounded-[5px] border-white font-route pt-[3px] font-bold px-1 tracking-widest leading-5 text-[18px]`}
          >
            1V5
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default PlayButton;
